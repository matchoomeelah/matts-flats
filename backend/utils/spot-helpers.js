// Model for querying
const { Spot } = require('../db/models');

// For comparisons
const { Op } = require('sequelize');


// Helper funcs
const addAvgRating = (spot) => {
    // Calculate the avgRating for each spot
    let avg = "No reviews yet";

    if (spot.Reviews.length) {
        let sum = 0;
        spot.Reviews.forEach(rev => sum += rev.stars);
        avg = sum / spot.Reviews.length;
    }

    spot.avgRating = avg;

    return spot;
};

const addPreviewImage = (spot) => {
    if (spot.SpotImages && spot.SpotImages.length) {
        spot.previewImage = spot.SpotImages[0].url;
    } else {
        spot.previewImage = null;
    }

    return spot
}

const addReviewCount = (spot) => {
    const count = spot.Reviews.length;

    spot.numReviews = count;

    return spot;
}

const queryErrorParser = (req, res, next) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
    const errors = {};

    page = parseInt(page);
    size = parseInt(size);

    // PAGE
    if (page === 0 || (!isNaN(page) && page < 1)) {
        errors.page = "Page must be greater than or equal to 1";
    }

    // SIZE
    if (size === 0 || (!isNaN(size) && size < 1)) {
        errors.size = "Size must be greater than or equal to 1";
    }

    // LATS AND LNGS
    if (minLat) {
        if (isNaN(minLat) || minLat < -90.0 || minLat > 90) {
            errors.minLat = "Minimum latitude is invalid"
        }
    }
    if (maxLat) {
        if (isNaN(maxLat) || maxLat < -90.0 || maxLat > 90) {
            errors.maxLat = "Maximum latitude is invalid"
        }
    }
    if (minLng) {
        if (isNaN(minLng) || minLng < -180.0 || minLng > 180) {
            errors.minLng = "Minimum longitude is invalid"
        }
    }
    if (maxLng) {
        if (isNaN(maxLng) || maxLng < -180.0 || maxLng > 180) {
            errors.maxLng = "Maximum longitude is invalid"
        }
    }

    // MINPRICE
    if (minPrice) {
        if (isNaN(minPrice) || minPrice < 0) {
            errors.minPrice = "Minimum price must be greater than or equal to 0";
        }
    }

    // MAXPRICE
    if (maxPrice) {
        if (isNaN(maxPrice) || maxPrice < 0) {
            errors.maxPrice = "Maximum price must be greater than or equal to 0";
        }
    }

    if (Object.keys(errors).length) {
        const err = new Error();
        err.message = "Bad Request",
        err.errors = errors;
        res.status(400);
        return res.json(err);
    }

    return next();
}

const queryObjCreator = (reqQuery) => {
    const { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = reqQuery;

    const queryObj = {}

    // Min and Max Lat
    if (minLat && maxLat) {
        queryObj.lat = {
            [Op.between]: [parseFloat(minLat), parseFloat(maxLat)]
        }
    }
    else if (minLat) {
        queryObj.lat = {
            [Op.gte]: parseFloat(minLat)
        }
    }
    else if (maxLat) {
        queryObj.lat = {
            [Op.lte]: parseFloat(maxLat)
        }
    }

    // Min and Max Lng
    if (minLng && maxLng) {
        queryObj.lng = {
            [Op.between]: [parseFloat(minLng), parseFloat(maxLng)]
        }
    }
    else if (minLng) {
        queryObj.lng = {
            [Op.gte]: parseFloat(minLng)
        }
    }
    else if (maxLng) {
        queryObj.lng = {
            [Op.lte]: parseFloat(maxLng)
        }
    }

    // Min and Max Price
    if (minPrice && maxPrice) {
        queryObj.price = {
            [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)]
        }
    }
    else if (minPrice) {
        queryObj.price = {
            [Op.gte]: parseFloat(minPrice)
        }
    }
    else if (maxPrice) {
        queryObj.price = {
            [Op.lte]: parseFloat(maxPrice)
        }
    }

    return queryObj;
}


module.exports = { addAvgRating, addPreviewImage, addReviewCount, queryErrorParser, queryObjCreator };

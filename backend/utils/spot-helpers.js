// Model for querying
const { Spot } = require('../db/models');

// For comparisons
const { Op } = require('sequelize');


//
// Add average star rating of reviews for a spot
//
const addAvgRating = (spot) => {
    let avg = "New";

    if (spot.Reviews.length) {
        let sum = 0;
        spot.Reviews.forEach(rev => sum += rev.stars);
        avg = sum / spot.Reviews.length;
    }

    spot.avgRating = avg;

    return spot;
};

//
// Add previewImage property to response for a Spot
//
const addPreviewImage = (spot) => {
    if (spot.SpotImages && spot.SpotImages.length) {
        spot.previewImage = spot.SpotImages[0].url;
    } else {
        spot.previewImage = null;
    }

    return spot;
}

//
// Add the number of reviews property to a response for a Spot
//
const addReviewCount = (spot) => {
    const count = spot.Reviews.length;

    spot.numReviews = count;

    return spot;
}

//
// Create a "where" clause object from the query parameters
//
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


module.exports = { addAvgRating, addPreviewImage, addReviewCount, queryObjCreator };

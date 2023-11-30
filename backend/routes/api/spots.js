// Create router
const express = require('express');
const router = express.Router();

// Import model for queries
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');

// For the routes that require authentication
const { requireAuth, requireSpotOwner, requireNotSpotOwner } = require('../../utils/auth');

// Import validation middleware
const { validateSpot, validateReview, spotExists, validateBooking, validateImage, checkBookingConflict } = require('../../utils/validation');

// Helper Functions
const { addAvgRating, addPreviewImage, addReviewCount, queryErrorParser } = require('../../utils/spot-helpers');

// For comparisons
const { Op } = require('sequelize');



//
// Get all Spots
//
router.get('/', async (req, res, next) => {
    // Check for query validation errors
    const errors = queryErrorParser(req.query);

    if (Object.keys(errors).length) {
        const err = new Error();
        err.message = "Bad Request",
        err.errors = errors;
        res.status(400);
        return res.json(err);
    }

    // Pagination and Search Params
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    const pagination = {};
    const query = {};

    // Set default values
    if (!page || page > 10) page = 1;
    if (!size) size = 20;

    pagination.limit = size;
    pagination.offset = size * (page - 1);

    // Min and Max Lat
    if (minLat && maxLat) {
        query.lat = {
            [Op.between]: [parseFloat(minLat), parseFloat(maxLat)]
        }
    }
    else if (minLat) {
        query.lat = {
            [Op.gte]: parseFloat(minLat)
        }
    }
    else if (maxLat) {
        query.lat = {
            [Op.lte]: parseFloat(maxLat)
        }
    }

    // Min and Max Lng
    if (minLng && maxLng) {
        query.lng = {
            [Op.between]: [parseFloat(minLng), parseFloat(maxLng)]
        }
    }
    else if (minLng) {
        query.lng = {
            [Op.gte]: parseFloat(minLng)
        }
    }
    else if (maxLng) {
        query.lng = {
            [Op.lte]: parseFloat(maxLng)
        }
    }

    // Min and Max Price
    if (minPrice && maxPrice) {
        query.price = {
            [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)]
        }
    }
    else if (minPrice) {
        query.price = {
            [Op.gte]: parseFloat(minPrice)
        }
    }
    else if (maxPrice) {
        query.price = {
            [Op.lte]: parseFloat(maxPrice)
        }
    }




    // Find all spots and their associated review stars/preview image
    let spots = await Spot.findAll({
        include: [{
            model: Review,
            attributes: ["stars"]
        },
        {
            model: SpotImage,
            attributes: ['url'],
            where: {
                preview: true
            },
            required: false,
            limit: 1
        }],
        where: {
            ...query
        },
        ...pagination
    });

    // Add avgRating and previewImg (terribly)
    spots = spots.map(spot => {
        spot = spot.toJSON();
        spot = addAvgRating(spot);
        spot = addPreviewImage(spot);

        delete spot.Reviews;
        delete spot.SpotImages;

        return spot;
    });


    res.json({ Spots: spots, page: parseInt(page), size: parseInt(size)});
});



//
// Get all Spots owned by the Current User
//
router.get('/current', requireAuth, async (req, res, next) => {
    const user = req.user;

    // Find all spots and their associated review stars/preview image
    let spots = await Spot.findAll({
        where: {
            ownerId: user.id
        },
        include: [{
            model: Review,
            attributes: ["stars"]
        },
        {
            model: SpotImage,
            attributes: ['url'],
            where: {
                preview: true
            },
            required: false,
            limit: 1
        }]
    });

    // Add avgRating and previewImg (terribly)
    spots = spots.map(spot => {
        spot = spot.toJSON();
        spot = addAvgRating(spot);
        spot = addPreviewImage(spot);

        delete spot.Reviews;
        delete spot.SpotImages;

        return spot;
    });

    res.json({ Spots: spots });
});



//
// Get details of a Spot from an id
//
router.get('/:spotId', spotExists, async (req, res, next) => {
    const { spotId } = req.params;

    let spot = await Spot.findByPk(spotId, {
        include: [
            {
                model: Review,
                attributes: ["stars"]
            },
            {
                model: SpotImage,
                attributes: ["id", "url", "preview"]
            },
            {
                model: User,
                attributes: ["id", "firstName", "lastName"],
                as: "Owner"
            }]
    });

    // Add review count and average rating
    spot = spot.toJSON();
    spot = addReviewCount(spot);
    spot = addAvgRating(spot);

    delete spot.Reviews;

    res.json(spot);
});

//
// Create a spot
//
router.post('/', requireAuth, validateSpot, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const user = req.user;
    const ownerId = user.id;

    const spot = Spot.build({ ownerId, address, city, state, country, lat, lng, name, description, price });
    await spot.save();

    res.status(201);
    res.json(spot);
})


//
// Delete a spot
//
router.delete('/:spotId', requireAuth, spotExists, requireSpotOwner, async (req, res, next) => {
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId);

    await spot.destroy();

    res.json({
        message: "Successfully deleted"
    });
})


//
// Edit a spot
//
router.put('/:spotId', requireAuth, spotExists, requireSpotOwner, validateSpot, async (req, res, next) => {
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId);

    spot.set({ ...req.body });

    await spot.save();

    res.json(spot);
});


//
// Add an Image to a Spot based on the Spot's id
//
router.post('/:spotId/images', requireAuth, spotExists, validateImage, requireSpotOwner, async (req, res, next) => {
    const { spotId } = req.params;
    const { url, preview } = req.body;

    const image = SpotImage.build({ spotId: parseInt(spotId), url, preview });
    await image.save();

    res.json({
        id: image.id,
        url: image.url,
        preview: image.preview
    });
});


//
// Get reviews by Spot's id
//
router.get('/:spotId/reviews', spotExists, async (req, res, next) => {
    const { spotId } = req.params;

    const reviews = await Spot.findByPk(spotId, {
        attributes: [],
        include: {
            model: Review,
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                {
                    model: ReviewImage,
                    attributes: ['id', 'url']
                }]
        }
    });

    res.json(reviews);
});


//
// Create a Review for a Spot based on the Spot's id
//
router.post('/:spotId/reviews', requireAuth, spotExists, validateReview, async (req, res, next) => {
    const { review, stars } = req.body;
    const { spotId } = req.params;
    const userId = req.user.id;

    // Check if user has made a review for the spot already
    const spot = await Spot.findByPk(spotId);
    const spotReviewUsers = await spot.getReviews({
        attributes: [],
        include: {
            model: User,
            attributes: ['id']
        }
    });

    for (let r of spotReviewUsers) {
        if (r.User.id === userId) {
            const err = new Error();
            err.message = "User already has a review for this spot";
            res.status(500);
            return res.json(err);
        }
    }


    const newReview = Review.build({
        userId,
        spotId: parseInt(spotId),
        review,
        stars
    });
    await newReview.save();

    res.status(201);
    res.json(newReview);
});


//
// Create a Booking from a Spot based on the Spot's id
//
router.post('/:spotId/bookings', requireAuth, spotExists, requireNotSpotOwner, validateBooking, checkBookingConflict, async (req, res, next) => {
    // Get necessary attributes
    const { spotId } = req.params;
    const userId = req.user.id;
    const { startDate, endDate } = req.body;

    // Build and save the new booking
    const booking = Booking.build({ spotId: parseInt(spotId), userId, startDate, endDate });
    await booking.save();

    res.json(booking);
});


//
// Get all Bookings for a Spot based on the Spot's id
//
router.get('/:spotId/bookings', requireAuth, spotExists, async (req, res, next) => {
    const { spotId } = req.params;
    const user = req.user;

    let bookings;

    const spot = await Spot.findByPk(spotId);

    // Response if the current user is NOT the owner...
    if (spot.ownerId !== user.id) {
        bookings = await Booking.findAll({
            attributes: ['spotId', 'startDate', 'endDate'],
            where: {
                [Op.and]: [{ spotId }, { userId: user.id }]
            }
        });
    }
    // Response if the current user is the owner
    else {
        bookings = await Booking.findAll({
            where: {
                spotId
            },
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        });
    }

    res.json({ Bookings: bookings });

});


module.exports = router;

// Create router
const express = require('express');
const router = express.Router();

// Import model for queries
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');

// For the routes that require authentication
const { requireAuth, requireSpotOwner, requireNotSpotOwner } = require('../../utils/auth');

// Import validation middleware
const { validateSpot, validateReview, spotExists, validateBooking, validateImage, checkBookingConflict, queryParamValidator, notPrevReviewer } = require('../../utils/validation');

// Helper Functions
const { addAvgRating, addPreviewImage, addReviewCount, queryObjCreator } = require('../../utils/spot-helpers');

// For comparisons
const { Op } = require('sequelize');


//
// Get all Spots
//
router.get('/', queryParamValidator, async (req, res, next) => {

    // Pagination and Search Params
    let { page, size } = req.query;

    const query = queryObjCreator(req.query);
    const pagination = {};

    // Set default values
    if (!page || page > 10) page = 1;
    if (!size || size > 20) size = 20;

    // Set pagination properties
    pagination.limit = size;
    pagination.offset = size * (page - 1);


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
        }],
        where: query,
        ...pagination
    });

    // Add avgRating and previewImg (terribly)
    spots = spots.map(spot => {
        spot = spot.toJSON();
        addAvgRating(spot);
        addPreviewImage(spot);

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
        addAvgRating(spot);
        addPreviewImage(spot);

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
    addReviewCount(spot);
    addAvgRating(spot);

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
router.post('/:spotId/images', requireAuth, spotExists, requireSpotOwner, validateImage, async (req, res, next) => {
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
                }
            ]
        }
    });

    res.json(reviews);
});


//
// Create a Review for a Spot based on the Spot's id
//
router.post('/:spotId/reviews', requireAuth, spotExists, notPrevReviewer, validateReview, async (req, res, next) => {
    const { review, stars } = req.body;
    const { spotId } = req.params;
    const userId = req.user.id;

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

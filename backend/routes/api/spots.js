// Create router
const express = require('express');
const router = express.Router();

// Import model for queries
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');

// For the routes that require authentication
const { requireAuth, requireSpotOwner } = require('../../utils/auth');

// Import validation check method and our custome handleValidationErrors message
const { check } = require('express-validator');
const { handleValidationErrors, validateSpot, validateReview, spotExists } = require('../../utils/validation');

// Helper Functions
const { addAvgRating, addPreviewImage, addReviewCount } = require('../../utils/spot-helpers');



//
// GET ALL SPOTS
//
router.get('/', async (req, res, next) => {
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


    res.json(spots);
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
router.delete('/:spotId', requireAuth, requireSpotOwner, async (req, res, next) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);

    const user = req.user;

    // Check if spot exists, otherwise 404
    if (!spot) {
        const err = new Error();
        err.message = "Spot couldn't be found";
        res.status(404);
        return res.json(err);
    }

    await spot.destroy();

    res.json({
        message: "Successfully deleted"
    });
})



//
// Edit a spot
//
router.put('/:spotId', spotExists, requireAuth, requireSpotOwner, validateSpot, async (req, res, next) => {
    const { spotId } = req.params;
    const user = req.user;

    const spot = await Spot.findByPk(spotId);

    // Check if spot exists, otherwise 404
    // if (!spot) {
    //     const err = new Error();
    //     err.message = "Spot couldn't be found";
    //     res.status(404);
    //     return res.json(err);
    // }

    spot.set({...req.body});

    await spot.save();

    res.json(spot);
});


//
// Add an Image to a Spot based on the Spot's id
//
router.post('/:spotId/images', spotExists, requireAuth, requireSpotOwner, async (req, res, next) => {
    const { spotId } = req.params;
    const { url, preview } = req.body;

    const image = SpotImage.build({ spotId, url, preview });
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
router.post('/:spotId/reviews', spotExists, requireAuth, validateReview, async (req, res, next) => {
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
        if (r.User.id === userId) {``
            const err = new Error();
            err.message = "User already has a review for this spot"
            res.status(500);
            return res.json(err);
        }
    }


    const newReview = Review.build({userId, spotId, review, stars});
    await newReview.save();

    res.status(201);
    res.json(newReview);
});





module.exports = router;

// Create router
const express = require('express');
const router = express.Router();

// Import model for queries
const { Spot, SpotImage, Review, User } = require('../../db/models');

// For the routes that require authentication
const { requireAuth } = require('../../utils/auth');

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
router.get('/:spotId', async (req, res, next) => {
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

    // Check if spot exists, throw 404 if not
    if (!spot) {
        const err = new Error();
        err.message = "Spot couldn't be found";
        res.status = 404;
        return res.json(err);
    }

    // Add review count and average rating
    spot = spot.toJSON();
    spot = addReviewCount(spot);
    spot = addAvgRating(spot);

    delete spot.Reviews;

    res.json(spot);
});





module.exports = router;

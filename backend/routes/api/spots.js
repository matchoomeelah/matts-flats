// Create router
const express = require('express');
const router = express.Router();

// Import model for queries
const { Spot, SpotImage, Review, User } = require('../../db/models');

// For the routes that require authentication
const { requireAuth } = require('../../utils/auth');

// Import validation check method and our custome handleValidationErrors message
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

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
        res.status(404);
        return res.json(err);
    }

    // Add review count and average rating
    spot = spot.toJSON();
    spot = addReviewCount(spot);
    spot = addAvgRating(spot);

    delete spot.Reviews;

    res.json(spot);
});


//
// Validate new spot
//

const validateNewSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .isFloat({ min: -90.0, max: 90.0 })
        .withMessage('Latitude is not valid'),
    check('lng')
        .isFloat({ min: -180.0, max: 180.0 })
        .withMessage('Longitude is not valid'),
    check('name')
        .isLength({ max: 50 })
        .withMessage("Name must be less than 50 characters"),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage("Description is required"),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage("Price per day is required"),
    handleValidationErrors
];

//
// Create a spot
//
router.post('/', requireAuth, validateNewSpot, async (req, res, next) => {
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
router.delete('/:spotId', requireAuth, async (req, res, next) => {
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

    // Check if authorized user
    if (user.id !== spot.ownerId) {
        const err = new Error();
        err.message = "Cannot delete a spot you do not own";
        res.status(403);
        return res.json(err);
    }

    await spot.destroy();

    res.json({
        message: "Successfully deleted"
    });
})



module.exports = router;

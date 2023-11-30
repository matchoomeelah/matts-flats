// Create the router
const express = require('express');
const router = express.Router();

const { SpotImage, Spot } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');


//
// Get all spot images (for convenience in testing)
//
router.get('/', async (req, res, next) => {
    const images = await SpotImage.findAll({
        include: {
            model: Spot
        }
    });
    res.json(images);
});

//
//  Delete a Spot Image
//
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;
    const user = req.user;

    // Find the spot image
    const image = await SpotImage.findByPk(imageId);

    // image must exist
    if (!image) {
        const err = new Error();
        err.message = "Spot Image couldn't be found";
        res.status(404);
        return res.json(err);
    }

    // Find the spot
    const spot = await Spot.findByPk(image.spotId);

    // Spot must belong to current user
    if (spot.ownerId !== user.id) {
        const err = new Error();
        err.title = "Authorization required";
        err.message = "Forbidden";
        res.status(403);
        return res.json(err);
    }

    await image.destroy();

    res.json({
        message: "Successfully deleted"
    });
});




module.exports = router;

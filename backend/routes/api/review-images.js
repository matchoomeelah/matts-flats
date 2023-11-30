// Create the router
const express = require('express');
const router = express.Router();

const { ReviewImage, Review } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');


//
// Get all review images (for convenience in testing)
//
// router.get('/', async (req, res, next) => {
//     const images = await ReviewImage.findAll({
//         include: {
//             model: Review
//         }
//     });
//     res.json(images);
// });

//
//  Delete a Review Image
//
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const { imageId } = req.params;
    const user = req.user;

    // Find the review image
    const image = await ReviewImage.findByPk(imageId);

    // image must exist
    if (!image) {
        const err = new Error();
        err.message = "Review Image couldn't be found";
        res.status(404);
        return res.json(err);
    }

    // Find the review
    const review = await Review.findByPk(image.reviewId);

    // Review must belong to current user
    if (review.userId !== user.id) {
        const err = new Error();
        err.message = "Forbidden";
        res.status(403);
        return res.json(err);
    }

    // Delete it
    await image.destroy();

    res.json({
        message: "Successfully deleted"
    });
});




module.exports = router;

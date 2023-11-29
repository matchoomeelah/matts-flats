// Create the router
const express = require('express');
const router = express.Router();

const { Review, User, ReviewImage, Spot, SpotImage } = require('../../db/models');

// Middleware to help with validations and authentication
const { validateReview, reviewExists } = require('../../utils/validation');
const { requireAuth, requireReviewOwner } = require('../../utils/auth');

//
// Get all Reviews of the Current User
//
router.get('/current', requireAuth, async (req, res, next) => {
    const user = req.user;

    let reviews = await user.getReviews({
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: Spot,
            include: {
                model: SpotImage,
                attributes: ["url"],
                where: {
                    preview: true
                },
                required: false
            }
        },
        {
            model: ReviewImage,
            attributes: ['id', 'url']
        }]
    });

    // Specify the preview image
    reviews = reviews.map(review => {
        let url = null;

        if (review.Spot.SpotImages.length){
            url = review.Spot.SpotImages[0].url;
        }

        review = review.toJSON();
        review.Spot.previewImage = url;
        delete review.Spot.SpotImages;

        return review;
    });

    res.json(reviews);
});


//
// Add an Image to a Review based on the Review's id
//
router.post('/:reviewId/images', requireAuth, reviewExists, requireReviewOwner, async (req, res, next) => {
    const { reviewId } = req.params;
    const { url } = req.body;

    // Find current review
    const review = await Review.findByPk(reviewId, {
        include: {
            model: ReviewImage
        }
    });

    // Return error if max of 10 images reached already
    if (review.ReviewImages.length >= 10) {
        const err = new Error();
        err.message = "Maximum number of images for this resource was reached"
        res.status(403);
        return res.json(err);
    }

    // Create the image in the DB
    const image = ReviewImage.build({reviewId: parseInt(reviewId), url});
    await image.save();

    // Return specified attributes
    res.json({
        id: image.id,
        url: image.url
    });
});



//
// Edit a Review
//
router.put('/:reviewId', requireAuth, reviewExists, requireReviewOwner, validateReview, async (req, res, next) => {
    const { reviewId } = req.params;

    const currentReview = await Review.findByPk(reviewId);
    currentReview.set({ ...req.body });
    await currentReview.save();

    res.json(currentReview);
});


//
// Delete a Review
//
router.delete('/:reviewId', requireAuth, reviewExists, requireReviewOwner, async (req, res, next) => {
    const { reviewId } = req.params;

    const currentReview = await Review.findByPk(reviewId);

    await currentReview.destroy();

    res.json({
        message: "Successfully deleted"
    });
})





module.exports = router;

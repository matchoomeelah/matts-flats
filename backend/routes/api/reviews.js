// Create the router
const express = require('express');
const router = express.Router();

const { Review, User, ReviewImage, Spot, SpotImage } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');
const { addPreviewImage } = require('../../utils/spot-helpers');

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
                }
            }
        },
        {
            model: ReviewImage,
            attributes: ['id', 'url']
        }]
    });

    // Specify the preview image
    reviews = reviews.map(review => {
        const url = review.Spot.SpotImages[0].url;

        review = review.toJSON();
        review.Spot.previewImage = url;
        delete review.Spot.SpotImages;

        return review;
    })

    res.json(reviews);
});






module.exports = router;

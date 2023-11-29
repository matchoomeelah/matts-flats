const { Spot } = require('../db/models');

// Helper funcs
const addAvgRating = (spot) => {
    // Calculate the avgRating for each spot
    let avg = null;

    if (spot.Reviews.length) {
        let sum = 0;
        spot.Reviews.forEach(rev => sum += rev.stars);
        avg = sum / spot.Reviews.length;
    }

     spot.avgRating = avg;

     return spot;
};

const addPreviewImage = (spot) => {
    if (spot.SpotImages && spot.SpotImages.length) {
        spot.previewImage = spot.SpotImages[0].url;
    } else {
        spot.previewImage = null;
    }

    return spot
}

const addReviewCount = (spot) => {
    const count = spot.Reviews.length;

    spot.numReviews = count;

    return spot;
}





module.exports = { addAvgRating, addPreviewImage, addReviewCount };

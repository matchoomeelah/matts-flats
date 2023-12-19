// constants
const GET_REVIEWS_BY_SPOT_ID = 'reviews/getReviewsBySpotId';

// action creators
export const actionGetReviewsBySpotId = (reviews) => {
    return {
        type: GET_REVIEWS_BY_SPOT_ID,
        reviews
    }
}

// thunks
export const thunkGetReviewsBySpotId = (spotId) => async (dispatch) => {
    // Get response
    const response = await fetch(`/api/spots/${spotId}/reviews`);

    // Extract the data
    const data = await response.json();
    const reviews = data.Reviews;
    // console.log("thunk REVIEWS: ", reviews);


    // Do the thing
    if (response.ok) {
        dispatch(actionGetReviewsBySpotId(reviews));
    }

    return reviews;
}

// reducer
export default function reviewsReducer(state = {}, action) {
    switch (action.type) {
        case GET_REVIEWS_BY_SPOT_ID: {
            const newState = {};
            action.reviews.forEach(rev => {
                newState[rev.id] = rev;
            });

            // console.log("REVIEWS: ", action.reviews);
            // console.log("GETTING REVIEWS");
            return newState;
        }
        default: {
            // console.log("DEFAULTING")
            return state;
        }
    }
}

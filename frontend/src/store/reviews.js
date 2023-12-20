import { csrfFetch } from "./csrf";

// constants
const GET_REVIEWS_BY_SPOT_ID = 'reviews/getReviewsBySpotId';
const ADD_REVIEW = 'reviews/addReviewBySpotId';

// action creators
export const actionGetReviewsBySpotId = (reviews) => {
    return {
        type: GET_REVIEWS_BY_SPOT_ID,
        reviews
    }
}

export const actionAddReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}

// thunks
export const thunkGetReviewsBySpotId = (spotId) => async (dispatch) => {
    // Get response
    const response = await fetch(`/api/spots/${spotId}/reviews`);

    // Extract the data
    const data = await response.json();
    const reviews = data.Reviews;

    // Send to the reducer
    if (response.ok) {
        dispatch(actionGetReviewsBySpotId(reviews));
    }

    return reviews;
}

export const thunkAddReview = (reviewDetails, spotId) => async (dispatch) => {
    // Get response
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewDetails)
    });

    // Extract the data
    const review = await response.json();

    // Send to the reducer
    if (response.ok) {
        dispatch(actionAddReview(review));
    }

    return review;
}

// reducer
export default function reviewsReducer(state = {}, action) {
    switch (action.type) {
        case GET_REVIEWS_BY_SPOT_ID: {
            const newState = {};
            action.reviews.forEach(rev => {
                newState[rev.id] = rev;
            });
            return newState;
        }
        case ADD_REVIEW: {
            const newState = { ...state };
            newState[action.review.id] = action.review;
            return newState;
        }
        default: {
            return state;
        }
    }
}

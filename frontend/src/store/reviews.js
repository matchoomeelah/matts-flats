import { csrfFetch } from "./csrf";
// import {useSelector} from'react-redux';

// constants
const GET_REVIEWS_BY_SPOT_ID = 'reviews/getReviewsBySpotId';
const GET_USER_REVIEWS = 'reviews/getUserReviews';
const ADD_REVIEW = 'reviews/addReview';
const DELETE_REVIEW = 'reviews/deleteReview';
const CLEAR_USER_REVIEWS = 'reviews/clearUserReviews';

// action creators
export const actionGetReviewsBySpotId = (reviews) => {
    return {
        type: GET_REVIEWS_BY_SPOT_ID,
        reviews
    }
}

export const actionGetUserReviews = (reviews) => {
    return {
        type: GET_USER_REVIEWS,
        reviews
    }
}

export const actionAddReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}

export const actionDeleteReview = (reviewId) => {
    return  {
        type: DELETE_REVIEW,
        reviewId
    }
}

export const actionClearUserReviews = () => {
    return {
        type: CLEAR_USER_REVIEWS
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

export const thunkGetUserReviews = () => async (dispatch) => {
    // Get reviews from the database
    const response = await csrfFetch('/api/reviews/current');

    // Extract the data
    const data = await response.json();
    const reviews = data.Reviews;

    // Send to the reducer
    if (response.ok) {
        dispatch(actionGetUserReviews(reviews))
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


    // Get current user details
    const userResponse = await csrfFetch('/api/session');
    const sessionUser = await userResponse.json();


    // Get current spot
    const spotResponse = await csrfFetch(`/api/spots/${spotId}`);
    const spot = await spotResponse.json();


    // Send to the reducer
    if (response.ok) {
        dispatch(actionAddReview({
            ...review,
            User: sessionUser.user,
            Spot: spot
        }));
    }

    return review;
}

export const thunkDeleteReview = (reviewId) => async (dispatch) => {
    // Delete from the database
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    // Delete from the store if successful
    if (response.ok) {
        dispatch(actionDeleteReview(reviewId));
    }

    return response;
}


// initial state
const initialState = {
    spotReviews: {},
    userReviews: {}
}

// reducer
export default function reviewsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_REVIEWS_BY_SPOT_ID: {
            const newSpotReviews = {};
            action.reviews.forEach(rev => {
                newSpotReviews[rev.id] = rev;
            });

            const newState = { ...state, spotReviews: newSpotReviews};

            return newState;
        }
        case GET_USER_REVIEWS: {
            const newUserReviews = {};
            action.reviews.forEach(rev => {
                newUserReviews[rev.id] = rev;
            });

            const newState = { ...state, userReviews: newUserReviews};

            return newState;
        }
        case ADD_REVIEW: {
            // Add to all reviews
            const newSpotReviews = { ...state.spotReviews }
            newSpotReviews[action.review.id] = action.review;

            // Add to user reviews?
            const newUserReviews = { ...state.userReviews }
            newUserReviews[action.review.id] = action.review;

            const newState = { ...state, spotReviews: newSpotReviews, userReviews: newUserReviews };
            return newState;
        }
        case DELETE_REVIEW: {
            // Delete from all spots
            const newSpotReviews = { ...state.spotReviews };
            delete newSpotReviews[action.reviewId]

            // Delete from user spots
            const newUserReviews = { ...state.userReviews };
            delete newUserReviews[action.reviewId];

            const newState = { ...state, spotReviews: newSpotReviews, userReviews: newUserReviews };

            return newState;
        }
        case CLEAR_USER_REVIEWS: {
            const newState = { ...state, userReviews: {}};
            return newState;
        }
        default: {
            return state;
        }
    }
}

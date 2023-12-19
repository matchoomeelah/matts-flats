import { csrfFetch } from "./csrf";

// constants
const LOAD_SPOTS = 'spots/loadSpots';
const GET_SPOT_BY_ID = 'spots/getSpotOwner';


// action creators
export const actionLoadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

export const actionGetSpotById = (spot) => {
    return {
        type: GET_SPOT_BY_ID,
        spot
    }
}


// thunks
export const thunkLoadSpots =  () => async (dispatch) => {
    // Fetch the data
    const response = await csrfFetch('/api/spots');

    // Extract the data from the response
    const data = await response.json();
    const spots = data.Spots;

    // Send to reducer
    if (response.ok) {
        dispatch(actionLoadSpots(spots));
    }

    console.log("SPOTS:", spots);
}

export const thunkGetSpotById = (spotId) => async (dispatch) => {
    // Fetch the data
    const response = await fetch(`/api/spots/${spotId}`);

    // Extract the data from the response
    const spot = await response.json();

    // Send to the reducer
    if (response.ok) {
        dispatch(actionGetSpotById(spot));
    }

    return spot;
}

// initial state
const initialState = {
    currentSpot: null,
    allSpots: []
};

//reducer
export default function spotsReducer(state = initialState, action) {
    switch(action.type) {
        // Initial load
        case LOAD_SPOTS: {
            const newSpots = { ...state, currentSpot: null, allSpots: action.spots }
            return newSpots;
        }
        case GET_SPOT_BY_ID: {
            const newSpots = { ...state, currentSpot: action.spot};
            return newSpots;
        }
        default:
            return state;
    }
}

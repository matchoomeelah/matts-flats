import { csrfFetch } from "./csrf";

// constants
const LOAD_SPOTS = 'spots/loadSpots';
const GET_SPOT_DETAILS = 'spots/getSpotDetails';


// action creators
export const actionLoadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

export const actionGetSpotDetails = (spot) => {
    return {
        type: GET_SPOT_DETAILS,
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

export const thunkGetSpotDetails = (spotId) => async (dispatch) => {
    // Fetch the data
    const response = await csrfFetch(`api/spots/${spotId}`);

    // Extract the data from the response
    const data = await response.json();
    // console.log("MY CURRENT SPOT: ", data);

    // Send to reducer
    if (response.ok) {
        dispatch(actionGetSpotDetails(data));
    }

    return data;
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
            const newSpots = { ...state, allSpots: action.spots }
            return newSpots;
        }
        case GET_SPOT_DETAILS: {
            const newSpots = { ...state, currentSpot: action.spot}
            return newSpots;
        }
        default:
            return state;
    }
}

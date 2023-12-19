import { csrfFetch } from "./csrf";

// constants
const LOAD_SPOTS = 'spots/loadSpots';


// action creators
export const actionLoadSpots = (spots) => {
    return {
        type: LOAD_SPOTS,
        spots
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
        default:
            return state;
    }
}

import { csrfFetch } from "./csrf";


//           //
// constants //
//           //

const LOAD_SPOTS = 'spots/loadSpots';
const GET_SPOT_BY_ID = 'spots/getSpotOwner';
const CREATE_SPOT = 'spots/createSpot';
const GET_USER_SPOTS = 'spots/getUserSpots';
const CLEAR_USER_SPOTS = 'spots/clearUserSpots';
const CLEAR_CURR_SPOT = 'spots/clearCurrSpot';
const EDIT_SPOT = 'spots/editSpot';
const DELETE_SPOT = 'spots/deleteSpot';


//                   //
//  action creators  //
//                   //

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

export const actionCreateSpot = (spot) => {
    return {
        type: CREATE_SPOT,
        spot
    }
}

export const actionGetUserSpots = (spots) => {
    return {
        type: GET_USER_SPOTS,
        spots
    }
}

export const actionClearUserSpots = () => {
    return {
        type: CLEAR_USER_SPOTS,
    }
}

export const actionClearCurrSpot = () => {
    return {
        type: CLEAR_CURR_SPOT,
    }
}

export const actionEditSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        spot
    }
}

export const actionDeleteSpot = (spotId) => {
    return {
        type: DELETE_SPOT,
        spotId
    }
}

//        //
// thunks //
//        //

export const thunkLoadSpots = () => async (dispatch) => {
    // Fetch the data
    const response = await csrfFetch('/api/spots');

    // Extract the data from the response
    const data = await response.json();
    const spots = data.Spots;

    // Send to reducer
    if (response.ok) {
        dispatch(actionLoadSpots(spots));
    }
}

export const thunkGetSpotById = (spotId) => async (dispatch) => {
    // Fetch the data
    const response = await csrfFetch(`/api/spots/${spotId}`);

    // Extract the data from the response
    const spot = await response.json();

    // Send to the reducer
    if (response.ok) {
        dispatch(actionGetSpotById(spot));
    }

    return spot;
}


export const thunkCreateSpot = (spotDetails, images) => async (dispatch) => {
    // Fetch the data
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(spotDetails)
    });

    // Extract the data
    const spot = await response.json();

    // Send to the reducer
    if (response.ok) {
        dispatch(actionCreateSpot({
            ...spot,
            avgRating: 'New',
            previewImage: images[0]
        }));

        // Post spot images to the server
        for (let i = 0; i < images.length; i++) {
            let preview = "false";

            // First image in the array should be set as preview
            if (i === 0) {
                preview = true;
            }

            // Check in case one of the image fields was passed over
            if (images[i].length) {
                await csrfFetch(`/api/spots/${spot.id}/images`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        spotId: spot.id,
                        url: images[i],
                        preview: preview
                    })
                })
            }
        }
    }

    return spot;
}


export const thunkGetUserSpots = () => async (dispatch) => {
    // Fetch the data
    const response = await csrfFetch('/api/spots/current');

    // Extract the data
    const data = await response.json();
    const spots = data.Spots;

    // Send to the reducer
    if (response.ok) {
        dispatch(actionGetUserSpots(spots));
    }

    return spots;
}

export const thunkEditSpot = (spotDetails, spotId) => async (dispatch) => {
    // Fetch the data
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spotDetails)
    });

    // Extract the data
    const spot = await response.json();

    // Send to the reducer
    if (response.ok) {
        dispatch(actionEditSpot(spot))
    }

    return spot;
}


export const thunkDeleteSpot = (spotId) => async (dispatch) => {
    // Delete from server
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });

    // Send to reducer to delete from allSpots and user spots
    if (response.ok) {
        dispatch(actionDeleteSpot(spotId));
    }

    return response;
}



// initial state
const initialState = {
    allSpots: {},
    currentSpot: null,
    userSpots: {}
};

//reducer
export default function spotsReducer(state = initialState, action) {
    switch (action.type) {
        // Initial load
        case LOAD_SPOTS: {
            const newAllSpots = {};
            action.spots.forEach(spot => {
                newAllSpots[spot.id] = spot;
            });
            const newSpots = { ...state, currentSpot: null, allSpots: newAllSpots }
            return newSpots;
        }
        case GET_SPOT_BY_ID: {
            const newSpots = { ...state, currentSpot: action.spot };
            return newSpots;
        }
        case CREATE_SPOT: {
            const newAllSpots = { ...state.allSpots }
            newAllSpots[action.spot.id] = {...newAllSpots[action.spot.id], ...action.spot };
            const newSpots = { ...state, allSpots: newAllSpots }
            return newSpots;
        }
        case GET_USER_SPOTS: {
            const newSpots = { ...state }
            const newUserSpots = {};
            action.spots.forEach(spot => {
                newUserSpots[spot.id] = spot;
            });
            newSpots.userSpots = newUserSpots;
            return newSpots;
        }
        case CLEAR_USER_SPOTS: {
            const newSpots = { ...state };
            newSpots.userSpots = {};
            return newSpots;
        }
        case CLEAR_CURR_SPOT: {
            const newSpots = { ...state, currentSpot: null}
            return newSpots;
        }
        case EDIT_SPOT: {
            const newAllSpots = { ...state.allSpots }
            newAllSpots[action.spot.id] = {...newAllSpots[action.spot.id], ...action.spot};
            const newSpots = { ...state, allSpots: newAllSpots};
            return newSpots;
        }
        case DELETE_SPOT: {
            // Delete from all spots
            const newAllSpots = { ...state.allSpots };
            delete newAllSpots[action.spotId]

            // Delete from user spots
            const newUserSpots = { ...state.userSpots };
            delete newUserSpots[action.spotId];

            const newSpots = { ...state, allSpots: newAllSpots, userSpots: newUserSpots };
            return newSpots;
        }
        default:
            return state;
    }
}

import { csrfFetch } from "./csrf";

// constants
const LOAD_SPOTS = 'spots/loadSpots';
const GET_SPOT_BY_ID = 'spots/getSpotOwner';
const CREATE_SPOT = 'spots/createSpot';
const GET_USER_SPOTS = 'spots/getUserSpots';
const EDIT_SPOT = 'spots/editSpot';


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

export const actionEditSpot = (spot) => {
    return {
        type: EDIT_SPOT,
        spot
    }
}


// thunks
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
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spotDetails)
    });


    // Extract the data
    const spot = await response.json();

    console.log("SPOT", spot);


    // Send to the reducer
    if (response.ok) {
        dispatch(actionCreateSpot(spot));

        for (let i = 0; i < images.length; i++) {
            let preview = "false";

            if (i === 0) {
                preview = true;
            }

            if (images[i].length) {
                const imgResponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        spotId: spot.id,
                        url: images[i],
                        preview: preview
                    })
                })

                console.log(await imgResponse.json());
            }
        }

    }

    return spot;
}


export const thunkGetUserSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current');

    const data = await response.json();
    const spots = data.Spots;

    console.log(spots);

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


    //Extract the data
    const spot = await response.json();


    // Send to the reducer
    if (response.ok) {
        dispatch(actionEditSpot(spot))
    }

    return spot;
}

// initial state
const initialState = {
    allSpots: [],
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
            newAllSpots[action.spot.id] = action.spot;
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
        case EDIT_SPOT: {
            const newAllSpots = { ...state.allSpots }
            newAllSpots[action.spot.id] = {...newAllSpots[action.spot.id], ...action.spot};
            const newSpots = { ...state, allSpots: newAllSpots};
            return newSpots;
        }
        default:
            return state;
    }
}

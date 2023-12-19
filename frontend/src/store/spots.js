import { csrfFetch } from "./csrf";

// constants
const LOAD_SPOTS = 'spots/loadSpots';
const GET_SPOT_BY_ID = 'spots/getSpotOwner';
const CREATE_SPOT = 'spots/createSpot';


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
    // console.log(spotDetails);
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

        dispatch(actionCreateSpot(spot));
    }

    return spot;
}

// export const thunkAddSpotImage = (spotImage) => async dispatch => {
//     // Fetch the data
//     const response = await csrfFetch('/api/spots', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(spotDetails)
//     });


//     // Extract the data
//     const spot = await response.json();
// }

// initial state
const initialState = {
    currentSpot: null,
    allSpots: []
};

//reducer
export default function spotsReducer(state = initialState, action) {
    switch (action.type) {
        // Initial load
        case LOAD_SPOTS: {
            const newSpots = { ...state, currentSpot: null, allSpots: action.spots }
            return newSpots;
        }
        case GET_SPOT_BY_ID: {
            const newSpots = { ...state, currentSpot: action.spot };
            return newSpots;
        }
        case CREATE_SPOT: {
            const newSpots = { ...state, currentSpot: action.spot, allSpots: [...state.allSpots, action.spot] }
            return newSpots;
        }
        default:
            return state;
    }
}

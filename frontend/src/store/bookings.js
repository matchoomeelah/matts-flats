import { csrfFetch } from "./csrf";

//
// Constants
//
// const GET_BOOKINGS_BY_SPOT_ID = 'bookings/getBookingsBySpotId';
const GET_USER_BOOKINGS = 'bookings/getUserBookings'
const CREATE_BOOKING = 'bookings/createBooking'


//
// Action Creators
//

export const actionGetUserBookings = (bookings) => {
    return {
        type: GET_USER_BOOKINGS,
        bookings
    }
}

export const actionCreateBooking = (booking) => {
    return {
        type: CREATE_BOOKING,
        booking
    }
}


// //
// // Thunks
// //
export const thunkGetUserBookings = () => async (dispatch) => {
    // Get bookings from the database
    const response = await csrfFetch('/api/bookings/current');

    // Extract the data
    const data = await response.json();

    console.log(data)

    const bookings = data;

    // Send to the reducer
    if (response.ok) {
        dispatch(actionGetUserBookings(bookings))
    }

    return data;
}

export const thunkAddBooking = (booking) => async (dispatch) => {
    // Add the booking to the database
    const response = await csrfFetch(`/api/spots/${booking.spotId}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
    });

    // Extract the data
    const data = await response.json();

    console.log(data)

    // Send to reducer
    if (response.ok) {
        dispatch(actionCreateBooking(data));
    }

    return data;
}


//
// Reducer
//
const initialState = {
    userBookings: {}
}

export default function bookingsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_BOOKINGS: {
            const newUserBookings= {};
            action.bookings.forEach(booking => {
                newUserBookings[booking.id] = booking;
            });

            const newState = { ...state, userBookings: {...state.userBookings, ...newUserBookings}};
            return newState;
        }
        case CREATE_BOOKING: {
            const newBooking = {}
            newBooking[action.booking.id] = action.booking
            const newState = {...state, userBookings: { ...state.userBookings, ...newBooking} };
            return newState;
        }

        default: {
            return state;
        }
    }
}

import { csrfFetch } from "./csrf";


// constants
const LOGIN_USER = 'session/loginUser';
const LOGOUT_USER = 'session/logoutUser'


// action creators
export const loginUser = (user) => {
    return {
        type: LOGIN_USER,
        user
    }
}

export const logoutUser = () => {
    return {
        type: LOGOUT_USER
    }
}

// thunks
export const thunkLoginUser = (userCredentials) => async (dispatch) => {
    const response = await csrfFetch('/api/session',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCredentials)
    });

    const data = await response.json()


    if (response.ok) {
        dispatch(loginUser(data))
    }

    return data;
}

export const thunkLogoutUser = () => async (dispatch) => {
    const response = await csrfFetch('api/session', {
        method: 'DELETE'
    });

    const data = await response.json();

    if (response.ok) {
        dispatch(logoutUser());
    }

    return data;
}


// Initial session state
const initialState = { user: null };

// reducer
export default function sessionReducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN_USER: {
            const newUser = { ...action.user };
            return newUser;
        }
        case LOGOUT_USER: {
            return { user: null };
        }
        default:
            return state;
    }
}

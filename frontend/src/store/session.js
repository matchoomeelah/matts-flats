import { csrfFetch } from "./csrf";


// constants
const LOGIN_USER = 'session/loginUser';
const LOGOUT_USER = 'session/logoutUser';


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

//
// Login a user
//
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

//
// Logout the current user
//
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

//
// Set user if logged in
//
export const thunkRestoreUser = () => async (dispatch) => {
    const response = await csrfFetch('/api/session');

    const data = await response.json();

    if (response.ok) {
        dispatch(loginUser(data));
    }

    return data;
}

//
// Sign up a new user
//
export const thunkSignup = (user) => async (dispatch) => {
    const { username, firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
            username,
            firstName,
            lastName,
            email,
            password
        })
    });
    const data = await response.json();
    dispatch(loginUser(data));
    return response;
};


// Initial session state
const initialState = { user: null };

// reducer
export default function sessionReducer(state = initialState, action) {
    switch (action.type) {
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

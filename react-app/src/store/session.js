// constants
const SET_USER = "session/SET_USER"
const EDIT_USER = "session/EDIT_USER"
export const REMOVE_USER = "session/REMOVE_USER"

// action creators
const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

const editUser = (user) => ({
    type: EDIT_USER,
    payload: user
})

export const removeUser = () => ({
    type: REMOVE_USER,
})

// thunks

export const authenticate = () => async (dispatch) => {
    const response = await fetch('/api/auth/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(setUser(data))
}

export const login = (email, password) => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setUser(data))
    return {}
}

export const logout = () => async (dispatch) => {
    const response = await fetch("/api/auth/logout", {
        headers: {
            "Content-Type": "application/json",
        }
    });

    dispatch(removeUser());
};

export const editProfile = (userUpdate) => async (dispatch) => {
    const response = await fetch("/api/users/edit", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userUpdate),
    });
    const data = await response.json();
    dispatch(editUser(data));
}


export const signUp = (username, email, password) => async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setUser(data))
    return {};
}



const initialState = {user: null}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {user: action.payload}
        case EDIT_USER:
            return {user: action.payload}
        case REMOVE_USER:
            return {user: null}
        default:
            return state;
    }
}

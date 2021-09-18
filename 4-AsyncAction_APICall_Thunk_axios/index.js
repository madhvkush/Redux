const redux = require("redux");
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require("redux-thunk").default // this middleware helps to communicate with async api calls 
const axios = require("axios"); // for calling api end-point

const initialState = {
    users: [],
    isLoading: false,
    error: ''
}

const USER_REQUESTING = "REQUESTING"
const USER_SUCCESS = "SUCCESS"
const USER_ERROR = "ERROR"

const fetchUserRequest = () => {
    return {
        type: USER_REQUESTING
    }
}

const fetchUserSuccess = (data) => {
    return {
        type: USER_SUCCESS,
        payload: data
    }
}

const fetchUserError = (error) => {
    return {
        type: USER_ERROR,
        error: error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REQUESTING:
            return {
                ...state,
                isLoading: true
            };
        case USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                users: action.payload
            };
        case USER_ERROR:
            return {
                ...state,
                isLoading: false,
                users: [],
                error: action.error
            };
    }
}


const fetchUsers = () => {
    return function (dispatch) {
        dispatch(fetchUserRequest())
        axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
            dispatch(fetchUserSuccess(response.data.map(user => user.name)))
        }).catch(error => {
            dispatch(fetchUserError(error.message))
        })
    }
}

// here we applied thunk middleware with store and this will help to call api (Or async actions) 
const store = redux.createStore(reducer, applyMiddleware(thunkMiddleware))

store.subscribe(() => { console.log(store.getState()) })
store.dispatch(fetchUsers())
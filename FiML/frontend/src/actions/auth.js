import axios from 'axios'
import {createError, createMessage} from './messages'

import {USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL} from './types'

// CHECK TOKEN AND LOAD USER
export const loadUser = () => (dispatch, getState) => {
    
    //User loading
    dispatch({type: USER_LOADING})

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({type: USER_LOADED, payload: res.data}))
        .catch( e => {
            dispatch(createError(e.response.data, e.response.Status))
            dispatch({type: AUTH_ERROR})
        })    
}

// CHECK TOKEN AND LOAD USER
export const login = (username, password) => (dispatch) => {

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // Request Body
    const body = JSON.stringify({username, password})

    axios.post('/api/auth/login', body, config)
        .then(res => 
            dispatch({type: LOGIN_SUCCESS, payload: res.data}))
        .catch( e => {
            dispatch(createError(e.response.data, e.response.Status))
            dispatch({type: LOGIN_FAIL})
        })    
}

// REGSITER USER
export const register = ({username, password, email}) => (dispatch) => {

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // Request Body
    const body = JSON.stringify({username, password, email})

    axios.post('/api/auth/register', body, config)
        .then(res => {
            dispatch({type: REGISTER_SUCCESS, payload: res.data})
            dispatch(createMessage({registerSuccess: `Registration success. Welcome ${username}!`}))
        })
        .catch( e => {
            dispatch(createError(e.response.data, e.response.Status))
            dispatch({type: REGISTER_FAIL})
        })    
}

export const logout = () => (dispatch, getState) => {

    axios.post('/api/auth/logout', null, tokenConfig(getState))
        .then(res => dispatch({type: LOGOUT_SUCCESS}))
        .catch( e => {
            dispatch(createError(e.response.data, e.response.Status))
        })    
}

// Setup config with token - helper function
export const tokenConfig = getState => {
    
    // Get token from state
    const token = getState().auth.token;

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // If token add to headewrs config
    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config
}

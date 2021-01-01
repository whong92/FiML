import axios from 'axios'
import {createError, createMessage} from './messages'

import {USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL} from './types'

// CHECK TOKEN AND LOAD USER
export const loadUser = () => (dispatch, getState) => {
    
    //User loading
    dispatch({type: USER_LOADING})

    axios.get('/auth/users/me/', tokenConfig(getState))
        .then(res => dispatch({type: USER_LOADED, payload: res.data}))
        .catch( e => {
            console.log(e)
            if (e.response.status != 401) { // only report error if its not a unauthorized (expected before login)
                dispatch(createError({api: "failed to load user info"}, e.response.status))
            }
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

    axios.post('/auth/token/login/', body, config)
        .then(
            res => {
                dispatch({type: LOGIN_SUCCESS, payload: res.data})
                dispatch(createMessage({registerSuccess: `Logged in as: ${username}`}))
            }
        )
        .then(
            () => dispatch(loadUser())
        )
        .catch( e => {
            dispatch(createError({api: "failed to login"}, e.response.status))
            dispatch({type: LOGIN_FAIL})
        })    
}

// REGSITER USER
export const register = ({username, password, re_password, email}) => (dispatch) => {

    // Headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // Request Body
    const body = JSON.stringify({username, password, re_password, email})

    axios.post('/auth/users/', body, config)
        .then(res => {
            dispatch({type: REGISTER_SUCCESS, payload: res.data})
            dispatch(createMessage({registerSuccess: `Registration success. Welcome ${username}!`}))
        }) // auto login after registration
        .then(
            () => {
                dispatch(login(username, password))
            }
        )
        .catch( e => {
            console.log(e)
            console.log(e.response.data)
            dispatch(createError({api: "failed to register user"}, e.response.status))
            dispatch({type: REGISTER_FAIL})
        })    
}

export const logout = () => (dispatch, getState) => {

    axios.post('/auth/token/logout/', null, tokenConfig(getState))
        .then(res => dispatch({type: LOGOUT_SUCCESS}))
        .catch( e => {
            dispatch(createError({api: "failed to properly logout user"}, e.response.status))
            dispatch(createError(e.response.data, e.response.status))
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

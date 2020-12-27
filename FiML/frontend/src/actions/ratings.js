import axios from 'axios';
import { RATINGS_ADD, RATINGS_GET, RATINGS_PUT, RATINGS_DEL } from './types'
import {createMessage, createError} from './messages'
import { tokenConfig } from './auth'
import {updateUser} from './recommends'

// TODO: figure out how to synchronize django and 

export const getRatings = () => (dispatch, getState) => {
    axios.get('/backend/api/ratings/', tokenConfig(getState))
        .then(
            res => {
                dispatch({
                    type: RATINGS_GET,
                    payload: res.data
                })
            }
        )
        .catch(e=>{
            dispatch(createError(
                {api: "failed to get your ratings"}, e.response.status
            ))
        })
}

export const addRatings = (ratingToAdd) => (dispatch, getState) => {
    const user = getState().auth.user;
    console.log(ratingToAdd)
    axios.post('/backend/api/ratings/', ratingToAdd, tokenConfig(getState))
        .then(
            res => {
                dispatch(createMessage({
                    createLead: "Added a rating"
                }))
                dispatch({
                    type: RATINGS_ADD,
                    payload: res.data
                })
            }
        )
        .then(
            // forgive me lord for I have sinned
            setTimeout(()=>{dispatch(updateUser(user.id))}, 200) 
        )
        .catch(e=>dispatch(createError(
            {api: "failed to add your rating"}, e.response.status
        )))
}

export const putRatings = (ratingToPut) => (dispatch, getState) => {

    const user = getState().auth.user;
    axios.put(`/backend/api/ratings/${ratingToPut.id}/`, ratingToPut, tokenConfig(getState))
        .then(
            res => {
                dispatch(createMessage({
                    createLead: "Updated a rating"
                }))
                dispatch({
                    type: RATINGS_PUT,
                    payload: ratingToPut
                })
            }
        )
        .then(
            setTimeout(()=>{dispatch(updateUser(user.id))}, 200)
        )
        .catch(e=>dispatch(createError(
            {api: "failed to update your rating"}, e.response.status
        )))
}

export const delRatings = (ratingToDel) => (dispatch, getState) => {

    const user = getState().auth.user;
    axios.delete(`/backend/api/ratings/${ratingToDel.id}/`, tokenConfig(getState))
        .then(
            res => {
                dispatch(createMessage({
                    createLead: "Deleted a rating"
                }))
                dispatch({
                    type: RATINGS_DEL,
                    payload: ratingToDel
                })
            }
        )
        .then(
            setTimeout(()=>{dispatch(updateUser(user.id))}, 200)
        )
        .catch(e=>dispatch(createError(
            {api: "failed to delete your rating"}, e.response.status
        )))
}
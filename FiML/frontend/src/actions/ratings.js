import axios from 'axios';
import { RATINGS_ADD, RATINGS_GET, RATINGS_PUT } from './types'
import {createMessage, createError} from './messages'
import { tokenConfig } from './auth'

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
        .catch(e=>dispatch(createError(
            e.response.data, e.response.status
        )))
}

export const addRatings = (ratingToAdd) => (dispatch, getState) => {
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
        .catch(e=>dispatch(createError(
            e.response.data, e.response.status
        )))
}

export const putRatings = (ratingToPut) => (dispatch, getState) => {

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
        .catch(e=>dispatch(createError(
            e.response.data, e.response.status
        )))
}
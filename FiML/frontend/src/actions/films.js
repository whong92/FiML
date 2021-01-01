import "regenerator-runtime/runtime";
import axios from 'axios';
import { FILMS_GET, FILM_SELECT } from './types'
import {createError, createMessage} from './messages'

export const getFilms = () => dispatch => {

    axios.get('/backend/api/films')
        .then(
            res => {
                dispatch({
                    type: FILMS_GET,
                    payload: res.data
                })
            }
        )
        .catch(
            e => {
                console.log(e)
                dispatch(createError(
                    {api: "failed to fetch films"}, e.response.status
                ))
            }
        )
}

async function setFilm(film, dispatch) {
    dispatch({
        type: FILM_SELECT,
        payload: film
    })
}

export const selectFilm = (film) => (dispatch) => {
    setFilm(film, dispatch)
        .catch(
            e => {
                console.log(e)
                dispatch(createError(
                    {api: "failed to select film"}, e
                ))
            }
        )

}
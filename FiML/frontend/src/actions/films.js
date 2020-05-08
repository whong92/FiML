import axios from 'axios';
import { FILMS_GET } from './types'

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
        .catch(e => console.log(e))
}
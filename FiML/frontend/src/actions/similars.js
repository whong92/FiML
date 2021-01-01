import axios from 'axios';
import { SIMILARS_GET } from './types'
import { tokenConfig } from './auth'
import {createError, createMessage} from './messages'

// TODO include a timestamp to each recommend update, so see which is fresher!

// TODO: change to do fetch from recommends table
export const getSimilars = (film) => (dispatch, getState) => {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.post('/backend/item_similar_to', {"films": [film]})
        .then(
            res => {
                dispatch({
                    type: SIMILARS_GET,
                    payload: {'rec': res.data[film]['sim_items'], 'dist': res.data[film]['sims']}
                })
            }
        )
        .catch(
            e => {
                dispatch(createError({api: "failed to similar items"}, e.response.status))
                console.log(e)
            }
        )
}
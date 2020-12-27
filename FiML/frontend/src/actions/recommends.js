import axios from 'axios';
import { RECOMMENDS_GET, RECOMMENDS_ADD } from './types'
import { tokenConfig } from './auth'
import {createError, createMessage} from './messages'

// TODO include a timestamp to each recommend update, so see which is fresher!

// TODO: change to do fetch from recommends table
export const getRecommends = () => (dispatch, getState) => {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.get('/backend/api/recommendations/', tokenConfig(getState))
        .then(
            res => {
                if(res.data[0]){ // if successful
                    dispatch({
                        type: RECOMMENDS_GET,
                        payload: res.data[0]['recommendations'] // TODO
                    })
                }
            }
        )
        .catch(
            e => {
                dispatch(createError({api: "failed to fetch your recommendations"}, e.response.status))
                console.log(e)
            }
        )
}

export const addRecommends = (recommends) => (dispatch, getState) => {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.post('/backend/api/recommendations/', recommends, tokenConfig(getState))
        .then(
            res => {
                console.log(res.data)
                dispatch({
                    type: RECOMMENDS_ADD,
                    payload: res.data['recommendations']
                })
            }
        )
        .catch(e => {
            dispatch(createError({api: "failed to update your recommendations"}, e.response.status))
            console.log(e)
        })
}

export const putRecommends = (user_id, recommends) => (dispatch, getState) => {
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.put(`/backend/api/recommendations/${user_id}/`, recommends, tokenConfig(getState))
        .then(
            res => {
                console.log(res.data)
                dispatch({
                    type: RECOMMENDS_ADD,
                    payload: res.data['recommendations']
                })
            }
        )
        .catch(e => {
            dispatch(createError({api: "failed to update your recommendations"}, e.response.status))
            console.log(e)
        })
}

// TODO: change to do updates to a recommend table
export const updateUser = (user) => (dispatch, getState) => {

    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    // TODO: fix!!!
    let rated = getState().ratings['ratings']
    let recs = getState().recommends.recommends
    var items = []
    var ratings = []

    for (const [key, value] of Object.entries(rated)) {
        items.push(parseInt(key))
        ratings.push(value['rating'])
    }

    console.log({
        [user]: {
            'items': items, 'ratings': ratings
        }
    })

    axios.post('/backend/update_and_recommend', {
            [user]: {
                'items': items, 'ratings': ratings
            }
        })
        .then(
            res => {
                if (recs) {
                    dispatch(putRecommends(user, {'recommendations': res.data[user]})) // TODO: only add if not outdated?
                } else {
                    dispatch(addRecommends({'recommendations': res.data[user]})) // TODO: only add if not outdated?
                }
            }
        )
        .catch(
            e => {
                dispatch(createError({api: "failed to update your recommendations"}, e.response.status))
                console.log(e)
            }
        )
}
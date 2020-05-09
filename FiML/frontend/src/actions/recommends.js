import axios from 'axios';
import { RECOMMENDS_GET } from './types'


export const getRecommends = (user) => dispatch => {

    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.post('http://127.0.0.1:5000/user_recommend', {'users': [user]})
        .then(
            res => {
                dispatch({
                    type: RECOMMENDS_GET,
                    payload: res.data[user]
                })
            }
        )
        .catch(e => console.log(e))
}

export const updateUser = (user) => dispatch => {

    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.post('http://127.0.0.1:5000/user_update', {'users': [user]})
        .then(
            () => axios.post('http://127.0.0.1:5000/user_recommend', {'users': [user]})
        )
        .then(
            res => {
                dispatch({
                    type: RECOMMENDS_GET,
                    payload: res.data[user]
                })
            }
        )
        .catch(e => console.log(e))
}
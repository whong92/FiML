import { GET_MSG, CREATE_MSG } from '../actions/types';

const initialState = {messages:null}

export default function (state = initialState, action) {
    switch(action.type){
        case GET_MSG:
            return action.payload
        case CREATE_MSG:
            return (state = action.payload);
        default:
            return state;
    }
}
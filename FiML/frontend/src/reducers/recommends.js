import { RECOMMENDS_GET, LOGOUT_SUCCESS } from '../actions/types.js'

const intialState = {
    recommends: null
}

const recReducer = function(state=intialState, action){
    switch(action.type){
        case RECOMMENDS_GET:
            return {
                ...state,
                recommends: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                recommends: null
            }
        default:
            return state
    }
}

export default recReducer;
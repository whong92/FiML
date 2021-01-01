import { SIMILARS_GET, LOGOUT_SUCCESS } from '../actions/types.js'

const intialState = {
    similars: null
}

const simReducer = function(state=intialState, action){
    switch(action.type){
        case SIMILARS_GET:
            return {
                ...state,
                similars: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                similars: null
            }
        default:
            return state
    }
}

export default simReducer;
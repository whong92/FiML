import { RECOMMENDS_GET } from '../actions/types.js'

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
        default:
            return state
    }
}

export default recReducer;
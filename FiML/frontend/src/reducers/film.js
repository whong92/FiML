import { FILMS_GET } from '../actions/types.js'

const intialState = {
    films: []
}

const filmReducer = function(state=intialState, action){
    switch(action.type){
        case FILMS_GET:
            return {
                ...state,
                films: action.payload
            }
        default:
            return state
    }
}

export default filmReducer;
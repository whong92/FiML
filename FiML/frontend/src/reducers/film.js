import { FILMS_GET } from '../actions/types.js'

const intialState = {
    films: []
}

const filmReducer = function(state=intialState, action){
    switch(action.type){
        case FILMS_GET:
            return {
                ...state,
                films: action.payload.map(f=>({name: f.name, dataset_id: f.dataset_id, poster: f.poster}))
            }
        default:
            return state
    }
}

export default filmReducer;
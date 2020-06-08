import { FILMS_GET } from '../actions/types.js'

const intialState = {
    films: []
}

const filmReducer = function(state=intialState, action){
    switch(action.type){
        case FILMS_GET:
            var films = new Array(action.payload.length).fill(null);
            action.payload.forEach(f => {
                films[f.dataset_id] = {name: f.name, dataset_id: f.dataset_id, poster: f.poster}
            })
            return {
                ...state,
                films: films
            }
        default:
            return state
    }
}

export default filmReducer;
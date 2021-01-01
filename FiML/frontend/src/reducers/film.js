import { FILMS_GET, FILM_SELECT } from '../actions/types.js'

const intialState = {
    films: [],
    selected_film: null
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
        case FILM_SELECT:
            var f = action.payload.film
            return {
                ...state,
                selected_film: {name: f.name, dataset_id: f.dataset_id, poster: f.poster}
            }
        default:
            return state

    }
}

export default filmReducer;
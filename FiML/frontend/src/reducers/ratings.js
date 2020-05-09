import { RATINGS_GET, RATINGS_ADD, RATINGS_PUT } from '../actions/types.js'

const intialState = {
    ratings: {}
}

const ratingReducer = function(state=intialState, action){
    switch(action.type){
        case RATINGS_GET:
            {
                let ratings = {}
                action.payload.forEach(r => ratings[r.film] = r)
                return {
                    ...state,
                    ratings: {...ratings}
                }
            }
        case RATINGS_ADD:
        case RATINGS_PUT:
            {
                let ratings = state.ratings
                ratings[action.payload.film] = action.payload
                return {
                    ...state,
                    ratings: {...ratings}
                }
            }
        default:
            return state
    }
}

export default ratingReducer;
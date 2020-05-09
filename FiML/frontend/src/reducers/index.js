import { combineReducers } from 'redux';
import filmReducer from './film'
import ratingReducer from './ratings'
import authReducer from './auth'
import errorReducer from './errors'
import messageReducer from './messages'
import recReducer from './recommends'

export default combineReducers({
    films: filmReducer,
    ratings: ratingReducer,
    auth: authReducer,
    errors: errorReducer,
    message: messageReducer,
    recommends: recReducer,
});
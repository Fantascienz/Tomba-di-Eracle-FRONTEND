import {combineReducers} from 'redux';
import utenteReducer from './utenteReducer';

const rootReducer = combineReducers({
    utente: utenteReducer
})

export default rootReducer;
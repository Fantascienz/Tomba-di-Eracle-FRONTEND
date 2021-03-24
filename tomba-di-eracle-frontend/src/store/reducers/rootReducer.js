import {combineReducers} from 'redux';
import personaggioReducer from './personaggioReducer';
import utenteReducer from './utenteReducer';

const rootReducer = combineReducers({
    utente: utenteReducer,
    personaggio: personaggioReducer
})

export default rootReducer;
import {combineReducers} from 'redux';
import personaggioReducer from './personaggioReducer';
import utenteReducer from './utenteReducer';
import adminReducer from './adminReducer'
import masterReducer from './masterReducer';

const rootReducer = combineReducers({
    utente: utenteReducer,
    personaggio: personaggioReducer,
    admin: adminReducer,
    master: masterReducer
})

export default rootReducer;
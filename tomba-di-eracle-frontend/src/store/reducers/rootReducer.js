import {combineReducers} from 'redux';
import personaggioReducer from './personaggioReducer';
import utenteReducer from './utenteReducer';
import adminReducer from './adminReducer'

const rootReducer = combineReducers({
    utente: utenteReducer,
    personaggio: personaggioReducer,
    admin: adminReducer
})

export default rootReducer;
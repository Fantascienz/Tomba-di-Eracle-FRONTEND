import {combineReducers} from 'redux';
import personaggioReducer from './personaggioReducer';
import utenteReducer from './utenteReducer';
import adminReducer from './adminReducer'
import masterReducer from './masterReducer';
import gameReducer from './gameReducer';
import messaggiReducer from './messaggiReducer';

const rootReducer = combineReducers({
    utente: utenteReducer,
    personaggio: personaggioReducer,
    admin: adminReducer,
    master: masterReducer,
    game: gameReducer,
    messaggi: messaggiReducer
})

export default rootReducer;
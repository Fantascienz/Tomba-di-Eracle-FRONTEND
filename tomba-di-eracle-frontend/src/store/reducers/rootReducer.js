import {combineReducers} from 'redux';
import personaggioReducer from './personaggioReducer';
import utenteReducer from './utenteReducer';
import adminReducer from './adminReducer'
import masterReducer from './masterReducer';
import gameReducer from './gameReducer';
import messaggiReducer from './messaggiReducer';
import chirotteriReducer from './chirotteriReducer';
<<<<<<< HEAD
import loadingScreenReducer from './loadingScreenReducer';
=======
import onlineReducer from './onlineReducer';
>>>>>>> b53620f (implementato redux nel componente chat, liste pg online aggiornate tramite redux)

const rootReducer = combineReducers({
    utente: utenteReducer,
    personaggio: personaggioReducer,
    admin: adminReducer,
    master: masterReducer,
    game: gameReducer,
    messaggi: messaggiReducer,
    chirotteri: chirotteriReducer,
<<<<<<< HEAD
    loadingScreen: loadingScreenReducer
=======
    online: onlineReducer
>>>>>>> b53620f (implementato redux nel componente chat, liste pg online aggiornate tramite redux)
})

export default rootReducer;
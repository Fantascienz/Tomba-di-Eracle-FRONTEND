import {combineReducers} from 'redux';
import personaggioReducer from './personaggioReducer';
import utenteReducer from './utenteReducer';
import adminReducer from './adminReducer'
import masterReducer from './masterReducer';
import gameReducer from './gameReducer';
import messaggiReducer from './messaggiReducer';
import chirotteriReducer from './chirotteriReducer';
<<<<<<< HEAD
<<<<<<< HEAD
import loadingScreenReducer from './loadingScreenReducer';
=======
import onlineReducer from './onlineReducer';
>>>>>>> b53620f (implementato redux nel componente chat, liste pg online aggiornate tramite redux)
=======
import onlineReducer from './onlineReducer';
>>>>>>> 0e67a539e54ebc33ff44cfdf78dedfe06cc4bd6c

const rootReducer = combineReducers({
    utente: utenteReducer,
    personaggio: personaggioReducer,
    admin: adminReducer,
    master: masterReducer,
    game: gameReducer,
    messaggi: messaggiReducer,
    chirotteri: chirotteriReducer,
<<<<<<< HEAD
<<<<<<< HEAD
    loadingScreen: loadingScreenReducer
=======
    online: onlineReducer
>>>>>>> b53620f (implementato redux nel componente chat, liste pg online aggiornate tramite redux)
=======
    online: onlineReducer
>>>>>>> 0e67a539e54ebc33ff44cfdf78dedfe06cc4bd6c
})

export default rootReducer;
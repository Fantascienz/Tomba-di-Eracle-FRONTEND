
const initState = {
    messaggi: [],
    conversazioni: [],
    utente: 0
}

const messaggiReducer = (state = initState, action) => {

    switch (action.type) {
        case "GET_CONVERSAZIONE":
            state = {
                messaggi: action.messaggi,
                conversazioni: action.conversazioni,
                utente: action.utente
            }
            break;
        case "GET_CONVERSAZIONI_ATTIVE":
            state = {
                // messaggi: action.messaggi,
                conversazioni: action.conversazioni
            }
            break;
        default:
    }
    return state;
}

export default messaggiReducer;
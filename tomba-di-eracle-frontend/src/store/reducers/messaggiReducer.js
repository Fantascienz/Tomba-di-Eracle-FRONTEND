
const initState = {
    messaggi: [],
    conversazioni: []
}

const messaggiReducer = (state = initState, action) => {

    switch (action.type) {
        case "GET_CONVERSAZIONE":
            state = {
                messaggi: action.messaggi,
                conversazioni: action.conversazioni
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
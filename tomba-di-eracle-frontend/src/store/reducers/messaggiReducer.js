
const initState = {
    messaggi: []
}

const messaggiReducer = (state = initState, action) => {

    switch (action.type) {
        case "GET_CONVERSAZIONE":
            state = {
                messaggi: action.messaggi
            }
        default:
    }
    return state;
}

export default messaggiReducer;
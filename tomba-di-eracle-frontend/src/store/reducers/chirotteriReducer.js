
const initState = {
    listaAbilitati: []
}

const chirotteriReducer = (state = initState,action) => {
    switch(action.type) {
        case "GET_ABILITATI":
            state = {
                listaAbilitati: action.listaAbilitati
            }
            break;
        default:
    }
    return state;
}

export default chirotteriReducer;
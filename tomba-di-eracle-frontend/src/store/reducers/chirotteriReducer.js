
const initState = {
    listaAbilitati: [],
    visualizzaRicevuti: false,
    chirotteriRicevuti: []
}

const chirotteriReducer = (state = initState, action) => {
    switch (action.type) {
        case "GET_ABILITATI":
            state = {
                listaAbilitati: action.listaAbilitati,

            }
            break;
        case "GET_CHIROTTERI":
            state = {
                visualizzaRicevuti: !state.visualizzaRicevuti,
                listaAbilitati: [],
                chirotteriRicevuti: action.chirotteri
            }
            break;
        default:

    }
    return state;
}

export default chirotteriReducer;
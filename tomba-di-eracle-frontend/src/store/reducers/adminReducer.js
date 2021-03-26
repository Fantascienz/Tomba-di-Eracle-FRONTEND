const initState = {
    listaUtenti: [],
    redirect: '',
    visualizzaPgAdmin: false
}

const adminReducer = (state = initState, action) => {
    switch (action.type) {
        case "LISTA_UTENTI":
            state = {
                listaUtenti: action.listaUtenti,
            }
            break;
            case "VISUALIZZA_PG":
                state = {
                    visualizzaPgAdmin: !state.visualizzaPgAdmin,
                }
                break;
    }
    return state;
}

export default adminReducer;
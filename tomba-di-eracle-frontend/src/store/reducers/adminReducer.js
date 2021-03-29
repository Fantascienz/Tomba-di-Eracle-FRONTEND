
const initState = {
    listaUtenti: [],
    listaPg: [],
    listaPgFiltrata: [],
    redirect: '',
    visualizzaPgAdmin: false,
}

const adminReducer = (state = initState, action) => {
    switch (action.type) {
        case "LISTA_UTENTI":
            state = {
                listaUtenti: action.listaUtenti,
            }
            break;
        case "LISTA_PG":
            state = {
                listaPg: action.listaPg,
            }
            break;
        case "VISUALIZZA_PG":
            state = {
                visualizzaPgAdmin: !state.visualizzaPgAdmin,
            }
            break;
        case 'FILTRA_RAZZA':
            state = {
                listaPg: action.listaPgFiltrata,
            }
            break;
    }
    return state;
}

export default adminReducer;
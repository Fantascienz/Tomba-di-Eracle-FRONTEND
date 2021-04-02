
const initState = {
    listaUtenti: [],
    listaPg: [],
    listaRazze: [],
    listaPgFiltrata: [],
    redirect: '',
    visualizzaPgAdmin: false,
    filtroRazza: '',
    filtroStato: ''
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
        case "LISTA_RAZZE":
            state = {
                listaRazze: action.listaRazze,
            }
            break;
        case "VISUALIZZA_PG":
            state = {
                visualizzaPgAdmin: !state.visualizzaPgAdmin,
            }
            break;
            case 'FILTRA_RAZZA':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroRazza: action.filtroRazza
            }
            break;
        case 'FILTRA_STATO_ONLINE':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroStato: action.filtroStato
            }
            break;
        case 'FILTRA_STATO_OFFLINE':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroStato: action.filtroStato
            }
            break;

        case 'FILTRA_RAZZA_STATO_ONLINE':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroRazza: action.filtroRazza,
                filtroStato: action.filtroStato

            }
            break;
        case 'FILTRA_RAZZA_STATO_OFFLINE':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroRazza: action.filtroRazza,
                filtroStato: action.filtroStato
            }
            break;
        case 'ORDINA_PER_RAZZA':
            state = {
                listaPgFiltrata: action.listaPgFiltrata
            }
            break;
        case 'ORDINA_PER_NOMINATIVO':
            state = {
                listaPgFiltrata: action.listaPgFiltrata
            }
            break;
        case 'ORDINA_PER_SESSO':
            state = {
                listaPgFiltrata: action.listaPgFiltrata
            }
            break;
        case 'ORDINA_PER_RANGO':
            state = {
                listaPgFiltrata: action.listaPgFiltrata
            }
            break;

        case 'ORDINA_PER_DATA_CREAZIONE':
            state = {
                listaPgFiltrata: action.listaPgFiltrata
            }
            break;
        case 'ORDINA_PER_ID':
            state = {
                listaPgFiltrata: action.listaPgFiltrata
            }
            break;
        default:
            break;
    }
    return state;
}

export default adminReducer;
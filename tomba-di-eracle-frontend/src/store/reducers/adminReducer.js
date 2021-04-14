
const initState = {
    listaUtenti: [],
    listaPg: [],
    listaRazze: [],
    listaPgFiltrata: [],
    listaUtentiFiltrata: [],
    redirect: '',
    visualizzaPgAdmin: false,
    filtroRazza: '',
    filtroStato: '',
    filtroUtente: '',
    filtroTipoUtente: '',
    filtroNominativo: '',
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
        case 'FILTRA_UTENTE':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroUtente: action.filtroUtente
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
        case 'FILTRA_UTENTE_STATO':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroStato: action.filtroStato,
                filtroUtente: action.filtroUtente
            }
            break;
        case 'FILTRA_UTENTE_RAZZA_STATO':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroRazza: action.filtroRazza,
                filtroStato: action.filtroStato,
                filtroUtente: action.filtroUtente
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
        case 'ORDINA_PER_ID_UTENTE':
            state = {
                listaPgFiltrata: action.listaPgFiltrata
            }
            break;
        case 'ORDINA_PER_RAZZA_ORDER_BY_NOMINATIVO':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroRazza: action.filtroRazza
            }
            break;
        case 'ORDINA_PER_RAZZA_ORDER_BY_ID':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroRazza: action.filtroRazza
            }
            break;
        case 'ORDINA_PER_RAZZA_ORDER_BY_SESSO':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroRazza: action.filtroRazza
            }
            break;
        case 'ORDINA_PER_RAZZA_ORDER_BY_RANGO':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroRazza: action.filtroRazza
            }
            break;
        case 'ORDINA_PER_RAZZA_ORDER_BY_DATA_CREAZIONE':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroRazza: action.filtroRazza
            }
            break;
        case 'ORDINA_PER_RAZZA_ORDER_BY_ID_UTENTE':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroRazza: action.filtroRazza
            }
            break;
        case 'ORDINA_PER_UTENTE_BY_NOMINATIVO':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroUtente: action.filtroUtente
            }
            break;
        case 'ORDINA_PER_UTENTE_BY_SESSO':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroUtente: action.filtroUtente
            }
            break;
        case 'ORDINA_PER_UTENTE_BY_RAZZA':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroUtente: action.filtroUtente
            }
            break;
        case 'ORDINA_PER_UTENTE_BY_ID':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroUtente: action.filtroUtente
            }
            break;
        case 'ORDINA_PER_UTENTE_BY_RANGO':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroUtente: action.filtroUtente
            }
            break;
        case 'ORDINA_PER_UTENTE_BY_DATA_CREAZIONE':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroUtente: action.filtroUtente
            }
            break;
        case 'ORDINA_PER_UTENTE_E_RAZZA':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroUtente: action.filtroUtente,
                filtroRazza: action.filtroRazza
            }
            break;
        case 'ORDINA_PER_UTENTE_E_RAZZA_BY_ID':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroUtente: action.filtroUtente,
                filtroRazza: action.filtroRazza
            }
            break;
        case 'ORDINA_PER_UTENTE_E_RAZZA_BY_NOMINATIVO':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroUtente: action.filtroUtente,
                filtroRazza: action.filtroRazza
            }
            break;
        case 'ORDINA_PER_UTENTE_E_RAZZA_BY_SESSO':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroUtente: action.filtroUtente,
                filtroRazza: action.filtroRazza
            }
            break;
        case 'ORDINA_PER_UTENTE_E_RAZZA_BY_RANGO':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroUtente: action.filtroUtente,
                filtroRazza: action.filtroRazza
            }
            break;
        case 'ORDINA_PER_UTENTE_E_RAZZA_BY_DATA_CREAZIONE':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroUtente: action.filtroUtente,
                filtroRazza: action.filtroRazza
            }
            break;
        case 'ORDINA_PER_RAZZA_E_STATO_ORDER_BY':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroRazza: action.filtroRazza,
                filtroStato: action.filtroStato
            }
            break;
        case 'ORDINA_PER_RAZZA_E_STATO_ORDER_BY_ID':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroRazza: action.filtroRazza,
                filtroStato: action.filtroStato
            }
            break;

        case 'ORDINA_PER_RAZZA_E_STATO_ORDER_BY_SESSO':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroRazza: action.filtroRazza,
                filtroStato: action.filtroStato
            }
            break;
        case 'ORDINA_PER_RAZZA_E_STATO_ORDER_BY_RANGO':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroRazza: action.filtroRazza,
                filtroStato: action.filtroStato
            }
            break;
        case 'ORDINA_PER_RAZZA_E_STATO_ORDER_BY_DATA_CREAZIONE':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroRazza: action.filtroRazza,
                filtroStato: action.filtroStato
            }
            break;
        case 'ORDINA_PER_RAZZA_E_STATO_ORDER_BY_ID_UTENTE':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroRazza: action.filtroRazza,
                filtroStato: action.filtroStato
            }
            break;
        case 'FILTRA_UTENTI_PER_TIPO':
            state = {
                listaUtentiFiltrata: action.listaUtentiFiltrata,
                filtroTipoUtente: action.filtroTipoUtente
            }
            break;
        case 'FILTRA_UTENTI_PER_NOMINATIVO':
            state = {
                listaUtentiFiltrata: action.listaUtentiFiltrata,
                filtroNominativo: action.filtroNominativo
            }
            break;
        case 'FILTRA_UTENTI_PER_NOMINATIVO_E_TIPO':

            state = {
                listaUtentiFiltrata: action.listaUtentiFiltrata,
                filtroTipoUtente: action.filtroTipoUtente,
                filtroNominativo: action.filtroNominativo
            }
            break;
        default:
            break;
    }
    return state;
}

export default adminReducer;
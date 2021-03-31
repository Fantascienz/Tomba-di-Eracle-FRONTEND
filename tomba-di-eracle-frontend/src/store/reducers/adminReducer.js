
const initState = {
    listaUtenti: [],
    listaPg: [],
    listaPgFiltrata: [],
    redirect: '',
    visualizzaPgAdmin: false,
    filtroUmano: false,
    filtroLupo: false,
    filtroMeticcio: false,
    filtroStato: false
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
        case 'FILTRA_LUPO':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroUmano: false,
                filtroLupo: true,
                filtroMeticcio: false
            }
            break;
        case 'FILTRA_UMANO':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroUmano: true,
                filtroLupo: false,
                filtroMeticcio: false
            }
            break;
        case 'FILTRA_METICCIO':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroUmano: false,
                filtroLupo: false,
                filtroMeticcio: true
            }
            break;
        case 'FILTRA_STATO':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroStato: true
            }
        case 'RESET_FILTRO_RAZZA':
            state = {
                listaPgFiltrata: action.listaPgFiltrata,
                filtroUmano: false,
                filtroLupo: false,
                filtroMeticcio:false
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
    }
    return state;
}

export default adminReducer;
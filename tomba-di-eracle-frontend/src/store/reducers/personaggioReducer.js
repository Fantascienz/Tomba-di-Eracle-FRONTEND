const initState = {
    personaggio: {},
    personaggiUtente: [],
    redirect: ''
}

const personaggioReducer = (state = initState, action) => {

    switch (action.type) {
        case 'CREA_PERSONAGGIO':
            state = {
                redirect: '/paginaUtente'
            }
            break;
        case 'LISTA_PERSONAGGI_UTENTE':
            state =  {
                personaggiUtente: action.personaggiUtente 
            }
            break;
        default:
            break;
    }

    return state;
}

export default personaggioReducer;
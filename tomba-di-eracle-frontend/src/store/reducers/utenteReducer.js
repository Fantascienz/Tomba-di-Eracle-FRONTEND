const initState = {
    utente: {},
    redirect: '',
    admin: false,
    personaggio: {},
}

const utenteReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_UTENTE':
            state = {
                utente: action.utente,
                admin: action.admin,
                redirect: '/paginaUtente'
            }
            break;
        case 'REGISTRAZIONE_UTENTE':
            state = {
                redirect: '/'
            }
            break;
        case 'TO_MODIFICA_UTENTE':
            state = {
                utente: action.utente,
                redirect: '/modificaUtente'
            }
            break;
        case 'TO_CREAZIONE_PERSONAGGIO':
            state = {
                redirect: '/creazionePersonaggio/' + action.tipo
            }
            break;
        case 'GIOCA':
            state = {
                redirect: '/game'
            }
            break;
        default:
            break;
    }


    return state;
}

export default utenteReducer;


const initState = {
    personaggio: {},
    personaggiUtente: [],
    redirect: '',
    isGarou: ''
}

const personaggioReducer = (state = initState, action) => {

    switch (action.type) {
        case 'CREA_PERSONAGGIO':
            state = {
                personaggio: action.personaggio
            }
            break;
        case 'MODIFICA_PERSONAGGIO':
            state = {
                personaggio: action.modificato
            }
            break;
        case 'LISTA_PERSONAGGI_UTENTE':
            state = {
                personaggiUtente: action.personaggiUtente,
                isGarou: action.isGarou
            }
            break;
        case 'TO_MODIFICA_PERSONAGGIO':
            state = {
                personaggio: action.modifica,
            }
            break;
        default:
            break;
    }

    return state;
}

export default personaggioReducer;
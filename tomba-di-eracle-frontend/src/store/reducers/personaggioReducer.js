const initState = {
    personaggio: {},
    redirect: ''
}

const personaggioReducer = (state = initState, action) => {

    switch (action.type) {
        case 'CREA_PERSONAGGIO':
            state = {
                redirect: '/paginaUtente'
            }
            break;
        default:
            break;
    }

    return state;
}

export default personaggioReducer;
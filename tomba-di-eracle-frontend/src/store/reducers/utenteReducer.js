const initState = {
    utente: {},
    redirect: ''
}

const utenteReducer = (state = initState, action) => {
    
    switch (action.type) {
        case 'LOGIN_UTENTE':
            state = {
                utente: action.utente,
                redirect: '/paginaUtente'
            }
            break;
        default: 
            break;
    }
    
    
    return state;
}

export default utenteReducer;
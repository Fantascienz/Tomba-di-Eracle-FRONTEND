const initState = {
    utente: {},
    redirect: ''
}

const utenteReducer = (state = initState, action) => {
    
    switch (action.type) {
        case 'LOGIN_UTENTE':
            state = {
                
            }
            break;
        default: 
            break;
    }
    
    
    return state;
}

export default utenteReducer;
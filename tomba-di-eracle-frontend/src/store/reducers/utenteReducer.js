const initState = {
    utente: {},
    redirect: ''
}

const utenteReducer = (state = initState, action) => {
    
    switch (action.type) {
        case 'LOGIN-UTENTE':
            state = {
                
            }
        default: 
            break;
    }
    
    
    return state;
}

export default utenteReducer;
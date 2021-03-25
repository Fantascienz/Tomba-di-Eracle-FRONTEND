const initState = {
    listaUtenti: [],
    redirect: ''
}

const adminReducer = (state = initState,action) => {
    switch(action.type) {
        case "LISTA_UTENTI":
            state = {
                listaUtenti: action.listaUtenti,
            }
            break;
    }
    return state;
}

export default adminReducer;
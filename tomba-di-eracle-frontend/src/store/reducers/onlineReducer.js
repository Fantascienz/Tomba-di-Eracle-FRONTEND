const initialState = {
    personaggi: []
}

const onlineReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setList':
            state = {
                personaggi: action.listaPersonaggi
            }
        default:
            return state;
    }
}

export default onlineReducer;
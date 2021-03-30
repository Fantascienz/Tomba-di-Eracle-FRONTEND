const initState = {
    visualizzaPg: false,
    listaPg: []
}

const masterReducer = (state = initState, action) => {

    switch (action.type) {
        case 'VISUALIZZA_LISTA_PG':
            state = {
                listaPg: action.listaPg,
                visualizzaPg: !state.visualizzaPg
            }
            break;
            case 'VISUALIZZA_MIEI_PG':
            state = {
                visualizzaPg: !state.visualizzaPg
            }
            break;

        default:
            break;
    }

    return state;
}

export default masterReducer;
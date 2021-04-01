
const initState = {
    pgAttivo: {},
    ultimaLocation: {},
    direzioniRelativeUltimaLocation: {},
    redirect: ''
}

const gameReducer = (state = initState, action) => {
    switch (action.type) {
        case 'PRIMO_ACCESSO':
            // alert('ultimaLocation nuova ' + action.location.id)
            state = {
                pgAttivo: action.pgAttivo,
                ultimaLocation: action.location,
                direzioniRelativeUltimaLocation: action.direzioniRelativeUltimaLocation,
                redirect: '/game'
            }
            break;
        case 'NAVIGA':
            // alert('nuove dir ' + JSON.stringify(action.direzioniRelativeUltimaLocation.id))
            state = {
                pgAttivo: action.pgAttivo,
                ultimaLocation: action.location,
                direzioniRelativeUltimaLocation: action.direzioniRelativeUltimaLocation,
            }
            // alert('state ' + state.direzioniRelativeUltimaLocation.id)
            break;
    }
    return state;
}

export default gameReducer;
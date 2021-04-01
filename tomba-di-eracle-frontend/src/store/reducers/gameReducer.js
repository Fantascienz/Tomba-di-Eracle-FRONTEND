
const initState = {
    pgAttivo: {},
    ultimaLocation: {},
    redirect:''
}

const gameReducer = (state = initState, action) => {
    switch (action.type) {
        case 'PRIMO_ACCESSO':
            state = {
                pgAttivo: action.pgAttivo,
                ultimaLocation: action.ultimaLocation,
                redirect:'/game'
            }
            break;
    }
    return state;
}

export default gameReducer;

const initState = {
    loadingScreen: false
}

const loadingScreenReducer = (state = initState, action) => {
    switch (action.type) {
        case 'VISUALIZZA':
            state = {
                loadingScreen: true
            }
            break;
    }
    return state;
}

export default loadingScreenReducer;
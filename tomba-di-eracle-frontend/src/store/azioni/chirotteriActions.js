import ChirotteriService from "../../servizi/ChirotteriService"


export const getAbilitati = () => {
    return (dispatch) => {
        ChirotteriService.getAllAbilitati().then(res =>
            dispatch({
                type: "GET_ABILITATI",
                listaAbilitati: res.data
            })
        )
    }
}

export const switchVisualizzaInvia = (flag) => {
    return (dispatch) => {
        if (!flag) {
            ChirotteriService.getChirotteri(JSON.parse(sessionStorage.getItem('pgAttivo')).id).then(res => {
                dispatch({
                    type: "GET_CHIROTTERI",
                    chirotteri: res.data
                })
            }
            )
        } else {
            ChirotteriService.getAllAbilitati().then(res =>
                dispatch({
                    type: "GET_ABILITATI",
                    listaAbilitati: res.data
                })
            )
        }
    }
}
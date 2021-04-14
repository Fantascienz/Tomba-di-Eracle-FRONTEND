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
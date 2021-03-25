import AdminService from "../../servizi/AdminService"


export const getListaUtenti = () => {
    return (dispatch) => {
        AdminService.getListaUtenti().then(res => {
            sessionStorage.setItem('listaUtenti',JSON.stringify(res.data))
            dispatch({
                type: "LISTA_UTENTI",
                listaUtenti: res.data
            })
        })
    }
}
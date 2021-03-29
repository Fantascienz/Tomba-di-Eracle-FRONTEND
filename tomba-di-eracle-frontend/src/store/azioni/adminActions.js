import AdminService from "../../servizi/AdminService"
import PersonaggioService from "../../servizi/PersonaggioService"


export const getListaUtenti = () => {
    return (dispatch) => {
        AdminService.getListaUtenti().then(res => {
            sessionStorage.setItem('listaUtenti', JSON.stringify(res.data))
            dispatch({
                type: "LISTA_UTENTI",
                listaUtenti: res.data
            })
        })
    }
}

export const getListaPersonaggi = () => {
    return (dispatch) => {
        PersonaggioService.getAllPersonaggi().then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: "LISTA_PG",
                listaPg: res.data
            })
        })
    }
}

export const modificaTipoUtente = (utente, nuovoTipo) => {
    sessionStorage.setItem('listaUtenti',null)
    utente.tipo = nuovoTipo;
    return (dispatch) => {
        AdminService.modificaTipo(utente).then(
            AdminService.getListaUtenti().then(res => {
                dispatch({
                    type: "LISTA_UTENTI",
                    listaUtenti: res.data,
                })
            })
        )
    }
}

export const visualizzaPgAdmin = () => {
    return (dispatch) => {
        dispatch({
            type: 'VISUALIZZA_PG',
        })
    }
}
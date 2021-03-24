import UtenteService from "../../servizi/UtenteService"

export const login = (utente) => {
    return (dispatch) => {
        UtenteService.login(utente).then(res => {
            dispatch({
                type: 'LOGIN_UTENTE',
                utente: res.data
            })
        }).catch(err => {
            
        })
    }
}
import UtenteService from "../../servizi/UtenteService"

export const login = (utente) => {
    return (dispatch) => {
        UtenteService.login(utente).then(res => {
            sessionStorage.setItem('utente', JSON.stringify(res.data))
            dispatch({
                type: 'LOGIN_UTENTE',
                utente: res.data
            })
        }).catch(err => {
            alert('Credenziali errate')
        })
    }
}

export const registrazione = (utente) => {
    return (dispatch) => {
        UtenteService.registrazione(utente).then(
            dispatch({
                type: 'REGISTRAZIONE_UTENTE'
            })
        ).catch(err => {
            alert('Email già registrata')
        })
    }
}

export const modificaUtente = (mod) => {
    return (dispatch) => {
        //query per confrontare la vecchia password con quella scritta sul db (chiamata axios)
        //se a buon fine,invio l'utente per l'update,altrimenti torno al modulo
        UtenteService.modifica(mod)
    }
}

export const toModificaUtente = () => {
    return (dispatch) => {
        dispatch({
            type: 'TO_MODIFICA_UTENTE',
            utente: JSON.parse(sessionStorage.getItem('utente'))
        })
    }
}
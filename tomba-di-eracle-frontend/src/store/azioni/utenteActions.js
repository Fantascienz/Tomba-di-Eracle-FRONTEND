import UtenteService from "../../servizi/UtenteService"

export const login = (utente) => {
    return (dispatch) => {
        UtenteService.login(utente).then(res => {
            if (res.data.tipo === 'bannato') {
                alert('sei stato bannato!')
            } else {
                sessionStorage.setItem('utente', JSON.stringify(res.data))
                dispatch({
                    type: 'LOGIN_UTENTE',
                    utente: res.data,
                    admin: res.data.tipo === 'admin' ? true : false
                })
            }
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
        UtenteService.modifica(mod).then(res => {
            sessionStorage.setItem('utente', JSON.stringify(res.data))
            dispatch({
                type: 'LOGIN_UTENTE',
                utente: res.data
            })

        }).catch(error => {
            alert('Errore ' + error.response.status + ': Qualcosa è andato storto!')
        })
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
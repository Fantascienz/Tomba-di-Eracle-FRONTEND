import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import PersonaggioService from "../../servizi/PersonaggioService"
import UtenteService from "../../servizi/UtenteService"

export const login = (utente) => {
    return (dispatch) => {
        UtenteService.login(utente).then(res => {
            if (res.data.tipo === 'bannato') {
                withReactContent(Swal).fire({
                    title: <div>
                        <p>Impossibile accedere!</p>
                        <p>Sei stato bannato!</p>
                    </div>
                })
            }
            else {
                sessionStorage.setItem('utente', JSON.stringify(res.data))
            }
        }).then(res => {
            let utente = JSON.parse(sessionStorage.getItem('utente'));
            //se l'utente è admin o master,recupero la lista dei personaggi totali e poi eseguo la dispatch,altrimenti eseguo solo la dispatch
            if (utente.tipo === 'admin' || utente.tipo === 'master') {
                PersonaggioService.getAllPersonaggi().then(res => {
                    sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
                }).then(
                    dispatch({
                        type: 'LOGIN_UTENTE',
                        utente: utente,
                        admin: utente.tipo === 'admin' ? true : false
                    })
                )
            } else {
                dispatch({
                    type: 'LOGIN_UTENTE',
                    utente: utente,
                    admin: utente.tipo === 'admin' ? true : false
                })
            }
        }).catch(err => {
            withReactContent(Swal).fire({
                title: <div>
                    <p>Errore {err.response.status}</p>
                    <p>Credenziali errate!</p>
                </div>
            })
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
            withReactContent(Swal).fire({
                title: <div>
                    <p>Errore {err.response.status}</p>
                    <p>Email già registrata!</p>
                </div>
            })
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

            if (error.response.status === 400) {
                withReactContent(Swal).fire({
                    title: <div>
                        <p>Errore {error.response.status}</p>
                        <p>La password fornita è errata!</p>
                    </div>
                })
            } else {
                withReactContent(Swal).fire({
                    title: <div>
                        <p>Errore {error.response.status}</p>
                        <p>La mail che hai fornito è gia registrata!</p>
                    </div>
                })
            }
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
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import PersonaggioService from "../../servizi/PersonaggioService"
import UtenteService from "../../servizi/UtenteService"

export const login = (utente) => {
    return (dispatch) => {
        UtenteService.login(utente).then(res => {
            sessionStorage.setItem('utente', JSON.stringify(res.data))
            //se l'utente è admin o master,recupero la lista dei personaggi totali e poi eseguo la dispatch,altrimenti eseguo solo la dispatch
            if (res.data.tipo === 'admin' || res.data.tipo === 'master') {
                PersonaggioService.getAllPersonaggi().then(res => {
                    sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
                }).then(
                    dispatch({
                        type: 'LOGIN_UTENTE',
                        utente: utente,
                        admin: utente.tipo === 'admin' ? true : false
                    })
                )
            } else if (res.data.tipo === 'bannato') {
                sessionStorage.removeItem('utente')
                withReactContent(Swal).fire({
                    title: <div>
                        <p>Impossibile accedere!</p>
                        <p>Sei stato bannato!</p>
                    </div>
                })
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

export const toGioco = () => {
    return (dispatch) => {
        dispatch({
            type: 'GIOCA'
        })
    }
}
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import PersonaggioService from "../../servizi/PersonaggioService"
import UtenteService from "../../servizi/UtenteService"
import bashImpact from "../../suoni/bash_impact.mp3"
import brokenShield from "../../img/broken_shield.png"
import LocationService from "../../servizi/LocationService"
import AdminService from "../../servizi/AdminService"

export const login = (utente) => {
    return (dispatch) => {
        UtenteService.login(utente).then(res => {
            sessionStorage.setItem('utente', JSON.stringify(res.data))
            //se l'utente è admin o master,recupero la lista dei personaggi totali e poi eseguo la dispatch,altrimenti eseguo solo la dispatch
            if (res.data.tipo === 'admin' || res.data.tipo === 'master') {
                PersonaggioService.getAllPersonaggi().then(res => {
                    sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
                }).then(
                    LocationService.sessioneStanze()
                ).then(
                    PersonaggioService.getAllRazzeGroupBy().then(res => {
                        sessionStorage.setItem('listaRazze', JSON.stringify(res.data))
                    })
                ).then(
                    AdminService.getListaUtenti().then(res => {
                        sessionStorage.setItem('listaUtenti', JSON.stringify(res.data))
                    })
                ).then(
                    UtenteService.findAllTipoUtente().then(res => {
                        sessionStorage.setItem('listaTipoUtenti', JSON.stringify(res.data))
                    })
                )
                .then(
                    LocationService.sessioneAllLocation()
                ).then(
                    dispatch({
                        type: 'LOGIN_UTENTE',
                        utente: utente,
                        admin: utente.tipo === 'admin' ? true : false
                    })
                )
            } else if (res.data.tipo === 'bannato') {
                sessionStorage.removeItem('utente')
                withReactContent(Swal).fire({
                    html: <div style={{ height: "400px", backgroundColor: "transparent", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                        <b style={{ color: "#eeaa44", backgroundColor: "transparent", fontSize: "30px", width: "150%" }}>Impossibile accedere!</b>
                        <b style={{ color: "#eeaa44", backgroundColor: "transparent", fontSize: "30px", width: "150%" }}>Sei stato bannato!</b>
                        <audio src={bashImpact} autoPlay />
                    </div>,

                    background: `rgba(0, 0, 0, 0.4) url('${brokenShield}') no-repeat fixed center center `,

                    confirmButtonColor: "#212529",

                    confirmButtonText: <b style={{ color: "#b30000" }}>Ok</b>
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
                html: <div style={{ height: "400px", backgroundColor: "transparent", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <b style={{ color: "#eeaa44", backgroundColor: "transparent", fontSize: "30px", width: "150%" }}>Credenziali errate!</b>
                    <audio src={bashImpact} autoPlay />
                </div>,

                background: `rgba(0, 0, 0, 0.4) url('${brokenShield}') no-repeat fixed center center `,

                confirmButtonColor: "#212529",

                confirmButtonText: <b style={{ color: "#b30000" }}>Ok</b>
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
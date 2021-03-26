<<<<<<< HEAD
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
=======
import { browserHistory } from "../.."
>>>>>>> d4b2129 (Implementazione creazione garou senza controlli campi obbligatori e render pagina utente standard)
import PersonaggioService from "../../servizi/PersonaggioService"

export const creaPersonaggio = (personaggio) => {
    return (dispatch) => {
        PersonaggioService.creaPersonaggio(personaggio).then(res => {
            dispatch({
                type: 'CREA_PERSONAGGIO',
                personaggio: res.data
            })
        }).then( () => {
            browserHistory.push('/paginaUtente');
            browserHistory.go();
        }).catch(() => {
            withReactContent(Swal).fire({
                title: <p>Nominativo già esistente!</p>
            })
        })
    }
}


export const getPersonaggiUtente = (utente) => {
    return (dispatch) => {
        PersonaggioService.getPersonaggiUtente(utente).then(res => {
            sessionStorage.setItem('personaggi', JSON.stringify(res.data));
            dispatch({
                type: 'LISTA_PERSONAGGI_UTENTE',
                personaggiUtente: res.data
            })
        });
    }
}

export const toCreazionePersonaggio = (tipo) => {
    return (dispatch) => {
        dispatch({
            type: 'TO_CREAZIONE_PERSONAGGIO',
            tipo: tipo
        })
    }
}

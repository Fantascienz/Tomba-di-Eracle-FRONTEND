import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { browserHistory } from "../.."
import PersonaggioService from "../../servizi/PersonaggioService"

export const creaPersonaggio = (personaggio) => {
    return (dispatch) => {
        PersonaggioService.creaPersonaggio(personaggio).then(res => {
            dispatch({
                type: 'CREA_PERSONAGGIO',
                personaggio: res.data
            })
        })
        .then(() => {
            browserHistory.push('/paginaUtente');
            browserHistory.go();
        }).catch(() => {
            withReactContent(Swal).fire({
                title: <p>Nominativo già esistente!</p>
            })
        })
    }
}


export const modificaPersonaggio = (personaggio) => {
    return (dispatch) => {
        PersonaggioService.modificaPersonaggio(personaggio).then(res => {
            sessionStorage.removeItem('personaggio')
            dispatch({
                type: 'MODIFICA_PERSONAGGIO',
                modificato: personaggio
            })
        }).then(() =>{
            browserHistory.push('/paginaUtente');
            browserHistory.go();
        })
    }
}


export const getPersonaggiUtente = (utente) => {
    return (dispatch) => {
        PersonaggioService.getPersonaggiUtente(utente).then(res => {
            sessionStorage.setItem('personaggi', JSON.stringify(res.data));
            let garou =  false
            JSON.parse(sessionStorage.getItem('personaggi')).forEach(element => {
                if(element.umbra === true) {
                    garou = true
                }
            });
            dispatch({
                type: 'LISTA_PERSONAGGI_UTENTE',
                personaggiUtente: res.data,
                isGarou: garou
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

export const toModificaPersonaggio = (personaggio) => {
    return (dispatch) => {
       sessionStorage.setItem('personaggio', JSON.stringify(personaggio) )
        dispatch({
            type: 'TO_MODIFICA_PERSONAGGIO',
            modifica: personaggio
        })

        browserHistory.push('/modificaPersonaggio');
        browserHistory.go();
        
    }
}

import PersonaggioService from "../../servizi/PersonaggioService"

export const creaPersonaggio = (personaggio) => {
    return (dispatch) => {
        PersonaggioService.creaPersonaggio(personaggio).then(res => {
            dispatch({
                type: 'CREA_PERSONAGGIO',
                personaggio: res.data
            })
        }).catch(() => {
            alert('Nominativo già esistente')
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
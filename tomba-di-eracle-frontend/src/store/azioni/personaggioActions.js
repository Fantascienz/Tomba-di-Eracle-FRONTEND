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
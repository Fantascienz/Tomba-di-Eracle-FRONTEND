import MessaggiService from "../../servizi/MessaggiService"


export const inviaMessaggio = (messaggio) => {
    return (dispatch) => {
        MessaggiService.inviaMessaggio(messaggio).then(
            MessaggiService.getConversazione(messaggio.utente.id).then(res =>
                dispatch({
                    type: "GET_CONVERSAZIONE",
                    messaggi: res.data
                })
            )
        )
    }
}

export const getConversazione = () => {
    return (dispatch) => {
        MessaggiService.getConversazione(JSON.parse(sessionStorage.getItem('utente')).id).then(res =>
            dispatch({
                type: "GET_CONVERSAZIONE",
                messaggi: res.data
            })

        )
    }
}
import MessaggiService from "../../servizi/MessaggiService"


export const inviaMessaggio = (messaggio) => {
    let messaggi;
    return (dispatch) => {
        MessaggiService.inviaMessaggio(messaggio).then(
            MessaggiService.getConversazione(messaggio.utente.id).then(res => {
                messaggi = res.data
                MessaggiService.getAllConversazioni().then(res => {
                    dispatch({
                        type: "GET_CONVERSAZIONE",
                        messaggi: messaggi,
                        conversazioni: res.data,
                    })
                })
            }
            )
        )
    }
}

export const getConversazione = () => {
    let messaggi;
    return (dispatch) => {
        MessaggiService.getConversazione(JSON.parse(sessionStorage.getItem('utente')).id).then(res => {
            messaggi = res.data
            MessaggiService.getAllConversazioni().then(res =>
                dispatch({
                    type: "GET_CONVERSAZIONI_ATTIVE",
                    conversazioni: res.data
                }))
        }
        )
    }
}

export const getConversazioneUtente = (utente) => {
    let messaggi;
    return (dispatch) => {
        MessaggiService.getConversazione(utente.id).then(res => {
            messaggi = res.data
            MessaggiService.getAllConversazioni().then(res =>
                dispatch({
                    type: "GET_CONVERSAZIONE",
                    messaggi: messaggi,
                    conversazioni: res.data,
                    utente: utente
                }))
        }
        )
    }
}

export const getAllConversazioni = () => {
    return (dispatch) => {
        MessaggiService.getAllConversazioni().then(res =>
            dispatch({
                type: "GET_CONVERSAZIONI_ATTIVE",
                conversazioni: res.data
            })
        )
    }
}

export const eliminaConversazione = (utente) => {
    let messaggi;
    return (dispatch) => {
        MessaggiService.eliminaMessaggio(utente.id).then(res =>
            MessaggiService.getConversazione(utente.id).then(res => {
                messaggi = res.data
                MessaggiService.getAllConversazioni().then(res => {
                    dispatch({
                        type: "GET_CONVERSAZIONE",
                        messaggi: messaggi,
                        conversazioni: res.data,
                    })
                })
            })
        )
    }
}
import AdminService from "../../servizi/AdminService"
import PersonaggioService from "../../servizi/PersonaggioService"


export const getListaUtenti = () => {
    return (dispatch) => {
        AdminService.getListaUtenti().then(res => {
            sessionStorage.setItem('listaUtenti', JSON.stringify(res.data))
            dispatch({
                type: "LISTA_UTENTI",
                listaUtenti: res.data
            })
        })
    }
}

export const getListaPersonaggi = () => {
    return (dispatch) => {
        PersonaggioService.getAllPersonaggi().then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: "LISTA_PG",
                listaPg: res.data
            })
        })
    }
}

export const modificaTipoUtente = (utente, nuovoTipo) => {
    sessionStorage.setItem('listaUtenti', null)
    utente.tipo = nuovoTipo;
    return (dispatch) => {
        AdminService.modificaTipo(utente).then(
            AdminService.getListaUtenti().then(res => {
                dispatch({
                    type: "LISTA_UTENTI",
                    listaUtenti: res.data,
                })
            })
        )
    }
}

export const modificaPersonaggio = (personaggio) => {
    return (dispatch) => {
        PersonaggioService.modificaPersonaggio(personaggio).then(
            PersonaggioService.getAllPersonaggi().then(res => {
                sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
                dispatch({
                    type: "LISTA_PG",
                    listaPg: res.data
                })
            })
        )
    }
}

export const modificaMassimali = (utente) => {
    return (dispatch) => {
        AdminService.modificaMassimali(utente).then(
            AdminService.getListaUtenti().then(res => {
                dispatch({
                    type: "LISTA_UTENTI",
                    listaUtenti: res.data,
                })
            })
        )
    }
}

export const toCreazioneLocation = () => {
    return (dispatch) => {
        dispatch({
            type: 'TO_CREAZIONE_LOCATION',
        })
    }
}

export const visualizzaPgAdmin = () => {
    return (dispatch) => {
        dispatch({
            type: 'VISUALIZZA_PG',
        })
    }
}

export const filtraListaRazza = (razza) => {
    return (dispatch) => {
            if (razza === 'Umano') {
                PersonaggioService.getPersonaggiByRazza(razza).then(res => {
                    sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
                    dispatch({
                        type: 'FILTRA_UMANO',
                        listaPgFiltrata: res.data,
                        filtroRazza: razza
                    })
                })

            } else if (razza === 'Lupo') {
                PersonaggioService.getPersonaggiByRazza(razza).then(res => {
                    sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
                    dispatch({
                        type: 'FILTRA_LUPO',
                        listaPgFiltrata: res.data,
                        filtroRazza: razza
                    })
                })

            } else if (razza === 'Meticcio') {
                PersonaggioService.getPersonaggiByRazza(razza).then(res => {
                    sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
                    dispatch({
                        type: 'FILTRA_METICCIO',
                        listaPgFiltrata: res.data,
                        filtroRazza: razza
                    })
                })
                
            } else if (razza === 'Reset') {
                PersonaggioService.getAllPersonaggi().then(res => {
                    sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
                    dispatch({
                        type: 'RESET_FILTRO_RAZZA',
                        listaPgFiltrata: res.data,
                        filtroRazza: ''
                    })
                })

            }

        

    }
}


export const filtraListaStato = (stato) => {
    return (dispatch) => {
            if(stato === 'Online') {
                PersonaggioService.getPersonaggiByStato(stato).then(res => {
                    sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
                    dispatch({
                        type: 'FILTRA_STATO_ONLINE',
                        listaPgFiltrata: res.data,
                        filtroStato: stato
                    })
                })
            } else if (stato === 'Offline') {
                PersonaggioService.getPersonaggiByStato(stato).then(res => {
                    sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
                    dispatch({
                        type: 'FILTRA_STATO_OFFLINE',
                        listaPgFiltrata: res.data,
                        filtroStato: stato
                    })
                })
            } else if (stato === 'Reset') {
                PersonaggioService.getAllPersonaggi().then(res => {
                    sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
                    dispatch({
                        type: 'RESET_FILTRO_STATO',
                        listaPgFiltrata: res.data,
                        filtroStato: ''
                    })
                })
            }
            
    }
}

export const ordinaPerRazza = () => {
    return (dispatch) => {
        PersonaggioService.getAllOrderByRazza().then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_RAZZA',
                listaPgFiltrata: res.data
            })
        })
    }
}

export const ordinaPerNominativo = () => {
    return (dispatch) => {
        PersonaggioService.getAllOrderByNominativo().then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_NOMINATIVO',
                listaPgFiltrata: res.data
            })
        })
    }
}

export const ordinaPerSesso = () => {
    return (dispatch) => {
        PersonaggioService.getAllOrderBySesso().then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_SESSO',
                listaPgFiltrata: res.data
            })
        })
    }
}

export const ordinaPerRango = () => {
    return (dispatch) => {
        PersonaggioService.getAllOrderByRango().then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_RANGO',
                listaPgFiltrata: res.data
            })
        })
    }
}

export const ordinaPerDataCreazione = () => {
    return (dispatch) => {
        PersonaggioService.getAllOrderByDataCreazione().then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_DATA_CREAZIONE',
                listaPgFiltrata: res.data
            })
        })
    }
}

export const getByRazzaAndStato = (filtro) => {
    return (dispatch) => {
        if(filtro.stato === 'Online') {
            PersonaggioService.getByRazzaAndStato(filtro).then(res => {
                sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
                dispatch({
                    type: 'FILTRA_RAZZA_STATO_ONLINE',
                    listaPgFiltrata: res.data,
                    filtroRazza: filtro.razza,
                    filtroStato: filtro.stato
                })
            })
        } else if (filtro.stato === 'Offline') {
            PersonaggioService.getByRazzaAndStato(filtro).then(res => {
                sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
                dispatch({
                    type: 'FILTRA_RAZZA_STATO_OFFLINE',
                    listaPgFiltrata: res.data,
                    filtroRazza: filtro.razza,
                    filtroStato: filtro.stato
                })
            })
        }
        
    }
}
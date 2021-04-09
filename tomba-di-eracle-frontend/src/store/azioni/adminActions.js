import AdminService from "../../servizi/AdminService"
import PersonaggioService from "../../servizi/PersonaggioService"
import UtenteService from "../../servizi/UtenteService"


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
        PersonaggioService.getAllRazzeGroupBy().then(res => {
            sessionStorage.setItem('listaRazze', JSON.stringify(res.data))
        }).then(
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

        PersonaggioService.getPersonaggiByRazza(razza).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'FILTRA_RAZZA',
                listaPgFiltrata: res.data,
                filtroRazza: razza
            })
        })

    }
}


export const filtraListaStato = (stato) => {
    return (dispatch) => {
        if (stato === 'Online') {
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
        } 
        

    }
}

export const filtraListaPgUtente = (utente) => {
    return (dispatch) => {
        PersonaggioService.getPersonaggiUtente(utente).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'FILTRA_UTENTE',
                listaPgFiltrata: res.data,
                filtroUtente: utente.id
            })
        })
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

export const ordinaPerId = () => {
    return (dispatch) => {
        PersonaggioService.getAllOrderById().then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_ID',
                listaPgFiltrata: res.data
            })
        })
    }
}

export const ordinaPerIdUtente = () => {
    return (dispatch) => {
        PersonaggioService.getAllOrderByIdUtente().then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_ID_UTENTE',
                listaPgFiltrata: res.data
            })
        })
    }
}

export const getByRazzaAndStato = (filtro) => {
    return (dispatch) => {
        if (filtro.stato === 'Online') {
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

export const getAllByRazzaOrderByNominativo = (razza) => {
    return (dispatch) => {
        PersonaggioService.getAllByRazzeOrderByNominativo(razza).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                    type: 'ORDINA_PER_RAZZA_ORDER_BY_NOMINATIVO',
                    listaPgFiltrata: res.data,
                    filtroRazza: razza.razza
                })
        })
    }
}

export const ordinaPerRazzaEStatoByNominativo = (filtro) => {
    return (dispatch) => {
        PersonaggioService.getAllByRazzaAndStatoOrderByNominativo(filtro).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_RAZZA_E_STATO_ORDER_BY',
                listaPgFiltrata: res.data,
                filtroRazza: filtro.razza,
                filtroStato: filtro.stato
            })
        })
    }
}

export const ordinaPerRazzaById = (razza) => {
    return (dispatch) => {
        PersonaggioService.getAllByRazzaOrderById(razza).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_RAZZA_ORDER_BY_ID',
                listaPgFiltrata: res.data,
                filtroRazza: razza.razza
            })
        })
    }
}

export const ordinaPerRazzaEStatoById = (filtro) => {
    return (dispatch) => {
        PersonaggioService.getAllByRazzaAndStatoOrderById(filtro).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_RAZZA_E_STATO_ORDER_BY_ID',
                listaPgFiltrata: res.data,
                filtroRazza: filtro.razza,
                filtroStato: filtro.stato
            })
        })
    }
}

export const ordinaPerRazzaBySesso = (razza) => {
    return (dispatch) => {
        PersonaggioService.getAllByRazzaOrderBySesso(razza).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_RAZZA_ORDER_BY_SESSO',
                listaPgFiltrata: res.data,
                filtroRazza: razza.razza
            })
        })
    }
}

export const ordinaPerRazzaEStatoBySesso = (filtro) => {
    return (dispatch) => {
        PersonaggioService.getAllByRazzaAndStatoOrderBySesso(filtro).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_RAZZA_E_STATO_ORDER_BY_SESSO',
                listaPgFiltrata: res.data,
                filtroRazza: filtro.razza,
                filtroStato: filtro.stato
            })
        })
    }
}

export const ordinaPerRazzaByRango = (razza) => {
    return (dispatch) => {
        PersonaggioService.getAllByRazzaOrderByRango(razza).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_RAZZA_ORDER_BY_RANGO',
                listaPgFiltrata: res.data,
                filtroRazza: razza.razza
            })
        })
    }
}

export const ordinaPerRazzaEStatoByRango = (filtro) => {
    return (dispatch) => {
        PersonaggioService.getAllByRazzaAndStatoOrderByRango(filtro).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_RAZZA_E_STATO_ORDER_BY_RANGO',
                listaPgFiltrata: res.data,
                filtroRazza: filtro.razza,
                filtroStato: filtro.stato
            })
        })
    }
}

export const ordinaPerRazzaByDataCreazione = (razza) => {
    return (dispatch) => {
        PersonaggioService.getAllByRazzaOrderByDataCreazione(razza).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_RAZZA_ORDER_BY_DATA_CREAZIONE',
                listaPgFiltrata: res.data,
                filtroRazza: razza.razza
            })
        })
    }
}

export const ordinaPerRazzaEStatoByDataCreazione = (filtro) => {
    return (dispatch) => {
        PersonaggioService.getAllByRazzaAndStatoOrderByDataCreazione(filtro).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_RAZZA_E_STATO_ORDER_BY_DATA_CREAZIONE',
                listaPgFiltrata: res.data,
                filtroRazza: filtro.razza,
                filtroStato: filtro.stato
            })
        })
    }
}

export const ordinaPerRazzaByIdUtente = (razza) => {
    return (dispatch) => {
        PersonaggioService.getAllByRazzaOrderByIdUtente(razza).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_RAZZA_ORDER_BY_ID_UTENTE',
                listaPgFiltrata: res.data,
                filtroRazza: razza.razza
            })
        })
    }
}

export const ordinaPerRazzaEStatoByIdUtente = (filtro) => {
    return (dispatch) => {
        PersonaggioService.getAllByRazzaAndStatoOrderByIdUtente(filtro).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_RAZZA_E_STATO_ORDER_BY_ID_UTENTE',
                listaPgFiltrata: res.data,
                filtroRazza: filtro.razza,
                filtroStato: filtro.stato
            })
        })
    }
}

export const ordinaPerUtenteByNominativo = (filtro) => {
    return (dispatch) => {
        PersonaggioService.getAllByIdUtenteOrderByNominativo(filtro).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_UTENTE_BY_NOMINATIVO',
                listaPgFiltrata: res.data,
                filtroUtente: filtro.id
            })
        })
    }
}

export const ordinaPerUtenteBySesso = (filtro) => {
    return (dispatch) => {
        PersonaggioService.getAllByIdUtenteOrderBySesso(filtro).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_UTENTE_BY_SESSO',
                listaPgFiltrata: res.data,
                filtroUtente: filtro.id
            })
        })
    }
}

export const ordinaPerUtenteByRazza = (filtro) => {
    return (dispatch) => {
        PersonaggioService.getAllByIdUtenteOrderByRazza(filtro).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_UTENTE_BY_RAZZA',
                listaPgFiltrata: res.data,
                filtroUtente: filtro.id
            })
        })
    }
}

export const ordinaPerUtenteById = (filtro) => {
    return (dispatch) => {
        PersonaggioService.getAllByIdUtenteOrderById(filtro).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_UTENTE_BY_ID',
                listaPgFiltrata: res.data,
                filtroUtente: filtro.id
            })
        })
    }
}

export const ordinaPerUtenteByRango = (filtro) => {
    return (dispatch) => {
        PersonaggioService.getAllByIdUtenteOrderByRango(filtro).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_UTENTE_BY_RANGO',
                listaPgFiltrata: res.data,
                filtroUtente: filtro.id
            })
        })
    }
}

export const ordinaPerUtenteByDataCreazione = (filtro) => {
    return (dispatch) => {
        PersonaggioService.getAllByIdUtenteOrderByDataCreazione(filtro).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_UTENTE_BY_DATA_CREAZIONE',
                listaPgFiltrata: res.data,
                filtroUtente: filtro.id
            })
        })
    }
}

export const ordinaPerUtenteERazza = (filtro) => {
    return (dispatch) => {
        PersonaggioService.getAllByIdUtenteAndRazza(filtro).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_UTENTE_E_RAZZA',
                listaPgFiltrata: res.data,
                filtroUtente: filtro.utente.id,
                filtroRazza: filtro.razza
            })
        })
    }
}

export const ordinaPerUtenteERazzaById = (filtro) => {
    return (dispatch) => {
        PersonaggioService.getAllByIdUtenteAndRazzaOrderById(filtro).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_UTENTE_E_RAZZA_BY_ID',
                listaPgFiltrata: res.data,
                filtroUtente: filtro.utente.id,
                filtroRazza: filtro.razza
            })
        })
    }
}

export const ordinaPerUtenteERazzaByNominativo = (filtro) => {
    return (dispatch) => {
        PersonaggioService.getAllByIdUtenteAndRazzaOrderByNominativo(filtro).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_UTENTE_E_RAZZA_BY_NOMINATIVO',
                listaPgFiltrata: res.data,
                filtroUtente: filtro.utente.id,
                filtroRazza: filtro.razza
            })
        })
    }
}
export const ordinaPerUtenteERazzaBySesso = (filtro) => {
    return (dispatch) => {
        PersonaggioService.getAllByIdUtenteAndRazzaOrderBySesso(filtro).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_UTENTE_E_RAZZA_BY_SESSO',
                listaPgFiltrata: res.data,
                filtroUtente: filtro.utente.id,
                filtroRazza: filtro.razza
            })
        })
    }
}

export const ordinePerUtenteERazzaByRango = (filtro) => {
    return (dispatch) => {
        PersonaggioService.getAllByIdUtenteAndRazzaOrderByRango(filtro).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_UTENTE_E_RAZZA_BY_RANGO',
                listaPgFiltrata: res.data,
                filtroUtente: filtro.utente.id,
                filtroRazza: filtro.razza
            })
        })
    }
}

export const ordinePerUtenteERazzaByDataCreazione = (filtro) => {
    return (dispatch) => {
        PersonaggioService.getAllByIdUtenteAndRazzaOrderByDataCreazione(filtro).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'ORDINA_PER_UTENTE_E_RAZZA_BY_DATA_CREAZIONE',
                listaPgFiltrata: res.data,
                filtroUtente: filtro.utente.id,
                filtroRazza: filtro.razza
            })
        })
    }
}

export const getAllByIdUtenteAndRazzaAndStato = (filtro) => {
    return (dispatch) => {
        PersonaggioService.getByIdUtenteAndRazzaAndStato(filtro).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'FILTRA_UTENTE_RAZZA_STATO',
                listaPgFiltrata: res.data,
                filtroRazza: filtro.razza,
                filtroStato: filtro.stato,
                filtroUtente: filtro.utente.id
            })
        })
            
    }
}

export const getAllByIdUtenteAndStato = (filtro) => {
    return (dispatch) => {
        PersonaggioService.getByIdUtenteAndStato(filtro).then(res => {
            sessionStorage.setItem('listaPersonaggi', JSON.stringify(res.data))
            dispatch({
                type: 'FILTRA_UTENTE_STATO',
                listaPgFiltrata: res.data,
                filtroStato: filtro.stato,
                filtroUtente: filtro.utente.id
            })
        })
    }
}

export const filtraUtentiByTipo = (filtro) => {
    return (dispatch) => {
        UtenteService.findAllByTipoUtente(filtro).then(res => {
            sessionStorage.setItem('listaUtenti', JSON.stringify(res.data))
            dispatch({
                type: 'FILTRA_UTENTI_PER_TIPO',
                listaUtentiFiltrata: res.data,
                filtroTipoUtente: filtro.tipo
            })
        })
    }
}

import PersonaggioService from "../../servizi/PersonaggioService"

export const visualizzaListaPg = () => {
    return (dispatch) => {
        PersonaggioService.getAllPersonaggi().then(res => {
            dispatch({
                type: 'VISUALIZZA_LISTA_PG',
                listaPg: res.data
    
            })
        })
       
    }
}


export const visualizzaPgMaster = () => {
    return (dispatch) => {
            dispatch({
                type: 'VISUALIZZA_MIEI_PG'
    
            })
       
    }
}
import GameService from "../../servizi/GameService";


export const primoAccesso = (pg) => {
    let stanze = []
    return (dispatch) => {
        GameService.getUltimaLocationPersonaggio(pg.id).then(res => {
            sessionStorage.setItem('pgAttivo', JSON.stringify(pg))
            sessionStorage.setItem('ultimaLocation', JSON.stringify(res.data))
            // eslint-disable-next-line
            JSON.parse(sessionStorage.getItem('stanze')).map(stanza => {
                if (stanza.location.id === JSON.parse(sessionStorage.getItem('ultimaLocation')).id) {
                    stanze.push(stanza)
                }
                sessionStorage.setItem('stanzeLocation', JSON.stringify(stanze))
            })
            dispatch({
                type: 'PRIMO_ACCESSO',
                pgAttivo: pg,
                location: res.data,
                stanzeLocation: stanze
            })
        })
    }
}

export const naviga = (location) => {
    let dir;
    let stanze = []
    return (dispatch) => {
        GameService.naviga(location).then(res => {
            sessionStorage.setItem('ultimaLocation', JSON.stringify(res.data))
            // eslint-disable-next-line
            JSON.parse(sessionStorage.getItem('stanze')).map(stanza => {
                if (stanza.location.id === JSON.parse(sessionStorage.getItem('ultimaLocation')).id) {
                    stanze.push(stanza)
                }
                sessionStorage.setItem('stanzeLocation', JSON.stringify(stanze))
            })
            dispatch({
                type: 'NAVIGA',
                pgAttivo: JSON.parse(sessionStorage.getItem('pgAttivo')),
                location: res.data,
                direzioniRelativeUltimaLocation: dir,
                stanzeLocation: stanze
            })
        }
        )
    }
}
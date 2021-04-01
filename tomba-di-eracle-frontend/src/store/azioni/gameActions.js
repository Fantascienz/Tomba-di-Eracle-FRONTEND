import GameService from "../../servizi/GameService";


export const primoAccesso = (pg) => {
    return (dispatch) => {
        GameService.getUltimaLocationPersonaggio(pg.id).then(res => {
            sessionStorage.setItem('pgAttivo', JSON.stringify(pg))
            sessionStorage.setItem('ultimaLocation', JSON.stringify(res.data))
            GameService.getDirezioniRelativeLocation(res.data.id).then(res => {
                sessionStorage.setItem('direzioniUltimaLocation', JSON.stringify(res.data))
                alert(res.data.id)
            }
            )
            dispatch({
                type: 'PRIMO_ACCESSO',
                pgAttivo: pg,
                location: res.data,
            })
        })
    }
}

export const naviga = (location) => {
    let dir;
    return (dispatch) => {
        GameService.naviga(location).then(res => {
            sessionStorage.setItem('ultimaLocation', JSON.stringify(res.data))
            GameService.getDirezioniRelativeLocation(res.data.id).then(res => {
                sessionStorage.setItem('direzioniUltimaLocation', JSON.stringify(res.data))
                dir = res.data
                // alert('dir pre dispatch'+ dir.id)
            }
            ).then(go => {
                // alert('dir dispatch' + dir.id)
                dispatch({
                    type: 'NAVIGA',
                    pgAttivo: JSON.parse(sessionStorage.getItem('pgAttivo')),
                    location: res.data,
                    direzioniRelativeUltimaLocation: dir
                })
            }
            )
        })
    }
}
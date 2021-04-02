import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import GameService from "../../servizi/GameService";


export const primoAccesso = (pg) => {
    return (dispatch) => {
        GameService.getUltimaLocationPersonaggio(pg.id).then(res => {
            sessionStorage.setItem('pgAttivo', JSON.stringify(pg))
            sessionStorage.setItem('ultimaLocation', JSON.stringify(res.data))
            GameService.getDirezioniRelativeLocation(res.data.id).then(res => {
                sessionStorage.setItem('direzioniUltimaLocation', JSON.stringify(res.data))
            }
            
            )
            // withReactContent(Swal).fire({  TOGLI COMMENTO SE DIREZIONI ULTIMA LOCATION ARRIVA NULL
            //     title: 
            //     <div>
            //         <p>Salute {JSON.parse(sessionStorage.getItem('pgAttivo')).nominativo}</p>
            //     </div>
            // })
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
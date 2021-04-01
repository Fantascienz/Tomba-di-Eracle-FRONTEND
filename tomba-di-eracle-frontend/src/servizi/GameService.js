import LocationService from "./LocationService";


class GameService {

//     primoAccesso(pg) {
//         let ultimaLoc;
//         LocationService.getUltimaLocationPersonaggio(pg.id).then(res => {
//             sessionStorage.setItem('pgAttivo', JSON.stringify(pg))
//             sessionStorage.setItem('ultimaLocation',JSON.stringify(res.data))
//             ultimaLoc = res.data
//         }).then(
//             dispatch({
//                 type: 'PRIMO_ACCESSO',
//                 pgAttivo: pg,
//                 ultimaLocation: ultimaLoc

//             })
//         )
//     }
// }

export default new GameService();
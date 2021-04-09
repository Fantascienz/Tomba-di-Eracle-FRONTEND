import axios from 'axios'

const URL = "http://localhost:8080/game/"

class GameService {

    getUltimaLocationPersonaggio(id) {
        return axios.get(URL + 'ultimaLocation/' + id)
    }

    naviga(idLocation) {
        return axios.post(URL + 'naviga/' + idLocation,JSON.parse(sessionStorage.getItem('pgAttivo')))
    }
}

export default new GameService();
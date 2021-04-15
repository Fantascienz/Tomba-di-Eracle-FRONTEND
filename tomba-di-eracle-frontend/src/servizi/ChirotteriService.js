import axios from "axios";

const URL = 'http://localhost:8080/chirotteri/'

class ChirotteriService {

    getAllAbilitati() {
        return axios.get(URL + '/abilitati')
    }

    invia(chirottero) {
        return axios.post(URL, chirottero)
    }
}

export default new ChirotteriService();
import axios from "axios";

const URL = 'http://localhost:8080/chirotteri/'

class ChirotteriService {

    getAllAbilitati() {
        return axios.get(URL + '/abilitati')
    }

    invia(chirottero) {
        return axios.post(URL, chirottero)
    }

    getChirotteri(idPersonaggio) {
        return axios.get(URL + '/ricevuti/' + idPersonaggio)
    }

    segnaComeLetto(idChirottero) {
        return axios.patch(URL + '/' + idChirottero)
    }

    eliminaChirotteri () {
        return axios.delete(URL)
    }
}

export default new ChirotteriService();
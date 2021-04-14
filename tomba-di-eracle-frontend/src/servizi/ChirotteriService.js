import axios from "axios";

const URL = 'http://localhost:8080/chirotteri/'

class ChirotteriService {

    getAllAbilitati () {
        return axios.get(URL + '/abilitati')
    }
}

export default new ChirotteriService();
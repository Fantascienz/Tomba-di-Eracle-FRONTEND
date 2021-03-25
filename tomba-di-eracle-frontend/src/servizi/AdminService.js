import axios from "axios";

const URL_UTENTI = "http://localhost:8080/utenti";

class AdminService {

    getListaUtenti() {
        return axios.get(URL_UTENTI)
    }
}

export default new AdminService();
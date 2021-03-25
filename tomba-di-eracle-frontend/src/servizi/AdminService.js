import axios from "axios";

const URL_UTENTI = "http://localhost:8080/utenti/";
const URL_ADMIN = "http://localhost:8080/admin/"

class AdminService {

    getListaUtenti() {
        return axios.get(URL_UTENTI)
    }

    modificaTipo(utente) {
        return axios.post(URL_ADMIN + 'modificaTipo',utente)
    }
}

export default new AdminService();
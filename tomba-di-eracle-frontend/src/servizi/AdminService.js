import axios from "axios";

const URL_UTENTI = "http://localhost:8080/utenti/";
const URL_ADMIN = "http://localhost:8080/admin/"

class AdminService {

    getListaUtenti() {
        return axios.get(URL_UTENTI)
    }

    async sessioneListaUtenti() {
        const res = await this.getListaUtenti();
        return sessionStorage.setItem('listaUtenti', JSON.stringify(res.data));
    }

    modificaTipo(utente) {
        return axios.post(URL_ADMIN + 'modificaTipo', utente)
    }

    modificaMassimali(utente) {
        return axios.post(URL_UTENTI + "massimali", utente)
    }
}

export default new AdminService();
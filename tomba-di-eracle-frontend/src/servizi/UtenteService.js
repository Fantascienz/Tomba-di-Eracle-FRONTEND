const URL = "http://localhost:8080/utenti/";

class UtenteService {

    login(utente) {
        return axios.post(URL + 'login', utente);
    }
}

export default new UtenteService();
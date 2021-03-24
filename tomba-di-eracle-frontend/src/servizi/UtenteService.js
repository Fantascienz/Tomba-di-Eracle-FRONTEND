import axios from 'axios';

const URL = "http://localhost:8080/utenti/";

class UtenteService {

    login(utente) {
        return axios.post(URL + 'login', utente);
    }

    validaLogin(utente) {
        if(utente.email === ''  || utente.psw === '') {
            return false
        }

        return true;
    }
}

export default new UtenteService();
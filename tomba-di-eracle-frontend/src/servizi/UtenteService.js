import axios from 'axios';
import { post } from 'jquery';

const URL = "http://localhost:8080/utenti/";

class UtenteService {

    login(utente) {
        return axios.post(URL + 'login', utente);
    }

    registrazione(utente) {
        return axios.post(URL, utente);
    }

    modifica(mod) {
        return axios.post(URL + 'modifica',mod)
    }

    findAllTipoUtente() {
        return axios.get(URL + 'findAllTipoUtente')
    }

    findAllByTipoUtente(filtro) {
        return axios.post(URL + 'findAllByTipoUtente', filtro)
    }

    findByNominativo(nominativo) {
        return axios.post(URL + 'findByNominativo', nominativo)

    }
    
    findByNominativoAndTipo(filtro) {
        return axios.post(URL + 'findByNominativoAndTipo', filtro)
    }

    validaLogin(utente) {
        if (utente.email === '' || utente.psw === '') {
            return false
        }
        return true;
    }

    validaRegistrazione(utente) {
        if (utente.email === '' || utente.psw === '' || utente.nome === '' || utente.cognome === '') {
            return false
        }
        return true;
    }

    validaModifica(utente) {
        if (utente.pswVecchia === '') {
            return false;
        }
        return true;
    }
}

export default new UtenteService();
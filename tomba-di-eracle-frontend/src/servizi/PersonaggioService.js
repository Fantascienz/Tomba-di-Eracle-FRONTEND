import axios from 'axios';

const URL = "http://localhost:8080/personaggi/";

class PersonaggioService {

    creaPersonaggio(personaggio) {
        return axios.post(URL, personaggio);
    }

    modificaPersonaggio(personaggio) {
        return axios.post(URL + 'modifica', personaggio)
    }

    getPersonaggiUtente(utente) {
        return axios.post(URL + 'user', utente);
    }

    validazioneFormPersonaggio(personaggio) {
        if (personaggio.nominativo === ''
            || personaggio.sesso === ''
            || personaggio.rango === ''
            || personaggio.urlImmagine === '') {
            return false;
        }

        return true
    }

    validazioneFormGarou(personaggio) {
        if (personaggio.nominativo === ''
            || personaggio.sesso === ''
            || personaggio.rango === ''
            || personaggio.razza === ''
            || personaggio.brancoInput === ''
            || personaggio.ruolo === ''
            || personaggio.septInput === ''
            || personaggio.ruoloSept === ''
            || personaggio.urlImmagine === ''
            || personaggio.urlCrinos === ''
            || personaggio.urlLupo === '') {
            return false;
        }

        return true
    }

}

export default new PersonaggioService();
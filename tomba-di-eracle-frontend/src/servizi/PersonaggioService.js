import axios from 'axios';

const URL = "http://localhost:8080/personaggi/";

class PersonaggioService {

    creaPersonaggio(personaggio) {
        return axios.post(URL, personaggio);
    }

    getPersonaggiUtente(utente) {
        return axios.post(URL + 'user', utente);
    }

    validazioneFormPersonaggio(personaggio) {
        if(personaggio.nominativo === '' || personaggio.sesso === '') {
            return false;
        } 

        return true
    }

}

export default new PersonaggioService();
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

    getAllPersonaggi () {
        return axios.get(URL);
    }

    getPersonaggiByRazza(razza)  {
        return axios.get(URL + 'filtraRazza/' + razza)
    }

    getPersonaggiByStato(stato) {
        return axios.get(URL + 'filtraStato/' + stato)
    }

    getAllOrderByRazza() {
        return axios.get(URL + 'orderRazza')
    }

    getAllOrderByNominativo() {
        return axios.get(URL + 'orderNominativo')
    }

    getAllOrderBySesso() {
        return axios.get(URL + 'orderSesso')
    }

    getAllOrderByRango() {
        return axios.get(URL + 'orderRango')
    }

    getAllOrderByDataCreazione() {
        return axios.get(URL + 'orderDataCreazione')
    }

    getAllOrderById() {
        return axios.get(URL + 'orderId')
    }

    getByRazzaAndStato(filtro) {
        return axios.post(URL + 'razzaAndStato', filtro)
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

    validazioneFormGarouAdminMaster(personaggio) {
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
            || personaggio.urlLupo === ''
            || personaggio.tribu === '') {
            return false;
        } 
        return true
    }

    validazioneFormGarouVip(personaggio) {
        if (personaggio.nominativo === ''
            || personaggio.sesso === ''
            || personaggio.rango === ''
            || personaggio.razza === ''
            || personaggio.urlImmagine === ''
            || personaggio.urlCrinos === ''
            || personaggio.urlLupo === ''
            || personaggio.tribu === '') {
            return false;
        } 
        return true
    }

}

export default new PersonaggioService();
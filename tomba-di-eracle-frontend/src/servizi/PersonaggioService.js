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

    getAllOrderByIdUtente() {
        return axios.get(URL + 'getAllOrderByIdUtente')
    }

    getByRazzaAndStato(filtro) {
        return axios.post(URL + 'razzaAndStato', filtro)
    }

    getAllRazzeGroupBy() {
        return axios.get(URL + '/getAllRazze')
    }

    getAllByRazzeOrderByNominativo(razza) {
        return axios.post(URL + 'getAllRazzeOrderBy', razza)
    }
    getAllByRazzaAndStatoOrderByNominativo(filtro) {
        return axios.post(URL + 'getAllByRazzaAndStatoOrderBy', filtro)
    }

    getAllByRazzaOrderById(razza) {
        return axios.post(URL + 'getAllByRazzaOrderById', razza)
    }

    getAllByRazzaAndStatoOrderById(filtro) {
        return axios.post(URL + 'getAllByRazzaAndStatoOrderById', filtro)
    }
    getAllByRazzaOrderBySesso(razza) {
        return axios.post(URL + 'getAllByRazzaOrderBySesso', razza)
    }

    getAllByRazzaAndStatoOrderBySesso(filtro) {
        return axios.post(URL + 'getAllByRazzaAndStatoOrderBySesso', filtro)
    }

    getAllByRazzaOrderByRango(razza) {
        return axios.post(URL + 'getAllByRazzaOrderByRango', razza)
    }

    getAllByRazzaAndStatoOrderByRango(filtro) {
        return axios.post(URL + 'getAllByRazzaAndStatoOrderByRango', filtro)
    }

    getAllByRazzaOrderByDataCreazione(razza) {
        return axios.post(URL + 'getAllByRazzaOrderByDataCreazione', razza)
    }

    getAllByRazzaAndStatoOrderByDataCreazione(filtro) {
        return axios.post(URL + 'getAllByRazzaAndStatoOrderByDataCreazione', filtro)
    }

    getAllByRazzaOrderByIdUtente(razza) {
        return axios.post(URL + 'getAllByRazzaOrderByIdUtente', razza)
    }

    getAllByRazzaAndStatoOrderByIdUtente(filtro) {
        return axios.post(URL + 'getAllByRazzaAndStatoOrderByIdUtente', filtro)
    }

    getAllByIdUtenteOrderByNominativo(filtro) {
        return axios.post(URL + 'getAllByIdUtenteOrderByNominativo', filtro)
    }

    getAllByIdUtenteOrderBySesso(filtro) {
        return axios.post(URL + 'getAllByIdUtenteOrderBySesso', filtro)
    }

    getAllByIdUtenteOrderByRazza(filtro) {
        return axios.post(URL + 'getAllByIdUtenteOrderByRazza', filtro)
    }

    getAllByIdUtenteOrderById(filtro) {
        return axios.post(URL + 'getAllByIdUtenteOrderById', filtro)
    }

    getAllByIdUtenteOrderByRango(filtro) {
        return axios.post(URL + 'getAllByIdUtenteOrderByRango', filtro)
    }

    getAllByIdUtenteOrderByDataCreazione(filtro) {
        return axios.post(URL + 'getAllByIdUtenteOrderByDataCreazione', filtro)
    }

    getAllByIdUtenteAndRazza(filtro) {
        return axios.post(URL + 'getAllByIdUtenteAndRazza', filtro)
    }

    getAllByIdUtenteAndRazzaOrderById(filtro) {
        return axios.post(URL + 'getAllByIdUtenteAndRazzaOrderById', filtro)
    }

    getAllByIdUtenteAndRazzaOrderByNominativo(filtro) {
        return axios.post(URL, 'getAllByIdUtenteAndRazzaOrderByNominativo', filtro)
    }

    getAllByIdUtenteAndRazzaOrderBySesso(filtro) {
        return axios.post(URL + 'getAllByIdUtenteAndRazzaOrderBySesso', filtro)
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
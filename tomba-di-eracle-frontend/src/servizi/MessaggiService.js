import axios from "axios";

const URL = 'http://localhost:8080/messaggi/'

class MessaggiService {

    inviaMessaggio(messaggio) {
        return axios.post(URL, messaggio)
    }

    eliminaMessaggio(idUtente) {
        return axios.delete(URL + '/' + idUtente)
    }

    getConversazione(idUtente) {
        return axios.get(URL + "/" + idUtente)
    }

    getAllConversazioni() {
        return axios.get(URL)
    }
}

export default new MessaggiService();
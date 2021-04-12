import axios from "axios";

const URL = 'http://localhost:8080/messaggi/'

class MessaggiService {

    inviaMessaggio(messaggio) {
        return axios.post(URL, messaggio)
    }

    getConversazione(idUtente) {
        return axios.get(URL + "/" + idUtente)
    }
}

export default new MessaggiService();
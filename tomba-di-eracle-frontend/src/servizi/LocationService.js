import axios from "axios";

const URL = "http://localhost:8080/locations/"

class LocationService {

    getAllMacro() {
        return axios.get(URL + 'macro')
    }

    getLocationByDirezioneLibera(direzione) {
        return axios.get(URL + direzione)
    }

    validaCampiCreazione(location) {
        if(location.nome === '' || location.tipo === '' || location.ambiente === '' || location.urlImgGiorno === '' || location.urlAudio === '') {
            return false;
        }
        return true;
    }
}

export default new LocationService();
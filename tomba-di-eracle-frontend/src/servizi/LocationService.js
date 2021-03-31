import axios from "axios";

const URL = "http://localhost:8080/locations/"

class LocationService {

    getAllMacro() {
        return axios.get(URL + 'macro')
    }

    getLocationByDirezioneLibera(direzione) {
        return axios.get(URL + direzione)
    }

    creaLocation(locationCreata) {
        return axios.post(URL, locationCreata)
    }

    getLocationDirezioniLibere() {
        this.getLocationByDirezioneLibera('nord').then(res => {
            sessionStorage.setItem('locationsNordLibero', JSON.stringify(res.data))
        })
        this.getLocationByDirezioneLibera('est').then(res => {
            sessionStorage.setItem('locationsEstLibero', JSON.stringify(res.data))
        })
        this.getLocationByDirezioneLibera('sud').then(res => {
            sessionStorage.setItem('locationsSudLibero', JSON.stringify(res.data))
        })
        this.getLocationByDirezioneLibera('ovest').then(res => {
            sessionStorage.setItem('locationsOvestLibero', JSON.stringify(res.data))
        })
    }

    validaCampiCreazione(location) {
        if (location.nome === '' || location.tipo === '' || location.ambiente === '' || location.urlImgGiorno === ''
            || location.urlAudio === '' || location.ingresso === '' || location.urlImgGiornoUmbra === '' || location.urlAudioUmbra === '') {
            return false;
        }
        return true;
    }
}

export default new LocationService();
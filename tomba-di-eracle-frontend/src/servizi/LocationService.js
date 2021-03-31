import axios from "axios";

const URL = "http://localhost:8080/locations/"

class LocationService {

    getAllMacro() {
        return axios.get(URL + 'macro')
    }

    getAllEsterne() {
        this.getEsterneReame().then(res =>
            sessionStorage.setItem('listaEsterneReame', JSON.stringify(res.data))
        )
        this.getEsterneUmbra().then(res =>
            sessionStorage.setItem('listaEsterneUmbra', JSON.stringify(res.data))
        )
    }

    getEsterneReame() {
        return axios.get(URL + 'esterne/reame')
    }

    getEsterneUmbra() {
        return axios.get(URL + 'esterne/umbra')
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
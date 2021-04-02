import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const URL = "http://localhost:8080/locations/"

class LocationService {

    delete(id) {
        return axios.delete(URL + 'delete/' + id)
    }

    update(location){
        return axios.post(URL + "update",location)
    }

    getAllMacro() {
        return axios.get(URL + 'macro')
    }

    sessioneUltimaLocationPersonaggio(id) {
        this.getUltimaLocationPersonaggio(id).then(res => 
            sessionStorage.setItem('ultimaLocation',JSON.stringify(res.data))
        )
    }

    sessioneMappeMacro() {
        this.getAllMacro().then(res =>
            sessionStorage.setItem('listaMacroLocation', JSON.stringify(res.data))
        )
    }

    sessioneMappeEsterne() {
        this.getEsterneReame().then(res =>
            sessionStorage.setItem('listaEsterneReame', JSON.stringify(res.data))
        )
        this.getEsterneUmbra().then(res =>
            sessionStorage.setItem('listaEsterneUmbra', JSON.stringify(res.data))
        )
    }

    sessioneDirezioniLibere () {
        this.getLocationByDirezioneLibera('nord').then(res => {
            sessionStorage.setItem('locationsNordLibero', JSON.stringify(res.data))
        }).then(
            this.getLocationByDirezioneLibera('est').then(res => {
                sessionStorage.setItem('locationsEstLibero', JSON.stringify(res.data))
            })
        ).then(
            this.getLocationByDirezioneLibera('sud').then(res => {
                sessionStorage.setItem('locationsSudLibero', JSON.stringify(res.data))
            })
        ).then(
            this.getLocationByDirezioneLibera('ovest').then(res => {
                sessionStorage.setItem('locationsOvestLibero', JSON.stringify(res.data))
            })
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

    validaCampiCreazione(location) {
        if (location.nome === '' || location.tipo === '' || location.ambiente === '' || location.urlImgGiorno === ''
            || location.urlAudio === '' || location.ingresso === '' || location.urlImgGiornoUmbra === '' || location.urlAudioUmbra === '') {
            return false;
        }
        return true;
    }

    validaCampiModifica(location) {
        if (location.id === "") {
            withReactContent(Swal).fire({
                title: <p>Seleziona una Location da Modificare!</p>
            })
            return false;
        }
        let mappa;
        axios.get(URL + 'mappa/' + location.id).then(res => {
            mappa = res.data;
            if (mappa === 'Macro' && JSON.parse(sessionStorage.getItem('utente')).tipo !== 'admin') {
                if (location.nome !== '') {
                    withReactContent(Swal).fire({
                        title: <p>Non hai i permessi per modificare il nome di una Macro Location!</p>
                    })
                    return false;
                }
            }
        })
        return true;
    }
}

export default new LocationService();
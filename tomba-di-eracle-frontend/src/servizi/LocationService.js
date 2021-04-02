import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const URL = "http://localhost:8080/locations/"

class LocationService {

    getAll() {
        return axios.get(URL)
    }

    creaLocation(locationCreata) {
        return axios.post(URL, locationCreata)
    }

    creaStanza(stanza) {
        return axios.post(URL + "stanze",stanza)
    }


    delete(id) {
        return axios.delete(URL + 'delete/' + id)
    }

    update(location) {
        return axios.post(URL + "update", location)
    }

    getAllMacro() {
        return axios.get(URL + 'macro')
    }

    getAllStanze() {
        return axios.get(URL + 'stanze')
    }

    sessioneStanze() {
        this.getAllStanze().then(res => 
            sessionStorage.setItem('stanze',JSON.stringify(res.data))
        )
    }

    sessioneUltimaLocationPersonaggio(id) {
        this.getUltimaLocationPersonaggio(id).then(res =>
            sessionStorage.setItem('ultimaLocation', JSON.stringify(res.data))
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

    sessioneDirezioniLibere() {
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

    sessioneAllLocation() {
        this.getAll().then(res =>
            sessionStorage.setItem('allLocations', JSON.stringify(res.data))
        )
        return this.getAll()
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

    validaCampiCreazione(location, isStanza) {
        if (!isStanza) {
            if (location.nome === '' || location.tipo === '' || location.ambiente === '' || location.urlImgGiorno === ''
                || location.urlAudio === '' || location.ingresso === '' || location.urlImgGiornoUmbra === '' || location.urlAudioUmbra === '') {
                withReactContent(Swal).fire({
                    title: <div>
                        <p>Nome,Ambiente,Ingresso</p>
                        <p>Immagine giorno e Audio</p>
                        <p>sono obbligatori!</p>
                    </div>
                })
                return false;
            }
            return true;
        } else {
            if (location.loc === '') {
                withReactContent(Swal).fire({
                    title: <p>Indica una Location per la Stanza!</p>
                })
                return false;
            } else {

                if (location.nome === '' || location.ambiente === '' || location.urlImgGiorno === ''
                    || location.urlAudio === '' || location.urlImgGiornoUmbra === '' || location.urlAudioUmbra === '') {
                    withReactContent(Swal).fire({
                        title: <div>
                            <p>Nome,Ambiente,Ingresso</p>
                            <p>Immagine giorno e Audio</p>
                            <p>sono obbligatori!</p>
                        </div>
                    })
                    return false;
                }
                return true;
            }
        }

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
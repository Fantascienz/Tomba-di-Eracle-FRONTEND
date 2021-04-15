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
        return axios.post(URL + "stanze", stanza)
    }


    delete(id) {
        return axios.delete(URL + 'delete/' + id)
    }

    update(location) {
        return axios.post(URL + "update", location)
    }

    getAllStanze() {
        return axios.get(URL + 'stanze')
    }

    sessioneStanze() {
        this.getAllStanze().then(res => {
            sessionStorage.setItem('stanze', JSON.stringify(res.data))
        })
    }

    sessioneUltimaLocationPersonaggio(id) {
        this.getUltimaLocationPersonaggio(id).then(res =>
            sessionStorage.setItem('ultimaLocation', JSON.stringify(res.data))
        )
    }

    sessioneAllLocation() {
        this.getAll().then(res =>
            sessionStorage.setItem('allLocations', JSON.stringify(res.data))
        )
        return this.getAll()
    }

    validaCampiCreazione(location, isStanza, umbra) {
        if (!isStanza) {
            if (location.nome === '' || location.tipo === '' || location.ambiente === '' || location.urlImgGiorno === ''
                || location.locationIngresso === '' || location.urlImgGiornoUmbra === '') {
                withReactContent(Swal).fire({
                    title: <div>
                        <p>Nome, Ambiente, Ingresso</p>
                        <p>Immagine giorno</p>
                        <p>sono obbligatori!</p>
                    </div>
                })
                return false;
            }
            if (location.direzioneIngresso === '') {
                withReactContent(Swal).fire({
                    title: <div>
                        <p>Seleziona una direzione d'ingresso!</p>
                    </div>
                })
                return false;
            }
            return true;
            // } else {
            //     if (location.loc === '') {
            //         withReactContent(Swal).fire({
            //             title: <p>Indica una Location per la Stanza!</p>
            //         })
            //         return false;
            //     } else {
            //         if (location.nome === '' || location.ambiente === '' || location.urlImgGiorno === '' || location.urlImgGiornoUmbra === '') {
            //             withReactContent(Swal).fire({
            //                 title: <div>
            //                     <p>Nome,Ambiente,Ingresso</p>
            //                     <p>Immagine giorno</p>
            //                     <p>sono obbligatori!</p>
            //                 </div>
            //             })
            //             return false;
            //         }
            //         return true;
            //     }
            // }
        } else {
            if (location.loc === '') {
                withReactContent(Swal).fire({
                    title: <p>Indica una Location per la Stanza!</p>
                })
                return false;
            } 
            
            if(umbra){
                if (location.nome === '' || location.ambiente === '' || location.urlImgGiornoUmbra === '') {
                    withReactContent(Swal).fire({
                        title: <div>
                            <p>Nome, Ambiente, Ingresso</p>
                            <p>Immagine Umbra Giorno</p>
                            <p>sono obbligatori!</p>
                        </div>
                    })
                    return false;
                }
                return true;
            } else {
                if (location.nome === '' || location.ambiente === '' || location.urlImgGiorno === '' || location.urlImgGiornoUmbra === '') {
                    withReactContent(Swal).fire({
                        title: <div>
                            <p>Nome, Ambiente, Ingresso</p>
                            <p>Immagine giorno e Immagine Umbra Giorno</p>
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
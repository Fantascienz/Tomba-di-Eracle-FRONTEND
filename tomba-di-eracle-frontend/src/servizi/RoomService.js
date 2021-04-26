import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content"

const URL = "http://localhost:8080/locations/rooms/"

class RoomService {

    inserimentoRoom = (rooms) => {
        return axios.post(URL,rooms)
    }

    validaCreazionRoom = (room) => {
        if (room.superLocation == 0 || room.colonne == 0 || room.mappaReame === '' || room.mappaUmbra == '') {
            withReactContent(Swal).fire({
                title: <p>Tutti i campi sono obbligatori!</p>
            })
            return false;
        }
        return true;
    }

    validaStanzaRoom = (stanza) => {
        if (stanza.location.nome === '' || stanza.location.urlImgGiorno === '' || stanza.location.urlImgNotte === '' ||
            stanza.location.ambiente == '' || stanza.locationUmbra.urlImgGiorno === '' || stanza.locationUmbra.urlImgNotte === '') {
            withReactContent(Swal).fire({
                title: <p>I campi contrassegnati con (*) sono obbligatori!</p>
            })
            return false;
        }
        return true;
    }
}

export default new RoomService()
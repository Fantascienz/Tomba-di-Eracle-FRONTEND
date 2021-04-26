import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content"


class RoomService {
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
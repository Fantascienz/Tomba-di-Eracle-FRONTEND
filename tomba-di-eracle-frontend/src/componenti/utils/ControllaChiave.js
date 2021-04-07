import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export const ControllaChiave = (chiave, location, metodoEntra) => {
    if (chiave === location.chiave) {
        metodoEntra(location.id)
    } else {
        withReactContent(Swal).fire({
            title: <p>Chiave Errata!</p>
        })
    }
}
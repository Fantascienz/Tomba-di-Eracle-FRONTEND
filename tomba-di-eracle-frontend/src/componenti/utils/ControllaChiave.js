import axios from "axios"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

export const ControllaChiave = (chiave, location, metodoEntra) => {
    if (location.hasChiave) {
        axios.get("http://localhost:8080/chiavi/" + location.id + '/' + chiave).then(res => {
            if (res.data) {
                metodoEntra(location.id)
            } else {
                withReactContent(Swal).fire({
                    title: <p>Chiave Errata!</p>
                })
            }
        }).catch(err => {
            withReactContent(Swal).fire({
                title: <p>Inserisci una chiave!</p>
            })
        }
        )
    } else {
        metodoEntra(location.id)
    }
}
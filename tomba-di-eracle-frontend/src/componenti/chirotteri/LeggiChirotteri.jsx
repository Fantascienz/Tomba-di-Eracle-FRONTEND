import { useState } from "react"
import ListaChirotteriRicevuti from "./ListaChirotteriRicevuti"


const LeggiChirotteri = ({ ricevuti }) => {

    const [chirottero, setChirottero] = useState('')
    const [mittente, setMittente] = useState('')
    const [dataInvio, setDataInvio] = useState('')
    const [letto, setLetto] = useState(false)

    return (
        <>
            <div className="row">
                    <ListaChirotteriRicevuti lista={ricevuti} letto={setLetto} scelta={setChirottero} sceltaMittente={setMittente} dataInvio={setDataInvio}/>
            </div>
        </>
    )
}

export default LeggiChirotteri
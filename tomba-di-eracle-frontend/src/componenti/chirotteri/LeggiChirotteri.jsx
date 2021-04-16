import { useState } from "react"
import ListaChirotteriRicevuti from "./ListaChirotteriRicevuti"
import MessaggioChirottero from "./MessaggioChirottero"


const LeggiChirotteri = ({ ricevuti }) => {

    const [chirottero, setChirottero] = useState('')
    const [mittente, setMittente] = useState('')
    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <ListaChirotteriRicevuti lista={ricevuti} scelta={setChirottero} sceltaMittente={setMittente}/>
                </div>
                <div className="col-md-6">
                    <MessaggioChirottero chirottero={chirottero} mittente={mittente} />
                </div>
            </div>
        </>
    )
}

export default LeggiChirotteri
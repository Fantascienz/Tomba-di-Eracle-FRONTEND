import { useState } from "react";
import Header from "../../layout/Header";
import { TitoloPagina } from "../../layout/TitoloPagina";
import CreazioneStanza from "../CreazioneStanza";


const RiempimentoRoom = () => {

    const template = JSON.parse(sessionStorage.getItem('roomTemplate'))
    const numeroSubLocation = Math.pow(template.colonne, 2);

    var subLoc = [];

    const [locations, setLocations] = useState([])
    const [locationSelezionata, setLocationSelezionata] = useState(0)

    const renderSelect = () => {
        for (let i = 1; i <= numeroSubLocation; i++) {
            subLoc.push(i);
        }
        return (
            <>
                {subLoc.map(loc =>
                    <option value={loc} key={loc}>{loc}</option>
                )}
            </>
        )
    }

    return (
        <>
            <Header />
            <div className="corpoComponente">
                <div className="row no-gutters">
                    <TitoloPagina titolo="Riempimento Room" />
                    <select className="form-select" onChange={(e) => setLocationSelezionata(e.target.value)} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)", width: '50%', alignSelf: 'center' }}>
                        <option value={0}>Seleziona location</option>
                        {renderSelect()}
                    </select>
                </div>
                <div className="row no-gutters">
                    <CreazioneStanza id={locationSelezionata} superLoc={template.superLocation} cellePerRiga={template.colonne} immagineMinimappa={template.mappaReame} aggiungiMappa={setLocations} />
                </div>
            </div>
        </>
    )
}

export default RiempimentoRoom;
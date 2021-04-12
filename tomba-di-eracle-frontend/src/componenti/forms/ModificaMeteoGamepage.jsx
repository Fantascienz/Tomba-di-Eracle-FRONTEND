import React, { useState } from "react";
import LocationService from "../../servizi/LocationService";
import { SelezionaMeteo } from "./SelezionaMeteo";


export const ModificaMeteoGamepage = ({ ultimaLocation }) => {

    const [meteoGiorno, setMeteoGiorno] = useState(ultimaLocation.meteoGiorno.id);
    const [meteoNotte, setMeteoNotte] = useState(ultimaLocation.meteoNotte.id);

    const handleUpdate = () => {
        let locationMod = {
            location: ultimaLocation,
            meteoGiorno: meteoGiorno,
            meteoNotte: meteoNotte,
        }
        LocationService.update(locationMod).then(
            alert('Location modificata con successo!')
        )
    }

    return (
        <React.Fragment>
            <h1 className="font-lombardia-yellow bg-dark">Modifica Condizioni Meteo</h1>
            <h3 className="font-lombardia-yellow bg-dark"> {'\n' + ultimaLocation.nome}</h3>
            <form onSubmit={() => handleUpdate()}>
                <SelezionaMeteo idSelect="meteoGiorno" handleChange={(e) => setMeteoGiorno(e.target.value)} orario="Giorno" />
                <SelezionaMeteo idSelect="meteoNotte" handleChange={(e) => setMeteoNotte(e.target.value)} orario="Notte" />
                <button className="btn btn-dark">Modifica</button>
            </form>
        </React.Fragment>
    )

}

export default ModificaMeteoGamepage;
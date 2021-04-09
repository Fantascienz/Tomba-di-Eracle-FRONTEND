import React, { useState } from "react"


export const Stalla = ({ naviga }) => {

    const [locationArrivo, setLocationArrivo] = useState(68);

    return (
        <React.Fragment>
            <h1 className="font-lombardia-yellow bg-dark rounded" >Stalla di Kallios</h1>
            <select name="locationArrivo" id="locationArrivo" onChange={(e) => setLocationArrivo(e.target.value)} className="form-select">
                <option value={68}>Kallios</option>
                {JSON.parse(sessionStorage.getItem('allLocations')).map(location =>
                    (location.ambiente === 'Citta' && location.tipo === 'Reame' && location.id !== 67 && location.id !== 68) ? <option value={location.id} key={location.id}>{location.nome}</option> : ""
                )}
            </select>
            <br />
            <button className="btn btn-dark" onClick={() => naviga(locationArrivo)}>Viaggia</button>
            <br />
        </React.Fragment>
    )
}
import React from "react"

export const SelezionaUscitaForm = ({handleChange }) => {

    return (
        <React.Fragment>
            <div className="input-group">
                <select className="form-select" name="uscita" id="uscita" style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)", marginBottom: "2%" }} onChange={handleChange}>
                    <option value="">Seleziona Uscita</option>
                    <option value="nord">NORD</option>
                    <option value="est">EST</option>
                    <option value="sud">SUD</option>
                    <option value="ovest">OVEST</option>
                </select>
            </div>
        </React.Fragment>
    )
}
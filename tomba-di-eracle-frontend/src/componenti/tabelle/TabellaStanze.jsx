import React, { useState } from "react"
import { Stalla } from "../forms/Stalla"
import { ControllaChiave } from "../utils/ControllaChiave"



export const TabellaStanze = ({ lista, entra, isKallios }) => {

    const [chiave, setChiave] = useState('')

    const renderStalla = () => {
        if (isKallios) {
            console.log(entra)
            return <Stalla naviga={entra}/>
        }
    }

    return (
        <React.Fragment>
            {renderStalla()}
            <br />
            <div className="table-responsive ombra" style={{ width: "100%", backgroundColor: "white" }}>
                <table className="table align-middle table-hover table-sm caption-top">
                    <thead className="table-dark align-middle" align="center">
                        <tr style={{ color: "#eeaa44" }}>
                            <th>Nome</th>
                            <th>Ambiente</th>
                            <th>Chiave</th>
                            <th>Ingresso</th>
                        </tr>
                    </thead>
                    <tbody align="center">
                        {lista.map(stanza =>
                            <tr key={stanza.subLocation.id}>
                                <td>{stanza.subLocation.nome}</td>
                                <td>{stanza.subLocation.ambiente}</td>
                                {stanza.subLocation.chiave == null ?
                                    <td>Entrata Libera</td>
                                    :
                                    <td><input type="text" maxLength="5" placeholder="Chiave" id="inputChiave" onChange={(e) => setChiave(e.target.value)} style={{ width: "50%" }} /></td>
                                }
                                <td>
                                    <button className="btn btn-dark" onClick={() => ControllaChiave(chiave, stanza.subLocation, entra)}>Entra</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}
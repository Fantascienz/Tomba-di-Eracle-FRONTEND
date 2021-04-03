import React from "react"


export const TabellaStanze = ({ lista, entra }) => {

    return (
        <React.Fragment>
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
                                <td>implementa</td>
                                <td>
                                    <button className="btn btn-dark" onClick={() => entra(stanza.subLocation.id)}>Entra</button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}
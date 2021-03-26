import React, { Component } from 'react';

class ListaPersonaggi extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={{ width: "100%", backgroundColor: "white", overflowY: "scroll" }}>
                    <table className="table align-middle">
                        <thead align="center">
                            <tr>
                                <th>Immagine</th>
                                <th>ID</th>
                                <th>Nominativo</th>
                                <th>Sesso</th>
                                <th>Razza</th>
                                <th>Rango</th>
                                <th>Nome Garou</th>
                                <th>Auspicio</th>
                                <th>Tribù</th>
                                <th>Branco</th>
                                <th>Sept</th>
                                <th>Proprietario</th>
                            </tr>
                        </thead>
                        <tbody>
                            {JSON.parse(sessionStorage.getItem('listaPersonaggi')).map(pg =>
                                <tr key={pg.id} align="center">
                                    <td><img src={pg.urlImmagine} alt="" style={{ height: "100px", width: "100px" }} /></td>
                                    <td>{pg.id}</td>
                                    <td>{pg.nominativo}</td>
                                    <td>{pg.sesso}</td>
                                    <td>{pg.razza}</td>
                                    <td>{pg.rango}</td>
                                    <td>{pg.nomeGarou}</td>
                                    <td>{pg.auspicio}</td>
                                    <td>{pg.tribu}</td>
                                    <td>{pg.branco}</td>
                                    <td>{pg.sept}</td>
                                    <td><p>ID: {pg.utente.id}</p> <p>{pg.utente.nominativo}</p> <p>{pg.utente.email}</p></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

export default ListaPersonaggi;
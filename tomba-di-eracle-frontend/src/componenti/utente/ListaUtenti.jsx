import React, { Component } from 'react';

class ListaUtenti extends Component {

    form

    render() {
        return (
            <React.Fragment>
                <div style={{ width: "800px",backgroundColor:"white" }}>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nominativo</th>
                                <th>Email</th>
                                <th>Tipo</th>
                                <th>Personaggi</th>
                                <th>Modifica Tipo</th>
                                <th>Ban</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.lista.map(utente => 
                                <tr key={utente.id}>
                                    <td>{utente.id}</td>
                                    <td>{utente.nominativo}</td>
                                    <td>{utente.email}</td>
                                    <td>{utente.tipo}</td>
                                    <td>implementa</td>
                                    <td><button >Implementa</button></td>
                                    <td><button >Implementa</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

export default ListaUtenti;
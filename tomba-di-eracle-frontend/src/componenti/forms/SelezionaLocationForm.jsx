import React, { Component } from 'react';

const utente = JSON.parse(sessionStorage.getItem('utente'));

class SelezionaLocationForm extends Component {

    renderLista = (location) => {
        if ((location.creatore !== null && utente.id === location.creatore.id) || utente.tipo === 'admin') {
            if (location.tipo === 'Reame' || location.tipo === 'Stanza') {
                return <option value={location.id} key={location.id}>{location.id}: {location.nome}</option>
            } else {
                return <option value={location.id} key={location.id}> {location.id}: UMBRA {location.nome}  </option>
            }
        }
    }
    render() {

        let listaOrdinata = this.props.lista.sort(
            (a, b) => (a.id < b.id ? -1 : Number(a.id > b.id))
        );

        return (

            <div className="input-group ">
                <select className="form-select" name="loc" id="loc" onChange={this.props.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)", marginBottom: "2%" }}>
                    <option value="">Seleziona Location</option>
                    {listaOrdinata.map(location =>
                        this.renderLista(location)
                    )}
                </select>
            </div>
        );
    }
}

export default SelezionaLocationForm;
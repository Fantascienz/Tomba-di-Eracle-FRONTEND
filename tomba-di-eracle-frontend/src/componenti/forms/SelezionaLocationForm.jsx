import React, { Component } from 'react';

const utente = JSON.parse(sessionStorage.getItem('utente'));

class SelezionaLocationForm extends Component {

    renderLista = (elemento) => {
        if (this.props.allLocations) {
            if ((elemento.creatore !== null && utente.id === elemento.creatore.id) || utente.tipo === 'admin') {
                if (elemento.tipo === 'Reame' || elemento.tipo === 'Stanza') {
                    return <option value={elemento.id} key={elemento.id}>{elemento.id}: {elemento.nome}</option>
                } else {
                    return <option value={elemento.id} key={elemento.id}> {elemento.id}: (UMBRA) - {elemento.nome}  </option>
                }
            }
        } else if (!this.props.stanza) {
            if (elemento.mappa === 'Esterna' && elemento.tipo === 'Reame') {
                if ((elemento.creatore !== null && utente.id === elemento.creatore.id) || utente.tipo === 'admin') {
                    if (elemento.tipo === 'Reame' || elemento.tipo === 'Stanza') {
                        return <option value={elemento.id} key={elemento.id}>{elemento.id}: {elemento.nome}</option>
                    } else {
                        return <option value={elemento.id} key={elemento.id}> {elemento.id}: (UMBRA) - {elemento.nome}  </option>
                    }
                }
            }
        } else {
            if ((elemento.subLocation.creatore !== null && utente.id === elemento.subLocation.creatore.id) || utente.tipo === 'admin') {
                if (elemento.subLocation.mappa === 'Stanza') {
                    return <option value={elemento.subLocation.id} key={elemento.subLocation.id}>
                        {elemento.subLocation.id}{elemento.subLocation.tipo === 'Stanza Umbra' ? "(UMBRA) - " : ""}: {elemento.subLocation.nome}</option>
                }
            }
        }
    }
    render() {

        let listaOrdinata = this.props.lista.sort(
            (a, b) => (a.id < b.id ? -1 : Number(a.id > b.id))
        );

        return (

            <div className="input-group ">
                <select className="form-select" name={this.props.id} id={this.props.id} onChange={this.props.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)", marginBottom: "2%" }}>
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
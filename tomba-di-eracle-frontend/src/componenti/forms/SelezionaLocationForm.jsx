import React, { Component } from 'react';

const utente = JSON.parse(sessionStorage.getItem('utente'));

class SelezionaLocationForm extends Component {

    renderLista = (location) => {
        if ((location.creatore !== null && utente.id === location.creatore.id) || utente.tipo === 'admin') {
            if (location.tipo === 'Reame') {
                return <option value={location.id} key={location.id}>{location.id}: {location.nome}</option>
            } else return <option value={location.id} key={location.id}> {location.id}: UMBRA {location.nome}  </option>
        }
    }
    render() {
        return (
            <div>
                <select name="loc" id="loc" onChange={this.props.handleChange} style={{ width: '50%' }}>
                    <option value="">Seleziona Location</option>
                    {this.props.lista.map(location =>
                        this.renderLista(location)
                    )}
                </select> <br /><br />

            </div>
        );
    }
}

export default SelezionaLocationForm;
import React, { Component } from 'react';

class SelezionaLocationForm extends Component {

    //AL MOMENTO IL COMPONENTE MOSTRA TUTTE LE LOCATION MACRO O ESTERNE,A PATTO CHE L'UTENTE SIA ADMIN O SIA IL CREATORE DELLA LOCATION
    renderLista = (elemento) => {
        if (elemento.creatore.id === JSON.parse(sessionStorage.getItem('utente')).id || JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            if (elemento.tipo === 'Reame' && (elemento.mappa === 'Macro' || elemento.mappa === 'Esterna')) {
                return <option value={elemento.id} key={elemento.id}>{elemento.id}: {elemento.nome}</option>
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
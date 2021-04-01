import React, { Component } from 'react';

class EliminaLocationForm extends Component {
    renderListaEliminazione = (location) => {
        if (JSON.parse(sessionStorage.getItem('utente')).id === location.creatore.id || JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            return <option value={location.id} key={location.id}>{location.nome}: {location.id}</option>
        }
    }
    render() {
        return (
            <div>
                   <form onSubmit={this.props.handleDelete}>
                                <select name="cancellaLoc" id="cancellaLoc" onChange={this.props.handleChange} style={{ width: '50%' }}>
                                    <option value="">Seleziona Location da Eliminare</option>
                                    {JSON.parse(sessionStorage.getItem('listaEsterneReame')).map(location =>
                                        this.renderListaEliminazione(location)
                                    )}
                                </select> <br /><br />
                                <button className="btn btn-dark">Elimina</button>
                            </form>
            </div>
        );
    }
}

export default EliminaLocationForm;
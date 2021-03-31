import React, { Component } from 'react';
import LocationService from '../../servizi/LocationService';
import Header from '../layout/Header';
import Macromappa from './Macromappa';

class ModificaLocation extends Component {

    state = {
        cancellaLoc: ''
    }

    renderListaEliminazione = (location) => {
        if (JSON.parse(sessionStorage.getItem('utente')).id === location.creatore.id || JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            return <option value={location.id} key={location.id}>{location.nome}: {location.id}</option>
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleDelete = (event) => {
        if (this.state.cancellaLoc !== '') {
            LocationService.delete(this.state.cancellaLoc).then(
                alert('Location eliminata correttamente!')
            )
        }
    }

    componentDidMount() {
        LocationService.getAllEsterne()
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="corpoComponente">
                    <div className="row">
                        <div className="col-md-4">
                            <h1>MODIFICA LOCATION</h1>
                            <h1>AOOOOOOO</h1>
                        </div>
                        <div className="col-md-3">
                            <Macromappa />
                        </div>
                        <div className="col-md-3">
                            <h1>Elimina Location</h1>
                            <form onSubmit={this.handleDelete}>
                                <select name="cancellaLoc" id="cancellaLoc" onChange={this.handleChange} style={{ width: '50%' }}>
                                    <option value="">Seleziona Location da Eliminare</option>
                                    {JSON.parse(sessionStorage.getItem('listaEsterneReame')).map(location =>
                                        this.renderListaEliminazione(location)
                                    )}
                                </select> <br /><br />
                                <button className="btn btn-dark">Elimina</button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ModificaLocation;
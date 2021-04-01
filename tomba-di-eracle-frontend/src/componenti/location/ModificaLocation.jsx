import React, { Component } from 'react';
import LocationService from '../../servizi/LocationService';
import EliminaLocationForm from '../forms/EliminaLocationForm';
import ModificaLocationForm from '../forms/ModificaLocationForm';
import Header from '../layout/Header';
import Macromappa from './Macromappa';

class ModificaLocation extends Component {

    state = {
        cancellaLoc: '',
        locationMod: '',
        fasciaOraria: '',
        meteo: '',
        data: '',
        nomeMod: '',
        chiave: '',
        urlImgGiorno: '',
        urlImgNotte: '',
        urlMinimappa: '',
        urlAudio: ''
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

    handleUpdate = (event) => {
        let location = {
            id: this.state.locationMod,
            nome: this.state.nomeMod,
            chiave: this.state.chiave,
            urlImgGiorno: this.state.urlImgGiorno,
            urlImgNotte: this.state.urlImgNotte,
            urlMinimappa: this.state.urlMinimappa,
            urlAudio: this.state.urlMinimappa,
            fasciaOraria: this.state.fasciaOraria,
            meteo: this.state.meteo,
            data: this.state.data,
        }
        if (LocationService.validaCampiModifica(location)) {
            LocationService.update(location).then(
                alert('Location modificata con successo!')
            )
        }

    }

    componentDidMount() {
        LocationService.sessioneMappeEsterne()
        LocationService.sessioneMappeMacro()
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="corpoComponente">
                    <div className="row">
                        <div className="col-md-4">
                            <h1 className="font-lombardia-yellow">Modifica Location {this.state.locationMod}</h1>
                            <ModificaLocationForm handleChange={this.handleChange} handleUpdate={this.handleUpdate} />
                        </div>
                        <div className="col-md-5">
                            <Macromappa />
                        </div>
                        <div className="col-md-3">
                            <h1 className="font-lombardia-yellow">Elimina Location</h1>
                            <EliminaLocationForm handleChange={this.handleChange} handleDelete={this.handleDelete}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ModificaLocation;
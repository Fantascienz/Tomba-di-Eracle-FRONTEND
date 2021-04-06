import React, { Component } from 'react';
import LocationService from '../../servizi/LocationService';
import SelezionaLocationForm from '../forms/SelezionaLocationForm';
import ModificaLocationForm from '../forms/ModificaLocationForm';
import Header from '../layout/Header';
import Macromappa from './Macromappa';
import { TitoloPagina } from '../layout/TitoloPagina';
import ModificaStanzaForm from '../forms/ModificaStanzaForm';

class ModificaLocation extends Component {

    state = {
        loc: '',
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
        if (this.state.loc !== '') {
            LocationService.delete(this.state.loc).then(
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
        LocationService.sessioneStanze()
    }

    render() {

        let listaOrdinataESTERNE = JSON.parse(sessionStorage.getItem('listaEsterneReame')).sort(
            (a, b) => (a.id < b.id ? -1 : Number(a.id > b.id))
        );

        let stanze = JSON.parse(sessionStorage.getItem('stanze'));

        return (
            <React.Fragment>
                <Header />
                <div className="corpoComponente">
                    <div className="row">
                        <div className="col-md-3 centrato">
                            <TitoloPagina titolo="Modifica Location" />
                            <ModificaLocationForm handleChange={this.handleChange} handleUpdate={this.handleUpdate} />
                        </div>
                        <div className="col-md-3 centrato">
                            <TitoloPagina titolo="Modifica Stanza" />
                            <ModificaStanzaForm handleChange={this.handleChange} handleUpdate={this.handleUpdate} />
                        </div>

                        <div className="col-md-3 centrato">
                            <Macromappa pxDimensioniMappa="400" lenteDisplay="none" idLocation={this.state.locationMod} />
                        </div>

                        <div className="col-md-3 " >
                            <TitoloPagina titolo="Elimina Location" />
                            <div className="centrato">
                                <form onSubmit={this.handleDelete}>
                                    <SelezionaLocationForm lista={listaOrdinataESTERNE} stanza={false} handleChange={this.handleChange} />
                                    <button className="btn btn-dark">Elimina</button>
                                </form>
                            </div>
                            <TitoloPagina titolo="Elimina Stanza" />
                            <div className="centrato">
                                <form onSubmit={this.handleDelete}>
                                    <SelezionaLocationForm lista={stanze} stanza={true} handleChange={this.handleChange} />
                                    <button className="btn btn-dark">Elimina</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ModificaLocation;
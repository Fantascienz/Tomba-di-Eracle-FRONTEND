import React, { Component } from 'react';
import LocationService from '../../servizi/LocationService';
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

    renderListaEliminazione = (location) => {
        if (JSON.parse(sessionStorage.getItem('utente')).id === location.creatore.id || JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            return <option value={location.id} key={location.id}>{location.nome}: {location.id}</option>
        }
    }

    renderListaModificaEsterne = (location) => {
        if (JSON.parse(sessionStorage.getItem('utente')).id === location.creatore.id || JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            return <option value={location.id} key={location.id}>{location.nome}: {location.id}</option>
        }
    }

    renderFormModificaAdmin = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            return (
                <React.Fragment>
                    <select name="fasciaOraria" id="fasciaOraria" onChange={this.handleChange} style={{ width: '47%' }}>
                        <option value="">Seleziona Fascia Oraria</option>
                        <option value="Ripristina reale">Ripristina Reale</option>
                        <option value="Giorno">Giorno</option>
                        <option value="Notte">Notte</option>
                    </select>
                    <br /><br />
                    <select name="meteo" id="meteo" onChange={this.handleChange} style={{ width: '47%' }}>
                        <option value="">Seleziona Meteo</option>
                        <option value="Ripristina reale">Ripristina Reale</option>
                        <option value="Sereno"> Sereno </option>
                        <option value="Nuvoloso">Nuvoloso</option>
                        <option value="Nebbia">Nebbia</option>
                        <option value="Pioggia">Pioggia</option>
                        <option value="Tempesta">Tempesta</option>
                        <option value="Neve">Neve</option>
                    </select>
                    <br /><br />
                    <input type="date" id="data" onChange={this.handleChange} />
                    <br /><br />
                </React.Fragment>
            )
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
                            <form onSubmit={this.handleUpdate}>
                                <select name="locationMod" id="locationMod" onChange={this.handleChange} style={{ width: '47%' }}>
                                    <option value="">Seleziona Location da Modificare</option>
                                    <option value="" style={{ fontWeight: 'bold' }}>--- Location Esterne ---</option>
                                    {JSON.parse(sessionStorage.getItem('listaEsterneReame')).map(location =>
                                        this.renderListaModificaEsterne(location)
                                    )}
                                    <option value="" style={{ fontWeight: 'bold' }}>--- Macro Location ---</option>
                                    {JSON.parse(sessionStorage.getItem('listaMacroLocation')).map(location =>
                                        <option value={location.id} key={location.id}>{location.nome}: {location.id}</option>
                                    )}
                                </select>
                                <br /><br />
                                <input type="text" id="nomeMod" onChange={this.handleChange} placeholder="Nome" />
                                <br /><br />
                                <input type="text" id="chiave" onChange={this.handleChange} placeholder="Chiave" />
                                <br /><br />
                                <input type="text" id="urlImgGiorno" onChange={this.handleChange} placeholder="URL Immagine Giorno" />
                                <br /><br />
                                <input type="text" id="urlImgNotte" onChange={this.handleChange} placeholder="URL Immagine Notte" />
                                <br /><br />
                                <input type="text" id="urlMinimappa" onChange={this.handleChange} placeholder="URL Immagine Minimappa" />
                                <br /><br />
                                <input type="text" id="urlAudio" onChange={this.handleChange} placeholder="URL Audio" />
                                <br /><br />
                                {this.renderFormModificaAdmin()}
                                <button className="btn btn-dark">Modifica</button>
                            </form>
                        </div>
                        <div className="col-md-5">
                            <Macromappa />
                        </div>
                        <div className="col-md-3">
                            <h1 className="font-lombardia-yellow">Elimina Location</h1>
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
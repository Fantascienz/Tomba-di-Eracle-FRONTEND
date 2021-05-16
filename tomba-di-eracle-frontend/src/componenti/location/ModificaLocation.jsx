import React, { Component } from 'react';
import LocationService from '../../servizi/LocationService';
import SelezionaLocationForm from '../forms/SelezionaLocationForm';
import ModificaLocationForm from '../forms/ModificaLocationForm';
import Header from '../layout/Header';
import Macromappa from './Macromappa';
import { TitoloPagina } from '../layout/TitoloPagina';
import ModificaStanzaForm from '../forms/ModificaStanzaForm';
import ConfermaScelta from '../utils/ConfermaScelta';
import { ModalComponente } from '../utils/ModalComponent';
import { messaggioEliminazioneLocation } from '../utils/costanti';

class ModificaLocation extends Component {

    state = {
        loc: '',
        locationMod: '',
        ambiente: '',
        fasciaOraria: '',
        meteoGiorno: 0,
        meteoNotte: 0,
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
        let locationMod = {
            location: {
                id: this.state.locationMod,
                nome: this.state.nomeMod,
                ambiente: this.state.ambiente,
                chiave: this.state.chiave,
                urlImgGiorno: this.state.urlImgGiorno,
                urlImgNotte: this.state.urlImgNotte,
                urlMinimappa: this.state.urlMinimappa,
                urlAudio: this.state.urlMinimappa,
                fasciaOraria: this.state.fasciaOraria,
                data: this.state.data,
            },
            meteoGiorno: this.state.meteoGiorno,
            meteoNotte: this.state.meteoNotte
        }
        if (LocationService.validaCampiModifica(locationMod.location)) {
            LocationService.update(locationMod).then(
                alert('Location modificata con successo!')
            )
        } else {
            event.preventDefault();
        }
    }

    getListaEsterneRoom = () => {
        let esterne = [];
        for (let i = 0; i < JSON.parse(sessionStorage.getItem('allLocations')).length; i++) {
            if (JSON.parse(sessionStorage.getItem('allLocations'))[i].room) {
                esterne.push(JSON.parse(sessionStorage.getItem('allLocations'))[i])
            }
        }
        return esterne;
    }

    componentDidMount() {
        LocationService.sessioneAllLocation()
        LocationService.sessioneStanze()
    }

    render() {

        return (
            <React.Fragment>
                <Header />
                <div className="corpoComponente">
                    <div className="row">
                        <div className="col-md-3 centrato">
                            <TitoloPagina titolo="Modifica Location" fontSize="5vh"/>
                            <ModificaLocationForm handleChange={this.handleChange} handleUpdate={this.handleUpdate} />
                        </div>
                        <div className="col-md-3 centrato">
                            <TitoloPagina titolo="Modifica Stanza" fontSize="5vh"/>
                            <ModificaStanzaForm handleChange={this.handleChange} handleUpdate={this.handleUpdate} />
                        </div>

                        <div className="col-md-3 centrato">
                            <Macromappa pxDimensioniMappa="400" lenteDisplay="none" idLocation={this.state.locationMod} />
                        </div>

                        <div className="col-md-3 " >
                            <TitoloPagina titolo="Elimina Location" fontSize="5vh"/>
                            <div className="centrato">
                                <SelezionaLocationForm lista={this.getListaEsterneRoom()} stanza={false} id="loc" handleChange={this.handleChange} />
                                <ModalComponente
                                    contenuto={<ConfermaScelta messaggio={messaggioEliminazioneLocation} funzione={this.handleDelete} />}
                                    bottone={<button className="btn btn-dark" >Elimina</button>}
                                />
                            </div>
                            <TitoloPagina titolo="Elimina Stanza" fontSize="5vh"/>
                            <div className="centrato">
                                {/* <form onSubmit={() => alert('implementa!')}>
                                    <SelezionaLocationForm lista={stanze} stanza={true} id="loc" handleChange={this.handleChange} />
                                    <button className="btn btn-dark">Elimina</button>
                                </form> */}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ModificaLocation;
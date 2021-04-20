import React, { Component } from 'react';
import LocationService from '../../servizi/LocationService';
import CreazioneLocationForm from '../forms/CreazioneLocationForm';
import Header from '../layout/Header';
import { TitoloPagina } from '../layout/TitoloPagina';
import Macromappa from './Macromappa';

class CreazioneLocation extends Component {

    state = {
        locationId: 999,
        nome: '',
        ambiente: '',
        meteo: 1,
        ingresso: '',
        urlImgGiorno: '',
        urlImgNotte: '',
        urlAudio: null,
        chiave: '',
        urlImgGiornoUmbra: '',
        urlImgNotteUmbra: '',
        urlAudioUmbra: null,
        // locationIngresso: '',
        // direzioneIngresso: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        
        if (LocationService.validaCampiCreazione(this.state, false)) {
            let locationCreata = {
                location: {
                    id: this.state.locationId,
                    nome: this.state.nome,
                    ambiente: this.state.ambiente,
                    urlImgGiorno: this.state.urlImgGiorno,
                    urlImgNotte: this.state.urlImgNotte,
                    urlAudio: this.state.urlAudio,
                    chiave: this.state.chiave,
                    creatore: JSON.parse(sessionStorage.getItem('utente'))
                },
                idLocationIngresso: parseInt(this.state.locationIngresso, 10),
                // direzioneIngresso: this.state.direzioneIngresso,
                ingresso: this.state.ingresso,
                meteoGiorno: this.state.meteo,
                meteoNotte: this.state.meteo,
                umbra: {
                    urlImgGiorno: this.state.urlImgGiornoUmbra,
                    urlImgNotte: this.state.urlImgNotteUmbra,
                    urlAudio: this.state.urlAudioUmbra
                }
            }
            // alert(locationCreata.meteoGiorno)
            LocationService.creaLocation(locationCreata).then(
                alert('Location creata con successo!')
                
            )
            console.log(locationCreata)
            event.preventDefault()
        } else {
            event.preventDefault()
        }
    }

    componentDidMount() {
        LocationService.sessioneAllLocation()
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="corpoComponente">
                    <div className="row">
                        <div className="col-md-6 centrato">
                            <TitoloPagina titolo="Creazione Location Esterna" />
                            <br />
                            <form onSubmit={this.handleSubmit} style={{ width: "75%" }}>
                                <CreazioneLocationForm handleChange={this.handleChange} stanza={false} ingresso={this.state.locationIngresso} 
                                    anteprimaGiorno={this.state.urlImgGiorno} anteprimaNotte={this.state.urlImgNotte}
                                    anteprimaGiornoUmbra={this.state.urlImgGiornoUmbra} anteprimaNotteUmbra={this.state.urlImgNotteUmbra}/>
                                <button className="btn btn-dark">Crea</button>
                            </form>
                        </div>

                        <div className="col-md-4 centrato">
                            <div style={{ marginTop: "10%" }}>
                                <Macromappa pxDimensioniMappa="400" lenteDisplay="none" idLocation={parseInt(this.state.locationIngresso)} />
                            </div>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CreazioneLocation;
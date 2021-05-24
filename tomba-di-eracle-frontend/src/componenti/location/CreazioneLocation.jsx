import React, { Component } from 'react';
import LocationService from '../../servizi/LocationService';
import Header from '../layout/Header';
import { TitoloPagina } from '../layout/TitoloPagina';
import Macromappa from './Macromappa';
import {CreaEsterna, GrigliaLocEsterne} from '../forms/CreaEsterna'

class CreazioneLocation extends Component {

    state = {
        locationId: 999,
        nome: '',
        ambiente: '',
        meteo: 1,
        urlImgGiorno: '',
        urlImgNotte: '',
        urlAudio: null,
        chiave: '',
        urlImgGiornoUmbra: '',
        urlImgNotteUmbra: '',
        urlAudioUmbra: null,
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if (LocationService.validaCampiCreazione(this.state, false, false)) {

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
                meteoGiorno: parseInt(this.state.meteo, 10),
                meteoNotte: parseInt(this.state.meteo, 10),
                umbra: {
                    urlImgGiorno: this.state.urlImgGiornoUmbra,
                    urlImgNotte: this.state.urlImgNotteUmbra,
                    urlAudio: this.state.urlAudioUmbra
                }
            }
            LocationService.creaLocation(locationCreata).then(() => {
                alert('Location creata con successo!')
            }
            )
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

                        <div className="row">
                            <TitoloPagina titolo="Creazione Location Esterna" fontSize="8vh" />
                        </div>

                        <div className="col-md-6 centrato">
                            <div className="centrato"
                                style={{ height: "75vh" }}>
                                <form onSubmit={this.handleSubmit} style={{ width: "75%", overflowY: "auto", overflowX: "hidden" }}>
                                    <CreaEsterna handleChange={this.handleChange} state={this.state} />
                                    <button className="btn btn-dark">Crea</button>
                                </form>
                            </div>
                        </div>

                        <div className="col-md-6 centrato"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "auto 60vh auto",
                                gridTemplateRows: "auto 60vh auto"
                            }}>
                            <GrigliaLocEsterne idLocSelezionata={this.state.locationId}/>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CreazioneLocation;
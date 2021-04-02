import React, { Component } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import LocationService from '../../servizi/LocationService';
import CreazioneLocationForm from '../forms/CreazioneLocationForm';
import Header from '../layout/Header';
import { TitoloPagina } from '../layout/TitoloPagina';
import Macromappa from './Macromappa';

class CreazioneLocation extends Component {

    state = {
        nome: '',
        ambiente: '',
        ingresso: '',
        urlImgGiorno: '',
        urlImgNotte: '',
        urlAudio: '',
        chiave: '',
        urlImgGiornoUmbra: '',
        urlImgNotteUmbra: '',
        urlAudioUmbra: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    estrapolaDirezione = (ingresso) => {
        let direzione = ''
        for (let i = 0; i < ingresso.length; i++) {
            if (isNaN(ingresso.charAt(i))) {
                direzione += ingresso.charAt(i)
            }
        }
        return direzione;
    }

    handleSubmit = (event) => {
        if (LocationService.validaCampiCreazione(this.state,false)) {
            let locationCreata = {
                location: {
                    nome: this.state.nome,
                    ambiente: this.state.ambiente,
                    urlImgGiorno: this.state.urlImgGiorno,
                    urlImgNotte: this.state.urlImgNotte,
                    urlAudio: this.state.urlAudio,
                    chiave: this.state.chiave,
                    creatore: JSON.parse(sessionStorage.getItem('utente'))
                },
                idLocationIngresso: parseInt(this.state.ingresso, 10),
                direzioneIngresso: this.estrapolaDirezione(this.state.ingresso),
                ingresso: this.state.ingresso,
                umbra: {
                    urlImgGiorno: this.state.urlImgGiornoUmbra,
                    urlImgNotte: this.state.urlImgNotteUmbra,
                    urlAudio: this.state.urlAudioUmbra
                }
            }
            LocationService.creaLocation(locationCreata).then(
                alert('Location creata con successo!')
            )
        } else {
            event.preventDefault()
        }
    }

    componentDidMount() {
        LocationService.sessioneDirezioniLibere()
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="corpoComponente">
                    <div className="row">
                        <div className="col-md-6">
                            <TitoloPagina titolo="Creazione Location Esterna" />
                            <br />
                            <form onSubmit={this.handleSubmit}>
                                <CreazioneLocationForm handleChange={this.handleChange} stanza={false} />
                                <button className="btn btn-dark">Crea</button>
                            </form>
                        </div>
                        <div className="col-md-4">
                            <div style={{ marginTop: "10%" }}>
                                <Macromappa pxDimensioniMappa="700" lenteDisplay="none" idLocation={parseInt(this.state.ingresso)} />

                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CreazioneLocation;
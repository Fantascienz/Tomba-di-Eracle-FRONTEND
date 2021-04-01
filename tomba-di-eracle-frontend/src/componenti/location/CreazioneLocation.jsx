import React, { Component } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import LocationService from '../../servizi/LocationService';
import CreazioneLocationForm from '../forms/CreazioneLocationForm';
import Header from '../layout/Header';
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

    handleSubmit = (event) => {
        if (LocationService.validaCampiCreazione(this.state)) {
            let locationCreata = {
                location: {
                    nome: this.state.nome,
                    ambiente: this.state.ambiente,
                    ingresso: this.state.ingresso,
                    urlImgGiorno: this.state.urlImgGiorno,
                    urlImgNotte: this.state.urlImgNotte,
                    urlAudio: this.state.urlAudio,
                    chiave: this.state.chiave,
                    creatore: JSON.parse(sessionStorage.getItem('utente'))
                },
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
            withReactContent(Swal).fire({
                title: <div>
                    <p>Nome,Ambiente,Ingresso</p>
                    <p>Immagine giorno e Audio</p>
                    <p>sono obbligatori!</p>
                </div>
            })
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
                            <h1 className="font-lombardia" style={{ fontSize: "5vw", color: "#eeaa44", textShadow: "2px 2px black" }}>Creazione Location Esterna</h1>
                            <br />
                            <CreazioneLocationForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
                        </div>
                        <div className="col-md-4">
                            <div style={{ marginTop: "10%" }}>
                                <Macromappa />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CreazioneLocation;
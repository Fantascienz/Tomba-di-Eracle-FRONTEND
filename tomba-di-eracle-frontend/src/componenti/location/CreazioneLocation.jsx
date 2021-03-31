import React, { Component } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import LocationService from '../../servizi/LocationService';
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
        LocationService.getLocationDirezioniLibere()
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
                            <form onSubmit={this.handleSubmit}>
                                <input type="text" id="nome" placeholder="Nome" onChange={this.handleChange} style={{width: '50%'}} /> <br /> <br />
                                <input type="text" id="ambiente" placeholder="Ambiente" onChange={this.handleChange} style={{width: '50%'}} /> <br /> <br />
                                <input type="text" id="urlImgGiorno" placeholder="URL Immagine Giorno" onChange={this.handleChange} style={{width: '50%'}} /> <br /> <br />
                                <input type="text" id="urlImgNotte" placeholder="URL Immagine Notte" onChange={this.handleChange} style={{width: '50%'}} /> <br /> <br />
                                <input type="text" id="urlAudio" placeholder="URL Audio" onChange={this.handleChange} style={{width: '50%'}} /> <br /> <br />
                                <input type="text" id="chiave" placeholder="Chiave d'accesso" onChange={this.handleChange} style={{width: '50%'}} /> <br /> <br />
                                <input type="text" id="urlImgGiornoUmbra" placeholder="URL Immagine Giorno Umbra" onChange={this.handleChange} style={{width: '50%'}} /> <br /> <br />
                                <input type="text" id="urlImgNotteUmbra" placeholder="URL Immagine Notte Umbra" onChange={this.handleChange} style={{width: '50%'}} /> <br /> <br />
                                <input type="text" id="urlAudioUmbra" placeholder="URL Audio Umbra" onChange={this.handleChange} style={{width: '50%'}}/> <br /> <br />
                                <select name="ingresso" id="ingresso" onChange={this.handleChange} style={{width: '50%'}}>
                                    <option value="">Seleziona Ingresso</option>
                                    {JSON.parse(sessionStorage.getItem('locationsNordLibero')).map(location =>
                                        <option value={"nord " + location.id} key={location.id}>NORD di {location.nome}: {location.id}</option>
                                    )}
                                    {JSON.parse(sessionStorage.getItem('locationsEstLibero')).map(location =>
                                        <option value={"est " + location.id} key={location.id}>EST di {location.nome}: {location.id}</option>
                                    )}
                                    {JSON.parse(sessionStorage.getItem('locationsSudLibero')).map(location =>
                                        <option value={"sud " + location.id} key={location.id}>SUD di {location.nome}: {location.id}</option>
                                    )}
                                    {JSON.parse(sessionStorage.getItem('locationsOvestLibero')).map(location =>
                                        <option value={"ovest " + location.id} key={location.id}>OVEST di {location.nome}: {location.id}</option>
                                    )}
                                </select> <br /><br />
                                <button className="btn btn-dark">Crea</button>
                            </form>
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
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
        chiave: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if (LocationService.validaCampiCreazione(this.state)) {
            console.log(this.state)
        } else {
            withReactContent(Swal).fire({
                title: <div>
                    <p>Nome,Ambiente,</p>
                    <p>Immagine giorno e Audio</p>
                    <p>sono obbligatori!</p>
                </div>
            })
        }
    }

    componentDidMount() {
        LocationService.getLocationByDirezioneLibera('nord').then(res => {
            sessionStorage.setItem('locationsNordLibero', JSON.stringify(res.data))
        })
        LocationService.getLocationByDirezioneLibera('est').then(res => {
            sessionStorage.setItem('locationsEstLibero', JSON.stringify(res.data))
        })
        LocationService.getLocationByDirezioneLibera('sud').then(res => {
            sessionStorage.setItem('locationsSudLibero', JSON.stringify(res.data))
        })
        LocationService.getLocationByDirezioneLibera('ovest').then(res => {
            sessionStorage.setItem('locationsOvestLibero', JSON.stringify(res.data))
        })
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
                                <input type="text" id="nome" placeholder="Nome" onChange={this.handleChange} /> <br /> <br />
                                <input type="text" id="ambiente" placeholder="Ambiente" onChange={this.handleChange} /> <br /> <br />
                                <input type="text" id="urlImgGiorno" placeholder="URL Immagine Giorno" onChange={this.handleChange} /> <br /> <br />
                                <input type="text" id="urlImgNotte" placeholder="URL Immagine Notte" onChange={this.handleChange} /> <br /> <br />
                                <input type="text" id="urlAudio" placeholder="URL Audio" onChange={this.handleChange} /> <br /> <br />
                                <input type="text" id="chiave" placeholder="Chiave d'accesso" onChange={this.handleChange} /> <br /> <br />
                                <select name="ingresso" id="ingresso" onChange={this.handleChange} style={{ width: "100px" }}>
                                    {JSON.parse(sessionStorage.getItem('locationsNordLibero')).map(location =>
                                        <option value={location.id} key={location.id}>NORD di {location.nome}: {location.id}</option>
                                    )}
                                    {JSON.parse(sessionStorage.getItem('locationsEstLibero')).map(location =>
                                        <option value={location.id} key={location.id}>EST di {location.nome}: {location.id}</option>
                                    )}
                                    {JSON.parse(sessionStorage.getItem('locationsSudLibero')).map(location =>
                                        <option value={location.id} key={location.id}>SUD di {location.nome}: {location.id}</option>
                                    )}
                                    {JSON.parse(sessionStorage.getItem('locationsOvestLibero')).map(location =>
                                        <option value={location.id} key={location.id}>OVEST di {location.nome}: {location.id}</option>
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
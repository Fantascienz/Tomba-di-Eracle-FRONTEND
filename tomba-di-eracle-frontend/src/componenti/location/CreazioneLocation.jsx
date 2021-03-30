import React, { Component } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import LocationService from '../../servizi/LocationService';
import Header from '../layout/Header';

class CreazioneLocation extends Component {

    state = {
        nome: '',
        tipo: '',
        ambiente: '',
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
                    <p>Nome,Tipo,Ambiente,</p>
                    <p>Immagine giorno e Audio</p>
                    <p>sono obbligatori!</p>
                </div>
            })
        }

    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="corpoComponente">
                    <h1>Creazione Location Esterna</h1>
                    <br />
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" id="nome" placeholder="Nome" onChange={this.handleChange} /> <br /> <br />
                        <div className="row" style={{ width: "20%", margin: "auto" }}>
                            <div className="col-sm-6">
                                <label>Reame</label>
                                <input type="radio" id="tipo" name="tipo" value="Reame" onChange={this.handleChange} />
                            </div>
                            <div className="col-sm-6">
                                <label>Stanza </label>
                                <input type="radio" id="tipo" name="tipo" value="Stanza" onChange={this.handleChange} /> <br /> <br />
                            </div>
                        </div>
                        <input type="text" id="ambiente" placeholder="Ambiente" onChange={this.handleChange} /> <br /> <br />
                        <input type="text" id="urlImgGiorno" placeholder="URL Immagine Giorno" onChange={this.handleChange} /> <br /> <br />
                        <input type="text" id="urlImgNotte" placeholder="URL Immagine Notte" onChange={this.handleChange} /> <br /> <br />
                        <input type="text" id="urlAudio" placeholder="URL Audio" onChange={this.handleChange} /> <br /> <br />
                        <input type="text" id="chiave" placeholder="Chiave d'accesso" onChange={this.handleChange} /> <br /> <br />
                        <button className="btn btn-dark">Crea</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default CreazioneLocation;
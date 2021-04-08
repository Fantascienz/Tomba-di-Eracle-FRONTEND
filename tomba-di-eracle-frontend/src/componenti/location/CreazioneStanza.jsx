import React, { Component } from 'react';
import LocationService from '../../servizi/LocationService';
import CreazioneLocationForm from '../forms/CreazioneLocationForm';
import SelezionaLocationForm from '../forms/SelezionaLocationForm';
import { SelezionaUscitaForm } from '../forms/SelezionaUscitaForm';
import Header from '../layout/Header';
import { TitoloPagina } from '../layout/TitoloPagina';
import Macromappa from './Macromappa';

class CreazioneStanza extends Component {

    state = {
        loc: '',
        nome: '',
        ambiente: '',
        ingresso: '',
        urlImgGiorno: '',
        urlImgNotte: '',
        urlAudio: '',
        chiave: null,
        urlImgGiornoUmbra: '',
        urlImgNotteUmbra: '',
        urlAudioUmbra: '',
        uscita: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    estrapolaDirezione = (uscita) => {
        let direzione = ''
        for (let i = 0; i < uscita.length; i++) {
            if (isNaN(uscita.charAt(i))) {
                direzione += uscita.charAt(i)
            }
        }
        return direzione;
    }

    handleSubmit = (event) => {
        if (LocationService.validaCampiCreazione(this.state, true)) {
            let stanza = {
                location: {
                    nome: this.state.nome,
                    tipo: 'Stanza',
                    ambiente: this.state.ambiente,
                    urlImgGiorno: this.state.urlImgGiorno,
                    urlImgNotte: this.state.urlImgNotte,
                    urlAudio: this.state.urlAudio,
                    chiave: this.state.chiave,
                    creatore: JSON.parse(sessionStorage.getItem('utente'))
                },
                umbra: {
                    urlImgGiorno: this.state.urlImgGiornoUmbra,
                    urlImgNotte: this.state.urlImgNotteUmbra,
                    urlAudio: this.state.urlAudioUmbra
                },
                superLocation: this.state.loc,
                direzioneUscita: this.state.uscita

            }
            LocationService.creaStanza(stanza).then(
                alert('Stanza creata con successo!')

            )
        } else {
            event.preventDefault();
        }
    }

    componentDidMount() {


    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="corpoComponente">
                    <TitoloPagina titolo="Creazione Stanza" />
                    <div className="row">
                        <div className="col-md-6 centrato">
                            <form onSubmit={this.handleSubmit} >
                                <SelezionaLocationForm lista={JSON.parse(sessionStorage.getItem('allLocations'))} handleChange={this.handleChange} stanza={false} allLocations={true}/>
                                <CreazioneLocationForm handleChange={this.handleChange} stanza={true} />
                                <SelezionaUscitaForm location={this.state.loc} handleChange={this.handleChange}/>
                                <button className="btn btn-dark">Crea</button>
                            </form>
                        </div>

                        <div className="col-md-6">
                            <Macromappa pxDimensioniMappa="400" lenteDisplay="none" idLocation={parseInt(this.state.loc)} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default CreazioneStanza;
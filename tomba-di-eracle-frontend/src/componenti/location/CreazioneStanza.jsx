import React, { Component, useState } from 'react';
import LocationService from '../../servizi/LocationService';
import CreazioneLocationForm from '../forms/CreazioneLocationForm';
import SelezionaLocationForm from '../forms/SelezionaLocationForm';
import { SelezionaUscitaForm } from '../forms/SelezionaUscitaForm';
import Header from '../layout/Header';
import { TitoloPagina } from '../layout/TitoloPagina';
import Macromappa from './Macromappa';
import MinimappaRegolabile from './MinimappaReagolabile';
import { coefficienteId } from './room/impostazioniDirezioni';

const CreazioneStanza = (props) => {

    const [nome, setNome] = useState('')
    const [ambiente, setAmbiente] = useState('')
    const [urlImgGiorno, setUrlImgGiorno] = useState('')
    const [urlImgNotte, setUrlImgNotte] = useState('')
    const [urlAudio, setUrlAudio] = useState('')
    const [chiave, setChiave] = useState('')
    const [urlImgGiornoUmbra, setUrlImgGiornoUmbra] = useState('')
    const [urlImgNotteUmbra, setUrlImgNotteUmbra] = useState('')
    const [urlAudioUmbra, setUrlAudioUmbra] = useState('')
    const [aggiunta, setAggiunta] = useState(false)

    const changeHandler = [setNome, setAmbiente, setUrlImgGiorno, setUrlImgNotte, setUrlAudio, setChiave, setUrlImgGiornoUmbra, setUrlImgNotteUmbra, setUrlAudioUmbra]

    const aggiungiLocation = () => {
        let sublocation = {
            location: {
                id: props.id * coefficienteId(props.cellePerRiga) + parseInt(props.superLoc,10),
                nome: nome,
                ambiente: ambiente,
                urlImgGiorno: urlImgGiorno,
                urlImgNotte: urlImgNotte,
                urlAudio: urlAudio,
                chiave: chiave,
                urlImgGiornoUmbra: urlImgGiornoUmbra,
                urlImgNotteUmbra: urlImgNotteUmbra,
                urlAudioUmbra: urlAudioUmbra,
            },
            idSuperLocation: props.id
        }

        alert(sublocation.location.id)

    }

    // const handleSubmit = (event) => {

    //     var tipoValidazione = this.tipoLocation() == 'Umbra' ? true : false;

    //     if (LocationService.validaCampiCreazione(this.state, true, tipoValidazione)) {
    //         let stanza = {
    //             location: {
    //                 nome: this.state.nome,
    //                 tipo: 'Stanza',
    //                 ambiente: this.state.ambiente,
    //                 urlImgGiorno: this.state.urlImgGiorno,
    //                 urlImgNotte: this.state.urlImgNotte,
    //                 urlAudio: this.state.urlAudio,
    //                 chiave: this.state.chiave,
    //                 creatore: JSON.parse(sessionStorage.getItem('utente'))
    //             },
    //             umbra: {
    //                 urlImgGiorno: this.state.urlImgGiornoUmbra,
    //                 urlImgNotte: this.state.urlImgNotteUmbra,
    //                 urlAudio: this.state.urlAudioUmbra
    //             },
    //             superLocation: this.state.loc,
    //             direzioneUscita: this.state.uscita
    //         }
    //         LocationService.creaStanza(stanza).then(
    //             alert('Stanza creata con successo!')
    //         )
    //         // event.preventDefault();
    //     } else {
    //         event.preventDefault();
    //     }
    // }


    // const tipoLocation = () => {
    //     var allLocation = JSON.parse(sessionStorage.getItem('allLocations'))

    //     for (let i = 0; i < allLocation.length; i++) {
    //         if (allLocation[i].id == this.state.loc) {
    //             if (allLocation[i].tipo.includes('Umbra')) {
    //                 return 'Umbra'
    //             }
    //             return 'Normale'
    //         }
    //     }
    // }
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-6 centrato">
                    <h1>id selezionata {props.id}</h1>
                    <div style={{ width: "75%" }}>
                        <CreazioneLocationForm changeHandler={changeHandler} stanza={true} anteprimaGiorno={urlImgGiorno} anteprimaNotte={urlImgNotte}
                            anteprimaGiornoUmbra={urlImgGiornoUmbra} anteprimaNotteUmbra={urlImgNotteUmbra}
                            idLocation={props.id} />
                        <button className="btn btn-dark" onClick={() => aggiungiLocation()}>Aggiungi</button>
                    </div>
                </div>

                <div className="col-md-6 centrato" >
                    <MinimappaRegolabile pxDimensioniMappa="400" immagineMinimappa={props.immagineMinimappa} cellePerRiga={props.cellePerRiga} lenteDisplay="none" />
                </div>
            </div>
        </React.Fragment>
    );
}

export default CreazioneStanza;
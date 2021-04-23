import React, { Component, useState } from 'react';
import LocationService from '../../servizi/LocationService';
import CreazioneLocationForm from '../forms/CreazioneLocationForm';
import SelezionaLocationForm from '../forms/SelezionaLocationForm';
import { SelezionaUscitaForm } from '../forms/SelezionaUscitaForm';
import Header from '../layout/Header';
import { TitoloPagina } from '../layout/TitoloPagina';
import Macromappa from './Macromappa';
import MinimappaRegolabile from './MinimappaReagolabile';
import { coefficienteId, setDirezioniX1, setDirezioniX2, setDirezioniX3 } from './room/impostazioniDirezioni';

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
    const [chiaveUmbra, setChiaveUmbra] = useState(false)
    const [aggiunta, setAggiunta] = useState(false)

    const changeHandler = [setNome, setAmbiente, setUrlImgGiorno, setUrlImgNotte, setUrlAudio, setChiave, setUrlImgGiornoUmbra, setUrlImgNotteUmbra, setUrlAudioUmbra, setChiaveUmbra]

    const formState = {
        nome: nome,
        ambiente: ambiente,
        urlImgGiorno: urlImgGiorno,
        urlImgNotte: urlImgNotte,
        urlAudio: urlAudio,
        chiave: chiave,
        urlImgGiornoUmbra: urlImgGiornoUmbra,
        urlImgNotteUmbra: urlImgNotteUmbra,
        urlAudioUmbra: urlAudioUmbra,

    }

    const aggiungiLocation = () => {
        let superLoc = parseInt(props.superLoc, 10);
        let id = props.id * coefficienteId(props.cellePerRiga) + superLoc
        let sublocation = {
            location: {
                id: id,
                nome: nome,
                ambiente: ambiente,
                urlImgGiorno: urlImgGiorno,
                urlImgNotte: urlImgNotte,
                urlAudio: urlAudio,
                urlMinimappa: props.immagineMinimappaReame,
                chiave: chiave,
            },
            idSuperLocation: props.id,
            direzioni: generaDirezioni(id, false),
            locationUmbra: {
                id: superLoc <= 288 ? id + 144 : id + 48,
                nome: nome,
                ambiente: ambiente,
                urlImgGiorno: urlImgGiornoUmbra,
                urlImgNotte: urlImgNotteUmbra,
                urlAudio: urlAudioUmbra,
                urlMinimappa: props.immagineMinimappaUmbra,
                chiave: chiaveUmbra ? chiave : null
            },
            direzioniUmbra: superLoc <= 288 ? generaDirezioni(id + 144, true) : generaDirezioni(id + 48, true)
        }
        setAggiunta(true)
        props.aggiungiLocation(sublocation)
        resetState()

    }

    const generaDirezioni = (id, umbra) => {
        let superLoc = parseInt(props.superLoc, 10)
        if (umbra) {
            if (superLoc <= 288) {
                superLoc += 144
            } else {
                superLoc += 48
            }
        }
        switch (props.cellePerRiga) {
            case '3':
                return setDirezioniX3(superLoc, id, umbra)
            case '2':
                return setDirezioniX2(superLoc, id, umbra)
            case '1':
                return setDirezioniX1(superLoc, id, umbra)

        }
    }

    const resetState = () => {
        setNome('')
        setAmbiente('')
        setUrlImgGiorno('')
        setUrlImgNotte('')
        setUrlAudio('')
        setChiave('')
        setUrlImgGiornoUmbra('')
        setUrlImgNotteUmbra('')
        setUrlAudioUmbra('')
        setChiaveUmbra(false)
        setAggiunta(false)
    }
    return (
        <React.Fragment>
            {console.log(props.locationCella)}
            <div className="row">
                <div className="col-md-6 centrato">
                    <h1>id selezionata {props.id}</h1>
                    <div style={{ width: "75%" }}>
                        <CreazioneLocationForm changeHandler={changeHandler} stanza={true} anteprimaGiorno={urlImgGiorno} anteprimaNotte={urlImgNotte}
                            anteprimaGiornoUmbra={urlImgGiornoUmbra} anteprimaNotteUmbra={urlImgNotteUmbra} chiaveUmbra={chiaveUmbra}
                            idLocation={props.id} formState={formState} formPlaceholders={props.locationCella} />
                        <button className="btn btn-dark" onClick={() => aggiungiLocation()}>{aggiunta ? 'Modifica' : 'Aggiungi'}</button>
                    </div>
                </div>
                <div className="col-md-6 centrato" >
                    <MinimappaRegolabile pxDimensioniMappa="400" immagineMinimappa={props.immagineMinimappaReame} cellePerRiga={props.cellePerRiga} lenteDisplay="none" />
                </div>
            </div>
        </React.Fragment>
    );
}

export default CreazioneStanza;
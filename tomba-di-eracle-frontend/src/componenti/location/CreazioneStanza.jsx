import React, { Component, useState } from 'react';
import CreazioneLocationForm from '../forms/CreazioneLocationForm';
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

    var allLocations = JSON.parse(sessionStorage.getItem('allLocations'));

    const getSuperLocation = () => {
        for (let i = 0; i < allLocations.length; i++) {
            if (allLocations[i].id == props.superLoc) {
                return allLocations[i]
            }
        }
    }

    const setMappa = () => {
        if (props.cellePerRiga == 3) {
            return 'Mid'
        }
        if (props.cellePerRiga == 2) {
            return 'Inner'
        }
        if (props.cellePerRiga == 1) {
            return 'Stanza'
        }
    }

    var superLocation = getSuperLocation()

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
        let superLoc = superLocation.id;
        let id = props.id * coefficienteId(props.cellePerRiga) + superLoc
        let sublocation = {
            location: {
                id: id,
                tipo: 'Reame',
                nome: nome,
                ambiente: ambiente,
                urlImgGiorno: urlImgGiorno,
                urlImgNotte: urlImgNotte,
                urlAudio: urlAudio,
                urlMinimappa: props.immagineMinimappaReame,
                meteoGiorno: superLocation.meteoGiorno,
                meteoNotte: superLocation.meteoNotte,
                chiave: chiave,
                creatore: JSON.parse(sessionStorage.getItem('utente')),
                mappa: setMappa()
            },
            idSuperLocation: props.id,
            superLocation: superLocation,
            direzioni: generaDirezioni(id, false),
            locationUmbra: {
                id: superLoc <= 288 ? id + 144 : id + 48,
                nome: nome,
                tipo: 'Umbra',
                ambiente: ambiente,
                urlImgGiorno: urlImgGiornoUmbra,
                urlImgNotte: urlImgNotteUmbra,
                urlAudio: urlAudioUmbra,
                urlMinimappa: props.immagineMinimappaUmbra,
                meteoGiorno: superLocation.meteoGiorno.id,
                meteoNotte: superLocation.meteoNotte.id,
                chiave: chiaveUmbra ? chiave : null,
                creatore: JSON.parse(sessionStorage.getItem('utente')),
                mappa: setMappa()
            },
            direzioniUmbra: superLoc <= 288 ? generaDirezioni(id + 144, true) : generaDirezioni(id + 48, true),
            chiaveUmbra: chiaveUmbra,
        }
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
                    <div style={{ width: "75%" }}>
                        <CreazioneLocationForm changeHandler={changeHandler} stanza={true} anteprimaGiorno={urlImgGiorno} anteprimaNotte={urlImgNotte}
                            anteprimaGiornoUmbra={urlImgGiornoUmbra} anteprimaNotteUmbra={urlImgNotteUmbra} chiaveUmbra={chiaveUmbra}
                            idLocation={props.id} formState={formState} formPlaceholders={props.locationCella} />
                        <button className="btn btn-dark" onClick={() => aggiungiLocation()}>Aggiungi</button>
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
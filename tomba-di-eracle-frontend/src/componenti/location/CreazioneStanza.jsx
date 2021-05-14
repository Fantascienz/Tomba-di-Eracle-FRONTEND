import React, { useState } from 'react';
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

    const changeHandler = [setNome, setAmbiente, setUrlImgGiorno, setUrlImgNotte, setUrlAudio, setChiave, setUrlImgGiornoUmbra, setUrlImgNotteUmbra, setUrlAudioUmbra, setChiaveUmbra]

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
        let id = props.id * coefficienteId(props.cellePerRiga) + props.superLoc.id
        let sublocation = {
            location:
            props.superLoc.tipo === 'Reame' ? {
                    id: id,
                    tipo: 'Reame',
                    nome: nome,
                    ambiente: ambiente,
                    urlImgGiorno: urlImgGiorno,
                    urlImgNotte: urlImgNotte,
                    urlAudio: urlAudio,
                    urlMinimappa: props.immagineMinimappaReame,
                    meteoGiorno: props.superLoc.meteoGiorno,
                    meteoNotte: props.superLoc.meteoNotte,
                    chiave: chiave,
                    creatore: JSON.parse(sessionStorage.getItem('utente')),
                    mappa: setMappa()
                } : null,
            idSuperLocation: props.id,
            superLocation: props.superLoc,
            direzioni: generaDirezioni(id, false),
            locationUmbra: {
                id: props.superLoc.tipo === 'Reame' ?
                    (props.superLoc.id % 1000 <= 288 ? id + 144 : id + 48) :
                    props.superLoc.id > 99999 ? props.superLoc.id + 100000 : props.superLoc.id + 200000,
                nome: nome,
                tipo: 'Umbra',
                ambiente: ambiente,
                urlImgGiorno: urlImgGiornoUmbra,
                urlImgNotte: urlImgNotteUmbra,
                urlAudio: urlAudioUmbra,
                urlMinimappa: props.immagineMinimappaUmbra,
                meteoGiorno: props.superLoc.meteoGiorno.id,
                meteoNotte: props.superLoc.meteoNotte.id,
                chiave: chiaveUmbra ? chiave : null,
                creatore: JSON.parse(sessionStorage.getItem('utente')),
                mappa: setMappa()
            },                                    
            direzioniUmbra: JSON.parse(sessionStorage.getItem('roomTemplate')).superLocation.tipo === 'Reame' ? props.superLoc.id % 1000 <= 288 ? generaDirezioni(id + 144, true) : generaDirezioni(id + 48, true) : generaDirezioni(props.superLoc.id + 200000, false),
            chiaveUmbra: chiaveUmbra,
        }
        props.aggiungiLocation(sublocation)
        resetState()

    }

    const generaDirezioni = (id, umbra) => {
        let superLoc = props.superLoc.id
        if (umbra) {
            if (superLoc % 1000 <= 288) {
                superLoc += 144
            } else {
                superLoc += 48
            }
        }
        switch (props.cellePerRiga) {
            case '3':
                return setDirezioniX3(superLoc, id)
            case '2':
                return setDirezioniX2(superLoc, id)
            case '1':
                return setDirezioniX1(superLoc, id)
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
    }
    return (
        <React.Fragment>
            <div className="row">
                <div className="col-md-6 centrato">
                    <div style={{ width: "75%" }}>
                        <CreazioneLocationForm changeHandler={changeHandler} stanza={true} anteprimaGiorno={urlImgGiorno} anteprimaNotte={urlImgNotte}
                            anteprimaGiornoUmbra={urlImgGiornoUmbra} anteprimaNotteUmbra={urlImgNotteUmbra} chiaveUmbra={chiaveUmbra}
                            idLocation={props.id} formState={formState} formPlaceholders={props.locationCella} tipo={props.superLoc.tipo} />
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
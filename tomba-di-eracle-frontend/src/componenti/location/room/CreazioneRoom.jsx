import { useState } from "react";
import { useHistory } from "react-router";
import RoomService from "../../../servizi/RoomService";
import Footer from "../../layout/Footer"
import Header from "../../layout/Header";
import { TitoloPagina } from "../../layout/TitoloPagina";
import MinimappaRegolabile from "../MinimappaReagolabile";
import Macromappa2 from "../Macromappa2";
import './CreazioneRoom.css';

const CreazioneRoom = () => {

    const [superLoc, setSuperLoc] = useState(0)
    const [colonne, setColonne] = useState(0)
    const [locationReame, setMappaReame] = useState('')
    const [locationUmbra, setMappaUmbra] = useState('')

    const history = useHistory();
    const allLocations = JSON.parse(sessionStorage.getItem('allLocations'));
    const listaSuperLoc = JSON.parse(sessionStorage.getItem('listaSuperLocation'))

    const renderOptions = () => {
        let location = {};
        for (let i = 0; i < allLocations.length; i++) {
            if (allLocations[i].id == superLoc) { location = allLocations[i] }
        }

        if (location.tipo === 'Umbra') {
            if (location.id < 200000) {
                return <option value={1}>1 x 1</option>
            } else return <option value={0}>Questa location non può avere sotto-location!</option>
        }
        if (location.mappa === 'Macro' || location.mappa === 'Esterna') {
            return (
                <>
                    <option value={3}>9 Stanze (griglia 3 x 3)</option>
                    <option value={2}>4 Stanze (griglia 2 x 2)</option>
                    <option value={1}>1 Stanza (1 x 1)</option>
                </>
            )
        }
        if (location.mappa === 'Mid') {
            return (
                <>
                    <option value={2}>2 x 2</option>
                    <option value={1}>1 x 1</option>
                </>
            )
        }
        if (location.mappa === 'Inner') {
            return (
                <> <option value={1}>1 x 1</option> </>
            )
        }
        if (location.mappa === 'Stanza') {
            if (location.tipo === 'Reame') { return <option value={0}>Questa location non può avere sotto-location!</option> }
        }
    }

    const getSuperLocation = () => {
        for (let i = 0; i < allLocations.length; i++) {
            if (allLocations[i].id == superLoc) { return allLocations[i] }
        }
    }

    const getSuperLocationUmbra = () => {
        const allLocations2 = JSON.parse(sessionStorage.getItem('allLocations'));

        const direzioniEIdETipoLocations = []
        for (let i = 0; i < allLocations2.length; i++) {
            const oggettoLocation = {
                id: allLocations2[i].id,
                direzioni: allLocations2[i].direzioni,
                tipo: allLocations2[i].tipo
            }
            direzioniEIdETipoLocations.push(oggettoLocation)
        }

        for (let i = 0; i < direzioniEIdETipoLocations.length; i++) {
            if (direzioniEIdETipoLocations[i].id == superLoc) {

                if (direzioniEIdETipoLocations[i].tipo == 'Umbra') {
                    return direzioniEIdETipoLocations[i].id
                }
                return direzioniEIdETipoLocations[i].direzioni.idLocationSpecchio;
            }
        }
    }

    const getTipoSuperlocation = () => {
        for (let i = 0; i < allLocations.length; i++) {
            if (allLocations[i].id == superLoc) {
                return allLocations[i].tipo;
            }
        }
    }

    const toImpostaRoom = () => {
        let room = {
            superLocation: getSuperLocation(),
            colonne: colonne,
            locationReame: locationReame,
            locationUmbra: locationUmbra
        }
        if (RoomService.validaCreazionRoom(room)) {
            sessionStorage.setItem('roomTemplate', JSON.stringify(room));
            history.push('/riempimentoRoom')
        }
    }

    const handleChangeUrlMinimappaReale = (e) =>{
        if(e.target.value.length>=e.target.maxLength){
            alert("Attenzione! L'URL inserito per la Minimappa Reame è maggiore di "+e.target.maxLength+" caratteri! Scegli un URL più corto!")
            e.target.value=null;
        } else {
            setMappaReame(e.target.value);
        }
    }

    const handleChangeUrlMinimappaUmbra = (e) =>{
        if(e.target.value.length>=e.target.maxLength){
            alert("Attenzione! L'URL inserito per la Minimappa Umbra è maggiore di "+e.target.maxLength+" caratteri! Scegli un URL più corto!")
            e.target.value=null;
        } else {
            setMappaUmbra(e.target.value);
        }
    }


    return (
        <>
            <Header />
            <div className="corpoComponente">

                <TitoloPagina titolo="Creazione Room" fontSize="8vh" />

                <div className="grid-body-creazione-room">

                    <div className="lato-sx">
                        <div>
                            <Macromappa2 locationSelezionata={superLoc} abilitaComandi permettiNavigazione permettiNavigazioneSpecchio permettiIngrandimento dimensioneMappa="50vmin" />
                        </div>
                    </div>


                    <div className="lato-dx">

                        {/* SELECT Super Location */}
                        <div style={{ gridRowStart: "1"}}>
                            <select className="form-select" name="super" id="super" onChange={(e) => setSuperLoc(e.target.value)}>
                                <option value={0}>Seleziona la Location all'interno della quale creare la Room</option>
                                {listaSuperLoc.map(superLoc =>
                                    <option value={superLoc.id} key={superLoc.id}>({superLoc.id} - {superLoc.nome} - {superLoc.tipo})</option>
                                )}
                            </select>
                        </div>

                        {/* SELECT Griglia */}
                        <div style={{ gridRowStart: "2"}}>
                            <select className="form-select" name="colonne" id="colonne" onChange={(e) => setColonne(e.target.value)}>
                                <option value={0}>Seleziona il numero di Stanze in cui si vuole dividere la Room</option>
                                {renderOptions()}
                            </select>
                        </div>

                        <div className="boxes-minimappe" 
                            style={{ gridRowStart: "3" }}>

                            {/* INPUT Url Minimappa Reame */}
                            <div style={{ gridRowStart: "1", gridColumnStart: "1" }}>
                                {getTipoSuperlocation() != "Umbra" ?
                                    <input id="minimappa-reale-input-url" type="text" placeholder="Url Minimappa Reame" onChange={(e) => handleChangeUrlMinimappaReale(e)} maxLength="1024" />
                                    :
                                    null
                                }
                            </div>

                            {/* MINIMAPPA Reame */}
                            <div style={{ gridRowStart: "2", gridColumnStart: "1", display: "grid", gridTemplateColumns: "auto 50vh auto" }}>
                                <div style={{ gridColumnStart: "2" }}>
                                    {getTipoSuperlocation() != "Umbra" ?
                                        <MinimappaRegolabile idLocation={superLoc} pxDimensioniMappa="50" immagineMinimappa={locationReame} cellePerRiga={colonne} lenteDisplay="none" />
                                        :
                                        <p>La Location selezionata è di tipo <b>Umbra</b>, quindi non ha una location Reame creabile</p>
                                    }
                                </div>
                            </div>

                            {/* INPUT Url Minimappa Umbra */}
                            <div style={{ gridRowStart: "1", gridColumnStart: "3" }}>
                                <input id="minimappa-umbra-input-url" type="text" placeholder="Url Minimappa Umbra" onChange={(e) => handleChangeUrlMinimappaUmbra(e)} maxLength="1024"/>
                            </div>

                            {/* MINIMAPPA Umbra */}
                            <div style={{ gridRowStart: "2", gridColumnStart: "3", display: "grid", gridTemplateColumns: "auto 50vh auto" }}>
                                <div style={{ gridColumnStart: "2" }}>
                                    <MinimappaRegolabile idLocation={getSuperLocationUmbra()} pxDimensioniMappa="50" immagineMinimappa={locationUmbra} cellePerRiga={colonne} lenteDisplay="none" />
                                </div>
                            </div>

                        </div>

                        {/* BOTTONE invio */}
                        <div style={{ gridRowStart: "4" }}>
                            <button className="btn btn-dark" onClick={() => toImpostaRoom()} disabled={locationReame=="" || locationUmbra=="" || superLoc==0 || colonne==0 ? true: false}>Crea Room</button>
                        </div>

                    </div>
                </div>
            </div>
            < Footer />
        </>
    )
}

export default CreazioneRoom;
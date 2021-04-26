import { useState } from "react";
import Header from "../../layout/Header";
import { TitoloPagina } from "../../layout/TitoloPagina";
import CreazioneStanza from "../CreazioneStanza";


const RiempimentoRoom = () => {

    const template = JSON.parse(sessionStorage.getItem('roomTemplate'))
    const numeroSubLocation = Math.pow(template.colonne, 2);

    var subLoc = [];

    const [locations, setLocations] = useState([])
    const [locationSelezionata, setLocationSelezionata] = useState("1")

    const getLocationCella = () => {
        for (let i = 0; i < locations.length; i++) {
            if (locations[i].idSuperLocation === locationSelezionata) {
                return locations[i]
            }
        }
    }

    const renderSelect = () => {
        for (let i = 1; i <= numeroSubLocation; i++) {
            subLoc.push(i);
        }
        return (
            <>
                {subLoc.map(loc =>
                    <option value={loc} key={loc}>Location {loc}</option>
                )}
            </>
        )
    }

    const aggiungiLocation = (location) => {
        
        if (location.idSuperLocation !== 0) {
            let modificata = false;
            let nuoveLocations = locations
            for (let i = 0; i < nuoveLocations.length; i++) {
                if (nuoveLocations[i].idSuperLocation === location.idSuperLocation) {
                    console.log('VECCHIA',nuoveLocations[i])
                    modificaLocation(nuoveLocations[i],location)
                    modificata = true;
                    break;
                }
            }
            if (!modificata) {
                nuoveLocations.push(location)
            }
            setLocations(nuoveLocations)
            console.log(locations)
        } else {
            alert('scegli una location,cazzone')
        }
    }

    const modificaLocation = (vecchiaLoc, nuovaLoc) => {
        if (nuovaLoc.location.nome !== '') {
            vecchiaLoc.location.nome = nuovaLoc.location.nome
            vecchiaLoc.locationUmbra.nome = nuovaLoc.location.nome
        }
        if (nuovaLoc.location.ambiente !== '') {
            vecchiaLoc.location.ambiente = nuovaLoc.location.ambiente
            vecchiaLoc.locationUmbra.ambiente = nuovaLoc.locationUmbra.ambiente
        }
        if (nuovaLoc.location.urlImgGiorno !== '') {
            vecchiaLoc.location.urlImgGiorno = nuovaLoc.location.urlImgGiorno
        }
        if (nuovaLoc.location.urlImgNotte !== '') {
            vecchiaLoc.location.urlImgNotte = nuovaLoc.location.urlImgNotte
        }
        if (nuovaLoc.location.urlAudio !== '') {
            vecchiaLoc.location.urlAudio = nuovaLoc.location.urlAudio
        }
        if (nuovaLoc.location.chiave !== '') {
            vecchiaLoc.location.chiave = nuovaLoc.location.chiave
            //inserire controllo per la spunta 
        }
        if(nuovaLoc.chiaveUmbra) {
            if (nuovaLoc.location.chiave !== '') {
            vecchiaLoc.locationUmbra.chiave = nuovaLoc.location.chiave
            } else {
                vecchiaLoc.locationUmbra.chiave = vecchiaLoc.location.chiave
            }
        } else {
            vecchiaLoc.locationUmbra.chiave = null
        }
        if (nuovaLoc.locationUmbra.urlImgGiorno !== '') {
            vecchiaLoc.locationUmbra.urlImgGiorno = nuovaLoc.locationUmbra.urlImgGiorno
        }
        if (nuovaLoc.locationUmbra.urlImgNotte !== '') {
            vecchiaLoc.locationUmbra.urlImgNotte = nuovaLoc.locationUmbra.urlImgNotte
        }
        if (nuovaLoc.locationUmbra.urlAudio !== '') {
            vecchiaLoc.locationUmbra.urlAudio = nuovaLoc.locationUmbra.urlAudio
        }
    }

    return (
        <>
            <Header />
            <div className="corpoComponente">
                <div className="row no-gutters">
                    <TitoloPagina titolo="Riempimento Room" />
                    <h1>{locations.length}</h1>
                    <select className="form-select" onChange={(e) => setLocationSelezionata(e.target.value)} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)", width: '50%', alignSelf: 'center' }}>
                        {renderSelect()}
                    </select>
                </div>
                <div className="row no-gutters">
                    <CreazioneStanza id={locationSelezionata} superLoc={template.superLocation} cellePerRiga={template.colonne}
                        immagineMinimappaReame={template.mappaReame} immagineMinimappaUmbra={template.mappaUmbra}
                        locationCella={getLocationCella()} locations={locations} aggiungiLocation={aggiungiLocation} />
                </div>
            </div>
        </>
    )
}

export default RiempimentoRoom;
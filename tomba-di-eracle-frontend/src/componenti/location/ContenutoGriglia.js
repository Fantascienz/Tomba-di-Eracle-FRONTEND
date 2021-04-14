import star from '../../img/red_star.png'
import { ModalComponente } from '../utils/ModalComponent';
import React, { useState } from 'react';



export const RigaGriglia = ({ inizio, fine, idLocation, pxDimensioniMappa, allLocation }) => {
    var pxDimensioniCella = (pxDimensioniMappa / 12);
    const [unicaCella, setUnicaCella] = useState(0);

    function evidenziaCella(idCella) {
        if (allLocation != null) {

            for (let j = 0; j < allLocation.length; j++) {
                if (allLocation[j].id == idCella) {
                    if (allLocation[j].numeroStanze > 0) {
                        return allLocation[j].numeroStanze
                    }
                }
            }
        }
        return 0
    };

    function puntatoreCella(idCella) {
        if (idLocation == idCella) {
            return true
        } else {
            return false
        }
    };

    function apriCella(id) {
        if (unicaCella == 0) {
            setUnicaCella(id)
        } else {
            setUnicaCella(0)
        }
    }


    function cellaGriglia() {
        let arrayGriglia = []
        for (let i = inizio; i <= fine; i++) {
            arrayGriglia.push({
                codice:
                    <div onClick={evidenziaCella(i) > 0 ? () => apriCella(i) : null}
                        className="col-sm-1 griglia-macromappa" title={i} id={i} style={{ height: `${pxDimensioniCella}px`, width: `${pxDimensioniCella}px`, backgroundColor: `${evidenziaCella(i) > 0 ? 'rgba(255,0,0,0.4' : ''}`, backgroundImage: `url('${puntatoreCella(i) ? star : null}')`, backgroundSize: "contain", backgroundPosition: "center center", backgroundRepeat: "no-repeat" }}>
                        {evidenziaCella(i) > 0 ?
                            <b style={{ color: "black" }}>{evidenziaCella(i)}</b>
                            :
                            null
                        }
                    </div>
            })
        }
        return arrayGriglia;
    }

    function listaStanzeLocation(locationId) {
        var tutteLeStanze = JSON.parse(sessionStorage.getItem('stanze'));
        var stanzeLocation = [];
        for (let i = 0; i < tutteLeStanze.length; i++) {
            if (tutteLeStanze[i].location.id == locationId) {
                stanzeLocation.push(tutteLeStanze[i].subLocation)
            }
        }
        return stanzeLocation;
    }



    if (unicaCella == 0) {
        return (
            <div className="row" style={{ marginLeft: "0.01%" }}>
                {cellaGriglia().map(cella =>
                    cella.codice)}
            </div>
        )
    } else if (allLocation == null){
        setUnicaCella(0);
        return (
            <div className="row" style={{ marginLeft: "0.01%" }}>
                {cellaGriglia().map(cella =>
                    cella.codice)}
            </div>
        )
    } else {
        return (
            <div style={{ marginLeft: "0.01%" }}>
                <div onClick={() => apriCella(unicaCella)}
                    title={unicaCella} id={unicaCella} style={{ height: `${pxDimensioniMappa}px`, width: `${pxDimensioniMappa}px`, backgroundColor: `brown` }}>

                    <b className="font-lombardia" style={{ fontSize: "2.2em" }}>{allLocation[unicaCella-1].nome}</b>
                    <ul style={{ fontSize: "1em" }}>
                        <li>ID location: {unicaCella}</li>
                        <hr/>
                        <li>Stanze nella Location:</li>
                        <ul>
                            {listaStanzeLocation(unicaCella).map(stanza => <li>ID stanza: {stanza.id} - {stanza.nome}</li>)}
                        </ul>
                    </ul>
                </div>
            </div>
        )
    }
}

import { useState } from 'react';
import MacromappaBase from '../../img/macromappa.jpg'
import MacromappaBaseUmbra from '../../img/macromappa_umbra.jpg'
import FrecciaIcona from '../../img/freccia_sx.png'
import FrecciaOmbra from '../../img/freccia_sx_black.png'
import NavigazioneIcona from '../../img/mappa_icona.png'
import NavigazioneOmbra from '../../img/mappa_icona_black.png'
import SpecchioIcona from '../../img/specchio_icona.png'
import SpecchioOmbra from '../../img/specchio_icona_black.png'
import IngrandimentoIcona from '../../img/lente.png'
import InfoIcona from '../../img/Info_icona.png'
import InfoOmbra from '../../img/Info_icona_black.png'
import CornicePulsantiera from '../../img/pulsante_oro.png'
import Segnaposto from '../../img/red_star.png'
import Pergamena from '../../img/scroll_lunga_vert.png'
import { arrayAlberoGerarchicoLocation, presenzaStanze, trovaAlberoLocPadri, trovaLocation, trovaLocationSpecchio, trovaLocPadre, trovaLocsFiglie, trovaTipologiaLocation } from '../utils/LocationUtils';
import { GlassMagnifier } from 'react-image-magnifiers';
import './Macromappa2.css'
import { tipoUtenteSessione } from '../utils/UtenteUtils';

const Macromappa2 = ({ locationSelezionata, idIniziale, abilitaComandi, permettiNavigazione, permettiNavigazioneSpecchio, permettiIngrandimento, dimensioneMappa }) => {

    var locationSelezionata = (locationSelezionata == 0 ? locationSelezionata = null : locationSelezionata);
    var grandezzaMappa = (idIniziale == null || idIniziale <= 288) ? 12 : 0;
    var id1 = (idIniziale == null ? 1 : idIniziale);
    var dimensioneMappa = (dimensioneMappa == null ? "50vmin" : dimensioneMappa);

    const [griglia, setGriglia] = useState(grandezzaMappa);
    const [idPrimaCella, setIdPrimaCella] = useState(id1);
    const [mappa, setMappa] = useState(MacromappaBase);
    const [navigaLocation, setNavigaLocation] = useState(permettiNavigazione);
    const [magnifier, setMagnifier] = useState(false);
    const [info, setInfo] = useState(false);
    const [locationPrecedente, setLocationPrecedente] = useState(0);

    const apriCella = (idCella) => {

        var gerarchiaCelle = trovaLocsFiglie(idCella);

        //setta l'ID iniziale in base alla prima figlia della CELLA
        setIdPrimaCella(gerarchiaCelle.figlie[0].padre.id)

        //setta la grandezza della griglia in base al NUMERO DI FIGLIE
        if (gerarchiaCelle.numeroFiglie == 9) {
            setGriglia(3)
        } else if (gerarchiaCelle.numeroFiglie == 4) {
            setGriglia(2)
        } else if (gerarchiaCelle.numeroFiglie == 1) {
            setGriglia(1)
        }

        //modifica la mappa in base alla MINIMAPPA DELLA PRIMA FIGLIA
        setMappa(gerarchiaCelle.figlie[0].padre.urlMinimappa)

    }

    const celleGriglia = () => {
        var columns = griglia;
        var rows = griglia;
        var celleGriglia = []
        var idStart = idPrimaCella < 1000 ? idPrimaCella - 1 :
            idPrimaCella > 1000 && idPrimaCella < 10000 ? idPrimaCella - 1000 :
                idPrimaCella > 10000 && idPrimaCella < 100000 ? idPrimaCella - 10000 :
                    idPrimaCella

        for (let i = 1; i <= rows; i++) {
            for (let j = 1; j <= columns; j++) {
                var locationCella = trovaLocation(idPrimaCella < 1000 ? idStart += 1 :
                    idPrimaCella > 1000 && idPrimaCella < 10000 ? idStart += 1000 :
                        idPrimaCella > 10000 && idPrimaCella < 100000 ? idStart += 10000 :
                            idStart);

                if (navigaLocation && presenzaStanze(locationCella) && abilitaComandi) {
                    celleGriglia.push(
                        <div id={locationCella.id}
                            title={tipoUtenteSessione("Admin") || tipoUtenteSessione("Master") ? locationCella.id + " - " + locationCella.nome + "\n(clicka per aprire)" : locationCella.nome + "\n(clicka per aprire)"}
                            className="cella-con-stanze"
                            style={{ gridColumnStart: `${j}`,
                                     gridRowStart: `${i}`,
                                     backgroundImage: `${locationSelezionata == locationCella.id || arrayAlberoGerarchicoLocation(locationSelezionata).includes(locationCella.id) ? "url('" + Segnaposto + "')" : "none"}`,
                                     opacity: `${arrayAlberoGerarchicoLocation(locationSelezionata).includes(locationCella.id) ? "55%" : "100%"}`
                            }}
                            onClick={(e) => apriCella(parseInt(e.target.id))} >
                        </div>
                    )
                } else {
                    celleGriglia.push(
                        <div title={tipoUtenteSessione("Admin") || tipoUtenteSessione("Master") ? locationCella.id + " - " + locationCella.nome : locationCella.nome}
                            className="cella-no-stanze"
                            style={{ gridColumnStart: `${j}`,
                                     gridRowStart: `${i}`,
                                     backgroundImage: `${locationSelezionata == locationCella.id || arrayAlberoGerarchicoLocation(locationSelezionata).includes(locationCella.id) ? "url('" + Segnaposto + "')" : "none"}`,
                                     opacity: `${arrayAlberoGerarchicoLocation(locationSelezionata).includes(locationCella.id) ? "55%" : "100%"}`
                            }}>
                        </div>
                    )
                }
            }
        }

        return celleGriglia;
    }

    const grigliaMacromappa = () => {
        var columns = griglia;
        var rows = griglia;
        var gridTemplateColumnsN = ""
        var gridTemplateRowsN = ""

        // // LE LOCATION ESTERNE SONO DA IMPLEMENTARE GRAFICAMENTE ALL?INTERNO DELLA MACROMAPPA
        // // però i quadretti che le comprandono sono esterno al 12*12, bisogna capire come fare,
        // // tipo creare una griglia più grande, 14*14: quando è selezionata una Loc. INTERNA alla 12*12 (macro o stanza che sia),
        // // si mostra solo la griglia che parte da col2-row2 e finisce a col13-row13, mentre qando si seleziona una Loc ESTERNA alla 12*12,
        // // si mostra tutta la griglia 14*14, oppure solo la griglia di col1 / row1 / col14 / row 14, sempre tenendo conto che non ci sono
        // // location in col1-row1 / col14-row1 / col1/row14 / col14-row14

        for (let c = 1; c <= columns; c++) {
            gridTemplateColumnsN = gridTemplateColumnsN + "auto "
        }

        for (let r = 1; r <= rows; r++) {
            gridTemplateRowsN = gridTemplateRowsN + "auto "
        }

        return (
            <div className="griglia-mappa"
                style={{
                    gridTemplateColumns: `${gridTemplateColumnsN}`,
                    gridTemplateRows: `${gridTemplateRowsN}`,
                    backgroundImage: `url('${mappa}')`,
                }}>

                {(idIniziale > 288 && idIniziale <= 384) ? alert("Hai selezionato una location ESTERNA, che non è ancora implementata (vedi componente Macromappa2)") : null}

                {!magnifier ? celleGriglia() : <GlassMagnifier imageSrc={mappa} magnifierOffsetX={-150} magnifierOffsetY={150} magnifierSize="300px" allowOverflow={true} cursorStyle="crosshair" magnifierBorderColor="black" />}

            </div>
        )
    }


    const trovaIdPrimaCellaPadre = (idFiglia) => {
        var idPadre = trovaLocPadre(idFiglia);

        if (idPadre <= 144) {
            return 1;
        } else if (idPadre > 144 && idPadre <= 288) {
            return 145;
        } else if (idPadre > 288 && idPadre <= 336) {
            alert("Hai selezionato una location ESTERNA, che non è ancora implementata (vedi componente Macromappa2)");
            return 1;
        } else if (idPadre > 336 && idPadre <= 384) {
            alert("Hai selezionato una location ESTERNA, che non è ancora implementata (vedi componente Macromappa2)");
            return 145;
        } else if (idPadre > 1000 && idPadre < 10000) {
            return 1000 + parseInt(trovaLocPadre(idPadre));
        } else if (idPadre > 10000 && idPadre < 100000) {
            return 10000 + parseInt(trovaLocPadre(idPadre));
        } else if (idPadre > 100000) {
            return 100000 + parseInt(trovaLocPadre(idPadre));
        }

    }

    const trovaIdPrimaCella = (idPadre) => {
        if (idPadre <= 144) {
            return 1;
        } else if (idPadre > 144 && idPadre <= 288) {
            return 145;
        } else if (idPadre > 288 && idPadre <= 336) {
            alert("Hai selezionato una location ESTERNA, che non è ancora implementata (vedi componente Macromappa2)");
            return 1;
        } else if (idPadre > 336 && idPadre <= 384) {
            alert("Hai selezionato una location ESTERNA, che non è ancora implementata (vedi componente Macromappa2)");
            return 145;
        } else if (idPadre > 1000 && idPadre < 10000) {
            return 1000 + parseInt(trovaLocPadre(idPadre));
        } else if (idPadre > 10000 && idPadre < 100000) {
            return 10000 + parseInt(trovaLocPadre(idPadre));
        } else if (idPadre > 100000) {
            return 100000 + parseInt(trovaLocPadre(idPadre));
        }

    }

    const tornaVistaPrecedente = (idCella) => {
        var idPartenza = trovaIdPrimaCellaPadre(idCella);

        //setta l'ID della PRIMA CELLA
        setIdPrimaCella(idPartenza);

        //setta la grandezza della griglia in base alla tipologia della PRIMA CELLA
        if (trovaTipologiaLocation(idPartenza) == 'xxx') {
            setGriglia(12);
        } else if (trovaTipologiaLocation(idPartenza) == 'mxxx') {
            setGriglia(3);
        } else if (trovaTipologiaLocation(idPartenza) == 'dmxxx') {
            setGriglia(2);
        } else if (trovaTipologiaLocation(idPartenza) == 'cdmxxx') {
            setGriglia(1);
        }

        //modifica la mappa in base alla MINIMAPPA DELLA PRIMA CELLA
        if (trovaLocation(idPartenza).urlMinimappa == null && trovaLocation(idPartenza).tipo == "Reame") {
            setMappa(MacromappaBase);
        } else if (trovaLocation(idPartenza).urlMinimappa == null && trovaLocation(idPartenza).tipo == "Umbra") {
            setMappa(MacromappaBaseUmbra);
        } else {
            setMappa(trovaLocation(idPartenza).urlMinimappa);
        }
    }

    const onLocationSelezionataChange = (loc) => {

        if (loc != locationPrecedente) {

            var idPartenza = trovaIdPrimaCella(loc);

            //setta l'ID della PRIMA CELLA
            setIdPrimaCella(idPartenza);

            //setta la grandezza della griglia in base alla tipologia della PRIMA CELLA
            if (trovaTipologiaLocation(idPartenza) == 'xxx') {
                setGriglia(12);
            } else if (trovaTipologiaLocation(idPartenza) == 'mxxx') {
                setGriglia(3);
            } else if (trovaTipologiaLocation(idPartenza) == 'dmxxx') {
                setGriglia(2);
            } else if (trovaTipologiaLocation(idPartenza) == 'cdmxxx') {
                setGriglia(1);
            }

            //modifica la mappa in base alla MINIMAPPA DELLA PRIMA CELLA
            if (trovaLocation(idPartenza).urlMinimappa == null && trovaLocation(idPartenza).tipo == "Reame") {
                setMappa(MacromappaBase);
            } else if (trovaLocation(idPartenza).urlMinimappa == null && trovaLocation(idPartenza).tipo == "Umbra") {
                setMappa(MacromappaBaseUmbra);
            } else {
                setMappa(trovaLocation(idPartenza).urlMinimappa);
            }

            setLocationPrecedente(loc)
        }
    }

    const switchToLocsSpecchio = (idCella) => {
        var idSpecchio = trovaLocationSpecchio(idCella);

        //setta la prima cella come lo specchio della precedente
        setIdPrimaCella(idSpecchio);

        //modifica la minimappa
        if (trovaLocation(idSpecchio).urlMinimappa == null && trovaLocation(idSpecchio).tipo == "Reame") {
            setMappa(MacromappaBase);
        } else if (trovaLocation(idSpecchio).urlMinimappa == null && trovaLocation(idSpecchio).tipo == "Umbra") {
            setMappa(MacromappaBaseUmbra);
        } else {
            setMappa(trovaLocation(idSpecchio).urlMinimappa);
        }
    }


    const pulsantiera = () => {
        if (abilitaComandi) {
            return (
                <div className="pulsantiera"
                    style={{
                        backgroundImage: `url('${CornicePulsantiera}')`,
                    }}>

                    {(permettiNavigazione && trovaTipologiaLocation(idPrimaCella) == 'xxx') ?
                        /* PULSANTE - Navigazione on/off */
                        <div title={navigaLocation ? "Disattiva navigazione della mappa" : "Attiva navigazione della mappa"}
                            className="pulsante-nav"
                            style={{
                                gridColumnStart: "2",
                                backgroundImage: `url('${NavigazioneIcona}'), url('${NavigazioneOmbra}')`,
                            }}
                            onClick={() => setNavigaLocation(!navigaLocation)}
                        >
                        </div>
                        :
                        (navigaLocation && trovaTipologiaLocation(idPrimaCella) != 'xxx') ?
                            /* PULSANTE - Torna-al-padre-delle-locations-visualizzate */
                            <div title="Torna alla vista precedente"
                                className="pulsante-nav"
                                style={{
                                    gridColumnStart: "2",
                                    backgroundImage: `url('${FrecciaIcona}'), url('${FrecciaOmbra}')`,
                                }}
                                onClick={() => tornaVistaPrecedente(idPrimaCella)}
                            >
                            </div>
                            :
                            null}


                    {permettiNavigazioneSpecchio ?
                        /* PULSANTE - Switcha a Specchio on/off */
                        <div title="Passa alla mappa Specchio"
                            className="pulsante-nav"
                            style={{
                                gridColumnStart: "3",
                                backgroundImage: `url('${SpecchioIcona}'), url('${SpecchioOmbra}')`,
                            }}
                            onClick={() => switchToLocsSpecchio(idPrimaCella)}
                        >
                        </div>
                        :
                        null}

                    {permettiIngrandimento ?
                        /* PULSANTE - Magnifier on/off */
                        <div title={magnifier ? "Disattiva ingrandimento" : "Attiva ingrandimento"}
                            className="pulsante-nav"
                            style={{
                                gridColumnStart: "4",
                                backgroundImage: `url('${IngrandimentoIcona}')`,
                            }}
                            onClick={() => setMagnifier(!magnifier)}
                        >
                        </div>
                        :
                        null}

                    {/* PULSANTE - Modal Info su utilizzo di Mappa e pulsanti on/off */}
                    <div title="Info"
                        className="pulsante-nav"
                        style={{
                            gridColumnStart: "5",
                            backgroundImage: `url('${InfoIcona}'), url('${InfoOmbra}')`,
                        }}
                        onClick={() => setInfo(!info)}>
                    </div>

                </div>
            )
        }
        return null
    }

    return (
        <div className="container-mappa"
            style={{ gridTemplateColumns: `${"auto " + dimensioneMappa + " auto"}`,
                     gridTemplateRows: `${"auto " + dimensioneMappa + " 5vmin"}` }}>
            <div className="modale modale-copertura" style={{ display: `${info ? 'grid' : "none"}` }}>
                <div className="modale modale-pergamena" style={{ backgroundImage: `url('${Pergamena}')` }}>
                    <div className="modale modale-contenuto">
                        <div className="modale modale-header">
                            <span onClick={() => setInfo(false)}>X</span>
                        </div>

                        <div className="modale-body">
                            <h6>
                                {locationSelezionata != null || locationSelezionata != undefined ?
                                    <>
                                        <label><b>Posizione</b> - <img src={Segnaposto} height="30" alt="..." /></label>
                                        {/* {console.log(sessionStorage.getItem('pgAttivo')==null?"NESSUN PG":"PG")} */}
                                        {sessionStorage.getItem('pgAttivo') == null ?
                                            <p>Questa icona evidenzia la location che è stata selezionata, o l'eventuale location all'interno della quale si trova quella selezionata.</p>
                                            :
                                            <p>Questa icona evidenzia la location in cui si trova il Personaggio.</p>
                                        }

                                        <hr />
                                    </>
                                    : null}

                                {permettiNavigazione ?
                                    <>
                                        <label><b>Navigazione</b> - <img src={NavigazioneIcona} height="30" alt="..." /></label>
                                        <p>Quando attivato, il tasto di Navigazione mostra la presenza di stanze interne alle location.
                                        Quelle location che possiedono stanze al loro interno, vengono evidenziate da contorni rossi. Clickando su di esse, è possibile accedere all'interno della location e vedere le relative location al suo interno.
                                        Una volta che si è entrati in una location, il pulsante di navigazione viene sostituito dal pulsante <img src={FrecciaIcona} height="30" alt="..." />, che permetterà di tornare alla location precedente.
                                    </p>
                                        <hr />
                                    </>
                                    : null}

                                {permettiNavigazioneSpecchio ?
                                    <>
                                        <label><b>L'Altro Lato</b> - <img src={SpecchioIcona} height="30" alt="..." /></label>
                                        <p>Quanto attivato, permette di navigare all'interno delle relative location-specchio.
                                    </p>
                                        <hr />
                                    </>
                                    : null}

                                {permettiIngrandimento ?
                                    <>
                                        <label><b>Ingrandimento</b> - <img src={IngrandimentoIcona} height="30" alt="..." /></label>
                                        <p>Quando attivato, rimuove la griglia dalla mappa visualizzata, impedendo qualsiasi tipo di navigazione, ma passando il cursore sull'immagine, mostrerà una minuatura ingrandita di dove si sta puntando il cursore.
                                    </p>
                                        <hr />
                                    </>
                                    : null}
                            </h6>
                        </div>

                    </div>
                </div>
            </div>

            {locationSelezionata != null || locationSelezionata != undefined ? onLocationSelezionataChange(locationSelezionata) : null}
            {grigliaMacromappa()}
            {pulsantiera()}
        </div>
    )

}

export default Macromappa2
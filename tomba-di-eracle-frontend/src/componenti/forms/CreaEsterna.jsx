import { useState } from "react";
import { SelezionaMeteo } from "./SelezionaMeteo";
import cardGame from '../../img/gameCard.png';
import cardGameUmbra from '../../img/gameCard_umbra.png'
import MacromappaBase from '../../img/macromappa.jpg'
import { arrayIdLocationEsterneDefinite, optionGroupLocationsPerTipoEMappa, trovaLocation } from "../utils/LocationUtils";


export const CreaEsterna = (props) => {

    const getListaOrdinata = () => {
        return JSON.parse(sessionStorage.getItem('allLocations')).sort(
            (a, b) => (a.id < b.id ? -1 : Number(a.id > b.id))
        );
    }
    return (
        <>
            <div className="input-group">
                <select name="locationId" id="locationId" className="form-select" onChange={props.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)", marginBottom: "1%" }}>
                    <option value={999}>Seleziona una delle posizioni ancora disponibili...</option>
                    {getListaOrdinata().map(loc =>
                        (loc.nome === '/' && loc.tipo === 'Reame') ?
                            <option value={loc.id} key={loc.id}>{loc.id}</option>
                            : null
                    )}
                </select>
            </div>
            <div className="row" style={{ backgroundColor: "transparent" }}>
                <div className="centrato col-6" >
                    <div className="input-group">
                        <input type="text" className="form-control" id="nome" placeholder="Nome" onChange={props.handleChange} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                    </div>
                    <div className="input-group">
                        <select name="ambiente" id="ambiente" className="form-select" onChange={props.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)", marginBottom: "1%" }}> <br /> <br />
                            <option value="">Seleziona un Ambiente</option>
                            <option value="Aperto">Aperto</option>
                            <option value="Chiuso">Chiuso</option>
                        </select>
                        <br />
                    </div>

                    <div className="input-group">
                        <input type="text" className="form-control" id="urlImgGiorno" onChange={props.handleChange} placeholder='Url Immagine Giorno' style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                    </div>

                    <div className="input-group">
                        <input type="text" className="form-control" id="urlImgNotte" onChange={props.handleChange} placeholder='Url Immagine Notte' style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                    </div>

                    <div className="input-group">
                        <input type="text" className="form-control" id="urlAudio" onChange={props.handleChange} placeholder='Url Audio' style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                    </div>

                    <div className="input-group">
                        <input type="text" className="form-control" id="chiave" onChange={props.handleChange} placeholder="Chiave d'Accesso" maxlength="5" style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                    </div>
                    <div className="input-group">
                        <input type="text" className="form-control" id="urlImgGiornoUmbra" onChange={props.handleChange} placeholder='Url immagine Giorno Umbra' style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                    </div>

                    <div className="input-group">
                        <input type="text" className="form-control" id="urlImgNotteUmbra" onChange={props.handleChange} placeholder='Url Immagine Notte Umbra' style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                    </div>

                    <div className="input-group">
                        <input type="text" className="form-control" id="urlAudioUmbra" onChange={props.handleChange} placeholder='Url Audio Umbra' style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                    </div>
                </div>
                <div className="centrato col-6">
                    <div className="row" style={{ height: "50%" }}>
                        <div className="navigazione-sezione col-6" style={{ width: "50%" }} title="Anteprima URL Giorno">
                            <div className="navigazione-area" >
                                <div className="navigazione-immagine" style={{ backgroundImage: `url('${props.state.urlImgGiorno}')` }}></div>
                                <img src={cardGame} style={{ position: "relative", zIndex: "1", width: "100%", height: "100%" }} alt="" />
                            </div>
                        </div>
                        <div className="navigazione-sezione col-6" style={{ width: "50%" }} title="Anteprima URL Notte">
                            <div className="navigazione-area" >
                                <div className="navigazione-immagine" style={{ backgroundImage: `url('${props.state.urlImgNotte}')` }}></div>
                                <img src={cardGame} style={{ position: "relative", zIndex: "1", width: "100%", height: "100%" }} alt="" />
                            </div>
                        </div>
                    </div>

                    <div className="row" style={{ height: "50%" }}>
                        <div className="navigazione-sezione col-6" style={{ width: "50%" }} title="Anteprima URL Umbra Giorno">
                            <div className="navigazione-area" >
                                <div className="navigazione-immagine" style={{ backgroundImage: `url('${props.state.urlImgGiornoUmbra}')` }}></div>
                                <img src={cardGameUmbra} style={{ position: "relative", zIndex: "1", width: "100%", height: "100%" }} alt="" />
                            </div>
                        </div>
                        <div className="navigazione-sezione col-6" style={{ width: "50%" }} title="Anteprima URL Umbra Notte">
                            <div className="navigazione-area" >
                                <div className="navigazione-immagine" style={{ backgroundImage: `url('${props.state.urlImgNotteUmbra}')` }}></div>
                                <img src={cardGameUmbra} style={{ position: "relative", zIndex: "1", width: "100%", height: "100%" }} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SelezionaMeteo idSelect="meteo" handleChange={props.handleChange} />
        </>
    )
}

export const GrigliaLocEsterne = (props) => {

    const grigliaMacromappa = () => {
        var celleGriglia = [];

        for (let i = 1; i <= 12; i++) {
            for (let j = 1; j <= 12; j++) {
                celleGriglia.push(<div
                    style={{
                        border: "1px solid black",
                        gridColumnStart: { j },
                        gridRowStart: { i }
                    }}
                >
                </div>)
            }
        }

        return celleGriglia;
    }

    const rigaVuota = (row) => {
        var gridVuota = [];

        for (let i = 1; i <= 16; i++)
            gridVuota.push(
                <div
                    style={{
                        gridColumnStart: { i },
                        gridRowStart: row
                    }}
                >

                </div>
            )
        return gridVuota;
    }

    const primaEultimaRiga = (row) => {
        var gridRiga = [
            <div style={{ gridColumnStart: "1", gridRowStart: row }} ></div>,
            <div style={{ gridColumnStart: "2", gridRowStart: row }} ></div>,
            <div style={{ gridColumnStart: "15", gridRowStart: row }} ></div>,
            <div style={{ gridColumnStart: "16", gridRowStart: row }} ></div>
        ];

        for (let i = 3; i <= 14; i++) {
            var id = row == 1 ? 286 + i : 327 - i;
            gridRiga.push(
                <div
                    // title={arrayIdLocationEsterneDefinite().includes(id) ? "Location Esterna "+id+" già occupata" : id}
                    title={arrayIdLocationEsterneDefinite().includes(id) ? "Location Occupata: \n("+id+") "+trovaLocation(id).nome : id}

                    id={id + "-esterna"}
                    style={{
                        border: `${props.idLocSelezionata == id ? "1px solid red" : "1px solid black"}`,
                        gridColumnStart: `${i}`,
                        gridRowStart: row,
                        backgroundColor: `${arrayIdLocationEsterneDefinite().includes(id) ? "rgba(255, 0, 0, 0.4)" : "#696969"}`
                    }}
                >
                </div>
            )
        }

        return gridRiga;
    }

    const rigeCentrali = (row) => {
        var gridRigaCentrale = [
            <div title={339 - row}
                id={339 - row + "-esterna"}
                style={{
                    border: `${props.idLocSelezionata == (339-row) ? "1px solid red" : "1px solid black"}`,
                    gridColumnStart: "1",
                    gridRowStart: row,
                    backgroundColor: `${arrayIdLocationEsterneDefinite().includes(339 - row) ? "rgba(255, 0, 0, 0.4)" : "#696969"}`
                }} >

            </div>,
            <div style={{ gridColumnStart: "2", gridRowStart: row }} ></div>,
            <div style={{ gridColumnStart: "15", gridRowStart: row }} ></div>,
            <div title={298 + row}
                id={298 + row + "-esterna"}
                style={{
                    border: `${props.idLocSelezionata == (298+row) ? "1px solid red" : "1px solid black"}`,
                    gridColumnStart: "16",
                    gridRowStart: row,
                    backgroundColor: `${arrayIdLocationEsterneDefinite().includes(298+row) ? "rgba(255, 0, 0, 0.4)" : "#696969"}`
                }} >

            </div>
        ];
        return gridRigaCentrale;
    }



    return (
        <div
            style={{
                height: "100%",
                width: "100%",
                gridColumnStart: "2",
                gridRowStart: "2",
                display: "grid",
                gridTemplateColumns: "auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto",
                gridTemplateRows: "auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto auto"
            }}>

            {primaEultimaRiga(1)}

            {rigaVuota(2)}

            {rigeCentrali(3)}
            {rigeCentrali(4)}
            {rigeCentrali(5)}
            {rigeCentrali(6)}
            {rigeCentrali(7)}
            {rigeCentrali(8)}
            {rigeCentrali(9)}
            {rigeCentrali(10)}
            {rigeCentrali(11)}
            {rigeCentrali(12)}
            {rigeCentrali(13)}
            {rigeCentrali(14)}

            {rigaVuota(15)}

            {primaEultimaRiga(16)}

            <div
                style={{
                    gridRowStart: "3",
                    gridRowEnd: "15",
                    gridColumnStart: "3",
                    gridColumnEnd: "15",
                    zIndex: "2",
                    backgroundColor: "#696969",
                    display: "grid",
                    gridTemplateColumns: "auto auto auto auto auto auto auto auto auto auto auto auto",
                    gridTemplateRows: "auto auto auto auto auto auto auto auto auto auto auto auto",
                    backgroundImage: `url('${MacromappaBase}')`,
                    backgroundSize: "contain",
                    backgroundPosition: "center center",
                    backgroundRepeat: "no-repeat"
                }}>

                {grigliaMacromappa()}
            </div>

        </div>
    )
}
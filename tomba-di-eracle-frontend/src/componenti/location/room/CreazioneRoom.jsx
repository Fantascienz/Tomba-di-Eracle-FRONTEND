import { useState } from "react";
import { useHistory } from "react-router";
import RoomService from "../../../servizi/RoomService";
import Footer from "../../layout/Footer"
import Header from "../../layout/Header";
import { TitoloPagina } from "../../layout/TitoloPagina";
import MinimappaRegolabile from "../MinimappaReagolabile";
import Mappa from '../../../img/macromappa.jpg'
import Macromappa2 from "../Macromappa2";
import { trovaAlberoLocPadri, trovaLocation, trovaLocPadre, trovaLocsFiglie } from "../../utils/LocationUtils";


const CreazioneRoom = () => {

    const [superLoc, setSuperLoc] = useState(0)
    const [colonne, setColonne] = useState(0)
    const [locationReame, setMappaReame] = useState('')
    const [locationUmbra, setMappaUmbra] = useState('')

    const history = useHistory();
    const allLocations = JSON.parse(sessionStorage.getItem('allLocations'));

    const getListaSuperLoc = () => {
        let superLoc = [];
        for (let i = 0; i < allLocations.length; i++) {
            if (allLocations[i].nome !== '/') {
                if ((JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin' || JSON.parse(sessionStorage.getItem('utente')).id === allLocations[i].id) && !allLocations[i].room) {
                    superLoc.push(JSON.parse(sessionStorage.getItem('allLocations'))[i])
                }
            }
        }
        return superLoc;
    }

    const renderOptions = () => {
        let location = {};
        for (let i = 0; i < allLocations.length; i++) {
            if (allLocations[i].id == superLoc) {
                location = allLocations[i]
            }
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
                <>
                    <option value={1}>1 x 1</option>
                </>
            )
        }
        if (location.mappa === 'Stanza') {
            if (location.tipo === 'Reame') {
                return <option value={0}>Questa location non può avere sotto-location!</option>
            }
        }
    }

    const getSuperLocation = () => {
        for (let i = 0; i < allLocations.length; i++) {
            if (allLocations[i].id == superLoc) {
                return allLocations[i]
            }
        }
    }

    const getSuperLocationUmbra = () => {
        const allLocations2 = JSON.parse(sessionStorage.getItem('allLocations'));

        const direzioniEIdETipoLocations = []
        for (let i = 0; i < allLocations2.length; i++) {
            const oggettoLocation={
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

    // const grigliaMacromappa = (cellePerRiga, idIniziale, immagineSfondoMappa) => {

    //     var columns = cellePerRiga;
    //     var rows = cellePerRiga;
    //     var celleGriglia = []
    //     var gridTemplateColumnsN = ""
    //     var gridTemplateRowsN = ""
    //     var idIniziale = idIniziale

    //     for (let i = 1; i <= rows; i++) {
    //         for (let j = 1; j <= columns; j++) {
    //             let id = idIniziale++
    //             celleGriglia.push(
    //                 <div title={id} 
    //                     style={{
    //                     border: ` ${id==superLoc ? "2px solid red": "1px solid black"}`,
    //                     gridColumnStart: `${j}`,
    //                     gridRowStart: `${i}`
    //                 }}
    //                 >

    //                 </div>
    //             )
    //         }
    //     }


    //     for (let c = 1; c <= columns; c++) {
    //         gridTemplateColumnsN = gridTemplateColumnsN + "auto "
    //     }

    //     for (let r = 1; r <= rows; r++) {
    //         gridTemplateRowsN = gridTemplateRowsN + "auto "
    //     }

    //     return (
    //         <div style={{
    //             backgroundColor: "red",
    //             gridColumnStart: "2",
    //             gridRowStart: "2",
    //             display: "grid",
    //             gridTemplateColumns: `${gridTemplateColumnsN}`,
    //             gridTemplateRows: `${gridTemplateRowsN}`,
    //             backgroundImage: `url('${immagineSfondoMappa}')`,
    //             backgroundRepeat: "no-repeat",
    //             backgroundSize: "100% 99.8%"
    //         }}>
    //             {celleGriglia}
    //         </div>
    //     )
    // }

    return (
        <>
            <Header />
            <div className="corpoComponente" style={{ overflowY: "auto", overflowX: "hidden" }}>

                <TitoloPagina titolo="Creazione Room" fontSize="8vh" />

                <div style={{ display: "grid", gridTemplateColumns: "40% 60%" }}>

                    {/* LATO SINISTRO */}
                    <div style={{
                        padding: "5px",
                        gridColumnStart: "1",
                        display: "grid",
                        gridTemplateColumns: "auto 60vh auto",
                        gridTemplateRows: "auto 60vh auto"
                    }}>
                        {/* MACROMAPPA */}
                        {/* <div style={{
                            gridColumnStart: "2",
                            gridRowStart: "2"
                        }}>
                            <Macromappa idLocation={superLoc} pxDimensioniMappa="500" tipoLocation={getTipoSuperlocation()} />
                        </div> */}

                        {/* {grigliaMacromappa(12, 1, Mappa)} */}

                        <Macromappa2 locationSelezionata={superLoc} navigaLocation />

                        {console.log("LOCATION", trovaLocsFiglie(1002))}
                        {console.log("ALBERO", trovaAlberoLocPadri(2))}



                    </div>

                    {/* LATO DESTRO */}
                    <div style={{
                        gridColumnStart: "2",
                        display: "grid",
                        gridTemplateRows: "auto auto auto auto",
                        padding: "2px"
                    }}>

                        {/* SELECT Super Location */}
                        <div style={{ gridRowStart: "1", padding: "2px" }}>
                            <select className="form-select" name="super" id="super" onChange={(e) => setSuperLoc(e.target.value)} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)" }}>
                                <option value={0}>Seleziona la Location all'interno della quale creare la Room</option>
                                {getListaSuperLoc().map(superLoc =>
                                    <option value={superLoc.id} key={superLoc.id}>({superLoc.id} - {superLoc.nome} - {superLoc.tipo})</option>
                                )}
                            </select>
                        </div>

                        {/* SELECT Griglia */}
                        <div style={{ gridRowStart: "2", padding: "2px" }}>
                            <select className="form-select" name="colonne" id="colonne" onChange={(e) => setColonne(e.target.value)} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)" }}>
                                <option value={0}>Seleziona il numero di Stanze in cui si vuole dividere la Room</option>
                                {renderOptions()}
                            </select>
                        </div>

                        <div style={{
                            padding: "2px",
                            gridRowStart: "3",
                            display: "grid",
                            gridTemplateRows: "auto auto",
                            gridTemplateColumns: "auto auto auto"
                        }}>

                            {/* INPUT Url Minimappa Reame */}
                            <div style={{
                                padding: "2px",
                                gridRowStart: "1",
                                gridColumnStart: "1"
                            }}>
                                {getTipoSuperlocation() != "Umbra" ?
                                    <input type="text" placeholder="Url Minimappa Reame" onChange={(e) => setMappaReame(e.target.value)} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} />
                                    :
                                    null
                                }
                            </div>

                            {/* MINIMAPPA Reame */}
                            <div style={{
                                padding: "2px",
                                gridRowStart: "2",
                                gridColumnStart: "1",
                                display: "grid",
                                gridTemplateColumns: "auto 50vh auto"
                            }}>
                                <div style={{ gridColumnStart: "2" }}>
                                    {getTipoSuperlocation() != "Umbra" ?
                                        <MinimappaRegolabile idLocation={superLoc} pxDimensioniMappa="50" immagineMinimappa={locationReame} cellePerRiga={colonne} lenteDisplay="none" />
                                        :
                                        <p>La Location selezionata è di tipo <b>Umbra</b>, quindi non ha una location Reame creabile</p>
                                    }
                                </div>
                            </div>

                            {/* INPUT Url Minimappa Umbra */}
                            <div style={{
                                padding: "2px",
                                gridRowStart: "1",
                                gridColumnStart: "3"
                            }}>
                                <input type="text" placeholder="Url Minimappa Umbra" onChange={(e) => setMappaUmbra(e.target.value)} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} />

                            </div>

                            {/* MINIMAPPA Umbra */}
                            <div style={{
                                padding: "2px",
                                gridRowStart: "2",
                                gridColumnStart: "3",
                                display: "grid",
                                gridTemplateColumns: "auto 50vh auto"
                            }}>
                                <div style={{ gridColumnStart: "2" }}>
                                    <MinimappaRegolabile idLocation={getSuperLocationUmbra()} pxDimensioniMappa="50" immagineMinimappa={locationUmbra} cellePerRiga={colonne} lenteDisplay="none" />
                                </div>
                            </div>

                        </div>

                        {/* BOTTONE invio */}
                        <div style={{
                            padding: "2px",
                            gridRowStart: "4",
                        }}>
                            <button className="btn btn-dark" onClick={() => toImpostaRoom()}>Crea Room</button>
                        </div>

                    </div>

                </div>

            </div>
            < Footer />

        </>
    )
}

export default CreazioneRoom;
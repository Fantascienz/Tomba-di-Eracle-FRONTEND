import { useState } from "react";
import { useHistory } from "react-router";
import RoomService from "../../../servizi/RoomService";
import Footer from "../../layout/Footer"
import Header from "../../layout/Header";
import { TitoloPagina } from "../../layout/TitoloPagina";
import MinimappaRegolabile from "../MinimappaReagolabile";


const CreazioneRoom = () => {

    const [superLoc, setSuperLoc] = useState(0)
    const [colonne, setColonne] = useState(0)
    const [mappaReame, setMappaReame] = useState('')
    const [mappaUmbra, setMappaUmbra] = useState('')

    const history = useHistory();
    const allLocations = JSON.parse(sessionStorage.getItem('allLocations'));

    const getListaSuperLoc = () => {
        let superLoc = [];
        for (let i = 0; i < allLocations.length; i++) {
            if (allLocations[i].nome !== '/') {
                if ((JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin' || JSON.parse(sessionStorage.getItem('utente')).id === allLocations[i].id) && !allLocations[i].room && allLocations[i].tipo === 'Reame' ) {
                    superLoc.push(JSON.parse(sessionStorage.getItem('allLocations'))[i])
                }
            }
        }
        return superLoc;
    }

    const toImpostaRoom = () => {
        let room = {
            superLocation: superLoc,
            colonne: colonne,
            mappaReame: mappaReame,
            mappaUmbra: mappaUmbra
        }
        if (RoomService.validaCreazionRoom(room)) {
            sessionStorage.setItem('roomTemplate', JSON.stringify(room));
            history.push('/riempimentoRoom')
        }
    }

    return (
        <>
            <Header />
            <div className="corpoComponente">
                <TitoloPagina titolo="Crazione Room" />
                <div className="row no-gutters">
                    <div className="col-md-6">
                        <select className="form-select" name="super" id="super" onChange={(e) => setSuperLoc(e.target.value)} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)" }}>
                            <option value={0}>Seleziona Location Padre</option>
                            {getListaSuperLoc().map(superLoc =>
                                <option value={superLoc.id} key={superLoc.id}>({superLoc.id} - {superLoc.nome})</option>
                            )}
                        </select>
                        <select className="form-select" name="colonne" id="colonne" onChange={(e) => setColonne(e.target.value)} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)" }}>
                            <option value={0}>Seleziona Griglia Minimappa</option>
                            <option value={3}>3 x 3</option>
                            <option value={2}>2 x 2</option>
                            <option value={1}>1 x 1</option>
                        </select>
                        <input type="text" placeholder="Url Minimappa Reame" onChange={(e) => setMappaReame(e.target.value)} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} />
                        <br />
                        <input type="text" placeholder="Url Minimappa Umbra" onChange={(e) => setMappaUmbra(e.target.value)} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} />
                        <br />
                        <button className="btn btn-dark" onClick={() => toImpostaRoom()}>Crea Room</button>
                    </div>
                    <div className="col-md-6">
                        <MinimappaRegolabile pxDimensioniMappa="400" immagineMinimappa={mappaReame} cellePerRiga={colonne} lenteDisplay="none" />
                        <br />
                        <MinimappaRegolabile pxDimensioniMappa="400" immagineMinimappa={mappaUmbra} cellePerRiga={colonne} lenteDisplay="none" />
                    </div>
                </div>

            </div>
            < Footer />

        </>
    )
}

export default CreazioneRoom;
import { useState } from "react";
import Footer from "../layout/Footer"
import Header from "../layout/Header";
import { TitoloPagina } from "../layout/TitoloPagina";


const CreazioneRoom = () => {

    const [superLoc, setSuperLoc] = useState(0)
    const [colonne, setColonne] = useState(0)
    const [mappaReame, setMappaReame] = useState('')
    const [mappaUmbra, setMappaUmbra] = useState('')

    const getListaSuperLoc = () => {
        let superLoc = [];
        for (let i = 288; i <= 335; i++) {
            if (JSON.parse(sessionStorage.getItem('allLocations'))[i].nome !== '/') {
                if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin' || JSON.parse(sessionStorage.getItem('utente')).id === JSON.parse(sessionStorage.getItem('allLocations'))[i].id) {
                    superLoc.push(JSON.parse(sessionStorage.getItem('allLocations'))[i])
                }
            }
        }
        return superLoc;
    }

    return (
        <>
            <Header />
            <div className="corpoComponente">
                <TitoloPagina titolo="Crazione Room" />
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
                <div className="input-group">
                    <input type="text" placeholder="Url Minimappa Reame" onChange={(e) => setMappaReame(e.target.value)} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} />
                    <br />
                    <input type="text" placeholder="Url Minimappa Umbra" onChange={(e) => setMappaUmbra(e.target.value)} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} />
                </div>
            </div>
            < Footer />

        </>
    )
}

export default CreazioneRoom;
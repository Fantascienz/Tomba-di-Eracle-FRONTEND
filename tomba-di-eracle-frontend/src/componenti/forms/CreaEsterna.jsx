import { useState } from "react";
import { SelezionaMeteo } from "./SelezionaMeteo";
import cardGame from '../../img/gameCard.png';
import cardGameUmbra from '../../img/gameCard_umbra.png'


const CreaEsterna = (props) => {

    const getListaOrdinata = () => {
        return JSON.parse(sessionStorage.getItem('allLocations')).sort(
            (a, b) => (a.id < b.id ? -1 : Number(a.id > b.id))
        );
    }
    return (
        <>
            <div className="input-group">
                <select name="locationId" id="locationId" className="form-select" onChange={props.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)", marginBottom: "1%" }}>
                    <option value={999}>Seleziona Posizione Location</option>
                    {getListaOrdinata().map(loc =>
                        (loc.nome === '/' && loc.tipo === 'Reame') ?
                            <option value={loc.id} key={loc.id}>{loc.id}</option>
                            : null
                    )}
                </select>
            </div>
            <div className="row" style={{ backgroundColor: "transparent" }}>
                <div className="centrato col-3" >
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

export default CreaEsterna;
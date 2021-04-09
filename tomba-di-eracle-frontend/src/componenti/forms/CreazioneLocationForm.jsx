import React, { Component } from 'react';

class CreazioneLocationForm extends Component {

    isStanza = () => {
        if (!this.props.stanza) {

            let listaLocationOrdinata = JSON.parse(sessionStorage.getItem('allLocations')).sort(
                (a, b) => (a.id < b.id ? -1 : Number(a.id > b.id))
            );

            const renderLista = (location, mappa) => {
                if (location.tipo === 'Reame' && location.mappa === mappa && (location.direzioni.idLocationNord == null || location.direzioni.idLocationEst == null || location.direzioni.idLocationSud == null || location.direzioni.idLocationOvest == null)) {
                    return <option value={location.id} key={location.id}>ID: {location.id} - {location.nome} </option>
                }

            }

            var opzioni = []

            const renderDirezioni = (idIngresso) => {

                let lista = JSON.parse(sessionStorage.getItem('allLocations'))

                if (this.props.ingresso !== '') {
                    for (let i = 0; i < lista.length; i++) {
                        if (lista[i].id == idIngresso) {
                            if (lista[i].direzioni.idLocationNord == null && lista[i].tipo === 'Reame') {
                                opzioni.push({
                                    html: <option value="nord" >NORD</option>
                                })
                            }
                            if (lista[i].direzioni.idLocationEst == null && lista[i].tipo === 'Reame') {
                                opzioni.push({
                                    html: <option value="est" >EST</option>
                                })
                            }
                            if (lista[i].direzioni.idLocationSud == null && lista[i].tipo === 'Reame') {
                                opzioni.push({
                                    html: <option value="sud" >SUD</option>
                                })
                            }
                            if (lista[i].direzioni.idLocationOvest == null && lista[i].tipo === 'Reame') {
                                opzioni.push({
                                    html: <option value="ovest" >OVEST</option>
                                })
                            }
                            return (
                                <select name="direzioneIngresso" id="direzioneIngresso" className="form-select" onChange={this.props.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)", marginBottom: "1%" }}>
                                    <option value="">Seleziona Direzione Ingresso</option>
                                    {opzioni.map(opz => opz.html)}
                                </select>

                            )
                        }

                    }
                }
            }

            return (
                <React.Fragment>
                    <div className="input-group">
                        <select name="locationIngresso" id="locationIngresso" className="form-select" onChange={this.props.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)", marginBottom: "1%" }}>
                            <option value="">Seleziona Location Ingresso</option>
                            <option value="" style={{ fontWeight: 'bold' }}>--- Location Esterne ---</option>
                            {listaLocationOrdinata.map(location =>
                                renderLista(location, 'Esterna')
                            )}
                            <option value="" style={{ fontWeight: 'bold' }}> --- Macro Locations --- </option>
                            {listaLocationOrdinata.map(location =>
                                renderLista(location, 'Macro')
                            )}

                        </select>
                        {renderDirezioni(this.props.ingresso)}
                    </div>
                </React.Fragment>
            )
        }
    }

    render() {
        return (
            <div className="centrato" >
                <div className="input-group">
                    <input type="text" className="form-control" id="nome" placeholder="Nome" onChange={this.props.handleChange} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                </div>

                <div className="input-group">
                    <input type="text" className="form-control" id="ambiente" placeholder="Ambiente" onChange={this.props.handleChange} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                </div>

                <div className="input-group">
                    <input type="text" className="form-control" id="urlImgGiorno" placeholder="URL Immagine Giorno" onChange={this.props.handleChange} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                </div>

                <div className="input-group">
                    <input type="text" className="form-control" id="urlImgNotte" placeholder="URL Immagine Notte" onChange={this.props.handleChange} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                </div>

                <div className="input-group">
                    <input type="text" className="form-control" id="urlAudio" placeholder="URL Audio" onChange={this.props.handleChange} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                </div>

                <div className="input-group">
                    <input type="text" className="form-control" id="chiave" placeholder="Chiave d'accesso" onChange={this.props.handleChange} maxlength="5" style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                </div>

                <div className="input-group">
                    <input type="text" className="form-control" id="urlImgGiornoUmbra" placeholder="URL Immagine Giorno Umbra" onChange={this.props.handleChange} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                </div>

                <div className="input-group">
                    <input type="text" className="form-control" id="urlImgNotteUmbra" placeholder="URL Immagine Notte Umbra" onChange={this.props.handleChange} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                </div>

                <div className="input-group">
                    <input type="text" className="form-control" id="urlAudioUmbra" placeholder="URL Audio Umbra" onChange={this.props.handleChange} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                </div>
                {this.isStanza()}
            </div>
        );
    }
}

export default CreazioneLocationForm;
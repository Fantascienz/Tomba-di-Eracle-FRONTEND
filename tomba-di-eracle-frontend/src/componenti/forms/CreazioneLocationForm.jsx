import React, { Component } from 'react';
import { SelezionaMeteo } from './SelezionaMeteo';
import cardGame from '../../img/gameCard.png';
import cardGameUmbra from '../../img/gameCard_umbra.png'



class CreazioneLocationForm extends Component {

    state = this.props.formState;
    placeholders = this.props.formPlaceholders;

    getListaOrdinata = () => {
        return JSON.parse(sessionStorage.getItem('allLocations')).sort(
            (a, b) => (a.id < b.id ? -1 : Number(a.id > b.id))
        );
    }

    isStanza = () => {
        if (!this.props.stanza) {

            // let listaLocationOrdinata = JSON.parse(sessionStorage.getItem('allLocations')).sort(
            //     (a, b) => (a.id < b.id ? -1 : Number(a.id > b.id))
            // );

            // const renderLista = (location, mappa) => {
            //     if (location.tipo === 'Reame' && location.mappa === mappa && (location.direzioni.idLocationNord == null || location.direzioni.idLocationEst == null || location.direzioni.idLocationSud == null || location.direzioni.idLocationOvest == null)) {
            //         return <option value={location.id} key={location.id}>ID: {location.id} - {location.nome} </option>
            //     }

            // }

            // var opzioni = []

            // const renderDirezioni = (idIngresso) => {

            //     let lista = JSON.parse(sessionStorage.getItem('allLocations'))

            //     if (this.props.ingresso !== '') {
            //         for (let i = 0; i < lista.length; i++) {
            //             // eslint-disable-next-line
            //             if (lista[i].id == idIngresso) {
            //                 if (lista[i].direzioni.idLocationNord == null && lista[i].tipo === 'Reame') {
            //                     opzioni.push({
            //                         html: <option value="nord" >NORD</option>
            //                     })
            //                 }
            //                 if (lista[i].direzioni.idLocationEst == null && lista[i].tipo === 'Reame') {
            //                     opzioni.push({
            //                         html: <option value="est" >EST</option>
            //                     })
            //                 }
            //                 if (lista[i].direzioni.idLocationSud == null && lista[i].tipo === 'Reame') {
            //                     opzioni.push({
            //                         html: <option value="sud" >SUD</option>
            //                     })
            //                 }
            //                 if (lista[i].direzioni.idLocationOvest == null && lista[i].tipo === 'Reame') {
            //                     opzioni.push({
            //                         html: <option value="ovest" >OVEST</option>
            //                     })
            //                 }
            //                 return (
            //                     <select name="direzioneIngresso" id="direzioneIngresso" className="form-select" style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)", marginBottom: "1%" }}>
            //                         <option value="">Seleziona Direzione Ingresso</option>
            //                         {opzioni.map(opz => opz.html)}
            //                     </select>
            //                 )
            //             }

            //         }
            //     }
            // }

            return (
                <React.Fragment>
                    <div className="input-group">
                        <select name="locationId" id="locationId" className="form-select" style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)", marginBottom: "1%" }}>
                            <option value={999}>Seleziona Posizione Location</option>
                            {this.getListaOrdinata().map(loc =>
                                (loc.nome === '/' && loc.tipo === 'Reame') ?
                                    <option value={loc.id} key={loc.id}>{loc.id}</option>
                                    : null
                            )}
                        </select>
                    </div>
                    <SelezionaMeteo idSelect="meteo" handleChange={this.props.handleChange} />
                </React.Fragment>
            )
        }
    }

    tipoLocation() {
        var allLocation = this.getListaOrdinata();

        for (let i = 0; i < allLocation.length; i++) {
            if (allLocation[i].id == this.props.idLocation) {
                if (allLocation[i].tipo.includes('Umbra')) {
                    return 'Umbra'
                }
                return 'Normale'
            }
        }
    }

    render() {

        return (
            <div className="row" style={{ backgroundColor: "transparent" }}>
                <div className="centrato col-6" >
                    <div className="input-group">
                        <input type="text" className="form-control" id="nome" placeholder={ this.props.formPlaceholders != undefined ? 'Nome: ' + this.props.formPlaceholders.location.nome : 'Nome' } onChange={(e) => this.props.changeHandler[0](e.target.value)} value={this.props.formState.nome} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                    </div>
                    <div className="input-group">
                        <select name="ambiente" id="ambiente" className="form-select" placeholder={ this.props.formPlaceholders != undefined ? 'Ambiente: ' + this.props.formPlaceholders.location.ambiente : 'Ambiente' } value={this.props.formState.ambiente} onChange={(e) => this.props.changeHandler[1](e.target.value)} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)", marginBottom: "1%" }}>
                            <option value="">{this.props.formPlaceholders != undefined ? 'Ambiente: ' + this.props.formPlaceholders.location.ambiente : 'Seleziona un Ambiente' }</option>
                            <option value="Aperto">Aperto</option>
                            <option value="Chiuso">Chiuso</option>
                        </select>
                        <br />
                    </div>

                    {this.tipoLocation() == 'Umbra' ?
                        null
                        :
                        <>
                            <div className="input-group">
                                <input type="text" className="form-control" id="urlImgGiorno" placeholder={ this.props.formPlaceholders != undefined ? 'Url Immagine Giorno: ' + this.props.formPlaceholders.location.urlImgGiorno : 'Url Immagine Giorno' } value={this.props.formState.urlImgGiorno} onChange={(e) => this.props.changeHandler[2](e.target.value)} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                            </div>

                            <div className="input-group">
                                <input type="text" className="form-control" id="urlImgNotte" placeholder={ this.props.formPlaceholders != undefined ? 'Url Immagine Notte: ' + this.props.formPlaceholders.location.urlImgNotte : 'Url Immagine Notte' } value={this.props.formState.urlImgNotte} onChange={(e) => this.props.changeHandler[3](e.target.value)} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                            </div>

                            <div className="input-group">
                                <input type="text" className="form-control" id="urlAudio" placeholder={ this.props.formPlaceholders != undefined ? 'Url Audio: ' + this.props.formPlaceholders.location.urlAudio : 'Url Audio' } value={this.props.formState.urlAudio} onChange={(e) => this.props.changeHandler[4](e.target.value)} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                            </div>

                            <div className="input-group">
                                <input type="text" className="form-control" id="chiave" placeholder={ this.props.formPlaceholders != undefined ? 'Chiave d\' Accesso: ' + this.props.formPlaceholders.location.chiave : 'Chiave d\'Accesso' } value={this.props.formState.chiave} onChange={(e) => this.props.changeHandler[5](e.target.value)} maxlength="5" style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                            </div>
                            <p>Applica la chiave all'umbra <input type="checkbox" id="chiave-umbra" checked={this.props.chiaveUmbra} onClick={() => this.props.changeHandler[9](!this.props.chiaveUmbra)}/></p>
                        </>
                    }
                    <div className="input-group">
                        <input type="text" className="form-control" id="urlImgGiornoUmbra" placeholder={ this.props.formPlaceholders != undefined ? 'Url Immagine Giorno Umbra: ' + this.props.formPlaceholders.locationUmbra.urlImgGiorno : 'Url immagine Giorno Umbra' } value={this.props.formState.urlImgGiornoUmbra} onChange={(e) => this.props.changeHandler[6](e.target.value)} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                    </div>

                    <div className="input-group">
                        <input type="text" className="form-control" id="urlImgNotteUmbra" placeholder={ this.props.formPlaceholders != undefined ? 'Url Immagine Notte Umbra: ' + this.props.formPlaceholders.locationUmbra.urlImgNotte : 'Url Immagine Notte Umbra' } value={this.props.formState.urlImgNotteUmbra} onChange={(e) => this.props.changeHandler[7](e.target.value)} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                    </div>

                    <div className="input-group">
                        <input type="text" className="form-control" id="urlAudioUmbra" placeholder={ this.props.formPlaceholders != undefined ? 'Url Audio Umbra: ' + this.props.formPlaceholders.locationUmbra.urlAudio : 'Url Audio Umbra' } value={this.props.formState.urlAudioUmbra} onChange={(e) => this.props.changeHandler[8](e.target.value)} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
                    </div>
                    {this.isStanza()}
                </div>


                <div className="col-6" style={{ height: "auto" }}>
                    {this.tipoLocation() == 'Umbra' ?
                        <>
                            <div className="row" style={{ height: "100%" }}>
                                <div className="navigazione-sezione col-6" style={{ width: "50%" }} title="Anteprima URL Umbra Giorno">
                                    <div className="navigazione-area" >
                                        <div className="navigazione-immagine" style={{ backgroundImage: `url('${this.props.anteprimaGiornoUmbra}')` }}></div>
                                        <img src={cardGameUmbra} style={{ position: "relative", zIndex: "1", width: "100%", height: "100%" }} alt="" />
                                    </div>
                                </div>
                                <div className="navigazione-sezione col-6" style={{ width: "50%" }} title="Anteprima URL Umbra Notte">
                                    <div className="navigazione-area" >
                                        <div className="navigazione-immagine" style={{ backgroundImage: `url('${this.props.anteprimaNotteUmbra}')` }}></div>
                                        <img src={cardGameUmbra} style={{ position: "relative", zIndex: "1", width: "100%", height: "100%" }} alt="" />
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className="row" style={{ height: "50%" }}>
                                <div className="navigazione-sezione col-6" style={{ width: "50%" }} title="Anteprima URL Giorno">
                                    <div className="navigazione-area" >
                                        <div className="navigazione-immagine" style={{ backgroundImage: `url('${this.props.anteprimaGiorno}')` }}></div>
                                        <img src={cardGame} style={{ position: "relative", zIndex: "1", width: "100%", height: "100%" }} alt="" />
                                    </div>
                                </div>
                                <div className="navigazione-sezione col-6" style={{ width: "50%" }} title="Anteprima URL Notte">
                                    <div className="navigazione-area" >
                                        <div className="navigazione-immagine" style={{ backgroundImage: `url('${this.props.anteprimaNotte}')` }}></div>
                                        <img src={cardGame} style={{ position: "relative", zIndex: "1", width: "100%", height: "100%" }} alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ height: "50%" }}>
                                <div className="navigazione-sezione col-6" style={{ width: "50%" }} title="Anteprima URL Umbra Giorno">
                                    <div className="navigazione-area" >
                                        <div className="navigazione-immagine" style={{ backgroundImage: `url('${this.props.anteprimaGiornoUmbra}')` }}></div>
                                        <img src={cardGameUmbra} style={{ position: "relative", zIndex: "1", width: "100%", height: "100%" }} alt="" />
                                    </div>
                                </div>
                                <div className="navigazione-sezione col-6" style={{ width: "50%" }} title="Anteprima URL Umbra Notte">
                                    <div className="navigazione-area" >
                                        <div className="navigazione-immagine" style={{ backgroundImage: `url('${this.props.anteprimaNotteUmbra}')` }}></div>
                                        <img src={cardGameUmbra} style={{ position: "relative", zIndex: "1", width: "100%", height: "100%" }} alt="" />
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        );
    }
}

export default CreazioneLocationForm;
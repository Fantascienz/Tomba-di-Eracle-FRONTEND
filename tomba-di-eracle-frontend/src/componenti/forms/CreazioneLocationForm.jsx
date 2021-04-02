import React, { Component } from 'react';

class CreazioneLocationForm extends Component {
    render() {
        return (
            <div className="centrato">
                <form onSubmit={this.props.handleSubmit}>
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
                        <input type="text" className="form-control" id="chiave" placeholder="Chiave d'accesso" onChange={this.props.handleChange} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} /> <br />
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

                    <div className="input-group">
                        <select className="form-select" name="ingresso" id="ingresso" onChange={this.props.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)", marginBottom: "1%" }}>
                            
                            <option value="">Seleziona Ingresso</option>
                            
                            <option value="" style={{ fontWeight: 'bold' }}>-----NORD-----</option>
                            
                            {JSON.parse(sessionStorage.getItem('locationsNordLibero')).map(location =>
                                <option value={location.id + " nord"} key={location.id}>NORD di {location.nome} - (id: {location.id})</option>
                            )}
                            
                            <option value="" style={{ fontWeight: 'bold' }}>-----EST-----</option>
                            
                            {JSON.parse(sessionStorage.getItem('locationsEstLibero')).map(location =>
                                <option value={location.id + " est"} key={location.id}>EST di {location.nome} - (id: {location.id})</option>
                            )}
                            
                            <option value="" style={{ fontWeight: 'bold' }}>-----SUD-----</option>
                            
                            {JSON.parse(sessionStorage.getItem('locationsSudLibero')).map(location =>
                                <option value={location.id + " sud"} key={location.id}>SUD di {location.nome} - (id: {location.id})</option>
                            )}
                            
                            <option value="" style={{ fontWeight: 'bold' }}>-----OVEST-----</option>
                            
                            {JSON.parse(sessionStorage.getItem('locationsOvestLibero')).map(location =>
                                <option value={location.id + " ovest"} key={location.id}>OVEST di {location.nome} - (id: {location.id})</option>
                            )}
                        </select>
                    </div>
                    <button className="btn btn-dark">Crea</button>
                </form>
            </div>
        );
    }
}

export default CreazioneLocationForm;
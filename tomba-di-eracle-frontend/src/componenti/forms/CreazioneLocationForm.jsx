import React, { Component } from 'react';

class CreazioneLocationForm extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <input type="text" id="nome" placeholder="Nome" onChange={this.props.handleChange} style={{ width: '50%' }} /> <br /> <br />
                    <input type="text" id="ambiente" placeholder="Ambiente" onChange={this.props.handleChange} style={{ width: '50%' }} /> <br /> <br />
                    <input type="text" id="urlImgGiorno" placeholder="URL Immagine Giorno" onChange={this.props.handleChange} style={{ width: '50%' }} /> <br /> <br />
                    <input type="text" id="urlImgNotte" placeholder="URL Immagine Notte" onChange={this.props.handleChange} style={{ width: '50%' }} /> <br /> <br />
                    <input type="text" id="urlAudio" placeholder="URL Audio" onChange={this.props.handleChange} style={{ width: '50%' }} /> <br /> <br />
                    <input type="text" id="chiave" placeholder="Chiave d'accesso" onChange={this.props.handleChange} style={{ width: '50%' }} /> <br /> <br />
                    <input type="text" id="urlImgGiornoUmbra" placeholder="URL Immagine Giorno Umbra" onChange={this.props.handleChange} style={{ width: '50%' }} /> <br /> <br />
                    <input type="text" id="urlImgNotteUmbra" placeholder="URL Immagine Notte Umbra" onChange={this.props.handleChange} style={{ width: '50%' }} /> <br /> <br />
                    <input type="text" id="urlAudioUmbra" placeholder="URL Audio Umbra" onChange={this.props.handleChange} style={{ width: '50%' }} /> <br /> <br />
                    <select name="ingresso" id="ingresso" onChange={this.props.handleChange} style={{ width: '50%' }}>
                        <option value="">Seleziona Ingresso</option>
                        {JSON.parse(sessionStorage.getItem('locationsNordLibero')).map(location =>
                            <option value={"nord " + location.id} key={location.id}>NORD di {location.nome}: {location.id}</option>
                        )}
                        {JSON.parse(sessionStorage.getItem('locationsEstLibero')).map(location =>
                            <option value={"est " + location.id} key={location.id}>EST di {location.nome}: {location.id}</option>
                        )}
                        {JSON.parse(sessionStorage.getItem('locationsSudLibero')).map(location =>
                            <option value={"sud " + location.id} key={location.id}>SUD di {location.nome}: {location.id}</option>
                        )}
                        {JSON.parse(sessionStorage.getItem('locationsOvestLibero')).map(location =>
                            <option value={"ovest " + location.id} key={location.id}>OVEST di {location.nome}: {location.id}</option>
                        )}
                    </select> <br /><br />
                    <button className="btn btn-dark">Crea</button>
                </form>
            </div>
        );
    }
}

export default CreazioneLocationForm;
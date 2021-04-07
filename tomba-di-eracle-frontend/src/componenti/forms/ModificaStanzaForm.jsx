import React, { Component } from 'react';

class ModificaStanzaForm extends Component {

    renderStanza = (stanza) => {
        if (stanza.subLocation.tipo === 'Stanza') {
            return <option value={stanza.subLocation.id} key={stanza.subLocation.id}>({stanza.subLocation.id}) - {stanza.subLocation.nome}</option>
        }
        return <option value={stanza.subLocation.id} key={stanza.subLocation.id}>({stanza.subLocation.id}) UMBRA - {stanza.subLocation.nome}</option>
    }

    render() {

        let stanze = JSON.parse(sessionStorage.getItem('stanze')).sort(
            (a, b) => (a.id < b.id ? -1 : Number(a.id > b.id))
        );

        return (
            <div className="centrato">
                <form onSubmit={this.props.handleUpdate}>
                    <select className="form-select" name="locationMod" id="locationMod" onChange={this.props.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)", marginBottom: "1%" }}>
                        <option value="">Seleziona Stanza da Modificare</option>
                        {stanze.map(stanza =>
                            this.renderStanza(stanza)
                        )}
                    </select>

                    <div className="input-group">
                        <input className="form-control" type="text" id="nomeMod" onChange={this.props.handleChange} placeholder="Nome" style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} />
                    </div>

                    <div className="input-group">
                        <input className="form-control" type="text" id="chiave" onChange={this.props.handleChange} maxlength="5" placeholder="Chiave" style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} />
                    </div>

                    <div className="input-group">
                        <input className="form-control" type="text" id="urlImgGiorno" onChange={this.props.handleChange} placeholder="URL Immagine Giorno" style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} />
                    </div>

                    <div className="input-group">
                        <input className="form-control" type="text" id="urlImgNotte" onChange={this.props.handleChange} placeholder="URL Immagine Notte" style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} />
                    </div>

                    <div className="input-group">
                        <input className="form-control" type="text" id="urlMinimappa" onChange={this.props.handleChange} placeholder="URL Immagine Minimappa" style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} />
                    </div>

                    <div className="input-group">
                        <input className="form-control" type="text" id="urlAudio" onChange={this.props.handleChange} placeholder="URL Audio" style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} />
                    </div>
                    <button className="btn btn-dark">Modifica</button>
                </form>
            </div >
        );
    }
}

export default ModificaStanzaForm;
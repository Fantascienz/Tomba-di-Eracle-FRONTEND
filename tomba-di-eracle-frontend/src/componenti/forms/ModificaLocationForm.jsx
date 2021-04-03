import React, { Component } from 'react';

class ModificaLocationForm extends Component {

    renderListaModificaEsterne = (location) => {
        if (JSON.parse(sessionStorage.getItem('utente')).id === location.creatore.id || JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            return <option value={location.id} key={location.id}>({location.id}) - {location.nome}</option>
        }
    }

    renderFormModificaAdmin = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            return (
                <React.Fragment>
                    <select className="form-select" name="fasciaOraria" id="fasciaOraria" onChange={this.props.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)", marginBottom: "1%" }}>
                        <option value="">Seleziona Fascia Oraria</option>
                        <option value="Giorno">Giorno</option>
                        <option value="Notte">Notte</option>
                        <option value="Ripristina reale">---Ripristina Reale---</option>
                    </select>

                    <select className="form-select" name="meteo" id="meteo" onChange={this.props.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)", marginBottom: "1%" }}>
                        <option value="">Seleziona Meteo</option>
                        <option value="Sereno"> Sereno </option>
                        <option value="Nuvoloso">Nuvoloso</option>
                        <option value="Nebbia">Nebbia</option>
                        <option value="Pioggia">Pioggia</option>
                        <option value="Tempesta">Tempesta</option>
                        <option value="Neve">Neve</option>
                        <option value="Ripristina reale">---Ripristina Reale---</option>
                    </select>

                    <div className="input-group">
                        <input className="form-control" type="date" id="data" onChange={this.props.handleChange} style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} />
                    </div>
                </React.Fragment>
            )
        }
    }
    render() {

        let listaOrdinataESTRNE = JSON.parse(sessionStorage.getItem('listaEsterneReame')).sort(
            (a, b) => (a.id < b.id ? -1 : Number(a.id > b.id))
        );

        let listaOrdinataMACRO = JSON.parse(sessionStorage.getItem('listaMacroLocation')).sort(
            (a, b) => (a.id < b.id ? -1 : Number(a.id > b.id))
        );

        return (
            <div className="centrato">
                <form onSubmit={this.props.handleUpdate}>
                    <select className="form-select" name="locationMod" id="locationMod" onChange={this.props.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)", marginBottom: "1%" }}>
                        <option value="">Seleziona Location da Modificare</option>
                        <option value="" style={{ fontWeight: 'bold' }}>--- Location Esterne ---</option>
                        {listaOrdinataESTRNE[0] == null ?
                            <option value="">(Nessuna location Esterna creata)</option>
                            :
                            listaOrdinataESTRNE.map(location =>
                                this.renderListaModificaEsterne(location)
                            )
                        }
                        <option value="" style={{ fontWeight: 'bold' }}>--- Macro Location ---</option>
                        {listaOrdinataMACRO.map(location =>
                            <option value={location.id} key={location.id}>({location.id}) - {location.nome}</option>
                        )}
                    </select>

                    <div className="input-group">
                        <input className="form-control" type="text" id="nomeMod" onChange={this.props.handleChange} placeholder="Nome" style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} />
                    </div>

                    <div className="input-group">
                        <input className="form-control" type="text" id="chiave" onChange={this.props.handleChange} placeholder="Chiave" style={{ marginBottom: "1%", borderRadius: "5px 5px 5px 5px" }} />
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

                    {this.renderFormModificaAdmin()}
                    <button className="btn btn-dark">Modifica</button>
                </form>
            </div >
        );
    }
}

export default ModificaLocationForm;
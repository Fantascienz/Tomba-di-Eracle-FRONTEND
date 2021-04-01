import React, { Component } from 'react';

class ModificaLocationForm extends Component {

    renderListaModificaEsterne = (location) => {
        if (JSON.parse(sessionStorage.getItem('utente')).id === location.creatore.id || JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            return <option value={location.id} key={location.id}>{location.nome}: {location.id}</option>
        }
    }

    renderFormModificaAdmin = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            return (
                <React.Fragment>
                    <select name="fasciaOraria" id="fasciaOraria" onChange={this.props.handleChange} style={{ width: '47%' }}>
                        <option value="">Seleziona Fascia Oraria</option>
                        <option value="Ripristina reale">Ripristina Reale</option>
                        <option value="Giorno">Giorno</option>
                        <option value="Notte">Notte</option>
                    </select>
                    <br /><br />
                    <select name="meteo" id="meteo" onChange={this.props.handleChange} style={{ width: '47%' }}>
                        <option value="">Seleziona Meteo</option>
                        <option value="Ripristina reale">Ripristina Reale</option>
                        <option value="Sereno"> Sereno </option>
                        <option value="Nuvoloso">Nuvoloso</option>
                        <option value="Nebbia">Nebbia</option>
                        <option value="Pioggia">Pioggia</option>
                        <option value="Tempesta">Tempesta</option>
                        <option value="Neve">Neve</option>
                    </select>
                    <br /><br />
                    <input type="date" id="data" onChange={this.props.handleChange} />
                    <br /><br />
                </React.Fragment>
            )
        }
    }
    render() {
        return (
            <div>
                 <form onSubmit={this.props.handleUpdate}>
                                <select name="locationMod" id="locationMod" onChange={this.props.handleChange} style={{ width: '47%' }}>
                                    <option value="">Seleziona Location da Modificare</option>
                                    <option value="" style={{ fontWeight: 'bold' }}>--- Location Esterne ---</option>
                                    {JSON.parse(sessionStorage.getItem('listaEsterneReame')).map(location =>
                                        this.renderListaModificaEsterne(location)
                                    )}
                                    <option value="" style={{ fontWeight: 'bold' }}>--- Macro Location ---</option>
                                    {JSON.parse(sessionStorage.getItem('listaMacroLocation')).map(location =>
                                        <option value={location.id} key={location.id}>{location.nome}: {location.id}</option>
                                    )}
                                </select>
                                <br /><br />
                                <input type="text" id="nomeMod" onChange={this.props.handleChange} placeholder="Nome" />
                                <br /><br />
                                <input type="text" id="chiave" onChange={this.props.handleChange} placeholder="Chiave" />
                                <br /><br />
                                <input type="text" id="urlImgGiorno" onChange={this.props.handleChange} placeholder="URL Immagine Giorno" />
                                <br /><br />
                                <input type="text" id="urlImgNotte" onChange={this.props.handleChange} placeholder="URL Immagine Notte" />
                                <br /><br />
                                <input type="text" id="urlMinimappa" onChange={this.props.handleChange} placeholder="URL Immagine Minimappa" />
                                <br /><br />
                                <input type="text" id="urlAudio" onChange={this.props.handleChange} placeholder="URL Audio" />
                                <br /><br />
                                {this.renderFormModificaAdmin()}
                                <button className="btn btn-dark">Modifica</button>
                            </form>
            </div>
        );
    }
}

export default ModificaLocationForm;
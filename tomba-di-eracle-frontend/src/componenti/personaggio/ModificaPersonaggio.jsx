import React, { Component } from "react";
import { connect } from "react-redux";
import PersonaggioService from "../../servizi/PersonaggioService";
import { modificaPersonaggio } from "../../store/azioni/personaggioActions";
import Header from "../layout/Header";

class ModificaPersonaggio extends Component {

    state = {
        nominativo: JSON.parse(sessionStorage.getItem('personaggio')).nominativo,
        sesso: JSON.parse(sessionStorage.getItem('personaggio')).sesso,
        rango: JSON.parse(sessionStorage.getItem('personaggio')).rango,
        razza: JSON.parse(sessionStorage.getItem('personaggio')).razza,
        urlImmagine: JSON.parse(sessionStorage.getItem('personaggio')).urlImmagine,
        utente: JSON.parse(sessionStorage.getItem('personaggio')).utente,
        dataCreazione: JSON.parse(sessionStorage.getItem('personaggio')).dataCreazione,
        id: JSON.parse(sessionStorage.getItem('personaggio')).id

    }


    componentDidMount() {
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        if(PersonaggioService.validazioneFormPersonaggio(this.state)) {
            this.props.modifica(this.state)
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="corpoComponente">
                    <div style={{ height: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>

                        <div className="container" style={{ width: "50%" }}>
                            <form onSubmit={this.handleSubmit}>
                                <div className="input-group">
                                    <span className="input-group-text" style={{ width: "20%" }}>Nome completo</span>
                                    <input  placeholder={this.state.nominativo} className="form-control" type="text" id="nominativo" onChange={this.handleChange} value={this.state.nominativo} />
                                </div>

                                <div className="input-group">
                                    <span className="input-group-text" style={{ width: "20%" }}>Sesso</span>
                                    <select className="form-select" id="sesso" value={this.state.sesso} onChange={this.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)" }}>
                                        <option defaultValue="">Sesso:</option>
                                        <option value="M">Uomo</option>
                                        <option value="F">Donna</option>
                                    </select>
                                </div>

                                <div className="input-group">
                                    <span className="input-group-text" style={{ width: "20%" }}>Rango</span>
                                    <select className="form-select" id="rango" value={this.state.rango} onChange={this.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)" }}>
                                        <option defaultValue="" >Rango</option>
                                        <option value="0">0</option>
                                    </select>
                                </div>
                                
                                <div className="input-group">
                                    <span className="input-group-text" style={{ width: "20%" }}>Razza</span>
                                    <select className="form-select" id="razza" value={this.state.razza} onChange={this.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)" }}>
                                        <option defaultValue="" >Razza</option>
                                        <option value="Umano">Umano</option>
                                    </select>
                                </div>
                                
                                <div className="input-group">
                                    <span className="input-group-text" style={{ width: "20%" }}>Url Immagine</span>
                                    <input className="form-control" id="urlImmagine" type="text" value={this.state.urlImmagine} onChange={this.handleChange} />
                                </div>
                                <button className="btn btn-dark" style={{ marginTop: "10px" }}>Modifica</button>
                            </form>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        modifica: (personaggio) => dispatch(modificaPersonaggio(personaggio))
    }
}

const mapStateToProps = (state) => {
    return {
        personaggio: state.personaggio.personaggio
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModificaPersonaggio);

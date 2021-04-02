import React, { Component } from "react";
import { connect } from "react-redux";
import PersonaggioService from "../../servizi/PersonaggioService";
import { modificaPersonaggio } from "../../store/azioni/personaggioActions";
import ModificaPersonaggioForm from "../forms/ModificaPersonaggioForm";
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
        id: JSON.parse(sessionStorage.getItem('personaggio')).id,
        ultimaLocation: JSON.parse(sessionStorage.getItem('personaggio')).ultimaLocation

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
                           <ModificaPersonaggioForm state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
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

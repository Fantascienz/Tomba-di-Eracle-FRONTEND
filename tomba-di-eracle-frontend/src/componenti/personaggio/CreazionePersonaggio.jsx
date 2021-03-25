import React, { Component } from "react";
import { connect } from "react-redux";
import PersonaggioService from "../../servizi/PersonaggioService";
import { creaPersonaggio } from "../../store/azioni/personaggioActions";
import Header from "../layout/Header";

class CreazionePersonaggio extends Component {

    state = {
        nominativo: '',
        sesso: '',
        razza: '',
        rango: '',
        urlImmagine: '',
        utente: JSON.parse(sessionStorage.getItem('utente'))
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    componentDidUpdate() {
        if (this.props.redirect !== '' && this.props.redirect !== '/creazionePersonaggio') {
            this.props.history.push(this.props.redirect)
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        alert(this.state.rango)
        if (PersonaggioService.validazioneFormPersonaggio(this.state)) {
            this.props.creaPersonaggio(this.state)
        } else {
            alert('Campi obbligatori')
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className="corpoComponente">
                <div style={{ height: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <div className="container" style={{width:"50%"}}>
                        <form onSubmit={this.handleSubmit}>
                            <div className="input-group">
                                <span className="input-group-text" style={{width:"20%"}}>Nome completo</span>
                                <input className="form-control" type="text" id="nominativo" onChange={this.handleChange} value={this.state.nominativo}/>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text" style={{width:"20%"}}>Sesso</span>
                                <select className="form-select" id="sesso" value={this.state.sesso} onChange={this.handleChange} style={{border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)"}}>
                                    <option defaultValue="">Sesso:</option>
                                    <option value="M">Uomo</option>
                                    <option value="F">Donna</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text" style={{width:"20%"}}>Razza</span>
                                <select className="form-select" id="razza" value={this.state.razza} onChange={this.handleChange} style={{border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)"}}>
                                    <option defaultValue="" >Razza</option>
                                    <option value="Umano">Umano</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <span className="input-group-text" style={{width:"20%"}}>Rango</span>
                                <select className="form-select" id="rango" value={this.state.rango} onChange={this.handleChange} style={{border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)"}}>
                                    <option defaultValue="" >Rango</option>
                                    <option value="0">0</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <span className="input-group-text" style={{width:"20%"}}>Url Immagine</span>
                                <input className="form-control" id="urlImmagine" type="text" value={this.state.urlImmagine} onChange={this.handleChange} />
                            </div>

                            <button className="btn btn-dark" style={{marginTop:"10px"}}>Crea</button>
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
        creaPersonaggio: (personaggio) => dispatch(creaPersonaggio(personaggio))
    }

}

const mapStateToProps = (state) => {
    return {
        redirect: state.personaggio.redirect
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreazionePersonaggio);

import React, { Component } from 'react';
import UtenteService from '../../servizi/UtenteService';
import { registrazione } from '../../store/azioni/utenteActions';
import { connect } from "react-redux";

class Registrazione extends Component {

    state = {
        nome: '',
        cognome: '',
        email: '',
        psw: '',
        psw2: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (UtenteService.validaRegistrazione(this.state)) {
            if (this.validaPassword()) {
                let utente = {
                    nominativo: this.state.nome + " " + this.state.cognome,
                    email: this.state.email,
                    psw: this.state.psw
                }
                this.props.registrazione(utente)
            } else {
                alert('pass diverse')
            }

        } else {
            alert('campi obb')
        }
    }

    componentDidUpdate() {
        if(this.props.redirect !== '') {
            this.props.history.push(this.props.redirect)
        }
    }

    validaPassword = () => {
        return this.state.psw === this.state.psw2
    }

    render() {
        return (
            <div style={{ position: "fixed", top: "10%", width: "100%", height: "85%" }}>
                <div className="container" style={{ marginTop: "5%" }}>
                    <h1>Registrazione</h1>
                    <br />
                    <div style={{ align: "center" }}>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <h3>Nominativo</h3>
                                <div className="col-md-3"></div>
                                <div className="form-group col-md-3">
                                    <input type="text" id="nome" placeholder="Nome" className="form-control" onChange={this.handleChange} /> <br />
                                </div>
                                <div className="form-group col-md-3">
                                    <input type="text" id="cognome" placeholder="Cognome" className="form-control" onChange={this.handleChange} /> <br />
                                </div>
                            </div>
                            <div className="row">
                                <h3>Email</h3>
                                <div className="col-md-3"></div>
                                <div className="form-group col-md-6">
                                    <input type="email" id="email" placeholder="Email" className="form-control" onChange={this.handleChange} /> <br />
                                </div>
                            </div>
                            <div className="row">
                                <h3>Password</h3>
                                <div className="col-md-3"></div>
                                <div className="form-group col-md-3">
                                    <input type="password" id="psw" placeholder="Password" className="form-control" onChange={this.handleChange} /> <br />
                                </div>
                                <div className="form-group col-md-3">
                                    <input type="password" id="psw2" placeholder="Conferma Password" className="form-control" onChange={this.handleChange} /> <br />
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit">Registrati</button>
                        </form>
                    </div >
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        redirect: state.utente.redirect
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        registrazione: (utente) => dispatch(registrazione(utente))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registrazione);
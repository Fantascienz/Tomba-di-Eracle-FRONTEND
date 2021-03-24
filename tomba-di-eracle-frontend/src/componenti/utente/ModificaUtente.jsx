import React, { Component } from 'react';
import { connect } from 'react-redux';
import UtenteService from '../../servizi/UtenteService';
import Header from '../layout/Header';

class ModificaUtente extends Component {

    state = {
        nominativo: this.props.utente.nominativo,
        email: this.props.utente.email,
        psw: '',
        pswVecchia: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(UtenteService.validaModifica(this.state)) {
            let nuovaPsw;
            if (this.state.psw === '') {
                //nuovaPsw uguale a quella già esistente (criptata)
                nuovaPsw = this.props.utente.psw;              
            } else {
                //nuovaPsw uguale a quella digitata in modifica
                nuovaPsw = this.state.psw; 
            }
            let utente = this.props.utente;
            utente.nominativo = this.state.nominativo;
            utente.email = this.state.email;
            utente.psw = nuovaPsw;
            alert(JSON.stringify(utente))
        } else {
            alert('campi obb')
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header/>
                <div className="corpoComponente">
                    <h1>Modifica Account</h1>
                    <br/>
                    <div style={{ align: "center" }}>
                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <h3>Nuovo Nominativo</h3>
                                <div className="col-md-3"></div>
                                <div className="form-group col-md-6">
                                    <input type="text" id="nominativo" placeholder={this.props.utente.nominativo} className="form-control" onChange={this.handleChange} /> <br />
                                </div>
                            </div>
                            <div className="row">
                                <h3>Nuova Email</h3>
                                <div className="col-md-3"></div>
                                <div className="form-group col-md-6">
                                    <input type="email" id="email" placeholder={this.props.utente.email} className="form-control" onChange={this.handleChange} /> <br />
                                </div>
                            </div>
                            <div className="row">
                                <h3>Nuova Password</h3>
                                <div className="col-md-3"></div>
                                <div className="form-group col-md-6">
                                    <input type="password" id="psw" placeholder="Password (Lascia vuoto per mantenere la vecchia password)"  className="form-control" onChange={this.handleChange} /> <br />
                                </div>
                            </div>
                            <div className="row">
                                <h3>Vecchia password</h3>
                                <div className="col-md-3"></div>
                                <div className="form-group col-md-6">
                                    <input type="password" id="pswVecchia" placeholder="Password per confermare" className="form-control" onChange={this.handleChange} /> <br />
                                </div>
                            </div>
                            <button className="btn btn-primary" type="submit">Registrati</button>
                        </form>
                    </div >
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        utente: state.utente.utente
    }
}

export default connect(mapStateToProps)(ModificaUtente);
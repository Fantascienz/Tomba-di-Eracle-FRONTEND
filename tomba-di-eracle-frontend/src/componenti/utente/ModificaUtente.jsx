import React, { Component } from 'react';
import { connect } from 'react-redux';
import UtenteService from '../../servizi/UtenteService';
import { modificaUtente } from '../../store/azioni/utenteActions';
import Header from '../layout/Header';
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import ModificaUtenteForm from '../forms/ModificaUtenteForm';

class ModificaUtente extends Component {

    state = {
        nominativo: '',
        email: '',
        psw: '',
        pswVecchia: ''
    }

    componentDidUpdate() {
        console.log(this.props.redirect)
        if (this.props.redirect !== '' && this.props.redirect !== '/modificaUtente') {
            this.props.history.push(this.props.redirect)
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (UtenteService.validaModifica(this.state)) {
            let nuovaPsw;
            if (this.state.psw === '') {
                //nuovaPsw uguale a quella già esistente (criptata)
                nuovaPsw = this.props.utente.psw;
            } else {
                //nuovaPsw uguale a quella digitata in modifica
                nuovaPsw = this.state.psw;
            }
            let mod = {
                utente: {
                    id: this.props.utente.id,
                    nominativo: this.state.nominativo,
                    email: this.state.email,
                    psw: nuovaPsw,
                    tipo: this.props.utente.tipo
                },
                vecchiaPsw: this.state.pswVecchia
            }
            this.props.modifica(mod);
        } else {
            withReactContent(Swal).fire({
                title: <div>
                    <p>Inserisci la vecchia password!</p>
                </div>
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="corpoComponente" style={{ paddingTop: "5%", zIndex: "998", color: "#eeaa44", textShadow: "2px 2px black" }}>
                    <h1>Modifica Account</h1>
                    <br />
                    <div style={{ align: "center" }}>
                        <ModificaUtenteForm utente={this.props.utente} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
                    </div >
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        utente: state.utente.utente,
        redirect: state.utente.redirect
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        modifica: (mod) => dispatch(modificaUtente(mod))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModificaUtente);
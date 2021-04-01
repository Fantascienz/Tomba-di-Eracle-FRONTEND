import React, { Component } from 'react';
import { connect } from 'react-redux';
import { modificaTipoUtente, getListaUtenti, modificaMassimali } from '../../store/azioni/adminActions';
import TabellaUtenti from '../tabelle/TabellaUtenti';

class ListaUtenti extends Component {

    state = {
        nuovoTipo: 'standard',
        nuovoMaxUmani: '',
        nuovoMaxGarou: '',
        nuovoMaxPng: ''
    }

    modificaUmani = (utente) => {
        utente.maxUmani = this.state.nuovoMaxUmani
        this.props.modificaMassimali(utente)
        this.props.getListaUtenti()
    }

    modificaGarou = (utente) => {
        utente.maxGarou = this.state.nuovoMaxGarou
        this.props.modificaMassimali(utente)
        this.props.getListaUtenti()
    }

    modificaPng = (utente) => {
        utente.maxPng = this.state.nuovoMaxPng
        this.props.modificaMassimali(utente)
        this.props.getListaUtenti()
    }

    modificaTipo = (utente) => {
        this.props.modificaTipo(utente, this.state.nuovoTipo)
        this.props.getListaUtenti()
    }

    ban = (utente) => {
        this.props.modificaTipo(utente, utente.tipo === 'bannato' ? 'standard' : 'bannato')
        this.props.getListaUtenti()
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        return (
            <React.Fragment>
                <TabellaUtenti lista={this.props.lista} modificaUmani={this.modificaUmani} modificaGarou={this.modificaGarou}
                    modificaPng={this.modificaPng} modificaTipo={this.modificaTipo} ban={this.ban} handleChange={this.handleChange} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listaUtenti: state.admin.listaUtenti
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        modificaTipo: (utente, nuovoTipo) => dispatch(modificaTipoUtente(utente, nuovoTipo)),
        getListaUtenti: () => dispatch(getListaUtenti()),
        modificaMassimali: (utente) => dispatch(modificaMassimali(utente))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListaUtenti);
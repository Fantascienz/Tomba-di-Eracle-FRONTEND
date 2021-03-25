import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../componenti/layout/Header'
import { toModificaUtente } from '../../store/azioni/utenteActions';
import SchedaUtente from './SchedaUtente';

class Utente extends Component {

    componentDidUpdate() {
        if (this.props.redirect !== '' && this.props.redirect !== '/paginaUtente') {
            this.props.history.push(this.props.redirect)
        }
    }

    toCreazionePersonaggio = () => {
        this.props.history.push('/creazionePersonaggio');
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <SchedaUtente admin={this.props.admin} creazionePG={() => this.toCreazionePersonaggio()} modificaUtente={() => this.props.toModificaUtente()} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        utente: state.utente.utente,
        redirect: state.utente.redirect,
        admin: state.utente.admin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toModificaUtente: () => dispatch(toModificaUtente())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Utente);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../componenti/layout/Header'
import { toCreazioneGarou, toCreazionePersonaggio } from '../../store/azioni/personaggioActions';
import { toModificaUtente } from '../../store/azioni/utenteActions';
import SchedaUtente from './SchedaUtente';

class Utente extends Component {

    componentDidUpdate() {
        if (this.props.redirect !== '' && this.props.redirect !== '/paginaUtente') {
            this.props.history.push(this.props.redirect)
        }
    }

    

    render() {
        return (
            <React.Fragment>
                <Header />
                <SchedaUtente admin={this.props.admin} creazionePng={() => this.props.toCreazionePersonaggio('png') } creazioneGarou={() => this.props.toCreazionePersonaggio('garou')}  creazionePG={() => this.props.toCreazionePersonaggio('normale')} modificaUtente={() => this.props.toModificaUtente()} />
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        utente: state.utente.utente,
        redirect: state.utente.redirect,
        admin: state.utente.admin,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toModificaUtente: () => dispatch(toModificaUtente()),
        toCreazionePersonaggio: (tipo) => dispatch(toCreazionePersonaggio(tipo)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Utente);
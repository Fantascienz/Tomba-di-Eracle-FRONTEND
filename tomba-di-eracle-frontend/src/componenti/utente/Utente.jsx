import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../componenti/layout/Header'
import { toModificaUtente } from '../../store/azioni/utenteActions';
<<<<<<< HEAD
import ListaPersonaggio from '../personaggio/ListaPersonaggio';
=======
import SchedaUtente from './SchedaUtente';
>>>>>>> cc52ccc (famme pullàààà)

class Utente extends Component {

    componentDidUpdate() {
        console.log(this.props.redirect)
        if (this.props.redirect !== '' && this.props.redirect !== '/paginaUtente') {
            this.props.history.push(this.props.redirect)
        }
    }

    toCreazionePersonaggio = () => {
        this.props.history.push('/creazionePersonaggio');
        // this.props.history.go();
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <SchedaUtente creazionePG={() => this.toCreazionePersonaggio()} modificaUtente={() => this.props.toModificaUtente()} />
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
                    toModificaUtente: () => dispatch(toModificaUtente())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Utente);
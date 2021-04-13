import React, { Component } from 'react';
import { connect } from 'react-redux';
import { eliminaConversazione, getAllConversazioni, getConversazione, getConversazioneUtente, inviaMessaggio } from '../../store/azioni/messaggiActions';
import Header from '../layout/Header';
import ChatAdmin from '../messaggi/ChatAdmin'

class MessaggiUtenti extends Component {

    componentDidMount() {
        this.props.getAllConversazioni()
    }

    renderVisualizzaConversazione = (utente) => {
        return (
            <>
                <button className="btn btn-danger" onClick={() => this.props.getConversazioneUtente(utente)}>{utente.nominativo}</button>
                <button className="btn btn-danger" onClick={() => this.props.eliminaConversazione(utente)} style={{ marginLeft: '1%' }}>Elimina Conversazione</button>
                <hr />
            </>
        )
    }

    render() {
        let listaOrdinata = []
        // alert('blocco')
        console.log(this.props.conversazioni)
        if (this.props.conversazioni !== '') {
            listaOrdinata = this.props.conversazioni.sort(
                (a, b) => (a.id > b.id ? -1 : Number(a.id < b.id))
            );
        }

        return (
            <React.Fragment>
                <Header />
                <div className="corpoComponente" style={{ width: "100%", height: "100%" }}>
                    <div className="row" style={{ width: "100%", height: "100%", marginTop: '1%' }}>
                        <div className="col-md-5">
                            <h1 className="font-lombardia-yellow bg-dark">Conversazioni Attive</h1>
                            {this.props.conversazioni.length == 0 ? <p className="font-lombardia-yellow bg-dark" style={{ fontSize: '2em' }}>Non ci sono conversazioni attive</p> :
                                listaOrdinata.map(utente =>
                                    this.renderVisualizzaConversazione(utente)
                                )
                            }
                        </div>
                        <div className="col-md-6" style={{ width: "50%", height: "85%" }}>
                            <ChatAdmin utente={this.props.utente} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messaggi: state.messaggi.messaggi,
        conversazioni: state.messaggi.conversazioni,
        utente: state.messaggi.utente
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getConversazione: () => dispatch(getConversazione()),
        getConversazioneUtente: (utente) => dispatch(getConversazioneUtente(utente)),
        getAllConversazioni: () => dispatch(getAllConversazioni()),
        inviaMessaggio: (messaggio) => dispatch(inviaMessaggio(messaggio)),
        eliminaConversazione: (utente) => dispatch(eliminaConversazione(utente))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessaggiUtenti);
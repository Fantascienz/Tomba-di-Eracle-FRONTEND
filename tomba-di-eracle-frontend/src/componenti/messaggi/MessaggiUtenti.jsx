import React, { Component } from 'react';
import { connect } from 'react-redux';
import { eliminaConversazione, getAllConversazioni, getConversazione, getConversazioneUtente, inviaMessaggio } from '../../store/azioni/messaggiActions';
import Header from '../layout/Header';
import ChatAdmin from '../messaggi/ChatAdmin'
import "./MessaggiTraUtentiAdmin.css"


class MessaggiUtenti extends Component {

    componentDidMount() {
        this.props.getAllConversazioni()
    }

    renderVisualizzaConversazione = (utente) => {
        return (
            <>
                <button className="btn btn-secondary btn-messaggi" onClick={() => this.props.getConversazioneUtente(utente)} style={{ width: '49%' }}>{utente.nominativo}</button>
                <button className="btn btn-danger btn-messaggi" onClick={() => this.props.eliminaConversazione(utente)} style={{ marginLeft: '2%', width: '49%' }}>Elimina</button>
                <hr />
            </>
        )
    }

    renderTastoUtente = (utente) => {
        return <span title={utente.id}>{utente.nominativo + (utente.tipo === 'admin' ? ' (Admin)' : '')}</span>;
    }

    render() {
        let listaOrdinata = []

        if (this.props.conversazioni !== '') {
            listaOrdinata = this.props.conversazioni.sort(
                (a, b) => (a.id > b.id ? -1 : Number(a.id < b.id))
            );
        }

        let listaUtenti = JSON.parse(sessionStorage.getItem('listaUtenti')).sort(
            (a, b) => (a.nominativo < b.nominativo ? -1 : Number(a.nominativo > b.nominativo))
        );


        return (
            <React.Fragment>
                <Header />
                <div className="corpoComponente">

                    <div className="row messaggi-row">

                        <div className="prima-colonna">
                            <h1 className="font-lombardia-yellow bg-dark rounded messaggi-row" >Conversazioni Attive: {this.props.conversazioni.length}</h1>
                            <div style={{ overflowY: 'auto', height: '85%' }}>
                                {this.props.conversazioni.length == 0 ?
                                    <h1 className="font-lombardia-yellow bg-dark rounded messaggi-row" >Non ci sono conversazioni attive</h1>
                                    :
                                    listaOrdinata.map(utente =>
                                        this.renderVisualizzaConversazione(utente)
                                    )
                                }
                            </div>
                        </div>

                        <div className="seconda-colonna" >
                            <h1 className="font-lombardia-yellow bg-dark rounded messaggi-row">Scrivi a ...</h1>
                            <div style={{ overflowY: 'auto', height: '85%' }}>
                                {
                                    listaUtenti.map(utente =>
                                        JSON.parse(sessionStorage.getItem('utente')).id === utente.id ?
                                            ''
                                            :
                                            <>
                                                <button className="btn btn-secondary btn-messaggi" onClick={() => this.props.getConversazioneUtente(utente)} style={{marginBottom:"5px"}}>{this.renderTastoUtente(utente)}</button>
                                            </>
                                    )
                                }
                            </div>
                        </div>

                        <div className="messaggi-chat-scrittura terza-colonna">
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
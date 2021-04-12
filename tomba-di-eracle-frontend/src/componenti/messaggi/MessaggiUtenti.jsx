import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllConversazioni, getConversazione, inviaMessaggio } from '../../store/azioni/messaggiActions';
import Header from '../layout/Header';

class MessaggiUtenti extends Component {

    componentDidMount() {
        this.props.getAllConversazioni()
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="corpoComponente">
                    <div className="row">
                        <div className="col-md 6">
                            {this.props.conversazioni.map(utente =>
                                <h1>{utente.nominativo}</h1>
                            )}
                        </div>
                        <div className="col-md 6"></div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        messaggi: state.messaggi.messaggi,
        conversazioni: state.messaggi.conversazioni
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getConversazione: () => dispatch(getConversazione()),
        getAllConversazioni: () => dispatch(getAllConversazioni()),
        inviaMessaggio: (messaggio) => dispatch(inviaMessaggio(messaggio))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessaggiUtenti);
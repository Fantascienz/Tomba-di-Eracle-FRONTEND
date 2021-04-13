import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllConversazioni, getConversazione, inviaMessaggio } from '../../store/azioni/messaggiActions';
import Header from '../layout/Header';
import ChatAdmin from '../messaggi/ChatAdmin'

class MessaggiUtenti extends Component {

    componentDidMount() {
        this.props.getAllConversazioni()
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="corpoComponente" style={{ width: "100%", height: "100%" }}>
                    <div className="row" style={{width: "100%", height: "100%", marginTop: '1%'}}>
                        <div className="col-md-5">
                            {this.props.conversazioni.map(utente =>
                                <h1>{utente.nominativo}</h1>
                            )}
                        </div>
                        <div className="col-md-6" style={{ width: "50%", height: "85%" }}>
                            <ChatAdmin />
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
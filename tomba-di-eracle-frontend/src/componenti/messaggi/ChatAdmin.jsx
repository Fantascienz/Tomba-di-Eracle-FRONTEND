import React from "react"
import { connect } from "react-redux"
import { getConversazione, inviaMessaggio } from "../../store/azioni/messaggiActions"

class ChatAdmin extends React.Component {

    state = {
        testo: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        let messaggio = {
            utente: JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin' ? this.props.utente : JSON.parse(sessionStorage.getItem('utente')),
            testo: this.state.testo,
            inviatoDa: JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin' ? 'Admin' : 'Utente'
        }
        this.props.inviaMessaggio(messaggio)
    }

    componentDidMount() {
        this.props.getConversazione();
    }

    renderMessaggi = (messaggio) => {
        let messageClass;
        if (JSON.parse(sessionStorage.getItem('utente')).tipo != 'admin') {
            messageClass = messaggio.inviatoDa === 'Utente' ? 'sent' : 'received';
        } else {
            messageClass = messaggio.inviatoDa === 'Admin' ? 'sent' : 'received';
        }

        return (
            <>
                <div className={`message ${messageClass}`}>
                    <p>{messaggio.testo}</p>

                </div>
                <hr />
            </>)
    }


    render() {
        return (
            <React.Fragment>
                <div className="chat-admin row">
                    <main className="col-6">
                        {this.props.messaggi && this.props.messaggi.map(msg =>
                            this.renderMessaggi(msg))}
                    </main>

                    <div className="col-1"></div>

                    <form className="col-5" onSubmit={() => this.handleSubmit()}>
                        <textarea name="testo" id="testo" cols="30" rows="10" placeholder="Scrivi messaggio..." onChange={this.handleChange}></textarea>
                        <button type="submit" disabled={this.state.testo === '' ? true : false}>🕊️</button>
                    </form>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        messaggi: state.messaggi.messaggi
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getConversazione: () => dispatch(getConversazione()),
        inviaMessaggio: (messaggio) => dispatch(inviaMessaggio(messaggio))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatAdmin);
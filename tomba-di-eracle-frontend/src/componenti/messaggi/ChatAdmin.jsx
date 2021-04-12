import React from "react"
import { connect } from "react-redux"
import { getConversazione, inviaMessaggio } from "../../store/azioni/messaggiActions"
import Header from "../layout/Header";

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
            utente: JSON.parse(sessionStorage.getItem('utente')),
            testo: this.state.testo,
            inviatoDa: "Utente"
        }
        this.props.inviaMessaggio(messaggio)
    }

    componentDidMount() {
        this.props.getConversazione();
    }

    renderMessaggi = (messaggio) => {
        const messageClass = JSON.parse(sessionStorage.getItem('utente')).id === messaggio.utente.id ? 'sent' : 'received';

        return (
            <>
                <div className={`message ${messageClass}`}>
                    <p>{messaggio.testo}</p>
                </div>
            </>)
    }


    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="corpoComponente">
                    <br /><br /><br />
                    <div className="chat">
                        <main>
                            {this.props.messaggi && this.props.messaggi.map(msg =>
                                this.renderMessaggi(msg))}
                        </main>

                        <form onSubmit={() => this.handleSubmit()}>
                            <textarea name="testo" id="testo" cols="30" rows="10" placeholder="Scrivi messaggio..." onChange={this.handleChange}></textarea>
                            <button type="submit" disabled={this.state.testo === '' ? true : false}>🕊️</button>
                        </form>
                    </div>
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
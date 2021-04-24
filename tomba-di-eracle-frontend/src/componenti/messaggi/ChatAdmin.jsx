import React from "react"
import { connect } from "react-redux"
import { getConversazione, inviaMessaggio } from "../../store/azioni/messaggiActions"
import avatarEracle from '../../img/eracleCapovolto.png';
import penna from '../../img/quill.png'
import { withRouter } from "react-router";

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
            admin: JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin' ? JSON.parse(sessionStorage.getItem('utente')) : null,
            testo: this.state.testo,
            inviatoDa: JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin' ? 'Admin' : 'Utente',
            inviatoAlle: new Date()
        }
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            alert('Risposta inviata a ' + this.props.utente.nominativo)
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
        let srcImmagine;
        if (messaggio.inviatoDa === 'Utente') {
            srcImmagine = avatarEracle;
        } else {
            srcImmagine = 'https://cdn.dribbble.com/users/295073/screenshots/5081089/hacker_logo_v1.0.jpg?compress=1&resize=400x300';
        }
        return (
            <>
                <div className={`message ${messageClass}`} key={messaggio.id}>
                    <img src={srcImmagine} style={{ height: '50px', width: '50px' }} className="tombaJPG rounded-circle"></img>
                    <p className="font-lombardia" style={{ fontSize: '2em' }}
                        title={this.renderTitle(messaggio)} >{messaggio.testo}</p>
                </div>
                <hr />
            </>)
    }

    renderTitle = (messaggio) => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            if (messaggio.inviatoDa === 'Admin') {
                return messaggio.admin.nominativo;
            }
        }
        return ""
    }

    renderDestinatario = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            if (this.props.utente != undefined) {
                return <>
                            <span style={{color: "#eeaa44", fontSize:"1.5vw"}}>Destinatario:</span> 
                            <p style={{color: "#eeaa44", fontSize:"2vw"}}>{this.props.utente.nominativo}</p>
                        </>
            }
            return "Scegli destinatario..."
        }
        return "Destinatario: Admin"
    }

    render() {

        let listaOrdinata;
        if (this.props.messaggi != null) {
            listaOrdinata = this.props.messaggi.sort(
                (a, b) => (a.id < b.id ? -1 : Number(a.id > b.id))
            );
        }

        return (
            <React.Fragment>
                <div className="chat-admin row" style={{width:"113%"}}>
                    <main className="col-6" style={{padding:'2.9%'}}>
                        <p className="font-lombardia-yellow bg-dark rounded" style={{ fontSize: '2em',color: "#eeaa44",marginLeft: '6%'}}>{this.renderDestinatario()}</p>
                        {listaOrdinata && listaOrdinata.map(msg =>
                            this.renderMessaggi(msg))}
                    </main>

                    <div className="col-1"></div>

                    <form className="col-5" onSubmit={() => this.handleSubmit()} style={{height:"90%"}}>
                        <textarea name="testo" id="testo" cols="30" rows="10" placeholder="Scrivi messaggio..." onChange={this.handleChange} className="font-lombardia" style={{ fontSize: '2em', height:"100%" }}></textarea>
                        <button type="submit"   disabled={this.state.testo === '' || this.props.utente == undefined ? true : false}
                                                title={this.state.testo === '' && this.props.utente == undefined ? "Scegli un destinatario e scrivi un messaggio" : this.state.testo === '' && this.props.utente != undefined ? "Scrivi un messaggio" : "Scegli un destinatario"}>
                            <img src={penna} alt="" />
                        </button>
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
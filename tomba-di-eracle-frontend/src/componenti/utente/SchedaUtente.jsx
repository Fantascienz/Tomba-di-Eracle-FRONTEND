import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getListaUtenti } from '../../store/azioni/adminActions';
import ListaPersonaggio from '../personaggio/ListaPersonaggio';
import ListaUtenti from './ListaUtenti';

class SchedaUtente extends Component {

    isStandard = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'standard') {
            return (
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button className="btn btn-dark" style={{ color: "#eeaa44", width: "80%" }} onClick={() => this.props.creazionePG()}>Crea Personaggio</button> <br /><br />
                </div>
            )
        }
    }

    isVip = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'vip') {
            return (
                <div className="btn-group" role="group" aria-label="Basic example" style={{ color: "#eeaa44", width: "80%" }}>
                    <button className="btn btn-dark" style={{ color: "#eeaa44", width: "50%" }} onClick={() => this.props.creazionePG()}>Crea Personaggio</button> <br /><br />
                    <button className="btn btn-dark" style={{ color: "#eeaa44", width: "50%", borderRadius: "0 5px 5px 0" }} onClick={() => this.props.creazioneGarou()} >Crea Garou</button> <br /><br />
                </div>
            )
        }
    }

    isAdmin = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            if (JSON.parse(sessionStorage.getItem('listaUtenti')) !== null) {
                return (
                    <React.Fragment>
                        <button className="btn btn-dark" style={{ color: "#eeaa44", width: "80%" }} onClick={() => this.visualizzaListaPg()}>Lista Personaggi</button> <br />
                    </React.Fragment>
                )
            } else {
                return (
                    <React.Fragment>
                        <button className="btn btn-dark" style={{ color: "#eeaa44", width: "80%" }} onClick={() => this.visualizzaListaUtenti()}>Visualizza Utenti</button> <br />
                    </React.Fragment>
                )
            }
        }
    }

    renderListe = () => {
        if (JSON.parse(sessionStorage.getItem('listaUtenti')) !== null) {
            return <ListaUtenti lista={JSON.parse(sessionStorage.getItem('listaUtenti'))} />
        }
        return <ListaPersonaggio />
    }

    visualizzaListaUtenti = () => {
        this.props.getListaUtenti();
    }

    visualizzaListaPg = () => {
        sessionStorage.setItem('listaUtenti', null)
        this.forceUpdate()
    }

    render() {
        return (
            <div className="corpoComponente">
                <div style={{ paddingTop: "2%", zIndex: "998", color: "#eeaa44", textShadow: "2px 2px black" }}>
                    <h1>Salute {JSON.parse(sessionStorage.getItem('utente')).nominativo}</h1>
                </div>

                <div style={{ zIndex: "999", position: "absolute", left: "10%", height: "80%", width: "20%" }}>
                    <div style={{ height: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                        <img src="https://cdn.discordapp.com/attachments/823502374106038273/823573400621678592/Simbolo_TombaDiEracle.jpg" className="tombaJPG rounded-circle" alt="" style={{ boxShadow: "0 24px 32px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)", width: "80%", height: "auto" }} /> <br /><br />
                        {this.isAdmin()}
                        {this.isVip()}
                        {this.isStandard()}
                        <button className="btn btn-dark" style={{ color: "#eeaa44", width: "80%" }} onClick={() => this.props.modificaUtente()}>Modifica Account</button>
                    </div>
                </div>

                <div style={{ zIndex: "999", position: "absolute", right: "10%", height: "80%", width: "60%" }} align="center">
                    <div style={{ height: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                        {this.renderListe()}
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        listaUtenti: state.admin.listaUtenti,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListaUtenti: () => dispatch(getListaUtenti())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedaUtente);
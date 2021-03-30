import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getListaUtenti, visualizzaPgAdmin } from '../../store/azioni/adminActions';
import CarouselPersonaggi from '../personaggio/CarouselPersonaggi';
import ListaPersonaggi from '../personaggio/ListaPersonaggi';
import ListaUtenti from './ListaUtenti';
import avatarEracle from '../../img/eracleCapovolto.png';
import { browserHistory } from "../.."
import { visualizzaListaPg, visualizzaPgMaster } from '../../store/azioni/masterActions';

class SchedaUtente extends Component {

    isStandard = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'standard') {
            return (
                <div className="btn-group" role="group" aria-label="Basic example" style={{ color: "#eeaa44", width: "80%" }}>
                    <button className="btn btn-dark" style={{ color: "#eeaa44", width: "80%" }} onClick={() => this.props.creazionePG()}>Crea Personaggio</button>
                    <br /><br />
                </div>
            )
        }
    }

    isVip = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'vip') {
            return (
                <div className="btn-group" role="group" aria-label="Basic example" style={{ color: "#eeaa44", width: "80%" }}>
                    <button className="btn btn-dark" style={{ color: "#eeaa44", width: "50%", fontSize: "80%" }} onClick={() => this.props.creazionePG()}>Crea Umano</button>
                    <br /><br />
                    <button className="btn btn-dark" style={{ color: "#eeaa44", width: "50%", fontSize: "80%", borderRadius: "0 5px 5px 0" }} onClick={() => this.props.creazioneGarou()} >Crea Garou</button>
                    <br /><br />
                </div>
            )
        }
    }

    isMasterCreazionePg = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'master') {
            return (
                <div className="btn-group" role="group" aria-label="Basic example" style={{ color: "#eeaa44", width: "80%" }}>
                    <button className="btn btn-dark" style={{ color: "#eeaa44", width: "33.33%", fontSize: "65%" }} onClick={() => this.props.creazionePG()}>Crea Umano</button>
                    <br /><br />
                    <button className="btn btn-dark" style={{ color: "#eeaa44", width: "33.33%", fontSize: "65%" }} onClick={() => this.props.creazioneGarou()} >Crea Garou</button>
                    <br /><br />
                    <button className="btn btn-dark" style={{ color: "#eeaa44", width: "33.33%", fontSize: "70%", borderRadius: "0 5px 5px 0" }} onClick={() => this.props.creazionePng()} >Crea Png</button>
                    <br /><br />
                </div>
            )
        }
    }

    isMasterListe = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'master') {
            if (this.props.visualizzaPg) {
                return (
                    <React.Fragment>
                        <button className="btn btn-dark" style={{ color: "#eeaa44", width: "80%" }} onClick={() => this.visualizzaPgMaster()}>I Tuoi Personaggi</button> <br />

                    </React.Fragment>
                )
            } else {
                return (
                    <React.Fragment>
                        <button className="btn btn-dark" style={{ color: "#eeaa44", width: "80%" }} onClick={() => this.visualizzaListMaster()}>Lista Personaggi</button> <br />
                    </React.Fragment>
                )
            }
        }
    }

    isAdminCreazionePg = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            return (
                <div className="btn-group" role="group" aria-label="Basic example" style={{ color: "#eeaa44", width: "80%" }}>
                    <button className="btn btn-dark" style={{ color: "#eeaa44", width: "33.33%", fontSize: "65%" }} onClick={() => this.props.creazionePG()}>Crea Umano</button>
                    <br /><br />
                    <button className="btn btn-dark" style={{ color: "#eeaa44", width: "33.33%", fontSize: "65%" }} onClick={() => this.props.creazioneGarou()} >Crea Garou</button>
                    <br /><br />
                    <button className="btn btn-dark" style={{ color: "#eeaa44", width: "33.33%", fontSize: "70%", borderRadius: "0 5px 5px 0" }} onClick={() => this.props.creazionePng()} >Crea Png</button>
                    <br /><br />
                </div>
            )
        }
    }

    isAdmin = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            if (JSON.parse(sessionStorage.getItem('listaUtenti')) !== null) {
                return (
                    <React.Fragment>
                        <button className="btn btn-dark" style={{ color: "#eeaa44", width: "80%" }} onClick={() => this.visualizzaListaPg()}>Lista Personaggi</button>
                        <br />
                        <button className="btn btn-dark" style={{ color: "#eeaa44", width: "80%" }} onClick={() => this.visualizzaPgAdmin()}>I Tuoi Personaggi</button>
                        <br />
                    </React.Fragment>
                )
            } else {
                return (
                    <React.Fragment>
                        <button className="btn btn-dark" style={{ color: "#eeaa44", width: "80%" }} onClick={() => this.visualizzaListaUtenti()}>Lista Utenti</button>
                        <br />
                        <button className="btn btn-dark" style={{ color: "#eeaa44", width: "80%" }} onClick={() => this.visualizzaPgAdmin()}>I Tuoi Personaggi</button>
                        <br />
                    </React.Fragment>
                )
            }

        }
    }

    creazioneLocation = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin' || JSON.parse(sessionStorage.getItem('utente')).tipo === 'master') {
            return (
                <React.Fragment>
                    <button className="btn btn-dark" style={{ color: "#eeaa44", width: "80%" }} onClick={() => this.creaLocation()}>Creazione Location</button>
                    <br />
                    <button className="btn btn-dark" style={{ color: "#eeaa44", width: "80%" }} onClick={() => this.modificaLocation()}>Modifica Location</button>
                    <br />
                </React.Fragment>
            )
        }
    }


    creaLocation = () => {
        browserHistory.push('creazioneLocation')
        browserHistory.go()
    }

    modificaLocation = () => {
        browserHistory.push('modificaLocation')
        browserHistory.go()
    }


    renderListe = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            if (this.props.visualizzaPgAdmin) {
                return <CarouselPersonaggi />
            } else {
                if (JSON.parse(sessionStorage.getItem('listaUtenti')) !== null) {
                    return <ListaUtenti lista={JSON.parse(sessionStorage.getItem('listaUtenti'))} />
                }
                if (JSON.parse(sessionStorage.getItem('listaPersonaggi')) !== null) {
                    return <ListaPersonaggi />
                } else {
                    return <CarouselPersonaggi />
                }
            }
        } else if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'master') {
            if (this.props.visualizzaPg) {
                return <ListaPersonaggi />
            } else {
                return <CarouselPersonaggi />
            }
        }
        return <CarouselPersonaggi />
    }

    visualizzaListaUtenti = () => {
        if (this.props.visualizzaPgAdmin) {
            visualizzaPgAdmin()
        }
        this.props.getListaUtenti();
    }

    visualizzaListMaster = () => {
        this.props.visualizzaListaPg();
    }

    visualizzaPgMaster = () => {
        this.props.visualizzaPgMaster();
    }

    visualizzaListaPg = () => {
        if (this.props.visualizzaPgAdmin || this.props.visualizzaPgAdmin === undefined) {
            visualizzaPgAdmin()
        }
        sessionStorage.setItem('listaUtenti', null)
        this.forceUpdate()
    }

    visualizzaPgAdmin = () => {
        sessionStorage.setItem('listaUtenti', null)
        this.props.visulizzaPgAdmin()
    }

    render() {
        return (
            <div className="corpoComponente">
                <div style={{ paddingTop: "2%", zIndex: "998", color: "#eeaa44", textShadow: "2px 2px black" }}>
                    <h1>Salute {JSON.parse(sessionStorage.getItem('utente')).nominativo}</h1>
                </div>

                <div style={{ zIndex: "999", position: "absolute", left: "10%", height: "80%", width: "20%" }}>
                    <div style={{ height: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                        <img src={avatarEracle} className="tombaJPG rounded-circle ombra" alt="" style={{ width: "80%", height: "auto" }} /> <br /><br />
                        {this.isAdminCreazionePg()}
                        {this.isAdmin()}
                        {this.isStandard()}
                        {this.isVip()}
                        {this.creazioneLocation()}
                        {this.isMasterCreazionePg()}
                        {this.isMasterListe()}

                        <button className="btn btn-dark" style={{ color: "#eeaa44", width: "80%" }} onClick={() => this.props.modificaUtente()}>Modifica Account</button>
                    </div>
                </div>

                <div style={{
                    zIndex: "999", position: "absolute", right: "10%", height: "80%", width: "60%", backgroundColor: "transparent",
                    display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"
                }} align="center">
                    {this.renderListe()}
                </div>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        listaUtenti: state.admin.listaUtenti,
        visualizzaPgAdmin: state.admin.visualizzaPgAdmin,
        visualizzaPg: state.master.visualizzaPg
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListaUtenti: () => dispatch(getListaUtenti()),
        visulizzaPgAdmin: () => dispatch(visualizzaPgAdmin()),
        visualizzaListaPg: () => dispatch(visualizzaListaPg()),
        visualizzaPgMaster: () => dispatch(visualizzaPgMaster()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedaUtente);
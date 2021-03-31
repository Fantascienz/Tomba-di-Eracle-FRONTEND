import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getListaUtenti, visualizzaPgAdmin } from '../../store/azioni/adminActions';
import CarouselPersonaggi from '../personaggio/CarouselPersonaggi';
import ListaPersonaggi from '../personaggio/ListaPersonaggi';
import ListaUtenti from './ListaUtenti';
import avatarEracle from '../../img/eracleCapovolto.png';
import bashImpact from '../../suoni/bash_impact.mp3';
import { browserHistory } from "../.."
import { visualizzaListaPg, visualizzaPgMaster } from '../../store/azioni/masterActions';
import { SoundDiv } from '../utils/SuonoSuImmagine'
import coinFlip from '../../suoni/flip_coin.mp3'

class SchedaUtente extends Component {

    isStandard = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'standard') {
            return (
                <div className="btn-group" role="group" aria-label="Basic example" style={{ color: "#eeaa44", width: "80%" }}>
                    <button className="btn btn-dark" style={{ marginTop: "5px", color: "#eeaa44", width: "80%" }} onClick={() => this.props.creazionePG()}>Crea Personaggio</button>
                </div>
            )
        }
    }

    isVip = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'vip') {
            return (
                <div className="btn-group" role="group" aria-label="Basic example" style={{ color: "#eeaa44", width: "80%" }}>
                    <button className="btn btn-dark" style={{ marginTop: "5px", color: "#eeaa44", width: "50%", fontSize: "0.8vw" }} onClick={() => this.props.creazionePG()}>Crea Umano</button>
                    <button className="btn btn-dark" style={{ marginTop: "5px", color: "#eeaa44", width: "50%", fontSize: "0.8vw", borderRadius: "0 5px 5px 0" }} onClick={() => this.props.creazioneGarou()} >Crea Garou</button>
                </div>
            )
        }
    }

    isMasterCreazionePg = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'master') {
            return (
                <div className="btn-group" role="group" aria-label="Basic example" style={{ color: "#eeaa44", width: "80%" }}>
                    <button className="btn btn-dark" style={{ marginTop: "5px", color: "#eeaa44", width: "33.33%", fontSize: "0.8vw" }} onClick={() => this.props.creazionePG()}>Crea Umano</button>
                    <button className="btn btn-dark" style={{ marginTop: "5px", color: "#eeaa44", width: "33.33%", fontSize: "0.8vw" }} onClick={() => this.props.creazioneGarou()} >Crea Garou</button>
                    <button className="btn btn-dark" style={{ marginTop: "5px", color: "#eeaa44", width: "33.33%", fontSize: "0.8vw", borderRadius: "0 5px 5px 0" }} onClick={() => this.props.creazionePng()} >Crea Png</button>
                </div>
            )
        }
    }

    isMasterListe = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'master') {
            if (this.props.visualizzaPg) {
                return (
                    <React.Fragment>
                        <button className="btn btn-dark" style={{ marginTop: "5px", color: "#eeaa44", width: "80%" }} onClick={() => this.visualizzaPgMaster()}>I Tuoi Personaggi</button> <br />
                    </React.Fragment>
                )
            } else {
                return (
                    <React.Fragment>
                        <button className="btn btn-dark" style={{ marginTop: "5px", color: "#eeaa44", width: "80%" }} onClick={() => this.visualizzaListMaster()}>Lista Personaggi</button> <br />
                    </React.Fragment>
                )
            }
        }
    }

    isAdminCreazionePg = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            return (
                <div className="btn-group" role="group" aria-label="Basic example" style={{ color: "#eeaa44", width: "80%" }}>
                    <button className="btn btn-dark" style={{ marginTop: "5px", color: "#eeaa44", width: "33.33%", fontSize: "0.8vw" }} onClick={() => this.props.creazionePG()}>Crea Umano</button>
                    <button className="btn btn-dark" style={{ marginTop: "5px", color: "#eeaa44", width: "33.33%", fontSize: "0.8vw" }} onClick={() => this.props.creazioneGarou()} >Crea Garou</button>
                    <button className="btn btn-dark" style={{ marginTop: "5px", color: "#eeaa44", width: "33.33%", fontSize: "0.8vw", borderRadius: "0 5px 5px 0" }} onClick={() => this.props.creazionePng()} >Crea Png</button>
                </div>
            )
        }
    }

    isAdmin = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            if (JSON.parse(sessionStorage.getItem('listaUtenti')) !== null) {
                return (
                    <React.Fragment>
                        <button className="btn btn-dark" style={{ marginTop: "5px", color: "#eeaa44", width: "80%" }} onClick={() => this.visualizzaListaPg()}>Lista Personaggi</button>
                        <button className="btn btn-dark" style={{ marginTop: "5px", color: "#eeaa44", width: "80%" }} onClick={() => this.visualizzaPgAdmin()}>I Tuoi Personaggi</button>
                    </React.Fragment>
                )
            } else {
                return (
                    <React.Fragment>
                        <button className="btn btn-dark" style={{ marginTop: "5px", color: "#eeaa44", width: "80%" }} onClick={() => this.visualizzaListaUtenti()}>Lista Utenti</button>
                        <button className="btn btn-dark" style={{ marginTop: "5px", color: "#eeaa44", width: "80%" }} onClick={() => this.visualizzaPgAdmin()}>I Tuoi Personaggi</button>
                    </React.Fragment>
                )
            }

        }
    }

    creazioneLocation = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin' || JSON.parse(sessionStorage.getItem('utente')).tipo === 'master') {
            return (
                <React.Fragment>
                    <div className="btn-group" role="group" aria-label="Basic example" style={{ color: "#eeaa44", width: "80%" }}>
                        <button className="btn btn-dark" style={{ marginTop: "5px", color: "#eeaa44", width: "80%", fontSize: "0.8vw" }} onClick={() => this.creaLocation()}>Crea Location</button>
                        <button className="btn btn-dark" style={{ marginTop: "5px", color: "#eeaa44", width: "80%", fontSize: "0.8vw" }} onClick={() => this.modificaLocation()}>Modifica Location</button>
                    </div>
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

                <div style={{ backgroundColor: "transparent", height: "15%", zIndex: "998", color: "#eeaa44", textShadow: "2px 2px black", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <span className="font-lombardia" style={{ fontSize: "5vw" }}>Salute {JSON.parse(sessionStorage.getItem('utente')).nominativo}</span>
                </div>

                <div style={{ position: "absolute", left: "2%", height: "80%", width: "23%" }}>
                    <div style={{ height: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>

                        {/* -------------FLIP BOX------------------ */}
                        <div className="square-box" style={{ backgroundColor: "transparent", width: "75%" }}>
                            <div className="flip-box square-content">
                                <div className="flip-box-inner" >

                                    <div className="flip-box-front rounded-circle">
                                        <div style={{ width: "auto", height: "100%" }}>

                                            <SoundDiv suono={coinFlip}
                                                contenuto={
                                                    <img className="tombaJPG rounded-circle" src={avatarEracle} alt="Paris" style={{ width: "auto", height: "100%" }} />
                                                }
                                            />
                                            
                                        </div>
                                    </div>

                                    <div className="flip-box-back rounded-circle" style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>

                                        <div style={{ width: "80%", height: "auto" }}>
                                            <u style={{ fontSize: "1.2vw" }}>{JSON.parse(sessionStorage.getItem('utente')).nominativo}</u>
                                            <br /> <br />
                                            <p style={{ fontSize: "1vw" }}>{JSON.parse(sessionStorage.getItem('utente')).email}</p>
                                            <button className="btn btn-dark" style={{ marginTop: "5px", color: "#eeaa44", width: "80%", fontSize: "1vw" }} onClick={() => this.props.modificaUtente()}>Modifica Account</button>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        {/* --------------------------------------- */}

                        <div style={{ width: "100%" }}>
                            {this.isAdminCreazionePg()}
                            {this.isAdmin()}
                            {this.isStandard()}
                            {this.isVip()}
                            {this.isMasterCreazionePg()}
                            {this.isMasterListe()}
                            {this.creazioneLocation()}
                        </div>
                    </div>
                </div>

                <div style={{ zIndex: "999", position: "absolute", right: "5%", height: "80%", width: "70%", backgroundColor: "transparent", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }} align="center">
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
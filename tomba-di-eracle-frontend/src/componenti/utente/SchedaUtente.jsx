import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getListaUtenti, visualizzaPgAdmin } from '../../store/azioni/adminActions';
import CarouselPersonaggi from '../personaggio/CarouselPersonaggi';
import ListaPersonaggi from '../personaggio/ListaPersonaggi';
import ListaUtenti from './ListaUtenti';
import avatarEracle from '../../img/eracleCapovolto.png';
import { browserHistory } from "../.."
import { visualizzaListaPg, visualizzaPgMaster } from '../../store/azioni/masterActions';
import { SoundDiv } from '../utils/SuonoSuImmagine'
import coinFlip from '../../suoni/flip_coin.mp3'
import LocationService from '../../servizi/LocationService';
import { TitoloPagina } from '../layout/TitoloPagina';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AdminService from '../../servizi/AdminService';


class SchedaUtente extends Component {

    componentDidMount() {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin' || JSON.parse(sessionStorage.getItem('utente')).tipo === 'master') {
            LocationService.sessioneAllLocation()
            LocationService.sessioneStanze()
        }




    }

    isStandard = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'standard') {
            return (
                <React.Fragment>


                    {
                        JSON.parse(sessionStorage.getItem('utente')).contatoreUmani === JSON.parse(sessionStorage.getItem('utente')).maxUmani
                            ?
                            <div className="btn-group" role="group" aria-label="Basic example" style={{ color: "#eeaa44", width: "80%" }}>
                                <button className="btn btn-dark btn-utente" onClick={() => withReactContent(Swal).fire({ title: <p>Numero massimo di Umani raggiunto!</p> })} >Crea Personaggio</button>
                            </div>
                            :
                            <div className="btn-group" role="group" aria-label="Basic example" style={{ color: "#eeaa44", width: "80%" }}>
                                <button className="btn btn-dark btn-utente" onClick={() => this.props.creazionePG()}>Crea Personaggio</button>
                            </div>
                    }

                    <div className="btn-group" role="group" aria-label="Basic example" style={{ color: "#eeaa44", width: "80%" }}>
                        <button className="btn btn-dark btn-utente" onClick={() => this.messaggi()}>Contatta un Admin</button>
                    </div>
                </React.Fragment>
            )
        }
    }

    isVip = () => {

        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'vip') {
            return (
                <div className="btn-group" role="group" aria-label="Basic example" style={{ color: "#eeaa44", width: "80%" }}>
                    {JSON.parse(sessionStorage.getItem('utente')).contatoreUmani < JSON.parse(sessionStorage.getItem('utente')).maxUmani ?
                        <button className="btn btn-dark btn-utente-50" onClick={() => this.props.creazionePG()}>Crea Umano</button>
                        :
                        <button className="btn btn-dark btn-utente-50" onClick={() => withReactContent(Swal).fire({ title: <p>Numero massimo di Umani raggiunto!</p> })} >Crea Umano</button>
                    }

                    {(JSON.parse(sessionStorage.getItem('utente')).contatoreLupus === JSON.parse(sessionStorage.getItem('utente')).maxGarou ||
                        JSON.parse(sessionStorage.getItem('utente')).contatoreHomid === JSON.parse(sessionStorage.getItem('utente')).maxGarou) ||
                        JSON.parse(sessionStorage.getItem('utente')).contatoreMetis === JSON.parse(sessionStorage.getItem('utente')).maxGarou

                        ?
                        <button className="btn btn-dark btn-utente-50" style={{ borderRadius: "0 5px 5px 0" }} onClick={() => withReactContent(Swal).fire({ title: <p>Numero massimo di Garou raggiunto!</p> })}  >Crea Garou</button>
                        :
                        <button className="btn btn-dark btn-utente-50" style={{ borderRadius: "0 5px 5px 0" }} onClick={() => this.props.creazioneGarou()}  >Crea Garou</button>
                    }


                </div>
            )

        }
    }


    isMasterCreazionePg = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'master') {

            return (
                <div className="btn-group" role="group" aria-label="Basic example" style={{ color: "#eeaa44", width: "80%" }}>
                    {
                        JSON.parse(sessionStorage.getItem('utente')).contatoreUmani === JSON.parse(sessionStorage.getItem('utente')).maxUmani
                            ?
                            <button className="btn btn-dark btn-utente-33" onClick={() => withReactContent(Swal).fire({ title: <p>Numero massimo di Umani raggiunto!</p> })} >Crea Umano</button>
                            :
                            <button className="btn btn-dark btn-utente-33" onClick={() => this.props.creazionePG()}>Crea Umano</button>
                    }

                    {
                        (JSON.parse(sessionStorage.getItem('utente')).contatoreLupus === JSON.parse(sessionStorage.getItem('utente')).maxGarou ||
                            JSON.parse(sessionStorage.getItem('utente')).contatoreHomid === JSON.parse(sessionStorage.getItem('utente')).maxGarou ||
                            JSON.parse(sessionStorage.getItem('utente')).contatoreMetis === JSON.parse(sessionStorage.getItem('utente')).maxGarou)
                            ?
                            <button className="btn btn-dark btn-utente-33" onClick={() => withReactContent(Swal).fire({ title: <p>Numero massimo di Garou raggiunto!</p> })} >Crea Garou</button>
                            :
                            <button className="btn btn-dark btn-utente-33" onClick={() => this.props.creazioneGarou()} >Crea Garou</button>
                    }
                    <button className="btn btn-dark btn-utente-33" style={{ borderRadius: "0 5px 5px 0" }} onClick={() => this.props.creazionePng()} >Crea Png</button>
                </div>
            )
        }
    }

    isMasterListe = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'master') {
            if (this.props.visualizzaPg) {
                return (
                    <React.Fragment>
                        <button className="btn btn-dark btn-utente" onClick={() => this.visualizzaPgMaster()}>I Tuoi Personaggi</button> <br />
                        <div className="btn-group" role="group" aria-label="Basic example" style={{ color: "#eeaa44", width: "80%" }}>
                            <button className="btn btn-dark btn-utente"  onClick={() => this.messaggi()}>Contatta un Admin</button>
                        </div>
                    </React.Fragment>
                )
            } else {
                return (
                    <React.Fragment>
                        <button className="btn btn-dark btn-utente" onClick={() => this.visualizzaListMaster()}>Lista Personaggi</button> <br />
                        <div className="btn-group" role="group" aria-label="Basic example" style={{ color: "#eeaa44", width: "80%" }}>
                            <button className="btn btn-dark btn-utente" onClick={() => this.messaggi()}>Contatta un Admin</button>
                        </div>
                    </React.Fragment>
                )
            }
        }
    }

    isAdminCreazionePg = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            return (
                <div className="btn-group" role="group" aria-label="Basic example" style={{ color: "#eeaa44", width: "80%" }}>
                    <button className="btn btn-dark btn-utente-33" onClick={() => this.props.creazionePG()}>Crea Umano</button>
                    <button className="btn btn-dark btn-utente-33" onClick={() => this.props.creazioneGarou()} >Crea Garou</button>
                    <button className="btn btn-dark btn-utente-33" style={{ borderRadius: "0 5px 5px 0" }} onClick={() => this.props.creazionePng()} >Crea Png</button>
                </div>
            )
        }
    }

    isAdmin = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            if (JSON.parse(sessionStorage.getItem('listaUtenti')) !== null) {
                return (
                    <React.Fragment>
                        <button className="btn btn-dark btn-utente" onClick={() => this.visualizzaListaPg()}>Lista Personaggi</button>
                        <button className="btn btn-dark btn-utente" onClick={() => this.visualizzaPgAdmin()}>I Tuoi Personaggi</button>
                        {this.props.messaggiUtenti == "no" ? null : <button className="btn btn-dark btn-utente" onClick={() => this.messaggi()}>Messaggi Utenti</button>}
                    </React.Fragment>
                )
            } else {
                return (
                    <React.Fragment>
                        <button className="btn btn-dark btn-utente" onClick={() => this.visualizzaListaUtenti()}>Lista Utenti</button>
                        <button className="btn btn-dark btn-utente" onClick={() => this.visualizzaPgAdmin()}>I Tuoi Personaggi</button>
                        {this.props.messaggiUtenti == "no" ? null : <button className="btn btn-dark btn-utente" onClick={() => this.messaggi()}>Messaggi Utenti</button>}
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
                        <button className="btn btn-dark btn-utente" style={{ fontSize: "0.6vw" }} onClick={() => this.creaLocation()}>Crea Location</button>
                        <button className="btn btn-dark btn-utente" style={{ fontSize: "0.6vw" }} onClick={() => this.creaStanza()}>Crea Stanza</button>
                        <button className="btn btn-dark btn-utente" style={{ fontSize: "0.6vw" }} onClick={() => this.modificaLocation()}>Modifica Location</button>
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
        LocationService.sessioneAllLocation().then(() => {
            browserHistory.push('modificaLocation')
            browserHistory.go()
        })

    }

    creaStanza = () => {
        LocationService.sessioneAllLocation().then(() => {
            browserHistory.push('creazioneStanza')
            browserHistory.go()
        }
        )

    }

    messaggi = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            if (JSON.parse(sessionStorage.getItem('listaUtenti')) == null) {
                AdminService.sessioneListaUtenti().then(() => {
                    browserHistory.push('messaggiUtenti')
                    browserHistory.go()
                }
                )
            } else {
                browserHistory.push('messaggiUtenti')
                browserHistory.go()
            }
        } else {
            browserHistory.push('contattaAdmin')
            browserHistory.go()
        }
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
            <div className="corpoComponente" style={this.props.style}>
                {this.props.titoloPagina == "no" ? <TitoloPagina titolo="" /> : <TitoloPagina titolo={'Salute ' + JSON.parse(sessionStorage.getItem('utente')).nominativo} />}
                
                <div className="pulsantiera-utente centrato">

                    {/* -------------FLIP BOX------------------ */}
                    {this.props.flipBox == "no" ? null :
                        <div className="square-box" style={{ width: "75%" }}>
                            <div className="flip-box square-content">
                                <div className="flip-box-inner" >
                                    <div className="flip-box-front rounded-circle eracle-bg">
                                        <div style={{ width: "auto", height: "100%" }}>
                                            <SoundDiv suono={coinFlip} />
                                        </div>
                                    </div>

                                    <div className="flip-box-back rounded-circle centrato">

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
                    }
                    {/* --------------------------------------- */}

                    <div>
                        {this.props.creazionePersonaggio == "no" ? null : this.isAdminCreazionePg()}
                        {this.isAdmin()}
                        {this.isStandard()}
                        {this.isVip()}
                        {this.props.creazionePersonaggio == "no" ? null : this.isMasterCreazionePg()}
                        {this.isMasterListe()}
                        {this.props.gestioneLocation == "no" ? null : this.creazioneLocation()}
                    </div>
                </div>

                <div className="liste-master centrato" align="center">
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
        visualizzaPg: state.master.visualizzaPg,
        listaUtentiFiltrata: state.admin.listaUtentiFiltrata,

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListaUtenti: () => dispatch(getListaUtenti()),
        visulizzaPgAdmin: () => dispatch(visualizzaPgAdmin()),
        visualizzaListaPg: () => dispatch(visualizzaListaPg()),
        visualizzaPgMaster: () => dispatch(visualizzaPgMaster()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedaUtente);
//IMPORT COMPONENTI ESTERNI--------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { browserHistory } from '../..'
import { io } from 'socket.io-client';
//IMPORT COMPONENTI CUSTOM---------------------------
import Macromappa from '../location/Macromappa'
import { ModalPergamena } from '../utils/ModalComponent'
import { naviga, primoAccesso } from '../../store/azioni/gameActions'
import DettagliPersonaggio from '../personaggio/DettagliPersonaggio'
import { SuonoDirezione } from '../utils/SuonoSuImmagine'
import MinimappaRegolabile from '../location/MinimappaReagolabile'
import GiornoNotte from './GiornoNotte'
import { TabellaStanze } from '../tabelle/TabellaStanze'
import { ChatRoom } from './Chat'
import Meteo from './Meteo'
import MeteoGif from './MeteoGif'
import ModificaMeteoGamepage from '../forms/ModificaMeteoGamepage'
//IMPORT IMMAGINI------------------------------------
import cardGame from '../../img/gameCard.png';
import cardGameUmbra from '../../img/gameCard_umbra.png'
import mappa from '../../img/mappa_icona.png'
// import mappa from '../../img/Mappa-fumo-gif.gif'
import mappaUmbra from '../../img/mappa_icona_umbra.png'
import porta from '../../img/porta_icona.png'
import portaUmbra from '../../img/porta_icona_umbra.png'
import specchio from '../../img/specchio_icona.png'
import specchioUmbra from '../../img/specchio_icona_umbra.png'
import chirottero from '../../img/chirottero_icona.png'
import frecciaSX from '../../img/freccia_sx.png'
import frecciaDX from '../../img/freccia_dx.png'
import frecciaSU from '../../img/freccia_su.png'
import frecciaGIU from '../../img/freccia_giu.png'
import frecciaSXUmbra from '../../img/freccia_sx_umbra.png'
import frecciaDXUmbra from '../../img/freccia_dx_umbra.png'
import frecciaSUUmbra from '../../img/freccia_su_umbra.png'
import frecciaGIUUmbra from '../../img/freccia_giu_umbra.png'
import Scroll from '../../img/scroll.png'
//IMPORT SUONI------------------------------------
import passi from '../../suoni/suono_passi.mp3'
import attraversaUmbra from '../../suoni/attraversa_guanto.mp3'
import srotolaCarta from '../../suoni/flip_card.mp3'
import Chirottero from '../chirotteri/Chirottero'
//IMPORT CSS--------------------------------------
import "./Gamepage.css"
import trasformazionePG from './TrasformazionePG'
import Macromappa2 from '../location/Macromappa2'






class Gamepage extends Component {
    navigazione = (location) => {
        const ENDPOINT = 'http://localhost:5000'
        const personaggio = JSON.parse(sessionStorage.getItem('pgAttivo'));
        const ultimaLocation = JSON.parse(sessionStorage.getItem('ultimaLocation'));
        let socket;
        socket = io(ENDPOINT)

        if (location !== null) {
            socket.emit('uscitaLocation', ({ personaggio, ultimaLocation }), () => {
                socket.off('uscitaLocation');
            })

            socket.emit('entrataNuovaLocation', ({ personaggio, location, ultimaLocation }), () => {
                socket.off('uscitaLocation');
            })
            this.props.naviga(location)
        } else {
            withReactContent(Swal).fire({
                title: <p>Non c'è nulla in questa direzione!</p>
            })
        }
    }

    visualizzazioneStanze = () => {
        withReactContent(Swal).fire({
            html: <TabellaStanze lista={this.props.stanzeLocation} entra={this.navigazione} isKallios={this.isKallios} />
        })
    }

    logout = () => {
        sessionStorage.removeItem('pgAttivo')
        sessionStorage.removeItem('ultimaLocation')
        sessionStorage.removeItem('stanzeLocation')
        browserHistory.push('/paginaUtente')
        browserHistory.go()
    }

    componentDidMount() {
        // this.props.primoAccesso(JSON.parse(sessionStorage.getItem('pgAttivo')))
        var a = JSON.parse(sessionStorage.getItem('pgAttivo'))
        if (a.immagineAttiva == null) {
            a.immagineAttiva = JSON.parse(sessionStorage.getItem('pgAttivo')).urlImmagine
        }
        sessionStorage.setItem('pgAttivo', JSON.stringify(a))

        this.props.primoAccesso(a)
    }

    corniceNavigazione(tipoLocation) {
        if (tipoLocation === "Umbra" || tipoLocation === "Stanza Umbra") {
            return (
                <img src={cardGameUmbra} style={{ position: "relative", zIndex: "1", width: "auto", height: "100%" }} alt="" />
            )
        } else {
            return (
                <img src={cardGame} style={{ position: "relative", zIndex: "1", width: "auto", height: "100%" }} alt="" />
            )
        }
    }

    isKallios = () => {
        if (JSON.parse(sessionStorage.getItem('ultimaLocation')).id === 67 || JSON.parse(sessionStorage.getItem('ultimaLocation')).id === 68) {
            return true;
        }
        return false;
    }


    render() {

        var PG = JSON.parse(sessionStorage.getItem('pgAttivo'));
        var utente = JSON.parse(sessionStorage.getItem('utente'));
        var location = JSON.parse(sessionStorage.getItem('ultimaLocation'));
        var stanze = JSON.parse(sessionStorage.getItem('stanzeLocation'));

        return (
            <div className="gamepage">
                <div className="navigazione-sezione">

                    <div className="navigazione-area">


                        {/* ---Layer IMMAGINE SFONDO--- */}
                        <div className="navigazione-immagine" style={{ backgroundImage: `url('${location.urlImgGiorno}')` }}></div>


                        {/* ---Layer CLIMA--- */}
                        <MeteoGif location={location} />


                        {/* ---Layer CORNICE--- */}
                        {this.corniceNavigazione(location.tipo)}


                        {/* ------------PULSANTI AZIONI------------ */}
                        {/* pulsante: mappa------------------------------------------------- */}
                        <div className="navigazione-link" title="Apri la Minimappa" style={{ left: "6.99%", top: "4.47%", width: "14.67%", height: "9.2%", zIndex: "9999" }}>

                            <ModalPergamena
                                bottone={<div className="icona-minimappa"> </div>}
                                contenuto={
                                    <div className="centrato" style={{ position: "fixed", backgroundColor: "transparent", height: "500px", width: "500px" }}>
                                        {/* {location.tipo.includes("Stanza") && location.urlMinimappa != null ?
                                            <MinimappaRegolabile idLocation="" pxDimensioniMappa="500" lenteDisplay="none" cellePerRiga="2" immagineMinimappa={location.urlMinimappa} />
                                            :
                                            <Macromappa idLocation={location.id} pxDimensioniMappa="500" tipoLocation={location.tipo.includes('Umbra') ? 'Umbra' : null} />
                                        } */}

                                        <Macromappa2 locationSelezionata={parseInt(location.id)} abilitaComandi permettiIngrandimento/>
                                    </div>
                                }
                            />

                            {/* <ModalPergamena
                                bottone={<img className="icona-alta" src={location.tipo === "Umbra" || location.tipo === "Stanza Umbra" ? mappaUmbra : mappa} alt="" />}
                                contenuto={
                                    <div className="centrato" style={{ position: "fixed", backgroundColor: "transparent", height: "500px", width: "500px" }}>
                                        {location.tipo.includes("Stanza") && location.urlMinimappa != null ?
                                            <MinimappaRegolabile idLocation="" pxDimensioniMappa="500" lenteDisplay="none" cellePerRiga="2" immagineMinimappa={location.urlMinimappa} />
                                            :
                                            <Macromappa idLocation={location.id} pxDimensioniMappa="500" tipoLocation={location.tipo.includes('Umbra') ? 'Umbra' : null} />
                                        }
                                    </div>
                                }
                            /> */}

                            {/* <img className="icona-alta" src={location.tipo === "Umbra" || location.tipo === "Stanza Umbra" ? mappaUmbra : mappa} alt="" />

                            <ModalPergamena
                                bottone={<div className="svgCustom" style={{ height: "100%", width: "100%", position: "absolute", top: "0", left: "0" }}>
                                    <svg viewBox="2 4 70 70" style={{ height: "120%", width: "120%" }}>
                                        <path d="M 5 15 C 6.5 16.5 9.5 17 10 16.5 C 22 13 34 17 46 17 C 50.5 17 54 17 53.5 15.5 C 52.5 13 51 13.5 50.5 14 C 50.5 12.5 53 11 54 11 C 63.5 23 58.5 37.5 55.5 54 C 48 62.5 19 51 6.5 56 C 6.5 42.5 4.5 46.5 5 15.5"
                                            fill="transparent" stroke="rgba(255, 0, 0, 0.5)" strokeWidth="3px" vectorEffect="non-scaling-stroke" />
                                    </svg>
                                </div>}
                                contenuto={
                                    <div className="centrato" style={{ position: "fixed", backgroundColor: "transparent", height: "500px", width: "500px" }}>
                                        {location.tipo.includes("Stanza") && location.urlMinimappa != null ?
                                            <MinimappaRegolabile idLocation="" pxDimensioniMappa="500" lenteDisplay="none" cellePerRiga="2" immagineMinimappa={location.urlMinimappa} />
                                            :
                                            <Macromappa idLocation={location.id} pxDimensioniMappa="500" tipoLocation={location.tipo.includes('Umbra') ? 'Umbra' : null} />
                                        }
                                    </div>
                                }
                            /> */}

                        </div>



                        {/* pulsante: porta */}
                        <div className="navigazione-link" style={{ left: "77.65%", top: "4.43%", width: "14.67%", height: "9.2%", zIndex: "9999" }}>
                            {stanze == null || stanze[0] == null ?
                                null
                                :
                                <img className="icona-larga" title="Accedi ad una Stanza della Location" src={location.tipo === "Umbra" || location.tipo === "Stanza Umbra" ? portaUmbra : porta} onClick={() => this.visualizzazioneStanze()} alt="" />
                            }
                        </div>


                        {/* pulsante: specchio------------------------------------------------- */}
                        {PG.umbra ?
                            <SuonoDirezione suono={attraversaUmbra}
                                funzione={{ onend: () => this.navigazione(JSON.parse(sessionStorage.getItem('ultimaLocation')).direzioni.idLocationSpecchio) }}
                                title="Oltrepassa il Guanto" className="icona-larga"
                                src={location.tipo === "Umbra" || location.tipo === "Stanza Umbra" ? specchioUmbra : specchio}
                                style={{ left: "73.23%", top: "82.23%", width: "11.25%", height: "7.04%", zIndex: "9999" }} />
                            : null}


                        {/* pulsante: chirottero------------------------------------------------- */}
                        {PG.chirottero ?
                            <div className="navigazione-link" title="Invia un Chirottero" style={{ left: "14.93%", top: "82.23%", width: "11.25%", height: "7.04%", zIndex: "9999" }}>
                                <ModalPergamena
                                    bottone={<img className="icona-alta" src={chirottero} alt="" />}
                                    contenuto={
                                        <div style={{ position: "fixed", backgroundColor: "transparent", height: "500px", width: "600px" }}>
                                            <Chirottero />
                                        </div>
                                    } />
                            </div>
                            : null}



                        {/* ------------PULSANTI MOVIMENTO------------ */}
                        {/* NORD */}
                        {JSON.parse(sessionStorage.getItem('ultimaLocation')).direzioni.idLocationNord == null ?
                            null
                            :
                            <SuonoDirezione suono={passi}
                                funzione={{ onend: () => this.navigazione(JSON.parse(sessionStorage.getItem('ultimaLocation')).direzioni.idLocationNord) }}
                                title={(JSON.parse(sessionStorage.getItem('ultimaLocation')).tipo.includes("Stanza") ? "Torna" : "Vai") + " a " + JSON.parse(sessionStorage.getItem('ultimaLocation')).direzioni.nomeLocationNord}
                                className="icona-freccia-alta"
                                src={location.tipo === "Umbra" || location.tipo === "Stanza Umbra" ? frecciaSUUmbra : frecciaSU}
                                style={{ left: "44.05%", top: "8.73%", width: "11.25%", height: "8.56%", zIndex: "9999" }} />
                        }

                        {/* EST */}
                        {JSON.parse(sessionStorage.getItem('ultimaLocation')).direzioni.idLocationEst == null ?
                            null
                            :
                            <SuonoDirezione suono={passi}
                                funzione={{ onend: () => this.navigazione(JSON.parse(sessionStorage.getItem('ultimaLocation')).direzioni.idLocationEst) }}
                                title={(JSON.parse(sessionStorage.getItem('ultimaLocation')).tipo.includes("Stanza") ? "Torna" : "Vai") + " a " + JSON.parse(sessionStorage.getItem('ultimaLocation')).direzioni.nomeLocationEst}
                                className="icona-freccia-larga"
                                src={location.tipo === "Umbra" || location.tipo === "Stanza Umbra" ? frecciaDXUmbra : frecciaDX}
                                style={{ left: "79.47%", top: "46.33%", width: "13.07%", height: "7.01%", zIndex: "9999" }} />
                        }

                        {/* SUD */}
                        {JSON.parse(sessionStorage.getItem('ultimaLocation')).direzioni.idLocationSud == null ?
                            null
                            :
                            <SuonoDirezione suono={passi}
                                funzione={{ onend: () => this.navigazione(JSON.parse(sessionStorage.getItem('ultimaLocation')).direzioni.idLocationSud) }}
                                title={(JSON.parse(sessionStorage.getItem('ultimaLocation')).tipo.includes("Stanza") ? "Torna" : "Vai") + " a " + JSON.parse(sessionStorage.getItem('ultimaLocation')).direzioni.nomeLocationSud}
                                className="icona-freccia-alta"
                                src={location.tipo === "Umbra" || location.tipo === "Stanza Umbra" ? frecciaGIUUmbra : frecciaGIU}
                                style={{ left: "44%", top: "85.89%", width: "11.25%", height: "8.09%", zIndex: "9999" }} />
                        }

                        {/* OVEST */}
                        {JSON.parse(sessionStorage.getItem('ultimaLocation')).direzioni.idLocationOvest == null ?
                            null
                            :
                            <SuonoDirezione suono={passi}
                                funzione={{ onend: () => this.navigazione(JSON.parse(sessionStorage.getItem('ultimaLocation')).direzioni.idLocationOvest) }}
                                title={(JSON.parse(sessionStorage.getItem('ultimaLocation')).tipo.includes("Stanza") ? "Torna" : "Vai") + " a " + JSON.parse(sessionStorage.getItem('ultimaLocation')).direzioni.nomeLocationOvest}
                                className="icona-freccia-larga"
                                src={location.tipo === "Umbra" || location.tipo === "Stanza Umbra" ? frecciaSXUmbra : frecciaSX}
                                style={{ left: "6.77%", top: "46.2%", width: "13.07%", height: "7.01%", zIndex: "9999" }} />
                        }


                        {/* ------------SOLE/LUNA------------ */}
                        {(JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin' || JSON.parse(sessionStorage.getItem('utente')).tipo === 'master') ?
                            <div onClick={() => withReactContent(Swal).fire({ html: <ModificaMeteoGamepage ultimaLocation={JSON.parse(sessionStorage.getItem('ultimaLocation'))} /> })}>
                                <GiornoNotte location={location} />
                            </div>
                            :
                            <GiornoNotte location={location} />
                        }


                        {/* ------------METEO------------ */}
                        <Meteo location={location} utente={utente} />


                        {/* ------------NOME LOCATION------------ */}
                        <div className="navigazione-link" title={"Id: " + location.id} style={{ left: "28.75%", top: "79.7%", width: "41.65%", height: "4.97%", zIndex: "9999", backgroundColor: "transparent" }}>
                            <b className="font-Cardinal" style={{}} >{location.nome}</b>

                        </div>
                    </div>
                </div>

                <div className="chat-sezione">

                    {/* CHAT ROOM------------------------------------- */}
                    <div style={{ backgroundColor: "transparent", position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }}>
                        <ChatRoom />
                    </div>

                    {/* AVATAR PG------------------------------------ */}
                    <div title={PG.nominativo} style={{ backgroundColor: "transparent", position: "absolute", top: "5%", right: "5%", width: "100px", height: "100px" }}>
                        <ModalPergamena
                            bottone={<div className="btn-immagine"><DettagliPersonaggio personaggio={PG} altezza="100px" larghezza="auto" immagine={PG.immagineAttiva} dimImmagine="100px auto" /></div>}
                            contenuto={
                                <div className="centrato" style={{ position: "relative", backgroundColor: "transparent", height: "100%", width: "100%" }}>
                                    {/* TRASFORMAZIONE PERSONAGGIO--------------- */}
                                    {trasformazionePG(PG, PG.urlImmagine, PG.urlCrinos, PG.urlLupo, "Homid", "Crinos", "Lupus")}

                                    {/* LOGOUT PERSONAGGIO----------------------- */}
                                    <button className="btn btn-gold" onClick={() => this.logout()} style={{ width: "100%", fontSize: "1.5em" }}><b className="font-lombardia">E S C I</b></button>
                                </div>
                            }
                        />
                    </div>

                </div>
            </div >
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        pgAttivo: state.game.pgAttivo,
        ultimaLocation: state.game.ultimaLocation,
        direzioniLocation: state.game.direzioniRelativeUltimaLocation,
        stanzeLocation: state.game.stanzeLocation,
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        naviga: (location) => dispatch(naviga(location)),
        primoAccesso: (personaggio) => dispatch(primoAccesso(personaggio))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Gamepage)

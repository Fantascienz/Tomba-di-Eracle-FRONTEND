//IMPORT COMPONENTI ESTERNI--------------------------
import React, { Component } from 'react'
import { connect } from 'react-redux'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { browserHistory } from '../..'
//IMPORT COMPONENTI CUSTOM---------------------------
import Macromappa from '../location/Macromappa'
import { ModalComponente } from '../utils/ModalComponent'
import { naviga, primoAccesso } from '../../store/azioni/gameActions'
import DettagliPersonaggio from '../personaggio/DettagliPersonaggio'
import { SuonoDirezione } from '../utils/SuonoSuImmagine'
import MinimappaRegolabile from '../location/MinimappaReagolabile'
import GiornoNotte from './GiornoNotte'
//IMPORT IMMAGINI------------------------------------
import cardGame from '../../img/gameCard.png'
import cardGameUmbra from '../../img/gameCard_umbra.png'
import mappa from '../../img/mappa_icona.png'
import porta from '../../img/porta_icona.png'
import specchio from '../../img/specchio_icona.png'
import chirottero from '../../img/chirottero_icona.png'
import frecciaSX from '../../img/freccia_sx.png'
import frecciaDX from '../../img/freccia_dx.png'
import frecciaSU from '../../img/freccia_su.png'
import frecciaGIU from '../../img/freccia_giu.png'
import Scroll from '../../img/scroll.png'
//IMPORT SUONI------------------------------------
import passi from '../../suoni/suono_passi.mp3'
import attraversaUmbra from '../../suoni/attraversa_guanto.mp3'
import srotolaCarta from '../../suoni/flip_card.mp3'
import { TabellaStanze } from '../tabelle/TabellaStanze'
import { ChatRoom } from './Chat'


class Gamepage extends Component {

    navigazione = (location) => {

        if (location !== null) {
            this.props.naviga(location)
        } else {
            withReactContent(Swal).fire({
                title: <p>Non c'è nulla in questa direzione!</p>
            })
        }
    }

    visualizzazioneStanze = () => {
        withReactContent(Swal).fire({
            html: <TabellaStanze lista={this.props.stanzeLocation} entra={this.navigazione} />
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
        this.props.primoAccesso(JSON.parse(sessionStorage.getItem('pgAttivo')))
    }

    corniceNavigazione(tipoLocation) {
        if (tipoLocation === "Umbra" || tipoLocation === "Stanza Umbra") {
            return (
                <img src={cardGameUmbra} style={{ position: "relative", zIndex: "1", width: "auto", height: "100%" }} />
            )
        } else {
            return (
                <img src={cardGame} style={{ position: "relative", zIndex: "1", width: "auto", height: "100%" }} />
            )
        }
    }


    render() {

        var PG = JSON.parse(sessionStorage.getItem('pgAttivo'));
        var location = JSON.parse(sessionStorage.getItem('ultimaLocation'));
        var stanze = JSON.parse(sessionStorage.getItem('stanzeLocation'));
        var direzioni = JSON.parse(sessionStorage.getItem('direzioniUltimaLocation'));

        return (
            <div style={{ position: "absolute", top: "0", height: "100%", width: "100%", backgroundColor: "dimgray" }}>
                <div className="navigazione-sezione">

                    <div className="navigazione-area">

                        <div className="navigazione-immagine" style={{ backgroundImage: `url('${location.urlImgGiorno}')` }}></div>

                        {this.corniceNavigazione(location.tipo)}

                        {/* ------------PULSANTI AZIONI------------ */}
                        {/* pulsante: mappa------------------------------------------------- */}
                        <div className="navigazione-link" title="Apri la Minimappa" style={{ left: "6.99%", top: "4.47%", width: "14.67%", height: "9.2%", zIndex: "9999" }}>
                            <ModalComponente
                                suono={srotolaCarta}
                                bottone={<img className="icona-alta" src={mappa} />}
                                size='sm'
                                contenuto={
                                    <div className="centrato" >
                                        <div className="centrato" style={{ position: "fixed", backgroundColor: "none" }}>
                                            <img src={Scroll} style={{ height: "800px", transform: "rotate(90deg)" }} />
                                        </div>

                                        <div className="centrato" style={{ position: "fixed", backgroundColor: "transparent", height: "500px", width: "500px" }}>
                                            {location.tipo != "Stanza" ?
                                                <Macromappa idLocation={location.id} pxDimensioniMappa="500" />
                                                :
                                                <MinimappaRegolabile idLocation="" pxDimensioniMappa="500" lenteDisplay="none" cellePerRiga="2" immagineMinimappa={location.urlMinimappa} />}
                                        </div>
                                    </div>
                                } />
                        </div>

                        {/* pulsante: porta */}
                        <div className="navigazione-link" style={{ left: "77.65%", top: "4.43%", width: "14.67%", height: "9.2%", zIndex: "9999" }}>
                            {stanze == null || stanze[0] == null ?
                                <img className="icona-larga-disabled" title="Non ci sono Stanze nella Location" src={porta} />
                                :
                                <img className="icona-larga" title="Accedi ad una Stanza della Location" src={porta} onClick={() => this.visualizzazioneStanze()} />
                            }
                        </div>


                        {/* pulsante: specchio------------------------------------------------- */}
                        {PG.umbra ?
                            <SuonoDirezione suono={attraversaUmbra}
                                funzione={{ onend: () => this.navigazione(JSON.parse(sessionStorage.getItem('ultimaLocation')).direzioni.idLocationSpecchio) }}
                                title="Oltrepassa il Guanto"
                                className="icona-larga"
                                src={specchio}
                                style={{ left: "73.23%", top: "82.23%", width: "11.25%", height: "7.04%", zIndex: "9999" }} />
                            : null}


                        {/* pulsante: chirottero------------------------------------------------- */}
                        {PG.chirottero ?
                            <div className="navigazione-link" title="Invia un Chirottero" style={{ left: "14.93%", top: "82.23%", width: "11.25%", height: "7.04%", zIndex: "9999" }}>
                                <img className="icona-alta" src={chirottero} />
                            </div>
                            : null}



                        {/* ------------PULSANTI MOVIMENTO------------ */}
                        {/* NORD */}
                        {JSON.parse(sessionStorage.getItem('ultimaLocation')).direzioni.idLocationNord == null ?
                            <div className="navigazione-link" title="Nessuna Location a Nord!" style={{ left: "44.05%", top: "8.73%", width: "11.25%", height: "8.56%", zIndex: "9999" }}>
                                <img className="icona-freccia-alta-disabled" src={frecciaSU} />
                            </div>
                            :
                            <SuonoDirezione suono={passi}
                                funzione={{ onend: () => this.navigazione(JSON.parse(sessionStorage.getItem('ultimaLocation')).direzioni.idLocationNord) }}
                                title="Vai a Nord"
                                className="icona-freccia-alta"
                                src={frecciaSU}
                                style={{ left: "44.05%", top: "8.73%", width: "11.25%", height: "8.56%", zIndex: "9999" }} />
                        }

                        {/* EST */}
                        {JSON.parse(sessionStorage.getItem('ultimaLocation')).direzioni.idLocationEst == null ?
                            <div className="navigazione-link" title="Nessuna Location ad Est!" style={{ left: "79.47%", top: "46.33%", width: "13.07%", height: "7.01%", zIndex: "9999" }}>
                                <img className="icona-freccia-larga-disabled" src={frecciaDX} />
                            </div>
                            :
                            <SuonoDirezione suono={passi}
                                funzione={{ onend: () => this.navigazione(JSON.parse(sessionStorage.getItem('ultimaLocation')).direzioni.idLocationEst) }}
                                title="Vai a Est"
                                className="icona-freccia-larga"
                                src={frecciaDX}
                                style={{ left: "79.47%", top: "46.33%", width: "13.07%", height: "7.01%", zIndex: "9999" }} />
                        }

                        {/* SUD */}
                        {JSON.parse(sessionStorage.getItem('ultimaLocation')).direzioni.idLocationSud == null ?
                            <div className="navigazione-link" title="Nessuna Location a Sud!" style={{ left: "44%", top: "85.89%", width: "11.25%", height: "8.09%", zIndex: "9999" }}>
                                <img className="icona-freccia-alta-disabled" src={frecciaGIU} />
                            </div>
                            :
                            <SuonoDirezione suono={passi}
                                funzione={{ onend: () => this.navigazione(JSON.parse(sessionStorage.getItem('ultimaLocation')).direzioni.idLocationSud) }}
                                title="Vai a Sud"
                                className="icona-freccia-alta"
                                src={frecciaGIU}
                                style={{ left: "44%", top: "85.89%", width: "11.25%", height: "8.09%", zIndex: "9999" }} />
                        }

                        {/* OVEST */}
                        {JSON.parse(sessionStorage.getItem('ultimaLocation')).direzioni.idLocationOvest == null ?
                            <div className="navigazione-link" title="Nessuna Location ad Ovest!" style={{ left: "6.77%", top: "46.2%", width: "13.07%", height: "7.01%", zIndex: "9999" }}>
                                <img className="icona-freccia-larga-disabled" src={frecciaSX} />
                            </div>
                            :
                            <SuonoDirezione suono={passi}
                                funzione={{ onend: () => this.navigazione(JSON.parse(sessionStorage.getItem('ultimaLocation')).direzioni.idLocationOvest) }}
                                title="Vai a Ovest"
                                className="icona-freccia-larga"
                                src={frecciaSX}
                                style={{ left: "6.77%", top: "46.2%", width: "13.07%", height: "7.01%", zIndex: "9999" }} />
                        }

                        {/* ------------SOLE/LUNA------------ */}
                        <GiornoNotte />


                        {/* ------------NOME LOCATION------------ */}
                        <div className="navigazione-link" title={"Id: " + location.id} style={{ left: "28.75%", top: "79.7%", width: "41.65%", height: "4.97%", zIndex: "9999", backgroundColor: "transparent" }}>
                            <b className="font-lombardia" style={{ fontSize: "1.5em", color: `${location.tipo == "Umbra" ? "blue" : "black"}` }} >{location.nome}</b>
                        </div>
                    </div>
                </div>

                <div className="chat-sezione">

                    <div style={{ backgroundColor: "yellow", position: "absolute", top: "10px", right: "10px", width: "600px", height: "400px" }}>
                        <ChatRoom />
                    </div>

                    <div title={PG.nominativo} style={{ backgroundColor: "transparent", position: "absolute", bottom: "10px", right: "10px", width: "100px", height: "100px" }}>
                        <ModalComponente
                            suono={srotolaCarta}
                            bottone={<DettagliPersonaggio personaggio={PG} altezza="100px" larghezza="auto" immagine={PG.urlImmagine} dimImmagine="100px auto" />}
                            size='sm'
                            contenuto={
                                <div className="centrato" >
                                    <div className="centrato" style={{ position: "fixed", backgroundColor: "none" }}>
                                        <img src={Scroll} style={{ height: "800px", transform: "rotate(90deg)" }} />
                                    </div>

                                    <div className="centrato" style={{ position: "relative", backgroundColor: "transparent", height: "100%", width: "100%" }}>
                                        <button onClick={() => this.logout()}>Logout</button>
                                    </div>
                                </div>
                            }
                        />
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        pgAttivo: state.game.pgAttivo,
        ultimaLocation: state.game.ultimaLocation,
        direzioniLocation: state.game.direzioniRelativeUltimaLocation,
        stanzeLocation: state.game.stanzeLocation

    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        naviga: (location) => dispatch(naviga(location)),
        primoAccesso: (personaggio) => dispatch(primoAccesso(personaggio))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Gamepage)

import React, { Component } from 'react'
import cardGame from '../../img/gameCard.png'
import cardGameUmbra from '../../img/gameCard_umbra.png'
import mappa from '../../img/mappa_icona.png'
import porta from '../../img/porta_icona.png'
import specchio from '../../img/specchio_icona.png'
import chirottero from '../../img/chirottero_icona.png'
import astro from '../../img/2_lunaGibbosa_decrescente_icona.png'
import frecciaSX from '../../img/freccia_sx.png'
import frecciaDX from '../../img/freccia_dx.png'
import frecciaSU from '../../img/freccia_su.png'
import frecciaGIU from '../../img/freccia_giu.png'
import DettagliPersonaggio from '../personaggio/DettagliPersonaggio'
import { connect } from 'react-redux'
import Macromappa from '../location/Macromappa'
import { ModalComponente } from '../utils/ModalComponent'
import Scroll from '../../img/scroll.png'
import { naviga, primoAccesso } from '../../store/azioni/gameActions'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import { browserHistory } from '../..'


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

    logout = () => {
        sessionStorage.removeItem('pgAttivo')
        sessionStorage.removeItem('ultimaLocation')
        sessionStorage.removeItem('direzioniUltimaLocation')
        browserHistory.push('/paginaUtente')
        browserHistory.go()
    }

    componentDidMount() {
        this.props.primoAccesso(JSON.parse(sessionStorage.getItem('pgAttivo')))
    }

    corniceNavigazione(tipoLocation) {
        if (tipoLocation == "Umbra") {
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
        var direzioni = JSON.parse(sessionStorage.getItem('direzioniUltimaLocation'))
        var locationNORD = direzioni.idLocationNord;
        var locationEST = direzioni.idLocationEst;
        var locationSUD = direzioni.idLocationSud;
        var locationOVEST = direzioni.idLocationOvest;
        var locationUMBRA = direzioni.idLocationSpecchio;

        return (
            <div style={{ position: "absolute", top: "0", height: "100%", width: "100%", backgroundColor: "dimgray" }}>


                <div className="navigazione-sezione">
                    <div className="navigazione-area">

                        <div className="navigazione-immagine" style={{ backgroundImage: `url('${location.urlImgGiorno}')` }}></div>

                        {this.corniceNavigazione(location.tipo)}

                        {/* ------------PULSANTI AZIONI------------ */}
                        {/* pulsante: mappa */}
                        <div className="navigazione-link" title="Apri la Minimappa" style={{ left: "6.99%", top: "4.47%", width: "14.67%", height: "9.2%", zIndex: "9999" }}>
                            <ModalComponente
                                bottone={<img className="icona-alta" src={mappa} />}
                                contenuto={
                                    <div className="centrato" >
                                        <div className="centrato" style={{ position: "fixed", backgroundColor: "none" }}>
                                            <img src={Scroll} style={{ height: "800px", transform: "rotate(90deg)" }} />
                                        </div>

                                        <div className="centrato" style={{ position: "relative", backgroundColor: "transparent", height: "100%", width: "100%" }}>
                                            <Macromappa idLocation={location.id} pxDimensioniMappa="500" lenteDisplay="none" />
                                        </div>
                                    </div>
                                } />
                        </div>

                        {/* pulsante: porta */}
                        <div className="navigazione-link" title="Accedi ad una Stanza della Location" style={{ left: "77.65%", top: "4.43%", width: "14.67%", height: "9.2%", zIndex: "9999" }}>
                            <img className="icona-larga" src={porta} />
                        </div>

                        {/* pulsante: specchio */}
                        <div className="navigazione-link" title="Oltrepassa il Guanto" onClick={() => this.navigazione(locationUMBRA)} style={{ left: "73.23%", top: "82.23%", width: "11.25%", height: "7.04%", zIndex: "9999" }}>
                            <img className="icona-larga" src={specchio} />
                        </div>

                        {/* pulsante: chirottero */}
                        <div className="navigazione-link" title="Invia un Chirottero" style={{ left: "14.93%", top: "82.23%", width: "11.25%", height: "7.04%", zIndex: "9999" }}>
                            <img className="icona-alta" src={chirottero} />
                        </div>


                        {/* ------------PULSANTI MOVIMENTO------------ */}
                        {/* NORD */}
                        <div className="navigazione-link" title="Vai a Nord" onClick={() => this.navigazione(locationNORD)} style={{ left: "44.05%", top: "8.73%", width: "11.25%", height: "8.56%", zIndex: "9999" }}>
                            <img className="icona-freccia-alta" src={frecciaSU} />
                        </div>

                        {/* EST */}
                        <div className="navigazione-link" title="Vai ad Est" onClick={() => this.navigazione(locationEST)} style={{ left: "79.47%", top: "46.33%", width: "13.07%", height: "7.01%", zIndex: "9999" }}>
                            <img className="icona-freccia-larga" src={frecciaDX} />
                        </div>

                        {/* SUD */}
                        <div className="navigazione-link" title="Vai a Sud" onClick={() => this.navigazione(locationSUD)} style={{ left: "44%", top: "85.89%", width: "11.25%", height: "8.09%", zIndex: "9999" }}>
                            <img className="icona-freccia-alta" src={frecciaGIU} />
                        </div>

                        {/* OVEST */}
                        <div className="navigazione-link" title="Vai ad Ovest" onClick={() => this.navigazione(locationOVEST)} style={{ left: "6.77%", top: "46.2%", width: "13.07%", height: "7.01%", zIndex: "9999" }}>
                            <img className="icona-freccia-larga" src={frecciaSX} />
                        </div>


                        {/* ------------SOLE/LUNA------------ */}
                        <div className="navigazione-link" title="Giorno / Notte" style={{ left: "45.97%", top: "2.91%", width: "7.36%", height: "4.97%", zIndex: "9999" }}>
                            <img src={astro} style={{ width: "100%" }} />
                        </div>


                        {/* ------------NOME LOCATION------------ */}
                        <div className="navigazione-link" title={"Id: "+location.id} style={{ left: "28.75%", top: "79.7%", width: "41.65%", height: "4.97%", zIndex: "9999", backgroundColor:"transparent" }}>
                            <b className="font-lombardia" style={{ fontSize: "1.5em", color:`${location.tipo == "Umbra" ? "blue" : "black"}` }} >{location.nome}</b>
                        </div>
                    </div>
                </div>


                <div className="chat-sezione">

                    <div style={{ backgroundColor: "red", position: "absolute", top: "10px", left: "10px", width: "15%", height: "100px" }}>
                    </div>

                    <div style={{ backgroundColor: "yellow", position: "absolute", top: "10px", right: "10px", width: "400px", height: "400px" }}>
                    </div>



                    <div title={PG.nominativo} style={{ backgroundColor: "transparent", position: "absolute", bottom: "10px", right: "10px", width: "100px", height: "100px" }}>

                        <ModalComponente
                            bottone={<DettagliPersonaggio personaggio={PG} altezza="100px" larghezza="auto" immagine={PG.urlImmagine} dimImmagine="100px auto" />}
                            contenuto={
                                <div className="centrato" >
                                    <div className="centrato" style={{ position: "fixed", backgroundColor: "none" }}>
                                        <img src={Scroll} style={{ height: "800px", transform: "rotate(90deg)" }} />
                                    </div>

                                    <div className="centrato" style={{ position: "relative", backgroundColor: "transparent", height: "100%", width: "100%" }}>
                                        <h1>NORD {locationNORD}</h1>
                                        <h1>est {locationEST}</h1>
                                        <h1>sud {locationSUD}</h1>
                                        <h1>ovest {locationOVEST}</h1>
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

    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        naviga: (location) => dispatch(naviga(location)),
        primoAccesso: (personaggio) => dispatch(primoAccesso(personaggio))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Gamepage)

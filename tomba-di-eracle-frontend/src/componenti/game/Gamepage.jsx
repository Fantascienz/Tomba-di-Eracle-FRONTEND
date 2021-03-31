import React, { Component } from 'react'
import cardGame from '../../img/gameCard.png'
import mappa from '../../img/mappa_icona.png'
import porta from '../../img/porta_icona.png'
import specchio from '../../img/specchio_icona.png'
import chirottero from '../../img/chirottero_icona.png'
import astro from '../../img/2_lunaGibbosa_decrescente_icona.png'
import frecciaSX from '../../img/freccia_sx.png'
import frecciaDX from '../../img/freccia_dx.png'
import frecciaSU from '../../img/freccia_su.png'
import frecciaGIU from '../../img/freccia_giu.png'
import avatarEracle from '../../img/eracle.png'
import bashImpact from '../../suoni/bash_impact.mp3'
import { SoundImage, SoundDiv } from '../utils/SuonoSuImmagine'
import DettagliPersonaggio from '../personaggio/DettagliPersonaggio'


class Gamepage extends Component {

    render() {

        const PG = JSON.parse(sessionStorage.getItem('pgAttivo'));

        return (
            <div style={{ position: "absolute", top: "0", height: "100%", width: "100%", backgroundColor: "dimgray" }}>


                <div className="navigazione-sezione">
                    <div className="navigazione-area">

                        <div className="navigazione-immagine" style={{ backgroundImage: "url('https://i.pinimg.com/564x/f9/80/b6/f980b6f06e927d8ccc12fcb4f31295ed.jpg')" }}></div>

                        <img src={cardGame} style={{ position: "relative", zIndex: "9999", width: "auto", height: "100%" }} />

                        {/* ------------PULSANTI AZIONI------------ */}
                        {/* pulsante: mappa */}
                        <div className="navigazione-link" title="Apri la Minimappa" style={{ left: "6.99%", top: "4.47%", width: "14.67%", height: "9.2%", zIndex: "9999" }}>
                            <img className="icona-alta" src={mappa} />
                        </div>

                        {/* pulsante: porta */}
                        <div className="navigazione-link" title="Accedi ad una Stanza della Location" style={{ left: "77.65%", top: "4.43%", width: "14.67%", height: "9.2%", zIndex: "9999" }}>
                            <img className="icona-larga" src={porta} />
                        </div>

                        {/* pulsante: specchio */}
                        <div className="navigazione-link" title="Oltrepassa il Guanto" style={{ left: "73.23%", top: "82.23%", width: "11.25%", height: "7.04%", zIndex: "9999" }}>
                            <img className="icona-larga" src={specchio} />
                        </div>

                        {/* pulsante: chirottero */}
                        <div className="navigazione-link" title="Invia un Chirottero" style={{ left: "14.93%", top: "82.23%", width: "11.25%", height: "7.04%", zIndex: "9999" }}>
                            <img className="icona-alta" src={chirottero} />
                        </div>


                        {/* ------------PULSANTI MOVIMENTO------------ */}
                        {/* NORD */}
                        <div className="navigazione-link" title="Vai a Nord" style={{ left: "44.05%", top: "8.73%", width: "11.25%", height: "8.56%", zIndex: "9999" }}>
                            <img className="icona-freccia-alta" src={frecciaSU} />
                        </div>

                        {/* EST */}
                        <div className="navigazione-link" title="Vai ad Est" style={{ left: "79.47%", top: "46.33%", width: "13.07%", height: "7.01%", zIndex: "9999" }}>
                            <img className="icona-freccia-larga" src={frecciaDX} />
                        </div>

                        {/* SUD */}
                        <div className="navigazione-link" title="Vai a Sud" style={{ left: "44%", top: "85.89%", width: "11.25%", height: "8.09%", zIndex: "9999" }}>
                            <img className="icona-freccia-alta" src={frecciaGIU} />
                        </div>

                        {/* OVEST */}
                        <div className="navigazione-link" title="Vai ad Ovest" style={{ left: "6.77%", top: "46.2%", width: "13.07%", height: "7.01%", zIndex: "9999" }}>
                            <img className="icona-freccia-larga" src={frecciaSX} />
                        </div>


                        {/* ------------SOLE/LUNA------------ */}
                        <div className="navigazione-link" title="Giorno / Notte" style={{ left: "45.97%", top: "2.91%", width: "7.36%", height: "4.97%", zIndex: "9999" }}>
                            <img src={astro} style={{ width: "100%" }} />
                        </div>


                        {/* ------------NOME LOCATION------------ */}
                        <div className="navigazione-link" title="Location" style={{ left: "28.75%", top: "79.7%", width: "41.65%", height: "4.97%", zIndex: "9999" }}>
                            <b>NOME LOCATION</b>
                        </div>
                    </div>
                </div>


                <div className="chat-sezione">

                    <div title={PG.nominativo} style={{backgroundColor:"transparent", position:"absolute", bottom:"10px", right:"10px", width:"100px", height:"100px"}}>
                        <DettagliPersonaggio personaggio={PG} altezza="100px" larghezza="auto" immagine={PG.urlImmagine} dimImmagine="100px auto"/>
                    </div>

                </div>
            </div>
        )
    }
}

export default Gamepage
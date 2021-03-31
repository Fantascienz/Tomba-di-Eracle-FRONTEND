import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPersonaggiUtente } from '../../store/azioni/personaggioActions';
import DettagliPersonaggio from './DettagliPersonaggio';
import Carousel from 'react-bootstrap/Carousel'
import frecciaSX from '../../img/freccia_sx.png';
import frecciaDX from '../../img/freccia_dx.png';
import noPg from '../../img/no-pg.jpg'
import cardFrame from '../../img/cardFrame.png'
import DettagliPersonaggioBack from './DettagliPersonaggioBack';
import { SoundDiv } from '../utils/SuonoSuImmagine'
import cardFlip from '../../suoni/flip_card.mp3'



class CarouselPersonaggi extends Component {

    state = {
        utente: JSON.parse(sessionStorage.getItem('utente'))
    }
    componentDidMount() {
        this.props.getPersonaggiUtente(this.state.utente)
    }

    caroselloPersonaggi() {
        return (
            <Carousel interval={null}
                prevIcon={<img src={frecciaDX} style={{ opacity: "none", marginLeft: "550px" }} height="55px" />} prevLabel={null}
                nextIcon={<img src={frecciaSX} style={{ opacity: "none", marginRight: "550px" }} height="55px" />} nextLabel={null}
                style={{ position: "relative", backgroundColor: "transparent", width: "250px", height: "auto" }}
            >
                {this.props.personaggiUtente && this.props.personaggiUtente.map(personaggio => {
                    return (
                        <Carousel.Item >
                            <div className="flip-box" >

                                <div className="flip-box-inner" >
                                    <div className="flip-box-front" style={{ position: "absolute", top: "0", left: "0%", backgroundColor: "transparent" }}>

                                        <SoundDiv suono={cardFlip}
                                            contenuto={
                                                <DettagliPersonaggio personaggio={personaggio} key={personaggio.id} />
                                            }
                                        />

                                    </div>

                                    <div className="flip-box-back" style={{ position: "relative", top: "0", left: "0%", backgroundImage:"none" }}>
                                        
                                        <div style={{ position: "absolute", top: "0", left: "0%", backgroundColor: "white", opacity:"0.3", width:"100%", height:"100%"  }}>
                                        </div>
                                        <DettagliPersonaggioBack personaggio={personaggio} key={personaggio.id} />
                                    </div>
                                </div>

                            </div>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        )
    }

    cardPersonaggioVuoto() {
        return (
            <div className="card" style={{ backgroundImage: `url(${noPg})`, backgroundSize: "auto 100%", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundColor: "transparent", width: "85%", height: "450px" }}>
                <div style={{ height: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <img src={cardFrame} alt="..." style={{ height: "100%", width: "105%", boxShadow: "0 16px 16px 0 rgba(0,0,0,2), 0 16px 16px 0 rgba(0,0,0,2)" }} />
                    <div className={"card-body"} style={{ position: "absolute", bottom: "5%", width: "100%" }}>
                        <button className="btn-gold-disabled" style={{ width: "100%" }} disabled>Nessun Personaggio Creato</button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                <div style={{ width: "350px" }}>

                    {this.props.personaggiUtente == 0 ? this.cardPersonaggioVuoto() : this.caroselloPersonaggi()}

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        personaggiUtente: state.personaggio.personaggiUtente
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPersonaggiUtente: (utente) => dispatch(getPersonaggiUtente(utente)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarouselPersonaggi);
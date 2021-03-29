import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPersonaggiUtente } from '../../store/azioni/personaggioActions';
import DettagliPersonaggio from './DettagliPersonaggio';
import Carousel from 'react-bootstrap/Carousel'
import frecciaSX from '../../img/freccia_sx.png';
import frecciaDX from '../../img/freccia_dx.png';
import noPg from '../../img/no-pg.jpg'
import cardFrame from '../../img/cardFrame.png'
import { Link } from 'react-router-dom';
import { toGioco } from '../../store/azioni/utenteActions';


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
                prevIcon={<img src={frecciaDX} style={{ opacity: "none", marginLeft: "630px" }} height="55px" />} prevLabel={null}
                nextIcon={<img src={frecciaSX} style={{ opacity: "none", marginRight: "630px" }} height="55px" />} nextLabel={null}>
                {this.props.personaggiUtente && this.props.personaggiUtente.map(personaggio => {
                    return (
                        <Carousel.Item >
                            <DettagliPersonaggio personaggio={personaggio} key={personaggio.id} style={{ position: "absolute", top: "0%", left: "0%", height: "100%", width: "100%", backgroundColor: "white" }} />
                            {this.accessoPG(personaggio)}
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

    accessoPG = (personaggio) => {
        if (JSON.parse(sessionStorage.getItem('pgAttivo')) !== null) {
            if (personaggio.id === JSON.parse(sessionStorage.getItem('pgAttivo')).id) {
                return <button className="btn btn-primary" onClick={() => this.removePGAttivo()}>Esci</button>
            }
        }
        return <button className="btn btn-primary" onClick={() => this.setPGAttivo(personaggio)}>Gioca</button>
    }

    setPGAttivo = (personaggio) => {
        sessionStorage.setItem('pgAttivo', JSON.stringify(personaggio))
        // this.props.history.push('/game')
        // this.props.history.go()
        this.props.gioca()

    }

    removePGAttivo = () => {
        sessionStorage.removeItem('pgAttivo')
        this.props.getPersonaggiUtente()
        this.forceUpdate()
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
        gioca: () => dispatch(toGioco())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarouselPersonaggi);
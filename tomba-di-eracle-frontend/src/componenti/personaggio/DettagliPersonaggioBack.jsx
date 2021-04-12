import React, { Component } from 'react';
import { connect } from 'react-redux';
import cardFrame from '../../img/cardFrame.png';
import LocationService from '../../servizi/LocationService';
import { primoAccesso } from '../../store/azioni/gameActions';
import { toModificaPersonaggio } from '../../store/azioni/personaggioActions';
import { browserHistory } from '../../'


class DettagliPersonaggioBack extends Component {

    modificaPersonaggio = (singleCharacter) => {
        this.props.toModificaPersonaggio(singleCharacter)
    }

    componentDidUpdate() {
        if (this.props.redirect !== '') {
            browserHistory.push(this.props.redirect);
            browserHistory.go()
        }
    }

    viewCard(singleCharacter) {
        return (
            <div className="card" style={{
                backgroundImage: `url(${singleCharacter.urlImmagine}) transform:"scaleX(-1)"`, backgroundSize: "auto 100%", backgroundRepeat: "no-repeat", backgroundPosition: "center center",
                backgroundColor: "transparent", width: "250px", height: "350px",

            }}>
                <div style={{
                    position: "relative", width: "100%", height: "100%",
                    backgroundImage: `url(${cardFrame})`, backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", backgroundPosition: "center center",
                }}>
                    <div style={{ position: "absolute", bottom: "7%", backgroundColor: "transparent", width: "100%", height: "auto" }}>

                        <div className="centrato" style={{ position: "absolute", bottom: "0%", backgroundColor: "transparent", width: "100%", height: "auto" }}>
                            <button className="btn-gold" style={{ width: "80%", height: "15%" }} onClick={() => this.modificaPersonaggio(singleCharacter)}>Modifica</button>
                            <button className="btn-gold" style={{ width: "80%", height: "15%" }} onClick={() => this.setPGAttivo(singleCharacter)}>Gioca</button>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

    setPGAttivo = (personaggio) => {
        LocationService.sessioneStanze()
        this.props.primoAccesso(personaggio)
    }



    render() {
        const { personaggio } = this.props
        return (
            <div>
                {this.viewCard(personaggio)}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ultimaLocation: state.game.ultimaLocation,
        redirect: state.game.redirect
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toModificaPersonaggio: (personaggio) => dispatch(toModificaPersonaggio(personaggio)),
        primoAccesso: (personaggio) => dispatch(primoAccesso(personaggio))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DettagliPersonaggioBack);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import cardFrame from '../../img/cardFrame.png';
import { toModificaPersonaggio } from '../../store/azioni/personaggioActions';
import { toGioco } from '../../store/azioni/utenteActions';


class DettagliPersonaggio extends Component {

    modificaPersonaggio = (singleCharacter) => {
        this.props.toModificaPersonaggio(singleCharacter)
    }

    viewCard(singleCharacter, altezza, larghezza, bottone, immagine, dimImmagine) {
        return (

            <div className="card" style={{
                backgroundColor: "transparent", width: `${larghezza}`, height: `${altezza}`
            }}>

                <div className="card-immagine-personaggio" style={{ backgroundImage: `url('${immagine}')`, backgroundSize: `${dimImmagine}`}}></div>

                <div className="card-immagine-cornice" style={{ backgroundImage: `url(${cardFrame})`}}>
                    {bottone ?
                        <div className="card-posizione-pulsanti">

                            <div className="centrato" style={{ position: "absolute", bottom: "0%", backgroundColor: "transparent", width: "100%", height: "auto" }}>
                                <div className="banner-gold" style={{ width: "80%", height: "10%" }} ><b className="font-lombardia" style={{ fontSize: "1.5vw" }}>{singleCharacter.nominativo}</b></div>
                            </div>

                        </div>
                    : null}
                </div>

            </div>
        )
    }


    setPGAttivo = (personaggio) => {
        sessionStorage.setItem('pgAttivo', JSON.stringify(personaggio))
        this.props.gioca()
    }



    render() {
        const { personaggio } = this.props
        var { altezza } = this.props
        var { larghezza } = this.props
        var { bottone } = this.props
        var { immagine } = this.props
        var { dimImmagine } = this.props
        return (
            <div>
                {this.viewCard(personaggio, altezza, larghezza, bottone, immagine, dimImmagine)}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toModificaPersonaggio: (personaggio) => dispatch(toModificaPersonaggio(personaggio)),
        gioca: () => dispatch(toGioco())
    }
}


export default connect(null, mapDispatchToProps)(DettagliPersonaggio);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import cardFrame from '../../img/cardFrame.png';
import noPg from '../../img/no-pg.jpg';
import { toModificaPersonaggio } from '../../store/azioni/personaggioActions';


class DettagliPersonaggio extends Component {

    modificaPersonaggio = (singleCharacter) => {
        this.props.toModificaPersonaggio(singleCharacter)
    }

    viewCard(singleCharacter) {
        return (
            <div className="card" style={{
                backgroundImage: `url(${singleCharacter.urlImmagine})`, backgroundSize: "auto 100%", backgroundRepeat: "no-repeat", backgroundPosition: "center center",
                backgroundColor: "transparent", width: "250px", height: "350px"
            }}>

                <div style={{
                    position: "relative", width: "100%", height: "100%",
                    backgroundImage: `url(${cardFrame})`, backgroundSize: "100% 100%", backgroundRepeat: "no-repeat", backgroundPosition: "center center",
                }}>
                    <div style={{ position: "absolute", bottom: "7%", width: "100%" }}>
                        <button className="btn-gold" style={{ width: "80%", height: "10%" }} >{singleCharacter.nominativo}</button>
                        <button className="btn-gold" style={{ width: "80%", height: "10%" }} onClick={() => this.modificaPersonaggio(singleCharacter)}>Modifica</button>
                    </div>
                </div>

            </div>
        )
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

const mapDispatchToProps = (dispatch) => {
    return {
        toModificaPersonaggio: (personaggio) => dispatch(toModificaPersonaggio(personaggio))
    }
}


export default connect(null, mapDispatchToProps)(DettagliPersonaggio);
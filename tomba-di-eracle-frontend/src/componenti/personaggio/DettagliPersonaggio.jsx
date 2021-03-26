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
                <div className="card" style={{ backgroundImage: `url(${singleCharacter.urlImmagine})`, backgroundSize: "auto 90%", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundColor: "transparent", width: "85%", height: "450px" }}>
                    <div style={{ height: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                        <img src={cardFrame} alt="..." style={{ height: "100%", width: "105%" }} />
                        <div className={"card-body"} style={{ position: "absolute", bottom: "5%", width:"100%" }}>
                            <button className="btn-gold" style={{width:"100%"}} >{singleCharacter.nominativo}</button>
                            <button className="btn-gold" style={{width:"100%"}} onClick={() =>this.modificaPersonaggio(singleCharacter)}>Modifica</button>
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


export default connect(null,mapDispatchToProps) (DettagliPersonaggio);
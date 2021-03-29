import React, { Component } from 'react';
import cardFrame from '../../img/cardFrame.png';
import noPg from '../../img/no-pg.jpg';


class DettagliPersonaggio extends Component {
    
    viewCard(singleCharacter) {
            return (
                <div className="card" style={{ backgroundImage: `url(${singleCharacter.urlImmagine})`, backgroundSize: "auto 100%", backgroundRepeat: "no-repeat", backgroundPosition: "center center", backgroundColor: "transparent", width: "85%", height: "450px" }}>
                    <div style={{ height: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                        <img src={cardFrame} alt="..." style={{ height: "100%", width: "105%", boxShadow: "0 16px 16px 0 rgba(0,0,0,2), 0 16px 16px 0 rgba(0,0,0,2)" }} />
                        <div className={"card-body"} style={{ position: "absolute", bottom: "3%", width:"100%" }}>
                            <button className="btn-gold" style={{width:"95%"}} >{singleCharacter.nominativo}</button>
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

export default DettagliPersonaggio;
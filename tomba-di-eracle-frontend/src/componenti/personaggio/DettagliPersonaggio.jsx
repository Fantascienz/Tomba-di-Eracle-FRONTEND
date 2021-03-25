import React, { Component } from 'react';

class DettagliPersonaggio extends Component {
    render() {
        const { personaggio } = this.props
        return (
            <div className="card">
                <img src={personaggio.urlImmagine} style={{height: "100px", width: "100px"}} className="card-img-top" alt="Immagine Personaggio" />
                <div className="card-body">
                    <h5 className="card-title">{personaggio.nominativo}</h5>
                    <p className="card-text">Sesso: {personaggio.sesso}</p>
                    <p className="card-text">Razza: {personaggio.razza}</p>
                    <p className="card-text">Rango: {personaggio.rango}</p>
                </div>
                <div className="card-footer">
                    <button className="btn btn-primary">Gioca</button>
                </div>
            </div>
        );
    }
}

export default DettagliPersonaggio;
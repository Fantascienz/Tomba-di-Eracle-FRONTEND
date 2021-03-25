import React, { Component } from 'react';

class SchedaUtente extends Component {
    render() {
        return (
            <div className="corpoComponente">
                <h1>Salute {JSON.parse(sessionStorage.getItem('utente')).nominativo}</h1>
                <div className="row">
                    <div className="col-md-4">
                        <img src="https://cdn.discordapp.com/attachments/823502374106038273/823573400621678592/Simbolo_TombaDiEracle.jpg" className="tombaJPG rounded-circle" alt="" style={{ boxShadow: "0 24px 32px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)" }} /> <br /><br />
                        <button className="btn btn-dark" style={{ color: "#eeaa44", width: "200px" }} onClick={() => this.props.creazionePG()}>Crea Personaggio</button> <br /><br />
                        <button className="btn btn-dark" style={{ color: "#eeaa44", width: "200px" }} onClick={() => this.props.modificaUtente()}>Modifica Account</button>
                    </div>
                    <div className="col-md-8"></div>
                </div>
            </div>
        );
    }
}

export default SchedaUtente;
import React, { Component } from 'react';
import ListaPersonaggio from '../personaggio/ListaPersonaggio';

class SchedaUtente extends Component {

    isAdmin = () => {
        if (this.props.admin === true) {
            return (
                <div>
                    <button className="btn btn-dark" style={{ color: "#eeaa44", width: "200px" }} onClick={() => this.props.creazionePG()}>Lista Utenti</button> <br /><br />
                </div>
            )
        }
    }

    render() {
        return (
            <div className="corpoComponente">
                <h1>Salute {JSON.parse(sessionStorage.getItem('utente')).nominativo} </h1>
                <div className="row">
                    <div className="col-md-4">
                        <img src="https://cdn.discordapp.com/attachments/823502374106038273/823573400621678592/Simbolo_TombaDiEracle.jpg" className="tombaJPG rounded-circle" alt="" style={{ boxShadow: "0 24px 32px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)" }} /> <br /><br />
                        {this.isAdmin()}
                        <button className="btn btn-dark" style={{ color: "#eeaa44", width: "200px" }} onClick={() => this.props.creazionePG()}>Crea Personaggio</button> <br /><br />
                        <button className="btn btn-dark" style={{ color: "#eeaa44", width: "200px" }} onClick={() => this.props.modificaUtente()}>Modifica Account</button>
                    </div>
                    <div className="col-md-8"><ListaPersonaggio/></div>
                </div>
            </div>
        );
    }
}

export default SchedaUtente;
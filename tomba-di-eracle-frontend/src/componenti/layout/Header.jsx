import React, { Component } from 'react';
import titolo from "../../img/titolo.png"

class Header extends Component {

    eseguiLogout = () => {
        sessionStorage.clear();
    }

    visualizzaLinkHeader() {
        if(sessionStorage.getItem('utente') != null){
            return(
                <div className="row no-gutters" style={{height:"30%", position:"absolute", left:"0%", bottom:"0%", width:"103%"}}>
                    <div className="col header-link testo-sinistra" >
                        <a href="/paginaUtente"><b>Home</b></a>
                    </div>

                    <div className="col">
                    </div>


                    <div className="col header-link testo-destra">
                        <a href="/" onClick={() => this.eseguiLogout()}><b>Logout</b></a>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="row no-gutters" style={{height:"30%", position:"absolute", left:"0%", bottom:"0%", width:"103%"}}>
                    <div className="col header-link testo-sinistra">
                        <a href="/"><b>Login</b></a>
                    </div>

                    <div className="col">
                    </div>

                    <div className="col header-link testo-destra">
                        <a href="/registrazione"><b>Registrazione</b></a>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="bg-dark" style={{ position:"fixed", top:"0%", color:"#b30000", height:"10%", width:"100%" }}>
                {this.visualizzaLinkHeader()}
                <div id="titolo-home"></div>
            </div>
        );
    }
}

export default Header;
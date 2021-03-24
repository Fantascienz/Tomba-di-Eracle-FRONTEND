import React, { Component } from 'react';
import titolo from "../../img/titolo.png"

class Header extends Component {

    eseguiLogout = () => {
        sessionStorage.clear();
    }

    visualizzaLinkHeader() {
        if(sessionStorage.getItem('utente') != null){
            return(
                <div className="row" style={{zIndex:"9999", position:"absolute", bottom:"0%", width:"100%"}}>
                    <div className="col-sm-2">
                        <a href="/paginaUtente"><b>PAGINA UTENTE</b></a>
                    </div>

                    <div className="col-sm-8">
                    </div>


                    <div className="col-sm-2">
                        <a href="/" onClick={() => this.eseguiLogout()}><b>LOGOUT</b></a>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="row" style={{zIndex:"9999", position:"absolute", bottom:"5%", width:"100%"}}>
                    <div className="col-sm-2">
                        <a href="/"><b>LOGIN</b></a>
                    </div>

                    <div className="col-sm-8">
                    </div>

                    <div className="col-sm-2">
                        <a href="/registrazione"><b>REGISTRAZIONE</b></a>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="bg-dark" style={{ position:"fixed", top:"0%", color:"#b30000", height:"10%", width:"100%" }}>
                {this.visualizzaLinkHeader()}
                <div style={{ position:"fixed", width:"100%", height:"10%", backgroundImage:`url('${titolo}')`, backgroundSize:"auto 85%", backgroundPosition:"center center", backgroundRepeat: "no-repeat"}}>
                </div>
            </div>
        );
    }
}

export default Header;
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
                    <div className="col header-link">
                        <a href="/paginaUtente"><b>PAGINA UTENTE</b></a>
                    </div>

                    <div className="col">
                    </div>


                    <div className="col header-link">
                        <a href="/" onClick={() => this.eseguiLogout()}><b>LOGOUT</b></a>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="row no-gutters" style={{height:"30%", position:"absolute", left:"0%", bottom:"0%", width:"103%"}}>
                    <div className="col header-link">
                        <a href="/"><b>LOGIN</b></a>
                    </div>

                    <div className="col">
                    </div>

                    <div className="col header-link">
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
                <div style={{ position:"absolute", width:"100%", height:"70%", backgroundImage:`url('${titolo}')`, backgroundSize:"auto 6.5vmin", backgroundPosition:"center center", backgroundRepeat: "no-repeat"}}>
                </div>
            </div>
        );
    }
}

export default Header;
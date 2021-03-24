import React, { Component } from 'react';

class Header extends Component {

    visualizzaLinkHeader() {
        if(sessionStorage.getItem('utente') != null){
            return(
                <div className="row">
                    <div className="col-sm-4">
                        <b>USERPAGE</b>
                    </div>
                    <div className="col-sm-4">
                        <b>MODIFICA UTENTE</b>
                    </div>
                    <div className="col-sm-4">
                        <b>LOGOUT</b>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="row">
                    <div className="col-sm-6">
                        <b>LOGIN</b>
                    </div>
                    <div className="col-sm-6">
                        <b>REGISTRAZIONE</b>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="bg-dark" style={{ position:"fixed", top:"0%", color:"#b30000", height:"10%", width:"100%" }}>
                <h1>TOMBA DI ERACLE</h1>
                {this.visualizzaLinkHeader()}
            </div>
        );
    }
}

export default Header;
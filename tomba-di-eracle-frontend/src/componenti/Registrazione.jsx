import React, { Component } from 'react';

class Registrazione extends Component {

    state = {
        nome: '',
        cognome: '',
        email: '',
        psw: '',
        psw2: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        return (
            <div style={{ position: "fixed", top: "10%", width: "100%", height: "85%" }}>
                <div className="container" style={{ marginTop: "5%" }}>
                    <h1>Registrazione</h1>
                    <br />
                    <div style={{ align: "center" }}>
                        <form>
                            <div className="row">
                                <h3>Nominativo</h3>
                                <div className="col-md-3"></div>
                                <div className="form-group col-md-3">
                                    <input type="text" id="nome" placeholder="Nome" className="form-control" onChange={this.handleChange} /> <br />
                                </div>
                                <div className="form-group col-md-3">
                                    <input type="text" id="cognome" placeholder="Cognome" className="form-control" onChange={this.handleChange}/> <br />
                                </div>
                            </div>
                            <div className="row">
                                <h3>Email</h3>
                                <div className="col-md-3"></div>
                                <div className="form-group col-md-6">
                                    <input type="email" id="email" placeholder="Email" className="form-control" onChange={this.handleChange}/> <br />
                                </div>
                            </div>
                            <div className="row">
                                <h3>Password</h3>
                                <div className="col-md-3"></div>
                                <div className="form-group col-md-3">
                                    <input type="password" id="psw" placeholder="Password" className="form-control" onChange={this.handleChange} /> <br />
                                </div>
                                <div className="form-group col-md-3">
                                    <input type="password" id="psw2" placeholder="Conferma Password" className="form-control" onChange={this.handleChange} /> <br />
                                </div>
                            </div>
                            <button className="btn btn-primary"type="submit">Registrati</button>
                        </form>
                    </div >
                </div>
            </div>
        );
    }
}

export default Registrazione;
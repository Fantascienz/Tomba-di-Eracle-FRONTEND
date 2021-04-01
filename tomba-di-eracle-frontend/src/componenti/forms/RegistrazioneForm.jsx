import React, { Component } from 'react';

class RegistrazioneForm extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <div className="row">
                        <h3>Nominativo</h3>
                        <div className="col-md-3"></div>
                        <div className="form-group col-md-3">
                            <input type="text" id="nome" placeholder="Nome" className="form-control" onChange={this.props.handleChange} /> <br />
                        </div>
                        <div className="form-group col-md-3">
                            <input type="text" id="cognome" placeholder="Cognome" className="form-control" onChange={this.props.handleChange} /> <br />
                        </div>
                    </div>
                    <div className="row">
                        <h3>Email</h3>
                        <div className="col-md-3"></div>
                        <div className="form-group col-md-6">
                            <input type="email" id="email" placeholder="Email" className="form-control" onChange={this.props.handleChange} /> <br />
                        </div>
                    </div>
                    <div className="row">
                        <h3>Password</h3>
                        <div className="col-md-3"></div>
                        <div className="form-group col-md-3">
                            <input type="password" id="psw" placeholder="Password" className="form-control" onChange={this.props.handleChange} /> <br />
                        </div>
                        <div className="form-group col-md-3">
                            <input type="password" id="psw2" placeholder="Conferma Password" className="form-control" onChange={this.props.handleChange} /> <br />
                        </div>
                    </div>
                    <button className="btn btn-dark" type="submit">Registrati</button>
                </form>
            </div>
        );
    }
}

export default RegistrazioneForm;
import React, { Component } from 'react';

class ModificaUtenteForm extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <div className="row">
                        <h3>Nuovo Nominativo</h3>
                        <div className="col-md-3"></div>
                        <div className="form-group col-md-6">
                            <input type="text" id="nominativo" placeholder={this.props.utente.nominativo + '(Lascia vuoto per mantenere il vecchio nominativo)'} className="form-control" onChange={this.props.handleChange} /> <br />
                        </div>
                    </div>
                    <div className="row">
                        <h3>Nuova Email</h3>
                        <div className="col-md-3"></div>
                        <div className="form-group col-md-6">
                            <input type="email" id="email" placeholder={this.props.utente.email + '(Lascia vuoto per mantenere la vecchia email)'} className="form-control" onChange={this.props.handleChange} /> <br />
                        </div>
                    </div>
                    <div className="row">
                        <h3>Nuova Password</h3>
                        <div className="col-md-3"></div>
                        <div className="form-group col-md-6">
                            <input type="password" id="psw" placeholder="Password (Lascia vuoto per mantenere la vecchia password)" className="form-control" onChange={this.props.handleChange} /> <br />
                        </div>
                    </div>
                    <div className="row">
                        <h3>Vecchia password</h3>
                        <div className="col-md-3"></div>
                        <div className="form-group col-md-6">
                            <input type="password" id="pswVecchia" placeholder="Password per confermare" className="form-control" onChange={this.props.handleChange} /> <br />
                        </div>
                    </div>
                    <button className="btn btn-dark" type="submit">Modifica</button>
                </form>
            </div>
        );
    }
}

export default ModificaUtenteForm;
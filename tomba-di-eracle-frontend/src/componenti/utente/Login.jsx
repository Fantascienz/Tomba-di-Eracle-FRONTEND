import React, { Component } from "react";
import { connect } from "react-redux";
import UtenteService from "../../servizi/UtenteService";
import { login } from "../../store/azioni/utenteActions";

class Login extends Component {

    state = {
        email: '',
        psw: ''
    }

    componentDidUpdate() {
        if (this.props.redirect !== '' && this.props.redirect !== '/') {
            this.props.history.push(this.props.redirect)
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

    }

    handleSubmit = (e) => {
        e.preventDefault();
         if(UtenteService.validaLogin(this.state)) {
            this.props.login(this.state)
         } else {
             alert('Campi obbligatori!')
         }

         this.setState({
             email: '',
             psw: ''
         })
        
        
    }

    render() {
        return (
            <div>

                <Header />

                <div className="corpoComponente">
                    <div style={{ height: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>

                        <form onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="input-group mb-3">
                                    <span className="input-group-text" style={{width:"20%"}}>Email</span>
                                    <input className="form-control" type="email" id="email" value={this.state.email} onChange={this.handleChange} />
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text" style={{width:"20%"}}>Password</span>
                                    <input className="form-control" type="password" id="psw" value={this.state.psw} onChange={this.handleChange} />
                                </div>
                            </div>
                            <button className="btn btn-dark">Entra</button>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (utente) => dispatch(login(utente))
    }
}

const mapStateToProps = (state) => {
    return {
        redirect: state.utente.redirect
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Login);

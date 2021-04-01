import React, { Component } from "react";
import { connect } from "react-redux";
import UtenteService from "../../servizi/UtenteService";
import { login } from "../../store/azioni/utenteActions";
import Header from "../layout/Header";
import withReactContent from "sweetalert2-react-content"
import Swal from "sweetalert2"
import bashImpact from "../../suoni/bash_impact.mp3"
import brokenShield from "../../img/broken_shield.png"
import LoginForm from "../forms/LoginForm";

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
        if (UtenteService.validaLogin(this.state)) {
            this.props.login(this.state)
        } else {
            withReactContent(Swal).fire({

                html: <div style={{ height: "400px", backgroundColor: "transparent", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <b style={{ color: "#eeaa44", backgroundColor: "transparent", fontSize: "30px", width: "150%" }}>Tutti i campi sono obbligatori!</b>
                    <audio src={bashImpact} autoPlay />
                </div>,

                background: `rgba(0, 0, 0, 0.4) url('${brokenShield}') no-repeat fixed center center `,

                confirmButtonColor: "#212529",

                confirmButtonText: <b style={{ color: "#b30000" }}>Ok</b>
            })
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
                        <LoginForm state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React, { Component } from "react";
import { connect } from "react-redux";
import { login } from "../../store/azioni/utenteActions";

class Login extends Component {

    state = {
        email: '',
        psw: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

    }

    handleSubmit = (e) => {
        this.props.login(this.state)
    }

    render() {
        return (
            <div>
                <div className="row">
                    <form onSubmit={this.handleSubmit}>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Email</span>
                            <input className="form-control" type="email" id="email" value={this.state.email} onChange={this.handleChange} />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text">Password</span>
                            <input className="form-control" type="password" id="psw" value={this.state.psw} onChange={this.handleChange} />
                        </div>
                        <button className="btn btn-primary">Entra</button>
                    </form>
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

export default connect(null, mapDispatchToProps) (Login);

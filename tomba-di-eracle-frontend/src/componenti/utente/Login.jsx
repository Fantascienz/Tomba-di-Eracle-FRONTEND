import React, { Component } from "react";

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

export default Login;

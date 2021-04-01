import React, { Component } from 'react';

class LoginForm extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <div className="row">
                        <div className="input-group mb-3">
                            <span className="input-group-text" style={{ width: "20%" }}>Email</span>
                            <input className="form-control" type="email" id="email" value={this.props.state.email} onChange={this.props.handleChange} />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text" style={{ width: "20%" }}>Password</span>
                            <input className="form-control" type="password" id="psw" value={this.props.state.psw} onChange={this.props.handleChange} />
                        </div>
                    </div>
                    <button className="btn btn-dark">Entra</button>
                </form>

            </div>
        );
    }
}

export default LoginForm;
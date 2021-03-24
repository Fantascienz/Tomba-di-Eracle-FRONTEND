class Login extends Component {
    
    state = {
        email: '',
        psw: ''
    }

    render() {
        return (
            <div>
                <div className="row">
                    <form>
                        <div className="input-group mb-3">
                            <span className="input-group-text">Email</span>
                            <input className="form-control" type="email" id="email" value={this.state.email} onChange={this.handleChange} />
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

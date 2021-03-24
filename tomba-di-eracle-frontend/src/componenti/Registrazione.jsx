import React, { Component } from 'react';

class Registrazione extends Component {

    state = {

    }

    render() {
        return (
            <React.Fragment>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="nome">Nome</label>
                        <input type="text" id="nome" className="form-control" placeholder="Nome"/>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default Registrazione;
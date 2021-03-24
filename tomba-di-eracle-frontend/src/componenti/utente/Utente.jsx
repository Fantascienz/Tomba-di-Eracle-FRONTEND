import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../componenti/layout/Header'

class Utente extends Component {
    
    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="corpoComponente">
                    <h1>{this.props.utente.nominativo}</h1>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        utente: state.utente.utente
    }
}

export default connect(mapStateToProps)(Utente);
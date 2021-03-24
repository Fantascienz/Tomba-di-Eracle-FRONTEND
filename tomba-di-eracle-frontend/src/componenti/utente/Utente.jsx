import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../componenti/layout/Header'

class Utente extends Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <div>

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
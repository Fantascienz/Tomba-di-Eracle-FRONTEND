import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../componenti/layout/Header'
import { toModificaUtente } from '../../store/azioni/utenteActions';

class Utente extends Component {

    componentDidUpdate() {
        console.log(this.props.redirect)
        if(this.props.redirect !== '' && this.props.redirect !== '/paginaUtente') {
            this.props.history.push(this.props.redirect)
        }
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className="corpoComponente">
                    <h1>Salute {this.props.utente.nominativo}</h1>
                    <div className="row">
                        <div className="col-md-4">
                            <img src="https://cdn.discordapp.com/attachments/823502374106038273/823573400621678592/Simbolo_TombaDiEracle.jpg" className="tombaJPG rounded-circle" alt="" /> <br /><br />
                            <button className="btn btn-dark" style={{ color: "#eeaa44" }}>Crea Personaggio</button> <br /><br />
                            <button className="btn btn-dark" style={{ color: "#eeaa44" }} onClick={() => this.props.toModificaUtente()}>Modifica Account</button>
                        </div>
                        <div className="col-md-8">

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        utente: state.utente.utente,
        redirect: state.utente.redirect
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        toModificaUtente: () => dispatch(toModificaUtente())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Utente);
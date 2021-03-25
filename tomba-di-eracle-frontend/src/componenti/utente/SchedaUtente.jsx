import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getListaUtenti } from '../../store/azioni/adminActions';
import ListaPersonaggio from '../personaggio/ListaPersonaggio';
import ListaUtenti from './ListaUtenti';

class SchedaUtente extends Component {

    isAdmin = () => {
        if (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') {
            if (JSON.parse(sessionStorage.getItem('listaUtenti')) !== null) {
                return (
                    <div>
                        <button className="btn btn-dark" style={{ color: "#eeaa44", width: "200px" }} onClick={() => this.visualizzaListaPg()}>Lista Personaggi</button> <br /><br />
                    </div>
                )
            } else {
                return (
                    <div>
                        <button className="btn btn-dark" style={{ color: "#eeaa44", width: "200px" }} onClick={() => this.visualizzaListaUtenti()}>Visualizza Utenti</button> <br /><br />
                    </div>
                )
            }
        }
    }

    renderListe = () => {
        if (JSON.parse(sessionStorage.getItem('listaUtenti')) !== null) {
            return <ListaUtenti lista={JSON.parse(sessionStorage.getItem('listaUtenti'))} />
        }
        return <ListaPersonaggio />
    }

    visualizzaListaUtenti = () => {
        this.props.getListaUtenti();
    }

    visualizzaListaPg = () => {
        sessionStorage.setItem('listaUtenti',null)
        this.forceUpdate()
    }

    componentDidUpdate() {
        // alert('up')
        // if (this.props.redirect !== '' && this.props.redirect !== '/paginaUtente') {
        //     this.props.history.push(this.props.redirect)
        //     this.props.history.go()
        // }
    }

    render() {
        return (
                <div className="corpoComponente">
                    <div style={{paddingTop:"2%", zIndex:"998"}}>
                        <h1>Salute {JSON.parse(sessionStorage.getItem('utente')).nominativo}</h1>
                    </div>
                    
                    <div style={{zIndex:"999", position:"absolute", left:"10%", height:"80%", width:"20%"}}>
                            <div style={{ height: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                                <img src="https://cdn.discordapp.com/attachments/823502374106038273/823573400621678592/Simbolo_TombaDiEracle.jpg" className="tombaJPG rounded-circle" alt="" style={{ boxShadow: "0 24px 32px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19)", width:"80%", height:"auto" }} /> <br /><br />
                                {this.isAdmin()}
                                <button className="btn btn-dark" style={{ color: "#eeaa44", width: "80%" }} onClick={() => this.props.creazionePG()}>Crea Personaggio</button> <br /><br />
                                <button className="btn btn-dark" style={{ color: "#eeaa44", width: "80%" }} onClick={() => this.props.modificaUtente()}>Modifica Account</button>
                            </div>
                    </div>

                    <div>
                        {this.renderListe()}
                    </div>
                </div>
            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listaUtenti: state.admin.listaUtenti,
        // redirect: state.admin.redirect
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListaUtenti: () => dispatch(getListaUtenti())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedaUtente);
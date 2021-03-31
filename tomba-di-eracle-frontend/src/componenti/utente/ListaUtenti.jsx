import React, { Component } from 'react';
import { connect } from 'react-redux';
import { modificaTipoUtente, getListaUtenti, modificaMassimali } from '../../store/azioni/adminActions';

class ListaUtenti extends Component {

    state = {
        nuovoTipo: 'standard',
        nuovoMaxUmani: '',
        nuovoMaxGarou: '',
        nuovoMaxPng: ''
    }

    formModificaTipo = (utente) => {
        if (utente.id !== JSON.parse(sessionStorage.getItem('utente')).id) {
            return (
                <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                    <select name="nuovoTipo" id="nuovoTipo" onChange={this.handleChange} style={{width:"100px"}}>
                        <option selected="selected" value="standard">Standard</option>
                        <option value="vip">VIP</option>
                        <option value="master">Master</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button className="btn btn-secondary btn-sm" onClick={() => this.modificaTipo(utente)} style={{width:"100px"}}>Modifica</button>
                </div>
            )
        }
    }

    formModificaUmani = (utente) => {
        return (
            <React.Fragment>
                <input type="number" placeholder="Umani" min="0" id="nuovoMaxUmani" onChange={this.handleChange} style={{width:"100px"}}/>
                <button className="btn btn-secondary btn-sm" onClick={() => this.modificaUmani(utente)} style={{width:"100px"}}>Modifica</button>
            </React.Fragment>
        )
    }

    formModificaGarou = (utente) => {
        return (
            <React.Fragment>
                <input type="number" placeholder="Garou" min="0" id="nuovoMaxGarou" onChange={this.handleChange} style={{width:"100px"}}/>
                <button className="btn btn-secondary btn-sm" onClick={() => this.modificaGarou(utente)} style={{width:"100px"}}>Modifica</button>
            </React.Fragment>
        )
    }

    formModificaPng = (utente) => {
        return (
            <React.Fragment>
                <input type="number" placeholder="PNG" min="0" id="nuovoMaxPng" onChange={this.handleChange} style={{width:"100px"}}/>
                <button className="btn btn-secondary btn-sm" onClick={() => this.modificaPng(utente)} style={{width:"100px"}}>Modifica</button>
            </React.Fragment>
        )
    }

    tastoBan = (utente) => {
        if (utente.id !== JSON.parse(sessionStorage.getItem('utente')).id) {
            return (
                <button className="btn btn-danger btn-sm" onClick={() => this.ban(utente)} >{utente.tipo === 'bannato' ? 'Sbanna' : 'Banna'}</button>
            )
        }
    }

    modificaUmani = (utente) => {
        utente.maxUmani = this.state.nuovoMaxUmani
        this.props.modificaMassimali(utente)
        this.props.getListaUtenti()
    }

    modificaGarou = (utente) => {
        utente.maxGarou = this.state.nuovoMaxGarou
        this.props.modificaMassimali(utente)
        this.props.getListaUtenti()
    }

    modificaPng = (utente) => {
        utente.maxPng = this.state.nuovoMaxPng
        this.props.modificaMassimali(utente)
        this.props.getListaUtenti()
    }

    modificaTipo = (utente) => {
        this.props.modificaTipo(utente, this.state.nuovoTipo)
        this.props.getListaUtenti()
    }

    ban = (utente) => {
        this.props.modificaTipo(utente, utente.tipo === 'bannato' ? 'standard' : 'bannato')
        this.props.getListaUtenti()
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="table-responsive ombra" style={{ width: "100%", backgroundColor: "white" }}>
                    <table className="table align-middle table-hover table-sm caption-top">
                        <caption>Lista Utenti</caption>
                        <thead className="table-dark align-middle" align="center">
                            <tr style={{color:"#eeaa44"}}>
                                <th>ID</th>
                                <th>Nominativo</th>
                                <th>Email</th>
                                <th>Tipo</th>
                                <th>Personaggi</th>
                                <th colspan="3">Personaggi Creabili</th>
                                <th>Data di Registrazione</th>
                                <th>Modifica Tipo</th>
                                <th colspan="3">Modifica Personaggi Creabili</th>
                                {/* <th>Modifica MAX Garou</th>
                                <th>Modifica MAX PNG</th> */}
                                <th>Ban</th>
                            </tr>
                            <tr style={{color:"#eeaa44"}}>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>Umani</th>
                                <th>Garou</th>
                                <th>PNG</th>
                                <th></th>
                                <th></th>
                                <th>Max Umani</th>
                                <th>Max Garou</th>
                                <th>Max PNG</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody align="center">
                            {this.props.lista.map(utente =>
                                <tr key={utente.id}>
                                    <td>{utente.id}</td>
                                    <td>{utente.nominativo}</td>
                                    <td>{utente.email}</td>
                                    <td>{utente.tipo}</td>
                                    <td>{utente.numeroPersonaggi}</td>
                                    <td>{utente.maxUmani}</td>
                                    <td>{utente.maxGarou}</td>
                                    <td>{utente.maxPng}</td>
                                    <td>{utente.dataRegistrazione}</td>
                                    <td>{this.formModificaTipo(utente)}</td>
                                    <td>{this.formModificaUmani(utente)}</td>
                                    <td>{this.formModificaGarou(utente)}</td>
                                    <td>{this.formModificaPng(utente)}</td>
                                    <td>{this.tastoBan(utente)}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listaUtenti: state.admin.listaUtenti
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        modificaTipo: (utente, nuovoTipo) => dispatch(modificaTipoUtente(utente, nuovoTipo)),
        getListaUtenti: () => dispatch(getListaUtenti()),
        modificaMassimali: (utente) => dispatch(modificaMassimali(utente))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListaUtenti);
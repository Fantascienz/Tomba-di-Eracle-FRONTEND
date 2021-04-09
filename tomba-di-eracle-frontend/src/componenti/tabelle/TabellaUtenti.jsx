import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filtraUtentiByTipo } from '../../store/azioni/adminActions';

class TabellaUtenti extends Component {
    
    handleFiltroTipoUtente = (e) => {
       alert('eee')
        let filtro = {
            tipo: e.target.value
        }
        this.props.filtraUtentiByTipo(filtro)
    }
    
    formModificaTipo = (utente) => {
        if (utente.id !== JSON.parse(sessionStorage.getItem('utente')).id) {
            return (
                <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                    <select name="nuovoTipo" id="nuovoTipo" onChange={this.props.handleChange} style={{width:"100px"}}>
                        <option selected="selected" value="standard">Standard</option>
                        <option value="vip">VIP</option>
                        <option value="master">Master</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button className="btn btn-secondary btn-sm" onClick={() => this.props.modificaTipo(utente)} style={{width:"100px"}}>Modifica</button>
                </div>
            )
        }
    }

    formModificaUmani = (utente) => {
        return (
            <React.Fragment>
                <input type="number" placeholder="Umani" min="0" id="nuovoMaxUmani" onChange={this.props.handleChange} style={{width:"100px"}}/>
                <button className="btn btn-secondary btn-sm" onClick={() => this.props.modificaUmani(utente)} style={{width:"100px"}}>Modifica</button>
            </React.Fragment>
        )
    }

    formModificaGarou = (utente) => {
        return (
            <React.Fragment>
                <input type="number" placeholder="Garou" min="0" id="nuovoMaxGarou" onChange={this.props.handleChange} style={{width:"100px"}}/>
                <button className="btn btn-secondary btn-sm" onClick={() => this.props.modificaGarou(utente)} style={{width:"100px"}}>Modifica</button>
            </React.Fragment>
        )
    }

    formModificaPng = (utente) => {
        return (
            <React.Fragment>
                <input type="number" placeholder="PNG" min="0" id="nuovoMaxPng" onChange={this.props.handleChange} style={{width:"100px"}}/>
                <button className="btn btn-secondary btn-sm" onClick={() => this.props.modificaPng(utente)} style={{width:"100px"}}>Modifica</button>
            </React.Fragment>
        )
    }

    tastoBan = (utente) => {
        if (utente.id !== JSON.parse(sessionStorage.getItem('utente')).id) {
            return (
                <button className="btn btn-danger btn-sm" onClick={() => this.props.ban(utente)} >{utente.tipo === 'bannato' ? 'Sbanna' : 'Banna'}</button>
            )
        }
    }

    renderFiltroTipoUtente = () => {
        return (
            <React.Fragment>
                <select class="form-select" onChange={this.handleFiltroTipoUtente} aria-label="Default select example">
                    {JSON.parse(sessionStorage.getItem('listaTipoUtenti')).map(utente =>
                        <option key={utente.id} value={utente}>{utente}</option>
                    )}
                </select>
            </React.Fragment>
        )
    }

    render() {
        return (
            <div className="table-responsive ombra" style={{ width: "100%", backgroundColor: "white" }}>
                <table className="table align-middle table-hover table-sm caption-top">
                    <caption>Lista Utenti</caption>
                    <thead className="table-dark align-middle" align="center">
                        <tr style={{ color: "#eeaa44" }}>
                            <th>ID</th>
                            <th>Nominativo</th>
                            <th>Email</th>
                            <th>Tipo {this.renderFiltroTipoUtente()}</th>
                            <th>Personaggi</th>
                            <th colspan="3">Personaggi Creabili</th>
                            <th>Data di Registrazione</th>
                            <th>Modifica Tipo</th>
                            <th colspan="3">Modifica Personaggi Creabili</th>
                            <th>Ban</th>
                        </tr>
                        <tr style={{ color: "#eeaa44" }}>
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
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listaUtentiFiltrata: state.admin.listaUtentiFiltrata
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        filtraUtentiByTipo: (filtro) => dispatch(filtraUtentiByTipo(filtro))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (TabellaUtenti);
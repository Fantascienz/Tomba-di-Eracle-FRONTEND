import React, { Component } from 'react';
import { connect } from 'react-redux';
import { cercaNominativo, cercaPerNominativoETipo, filtraUtentiByTipo, getListaUtenti } from '../../store/azioni/adminActions';
import $ from 'jquery';

class TabellaUtenti extends Component {

    handleFiltroTipoUtente = (e) => {
        if (this.props.filtroNominativo !== undefined) {
            let filtro = {
                nominativo: this.props.filtroNominativo,
                tipo: e.target.value
            }

            this.props.cercaPerNominativoETipo(filtro)
        } else {
            let filtro = {
                tipo: e.target.value
            }
            this.props.filtraUtentiByTipo(filtro)
        }
    }

    handleCerca = (e) => {

        if (this.props.filtroTipoUtente !== undefined) {
            let filtro = {
                nominativo: e.target.value,
                tipo: this.props.filtroTipoUtente
            }
            this.props.cercaPerNominativoETipo(filtro)
        } else {
            let nominativo = {
                nominativo: e.target.value
            }
            this.props.cercaNominativo(nominativo)
        }

    }



    formModificaTipo = (utente) => {
        if (utente.id !== JSON.parse(sessionStorage.getItem('utente')).id) {
            return (
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <select name="nuovoTipo" id="nuovoTipo" onChange={this.props.handleChange} style={{ width: "100px" }}>
                        <option value="standard">Standard</option>
                        <option value="vip">VIP</option>
                        <option value="master">Master</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button className="btn btn-secondary btn-sm" onClick={() => this.props.modificaTipo(utente)}>Modifica</button>
                </div>
            )
        }
    }

    formModificaUmani = (utente) => {
        return (
            <React.Fragment>
                <input type="number" placeholder="Umani" min="0" id="nuovoMaxUmani" onChange={this.props.handleChange} style={{ width: "100px" }} />
                <button className="btn btn-secondary btn-sm" onClick={() => this.props.modificaUmani(utente)} style={{ width: "100px" }}>Modifica</button>
            </React.Fragment>
        )
    }

    formModificaGarou = (utente) => {
        return (
            <React.Fragment>
                <input type="number" placeholder="Garou" min="0" id="nuovoMaxGarou" onChange={this.props.handleChange} style={{ width: "100px" }} />
                <button className="btn btn-secondary btn-sm" onClick={() => this.props.modificaGarou(utente)} style={{ width: "100px" }}>Modifica</button>
            </React.Fragment>
        )
    }

    formModificaPng = (utente) => {
        return (
            <React.Fragment>
                <input type="number" placeholder="PNG" min="0" id="nuovoMaxPng" onChange={this.props.handleChange} style={{ width: "100px" }} />
                <button className="btn btn-secondary btn-sm" onClick={() => this.props.modificaPng(utente)} style={{ width: "100px" }}>Modifica</button>
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
                <select onChange={this.handleFiltroTipoUtente} aria-label="Default select example" style={{ height: "1.5vw" }}>
                    {JSON.parse(sessionStorage.getItem('listaTipoUtenti')).map(utente =>
                        <option key={utente.id} value={utente}>{utente}</option>
                    )}
                </select>
            </React.Fragment>
        )
    }

    renderCercaUtente = () => {
        return (
            <React.Fragment>
                <input className="me-2" id="nominativo" type="search" onChange={this.handleCerca} placeholder="Cerca" aria-label="Search" />
            </React.Fragment>
        )
    }

    render() {

        $(function () {
            $('#fixed-headers').scroll(function (ev) {
                /**
                 * Quando la tabella scrolla sposta di posizione la prima riga e la prima colonna
                 */
                $('thead th').css('transform', 'translateY(' + this.scrollTop + 'px)');
                $('tbody th').css('transform', 'translateX(' + this.scrollLeft + 'px)');
            });
        });

        return (
            <div className="ombra centrato" style={{ width: "100%", height: "100%" }}>

                <div className="table-reset" align="right">
                    <button className="btn-reset" onClick={() => this.props.aggiornaLista()}>Resetta Filtri</button>
                </div>

                <div className="table-reset-tappo" style={{height: "12vh"}}>
                </div>

                <table className="table fixed-headers align-middle" id="fixed-headers">
                    <thead className="table-dark align-middle" align="center">
                        <tr>
                            <th><p style={{width:"50px"}}></p></th>
                            <th>Nominativo {this.renderCercaUtente()} </th>
                            <th>Email Utente</th>
                            <th>Tipo {this.renderFiltroTipoUtente()}</th>
                            <th>Personaggi creati dall'Utente</th>
                            <th>Umani Generabili dall'Utente</th>
                            <th>Garou Generabili dall'Utente</th>
                            <th>PNG Generabili dall'Utente</th>
                            <th>Data di Registrazione</th>
                            <th>Modifica Privilegi Utente</th>
                            <th>Modifica qnt Umani Generabili dall'Utente</th>
                            <th>Modifica qnt Garou Generabili dall'Utente</th>
                            <th>Modifica qnt PNG Generabili dall'Utente</th>
                            <th>Banna Utente</th>
                        </tr>
                    </thead>
                    <tbody align="center">
                        {this.props.lista.map(utente =>
                            <tr key={utente.id}>
                                <th title={utente.nominativo}>{utente.id}</th>
                                <td>{utente.nominativo}</td>
                                <td>{utente.email}</td>
                                <td>{utente.tipo == "bannato" ? <b style={{color:"red"}}>Bannato</b> : utente.tipo == "admin" ? <b style={{color:"green"}}>Admin</b> : utente.tipo == "master" ? <b style={{color:"greenyellow"}}>Master</b> : utente.tipo}</td>
                                <td>{utente.numeroPersonaggi}</td>
                                <td>{utente.maxUmani}</td>
                                <td>{utente.tipo == "standard" || utente.tipo == "bannato" ? <b style={{color:"red", fontSize:"2vw"}} title="Un utente Standard non può avere Personaggi Garou">X</b> : utente.maxGarou}</td>
                                <td>{utente.tipo == "admin" || utente.tipo == "master" ? utente.maxPng : <b style={{color:"red", fontSize:"2vw"}} title="Un utente non Admin/Master non può avere PNG">X</b>}</td>
                                <td>{utente.dataRegistrazione}</td>
                                <td>{utente.tipo == "admin"?  <b style={{color:"red", fontSize:"2vw"}} title="I prigilegi di un Admin non possono essere modificati">X</b> :this.formModificaTipo(utente)}</td>
                                <td>{this.formModificaUmani(utente)}</td>
                                <td>{utente.tipo == "standard" || utente.tipo == "bannato" ? <b style={{color:"red", fontSize:"2vw"}} title="Un utente Standard non può avere Personaggi Garou">X</b> : this.formModificaGarou(utente)}</td>
                                <td>{utente.tipo == "admin" || utente.tipo == "master" ? this.formModificaPng(utente) : <b style={{color:"red", fontSize:"2vw"}} title="Un utente non Admin/Master non può avere PNG">X</b>}</td>
                                <td>{utente.tipo == "admin"?  <b style={{color:"red", fontSize:"2vw"}} title="Un Admin non può essere bannato">X</b> : this.tastoBan(utente)}</td>
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
        listaUtentiFiltrata: state.admin.listaUtentiFiltrata,
        listaUtenti: state.admin.listaUtenti,
        filtroTipoUtente: state.admin.filtroTipoUtente,
        filtroNominativo: state.admin.filtroNominativo
    }
}
 
const mapDispatchToProps = (dispatch) => {
    return {
        filtraUtentiByTipo: (filtro) => dispatch(filtraUtentiByTipo(filtro)),
        aggiornaLista: () => dispatch(getListaUtenti()),
        cercaNominativo: (nominativo) => dispatch(cercaNominativo(nominativo)),
        cercaPerNominativoETipo: (filtro) => dispatch(cercaPerNominativoETipo(filtro))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabellaUtenti);
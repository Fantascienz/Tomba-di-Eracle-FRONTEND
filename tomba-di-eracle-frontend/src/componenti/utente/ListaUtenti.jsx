import React, { Component } from 'react';
import { connect } from 'react-redux';
import { modificaTipoUtente,getListaUtenti } from '../../store/azioni/adminActions';

class ListaUtenti extends Component {

    state = {
        nuovoTipo: 'standard'
    }

    formModificaTipo = (utente) => {
        return (
            <div>
                <select name="nuovoTipo" id="nuovoTipo" onChange={this.handleChange}>
                    <option selected="selected" value="standard">Standard</option>
                    <option value="vip">VIP</option>
                    <option value="master">Master</option>
                    <option value="admin">Admin</option>
                </select>
                <button onClick={() => this.modificaTipo(utente)}>Modifica</button>
            </div>
        )
    }

    tastoBan = (utente) => {
        return (
            <button onClick={() => this.ban(utente)}>{utente.tipo === 'bannato' ? 'Sbanna':'Banna'}</button>
        )
    }

    modificaTipo = (utente) => {
        this.props.modificaTipo(utente,this.state.nuovoTipo)
        this.props.getListaUtenti()
    }

    ban = (utente) => {
        this.props.modificaTipo(utente,utente.tipo === 'bannato' ? 'standard':'bannato')
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
                <div style={{ width: "800px", backgroundColor: "white" }}>
                    <table className="table" style={{textAlign: "center"}}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nominativo</th>
                                <th>Email</th>
                                <th>Tipo</th>
                                <th>Personaggi</th>
                                <th>Modifica Tipo</th>
                                <th>Ban</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.lista.map(utente =>
                                <tr key={utente.id}>
                                    <td>{utente.id}</td>
                                    <td>{utente.nominativo}</td>
                                    <td>{utente.email}</td>
                                    <td>{utente.tipo}</td>
                                    <td>{utente.numeroPersonaggi}</td>
                                    <td>{this.formModificaTipo(utente)}</td>
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
        modificaTipo: (utente,nuovoTipo) => dispatch(modificaTipoUtente(utente,nuovoTipo)),
        getListaUtenti: () => dispatch(getListaUtenti())
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (ListaUtenti);
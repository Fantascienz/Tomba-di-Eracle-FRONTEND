import React, { Component } from 'react';

class ListaPersonaggi extends Component {

    state = {
        nuovoRango: ''
    }

    formModificaRango = (pg) => {
        return (<React.Fragment>
            {/* <select name="nuovoRango" id="nuovoRango" onChange={this.handleChange}>
                            <option selected="selected" value="standard">Standard</option>
                            <option value="vip">VIP</option>
                            <option value="master">Master</option>
                            <option value="admin">Admin</option>
                        </select> */}
            <input type="number" placeholder="Rango" min="0" max={this.maxRango(pg)} id="nuovoRango" onChange={this.handleChange} />
            <button className="btn btn-secondary" onClick={() => this.modificaRango(pg)} >Modifica</button>
        </React.Fragment>
        )
    }

    modificaRango = (pg) => {
        // this.props.modificaTipo(utente, this.state.nuovoTipo)
        // this.props.getListaUtenti()
        alert(this.state.nuovoRango)
        alert(pg.rango)
    }

    maxRango = (pg) => {
        if (pg.utente.id === 0) {
            return "10"
        }
        if (pg.nomeGarou !== null) {
            return "6"
        }
        return "4"
    }


    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ width: "100%", backgroundColor: "white", overflowY: "scroll" }}>
                    <table className="table align-middle">
                        <thead align="center">
                            <tr>
                                <th>Immagine</th>
                                <th>ID</th>
                                <th>Nominativo</th>
                                <th>Sesso</th>
                                <th>Razza</th>
                                <th>Rango</th>
                                <th>Nome Garou</th>
                                <th>Auspicio</th>
                                <th>Tribù</th>
                                <th>Branco</th>
                                <th>Sept</th>
                                <th>Proprietario</th>
                                <th>Modifica Rango</th>
                                <th>Modifica Nome Garou</th>
                                <th>Modifica Tribù</th>
                                <th>Modifica Branco</th>
                                <th>Modifica Sept</th>
                            </tr>
                        </thead>
                        <tbody>
                            {JSON.parse(sessionStorage.getItem('listaPersonaggi')).map(pg =>
                                <tr key={pg.id} align="center">
                                    <td><img src={pg.urlImmagine} alt="" style={{ height: "100px", width: "100px" }} /></td>
                                    <td>{pg.id}</td>
                                    <td>{pg.nominativo}</td>
                                    <td>{pg.sesso}</td>
                                    <td>{pg.razza}</td>
                                    <td>{pg.rango}</td>
                                    <td>{pg.nomeGarou}</td>
                                    <td>{pg.auspicio}</td>
                                    <td>{pg.tribu}</td>
                                    <td>{pg.branco}</td>
                                    <td>{pg.sept}</td>
                                    <td><p>ID: {pg.utente.id}</p> <p>{pg.utente.nominativo}</p> <p>{pg.utente.email}</p></td>
                                    <td>{this.formModificaRango(pg)}</td>
                                    <td>implementa</td>
                                    <td>implementa</td>
                                    <td>implementa</td>
                                    <td>implementa</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

export default ListaPersonaggi;
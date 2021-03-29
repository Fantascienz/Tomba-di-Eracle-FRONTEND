import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { getListaPersonaggi, modificaPersonaggio } from '../../store/azioni/adminActions';

class ListaPersonaggi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nuovoRango: '',
            nuovoNomeGarou: '',
            nuovaTribu: '',
            nuovoRuoloBranco: '',
            nuovoBranco: '',
            nuovoRuoloSept: '',
            nuovoSept: '',

        }
    }

    formModificaRango = (pg) => {
        return (
            <React.Fragment>
                <input type="number" placeholder="Rango" min="0" max={this.maxRango(pg)} id="nuovoRango" onChange={this.handleChange} onFocus={(event) => event.target.value = this.state.nuovoRango} style={{width:"100%"}}/>
                <button className="btn btn-secondary btn-sm" onClick={() => this.modificaRango(pg)} >Modifica</button>
            </React.Fragment>
        )
    }

    formModificaNomeGarou = (pg) => {
        return (
            <React.Fragment>
                <input type="text" placeholder="Nome Garou" id="nuovoNomeGarou" onChange={this.handleChange} onFocus={(event) => event.target.value = this.state.nuovoNomeGarou} />
                <button className="btn btn-secondary btn-sm" onClick={() => this.modificaNomeGarou(pg)} >Modifica</button>
            </React.Fragment>
        )
    }

    formModificaTribu = (pg) => {
        return (
            <React.Fragment>
                <select name="nuovaTribu" id="nuovaTribu" onChange={this.handleChange} onFocus={(event) => event.target.value = 'Senza Tribu'} >
                    <option selected="selected" value="Senza Tribu">Senza Tribù</option>
                    <option value="Signori delle Ombre">Signori delle Ombre</option>
                    <option value="Zanne d'Argento">Zanne d'Argento</option>
                    <option value="Fianna">Fianna</option>
                    <option value="Fenrir">Fenrir</option>
                    <option value="Furie Nere">Furie Nere</option>
                    <option value="Pastori dell'Uomo">Pastori dell'Uomo</option>
                    <option value="Rodi Ossa">Rodi Ossa</option>
                    <option value="Scrutastelle">Scrutastelle</option>
                    <option value="Artigli Rossi">Artigli Rossi</option>
                    <option value="Viaggiatori Silenti">Viaggiatori Silenti</option>
                    <option value="Ululatori Bianchi">Ululatori Bianchi</option>
                    <option value="Figli di Gaia">Figli di Gaia</option>
                    <option value="Danzatori della Spirale Nera">Danzatori della Spirale Nera</option>
                </select>
                <button className="btn btn-secondary btn-sm" onClick={() => this.modificaTribu(pg)} >Modifica</button>
            </React.Fragment>
        )
    }

    formModificaBranco = (pg) => {
        return (
            <React.Fragment>
                <input type="text" placeholder="Ruolo" id="nuovoRuoloBranco" onChange={this.handleChange} onFocus={(event) => event.target.value = this.state.nuovoRuoloBranco} onBlur={(event) => event.target.value = this.state.nuovoRuoloBranco} />
                <input type="text" placeholder="Branco" id="nuovoBranco" onChange={this.handleChange} onFocus={(event) => event.target.value = this.state.nuovoBranco} onBlur={(event) => event.target.value = this.state.nuovoBranco} />
                <button className="btn btn-secondary btn-sm" onClick={() => this.modificaBranco(pg)} >Modifica</button>
            </React.Fragment>
        )
    }

    formModificaSept = (pg) => {
        return (
            <React.Fragment>
                <input type="text" placeholder="Ruolo" id="nuovoRuoloSept" onChange={this.handleChange} onFocus={(event) => event.target.value = this.state.nuovoRuoloSept} />
                <input type="text" placeholder="Sept" id="nuovoSept" onChange={this.handleChange} onFocus={(event) => event.target.value = this.state.nuovoSept} />
                <button className="btn btn-secondary btn-sm" onClick={() => this.modificaSept(pg)} >Modifica</button>
            </React.Fragment>
        )
    }

    modificaRango = (pg) => {
        if (this.state.nuovoRango !== '') {
            pg.rango = this.state.nuovoRango
            this.modificaPersonaggio(pg)
        }
    }

    modificaNomeGarou = (pg) => {
        if (this.state.nuovoNomeGarou !== '') {
            if (pg.auspicio !== null) {
                pg.nomeGarou = this.state.nuovoNomeGarou
                this.modificaPersonaggio(pg)
            } else {
                withReactContent(Swal).fire({
                    title:
                        <div>
                            <p>{pg.nominativo} non è un Garou!</p>
                        </div>
                })
                this.setState({
                    nuovoRango: '',
                    nuovoNomeGarou: '',
                    nuovaTribu: '',
                    nuovoRuoloBranco: '',
                    nuovoBranco: '',
                    nuovoRuoloSept: '',
                    nuovoSept: ''
                })
                return
            }
        }
    }

    modificaTribu = (pg) => {
        if (this.state.nuovaTribu !== '') {
            pg.tribu = this.state.nuovaTribu
            this.modificaPersonaggio(pg)
        }
    }

    modificaBranco = (pg) => {
        if (this.state.nuovoRuoloBranco !== '' && this.state.nuovoBranco !== '') {
            pg.branco = this.state.nuovoRuoloBranco.toUpperCase() + ' ' + this.state.nuovoBranco
            this.modificaPersonaggio(pg)
        } else if ((this.state.nuovoRuoloBranco === '' && this.state.nuovoBranco !== '') || (this.state.nuovoRuoloBranco !== '' && this.state.nuovoBranco === '')) {
            withReactContent(Swal).fire({
                title:
                    <div>
                        <p>Ruolo e Branco vanno modificati insieme!</p>
                    </div>
            })
        }
    }

    modificaSept = (pg) => {
        if (this.state.nuovoRuoloSept !== '' && this.state.nuovoSept !== '') {
            pg.sept = this.state.nuovoRuoloSept.toUpperCase() + ' ' + this.state.nuovoSept
            this.modificaPersonaggio(pg)
        } else if ((this.state.nuovoRuoloSept === '' && this.state.nuovoSept !== '') || (this.state.nuovoRuoloSept !== '' && this.state.nuovoSept === '')) {
            withReactContent(Swal).fire({
                title:
                    <div>
                        <p>Ruolo e Sept vanno modificati insieme!</p>
                    </div>
            })
        }
    }

    modificaPersonaggio = (pg) => {
        this.props.modificaPg(pg)
        this.setState({
            nuovoRango: '',
            nuovoNomeGarou: '',
            nuovaTribu: '',
            nuovoRuoloBranco: '',
            nuovoBranco: '',
            nuovoRuoloSept: '',
            nuovoSept: ''
        })
        withReactContent(Swal).fire({
            title:
                <div>
                    <p>{pg.nominativo} modificato con successo!</p>
                </div>
        })
        this.props.aggiornaLista()
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

    componentDidMount() {
        this.props.aggiornaLista()
    }

    render() {
        return (
            <React.Fragment>
                <div className="table-responsive ombra" style={{ width: "100%", backgroundColor: "white" }}>
                    {/* <button className="btn btn-secondary" onClick={() => this.aggiorna()} >Aggiorna Lista</button> */}
                    <table className="table align-middle table-hover table-sm caption-top">
                        <caption >Lista Personaggi</caption>
                        <thead className="table-dark align-middle" align="center">
                            <tr style={{color:"#eeaa44"}}>
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
                                    <td style={{ height: "100px", width: "auto", backgroundImage:`url('${pg.urlImmagine}')`, backgroundPosition:"center center", backgroundSize:"auto 100%", backgroundRepeat:"no-repeat" }}></td>
                                    <td>{pg.id}</td>
                                    <td>{pg.nominativo}</td>
                                    <td>{pg.sesso}</td>
                                    <td>{pg.razza}</td>
                                    <td>{pg.rango}</td>
                                    <td>{pg.nomeGarou !== null ? pg.nomeGarou : '/---/'}</td>
                                    <td>{pg.auspicio !== null ? pg.auspicio : '/---/'}</td>
                                    <td>{pg.tribu}</td>
                                    <td>{pg.branco !== null ? pg.branco : '/---/'}</td>
                                    <td>{pg.sept !== null ? pg.sept : '/---/'}</td>
                                    <td><p>ID: {pg.utente.id}</p> <p>{pg.utente.nominativo}</p> <p>{pg.utente.email}</p></td>
                                    <td>{this.formModificaRango(pg)}</td>
                                    <td>{this.formModificaNomeGarou(pg)}</td>
                                    <td>{this.formModificaTribu(pg)}</td>
                                    <td>{this.formModificaBranco(pg)}</td>
                                    <td>{this.formModificaSept(pg)}</td>
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
        listaPg: state.admin.listaPg
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        aggiornaLista: () => dispatch(getListaPersonaggi()),
        modificaPg: (pg) => dispatch(modificaPersonaggio(pg))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListaPersonaggi);
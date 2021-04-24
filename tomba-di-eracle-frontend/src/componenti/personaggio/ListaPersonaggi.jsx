import React, { Component } from 'react';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { filtraListaRazza, modificaPersonaggio, getListaPersonaggi, ordinaPerRazza, ordinaPerNominativo, ordinaPerSesso, ordinaPerRango, ordinaPerDataCreazione, filtraListaStato, getByRazzaAndStato, ordinaPerId, ordinaPerRazzaEStatoByNominativo, getAllByRazzaOrderByNominativo, ordinaPerRazzaById, ordinaPerRazzaEStatoById, ordinaPerRazzaBySesso, ordinaPerRazzaEStatoBySesso, ordinaPerRazzaByRango, ordinaPerRazzaEStatoByRango, ordinaPerRazzaEStatoByDataCreazione, ordinaPerRazzaByDataCreazione, ordinaPerRazzaByIdUtente, ordinaPerRazzaEStatoByIdUtente, ordinaPerIdUtente, filtraListaPgUtente, ordinaPerUtenteByNominativo, ordinaPerUtenteBySesso, ordinaPerUtenteByRazza, ordinaPerUtenteById, ordinaPerUtenteByRango, ordinaPerUtenteByDataCreazione, ordinaPerUtenteERazza, ordinaPerUtenteERazzaById, ordinaPerUtenteERazzaByNominativo, ordinaPerUtenteERazzaBySesso, ordinePerUtenteERazzaByRango, ordinePerUtenteERazzaByDataCreazione, getAllByIdUtenteAndRazzaAndStato, getAllByIdUtenteAndStato } from '../../store/azioni/adminActions';
import SelezionaLocationForm from '../forms/SelezionaLocationForm';
import $ from 'jquery';
import { pgIsGarou, rangoGarou } from '../utils/Utilities';

class ListaPersonaggi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nuovoRango: '',
            nuovoNomeGarou: '',
            nuovaTribu: 'Senza Tribu',
            nuovoRuoloBranco: '',
            nuovoBranco: '',
            nuovoRuoloSept: '',
            nuovoSept: '',
            nuovaUltimaLocation: ''
        }

    }
    formModificaRango = (pg) => {
        return (
            <React.Fragment>
                <input type="number" placeholder="Rango" min="0" max={this.maxRango(pg)} id="nuovoRango" onChange={this.handleChange} onFocus={(event) => event.target.value = this.state.nuovoRango} style={{ width: "100%" }} />
                <button className="btn btn-secondary btn-sm" onClick={() => this.modificaRango(pg)} >Modifica</button>
            </React.Fragment>
        )
    }

    formModificaNomeGarou = (pg) => {
        return (
            <React.Fragment>
                <input type="text" placeholder="Nome Garou" id="nuovoNomeGarou" onChange={this.handleChange} onFocus={(event) => event.target.value = this.state.nuovoNomeGarou} style={{ width: "100px" }} />
                <button className="btn btn-secondary btn-sm" onClick={() => this.modificaNomeGarou(pg)} >Modifica</button>
            </React.Fragment>
        )
    }

    formModificaTribu = (pg) => {
        return (
            <React.Fragment>
                <select name="nuovaTribu" id="nuovaTribu" onChange={this.handleChange} onFocus={(event) => event.target.value = 'Senza Tribu'} style={{ width: "100px" }}>
                    <option value="Senza Tribu">Senza Tribù</option>
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
                <input type="text" placeholder="Ruolo" id="nuovoRuoloBranco" onChange={this.handleChange} onFocus={(event) => event.target.value = this.state.nuovoRuoloBranco} onBlur={(event) => event.target.value = this.state.nuovoRuoloBranco} style={{ width: "100px" }} />
                <input type="text" placeholder="Branco" id="nuovoBranco" onChange={this.handleChange} onFocus={(event) => event.target.value = this.state.nuovoBranco} onBlur={(event) => event.target.value = this.state.nuovoBranco} style={{ width: "100px" }} />
                <button className="btn btn-secondary btn-sm" onClick={() => this.modificaBranco(pg)} >Modifica</button>
            </React.Fragment>
        )
    }

    formModificaSept = (pg) => {
        return (
            <React.Fragment>
                <input type="text" placeholder="Ruolo" id="nuovoRuoloSept" onChange={this.handleChange} onFocus={(event) => event.target.value = this.state.nuovoRuoloSept} style={{ width: "100px" }} />
                <input type="text" placeholder="Sept" id="nuovoSept" onChange={this.handleChange} onFocus={(event) => event.target.value = this.state.nuovoSept} style={{ width: "100px" }} />
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
            if (pg.umbra === true) {
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

    modificaLocation = (pg) => {
        if (this.state.nuovaUltimaLocation !== '') {
            pg.ultimaLocation = this.state.nuovaUltimaLocation;
            this.modificaPersonaggio(pg)
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
            nuovoSept: '',
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
        if (pg.umbra === true) {
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




    handleFilterRazza = (e) => {
        if (this.props.filtroUtente !== undefined && this.props.filtroStato !== undefined) {
            let filtro = {
                utente: {
                    id: this.props.filtroUtente
                },
                razza: e.target.value,
                stato: this.props.filtroStato
            }

            this.props.getAllByIdUtenteAndRazzaAndStato(filtro)
        }
        else if (this.props.filtroStato !== undefined) {
            let filtro = {
                razza: e.target.value,
                stato: this.props.filtroStato
            }

            this.props.getByRazzaAndStato(filtro)
        } else if (this.props.filtroUtente !== undefined) {
            let filtro = {
                utente: {
                    id: this.props.filtroUtente
                },

                razza: e.target.value
            }
            this.props.ordinaPerUtenteERazza(filtro)
        }
        else {

            this.props.filtraListaRazza(e.target.value)
        }



    }

    handleFilterStato = (e) => {

        if (this.props.filtroUtente !== undefined && this.props.filtroRazza !== undefined) {
            let filtro = {
                utente: {
                    id: this.props.filtroUtente
                },
                razza: this.props.filtroRazza,
                stato: e.target.value
            }
            this.props.getAllByIdUtenteAndRazzaAndStato(filtro)
        }
        else if (this.props.filtroRazza !== undefined) {
            let filtro = {
                razza: this.props.filtroRazza,
                stato: e.target.value
            }
            this.props.getByRazzaAndStato(filtro)
        } else if (this.props.filtroUtente !== undefined) {
            let filtro = {
                utente: {
                    id: this.props.filtroUtente
                },
                stato: e.target.value
            }
            this.props.getAllByIdUtenteAndStato(filtro)
        }

        else {
            this.props.filtraListaStato(e.target.value)
        }

    }

    handleFilterUtente = (e) => {
        if (this.props.filtroRazza !== undefined && this.props.filtroStato !== undefined) {
            let filtro = {
                utente: {
                    id: e.target.value
                },
                razza: this.props.filtroRazza,
                stato: this.props.filtroStato
            }
            this.props.getAllByIdUtenteAndRazzaAndStato(filtro)
        } else if (this.props.filtroRazza !== undefined) {
            let filtro = {
                utente: {
                    id: e.target.value
                },
                razza: this.props.filtroRazza
            }

            this.props.ordinaPerUtenteERazza(filtro)
        } else if (this.props.filtroStato !== undefined) {
            let filtro = {
                utente: {
                    id: e.target.value
                },
                stato: this.props.filtroStato
            }
            this.props.getAllByIdUtenteAndStato(filtro)
        }

        else {
            let utente = {
                id: e.target.value
            }
            this.props.filtraListaPgUtente(utente)
        }

    }

    resetFiltro = () => {
        this.props.aggiornaLista()
    }

    ordinaPerRazza = () => {
        if (this.props.filtroUtente !== undefined) {
            let filtro = {
                id: this.props.filtroUtente
            }

            this.props.ordinaPerUtenteByRazza(filtro)
        } else {
            this.props.ordinaPerRazza()
        }


    }

    ordinaPerNominativo = () => {

        if (this.props.filtroRazza !== undefined && this.props.filtroStato !== undefined) {
            let filtro = {
                razza: this.props.filtroRazza,
                stato: this.props.filtroStato
            }
            this.props.ordinaPerRazzaEStatoByNominativo(filtro)
        } else if (this.props.filtroUtente !== undefined && this.props.filtroRazza !== undefined) {
            let filtro = {
                utente: {
                    id: this.props.filtroUtente
                },

                razza: this.props.filtroRazza
            }

            this.props.ordinaPerUtenteERazzaByNominativo(filtro)
        }
        else if (this.props.filtroRazza !== undefined) {
            let filtro = {
                razza: this.props.filtroRazza
            }
            this.props.getByRazzaOrderBy(filtro)
        } else if (this.props.filtroUtente !== undefined) {
            let filtro = {
                id: this.props.filtroUtente,
            }
            this.props.ordinaPerUtenteByNominativo(filtro)

        }
        else {
            this.props.ordinaPerNominativo()
        }

    }

    ordinaPerSesso = () => {
        if (this.props.filtroRazza !== undefined && this.props.filtroStato !== undefined) {
            let filtro = {
                razza: this.props.filtroRazza,
                stato: this.props.filtroStato
            }
            this.props.ordinaPerRazzaEStatoBySesso(filtro)
        } else if (this.props.filtroUtente !== undefined && this.props.filtroRazza !== undefined) {
            let filtro = {
                utente: {
                    id: this.props.filtroUtente
                },
                razza: this.props.filtroRazza
            }

            this.props.ordinaPerUtenteERazzaBySesso(filtro)
        }
        else if (this.props.filtroRazza !== undefined) {
            let filtro = {
                razza: this.props.filtroRazza
            }
            this.props.ordinaPerRazzaBySesso(filtro)
        } else if (this.props.filtroUtente !== undefined) {
            let filtro = {
                id: this.props.filtroUtente
            }
            this.props.ordinaPerUtenteBySesso(filtro)
        }
        else {
            this.props.ordinaPerSesso()
        }

    }

    ordinaPerRango = () => {
        if (this.props.filtroRazza !== undefined && this.props.filtroStato !== undefined) {
            let filtro = {
                razza: this.props.filtroRazza,
                stato: this.props.filtroStato
            }
            this.props.ordinaPerRazzaEStatoByRango(filtro)
        } else if (this.props.filtroUtente !== undefined && this.props.filtroRazza !== undefined) {
            let filtro = {
                utente: {
                    id: this.props.filtroUtente
                },
                razza: this.props.filtroRazza
            }

            this.props.ordinePerUtenteERazzaByRango(filtro)
        }
        else if (this.props.filtroRazza !== undefined) {
            let filtro = {
                razza: this.props.filtroRazza
            }
            this.props.ordinaPerRazzaByRango(filtro)
        } else if (this.props.filtroUtente !== undefined) {
            let filtro = {
                id: this.props.filtroUtente
            }
            this.props.ordinaPerUtenteByRango(filtro)
        }

        else {
            this.props.ordinaPerRango()
        }

    }

    ordinaPerDataCreazione = () => {
        if (this.props.filtroRazza !== undefined && this.props.filtroStato !== undefined) {
            let filtro = {
                razza: this.props.filtroRazza,
                stato: this.props.filtroStato
            }
            this.props.ordinaPerRazzaEStatoByDataCreazione(filtro)
        } else if (this.props.filtroUtente !== undefined && this.props.filtroRazza !== undefined) {
            let filtro = {
                utente: {
                    id: this.props.filtroUtente
                },
                razza: this.props.filtroRazza
            }

            this.props.ordinePerUtenteERazzaByDataCreazione(filtro)

        }
        else if (this.props.filtroRazza !== undefined) {
            let filtro = {
                razza: this.props.filtroRazza
            }
            this.props.ordinaPerRazzaByDataCreazione(filtro)
        } else if (this.props.filtroUtente !== undefined) {
            let filtro = {
                id: this.props.filtroUtente
            }

            this.props.ordinaPerUtenteByDataCreazione(filtro)
        }
        else {
            this.props.ordinaPerDataCreazione()
        }

    }

    ordinaPerId = () => {
        if (this.props.filtroRazza !== undefined && this.props.filtroStato !== undefined) {
            let filtro = {
                razza: this.props.filtroRazza,
                stato: this.props.filtroStato
            }
            this.props.ordinaPerRazzaEStatoById(filtro)
        } else if (this.props.filtroUtente !== undefined && this.props.filtroRazza !== undefined) {
            let filtro = {
                utente: {
                    id: this.props.filtroUtente
                },

                razza: this.props.filtroRazza
            }

            this.props.ordinaPerUtenteERazzaById(filtro)
        }
        else if (this.props.filtroRazza !== undefined) {
            let filtro = {
                razza: this.props.filtroRazza
            }
            this.props.ordinaPerRazzaById(filtro)
        } else if (this.props.filtroUtente !== undefined) {
            let filtro = {
                id: this.props.filtroUtente
            }

            this.props.ordinaPerUtenteById(filtro)
        }
        else {
            this.props.ordinaPerId()
        }

    }

    ordinaPerIdUtente = () => {
        if (this.props.filtroRazza !== undefined && this.props.filtroStato !== undefined) {
            let filtro = {
                razza: this.props.filtroRazza,
                stato: this.props.filtroStato
            }
            this.props.ordinaPerRazzaEStatoByIdUtente(filtro)
        }
        else if (this.props.filtroRazza !== undefined) {
            let filtro = {
                razza: this.props.filtroRazza
            }
            this.props.ordinaPerRazzaByIdUtente(filtro)
        } else {
            this.props.ordinaPerIdUtente()
        }

    }


    renderFiltroRazza = () => {

        return (
            <React.Fragment>
                <select onChange={this.handleFilterRazza} aria-label="Default select example">
                    {JSON.parse(sessionStorage.getItem('listaRazze')).map(razza =>
                        <option key={razza} value={razza}>{razza}</option>
                    )}
                </select>
            </React.Fragment>
        )
    }

    renderFiltroUtente = () => {
        if (JSON.parse(sessionStorage.getItem('listaUtenti')) != null) {
            return (
                <React.Fragment>
                    <select onChange={this.handleFilterUtente} aria-label="Default select example">
                        {JSON.parse(sessionStorage.getItem('listaUtenti')).map(utente =>
                            <option key={utente.id} value={utente.id}>ID:{utente.id} {utente.nominativo}</option>
                        )}
                    </select>
                </React.Fragment>
            )
        }
    }

    renderFiltroStato = () => {

        return (
            <React.Fragment>
                <select onChange={this.handleFilterStato} aria-label="Default select example">
                    <option value="" >Filtra</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                </select>
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
            <React.Fragment>

                <div className="ombra centrato" style={{ width: "100%", height: "100%" }}>

                    <div className="table-reset" align="right">
                        <button className="btn-reset" onClick={() => this.resetFiltro()}>Resetta Filtri</button>
                    </div>

                    <div className="table-reset-tappo">
                    </div>

                    <table className="table fixed-headers align-middle" id="fixed-headers">
                        <thead className="table-dark align-middle" align="left">
                            <tr>
                                <th ><p style={{width:"50px"}}></p></th>
                                <th><a href="#" onClick={() => this.ordinaPerId()} >ID</a></th>
                                <th><a href="#" onClick={() => this.ordinaPerNominativo()}>Nominativo</a> </th>
                                <th><a href="#" onClick={() => this.ordinaPerSesso()}>Sesso</a></th>
                                <th><a href="#" onClick={() => this.ordinaPerRazza()}>Razza</a>{this.renderFiltroRazza()}</th>
                                <th><a href="#" onClick={() => this.ordinaPerRango()}>Rango</a></th>
                                <th>Nome Garou</th>
                                <th>Auspicio</th>
                                <th>Tribù</th>
                                <th>Branco</th>
                                <th>Sept</th>
                                <th>Può inviare un Chirottero</th>
                                <th>Può attraversare il Guanto</th>
                                <th><a href="#" onClick={() => this.ordinaPerIdUtente()}>Proprietario</a> {this.renderFiltroUtente()}</th>
                                <th><a href="#" onClick={() => this.ordinaPerDataCreazione()}>Data Creazione</a></th>
                                <th>Ultima Location</th>
                                <th>Stato {this.renderFiltroStato()} </th>
                                <th>Modifica Rango</th>
                                <th>Modifica Nome Garou</th>
                                <th>Modifica ultima Location</th>
                                <th>Modifica Tribù</th>
                                <th>Modifica Branco</th>
                                <th>Modifica Sept</th>
                                <th>Mod. inviare Chirotteri</th>
                                <th>Mod. attraversare il Guanto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {JSON.parse(sessionStorage.getItem('listaPersonaggi')).map(pg =>
                                <tr key={pg.id} align="center">
                                    <th style={{ height: "100px", width: "auto", backgroundImage: `url('${pg.urlImmagine}')`, backgroundPosition: "center center", backgroundSize: "auto 100%", backgroundRepeat: "no-repeat" }} title={pg.id + ": " + pg.nominativo}></th>
                                    <td>{pg.id}</td>
                                    <td>{pg.nominativo}</td>
                                    <td>{pg.sesso}</td>
                                    <td>{pg.razza}</td>
                                    <td>{pgIsGarou(pg)? <span title={pg.rango}>{rangoGarou(pg)}</span> : pg.rango}</td>
                                    <td>{pgIsGarou(pg)? pg.nomeGarou != null ? pg.nomeGarou : '/---/' : <b style={{color:"red", fontSize:"2vw"}} title="Il Pg non è un Garou e non può avere un Nome Garou">X</b>}</td>
                                    <td>{pgIsGarou(pg)? pg.auspicio : <b style={{color:"red", fontSize:"2vw"}} title="Il Pg non è un Garou e non può avere un Auspicio">X</b>}</td>
                                    <td>{pgIsGarou(pg)? pg.tribu : <b style={{color:"red", fontSize:"2vw"}} title="Il Pg non è un Garou e non può avere una Tribù">X</b>}</td>
                                    <td>{pg.branco != null ? pg.branco : '/---/'}</td>
                                    <td>{pg.sept != null ? pg.sept : '/---/'}</td>
                                    <td>{pg.chirottero? <b style={{color:"green", fontSize:"1.5vw"}}>Si</b>:<b style={{color:"red", fontSize:"1.5vw"}}>No</b>}</td>
                                    <td>{pg.umbra? <b style={{color:"green", fontSize:"1.5vw"}}>Si</b>:<b style={{color:"red", fontSize:"1.5vw"}}>No</b>}</td>
                                    <td><span>ID: {pg.utente.id}</span> <br /><span>{pg.utente.nominativo}</span> <br /><span>{pg.utente.email}</span></td>
                                    <td>{pg.dataCreazione}</td>
                                    <td>{pg.ultimaLocation}</td>
                                    <td>{pg.stato == "online" ? <span style={{color:"green"}}>Online</span> : <span style={{color:"red"}}>Offline</span>}</td>
                                    <td>{this.formModificaRango(pg)}</td>
                                    <td>{pgIsGarou(pg)?this.formModificaNomeGarou(pg):<b style={{color:"red", fontSize:"2vw"}} title="Il Pg non è un Garou e non può avere un Nome Garou">X</b>}</td>
                                    <td>
                                        <form onSubmit={() => this.modificaLocation(pg)}>
                                            <SelezionaLocationForm
                                                className={"pippo"}
                                                style={{ width: "100px" }}
                                                lista={JSON.parse(sessionStorage.getItem('allLocations'))}
                                                stanza={true}
                                                id="nuovaUltimaLocation"
                                                handleChange={this.handleChange}
                                                allLocations={true} />
                                            <button className="btn btn-secondary btn-sm">Modifica</button>
                                        </form>
                                    </td>
                                    <td>{pgIsGarou(pg)?this.formModificaTribu(pg):<b style={{color:"red", fontSize:"2vw"}} title="Il Pg non è un Garou e non può avere una Tribù">X</b>}</td>
                                    <td>{this.formModificaBranco(pg)}</td>
                                    <td>{this.formModificaSept(pg)}</td>
                                    <td>DA AGGIUNGERE!!!</td>
                                    <td>DA AGGIUNGERE!!!</td>

                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        listaPg: state.admin.listaPg,
        listaPgFiltrata: state.admin.listaPgFiltrata,
        filtroRazza: state.admin.filtroRazza,
        filtroStato: state.admin.filtroStato,
        filtroUtente: state.admin.filtroUtente
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        aggiornaLista: () => dispatch(getListaPersonaggi()),
        modificaPg: (pg) => dispatch(modificaPersonaggio(pg)),
        filtraListaRazza: (razza) => dispatch(filtraListaRazza(razza)),
        filtraListaStato: (stato) => dispatch(filtraListaStato(stato)),
        ordinaPerRazza: () => dispatch(ordinaPerRazza()),
        ordinaPerNominativo: () => dispatch(ordinaPerNominativo()),
        ordinaPerSesso: () => dispatch(ordinaPerSesso()),
        ordinaPerRango: () => dispatch(ordinaPerRango()),
        ordinaPerDataCreazione: () => dispatch(ordinaPerDataCreazione()),
        getByRazzaAndStato: (filtro) => dispatch(getByRazzaAndStato(filtro)),
        ordinaPerId: () => dispatch(ordinaPerId()),
        getByRazzaOrderBy: (razza) => dispatch(getAllByRazzaOrderByNominativo(razza)),
        ordinaPerRazzaEStatoByNominativo: (razza) => dispatch(ordinaPerRazzaEStatoByNominativo(razza)),
        ordinaPerRazzaById: (razza) => dispatch(ordinaPerRazzaById(razza)),
        ordinaPerRazzaEStatoById: (filtro) => dispatch(ordinaPerRazzaEStatoById(filtro)),
        ordinaPerRazzaBySesso: (razza) => dispatch(ordinaPerRazzaBySesso(razza)),
        ordinaPerRazzaEStatoBySesso: (filtro) => dispatch(ordinaPerRazzaEStatoBySesso(filtro)),
        ordinaPerRazzaByRango: (razza) => dispatch(ordinaPerRazzaByRango(razza)),
        ordinaPerRazzaEStatoByRango: (filtro) => dispatch(ordinaPerRazzaEStatoByRango(filtro)),
        ordinaPerRazzaByDataCreazione: (razza) => dispatch(ordinaPerRazzaByDataCreazione(razza)),
        ordinaPerRazzaEStatoByDataCreazione: (filtro) => dispatch(ordinaPerRazzaEStatoByDataCreazione(filtro)),
        ordinaPerRazzaByIdUtente: (razza) => dispatch(ordinaPerRazzaByIdUtente(razza)),
        ordinaPerRazzaEStatoByIdUtente: (filtro) => dispatch(ordinaPerRazzaEStatoByIdUtente(filtro)),
        ordinaPerIdUtente: () => dispatch(ordinaPerIdUtente()),
        filtraListaPgUtente: (utente) => dispatch(filtraListaPgUtente(utente)),
        ordinaPerUtenteByNominativo: (filtro) => dispatch(ordinaPerUtenteByNominativo(filtro)),
        ordinaPerUtenteBySesso: (filtro) => dispatch(ordinaPerUtenteBySesso(filtro)),
        ordinaPerUtenteByRazza: (filtro) => dispatch(ordinaPerUtenteByRazza(filtro)),
        ordinaPerUtenteById: (filtro) => dispatch(ordinaPerUtenteById(filtro)),
        ordinaPerUtenteByRango: (filtro) => dispatch(ordinaPerUtenteByRango(filtro)),
        ordinaPerUtenteByDataCreazione: (filtro) => dispatch(ordinaPerUtenteByDataCreazione(filtro)),
        ordinaPerUtenteERazza: (filtro) => dispatch(ordinaPerUtenteERazza(filtro)),
        ordinaPerUtenteERazzaById: (filtro) => dispatch(ordinaPerUtenteERazzaById(filtro)),
        ordinaPerUtenteERazzaByNominativo: (filtro) => dispatch(ordinaPerUtenteERazzaByNominativo(filtro)),
        ordinaPerUtenteERazzaBySesso: (filtro) => dispatch(ordinaPerUtenteERazzaBySesso(filtro)),
        ordinePerUtenteERazzaByRango: (filtro) => dispatch(ordinePerUtenteERazzaByRango(filtro)),
        ordinePerUtenteERazzaByDataCreazione: (filtro) => dispatch(ordinePerUtenteERazzaByDataCreazione(filtro)),
        getAllByIdUtenteAndRazzaAndStato: (filtro) => dispatch(getAllByIdUtenteAndRazzaAndStato(filtro)),
        getAllByIdUtenteAndStato: (filtro) => dispatch(getAllByIdUtenteAndStato(filtro))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListaPersonaggi);
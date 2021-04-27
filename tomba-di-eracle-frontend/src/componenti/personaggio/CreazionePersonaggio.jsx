import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PersonaggioService from "../../servizi/PersonaggioService";
import { creaPersonaggio } from "../../store/azioni/personaggioActions";
import Header from "../layout/Header";
import "./CreazionePersonaggio.css"


class CreazionePersonaggio extends Component {

    state = {
        tipo: this.props.match.params.tipo,
        nominativo: '',
        sesso: '',
        razza: '',
        auspicio: '',
        tribu: '',
        brancoInput: '',
        ruolo: '',
        rango: '',
        septInput: '',
        ruoloSept: '',
        urlImmagine: '',
        urlLupo: '',
        urlCrinos: '',
        utente: JSON.parse(sessionStorage.getItem('utente')),
        crinos: '',
        umbra: ''
    }

    componentDidUpdate() {
        if (this.props.redirect !== '' && this.props.redirect !== '/creazionePersonaggio/:tipo' && this.props.redirect !== undefined) {
            this.props.history.push(this.props.redirect)
        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })

    }



    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.tipo === 'normale') {
            if (PersonaggioService.validazioneFormPersonaggio(this.state)) {
                let umano = {
                    nominativo: this.state.nominativo,
                    sesso: this.state.sesso,
                    razza: this.state.razza,
                    rango: this.state.rango,
                    urlImmagine: this.state.urlImmagine,
                    auspicio: null,
                    urlCrinos: null,
                    urlLupo: null,
                    utente: this.state.utente

                }
                this.props.creaPersonaggio(umano)
            } else {
                alert(this.state.rango)
                withReactContent(Swal).fire({
                    title: <p>Tutti i campi sono obbligatori!</p>
                })
            }

        } else if (this.state.tipo === 'garou' && (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin' || JSON.parse(sessionStorage.getItem('utente')).tipo === 'master')) {

            if (PersonaggioService.validazioneFormGarouAdminMaster(this.state)) {
                let garou = {
                    nominativo: this.state.nominativo,
                    sesso: this.state.sesso,
                    rango: this.state.rango,
                    razza: this.state.razza,
                    branco: this.state.brancoInput + " " + this.state.ruolo,
                    sept: this.state.septInput + " " + this.state.ruoloSept,
                    urlImmagine: this.state.urlImmagine,
                    urlCrinos: this.state.urlCrinos,
                    urlLupo: this.state.urlLupo,
                    utente: this.state.utente,
                    crinos: true,
                    umbra: true,
                    tribu: this.state.tribu

                }

                this.props.creaPersonaggio(garou)
            } else {
                withReactContent(Swal).fire({
                    title: <p>Tutti i campi sono obbligatori!</p>
                })
            }

        } else if (this.state.tipo === 'garou' && JSON.parse(sessionStorage.getItem('utente')).tipo === 'vip') {

            if (PersonaggioService.validazioneFormGarouVip(this.state)) {
                let garou = {
                    nominativo: this.state.nominativo,
                    sesso: this.state.sesso,
                    rango: this.state.rango,
                    razza: this.state.razza,
                    branco: this.state.brancoInput + " " + this.state.ruolo,
                    sept: this.state.septInput + " " + this.state.ruoloSept,
                    urlImmagine: this.state.urlImmagine,
                    urlCrinos: this.state.urlCrinos,
                    urlLupo: this.state.urlLupo,
                    utente: this.state.utente,
                    crinos: true,
                    umbra: true,
                    tribu: this.state.tribu

                }

                this.props.creaPersonaggio(garou)
            }

        } else if (this.state.tipo === 'png') {
            if (PersonaggioService.validazioneFormPersonaggio(this.state)) {
                this.props.creaPersonaggio(this.state)
            } else {
                withReactContent(Swal).fire({
                    title: <p>Tutti i campi sono obbligatori!</p>
                })
            }

        }
    }


    isNormaleRazza = () => {
        if (this.state.tipo === 'normale') {

            return (
                <>
                    <div className="input-group">
                        <span className="input-group-text" style={{ width: "30%" }}>Razza</span>
                        <input className="form-control" type="text" id="nominativo" value={this.state.razza = "Umano"} readOnly />
                    </div>
                </>
            )
        }
    }

    isGarouRazza = () => {
        if (this.state.tipo === 'garou') {
            return (
                <>
                    <div className="input-group">
                        <span className="input-group-text" style={{ width: "30%" }}>Razza</span>
                        <select className="form-select" id="razza" value={this.state.razza} onChange={this.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)" }}>
                            <option defaultValue="" >Razza</option>
                            <option value="Homid">Homid</option>
                            <option value="Lupus">Lupus</option>
                            <option value="Metis">Metis</option>
                        </select>
                    </div>

                </>
            )
        }
    }

    isPngRazza = () => {
        if (this.state.tipo === 'png') {
            return (
                <>
                    <div className="input-group">
                        <span className="input-group-text" style={{ width: "30%" }}>Razza</span>
                        <input className="form-control" id="razza" value={this.state.razza} onChange={this.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)" }} />
                    </div>
                </>
            )
        }


    }

    isGarouAuspicio = () => {
        if (this.state.tipo === 'garou') {
            return (
                <>
                    <div className="input-group">
                        <span className="input-group-text" style={{ width: "30%" }}>Auspicio</span>
                        <select className="form-select" id="auspicio" value={this.state.auspicio} onChange={this.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)" }}>
                            <option defaultValue="">Auspicio:</option>
                            <option value="Ahroun">Ahroun</option>
                            <option value="Galliard">Galliard</option>
                            <option value="Philodox">Philodox</option>
                            <option value="Teurgo">Teurgo</option>
                            <option value="Ragabash">Ragabash</option>
                        </select>
                    </div>
                </>
            )
        }
    }

    isGarouTribu = () => {
        if (this.state.tipo === 'garou') {
            return (
                <>
                    <div className="input-group">
                        <span className="input-group-text" style={{ width: "30%" }}>Tribù</span>
                        <select className="form-select" id="tribu" value={this.state.tribu} onChange={this.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)" }}>
                            <option defaultValue="">Tribù:</option>
                            <option value="Senza tribu">Senza tribù</option>
                        </select>
                    </div>
                </>
            )
        }
    }

    isGarouRango = () => {
        if (this.state.tipo === 'garou') {
            return (
                <>
                    <option value="Cucciolo">0</option>
                </>
            )
        }
    }

    isPngRango = () => {
        if (this.state.tipo === 'png') {
            return (
                <>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </>
            )
        }
    }

    isGarouBranco = () => {
        if (this.state.tipo === 'garou' && (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin' || JSON.parse(sessionStorage.getItem('utente')).tipo === 'master')) {
            return (
                <>
                    <div className="input-group">
                        <span className="input-group-text" style={{ width: "30%" }}>Branco</span>
                        <input className="form-control" type="text" id="brancoInput" onChange={this.handleChange} value={this.state.brancoInput} />
                    </div>
                </>
            )

        }

    }

    isGarouRuolo = () => {
        if (this.state.tipo === 'garou' && (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin' || JSON.parse(sessionStorage.getItem('utente')).tipo === 'master')) {
            return (
                <>
                    <div className="input-group">
                        <span className="input-group-text" style={{ width: "30%" }}>Ruolo nel Branco</span>
                        <input className="form-control" type="text" id="ruolo" onChange={this.handleChange} value={this.state.ruolo} />
                    </div>
                </>
            )

        }
    }

    isGarouSept = () => {
        if (this.state.tipo === 'garou' && (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin' || JSON.parse(sessionStorage.getItem('utente')).tipo === 'master')) {
            return (
                <>
                    <div className="input-group">
                        <span className="input-group-text" style={{ width: "30%" }}>Sept</span>
                        <input className="form-control" type="text" id="septInput" onChange={this.handleChange} value={this.state.septInput} />
                    </div>
                </>
            )
        }
    }

    isGarouRuoloSept = () => {
        if (this.state.tipo === 'garou' && (JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin' || JSON.parse(sessionStorage.getItem('utente')).tipo === 'master')) {
            return (
                <>
                    <div className="input-group">
                        <span className="input-group-text" style={{ width: "30%" }}>Ruolo nella Sept</span>
                        <input className="form-control" type="text" id="ruoloSept" onChange={this.handleChange} value={this.state.ruoloSept} />
                    </div>
                </>
            )
        }
    }

    isGarouUrlLupo = () => {
        if (this.state.tipo === 'garou') {
            return (
                <>
                    <div className="input-group">
                        <span className="input-group-text" style={{ width: "30%" }}>Url Img. Lupus</span>
                        <input className="form-control" type="text" id="urlLupo" onChange={this.handleChange} value={this.state.urlLupo} />
                    </div>
                </>
            )
        }
    }


    isGarouUrlCrinos = () => {
        if (this.state.tipo === 'garou') {
            return (
                <>
                    <div className="input-group">
                        <span className="input-group-text" style={{ width: "30%" }}>Url Img. Crinos</span>
                        <input className="form-control" type="text" id="urlCrinos" onChange={this.handleChange} value={this.state.urlCrinos} />
                    </div>
                </>
            )
        }
    }

    isPngUmbra = () => {
        if (this.state.tipo === 'png') {
            return (
                <>
                    <div className="input-group">
                        <span className="input-group-text" style={{ width: "30%" }}>Può attraversare il Guanto?</span>
                        <select className="form-select" id="umbra" value={this.state.umbra} onChange={this.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)" }}>
                            <option defaultValue="">Scegli se il png può attraversare il Guanto</option>
                            <option value={true}>Si</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                </>
            )
        }
    }

    isPngCrinos = () => {
        if (this.state.tipo === 'png') {
            return (
                <>
                    <div className="input-group">
                        <span className="input-group-text" style={{ width: "30%" }}>Può inviare un Chirottero?</span>
                        <select className="form-select" id="crinos" value={this.state.crinos} onChange={this.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)" }}>
                            <option defaultValue="">Scegli se il png può inviare un Chirottero</option>
                            <option value={true}>Si</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                </>
            )
        }
    }

    showImmaginePG() {
        return (
            <>
                {this.state.urlImmagine === '' ?
                    <div className="centrato anteprima-pg-nonAttiva">
                        <p>Immagine Personaggio</p>
                    </div>
                    :
                    <div className="centrato anteprima-pg-attiva" style={{ backgroundImage: `url('${this.state.urlImmagine}')` }}> </div>
                }
            </>
        )
    }

    showImmagineCrinos() {
        return (
            <>
                {this.state.urlCrinos === '' ?
                    <div className="centrato anteprima-pg-nonAttiva" >
                        <p>Immagine Crinos</p>
                    </div>
                    :
                    <div className="centrato anteprima-pg-attiva" style={{ backgroundImage: `url('${this.state.urlCrinos}')` }}> </div>
                }
            </>
        )
    }

    showImmagineLupus() {
        return (
            <>
                {this.state.urlLupo === '' ?
                    <div className="centrato anteprima-pg-nonAttiva" >
                        <p>Immagine Lupus</p>
                    </div>
                    :
                    <div className="centrato anteprima-pg-attiva" style={{ backgroundImage: `url('${this.state.urlLupo}')` }}> </div>
                }
            </>
        )
    }

    render() {
        return (
            <>
                <Header />
                <div className="corpoComponente">
                    <div style={{ height: "100%", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>

                        <div className="container" style={{ overflowY: "auto" }}>
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="input-group">
                                        <span className="input-group-text">Nome completo</span>
                                        <input className="form-control" type="text" id="nominativo" onChange={this.handleChange} value={this.state.nominativo} />
                                    </div>
                                    <div className="input-group">
                                        <span className="input-group-text" style={{ width: "30%" }}>Sesso</span>
                                        <select className="form-select" id="sesso" value={this.state.sesso} onChange={this.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)" }}>
                                            <option defaultValue="">Sesso:</option>
                                            <option value="M">Uomo</option>
                                            <option value="F">Donna</option>
                                        </select>
                                    </div>
                                    {this.isNormaleRazza()}
                                    {this.isGarouRazza()}
                                    {this.isPngRazza()}
                                    {this.isGarouAuspicio()}
                                    {this.isGarouTribu()}

                                    <div className="input-group">
                                        <span className="input-group-text" style={{ width: "30%" }}>Rango</span>
                                        <select className="form-select" id="rango" value={this.state.rango} onChange={this.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)" }}>
                                            <option value=''> Rango</option>
                                            {this.state.tipo === 'garou' ?
                                                <option value="0">Cucciolo</option>
                                                :
                                                <option value="0">0</option>
                                            }
                                            {this.isPngRango()}

                                        </select>
                                    </div>

                                    {this.isGarouBranco()}
                                    {this.isGarouRuolo()}
                                    {this.isGarouSept()}
                                    {this.isGarouRuoloSept()}
                                    {this.isPngUmbra()}
                                    {this.isPngCrinos()}

                                    <div className="input-group">
                                        <span className="input-group-text" style={{ width: "30%" }}>Url Immagine</span>
                                        <input className="form-control" id="urlImmagine" type="text" value={this.state.urlImmagine} onChange={this.handleChange} />
                                    </div>

                                    {this.isGarouUrlCrinos()}
                                    {this.isGarouUrlLupo()}
                                </div>

                                <div className="row no-gutters" align="center" style={{ marginTop: "10px" }}>
                                    <div className="col-4">
                                        {this.state.tipo === 'garou' ? this.showImmagineCrinos() : null}
                                    </div>

                                    <div className="col-4">
                                        {this.showImmaginePG()}
                                    </div>

                                    <div className="col-4">
                                        {this.state.tipo === 'garou' ? this.showImmagineLupus() : null}
                                    </div>
                                </div>

                                <button className="btn btn-dark" style={{ marginTop: "10px" }}>Crea</button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        creaPersonaggio: (personaggio) => dispatch(creaPersonaggio(personaggio))
    }

}

const mapStateToProps = (state) => {
    return {
        redirect: state.personaggio.redirect
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreazionePersonaggio);

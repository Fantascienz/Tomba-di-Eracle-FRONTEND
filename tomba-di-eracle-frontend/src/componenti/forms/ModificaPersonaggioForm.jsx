import React, { Component } from 'react';

class ModificaPersonaggioForm extends Component {
    render() {
        return (
            <div>
                 <form onSubmit={this.props.handleSubmit}>
                                <div className="input-group">
                                    <span className="input-group-text" style={{ width: "20%" }}>Nome completo</span>
                                    <input  placeholder={this.props.state.nominativo} className="form-control" type="text" id="nominativo" onChange={this.props.handleChange} value={this.props.state.nominativo} />
                                </div>

                                <div className="input-group">
                                    <span className="input-group-text" style={{ width: "20%" }}>Sesso</span>
                                    <select className="form-select" id="sesso" value={this.props.state.sesso} onChange={this.props.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)" }}>
                                        <option defaultValue="">Sesso:</option>
                                        <option value="M">Maschio</option>
                                        <option value="F">Femmina</option>
                                    </select>
                                </div>

                                <div className="input-group">
                                    <span className="input-group-text" style={{ width: "20%" }}>Rango</span>
                                    <select className="form-select" id="rango" value={this.props.state.rango} onChange={this.props.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)" }}>
                                        <option defaultValue="" >Rango</option>
                                        <option value="0">0</option>
                                    </select>
                                </div>
                                
                                <div className="input-group">
                                    <span className="input-group-text" style={{ width: "20%" }}>Razza</span>
                                    <select className="form-select" id="razza" value={this.props.state.razza} onChange={this.props.handleChange} style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)" }}>
                                        <option defaultValue="" >Razza</option>
                                        <option value="Umano">Umano</option>
                                    </select>
                                </div>
                                
                                <div className="input-group">
                                    <span className="input-group-text" style={{ width: "20%" }}>Url Immagine</span>
                                    <input className="form-control" id="urlImmagine" type="text" value={this.props.state.urlImmagine} onChange={this.props.handleChange} />
                                </div>
                                <button className="btn btn-dark" style={{ marginTop: "10px" }}>Modifica</button>
                            </form>
            </div>
        );
    }
}

export default ModificaPersonaggioForm;
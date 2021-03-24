import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPersonaggiUtente } from '../../store/azioni/personaggioActions';
import DettagliPersonaggio from './DettagliPersonaggio';

class ListaPersonaggio extends Component {
    
    state = {
        utente: JSON.parse(sessionStorage.getItem('utente'))
    }
    componentDidMount() {
        this.props.getPersonaggiUtente(this.state.utente)
    }
    
    render() {
        return (
            <div>
              {this.props.personaggiUtente && this.props.personaggiUtente.map(personaggio =>{
                  return (
                      <DettagliPersonaggio personaggio={personaggio} key={personaggio.id} />
                  )
              })}  
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPersonaggiUtente: (utente) => dispatch(getPersonaggiUtente(utente))
    }
}

const mapStateToProps = (state) => {
    return {
        personaggiUtente: state.personaggio.personaggiUtente
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (ListaPersonaggio);
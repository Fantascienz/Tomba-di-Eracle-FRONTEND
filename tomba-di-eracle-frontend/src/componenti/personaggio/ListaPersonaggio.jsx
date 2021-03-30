import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPersonaggiUtente } from '../../store/azioni/personaggioActions';
import DettagliPersonaggio from './DettagliPersonaggio';
import Carousel from 'react-bootstrap/Carousel'
import frecciaSX from '../../img/freccia_sx.png';
import frecciaDX from '../../img/freccia_dx.png';


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
                <div style={{ width: "350px" }}>
                    <Carousel interval={null} 
                        prevIcon={<img src={frecciaDX} style={{ opacity: "none", marginLeft: "700px" }} height="50px" />} prevLabel={null}
                        nextIcon={<img src={frecciaSX} style={{ opacity: "none", marginRight: "700px" }} height="50px" />} nextLabel={null}>
                        {this.props.personaggiUtente && this.props.personaggiUtente.map(personaggio => {
                            return (
                                <Carousel.Item>
                                    <DettagliPersonaggio personaggio={personaggio} key={personaggio.id} />
                                </Carousel.Item>
                            )
                        })}
                    </Carousel>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListaPersonaggio);
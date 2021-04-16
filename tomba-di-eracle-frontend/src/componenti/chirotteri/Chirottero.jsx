import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAbilitati, switchVisualizzaInvia } from '../../store/azioni/chirotteriActions';
import { InviaChirottero } from './InviaChirottero';
import LeggiChirotteri from './LeggiChirotteri';

class Chirottero extends Component {

    componentDidMount() {
        if (this.props.abilitati.length == 0) {
            this.props.getAbilitati()
        }
    }

    render() {
        return (
            <>
                <div align='center'>
                    {!this.props.visualizzaRicevuti ? <InviaChirottero abilitati={this.props.abilitati} />
                        : <LeggiChirotteri ricevuti={this.props.chirotteriRicevuti}/>}
                </div>
                <div className="row" style={{ bottom: '0%', marginLeft: '13%', position: 'absolute', width: '104%' }}>
                    <div className="col-md-6">
                        <button className="btn btn-dark" onClick={() => this.props.switchVisualizzaInvia(this.props.visualizzaRicevuti)}>{!this.props.visualizzaRicevuti ? 'Ricevuti' : 'Invia'}</button>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        abilitati: state.chirotteri.listaAbilitati,
        visualizzaRicevuti: state.chirotteri.visualizzaRicevuti,
        chirotteriRicevuti: state.chirotteri.chirotteriRicevuti
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAbilitati: () => dispatch(getAbilitati()),
        switchVisualizzaInvia: (flag) => dispatch(switchVisualizzaInvia(flag))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chirottero);
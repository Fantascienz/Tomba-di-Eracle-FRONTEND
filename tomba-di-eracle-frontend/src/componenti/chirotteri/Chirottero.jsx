import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAbilitati } from '../../store/azioni/chirotteriActions';
import { InviaChirottero } from './InviaChirottero';

class Chirottero extends Component {

    componentDidMount() {
        if (this.props.abilitati.length == 0) {
            this.props.getAbilitati()
        }
        console.log(this.props.abilitati)
    }

    render() {
        return (
            <>
                <div align='center'>
                    <InviaChirottero abilitati={this.props.abilitati} />
                </div>
                <div className="row" style={{ bottom: '0%', marginLeft: '13%', position: 'absolute', width: '104%' }}>
                    <div className="col-md-6">
                        <button className="btn btn-dark">Ricevi {this.props.abilitati.length}</button>
                    </div>
                    <div className="col-md-6">
                        <button className="btn btn-dark">Invia</button>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        abilitati: state.chirotteri.listaAbilitati,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAbilitati: () => dispatch(getAbilitati())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chirottero);
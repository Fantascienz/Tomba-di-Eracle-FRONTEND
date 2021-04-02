import React, { Component } from 'react';
import SelezionaLocationForm from '../forms/SelezionaLocationForm';
import Macromappa from './Macromappa';

class CreazioneStanza extends Component {

    state = {
        loc: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleSubmit = (event) => {
        alert('submit')
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <SelezionaLocationForm lista={JSON.parse(sessionStorage.getItem('allLocations'))} handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
                <Macromappa pxDimensioniMappa="700" lenteDisplay="none" idLocation={parseInt(this.state.loc)} />
            </div>
        );
    }
}

export default CreazioneStanza;
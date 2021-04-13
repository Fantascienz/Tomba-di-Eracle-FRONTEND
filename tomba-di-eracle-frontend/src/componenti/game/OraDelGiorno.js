import React, { Component } from 'react';

class OraDelGiorno extends Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }



    render() {

        var orario = parseInt(this.state.date.toLocaleTimeString());

        if (orario <= 6 || orario >= 17) {
            return true
        }
        return false
    }
}

export default OraDelGiorno;
import React, { Component } from 'react';
import sole from '../../img/sole_icona.png'
import luna from '../../img/4_lunaFalce_decrescente_icona.png'


class GiornoNotte extends Component {
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

        return (
            <>
                {(orario <= 6 || orario >= 17) ?

                    <div className="navigazione-link" title="Giorno / Notte" style={{ left: "45.97%", top: "2.91%", width: "7.36%", height: "4.97%", zIndex: "9999" }}>
                        <img src={luna} style={{ width: "100%" }} />
                    </div>

                    : 
                    
                    <div className="navigazione-link" title="Giorno / Notte" style={{ left: "45.97%", top: "2.91%", width: "7.36%", height: "4.97%", zIndex: "9999" }}>
                        <img src={sole} style={{ width: "100%" }} />
                    </div>
                }
            </>
        );
    }
}

export default GiornoNotte;
import React, { Component } from 'react';
import clearD from '../../img/clearGIORNO.png'
import clearN from '../../img/clearNOTTE.png'
import cloudsD from '../../img/cloudsGIORNO.png'
import cloudsN from '../../img/cloudsNOTTE.png'
import drizzleD from '../../img/drizzleGIORNO.png'
import drizzleN from '../../img/drizzleNOTTE.png'
import fogD from '../../img/fogGIORNO.png'
import fogN from '../../img/fogNOTTE.png'
import rainD from '../../img/rainGIORNO.png'
import rainN from '../../img/rainNOTTE.png'
import snowD from '../../img/snowGIORNO.png'
import snowN from '../../img/snowNOTTE.png'
import thunderstormD from '../../img/thunderstormGIORNO.png'
import thunderstormN from '../../img/thunderstormNOTTE.png'

class Meteo extends Component {
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


    isMeteoReale() {
        var orario = parseInt(this.state.date.toLocaleTimeString());

        if (this.props.utente.tipo == 'admin') {
            if (orario <= 6 || orario >= 17) {
                //NOTTE
                if (this.props.location.meteoNotte.id == 1) {
                    return "(Notte: Meteo Reale) "
                }
                return "(Notte: Meteo Custom) "
            } else {
                //GIORNO
                if (this.props.location.meteoGiorno.id == 1) {
                    return "(Giorno: Meteo Reale) "
                }
                return "(Giorno: Meteo Custom) "
            }
        }
        return ""
    }

    iconaMeteoGIORNO() {
        if (this.props.location.meteoGiorno.clima == "Thunderstorm") {
            return (
                <>
                    <img src={thunderstormD} style={{ width: "100%" }} alt="..." title={this.isMeteoReale() + "Tempesta"} />
                </>
            )
        } else if (this.props.location.meteoGiorno.clima == "Clouds") {
            return (
                <>
                    <img src={cloudsD} style={{ width: "100%" }} alt="..." title={this.isMeteoReale() + "Nuvolo"} />
                </>
            )
        } else if (this.props.location.meteoGiorno.clima == "Drizzle") {
            return (
                <>
                    <img src={drizzleD} style={{ width: "100%" }} alt="..." title={this.isMeteoReale() + "Pioggia Leggera"} />
                </>
            )
        } else if (this.props.location.meteoGiorno.clima == "Fog") {
            return (
                <>
                    <img src={fogD} style={{ width: "100%" }} alt="..." title={this.isMeteoReale() + "Nebbioso"} />
                </>
            )
        } else if (this.props.location.meteoGiorno.clima == "Rain") {
            return (
                <>
                    <img src={rainD} style={{ width: "100%" }} alt="..." title={this.isMeteoReale() + "Pioggia Forte"} />
                </>
            )
        } else if (this.props.location.meteoGiorno.clima == "Snow") {
            return (
                <>
                    <img src={snowD} style={{ width: "100%" }} alt="..." title={this.isMeteoReale() + "Nevoso"} />
                </>
            )
        } else {
            return (
                <>
                    <img src={clearD} style={{ width: "100%" }} alt="..." title={this.isMeteoReale() + "Sereno"} />
                </>
            )
        }
    }

    iconaMeteoNOTTE() {
        if (this.props.location.meteoNotte.clima == "Thunderstorm") {
            return (
                <>
                    <img src={thunderstormN} style={{ width: "100%" }} alt="..." title={this.isMeteoReale() + "Tempesta"} />
                </>
            )
        } else if (this.props.location.meteoNotte.clima == "Clouds") {
            return (
                <>
                    <img src={cloudsN} style={{ width: "100%" }} alt="..." title={this.isMeteoReale() + "Nuvolo"} />
                </>
            )
        } else if (this.props.location.meteoNotte.clima == "Drizzle") {
            return (
                <>
                    <img src={drizzleN} style={{ width: "100%" }} alt="..." title={this.isMeteoReale() + "Pioggia Leggera"} />
                </>
            )
        } else if (this.props.location.meteoNotte.clima == "Fog") {
            return (
                <>
                    <img src={fogN} style={{ width: "100%" }} alt="..." title={this.isMeteoReale() + "Nebbioso"} />
                </>
            )
        } else if (this.props.location.meteoNotte.clima == "Rain") {
            return (
                <>
                    <img src={rainN} style={{ width: "100%" }} alt="..." title={this.isMeteoReale() + "Pioggia Forte"} />
                </>
            )
        } else if (this.props.location.meteoNotte.clima == "Snow") {
            return (
                <>
                    <img src={snowN} style={{ width: "100%" }} alt="..." title={this.isMeteoReale() + "Nevoso"} />
                </>
            )
        } else {
            return (
                <>
                    <img src={clearN} style={{ width: "100%" }} alt="..." title={this.isMeteoReale() + "Sereno"} />
                </>
            )
        }
    }



    render() {

        var orario = parseInt(this.state.date.toLocaleTimeString());

        return (
            <>
                {(orario <= 6 || orario >= 17) ?

                    <div className="navigazione-link" title="Giorno / Notte" style={{ left: "26.29%", top: "4.1%", width: "7.79%", height: "4.94%", zIndex: "9999" }}>
                        {this.iconaMeteoNOTTE()}
                    </div>

                    :

                    <div className="navigazione-link" title="Giorno / Notte" style={{ left: "26.29%", top: "4.1%", width: "7.79%", height: "4.94%", zIndex: "9999" }}>
                        {this.iconaMeteoGIORNO()}
                    </div>
                }

            </>
        )
    }
}

export default Meteo;
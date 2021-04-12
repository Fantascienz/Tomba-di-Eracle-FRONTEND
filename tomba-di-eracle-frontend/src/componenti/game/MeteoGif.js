import React, { Component } from 'react';
//GIF---------------------
import pioggia from '../../img/pioggia_gif.gif'
import pioggiaLeggera from '../../img/pioggia_leggera_gif.gif'
import neve from '../../img/neve_gif.gif'
import tempesta from '../../img/tempesta_gif.gif'
import nebbia from '../../img/nebbia_gif.gif'
//SUONI-------------------
import nebbiaSuono from '../../suoni/nebbia_ambiente.mp3'
import neveSuono from '../../suoni/neve_ambiente.mp3'
import pioggiaSuono from '../../suoni/pioggia_ambient.mp3'
import pioggiaLeggeraSuono from '../../suoni/pioggia_leggera_ambient.mp3'
import tempestaSuono from '../../suoni/tempesta_ambient.mp3'
import nuvoleSuono from '../../suoni/nuvole_ambient.mp3'
import notteSerenaSuono from '../../suoni/notte_serena_ambient.mp3'
import giornoSerenoSuono from '../../suoni/giorno_sereno_ambient.mp3'


class MeteoGif extends Component {
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

    gifMeteo() {
        if (this.props.clima == "Thunderstorm") {
            return (
                <>
                    <div className="navigazione-immagine" style={{ backgroundImage: `url('${tempesta}')`, opacity: "70%" }}></div>
                    <div className="navigazione-immagine" style={{ backgroundImage: `url('${pioggia}')`, opacity: "70%" }}></div>
                    <audio autoPlay loop>
                        <source src={tempestaSuono} type="audio/mpeg" />
                    </audio>
                </>
            )
        } else if (this.props.clima == "Clouds") {
            return (
                <>
                    <div className="navigazione-immagine" style={{ opacity: "40%", backgroundColor: "black" }}></div>
                    <audio autoPlay loop>
                        <source src={nuvoleSuono} type="audio/mpeg" />
                    </audio>
                </>
            )
        } else if (this.props.clima == "Drizzle") {
            return (
                <>
                    <div className="navigazione-immagine" style={{ backgroundImage: `url('${pioggiaLeggera}')`, opacity: "70%" }}></div>
                    <audio autoPlay loop>
                        <source src={pioggiaLeggeraSuono} type="audio/mpeg" />
                    </audio>
                </>
            )
        } else if (this.props.clima == "Fog") {
            return (
                <>
                    <div className="navigazione-immagine" style={{ backgroundImage: `url('${nebbia}')`, opacity: "70%" }}></div>
                    <audio autoPlay loop>
                        <source src={nebbiaSuono} type="audio/mpeg" />
                    </audio>
                </>
            )
        } else if (this.props.clima == "Rain") {
            return (
                <>
                    <div className="navigazione-immagine" style={{ backgroundImage: `url('${pioggia}')`, opacity: "70%" }}></div>
                    <audio autoPlay loop>
                        <source src={pioggiaSuono} type="audio/mpeg" />
                    </audio>
                </>
            )
        } else if (this.props.clima == "Snow") {
            return (
                <>
                    <div className="navigazione-immagine" style={{ backgroundImage: `url('${neve}')`, opacity: "70%" }}></div>
                    <audio autoPlay loop>
                        <source src={neveSuono} type="audio/mpeg" />
                    </audio>
                </>
            )
        } else {
            var orario = parseInt(this.state.date.toLocaleTimeString());
            return (
                <>
                    {(orario <= 6 || orario >= 17) ?
                        <audio autoPlay loop>
                            <source src={notteSerenaSuono} type="audio/mpeg" />
                        </audio>
                        :
                        <audio autoPlay loop>
                            <source src={giornoSerenoSuono} type="audio/mpeg" />
                        </audio>
                    }
                </>
            )
        }
    }



    render() {

        var orario = parseInt(this.state.date.toLocaleTimeString());
        return (
            <>
                {this.gifMeteo()}
            </>
        )
    }
}

export default MeteoGif;
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

    gifMeteoGiorno() {
        if (this.props.location.meteoGiorno.clima == "Thunderstorm") {
            if (this.props.location.ambiente != "Chiuso") {
                return (
                    <>
                        <div className="navigazione-immagine" style={{ backgroundImage: `url('${tempesta}')`, opacity: "70%" }}></div>
                        <div className="navigazione-immagine" style={{ backgroundImage: `url('${pioggia}')`, opacity: "70%" }}></div>
                        <audio autoPlay loop>
                            <source src={tempestaSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            } else {
                return (
                    <>
                        <audio autoPlay loop>
                            <source src={tempestaSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            }
        } else if (this.props.location.meteoGiorno.clima == "Clouds") {
            if (this.props.location.ambiente != "Chiuso") {
                return (
                    <>
                        <div className="navigazione-immagine" style={{ opacity: "40%", backgroundColor: "black" }}></div>
                        <audio autoPlay loop>
                            <source src={nuvoleSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            } else {
                return (
                    <>
                        <audio autoPlay loop>
                            <source src={nuvoleSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            }
        } else if (this.props.location.meteoGiorno.clima == "Drizzle") {
            if (this.props.location.ambiente != "Chiuso") {
                return (
                    <>
                        <div className="navigazione-immagine" style={{ backgroundImage: `url('${pioggiaLeggera}')`, opacity: "70%" }}></div>
                        <audio autoPlay loop>
                            <source src={pioggiaLeggeraSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            } else {
                return (
                    <>
                        <audio autoPlay loop>
                            <source src={pioggiaLeggeraSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            }
        } else if (this.props.location.meteoGiorno.clima == "Fog") {
            if (this.props.location.ambiente != "Chiuso") {
                return (
                    <>
                        <div className="navigazione-immagine" style={{ backgroundImage: `url('${nebbia}')`, opacity: "70%" }}></div>
                        <audio autoPlay loop>
                            <source src={nebbiaSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            } else {
                return (
                    <>
                        <audio autoPlay loop>
                            <source src={nebbiaSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            }
        } else if (this.props.location.meteoGiorno.clima == "Rain") {
            if (this.props.location.ambiente != "Chiuso") {
                return (
                    <>
                        <div className="navigazione-immagine" style={{ backgroundImage: `url('${pioggia}')`, opacity: "70%" }}></div>
                        <audio autoPlay loop>
                            <source src={pioggiaSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            } else {
                return (
                    <>
                        <audio autoPlay loop>
                            <source src={pioggiaSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            }
        } else if (this.props.location.meteoGiorno.clima == "Snow") {
            if (this.props.location.ambiente != "Chiuso") {
                return (
                    <>
                        <div className="navigazione-immagine" style={{ backgroundImage: `url('${neve}')`, opacity: "70%" }}></div>
                        <audio autoPlay loop>
                            <source src={neveSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            } else {
                return (
                    <>
                        <audio autoPlay loop>
                            <source src={neveSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            }
        } else {
            var orario = parseInt(this.state.date.toLocaleTimeString());
            return (
                <>
                    <audio autoPlay loop>
                        <source src={giornoSerenoSuono} type="audio/mpeg" />
                    </audio>
                </>
            )
        }
    }

    gifMeteoNotte() {
        if (this.props.location.meteoNotte.clima == "Thunderstorm") {
            if (this.props.location.ambiente != "Chiuso") {
                return (
                    <>
                        <div className="navigazione-immagine" style={{ backgroundImage: `url('${tempesta}')`, opacity: "70%" }}></div>
                        <div className="navigazione-immagine" style={{ backgroundImage: `url('${pioggia}')`, opacity: "70%" }}></div>
                        <audio autoPlay loop>
                            <source src={tempestaSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            } else {
                return (
                    <>
                        <audio autoPlay loop>
                            <source src={tempestaSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            }
        } else if (this.props.location.meteoNotte.clima == "Clouds") {
            if (this.props.location.ambiente != "Chiuso") {
                return (
                    <>
                        <div className="navigazione-immagine" style={{ opacity: "40%", backgroundColor: "black" }}></div>
                        <audio autoPlay loop>
                            <source src={nuvoleSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            } else {
                return (
                    <>
                        <audio autoPlay loop>
                            <source src={nuvoleSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            }
        } else if (this.props.location.meteoNotte.clima == "Drizzle") {
            if (this.props.location.ambiente != "Chiuso") {
                return (
                    <>
                        <div className="navigazione-immagine" style={{ backgroundImage: `url('${pioggiaLeggera}')`, opacity: "70%" }}></div>
                        <audio autoPlay loop>
                            <source src={pioggiaLeggeraSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            } else {
                return (
                    <>
                        <audio autoPlay loop>
                            <source src={pioggiaLeggeraSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            }
        } else if (this.props.location.meteoNotte.clima == "Fog") {
            if (this.props.location.ambiente != "Chiuso") {
                return (
                    <>
                        <div className="navigazione-immagine" style={{ backgroundImage: `url('${nebbia}')`, opacity: "70%" }}></div>
                        <audio autoPlay loop>
                            <source src={nebbiaSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            } else {
                return (
                    <>
                        <audio autoPlay loop>
                            <source src={nebbiaSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            }
        } else if (this.props.location.meteoNotte.clima == "Rain") {
            if (this.props.location.ambiente != "Chiuso") {
                return (
                    <>
                        <div className="navigazione-immagine" style={{ backgroundImage: `url('${pioggia}')`, opacity: "70%" }}></div>
                        <audio autoPlay loop>
                            <source src={pioggiaSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            } else {
                return (
                    <>
                        <audio autoPlay loop>
                            <source src={pioggiaSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            }
        } else if (this.props.location.meteoNotte.clima == "Snow") {
            if (this.props.location.ambiente != "Chiuso") {
                return (
                    <>
                        <div className="navigazione-immagine" style={{ backgroundImage: `url('${neve}')`, opacity: "70%" }}></div>
                        <audio autoPlay loop>
                            <source src={neveSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            } else {
                return (
                    <>
                        <audio autoPlay loop>
                            <source src={neveSuono} type="audio/mpeg" />
                        </audio>
                    </>
                )
            }
        } else {
            return (
                <>
                    <audio autoPlay loop>
                        <source src={notteSerenaSuono} type="audio/mpeg" />
                    </audio>
                </>
            )
        }
    }



    render() {

        var orario = parseInt(this.state.date.toLocaleTimeString());
        return (
            <>
                {(orario <= 6 || orario >= 17) ?
                    this.gifMeteoNotte()
                    :
                    this.gifMeteoGiorno()
                }
                <iframe width="420" height="35" style={{ display: "none" }} src={this.props.location.urlAudio} allow="autoplay"></iframe>

            </>
        )
    }
}

export default MeteoGif;
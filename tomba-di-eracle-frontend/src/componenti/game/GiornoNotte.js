import React, { Component } from 'react';
import sole from '../../img/sole_icona.png'
import arhoun from '../../img/1_lunaPiena_icona.png'
import galliardCalante from '../../img/2_lunaGibbosa_decrescente_icona.png'
import philodoxCalante from '../../img/3_lunaMezza_decrescente_icona.png'
import teurgoCalante from '../../img/4_lunaFalce_decrescente_icona.png'
import ragabash from '../../img/5_lunaNuova_icona.png'
import teurgoCrescente from '../../img/6_lunaFalce_crescente_icona.png'
import philodoxCrescente from '../../img/7_lunaMezza_crescente_icona.png'
import galliardCrescente from '../../img/8_lunaGibbosa_crescente_icona.png'

import soleUmbra from '../../img/sole_icona_umbra.png'
import arhounUmbra from '../../img/1_lunaPiena_icona_umbra.png'
import galliardCalanteUmbra from '../../img/2_lunaGibbosa_decrescente_icona_umbra.png'
import philodoxCalanteUmbra from '../../img/3_lunaMezza_decrescente_icona_umbra.png'
import teurgoCalanteUmbra from '../../img/4_lunaFalce_decrescente_icona_umbra.png'
import teurgoCrescenteUmbra from '../../img/6_lunaFalce_crescente_icona_umbra.png'
import philodoxCrescenteUmbra from '../../img/7_lunaMezza_crescente_icona_umbra.png'
import galliardCrescenteUmbra from '../../img/8_lunaGibbosa_crescente_icona_umbra.png'

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


    numeroOro() {
        var annoCorrente = parseInt(this.state.date.toLocaleString(undefined, { year: 'numeric' }));
        var meseCorrente = this.state.date.toLocaleString(undefined, { month: 'numeric' });
        var numeroOro = 0;

        if (meseCorrente < 3) {
            annoCorrente -= 1;
        }

        var resto = annoCorrente % 19

        if (resto === 0) {
            numeroOro = 19;
        } else {
            numeroOro = resto + 1;
        }
        return numeroOro;
    }

    meseLunare() {
        var meseCorrente = this.state.date.toLocaleString(undefined, { month: 'numeric' });
        var meseLunare = 0;

        if (meseCorrente >= 3) {
            meseLunare = meseCorrente - 2;
        } else { meseLunare = meseCorrente + 10 }

        return meseLunare;
    }

    epatta() {
        const secolareAnno = 20;
        var epatta = 0;
        var b = secolareAnno - 15;
        var c = Math.floor((b - (b / 25)) / 3);
        var d = Math.floor((b * 3) / 4);
        var a = ((this.numeroOro() * 11) - 10) % 30;
        var k = d - c
        var e = k % 30;

        if (e > a) {
            epatta = 30 - (e - a);
        } else {
            epatta = a - e;
        }

        return epatta;
    }

    giornoLunare() {
        var giornoMese = parseInt(this.state.date.toLocaleString(undefined, { day: 'numeric' }));
        var giornoLunare = this.meseLunare() + this.epatta() + giornoMese;

        if (giornoLunare > 30) {
            giornoLunare -= 30;
        }

        return giornoLunare;
    }

    faseLunare() {
        var giornoLunare = this.giornoLunare();
        if (giornoLunare === 0 || giornoLunare > 27) {
            return ragabash;
        } else if (giornoLunare > 0 && giornoLunare < 6){
            return this.props.location.tipo === "Umbra" || this.props.location.tipo === "Stanza Umbra" ? teurgoCrescenteUmbra : teurgoCrescente;
        } else if (giornoLunare > 23 && giornoLunare < 28) {
            return this.props.location.tipo === "Umbra" || this.props.location.tipo === "Stanza Umbra" ? teurgoCalanteUmbra : teurgoCalante;
        } else if (giornoLunare > 5 && giornoLunare < 10) {
            return this.props.location.tipo === "Umbra" || this.props.location.tipo === "Stanza Umbra" ? philodoxCrescenteUmbra : philodoxCrescente;
        } else if (giornoLunare > 19 && giornoLunare < 24) {
            return this.props.location.tipo === "Umbra" || this.props.location.tipo === "Stanza Umbra" ? philodoxCalanteUmbra : philodoxCalante;
        } else if (giornoLunare > 9 && giornoLunare < 14) {
            return this.props.location.tipo === "Umbra" || this.props.location.tipo === "Stanza Umbra" ? galliardCrescenteUmbra : galliardCrescente;
        } else if (giornoLunare > 15 && giornoLunare < 20) {
            return this.props.location.tipo === "Umbra" || this.props.location.tipo === "Stanza Umbra" ? galliardCalanteUmbra : galliardCalante;
        } else {
            return this.props.location.tipo === "Umbra" || this.props.location.tipo === "Stanza Umbra" ? arhounUmbra : arhoun;
        }

    }

    render() {

        var orario = parseInt(this.state.date.toLocaleTimeString());

        return (
            <>
                {(orario <= 6 || orario >= 17) ?

                    <div className="navigazione-link" title="Notte" style={{ left: "45.8%", top: "2.91%", width: "7.36%", height: "4.97%", zIndex: "9999" }}>
                        <img src={this.faseLunare()} style={{ width: "100%" }} alt="..."/>
                    </div>

                    :

                    <div className="navigazione-link" title="Giorno" style={{ left: "45.8%", top: "2.91%", width: "7.36%", height: "4.97%", zIndex: "9999" }}>
                        <img src={this.props.location.tipo === "Umbra" || this.props.location.tipo === "Stanza Umbra" ? soleUmbra : sole} style={{ width: "100%" }} alt="..."/>
                    </div>
                }

            </>
        );
    }
}

export default GiornoNotte;
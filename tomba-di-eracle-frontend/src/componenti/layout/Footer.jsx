import React, { Component } from 'react';
import Orologio from '../utils/Orologio';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ModalComponente } from '../utils/ModalComponent';
import SchedaUtente from '../utente/SchedaUtente';


class Footer extends Component {

    visualizzaAutori = () => {
        withReactContent(Swal).fire({
            title:
                <div>
                    <h3>SVILUPPATO DA:</h3>
                    <a href="https://www.linkedin.com/in/gianluca-spadazzi-53303981/" target="_blank">Gianluca Spadazzi</a> <br />
                    <a href="https://www.linkedin.com/in/tiziano-massa-061151158/" target="_blank">Tiziano Massa</a> <br />
                    <a href="https://www.linkedin.com/in/paolo-marchitto-553433b2/" target="_blank">Paolo Marchitto</a> <br /> <br />
                    <h3>GRAFICA DI:</h3>
                    <a href="https://www.instagram.com/sara__fiorucci/" target="_blank">Sara Fiorucci</a>
                </div>
        })
    }

    visualizzaRegolamento = () => {
        withReactContent(Swal).fire({
            title:
                <div>
                    DA IMPLEMENTARE
                </div>
        })
    }

    visualizzaCommunity = () => {
        withReactContent(Swal).fire({
            title:
                <div>
                    DA IMPLEMENTARE
                </div>
        })
    }


    render() {
        return (
            <div className="bg-dark" style={{ position: "fixed", bottom: "0px", width: "100%", height: "5%", color: "#b30000" }}>
                <div className="row">

                    <div className="col footer-setting" >
                    <a href="#" onClick={this.visualizzaCommunity}><b>COMMUNITY</b></a>
                    </div>

                    <div className="col footer-setting" >
                        {(JSON.parse(sessionStorage.getItem('utente')) != null && JSON.parse(sessionStorage.getItem('utente')).tipo === 'admin') ?
                            <ModalComponente
                                bottone={<a href="#"><b>Opzioni Master</b></a>}
                                size='sm'
                                contenuto={
                                    <div className="centrato" style={{ position: "fixed", backgroundColor: "transparent", height: "500px", width: "500px" }}>
                                        <SchedaUtente style={{ width: "70%", height: "60%" }} titoloPagina="no" flipBox="no" gestioneLocation="no" creazionePersonaggio="no" messaggiUtenti="no"/>
                                    </div>}
                            />
                            :
                            null
                        }
                    </div>

                    <div className="col footer-setting">
                        <a href="#" onClick={this.visualizzaAutori}><b>CREDITS</b></a>
                    </div>

                    <div className="col footer-setting">
                        <a href="#" onClick={this.visualizzaRegolamento}><b>REGOLAMENTO</b></a>
                    </div>

                    <div className="col footer-setting" align="right">
                        <Orologio />
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
import React, { Component } from 'react';
import Orologio from '../utils/Orologio';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ModalComponente } from '../utils/ModalComponent';
import SchedaUtente from '../utente/SchedaUtente';


class Footer extends Component {

    visualizzaAutori = () => {
        console.log('entro')
        withReactContent(Swal).fire({
            title:
                <div>
                    <h3>SVILUPPATO DA:</h3>
                    <a href="https://www.linkedin.com/in/gianluca-spadazzi-53303981/" target="_blank">Gianluca Spadazzi</a> <br/>
                    <a href="https://www.linkedin.com/in/tiziano-massa-061151158/" target="_blank">Tiziano Massa</a> <br/>
                    <a href="https://www.linkedin.com/in/paolo-marchitto-553433b2/" target="_blank">Paolo Marchitto</a> <br/> <br/>
                    <h3>GRAFICA DI:</h3>
                    <a href="https://www.instagram.com/sara__fiorucci/" target="_blank">Sara Fiorucci</a>
                </div>
        })
    }


    render() {
        return (
            <div className="bg-dark" style={{ position:"fixed", bottom:"0px", width:"100%", height:"5%", color: "#b30000", paddingTop:"0.5%" }}>
                <div className="row">
                    <div className="col-sm-4">
                        {(JSON.parse(sessionStorage.getItem('utente')) != null && JSON.parse(sessionStorage.getItem('utente')).tipo == 'admin') ? 
                            <ModalComponente
                                bottone={<button className="btn btn-danger">Opzioni Master</button>}
                                size='sm'
                                contenuto={
                                    <div className="centrato" style={{ position: "fixed", backgroundColor: "transparent", height: "500px", width: "500px" }}>
                                        <SchedaUtente style={{width:"50%"}}/>
                                    </div>}
                            />
                            :
                            <b>SOCIAL</b>
                        }
                    </div>

                    <div className="col-sm-4">
                        <a href="#" onClick={this.visualizzaAutori}><b>CREDITS</b></a>
                    </div>

                    <div className="col-sm-4" align="right">
                        <Orologio/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
import React, { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import divisore from '../../img/divisore.png'
import penna from '../../img/quill.png'
import { ModalComponente } from '../utils/ModalComponent'
import srotolaCarta from '../../suoni/flip_card.mp3'
import Scroll from '../../img/scroll.png'
import "./Chat.css"


let socket;

export const ChatRoom = () => {
    const dummy = useRef();
    const personaggio = JSON.parse(sessionStorage.getItem('pgAttivo'));
    const location = JSON.parse(sessionStorage.getItem('ultimaLocation'));
    const ENDPOINT = 'http://localhost:5000';
    const [messaggi, setMessages] = useState([]);

    const [formValue, setFormValue] = useState(''); //hook per creare il messaggio con i dati del personaggio e della location


    useEffect(() => {
        socket = io(ENDPOINT);

        socket.on('output-messages', (data) => {
            setMessages(data);
        });

        socket.emit('join', { personaggio, location }, () => {
        })


    }, ENDPOINT)

    useEffect(() => {
        socket.on('message', (messaggio) => {
            setMessages([...messaggi, messaggio]);
            socket.off('message');
        })

    }, [messaggi]);


    const inviaMessaggio = (e) => {
        e.preventDefault();

        socket.emit('sendMessage', { formValue, personaggio, location }, () => setFormValue(''));
        dummy.current.scrollIntoView({ behavior: 'smooth' });

    }

    return (<>
        {/* NEL TAG MAIN VENGONO VISUALIZZATI I MESSAGGI */}
        <div className="chat">
            <main>
                {messaggi.map(msg =>
                    msg.idLocation === location.id ?
                        <MessaggioChat key={msg.id} messaggio={msg} />
                        :
                        "")}

                <span ref={dummy}></span>
            </main>

            <form onSubmit={inviaMessaggio}>

                <textarea className="font-lombardia" name="areaMsg" id="areaMsg" cols="30" rows="5" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Scrivi messaggio..."></textarea>

                <button type="submit" disabled={!formValue} title={!formValue ? 'Inserisci un testo' : 'Scrivi'}>
                    <img src={penna} alt='...' style={{ width: "auto", height: "80%" }} />
                </button>

            </form>
        </div>
    </>)
}





function MessaggioChat(props) {
    const { testo, idPersonaggio, immagine, nomePersonaggio, inviatoAlle } = props.messaggio;

    const personaggioAttivo = JSON.parse(sessionStorage.getItem('pgAttivo'));

    const messageClass = (idPersonaggio === personaggioAttivo.id ? 'sent' : 'received');
    console.log("idPersonaggio: "+idPersonaggio+", personaggioAttivo: "+personaggioAttivo.id+", messageClass: "+messageClass+", testo: "+testo);

    var inviatoAlleOrario = new Date(inviatoAlle)
    var oraInvio = inviatoAlleOrario.toLocaleString(undefined, { hour: "numeric" })
    var minutoInvio = inviatoAlleOrario.toLocaleString(undefined, { minute: "numeric" })
    var visualizzaOrarioInvio = "Inviato alle " + oraInvio + ":" + minutoInvio


    return (<>
        <div className={`message ${messageClass}`}>
            <table style={{ width: "100%" }}>

                {/* -------------------------------IMMAGINE CHAT------------------------------- */}
                <tr border="1">
                    {messageClass === 'sent' ?
                        <>
                            <td align='right'><span className="font-Cardinal" style={{ fontSize: "1em" }}>{nomePersonaggio} </span></td>
                            <td align='right' style={{ width: "10%" }}>
                                <ModalComponente
                                    suono={srotolaCarta}
                                    bottone={<img src={immagine} alt="..." style={{ borderRadius: "60% 60% 0 0", border: "1px solid black", cursor: "zoom-in" }} />}
                                    size='md'
                                    contenuto={
                                        <div className="centrato" >
                                            {/* SFONDO MODAL----------------------- */}
                                            <div className="centrato" style={{ position: "fixed", backgroundColor: "none" }}>
                                                <img src={Scroll} style={{ height: "800px", transform: "rotate(90deg)" }} alt="" />
                                            </div>

                                            <div className="centrato" style={{ position: "relative", backgroundColor: "transparent", height: "100%", width: "100%"}}>
                                                <div style={{
                                                    backgroundColor: "#000600", height: "50vh", width: "50vh", borderRadius: "30vh 30vh 0 0",
                                                    backgroundImage: `url('${immagine}')`, backgroundPosition: "center center", backgroundSize: "auto 110%", backgroundRepeat: "no-repeat",
                                                    boxShadow: "1vh 1vh 1vh black, -1vh 1vh 1vh black, 1vh -1vh 1vh black, -1vh -1vh 1vh black, inset -0vh -0vh 5vh black, inset 0vh -0vh 5vh black, inset -0vh 0vh 5vh black, inset 0vh 0vh 5vh black",
                                                }}></div>
                                            </div>
                                        </div>
                                    }
                                />
                            </td>
                        </>
                        :
                        <>
                        <td align='left' style={{ width: "10%" }}>
                            {/*se non c'è un immagine,mette l'immagine di default corrispondente all'url*/}
                            {nomePersonaggio == 'admin' ?
                                null
                                :
                                <ModalComponente
                                    suono={srotolaCarta}
                                    bottone={<img src={immagine} alt="..." style={{ borderRadius: "60% 60% 0 0", border: "1px solid black", cursor: "zoom-in" }} />}
                                    size='md'
                                    contenuto={
                                        <div className="centrato" >
                                            {/* SFONDO MODAL----------------------- */}
                                            <div className="centrato" style={{ position: "fixed", backgroundColor: "none" }}>
                                                <img src={Scroll} style={{ height: "800px", transform: "rotate(90deg)" }} alt="" />
                                            </div>

                                            <div className="centrato" style={{ position: "relative", backgroundColor: "transparent", height: "100%", width: "100%" }}>
                                                {/* <img src={immagine} style={{height:"auto", width:"100%", borderRadius:"50% 50% 0 0", backgroundColor:"red" }} alt="" /> */}
                                                <div style={{
                                                    backgroundColor: "#000600", height: "50vh", width: "50vh", borderRadius: "25vh 25vh 0 0",
                                                    backgroundImage: `url('${immagine}')`, backgroundPosition: "center center", backgroundSize: "auto 110%", backgroundRepeat: "no-repeat",
                                                    boxShadow: "1vh 1vh 1vh black, -1vh 1vh 1vh black, 1vh -1vh 1vh black, -1vh -1vh 1vh black, inset -0vh -0vh 5vh black, inset 0vh -0vh 5vh black, inset -0vh 0vh 5vh black, inset 0vh 0vh 5vh black",
                                                }}></div>
                                            </div>
                                        </div>
                                    }
                                />
                            }
                        </td>

                        <td align='left'>
                            {nomePersonaggio == 'admin' ? null : <span className="font-Cardinal" style={{ fontSize: "1em" }}>{nomePersonaggio} </span>}
                        </td>
                        </>
                    }
                </tr>

                {/* -------------------------------TESTO CHAT------------------------------- */}
                <tr>
                    <td colSpan="2" align={messageClass === 'sent' ? 'right' : 'left'}>
                        {nomePersonaggio == 'admin' ?
                            <p className="font-Cardinal" style={{ fontSize: "1.5em", color: 'grey' }} title="Messaggio autogenerato">{testo}</p>
                            :
                            <p className="font-Cardinal" style={{ fontSize: "1.5em" }} title={visualizzaOrarioInvio}>{testo}</p>
                        }
                    </td>
                </tr>

                {/* -------------------------------DIVISORE CHAT------------------------------- */}
                <tr>
                    <td colSpan="2" align="center">
                        <img src={divisore} atl="..." style={{ width: "100%", opacity:"30%" }} />
                    </td>
                </tr>
            </table>
        </div>
    </>)
}
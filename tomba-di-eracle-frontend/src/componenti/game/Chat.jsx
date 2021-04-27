import { firestore } from "../../App";
import React, { useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import React, { useRef, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import divisore from '../../img/divisore.png'
import penna from '../../img/quill.png'

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

    const messageClass = idPersonaggio === personaggioAttivo.id ? 'sent' : 'received';

    return (<>
        <div className={`message ${messageClass}`}>
            <table style={{ width: "100%" }}>
                <tr>
                    {messageClass === 'sent' ?
                        <td align='right'>
                            <span className="font-lombardia" style={{ fontSize: "1.3em" }}>{nomePersonaggio} </span>
                            {/*se non c'è un immagine,mette l'immagine di default corrispondente all'url*/}
                            <img src={immagine} alt="..." />
                        </td>
                        :
                        <td align='left'>
                            {/*se non c'è un immagine,mette l'immagine di default corrispondente all'url*/}
                            {nomePersonaggio == 'admin' ? null : <img src={immagine} alt="..." />}
                            {nomePersonaggio == 'admin' ? null :
                                <span className="font-lombardia" style={{ fontSize: "1.3em" }}>{nomePersonaggio} </span>}
                        </td>
                    }
                </tr>

                <tr>
                    <td align={messageClass === 'sent' ? 'right' : 'left'}>
                        {nomePersonaggio == 'admin' ?
                            <p className="font-lombardia" style={{ fontSize: "1.8em", color: 'grey' }}>{testo}</p>
                            :
                            <p className="font-lombardia" style={{ fontSize: "1.8em" }}>{testo}</p>
                        }

                    </td>
                </tr>
                <tr>
                    <td align="center">
                        <img src={divisore} atl="..." style={{ width: "100%" }} />
                    </td>
                </tr>
            </table>
        </div>
    </>)
}
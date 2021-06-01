import React, { useRef, useState, useEffect } from 'react';
import { ModalComponente } from '../utils/ModalComponent';
import divisore from '../../img/divisore.png';
import penna from '../../img/quill.png';
import { useSelector, useDispatch } from 'react-redux';


export const ChatRoom = ({ socket, location, personaggio, ENDPOINT }) => {
    const dispatch = useDispatch();
    const personaggiOnline = useSelector(state => state.online.personaggi);
    const dummy = useRef();
    const [messaggi, setMessages] = useState([]);

    const [formValue, setFormValue] = useState(''); //hook per creare il messaggio con i dati del personaggio e della location


    useEffect(() => {

        socket.emit('join', { personaggio, location }, () => {
        })

        socket.on('output-messages', (data) => {
            setMessages(data);
        });

        socket.on('locationData', (data) => {
            dispatch({ type: 'setList', listaPersonaggi: data.personaggi });
        });

        return () => {
            socket.off('output-message');
            socket.off('join');
            socket.off('locationData');
        }



    }, ENDPOINT)

    useEffect(() => {
        socket.on('message', (messaggio) => {
            setMessages([...messaggi, messaggio]);

        })
        socket.on('messageEntrataLocation', (messaggio) => {
            setMessages([...messaggi, messaggio])

        })

        socket.on('messageUscitaLocation', (messaggio) => {
            setMessages([...messaggi, messaggio])

        })

        socket.on('locationData', (data) => {
            dispatch({ type: 'setList', listaPersonaggi: data.personaggi });
        });

        return () => {
            socket.off('locationData');
            socket.off('messageEntrataLocation');
            socket.off('messageUscitaLocation');
            socket.off('message');
        }


    }, [messaggi]);



    const inviaMessaggio = (e) => {
        e.preventDefault();
        socket.emit('sendMessage', { formValue, personaggio, location }, () => setFormValue(''));

        dummy.current.scrollIntoView({ behavior: 'smooth' });

    }

    const getList = () => {
        socket.emit('getList', () => {

        });
        socket.on('listaOnline', (data) => {
            dispatch({ type: 'setList', listaPersonaggi: data.personaggi });
        })

        socket.on('listaCambiata', (data) => {
            dispatch({ type: 'setList', listaPersonaggi: data.personaggi });
        })

        return () => {
            socket.off('getList');
            socket.off('listaOnline');
        }

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
                {<ModalComponente
                    bottone={<button className='btn btn-primary' onClick={() => getList()}>PG</button>}
                    size='s'
                    contenuto={
                        <div>
                            {
                                personaggiOnline.map(pg =>
                                    pg.personaggio.ultimaLocation === location.id ?
                                    <h1 key={pg.id}>{pg.personaggio.nominativo}</h1>
                                    :
                                    ""
                                )
                            }
                        </div>
                    }
                />}
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
                            <p className="font-lombardia" style={{ fontSize: "1.8em", color: 'grey' }} title={nomePersonaggio}>{testo}</p>
                            :
                            <p className="font-lombardia" style={{ fontSize: "1.8em" }} title={nomePersonaggio}>{testo}</p>
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
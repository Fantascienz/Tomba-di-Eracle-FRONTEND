import React, { useRef, useState, useEffect } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
import { ModalComponente } from '../utils/ModalComponent';
import divisore from '../../img/divisore.png';
import penna from '../../img/quill.png';
import { useSelector, useDispatch } from 'react-redux';


export const ChatRoom = ({ socket, location, personaggio, ENDPOINT }) => {
    const dispatch = useDispatch();
    const personaggiOnline = useSelector(state => state.online.personaggi);
=======
=======
>>>>>>> 651e2b45f67cd64afdaa6142349f39d151e7c522
import io from 'socket.io-client';
import divisore from '../../img/divisore.png'
import penna from '../../img/quill.png'
import "./Chat.css"

let socket;

export const ChatRoom = () => {
>>>>>>> 87fc1b3 (modifichine carinine)
    const dummy = useRef();
    const [messaggi, setMessages] = useState([]);

    const [formValue, setFormValue] = useState(''); //hook per creare il messaggio con i dati del personaggio e della location


    useEffect(() => {

        socket.emit('join', { personaggio, location }, () => {
        })

        socket.on('output-messages', (data) => {
            setMessages(data);
        });
<<<<<<< HEAD
<<<<<<< HEAD

        socket.on('locationData', (data) => {
            dispatch({ type: 'setList', listaPersonaggi: data.personaggi });
        });

        return () => {
            socket.off('output-message');
            socket.off('join');
            socket.off('locationData');
        }



=======
    
        socket.emit('join', { personaggio, location}, () => {
        })
>>>>>>> 87fc1b3 (modifichine carinine)
=======
    
        socket.emit('join', { personaggio, location}, () => {
        })
>>>>>>> 651e2b45f67cd64afdaa6142349f39d151e7c522
    }, ENDPOINT)

    useEffect(() => {
        socket.on('message', (messaggio) => {
            setMessages([...messaggi, messaggio]);
<<<<<<< HEAD
<<<<<<< HEAD

        })
        socket.on('messageEntrataLocation', (messaggio) => {
            setMessages([...messaggi, messaggio])

        })

        socket.on('messageUscitaLocation', (messaggio) => {
            setMessages([...messaggi, messaggio])

=======
>>>>>>> 87fc1b3 (modifichine carinine)
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
<<<<<<< HEAD



    const inviaMessaggio = (e) => {
        e.preventDefault();
        socket.emit('sendMessage', { formValue, personaggio, location }, () => setFormValue(''));

        dummy.current.scrollIntoView({ behavior: 'smooth' });

=======
    

    const inviaMessaggio = (e) => {
        e.preventDefault();

        socket.emit('sendMessage', {formValue, personaggio, location}, () => setFormValue(''));
        dummy.current.scrollIntoView({ behavior: 'smooth' });
>>>>>>> 87fc1b3 (modifichine carinine)
=======
        })
    }, [messaggi]);
    

    const inviaMessaggio = (e) => {
        e.preventDefault();

        socket.emit('sendMessage', {formValue, personaggio, location}, () => setFormValue(''));
        dummy.current.scrollIntoView({ behavior: 'smooth' });
>>>>>>> 651e2b45f67cd64afdaa6142349f39d151e7c522
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
<<<<<<< HEAD
    const messageClass = idPersonaggio === personaggioAttivo.id ? 'sent' : 'received';
=======

    const messageClass = idPersonaggio === personaggioAttivo.id ? 'sent' : 'received';

>>>>>>> 87fc1b3 (modifichine carinine)
    return (<>
        <div className={`message ${messageClass}`}>
            <table style={{ width: "100%" }}>
                <tr>
                    {messageClass === 'sent' ?
                        <td align='right'>
                            <span className="font-lombardia" style={{ fontSize: "1.3em" }}>{nomePersonaggio} </span>
                            {/*se non c'è un immagine,mette l'immagine di default corrispondente all'url*/}
<<<<<<< HEAD
                            <img src={immagine} alt="..." />
=======
                            <img src={immagine || 'https://myasw.org/wp-content/uploads/2020/05/mr-anonymous.png'} atl="..." />
>>>>>>> 651e2b45f67cd64afdaa6142349f39d151e7c522
                        </td>
                        :
                        <td align='left'>
                            {/*se non c'è un immagine,mette l'immagine di default corrispondente all'url*/}
<<<<<<< HEAD
                            {nomePersonaggio == 'admin' ? null : <img src={immagine} alt="..." />}
                            {nomePersonaggio == 'admin' ? null :
                                <span className="font-lombardia" style={{ fontSize: "1.3em" }}>{nomePersonaggio} </span>}
=======
                            <img src={immagine || 'https://myasw.org/wp-content/uploads/2020/05/mr-anonymous.png'} atl="..." />
                            <span className="font-lombardia" style={{ fontSize: "1.3em" }}>{nomePersonaggio} </span>
>>>>>>> 651e2b45f67cd64afdaa6142349f39d151e7c522
                        </td>
                    }
                </tr>

                <tr>
                    <td align={messageClass === 'sent' ? 'right' : 'left'}>
<<<<<<< HEAD
                        {nomePersonaggio == 'admin' ?
                            <p className="font-lombardia" style={{ fontSize: "1.8em", color: 'grey' }} title={nomePersonaggio}>{testo}</p>
                            :
                            <p className="font-lombardia" style={{ fontSize: "1.8em" }} title={nomePersonaggio}>{testo}</p>
                        }

=======
                        <p className="font-lombardia" style={{ fontSize: "1.8em" }}>{testo}</p>
>>>>>>> 651e2b45f67cd64afdaa6142349f39d151e7c522
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
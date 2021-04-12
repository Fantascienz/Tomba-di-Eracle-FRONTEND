import { firestore } from "../../App";
import React, { useEffect, useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import divisore from '../../img/divisore.png'
import penna from '../../img/quill.png'


export const ChatRoom = () => {
  const dummy = useRef();
  const dbMessaggi = firestore.collection('messaggi'); //richiamo la raccolta dei messaggi e quindi tutti documenti al suo interno
  const query = dbMessaggi.orderBy('inviatoAlle').limit(25); //creo una query ordinata in base al momento dell'invio
  const personaggio = JSON.parse(sessionStorage.getItem('pgAttivo'));
  const location = JSON.parse(sessionStorage.getItem('ultimaLocation'));

  //, { idField: 'id' } AGGIUNGI DOPO query SE ESPLODE TUTTO
  const [messaggi] = useCollectionData(query); //recupera i documenti e li salva in un array

  const [formValue, setFormValue] = useState(''); //hook per creare il messaggio con i dati del personaggio e della location


  const inviaMessaggio = async (e) => {
    e.preventDefault();



    await dbMessaggi.add({ //add fa l'insert del documento nella raccolta,è un JSON
      testo: formValue,
      // inviatoAlle: firebase.firestore.FieldValue.serverTimestamp(),
      inviatoAlle: new Date(),
      idPersonaggio: personaggio.id,
      nomePersonaggio: personaggio.nominativo,
      idLocation: location.id,
      immagine: personaggio.urlImmagine
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    {/* NEL TAG MAIN VENGONO VISUALIZZATI I MESSAGGI */}
    <div className="chat">
      <main>
          {messaggi && messaggi.map(msg =>
            msg.idLocation === location.id ?
              <MessaggioChat key={msg.id} messaggio={msg} />
              :
              "")}

          <span ref={dummy}></span>
      </main>

      <form onSubmit={inviaMessaggio}>

        <textarea className="font-lombardia" name="areaMsg" id="areaMsg" cols="30" rows="5" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Scrivi messaggio..."></textarea>

        <button type="submit" disabled={!formValue} title={!formValue ? 'Inserisci un testo' : 'Scrivi'}>
          <img src={penna} alt='...' style={{width:"auto", height:"80%"}}/>
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
              <span className="font-lombardia" >{nomePersonaggio} </span>
              {/*se non c'è un immagine,mette l'immagine di default corrispondente all'url*/}
              <img src={immagine || 'https://myasw.org/wp-content/uploads/2020/05/mr-anonymous.png'} atl="..." />
            </td>
            :
            <td align='left'>
              {/*se non c'è un immagine,mette l'immagine di default corrispondente all'url*/}
              <img src={immagine || 'https://myasw.org/wp-content/uploads/2020/05/mr-anonymous.png'} atl="..." />
              {nomePersonaggio}
            </td>
          }
        </tr>

        <tr>
          <td align={messageClass === 'sent' ? 'right' : 'left'}>
            <p className="font-lombardia" style={{ fontSize: "1.8em" }}>{testo}</p>
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
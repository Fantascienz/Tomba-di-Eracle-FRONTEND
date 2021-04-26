import { firestore } from "../../App";
import React, { useRef, useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
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


  function contaParole(maxParole) {
    var c = formValue.length;
    return maxParole - c;
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

        <textarea className="font-lombardia" name="areaMsg" id="areaMsg" cols="30" rows="5" value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Scrivi messaggio..." maxLength="5000"></textarea>

        <div style={{right: "5%" }} align="center">
          <p style={{ fontSize: "1vh" }}>Caratteri rimanenti: <span>{contaParole(5000)}</span></p>

          <button type="submit" disabled={!formValue} title={!formValue ? 'Inserisci un testo' : 'Scrivi'} style={{width:"100%"}}>
            <img src={penna} alt='...' style={{width: "auto", height: "80%" }} />
          </button>
        </div>
      </form>
    </div>
  </>)
}




function MessaggioChat(props) {
  const { testo, idPersonaggio, immagine, nomePersonaggio } = props.messaggio;

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
              <img src={immagine || 'https://myasw.org/wp-content/uploads/2020/05/mr-anonymous.png'} alt="..." />
            </td>
            :
            <td align='left'>
              {/*se non c'è un immagine,mette l'immagine di default corrispondente all'url*/}
              <img src={immagine || 'https://myasw.org/wp-content/uploads/2020/05/mr-anonymous.png'} alt="..." />
              <span className="font-lombardia" style={{ fontSize: "1.3em" }}>{nomePersonaggio} </span>
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
            <img src={divisore} alt="..." style={{ width: "100%" }} />
          </td>
        </tr>
      </table>
    </div>
  </>)
}
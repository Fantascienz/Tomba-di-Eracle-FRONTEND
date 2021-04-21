import { useState } from "react"
import chirottero from '../../img/chirottero_icona.png'
import ChirotteriService from "../../servizi/ChirotteriService"


export const InviaChirottero = ({ abilitati }) => {

    const [testo, setTesto] = useState('')
    const [destinatario, setDestinatario] = useState(0)


    function contaParole(maxParole) {
        var c = testo.length;
        return maxParole - c;
    }

    return (
        <>
            <form onSubmit={() => inviaChirottero(testo, destinatario)}>
                <select name="destinatario" id="destinatario" className="form-select" style={{ border: "1px solid black", backgroundColor: "rgba(211, 211, 211, 0.568)", marginBottom: "1%" }} onChange={(e) => setDestinatario(e.target.value)}>
                    <option value={0}>Seleziona destinatario..</option>
                    {abilitati.map(personaggio =>
                        JSON.parse(sessionStorage.getItem('pgAttivo')).id === personaggio.id ? '' :
                            <option value={personaggio.id} key={personaggio.id}>{personaggio.nominativo}</option>
                    )}
                </select>
                <textarea name="testo" id="testo" rows="8" maxLength="300" placeholder="Scrivi messaggio..." onChange={(e) => setTesto(e.target.value)}
                    className="font-lombardia" style={{ fontSize: '2em', backgroundColor: 'transparent', borderTop: 'none', borderRight: 'none', borderBottom: 'none', width: '100%', lineHeight: 1 }}></textarea>
                
                <p>Caratteri rimanenti: <span>{contaParole(300)}</span></p>

                <button type="submit"  disabled={testo === '' || destinatario == 0 ? true : false} style={{ backgroundColor: 'transparent', border: 'none' }}>
                    <img src={chirottero} alt="" style={{ width: '45%' }} title={testo === '' || destinatario == 0 ? "Scegli un Destinatario e Scrivi" : "Invia"}/>
                </button>
            </form>
        </>
    )
}

const inviaChirottero = (testo, destinatario) => {
    let chirottero = {
        mittente: JSON.parse(sessionStorage.getItem('pgAttivo')),
        destinatario: {
            id: destinatario
        },
        testo: testo
    }
    ChirotteriService.invia(chirottero).then(
        alert('Chirottero inviato!')
    )
}
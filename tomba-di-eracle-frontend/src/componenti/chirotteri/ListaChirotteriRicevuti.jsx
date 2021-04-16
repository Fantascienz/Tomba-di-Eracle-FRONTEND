import ChirotteriService from "../../servizi/ChirotteriService"


const ListaChirotteriRicevuti = ({ lista,scelta,sceltaMittente,dataInvio }) => {

    const renderLista = () => {

        const sceltaChirottero = (chirottero) => {
            ChirotteriService.segnaComeLetto(chirottero.id)
            scelta(chirottero.testo)
            sceltaMittente(chirottero.mittente.nominativo)
            dataInvio(chirottero.dataInvio)
        }

        return ( 
            <div style={{overflowY: lista.length === 0 ? '' : 'scroll'}}>
                <h1 className="font-lombardia-yellow bg-dark rounded">Chirotteri ricevuti: {lista.length}</h1>
                { lista.map(chirottero =>
                    <>
                        <button className="btn btn-secondary" key={chirottero.id} onClick={() => sceltaChirottero(chirottero)}>Chirottero di {chirottero.mittente.nominativo}</button>
                        <hr />
                    </>

                )}
            </div>
        )
    }

    return (
        <>
            {lista == undefined ? <h1 className="font-lombardia-yellow bg-dark rounded">Non hai ricevuto chirotteri</h1>
                :
                renderLista()
            }
        </>
    )
}

export default ListaChirotteriRicevuti;
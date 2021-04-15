

const ListaChirotteriRicevuti = ({ lista }) => {

    const renderLista = () => {
        return (
            <>
                <h1 className="font-lombardia-yellow bg-dark rounded">Chirotteri ricevuti: {lista.length}</h1>
                { lista.map(chirottero =>
                    <>
                        <button className="btn btn-secondary" key={chirottero.id}>Chirottero di {chirottero.mittente.nominativo}</button>
                    </>

                )}
            </>
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
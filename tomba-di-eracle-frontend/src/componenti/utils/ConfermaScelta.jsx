
const ConfermaScelta = ({ messaggio, funzione }) => {

    const eseguiFunzione = (conf) => {
        if (conf === 'si') {
            funzione()
        } 
    }

    return (
        <>
            <p>{messaggio}</p>
            <form>
                <button className="btn btn-secondary" onClick={() => eseguiFunzione('si')}> Si</button>
                <button className="btn btn-secondary" onClick={() => eseguiFunzione('no')}> No</button>
            </form>
        </>
    )
}

export default ConfermaScelta;
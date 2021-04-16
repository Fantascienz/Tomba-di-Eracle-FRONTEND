

const MessaggioChirottero = ({ chirottero, mittente, data }) => {
    return (
        <>
            { mittente !== '' ?
                <>
                    <h1 className="font-lombardia-yellow bg-dark rounded">Chirottero di {mittente}</h1>
                    <p className="font-lombardia" style={{ fontSize: '2em' }}>{chirottero} {data}</p>
                </>
                : 
                <h1 className="font-lombardia-yellow bg-dark rounded">Scegli Chirottero</h1>
            }
        </>
    )
}

export default MessaggioChirottero;
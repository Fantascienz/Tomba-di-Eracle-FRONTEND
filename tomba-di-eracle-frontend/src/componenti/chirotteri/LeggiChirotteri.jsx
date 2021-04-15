import ListaChirotteriRicevuti from "./ListaChirotteriRicevuti"


const LeggiChirotteri = ({ricevuti}) => {
    return (
        <>
            <div className="row">
                <div className="col-md-6">
                    <ListaChirotteriRicevuti lista={ricevuti} />
                </div>
                <div className="col-md-6">
                    <h1>Messaggio</h1>
                </div>
            </div>
        </>
    )
}

export default LeggiChirotteri
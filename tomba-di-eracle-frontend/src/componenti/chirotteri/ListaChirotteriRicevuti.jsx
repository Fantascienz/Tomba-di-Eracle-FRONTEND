import ChirotteriService from "../../servizi/ChirotteriService"
import { ModalComponente } from "../utils/ModalComponent"
import MessaggioChirottero from "./MessaggioChirottero"
import ScrollLunga from "../../img/scroll_lunga.png"
import FasciaOraria from "../utils/FasciaOrario"
import pipistrello from "../../img/chirottero_icona.png"



const ListaChirotteriRicevuti = ({ lista, scelta, sceltaMittente, dataInvio, letto }) => {

    const renderLista = () => {

        const sceltaChirottero = (chirottero) => {
            ChirotteriService.segnaComeLetto(chirottero.id)
            scelta(chirottero.testo)
            sceltaMittente(chirottero.mittente.nominativo)
            dataInvio(chirottero.dataInvio)
            letto(chirottero.letto)
        }

        function dataArrivoChirottero(chirottero) {
            var data = new Date(chirottero.dataInvio)
            var giorno = data.toLocaleDateString(undefined, { day: "numeric" });
            var mese = data.toLocaleDateString(undefined, { month: 'long' }).charAt(0).toUpperCase() + data.toLocaleDateString(undefined, { month: 'long' }).slice(1)
            var anno = data.toLocaleDateString(undefined, { year: 'numeric' }) - 810
            var ora = data.toLocaleString(undefined, { hour: 'numeric' })

            var fasciaOraria = FasciaOraria(ora);

            return <b className="font-lombardia">{giorno + " " + mese + " " + anno + ", " + fasciaOraria}</b>
        }



        return (
            <div style={{ overflowY: lista.length === 0 ? '' : 'scroll' }}>
                {/* <h1 className="font-lombardia-yellow bg-dark rounded">Chirotteri ricevuti: {lista.length}</h1> */}
                { lista.map(chirottero =>
                    <div className="row no-gutters">
                        <div className="col" align="right">
                            {chirottero.letto ?
                                <img src={pipistrello} alt="" style={{ width: '45%', opacity: '50%' }} title="Già letto"/>
                                :
                                <img src={pipistrello} alt="" style={{ width: '45%' }} title="Da leggere"/>
                            }
                        </div>

                        <div className="col" align="left">
                            <ModalComponente
                                contenuto={
                                    <div className="centrato" >
                                        {/* SFONDO MODAL----------------------- */}
                                        <div className="centrato" style={{ position: "fixed", backgroundColor: "none" }}>
                                            <img src={ScrollLunga} style={{ height: "50%" }} alt="" />
                                        </div>
                                        <div className="centrato" style={{ position: "relative", backgroundColor: "transparent", height: "100%", width: "100%" }}>
                                            <MessaggioChirottero chirottero={chirottero.testo} mittente={chirottero.mittente.nominativo} data={chirottero.dataInvio} />
                                        </div>
                                    </div>
                                }
                                bottone={
                                    <button className="btn btn-gold" key={chirottero.id} onClick={() => sceltaChirottero(chirottero)}>{dataArrivoChirottero(chirottero)}</button>
                                }
                            />
                        </div>
                        <div className="col">
                        </div>
                        <hr />
                    </div>

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
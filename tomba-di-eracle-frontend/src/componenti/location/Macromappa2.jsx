import { useState } from 'react';
import MacromappaBase from '../../img/macromappa.jpg'
import { presenzaStanze, trovaLocation, trovaLocsFiglie } from '../utils/LocationUtils';

const Macromappa2 = ({ locationSelezionata, idIniziale, navigaLocation }) => {

    var grandezzaMappa = (idIniziale == null || idIniziale <= 288) ? 12 : 0;
    var id1 = (idIniziale == null ? 1 : idIniziale);

    const[griglia, setGriglia] = useState(grandezzaMappa)
    const[idPrimaCella, setIdIniziale] = useState(id1)
    const[mappa, setMappa] = useState(MacromappaBase)


    const apriCella = (idCella) => {

        var gerarchiaCelle = trovaLocsFiglie(idCella);

        //setta l'ID iniziale in base alla prima figlia della CELLA
        setIdIniziale(gerarchiaCelle.figlie[0].padre.id)

        //setta la grandezza della griglia in base al NUMERO DI FIGLIE
        if(gerarchiaCelle.numeroFiglie==9){
            setGriglia(3)
        }else if(gerarchiaCelle.numeroFiglie==4){
            setGriglia(2)
        }else if(gerarchiaCelle.numeroFiglie==1){
            setGriglia(1)
        }

        //modifica la mappa in base alla MINIMAPPA DELLA PRIMA FIGLIA
        setMappa(gerarchiaCelle.figlie[0].padre.urlMinimappa)

    }

    const grigliaMacromappa = () => {

        var columns = griglia;
        var rows = griglia;
        var celleGriglia = []
        var gridTemplateColumnsN = ""
        var gridTemplateRowsN = ""
        // var idStart = (idPrimaCella == null || idPrimaCella <= 144) ? /* MACRO Reame */
        //     0
        //     : (idPrimaCella > 144 && idPrimaCella <= 288) ? /* MACRO Umbra*/
        //         144
        //         // LE LOCATION ESTERNE SONO DA IMPLEMENTARE GRAFICAMENTE ALL?INTERNO DELLA MACROMAPPA
        //         // però i quadretti che le comprandono sono esterno al 12*12, bisogna capire come fare,
        //         // tipo creare una griglia più grande, 14*14: quando è selezionata una Loc. INTERNA alla 12*12 (macro o stanza che sia),
        //         // si mostra solo la griglia che parte da col2-row2 e finisce a col13-row13, mentre qando si seleziona una Loc ESTERNA alla 12*12,
        //         // si mostra tutta la griglia 14*14, oppure solo la griglia di col1 / row1 / col14 / row 14, sempre tenendo conto che non ci sono
        //         // location in col1-row1 / col14-row1 / col1/row14 / col14-row14
        //         // : (idPrimaCella > 288 && idPrimaCella <= 336) ? /* ESTERNA Reame */
        //         //     288 
        //         //     : (idPrimaCella > 336 && idPrimaCella <= 384) ? /* ESTERNA Umbra */
        //         //         336 
        //         : 0 /* da finire ...*/
        var idStart = idPrimaCella<1000 ? idPrimaCella-1 :
                        idPrimaCella>1000&&idPrimaCella<10000 ? idPrimaCella-1000 :
                            idPrimaCella>10000&&idPrimaCella<100000 ? idPrimaCella-10000 :
                                idPrimaCella

        for (let i = 1; i <= rows; i++) {
            for (let j = 1; j <= columns; j++) {
                var locationCella=trovaLocation(idPrimaCella<1000 ? idStart+=1 :
                                                    idPrimaCella>1000&&idPrimaCella<10000 ? idStart+=1000 :
                                                        idPrimaCella>10000&&idPrimaCella<100000 ? idStart+=10000 :
                                                            idStart);


                if(navigaLocation && presenzaStanze(locationCella)){
                    celleGriglia.push(
                        <div
                            id={locationCella.id}
                            title={locationCella.id + " - " + locationCella.nome + " (clicka per aprire)"}l
                            style={{
                                border: "1px solid red",
                                gridColumnStart: `${j}`,
                                gridRowStart: `${i}`,
                                cursor: "pointer"
                            }}
                            onClick={(e) => apriCella(parseInt(e.target.id))}
                        >
                        </div>
                    )
                } else {
                    celleGriglia.push(
                        <div
                            title={locationCella.id + " - " + locationCella.nome}
                            style={{
                                border: "1px solid black",
                                gridColumnStart: `${j}`,
                                gridRowStart: `${i}`,
                            }}
                        >
                        </div>
                    )
                }
            }
        }


        for (let c = 1; c <= columns; c++) {
            gridTemplateColumnsN = gridTemplateColumnsN + "auto "
        }

        for (let r = 1; r <= rows; r++) {
            gridTemplateRowsN = gridTemplateRowsN + "auto "
        }

        return (

            <div style={{
                backgroundColor: "grey",
                gridColumnStart: "2",
                gridRowStart: "2",
                display: "grid",
                gridTemplateColumns: `${gridTemplateColumnsN}`,
                gridTemplateRows: `${gridTemplateRowsN}`,
                backgroundImage: `url('${mappa}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 99.8%"
            }}>

                {(idIniziale > 288 && idIniziale < 385) ? alert("Hai selezionato una location ESTERNA, che non è ancora implementata (vedi componente Macromappa2)") : null}

                {celleGriglia}
            </div>
        )
    }

    return (
        <>
            {grigliaMacromappa()}
        </>
    )

}

export default Macromappa2
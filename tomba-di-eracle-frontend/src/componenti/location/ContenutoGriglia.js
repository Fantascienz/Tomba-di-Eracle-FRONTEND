import star from '../../img/red_star.png'


export const Puntatore = ({ display, idCella }) => {

    function attivaDisplay() {
        if (display == idCella) {
            return ('')
        } else {
            return ('none')
        }
    };


    return (
        <div className="centrato" style={{ position: "relative", backgroundColor: "transparent", height: "100%", width: "100%" }}>
            <img src={star} alt="..." style={{ backgroundColor: "transparent", position: "absolute", height: "100%", width: "auto", display: `${attivaDisplay()}` }} />
        </div>
    )
}



export const RigaGriglia = ({ inizio, fine, idLocation, pxDimensioniMappa, allLocation }) => {
    var pxDimensioniCella = (pxDimensioniMappa / 12);

    function evidenziaCella(idCella) {

        if (allLocation != null) {

            for (let j = 0; j < allLocation.length; j++) {
                if (j == idCella-1) {
                    if (allLocation[j].numeroStanze > 0) {
                        return ('rgba(255,0,0,0.2')
                    }
                }
            }
        }
        return ('transparent')
    };


    function cellaGriglia() {
        let arrayGriglia = []
        for (let i = inizio; i <= fine; i++) {
            arrayGriglia.push({
                codice:
                    <div className="col-sm-1 griglia-macromappa" title={i} id={i} style={{ height: `${pxDimensioniCella}px`, width: `${pxDimensioniCella}px`, backgroundColor: `${evidenziaCella(i)}` }}>
                        <ContenutoCella idLocation={idLocation} idCella={i} />
                    </div>
            })
        }
        return arrayGriglia;
    }

    return (
        <div className="row" style={{ marginLeft: "0.01%" }}>
            {cellaGriglia().map(cella =>
                cella.codice)}
        </div>
    )
}


export const ContenutoCella = ({ idLocation, idCella }) => {
    return (
        <Puntatore display={idLocation} idCella={idCella} />
    )
}
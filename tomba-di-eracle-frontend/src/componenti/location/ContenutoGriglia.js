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
        <div className="centrato" style={{ position: "relative", marginLeft: "-50%", backgroundColor: "transparent", height: "100%", width: "200%" }}>
            <img src={star} alt="..." style={{ height: "100%", width: "auto", display: `${attivaDisplay()}` }} />
        </div>
    )
}



export const RigaGriglia = ({inizio, fine, idLocation, pxDimensioniMappa}) => {

    var pxDimensioniCella = (pxDimensioniMappa/12);

    function cellaGriglia() {
        let arrayGriglia = []
        for (let i = inizio; i<=fine; i++) {
                arrayGriglia.push({
                    codice:
                        <div className="col-sm-1 griglia-macromappa" title={i} id={i} style={{height: `${pxDimensioniCella}px`, width: `${pxDimensioniCella}px`}}>
                            <Puntatore display={idLocation} idCella={i} />
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


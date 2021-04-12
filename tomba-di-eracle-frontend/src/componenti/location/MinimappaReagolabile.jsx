import { ContenutoCella} from '../location/ContenutoGriglia'
import { Magnifier } from 'react-image-magnifiers'


const MinimappaRegolabile = ({ idLocation, pxDimensioniMappa, lenteDisplay, cellePerRiga, immagineMinimappa }) => {

    // idLocation = "144";
    // pxDimensioniMappa = "500" //min 320
    // lenteDisplay = "none"

    var colonnePerRiga = cellePerRiga; //max 7
    var nomeClasse = "row row-cols-" + colonnePerRiga

    function numeroDiCelle(){
        let quantitaCelle = [];
        for (let i = 1 ; i<= colonnePerRiga*colonnePerRiga; i++){
            quantitaCelle.push(
                <div title={i} className="col griglia-macromappa"> 
                    <ContenutoCella idLocation={idLocation} idCella={i}/>
                </div>
            )
        }
        return quantitaCelle;
    }


    return (
        <>
            <div>
                <div className="container-fluid" style={{
                    position: "relative", height: `${pxDimensioniMappa}px`, width: `${pxDimensioniMappa}px`, top: "0",
                    backgroundImage: `url('${immagineMinimappa}')`, backgroundPosition: "center center", backgroundSize: "100% 100%", backgroundRepeat:"no-repeat",
                    backgroundColor: "red"
                }}>

                    <div style={{ position: "relative", zIndex: "2", height: "100%", }}>
                        <div className={nomeClasse} style={{ poisiton: "relative", height: "100%" }}>
                            {numeroDiCelle()}
                        </div>
                    </div>

                    <Magnifier imageSrc={immagineMinimappa} magnifierSize="80%" style={{ position: "absolute", top:"0", zIndex: "3", height: "100%", width: "100%", display: `${lenteDisplay}`, marginLeft:"-12px" }}/>

                </div>
            </div>
        </>
    );
}

export default MinimappaRegolabile;
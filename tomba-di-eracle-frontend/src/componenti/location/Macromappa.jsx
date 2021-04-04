import macromappa from '../../img/macromappa.jpg'
import { Puntatore, RigaGriglia } from '../location/ContenutoGriglia'
import { Magnifier } from 'react-image-magnifiers'


const Macromappa = ({ idLocation, pxDimensioniMappa, lenteDisplay }) => {

    // idLocation = "144";
    // pxDimensioniMappa = "500" //min 320
    // lenteDisplay = "none"

    return (
        <>
            <div>
                <div style={{ position: "relative", height: `${pxDimensioniMappa}px`, width: `${pxDimensioniMappa}px`, top: "0" }}>

                    <div style={{ position: "absolute", zIndex: "1", height: "100%", width: "100%" }}>
                        <img id="giovanni" src={macromappa} alt="..." style={{ height: "100%", width: "100%" }} />
                    </div>

                    <div style={{ position: "relative", zIndex: "2", height: "100%", width: "100%" }}>
                        <RigaGriglia inizio="1" fine="144" idLocation={idLocation} pxDimensioniMappa={pxDimensioniMappa} />
                    </div>

                    <div style={{ position: "absolute", top: "0", zIndex: "3", height: "100%", width: "100%", display: `${lenteDisplay}` }}>
                {/* <GlassMagnifier imageSrc={macromappa} magnifierSize="80%" allowOverflow="false"/> */}
                <Magnifier imageSrc={macromappa} magnifierSize="80%" />
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default Macromappa;
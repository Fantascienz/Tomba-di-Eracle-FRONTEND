import macromappa from '../../img/macromappa.jpg'
import { RigaGriglia } from '../location/ContenutoGriglia'
import { Magnifier } from 'react-image-magnifiers'
import Draggable from 'react-draggable';
import React, { useState } from 'react';
import lente from '../../img/lente.png'


const Macromappa = ({ idLocation, pxDimensioniMappa }) => {

    const [showIngrandimento, setShowIngrandimento] = useState(false);

    // idLocation = "144";
    // pxDimensioniMappa = "500" //min 320
    // lenteDisplay = "none"
    var pxDimensioniCella = (pxDimensioniMappa/12);


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

                    <div style={{ position: "absolute", top: "0", zIndex: "3", height: "100%", width: "100%", display:`${showIngrandimento?'':'none'}` }}>
                        {/* <GlassMagnifier imageSrc={macromappa} magnifierSize="80%" allowOverflow="false"/> */}
                        <Magnifier imageSrc={macromappa} magnifierSize="80%" />
                    </div>

                    <Draggable>
                        <div className="centrato" style={{ position: "absolute", bottom: "0%", right: "-10%", zIndex: "9999", backgroundColor: "transparent" }}>
                            <div className="col-sm-1" title="Pulsante #1" style={{ height: `${pxDimensioniCella}px`, width: `${pxDimensioniCella}px` }}>
                                <img className="btn" title={showIngrandimento?'Riduci' : 'Ingrandisci'} src={lente} style={{width:"150%"}} onClick={() => setShowIngrandimento(!showIngrandimento)} alt=""/>
                            </div>
                        </div>
                    </Draggable>
                </div>

            </div>
        </>
    );
}

export default Macromappa;
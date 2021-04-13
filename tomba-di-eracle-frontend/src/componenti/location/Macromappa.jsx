import macromappa from '../../img/macromappa.jpg'
import { RigaGriglia } from '../location/ContenutoGriglia'
import { Magnifier, GlassMagnifier } from 'react-image-magnifiers'
import Draggable from 'react-draggable';
import React, { useState } from 'react';
import lente from '../../img/lente.png'
import porta from '../../img/porta_icona.png'



const Macromappa = ({ idLocation, pxDimensioniMappa, mostraStanze }) => {

    const [showIngrandimento, setShowIngrandimento] = useState(false);
    const [showStanze, setShowStanze] = useState(false);

    // idLocation = "144";
    // pxDimensioniMappa = "500" //min 320
    // lenteDisplay = "none"
    var pxDimensioniCella = (pxDimensioniMappa / 12);


    return (
        <>
            <div>
                <div style={{ position: "relative", height: `${pxDimensioniMappa}px`, width: `${pxDimensioniMappa}px`, top: "0" }}>

                    {/* MAPPA------------------- */}
                    <div style={{ position: "absolute", zIndex: "1", height: "100%", width: "100%" }}>
                        <img id="giovanni" src={macromappa} alt="..." style={{ height: "100%", width: "100%" }} />
                    </div>

                    {/* SEGNAPOSTO------------- */}
                    <div style={{ position: "relative", zIndex: "2", height: "100%", width: "100%" }}>
                        <RigaGriglia inizio="1" fine="144" idLocation={idLocation} pxDimensioniMappa={pxDimensioniMappa} allLocation={showStanze ? JSON.parse(sessionStorage.getItem('allLocations')) : null} />
                    </div>

                    {/* INGRANDIMENTO---------- */}
                    <div style={{ position: "absolute", top: "0", zIndex: "3", height: "100%", width: "100%", display: `${showIngrandimento ? '' : 'none'}` }}>
                        {/* <GlassMagnifier imageSrc={macromappa} magnifierSize="80%" allowOverflow="false"/> */}
                        <Magnifier imageSrc={macromappa} magnifierSize="80%" />
                    </div>


                    {/* PULSANTIERA------------ */}
                    <Draggable>
                        <div className="centrato" style={{ position: "absolute", bottom: "0%", right: "-10%", zIndex: "9999", backgroundColor: "transparent" }}>
                            {mostraStanze ?
                                <div title="Pulsante #1" style={{ height: `${pxDimensioniCella}px`, width: `${pxDimensioniCella}px` }}>
                                    <img className="btn centrato" title={showStanze ? 'Non Mostrare Stanze' : 'Mostra Stanze'} src={porta} style={{ height: "130%" }} onClick={() => setShowStanze(!showStanze)} alt="" />
                                </div>
                                :
                                null
                            }
                            <div title="Ingrandimento" style={{ height: `${pxDimensioniCella}px`, width: `${pxDimensioniCella}px` }}>
                                <img className="btn" title={showIngrandimento ? 'Riduci' : 'Ingrandisci'} src={lente} style={{ width: "150%" }} onClick={() => setShowIngrandimento(!showIngrandimento)} alt="" />
                            </div>
                        </div>
                    </Draggable>
                </div>

            </div>
        </>
    );
}

export default Macromappa;
import { ContenutoCella } from '../location/ContenutoGriglia'
import { Magnifier } from 'react-image-magnifiers'


const MinimappaRegolabile = ({ idLocation, pxDimensioniMappa, lenteDisplay, cellePerRiga, immagineMinimappa }) => {

    // idLocation = "144";
    // pxDimensioniMappa = "500" //min 320
    // lenteDisplay = "none"
    //cellePerRiga = 3 | 2 | 1

    var colonnePerRiga = cellePerRiga; //max 3
    var nomeClasse = "row row-cols-" + colonnePerRiga
    var idLocationNumber = parseInt(idLocation);

    // function numeroDiCelle(){
    //     let quantitaCelle = [];
    //     for (let i = 1 ; i<= colonnePerRiga*colonnePerRiga; i++){
    //         quantitaCelle.push(
    //             <div title={i} className="col griglia-macromappa"> 
    //             </div>
    //         )
    //     }
    //     return quantitaCelle;
    // }

    function numeroDiCelle() {
        if (cellePerRiga == 3) {
            return (
                <>
                    <div title={1000+idLocationNumber}
                        style={{
                        gridColumnStart: "1",
                        gridRowStart: "1",
                        border: "1px solid black"
                    }}
                    ></div>
                    <div title={2000+idLocationNumber} 
                        style={{
                        gridColumnStart: "2",
                        gridRowStart: "1",
                        border: "1px solid black"
                    }}
                    ></div>
                    <div title={3000+idLocationNumber} 
                        style={{
                        gridColumnStart: "3",
                        gridRowStart: "1",
                        border: "1px solid black"
                    }}
                    ></div>
                    <div title={4000+idLocationNumber} 
                        style={{
                        gridColumnStart: "1",
                        gridRowStart: "2",
                        border: "1px solid black"
                    }}
                    ></div>
                    <div title={5000+idLocationNumber} 
                        style={{
                        gridColumnStart: "2",
                        gridRowStart: "2",
                        border: "1px solid black"
                    }}
                    ></div>
                    <div title={6000+idLocationNumber} 
                        style={{
                        gridColumnStart: "3",
                        gridRowStart: "2",
                        border: "1px solid black"
                    }}
                    ></div>
                    <div title={7000+idLocationNumber} 
                        style={{
                        gridColumnStart: "1",
                        gridRowStart: "3",
                        border: "1px solid black"
                    }}
                    ></div>
                    <div title={8000+idLocationNumber} 
                        style={{
                        gridColumnStart: "2",
                        gridRowStart: "3",
                        border: "1px solid black"
                    }}
                    ></div>
                    <div title={9000+idLocationNumber} 
                        style={{
                        gridColumnStart: "3",
                        gridRowStart: "3",
                        border: "1px solid black"
                    }}
                    ></div>
                </>
            )
        } else if (cellePerRiga == 2) {
            return (
                <>
                    <div title={10000+idLocationNumber} 
                        style={{
                        gridColumnStart: "1",
                        gridRowStart: "1",
                        border: "1px solid black"
                    }}
                    ></div>
                    <div title={20000+idLocationNumber} 
                        style={{
                        gridColumnStart: "2",
                        gridRowStart: "1",
                        border: "1px solid black"
                    }}
                    ></div>
                    <div title={30000+idLocationNumber} 
                        style={{
                        gridColumnStart: "1",
                        gridRowStart: "2",
                        border: "1px solid black"
                    }}
                    ></div>
                    <div title={40000+idLocationNumber} 
                        style={{
                        gridColumnStart: "2",
                        gridRowStart: "2",
                        border: "1px solid black"
                    }}
                    ></div>
                </>
            )
        } else if(cellePerRiga==1){
            return (
                <>
                    <div title={100000+idLocationNumber} 
                        style={{
                        gridColumnStart: "1",
                        gridRowStart: "1",
                        border: "1px solid black"
                    }}
                    ></div>
                </>
            )

        }
    }

    var gridTemplateColumns = cellePerRiga == 3 ? "auto auto auto" : cellePerRiga == 2 ? "auto auto" : "auto"
    var gridTemplateRows = cellePerRiga == 3 ? "auto auto auto" : cellePerRiga == 2 ? "auto auto" : "auto"


    return (
        <>
            {/* <div>
                <div className="container-fluid" style={{
                    position: "relative", 
                    height: `${pxDimensioniMappa}px`, 
                    width: `${pxDimensioniMappa}px`, 
                    top: "0",
                    backgroundImage: `url('${immagineMinimappa}')`, 
                    backgroundPosition: "center center", 
                    backgroundSize: "100% 100%", 
                    backgroundRepeat:"no-repeat",
                    backgroundColor: "red"
                }}>

                    <div style={{ position: "relative", zIndex: "2", height: "100%", }}>
                        <div className={nomeClasse} style={{ poisiton: "relative", height: "100%" }}>
                            {numeroDiCelle()}
                        </div>
                    </div>

                    <Magnifier imageSrc={immagineMinimappa} magnifierSize="80%" style={{ position: "absolute", top:"0", zIndex: "3", height: "100%", width: "100%", display: `${lenteDisplay}`, marginLeft:"-12px" }}/>

                </div>
            </div> */}

            <div>
                <div style={{
                    position: "relative",
                    height: `${pxDimensioniMappa}vh`,
                    width: `${pxDimensioniMappa}vh`,
                    top: "0",
                    backgroundImage: `url('${immagineMinimappa}')`,
                    backgroundPosition: "center center",
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    backgroundColor: "grey",
                    display: "grid",
                    gridTemplateColumns: { gridTemplateColumns },
                    gridTemplateRows: { gridTemplateRows },
                }}>

                    {numeroDiCelle()}

                    <Magnifier imageSrc={immagineMinimappa} magnifierSize="80%" style={{ position: "absolute", top: "0", zIndex: "3", height: "100%", width: "100%", display: `${lenteDisplay}`, marginLeft: "-12px" }} />

                </div>
            </div>
        </>
    );
}

export default MinimappaRegolabile;
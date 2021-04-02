import Modal from 'react-bootstrap/Modal'
import React, { useState } from 'react';
import Macromappa from '../location/Macromappa'
import Scroll from '../../img/scroll.png'
import mappa from '../../img/mappa_icona.png'


// export const ModalMinimappa = ({ idLocation }) => {
//     const [show, setShow] = useState(false);
//     var location = idLocation;
//     return (
//         <>
//             <img className="icona-alta" src={mappa} onClick={() => setShow(true)} />

//             <Modal
//                 show={show}
//                 onHide={() => setShow(false)}
//                 dialogClassName="modal-50w"
//                 aria-labelledby="example-custom-modal-styling-title"
//                 size="xl"
//                 scrollable="true"
//                 centered
//             >
//                     <Modal.Body >
//                         <div className="centrato" >

//                             <div className="centrato" style={{ position: "fixed", backgroundColor: "none" }}>
//                                 <img src={Scroll} style={{ height: "800px", transform: "rotate(90deg)" }} />
//                             </div>

//                             <div className="centrato" style={{ position: "relative", backgroundColor: "transparent", height: "100%", width: "100%" }}>
//                                 <Macromappa idLocation={location} pxDimensioniMappa="500" lenteDisplay="none" />
//                             </div>

//                         </div>
//                     </Modal.Body>
//             </Modal>
//         </>
//     );
// }


export const ModalComponente = ({ bottone, contenuto }) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <div onClick={() => setShow(true)} >
                {bottone}
            </div>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-50w"
                aria-labelledby="example-custom-modal-styling-title"
                size="xl"
                scrollable="true"
                centered
            >
                <Modal.Body >
                    {contenuto}
                </Modal.Body>
            </Modal>
        </>
    );
}
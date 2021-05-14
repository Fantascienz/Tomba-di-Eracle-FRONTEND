import Modal from 'react-bootstrap/Modal'
import React, { useState } from 'react';
import { SuonoModal } from './SuonoSuImmagine';
import Scroll from '../../img/scroll.png'
import srotolaCarta from '../../suoni/flip_card.mp3'




export const ModalComponente = ({ bottone, contenuto, suono, size }) => {
    const [show, setShow] = useState(false);
    // eslint-disable-next-line
    var taglia = size == undefined ? 'xl' : size;

    return (
        <>
            {suono != undefined ?
                <SuonoModal suono={suono}
                    funzione={{ onend: () => setShow(true) }}
                    bottone={bottone} />
                : <div onClick={() => setShow(true)}>
                    {bottone}
                </div>
            }

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-50w"
                aria-labelledby="example-custom-modal-styling-title"
                size={taglia}
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


export const ModalPergamena = ({ bottone, contenuto, size }) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <SuonoModal suono={srotolaCarta}
                funzione={{ onend: () => setShow(true) }}
                bottone={bottone} />

            <Modal show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-50w"
                aria-labelledby="example-custom-modal-styling-title"
                size='sm'
                scrollable="true"
                centered
            >
                <Modal.Body >
                    <div className="centrato" >
                        <div className="centrato" style={{ position: "fixed", backgroundColor: "none" }}>
                            <img src={Scroll} style={{ height: "800px", transform: "rotate(90deg)" }} alt="" />
                        </div>

                        {contenuto}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}
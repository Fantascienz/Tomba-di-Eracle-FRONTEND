import Modal from 'react-bootstrap/Modal'
import React, { useState } from 'react';
import { SuonoModal } from './SuonoSuImmagine';


export const ModalComponente = ({ bottone, contenuto, suono, size }) => {
    const [show, setShow] = useState(false);
    // eslint-disable-next-line
    var taglia = size == undefined ? 'xl' : size;

    return (
        <>
            {suono != undefined ? 
            <SuonoModal suono={suono}
                        funzione={{ onend: () => setShow(true) }}
                        bottone={bottone}/>
            :   <div onClick={() => setShow(true)}>
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
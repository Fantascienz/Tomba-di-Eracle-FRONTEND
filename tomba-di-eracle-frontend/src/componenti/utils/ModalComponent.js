import Modal from 'react-bootstrap/Modal'
import React, { useState } from 'react';
import { SuonoModal } from './SuonoSuImmagine';


export const ModalComponente = ({ bottone, contenuto, suono }) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <SuonoModal suono={suono}
                        funzione={{ onend: () => setShow(true) }}
                        bottone={bottone}/>

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
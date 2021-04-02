import Modal from 'react-bootstrap/Modal'
import React, { useState } from 'react';


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
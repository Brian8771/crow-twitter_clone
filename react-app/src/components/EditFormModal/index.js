import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditCaw from '../EditCaw';


function EditFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button style={{ color: 'black', padding: '0', margin: '0', height: '50%', width: '100%', borderRadius: '40px' }} onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditCaw hideModal={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    );
}

export default EditFormModal;

import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditComment from '../EditComment';


function EditCommentModal({ id, setIsLoaded }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button style={{ color: 'black', padding: '0', margin: '0', height: '20px', width: '60px', borderRadius: '40px', cursor: 'pointer' }} onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditComment setIsLoaded={setIsLoaded} id={id} hideModal={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    );
}

export default EditCommentModal;

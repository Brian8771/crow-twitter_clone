import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditComment from '../EditComment';


function EditCommentModal({ id }) {
    const [showModal, setShowModal] = useState(false);
    // console.log(id)
    return (
        <>
            <button style={{ color: 'black', padding: '0', margin: '0', height: '25%', width: '100%', borderRadius: '40px' }} onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditComment id={id} hideModal={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    );
}

export default EditCommentModal;

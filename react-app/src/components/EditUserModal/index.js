import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditUser from '../editUser';


function EditUserModal({ setLoaded }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button style={{ color: 'black', padding: '0', margin: '0', height: '30%', width: '90%', borderRadius: '40px', cursor: 'pointer' }} onClick={() => setShowModal(true)}>Edit Profile</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditUser setLoaded={setLoaded} hideModal={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    );
}

export default EditUserModal;

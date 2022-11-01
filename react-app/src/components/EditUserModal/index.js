import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditUser from '../editUser';


function EditUserModal({ setLoaded }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button className='editProfileButton'  onClick={() => setShowModal(true)}>Edit Profile</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditUser setLoaded={setLoaded} hideModal={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    );
}

export default EditUserModal;

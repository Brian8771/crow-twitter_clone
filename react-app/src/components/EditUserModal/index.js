import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditUser from '../editUser';


function EditUserModal({ setLoaded }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button className='text-black bg-white p-0 m-0 w-28 h-11 rounded-full text-sm transition-all duration-500 hover:bg-grayish ' onClick={() => setShowModal(true)}>Edit Profile</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditUser setLoaded={setLoaded} hideModal={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    );
}

export default EditUserModal;

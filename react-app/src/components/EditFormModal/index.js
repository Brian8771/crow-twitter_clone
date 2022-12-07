import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditCaw from '../EditCaw';


function EditFormModal() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button className='bg-white text-center items-center rounded-full h-5 w-16 text-black mr-1 text-sm' onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditCaw hideModal={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    );
}

export default EditFormModal;

import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditComment from '../EditComment';


function EditCommentModal({ id, setRefreshComment }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button className='bg-white text-center items-center rounded-full h-5 w-16 text-black mr-1 text-sm' onClick={() => setShowModal(true)}>Edit</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditComment setRefreshComment={setRefreshComment} id={id} hideModal={() => setShowModal(false)} />
                </Modal>
            )}
        </>
    );
}

export default EditCommentModal;

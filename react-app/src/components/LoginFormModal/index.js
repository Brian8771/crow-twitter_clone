import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginFormForModal from '../LoginFormForModal';

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginFormForModal setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;

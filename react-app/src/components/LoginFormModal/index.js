import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginFormForModal from '../LoginFormForModal';
import '../../styles/LoginForm.css'

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="loginButton" onClick={() => setShowModal(true)}>Sign In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginFormForModal className='LoginFormModal' setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;

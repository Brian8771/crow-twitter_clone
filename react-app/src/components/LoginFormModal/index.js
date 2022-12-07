import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginFormForModal from '../LoginFormForModal';
import '../../styles/LoginForm.css'

function LoginFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="font-medium h-12 w-72 rounded-full text-sm mt-3 bg-white text-black text-center items-center justify-center hover:bg-grayish transition-all duration-500" onClick={() => setShowModal(true)}>Log In</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LoginFormForModal className='LoginFormModal border-white' setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default LoginFormModal;

import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignUpForm from '../auth/SignUpForm';
import '../../styles/LoginForm.css'

function SignUpFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className="font-medium h-12 w-72 rounded-full text-sm mt-3 bg-white text-black text-center items-center justify-center hover:bg-grayish transition-all duration-500" onClick={() => setShowModal(true)}>Sign up with Email</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignUpForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default SignUpFormModal;

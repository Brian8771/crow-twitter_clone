import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UserFollowers from '../UserFollowers';




function UserFollowersModal({ id, totalFollowers }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className='ml-3'>
            {<button className='text-sm' style={{ border: 'none', color: 'white', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={() => setShowModal(true)}>{totalFollowers} <span style={{ color: 'gray', marginLeft: '3px' }}>Followers</span></button>}
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UserFollowers id={id} hideModal={() => setShowModal(false)} />
                </Modal>
            )}
        </div>
    );
}

export default UserFollowersModal;

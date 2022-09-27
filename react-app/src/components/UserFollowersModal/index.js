import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UserFollowers from '../UserFollowers';




function UserFollowersModal({ id, totalFollowers }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            {<button style={{ border: 'none', color: 'black', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={() => setShowModal(true)}>{totalFollowers} Followers</button>}
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UserFollowers id={id} hideModal={() => setShowModal(false)} />
                </Modal>
            )}
        </div>
    );
}

export default UserFollowersModal;

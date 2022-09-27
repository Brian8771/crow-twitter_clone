import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import UserFollowings from '../UserFollowings';





function UserFollowingsModal({ id, totalFollowings }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            {<button style={{ marginLeft: '.70rem', border: 'none', color: 'black', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={() => setShowModal(true)}>{totalFollowings} Following</button>}
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <UserFollowings id={id} hideModal={() => setShowModal(false)} />
                </Modal>
            )}
        </div>
    );
}

export default UserFollowingsModal;

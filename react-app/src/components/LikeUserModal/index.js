import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../../context/Modal';
import { getCawFromId } from '../../store/caws';
import LikeUsers from '../LikeUsers';




function LikeUser({ id, totalLikes }) {
    const dispatch = useDispatch();
    // const totalLikes = useSelector(state => state.caws.caws[id].totalLikes)
    const [showModal, setShowModal] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(getCawFromId(id)).then(() => setIsLoaded(true))
    }, [id])

    return (
        <div>
            {isLoaded && <button style={{ border: 'none', color: 'black', backgroundColor: 'transparent', cursor: 'pointer' }} onClick={() => setShowModal(true)}>Likes: {totalLikes}</button>}
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <LikeUsers id={id} hideModal={() => setShowModal(false)} />
                </Modal>
            )}
        </div>
    );
}

export default LikeUser;

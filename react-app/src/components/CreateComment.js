import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createCaw, getAllCaws } from '../store/caws';
import '../styles/Homepage.css'
import { addComment, getComments } from '../store/comments';

const CreateComment = ({ setIsLoaded }) => {
    const [comment, setComment] = useState('');
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    const caw = useSelector(state => state.caws.caw)
    const { id } = useParams()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const commentInfo = {
            comment
        }
        let commentCreated = await dispatch(addComment(id, commentInfo));
        if (commentCreated) setIsLoaded(false);
        await dispatch(getComments(id));
        setIsLoaded(true)
        setComment('');
        // history.push('/1')
        // history.push('/')
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', borderBottom: 'black .5px solid', padding: '10px 10px', borderLeft: 'black .5px solid', borderRight: 'black .5px solid', margin: '0' }}>
            <div>
                <img style={{ height: '48px', width: '48px', borderRadius: '50%', padding: '5px 10px' }} src={user.profileImage} alt='profilePic' />
            </div>
            <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                <form onSubmit={handleSubmit} className='pTag' >
                    <div>
                        <textarea
                            style={{ width: '90%', height: '6rem', border: 'none', resize: 'none' }}
                            type='text'
                            value={comment}
                            placeholder='Post a Caw?'
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button style={{ height: '30px', width: '20%', margin: '0', backgroundColor: 'black', borderRadius: '20px', border: 'none' }} type='submit'>Post</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default CreateComment

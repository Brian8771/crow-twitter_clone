import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createCaw, getAllCaws } from '../store/caws';
import '../styles/Homepage.css'
import { addComment, getComments } from '../store/comments';

const CreateComment = ({ setIsLoaded }) => {
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    const caw = useSelector(state => state.caws.caw)
    const { id } = useParams()
    let amount = caw.totalComments
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length === 0) {
            return setErrors(["Can't post an empty comment"])
        }
        if (comment.match(/^\s*$/)) {
            return setErrors(["Can't post an empty comment"])
        }
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

    useEffect(() => {
        if (comment.length > 180) {
            setErrors(["Comment can't be more than 180 characters"])
        }
        else setErrors(null);
    }, [comment])


    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', borderBottom: 'black .5px solid', padding: '10px 10px', borderLeft: 'black .5px solid', borderRight: 'black .5px solid', margin: '0', height: '7.2rem' }}>
            <div>
                <img style={{ height: '48px', width: '48px', borderRadius: '50%', padding: '5px 10px' }} src={user.profileImage} alt='profilePic' />
            </div>
            <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                <form onSubmit={handleSubmit} className='pTag' >
                    <div>
                        {errors &&
                            errors.map((error, ind) => (
                                <div style={{ color: 'red' }} key={ind}>{error}</div>
                            ))
                        }
                    </div>
                    <div>
                        <textarea
                            style={{ width: '90%', height: '4.2rem', border: 'none', resize: 'none' }}
                            type='text'
                            value={comment}
                            placeholder='Post a comment?'
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button disabled={errors ? true : false} className='submitButtonForComment' type='submit'>Post</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default CreateComment

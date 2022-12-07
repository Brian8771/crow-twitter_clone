import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../styles/Homepage.css'
import { addComment, getComments } from '../store/comments';

const CreateComment = ({ setIsLoaded }) => {
    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user);
    const caw = useSelector(state => state.caws.caw)
    const { id } = useParams()
    // let amount = caw.totalComments
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length === 0) {
            return setErrors(['Comment cannot be empty'])
        }
        if (comment.match(/^\s*$/)) {
            return setErrors(["Comment cannot be empty"])
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
        <div className='flex items-start p-2.5 h-29' style={{ borderBottom: '#2f3336 1px solid', borderLeft: 'black .5px solid', borderRight: 'black .5px solid' }}>
            <div className='px-2.5 py-1.5 mr-3.5'>
                <img className='h-12 w-12 rounded-full max-w-none' src={user.profileImage} alt='profilePic' />
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
                            className='text-sm text-gray-900 '
                            style={{ width: '90%', height: '4.2rem', border: 'none', resize: 'none', backgroundColor: 'black' }}
                            type='text'
                            value={comment}
                            placeholder='Post a comment?'
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button disabled={errors ? true : false} className='h-7 w-20 rounded-full m-0 bg-white text-black transition-all duration-500 hover:bg-grayish text-sm disabled:bg-black' type='submit'>Reply</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default CreateComment

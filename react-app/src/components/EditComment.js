import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getComments } from '../store/comments';
import { editComment } from '../store/comments';



const EditComment = ({ setRefreshComment, hideModal, id }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([]);
    const edit_comment = useSelector(state => state.comments.comments[id])
    const image = edit_comment.user.profileImage
    const [comment, setComment] = useState(edit_comment.data)

    function handleChange(event) {
        setComment(event.target.value)
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
    }

    useEffect(() => {
        let error = []
        if (!comment) error.push("Can't post an empty comment")
        if (comment.length > 180) {
            error.push("Comment can't be more than 180 characters")
        }
        setErrors(error);
    }, [comment])


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

        await dispatch(editComment(id, commentInfo));
        await setRefreshComment(false)
        await dispatch(getComments(id));
        await setRefreshComment(true)
        hideModal()
        setComment('');

    }


    return (
        <form className='h-[20rem] w-[36rem] border-[.5px] border-white bg-black text-white flex flex-col justify-center items-center rounded-xl' onSubmit={handleSubmit}>
            <div className='relative top-0 flex w-full items-center px-5 py-3'>
                <p className='cursor-pointer' onClick={() => hideModal()}>X</p>
                <h2 className='text-2xl ml-12 font-black'>Edit Comment</h2>
            </div>
            <div className='w-full flex h-full pl-8 mt-2 overflow-y-scroll'>
                <div className='w-full flex h-full items-start'>
                    <div className='h-full'>
                        <img className=' h-24 w-28 rounded-full' src={image} alt='profile pic' />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                        <div>
                            {errors &&
                                errors.map((error, ind) => (
                                    <div style={{ color: 'red', marginBottom: '10px' }} key={ind}>{error}</div>
                                ))
                            }
                        </div>
                        <textarea
                            className='text-white bg-black text-md w-full pl-8 pr-4'
                            style={{ border: 'none', resize: 'none', marginBottom: '10px' }}
                            type='text'
                            name='firstName'
                            value={comment}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <div className='flex w-full justify-end pb-2 px-6'>
                <button disabled={errors ? true : false} className='w-20 h-8 m-0 rounded-3xl bg-[#eff3f4] text-black cursor-pointer font-bold' type='submit'>Update</button>
            </div>
        </form>
    )
}

export default EditComment

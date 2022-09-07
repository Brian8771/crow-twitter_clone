import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getComments } from '../store/comments';
import { editComment } from '../store/comments';



const EditComment = ({ setIsLoaded, hideModal, id }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([]);
    const edit_comment = useSelector(state => state.comments.comments[id])

    const [comment, setComment] = useState(edit_comment.data)

    // if (edit_comment) {
    //     setComment(edit_comment.data)
    // }

    useEffect(() => {
        if (comment.length > 180) {
            setErrors(["Comment can't be more than 180 characters"])
        }
        else setErrors(null);
    }, [comment])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const commentInfo = {
            comment
        }

        await dispatch(editComment(id, commentInfo));
        setIsLoaded(false)
        await dispatch(getComments(id));
        setIsLoaded(true)
        hideModal()
        setComment('');

    }


    return (
        <form className='editFormModal' onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                <div>
                    <h2>Edit comment</h2>
                </div>
                <div>
                    {errors &&
                        errors.map((error, ind) => (
                            <div style={{ color: 'red', marginBottom: '10px' }} key={ind}>{error}</div>
                        ))
                    }
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '70%', alignItems: 'center' }}>
                    <textarea
                        style={{ width: '90%', height: '5rem', border: 'none', resize: 'none', marginBottom: '10px' }}
                        type='text'
                        name='firstName'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button disabled={errors ? true : false} className='submitButton' type='submit'>Edit</button>
                </div>
            </div>
        </form>
    )
}

export default EditComment

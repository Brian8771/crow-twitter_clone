import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getComments } from '../store/comments';
import { editComment } from '../store/comments';



const EditComment = ({ setIsLoaded, hideModal, id }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const edit_comment = useSelector(state => state.comments.comments[id])

    const [comment, setComment] = useState(edit_comment.data)

    // if (edit_comment) {
    //     setComment(edit_comment.data)
    // }



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
        <form onSubmit={handleSubmit}>
            <div>
                <input

                    type='text'
                    name='firstName'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button type='submit'>Edit</button>
            </div>
        </form>
    )
}

export default EditComment

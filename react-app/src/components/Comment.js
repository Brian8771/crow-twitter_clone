import React from "react";
import { NavLink } from "react-router-dom";
import likedIcon from '../images/liked.png'
import { useDispatch } from "react-redux";
import { likeCommentThunk, getAllCommentsByUserId } from "../store/comments";

const Comment = ({ comment, setRefresh, userId }) => {
    const dispatch = useDispatch()

    const timeAfterCreated = (caw) => {
        const age = Date.now() - Date.parse(caw.createdAt);
        let res;
        const second = Math.floor(age / 1000)
        const minute = Math.floor(second / 60);
        const hour = Math.floor(minute / 60);
        const day = Math.floor(hour / 24);
        const week = Math.floor(day / 7)
        if (week > 0) {
            res = caw.createdAt.split(', '[1])[2] + ' ' + caw.createdAt.split(', '[1])[1]
        }
        else if (day > 0) {
            res = caw.createdAt.split(', '[1])[2] + ' ' + caw.createdAt.split(', '[1])[1]
        }
        else if (hour > 0) {
            res = `${hour}h`
        }
        else if (minute > 0) {
            res = `${minute}m`
        }
        else {
            res = `${second}s`
        }

        return res
    }

    const handleCommentLikes = async (commentId) => {
        await dispatch(likeCommentThunk(commentId))
        setRefresh(false)
        await getAllCommentsByUserId(userId)
        setRefresh(true)
    }

    return (
        <div className='flex items-start p-[10px] w-full' style={{ borderBottom: '#2f3336 1px solid', borderLeft: 'black .5px solid', borderRight: 'black .5px solid' }}>
            <div className='px-2.5 py-1.5 mr-3'>
                <img className='h-12 w-12 rounded-full object-cover' src={comment.user.profileImage} alt='profilePic' />
            </div>
            <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start', width: '80%' }}>
                <NavLink style={{ textDecoration: 'none' }} to={`/users/${comment.userId}`}>

                    <p style={{ color: 'white' }} className='pTag'><span className='firstNameP'>{comment.user.firstName}</span> <span style={{ color: 'gray' }}>@{comment.caw.username}</span><span style={{ marginLeft: '6px', color: 'gray' }}>{timeAfterCreated(comment)}</span></p>
                </NavLink>
                <NavLink style={{ textDecoration: 'none' }} to={`/caw/${comment.caw.id}`}>
                    <p className='pTag' style={{ paddingTop: '10px', width: '100%', marginRight: '0', color: 'white' }} >{comment.data}</p>
                </NavLink>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <div className='likeButton' onClick={() => handleCommentLikes(comment.id)}>
                        {comment.likeStatus === 1 ?
                            <div className='svgContainer'>
                                <img src={likedIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
                            </div>
                            :
                            <div className='svgContainer'>
                                <svg className='svgHeart' height="16px" viewBox="0 0 93 87" >
                                    <path d="M46.0625 86.6892H45.9983C34.1596 86.4692 0 55.605 0 26.3725C0 12.3292 11.5729 0 24.7637 0C35.2596 0 42.3179 7.24167 46.0579 12.5125C49.7887 7.25083 56.8471 0 67.3475 0C80.5475 0 92.1158 12.3292 92.1158 26.3771C92.1158 55.6004 57.9517 86.4646 46.1129 86.68H46.0625V86.6892ZM24.7683 6.87958C15.235 6.87958 6.87958 15.9912 6.87958 26.3817C6.87958 52.69 39.1187 79.53 46.0671 79.8142C53.0246 79.53 85.2546 52.6946 85.2546 26.3817C85.2546 15.9912 76.8992 6.87958 67.3658 6.87958C55.7792 6.87958 49.3075 20.3362 49.2525 20.4692C48.1983 23.045 43.9542 23.045 42.8954 20.4692C42.8312 20.3317 36.3642 6.87958 24.7729 6.87958H24.7683Z" />
                                </svg>
                            </div>
                        }
                        {comment.likeStatus === 1 ?
                            <p style={{ marginLeft: '12px', cursor: 'pointer', color: '#f9197f' }}>{comment.totalLikes}</p> :
                            <p className='numberOfLikes'>{comment.totalLikes}</p>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Comment;

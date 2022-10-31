import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getCawFromId, deleteCaw, getAllCaws, likeCawThunk, likeUsersThunk } from '../store/caws';
import EditFormModal from './EditFormModal';
import EditCommentModal from './EditCommentModal';
import '../styles/Homepage.css'
import backArrow from '../images/arrow-back.svg'
import { getComments, deleteComment, likeCommentThunk } from '../store/comments';
import CreateComment from './CreateComment';
import comment from '../images/comment.png';
import likeIcon from '../images/like.png';
import likedIcon from '../images/liked.png'
import LikeUser from './LikeUserModal';

const PostDetail = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams()
    const [loaded, setLoaded] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false);
    const [refresh, setRefresh] = useState(true);
    const [like, setLike] = useState(true);
    const caw = useSelector(state => state.caws.caw);
    const likeStatus = useSelector(state => state.caws.caw.likeStatus)
    const totalLikes = useSelector(state => state.caws.caw.totalLikes)
    const user = useSelector(state => state.session.user);
    const comments = Object.values(useSelector(state => state.comments.comments)).filter(x => x.caw.id === caw.id)
    const [editModal, setEditModal] = useState(false);


    const handleLikes = async (id) => {
        await dispatch(likeCawThunk(id))
        setLike(false)
        await getAllCaws()
        await dispatch(likeUsersThunk(id))
        setLike(true)
    }

    const handleCommentLikes = async (commentId) => {
        await dispatch(likeCommentThunk(commentId))
        setRefresh(false)
        await getComments(id)
        setRefresh(true)
    }

    const delete_caw = (id) => {
        // await dispatch(deleteCaw(id));
        dispatch(deleteCaw(id)).then(() => dispatch(getAllCaws())).then(() => history.push('/'))
        // await dispatch(getAllCaws());
        // return history.push('/');
    }

    const delete_comment = async (identification) => {
        await dispatch(deleteComment(identification));
        setLoaded(false)
        await dispatch(getComments(id));
        setLoaded(true)
    }

    useEffect(() => {
        dispatch(getCawFromId(id)).then(dispatch(getAllCaws())).then(() => dispatch(getComments(id))).then(() => setIsLoaded(true)).then(() => setLoaded(true))
    }, [dispatch, id]);


    return (
        <div className='homePageContainer'>
            {caw && isLoaded &&
                <div>

                    <div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', border: '#2f3336 1px solid', backgroundColor: 'black' }}>
                            <NavLink style={{ textDecoration: 'none' }} to='/'>
                                <img style={{ height: '20px', width: '20px', margin: '0 10px' }} src={backArrow} alt='backarrow' />
                            </NavLink>
                            <h2 style={{ marginLeft: '20px', color: 'white' }}>Caw</h2>
                        </div>
                        {caw &&
                            <div style={{ display: 'flex', flexDirection: 'column', height: 'auto', borderBottom: '#2f3336 1px solid', borderLeft: 'black .5px solid', borderRight: 'black .5px solid', padding: '10px 0' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', padding: '10px' }}>
                                    <img style={{ height: '48px', width: '48px', borderRadius: '50%', padding: '5px 10px' }} src={caw.user.profileImage} alt='profilePic' />
                                    <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                                        <NavLink style={{ textDecoration: 'none' }} to={`/users/${caw.user.id}`}>
                                            <p className='pTag'>{caw.user.username} <span style={{ color: 'gray' }}>@{caw.user.username}</span></p>
                                        </NavLink>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: 'auto' }}>
                                    <div style={{ display: 'flex', width: '80%', padding: '10px', height: '100%' }}>
                                        <p style={{ wordBreak: 'break-word', height: 'auto', paddingLeft: '10px', color: 'white' }} className='pTag' >{caw.caw}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', width: '25%', padding: '6px' }}>
                                        {caw.user.id === user.id && <EditFormModal setShowModal={setEditModal} caw={caw.id} />}
                                        {caw.user.id === user.id && <button style={{ backgroundColor: 'black', padding: '0', margin: '0', height: '24px', width: '100%', borderRadius: '40px', cursor: 'pointer' }} onClick={() => delete_caw(caw.id)}>Delete</button>}
                                    </div>
                                </div>
                                <div style={{ marginLeft: '8px', margin: '0 1rem', borderTop: '#2f3336 1px solid', borderBottom: '#2f3336 1px solid' }}>
                                    <p style={{ marginLeft: '8px', color: '#464a4c', cursor: 'pointer' }}><LikeUser totalLikes={totalLikes} loaded={loaded} id={id} /></p>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    {caw && loaded && <div onClick={() => handleLikes(caw.id)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        {like && likeStatus === 1 ?
                                            <img src={likedIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
                                            :
                                            // <img src={likeIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
                                            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 93 87" fill="none">
                                            <path d="M46.0625 86.6892H45.9983C34.1596 86.4692 0 55.605 0 26.3725C0 12.3292 11.5729 0 24.7637 0C35.2596 0 42.3179 7.24167 46.0579 12.5125C49.7887 7.25083 56.8471 0 67.3475 0C80.5475 0 92.1158 12.3292 92.1158 26.3771C92.1158 55.6004 57.9517 86.4646 46.1129 86.68H46.0625V86.6892ZM24.7683 6.87958C15.235 6.87958 6.87958 15.9912 6.87958 26.3817C6.87958 52.69 39.1187 79.53 46.0671 79.8142C53.0246 79.53 85.2546 52.6946 85.2546 26.3817C85.2546 15.9912 76.8992 6.87958 67.3658 6.87958C55.7792 6.87958 49.3075 20.3362 49.2525 20.4692C48.1983 23.045 43.9542 23.045 42.8954 20.4692C42.8312 20.3317 36.3642 6.87958 24.7729 6.87958H24.7683Z" fill="#71767A"/>
                                            </svg>
                                        }
                                    </div>}
                                    <NavLink style={{ textDecoration: 'none' }} to={`/caw/${caw.id}`}>
                                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '0px', justifyContent: 'flex-start', alignItems: 'center' }}>
                                            <img style={{ height: '16px' }} src={comment} alt='comment' />
                                            <p style={{ marginLeft: '8px', color: 'grey' }}>{caw.totalComments}</p>
                                        </div>
                                    </NavLink>
                                </div>

                            </div>

                        }
                    </div>


                    <div>
                        <CreateComment setIsLoaded={setIsLoaded} />
                    </div>

                    <div>
                        <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                            {comments && isLoaded &&
                                comments.map(comment => {
                                    return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', borderBottom: '#2f3336 1px solid', padding: '10px 10px', borderLeft: 'black .5px solid', borderRight: 'black .5px solid', width: '100%' }}>
                                        <div>
                                            <img style={{ height: '48px', width: '48px', borderRadius: '50%', padding: '5px 10px' }} src={comment.user.profileImage} alt='profilePic' />
                                        </div>
                                        <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                                            <NavLink style={{ textDecoration: 'none' }} to={`/users/${comment.user.id}`}>
                                                <p style={{color: 'white'}} className='pTag'>{comment.user.username} <span style={{ color: 'gray' }}>Replying to @{caw.user.username}</span></p>
                                            </NavLink>
                                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                                <div style={{ width: '100%' }}>
                                                    <p style={{ wordBreak: 'break-word', color: 'white' }} className='pTag' >{comment.data}</p>
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', padding: '0', justifyContent: 'center', height: '20%' }}>
                                                    {comment.user.id === user.id && <EditCommentModal setIsLoaded={setIsLoaded} setShowModal={setEditModal} id={comment.id} />}
                                                    {comment.user.id === user.id && <button style={{ backgroundColor: 'black', padding: '0', margin: '0', height: '20px', width: '60px', borderRadius: '40px', cursor: 'pointer' }} onClick={() => delete_comment(comment.id)}>Delete</button>}
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '.3rem' }} onClick={() => handleCommentLikes(comment.id)}>
                                                {refresh && comment.likeStatus === 1 ?
                                                    <img src={likedIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
                                                    :
                                                    // <img src={likeIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 93 87" fill="none">
                                                    <path d="M46.0625 86.6892H45.9983C34.1596 86.4692 0 55.605 0 26.3725C0 12.3292 11.5729 0 24.7637 0C35.2596 0 42.3179 7.24167 46.0579 12.5125C49.7887 7.25083 56.8471 0 67.3475 0C80.5475 0 92.1158 12.3292 92.1158 26.3771C92.1158 55.6004 57.9517 86.4646 46.1129 86.68H46.0625V86.6892ZM24.7683 6.87958C15.235 6.87958 6.87958 15.9912 6.87958 26.3817C6.87958 52.69 39.1187 79.53 46.0671 79.8142C53.0246 79.53 85.2546 52.6946 85.2546 26.3817C85.2546 15.9912 76.8992 6.87958 67.3658 6.87958C55.7792 6.87958 49.3075 20.3362 49.2525 20.4692C48.1983 23.045 43.9542 23.045 42.8954 20.4692C42.8312 20.3317 36.3642 6.87958 24.7729 6.87958H24.7683Z" fill="#71767A"/>
                                                    </svg>
                                                }
                                                <p style={{ marginLeft: '8px', color: 'grey', cursor: 'pointer' }}>{comment.totalLikes}</p>
                                            </div>
                                        </div>

                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            }
        </div >


    )
}

export default PostDetail

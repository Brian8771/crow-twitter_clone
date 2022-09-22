import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getCawFromId, deleteCaw, getAllCaws, likeCawThunk } from '../store/caws';
import EditFormModal from './EditFormModal';
import EditCommentModal from './EditCommentModal';
import '../styles/Homepage.css'
import backArrow from '../images/arrow-back.svg'
import { getComments, deleteComment, likeCommentThunk } from '../store/comments';
import CreateComment from './CreateComment';
import comment from '../images/comment.png';
import likeIcon from '../images/like.png';
import likedIcon from '../images/liked.png'

const PostDetail = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams()
    const [loaded, setLoaded] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false);
    const [refresh, setRefresh] = useState(true);
    const caw = useSelector(state => state.caws.caw);
    const likeStatus = useSelector(state => state.caws.caw.likeStatus)
    const totalLikes = useSelector(state => state.caws.caw.totalLikes)
    const user = useSelector(state => state.session.user);
    const comments = Object.values(useSelector(state => state.comments.comments)).filter(x => x.caw.id === caw.id)
    const [editModal, setEditModal] = useState(false);


    const handleLikes = async (id) => {
        await dispatch(likeCawThunk(id))
        setRefresh(false)
        await getAllCaws()
        setRefresh(true)

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
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', border: 'black .5px solid' }}>
                            <NavLink style={{ textDecoration: 'none' }} to='/'>
                                <img style={{ height: '20px', width: '20px', margin: '0 10px' }} src={backArrow} alt='backarrow' />
                            </NavLink>
                            <h2 style={{ marginLeft: '20px', color: 'black' }}>Thread</h2>
                        </div>
                        {caw &&
                            <div style={{ display: 'flex', flexDirection: 'column', height: 'auto', borderBottom: 'black .5px solid', borderLeft: 'black .5px solid', borderRight: 'black .5px solid', padding: '10px 0' }}>
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
                                        <p style={{ wordBreak: 'break-word', height: 'auto', paddingLeft: '10px' }} className='pTag' >{caw.caw}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', width: '25%', padding: '6px' }}>
                                        {caw.user.id === user.id && <EditFormModal setShowModal={setEditModal} caw={caw.id} />}
                                        {caw.user.id === user.id && <button style={{ backgroundColor: 'black', padding: '0', margin: '0', height: '24px', width: '100%', borderRadius: '40px', cursor: 'pointer' }} onClick={() => delete_caw(caw.id)}>Delete</button>}
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                                    {caw && loaded && <div onClick={() => handleLikes(caw.id)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        {refresh && likeStatus === 1 ?
                                            <img src={likedIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
                                            :
                                            <img src={likeIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
                                        }
                                        <p style={{ marginLeft: '8px', color: 'black', cursor: 'pointer' }}>{totalLikes}</p>
                                    </div>}
                                    <NavLink style={{ textDecoration: 'none' }} to={`/caw/${caw.id}`}>
                                        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '0px', justifyContent: 'flex-start', alignItems: 'center' }}>
                                            <img style={{ height: '16px', backgroundColor: 'white' }} src={comment} alt='comment' />
                                            <p style={{ marginLeft: '8px', color: 'black' }}>{caw.totalComments}</p>
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
                                    return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', borderBottom: 'black .5px solid', padding: '10px 10px', borderLeft: 'black .5px solid', borderRight: 'black .5px solid', width: '100%' }}>
                                        <div>
                                            <img style={{ height: '48px', width: '48px', borderRadius: '50%', padding: '5px 10px' }} src={comment.user.profileImage} alt='profilePic' />
                                        </div>
                                        <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                                            <NavLink style={{ textDecoration: 'none' }} to={`/users/${comment.user.id}`}>
                                                <p className='pTag'>{comment.user.username} <span style={{ color: 'gray' }}>Replying to @{caw.user.username}</span></p>
                                            </NavLink>
                                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                                <div style={{ width: '100%' }}>
                                                    <p style={{ wordBreak: 'break-word' }} className='pTag' >{comment.data}</p>
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
                                                    <img src={likeIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
                                                }
                                                <p style={{ marginLeft: '8px', color: 'black', cursor: 'pointer' }}>{comment.totalLikes}</p>
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

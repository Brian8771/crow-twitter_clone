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
import likedIcon from '../images/liked.png'
import LikeUser from './LikeUserModal';

const PostDetail = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams()
    const [loaded, setLoaded] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false);
    const [refreshComment, setRefreshComment] = useState(true);
    const [refresh, setRefresh] = useState(true);
    const [like, setLike] = useState(true);
    const [showButtons, setShowButtons] = useState(false);
    const [showCommentButtons, setShowCommentButtons] = useState(false);
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
                        <div className='my-3' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: 'black' }}>
                            <NavLink style={{ textDecoration: 'none' }} to='/'>
                                <img style={{ height: '20px', width: '20px', margin: '0 10px' }} src={backArrow} alt='backarrow' />
                            </NavLink>
                            <h2 className='font-bold' style={{ marginLeft: '20px', color: 'white', fontSize: '20px' }}>Caw</h2>
                        </div>
                        {caw &&
                            <div style={{ display: 'flex', flexDirection: 'column', height: 'auto', borderBottom: '#2f3336 1px solid', borderLeft: 'black .5px solid', borderRight: 'black .5px solid', padding: '10px 0' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', padding: '10px', alignItems: 'center' }}>
                                    <img className='h-12 w-12 rounded-full mx-3.5' src={caw.user.profileImage} alt='profilePic' />
                                    <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                                        <NavLink style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} to={`/users/${caw.user.id}`}>
                                            <p style={{ color: 'white' }} className='pTag firstNameP'>{caw.user.firstName}</p>
                                            <p style={{ color: 'gray', margin: '0', fontSize: '15px' }}>@{caw.user.username}</p>
                                        </NavLink>
                                    </div>
                                    {!showButtons && caw.userId === user.id && <div onClick={() => setShowButtons(true)} style={{ display: 'flex', cursor: 'pointer', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: '6px', height: 'fit-content' }}>
                                        <svg fill='white' height='20px' viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>
                                    </div>}
                                    {showButtons && <div style={{ display: 'flex', flexDirection: 'row', width: '25%', padding: '6px', height: 'fit-content' }}>
                                        {caw.user.id === user.id && <EditFormModal setShowModal={setEditModal} caw={caw.id} />}
                                        {caw.user.id === user.id && <button style={{ backgroundColor: 'black', padding: '0', margin: '0', height: '24px', width: '100%', borderRadius: '40px', cursor: 'pointer' }} onClick={() => delete_caw(caw.id)}>Delete</button>}
                                    </div>}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: 'auto' }}>
                                        <div style={{ display: 'flex', padding: '10px', height: '100%', flexDirection: 'column' }}>
                                            <p style={{ wordBreak: 'break-word', height: 'auto', paddingLeft: '10px', color: 'white', fontSize: '23px', width: 'auto' }} className='pTag' >{caw.caw}</p>
                                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>
                                        {caw.image && <img style={{ height: 'auto', width: '90%' }} className='cawImage' src={caw.image} alt='image' />}
                                    </div>
                                </div>
                                <span style={{ marginLeft: '20px', color: 'gray', marginTop: '10px' }}>{timeAfterCreated(caw)}</span>
                                <div style={{ marginLeft: '8px', margin: '0 1rem', borderTop: '#2f3336 1px solid', borderBottom: '#2f3336 1px solid', marginTop: '10px' }}>
                                    <p className='my-3' style={{ marginLeft: '8px', color: '#464a4c', cursor: 'pointer' }}>
                                        <LikeUser totalLikes={totalLikes} loaded={loaded} id={id} />
                                    </p>
                                </div>
                                <div className='my-3' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                    {caw && loaded && <div className='likeButton' onClick={() => handleLikes(caw.id)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        {like && likeStatus === 1 ?
                                            <div className='svgContainerDetails'>
                                                <img src={likedIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
                                            </div>
                                            :
                                            // <img src={likeIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
                                            <div className='svgContainerDetails'>
                                                <svg className='svgHeart' xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 93 87">
                                                    <path d="M46.0625 86.6892H45.9983C34.1596 86.4692 0 55.605 0 26.3725C0 12.3292 11.5729 0 24.7637 0C35.2596 0 42.3179 7.24167 46.0579 12.5125C49.7887 7.25083 56.8471 0 67.3475 0C80.5475 0 92.1158 12.3292 92.1158 26.3771C92.1158 55.6004 57.9517 86.4646 46.1129 86.68H46.0625V86.6892ZM24.7683 6.87958C15.235 6.87958 6.87958 15.9912 6.87958 26.3817C6.87958 52.69 39.1187 79.53 46.0671 79.8142C53.0246 79.53 85.2546 52.6946 85.2546 26.3817C85.2546 15.9912 76.8992 6.87958 67.3658 6.87958C55.7792 6.87958 49.3075 20.3362 49.2525 20.4692C48.1983 23.045 43.9542 23.045 42.8954 20.4692C42.8312 20.3317 36.3642 6.87958 24.7729 6.87958H24.7683Z" />
                                                </svg>
                                            </div>
                                        }
                                    </div>}
                                    <NavLink style={{ textDecoration: 'none' }} to={`/caw/${caw.id}`}>
                                        <div className='commentButton' >
                                            {/* <img style={{ height: '16px' }} src={comment} alt='comment' /> */}
                                            <div className='svgContainer'>
                                                <svg className='svgComment' height="20px" viewBox="0 0 140 140" >
                                                    <path d="M81.935 13.0783L57.7383 13.02H57.7267C32.2117 13.02 12.2267 33.0108 12.2267 58.5317C12.2267 82.4367 30.8117 100.567 55.7725 101.523V123.853C55.7725 124.483 56.0292 125.522 56.4725 126.204C57.3008 127.517 58.7125 128.228 60.1592 128.228C60.9642 128.228 61.775 128.007 62.5042 127.54C64.0442 126.56 100.263 103.39 109.684 95.4217C120.779 86.03 127.418 72.2633 127.435 58.6017V58.5025C127.4 33.0283 107.427 13.0783 81.935 13.0725V13.0783ZM104.026 88.7483C97.4108 94.3483 75.6642 108.611 64.5225 115.833V97.2417C64.5225 94.8267 62.5683 92.8667 60.1475 92.8667H57.8375C36.4875 92.8667 20.9825 78.4233 20.9825 58.5317C20.9825 37.9167 37.1292 21.77 57.7325 21.77L81.9233 21.8283H81.935C102.538 21.8283 118.685 37.9633 118.697 58.555C118.679 69.6967 113.202 80.9783 104.032 88.7483H104.026Z" />
                                                </svg>
                                            </div>
                                            <p className='totalComments'>{caw.totalComments}</p>
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
                            {comments && refreshComment &&
                                comments.map(comment => {
                                    return <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', borderBottom: '#2f3336 1px solid', padding: '10px 10px', borderLeft: 'black .5px solid', borderRight: 'black .5px solid', width: '100%' }}>
                                        <div className='px-2.5 py-1.5 mr-3'>
                                            <img className='h-12 w-12 max-w-none rounded-full' src={comment.user.profileImage} alt='profilePic' />
                                        </div>
                                        <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                                                <div>
                                                    <NavLink style={{ textDecoration: 'none' }} to={`/users/${comment.user.id}`}>
                                                        <p style={{ color: 'white' }} className='pTag'><span className='firstNameP'>{comment.user.firstName}</span> <span style={{ color: 'gray', marginLeft: '8px' }}>@{comment.user.username}</span><span style={{ color: 'gray', marginLeft: '8px' }}>
                                                            {timeAfterCreated(comment)}
                                                        </span></p>
                                                    </NavLink>
                                                    <NavLink style={{ textDecoration: 'none' }} to={`/users/${caw.user.id}`}>
                                                        <span style={{ color: 'gray', fontSize: '15px' }}>Replying to @{caw.user.username}</span>
                                                    </NavLink>

                                                </div>
                                                {!showCommentButtons && comment.userid === user.id && <div onClick={() => setShowCommentButtons(true)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                                                    <svg fill='white' height='20px' viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-1hdv0qi"><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>
                                                </div>}
                                                {showCommentButtons && <div className='flex items-center'>
                                                    <div className='flex p-0 justify-center'>
                                                        {comment.user.id === user.id && <EditCommentModal setRefreshComment={setRefreshComment} setShowModal={setEditModal} id={comment.id} />}
                                                        {comment.user.id === user.id &&
                                                            <button className='bg-black h-5 w-16 text-center items-center  border rounded-full text-sm' onClick={() => delete_comment(comment.id)}>Delete</button>}
                                                    </div>
                                                </div>}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                                <div style={{ width: '100%' }}>
                                                    <p style={{ wordBreak: 'break-word', color: 'white' }} className='pTag' >{comment.data}</p>
                                                </div>
                                            </div>
                                            <div className='likeButton' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: '.3rem' }} onClick={() => handleCommentLikes(comment.id)}>
                                                {refresh && comment.likeStatus === 1 ?
                                                    <div className='svgContainer'>
                                                        <img src={likedIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
                                                    </div>
                                                    :
                                                    // <img src={likeIcon} alt="like-button-icon" className="like-button-icon" style={{ height: '16px', width: '16px', cursor: 'pointer' }} />
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

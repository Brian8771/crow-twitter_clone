import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { getCawFromId, deleteCaw, getAllCaws } from '../store/caws';
import EditFormModal from './EditFormModal';
import EditCommentModal from './EditCommentModal';
import '../styles/Homepage.css'
import backArrow from '../images/arrow-back.svg'
import { getComments, deleteComment } from '../store/comments';
import CreateComment from './CreateComment';


const PostDetail = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams()
    const [isLoaded, setIsLoaded] = useState(false);
    const caw = useSelector(state => state.caws.caw);
    const user = useSelector(state => state.session.user);
    const comments = Object.values(useSelector(state => state.comments.comments)).filter(x => x.caw.id === caw.id)
    const [editModal, setEditModal] = useState(false);


    const delete_caw = async (id) => {
        await dispatch(deleteCaw(id));
        await dispatch(getAllCaws());
        history.push('/');
    }

    const delete_comment = async (identification) => {
        await dispatch(deleteComment(identification));
        setIsLoaded(false)
        await dispatch(getComments(id));
        setIsLoaded(true)
    }

    useEffect(() => {
        dispatch(getCawFromId(id)).then(() => dispatch(getComments(id))).then(() => setIsLoaded(true))
    }, [dispatch, id]);


    return (
        <div className='homePageContainer'>
            {isLoaded &&
                <div>

                    <div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', border: 'black .5px solid' }}>
                            <NavLink style={{ textDecoration: 'none' }} to='/'>
                                <img style={{ height: '20px', width: '20px', margin: '0 10px' }} src={backArrow} alt='backarrow' />
                            </NavLink>
                            <h2 style={{ marginLeft: '20px', color: 'black' }}>Thread</h2>
                        </div>
                        {caw &&
                            <div style={{ display: 'flex', flexDirection: 'column', height: '10rem', borderBottom: 'black .5px solid', borderLeft: 'black .5px solid', borderRight: 'black .5px solid', padding: '10px 0' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', padding: '10px' }}>
                                    <img style={{ height: '48px', width: '48px', borderRadius: '50%', padding: '5px 10px' }} src={caw.user.profileImage} alt='profilePic' />
                                    <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                                        <NavLink style={{ textDecoration: 'none' }} to={`/users/${caw.user.id}`}>
                                            <p className='pTag'>{caw.user.username} <span style={{ color: 'gray' }}>@{caw.user.username}</span></p>
                                        </NavLink>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '6rem' }}>
                                    <div style={{ display: 'flex', width: '80%', padding: '10px' }}>
                                        <p style={{ wordBreak: 'break-word' }} className='pTag' >{caw.caw}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row', width: '25%', padding: '6px' }}>
                                        {caw.user.id === user.id && <EditFormModal setShowModal={setEditModal} caw={caw.id} />}
                                        {caw.user.id === user.id && <button style={{ backgroundColor: 'black', padding: '0', margin: '0', height: '30%', width: '100%', borderRadius: '40px', cursor: 'pointer' }} onClick={() => delete_caw(caw.id)}>Delete</button>}
                                    </div>
                                </div>

                            </div>

                        }
                    </div>


                    <div>
                        <CreateComment setIsLoaded={setIsLoaded} />
                    </div>

                    <div>
                        <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                            {comments &&
                                comments.map(comment => {
                                    { console.log(comment) }
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

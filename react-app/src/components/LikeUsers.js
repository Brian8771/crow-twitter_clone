import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { likeUsersThunk } from "../store/caws";
import { followUser, unfollowUser } from "../store/session";



const LikeUsers = ({ id }) => {
    const dispatch = useDispatch();
    const [refresh, setRefresh] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const users = Object.values(useSelector(state => state.caws.likedUsers))
    const session = useSelector(state => state.session.user);


    const ifFollows = (user) => {
        const follows = user.followers
        let arr = []
        for (let follow of follows) {
            arr.push(follow.id)
        }
        if (arr.includes(session.id)) {
            return true
        }
        return false;
    }

    const followingUser = async (user) => {
        await dispatch(followUser(user.username))
        await setRefresh(false)
        await dispatch(likeUsersThunk(id))
        await setRefresh(true)
    }

    const unfollowingUser = async (user) => {
        await dispatch(unfollowUser(user.username))
        await setRefresh(false)
        await dispatch(likeUsersThunk(id))
        await setRefresh(true)
    }

    useEffect(() => {
        dispatch(likeUsersThunk(id)).then(setIsLoaded(true))
    }, [id])
    return (
        <div className="editFormModal" style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', overflowY: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', paddingLeft: '1rem', width: '100%' }}>
                <div style={{ position: 'sticky', top: '0', backgroundColor: 'black' }}>
                    <h2 className='text-2xl font-black pt-5 pb-2 '>Liked by</h2>
                </div>
                <div style={{ width: '90%' }} >
                    {users && isLoaded && users.map(user => {
                        return <div key={user.id} style={{ display: 'flex', flexDirection: 'row' }}>
                            <NavLink style={{ textDecoration: 'none', width: '100%' }} to={`/users/${user.id}`}>
                                <div className='profileDiv' style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <img className='border-black border-2 rounded-full h-9 w-9' src={user.profileImage} />
                                        </div>
                                        <div style={{ marginLeft: '.5em' }}>
                                            <p className='userPTag'>{user.firstName}</p>
                                            <p className='userPTag'>@{user.username}</p>
                                        </div>
                                    </div>
                                </div>
                            </NavLink>
                            {session.id !== user.id && refresh && <div style={{ display: 'flex', width: '20%', marginRight: '8px', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                {!ifFollows(user) ? <button onClick={() => followingUser(user)} style={{ color: 'black', backgroundColor: 'white', padding: '0', margin: '0', width: '100%', borderRadius: '40px', cursor: 'pointer' }}>Follow</button> : <button onClick={() => unfollowingUser(user)} style={{ color: 'white', backgroundColor: 'black', padding: '0', margin: '0', width: '100%', borderRadius: '40px', cursor: 'pointer' }}>Unfollow</button>}
                            </div>}
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default LikeUsers

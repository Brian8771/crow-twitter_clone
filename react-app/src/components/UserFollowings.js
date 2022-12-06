import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getFollowings } from "../store/session";



const UserFollowings = ({ id, hideModal }) => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const users = Object.values(useSelector(state => state.session.followings))
    useEffect(() => {
        dispatch(getFollowings(id)).then(() => setIsLoaded(true))
    }, [id])
    return (
        <div className="editFormModal" style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', overflowY: 'scroll' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: '1rem' }}>
                <div style={{ position: 'sticky', top: '0', backgroundColor: 'black', width: '100%' }}>
                    <h2 className='text-2xl font-black pt-5 pb-2'>Following</h2>
                </div>
                <div >
                    {users && isLoaded && users.map(user => {
                        return <NavLink onClick={hideModal} style={{ textDecoration: 'none' }} to={`/users/${user.id}`}>
                            <div className='profileDiv'>
                                <div>
                                    <img className='border-black border-2 rounded-full h-9 w-9' src={user.profileImage} />
                                </div>
                                <div style={{ marginLeft: '.5em' }}>
                                    <p className='userPTag'>{user.firstName}</p>
                                    <p className='userPTag'>@{user.username}</p>
                                </div>
                            </div>
                        </NavLink>
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserFollowings;

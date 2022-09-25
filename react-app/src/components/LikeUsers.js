import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { likeUsersThunk } from "../store/caws";



const LikeUsers = ({ id }) => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);
    const users = Object.values(useSelector(state => state.caws.likedUsers))
    console.log('this', users)
    useEffect(() => {
        dispatch(likeUsersThunk(id)).then(setIsLoaded(true))
    }, [id])
    return (
        <div className="editFormModal" style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: '1rem' }}>
                <div>
                    <h2>Liked by</h2>
                </div>
                <div>
                    {users && isLoaded && users.map(user => {
                        return <NavLink style={{ textDecoration: 'none' }} to={`/users/${user.id}`}>
                            <div className='profileDiv'>
                                <div>
                                    <img className='imgNav' src={user.profileImage} />
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

export default LikeUsers

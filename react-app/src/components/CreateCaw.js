import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createCaw, getAllCaws } from '../store/caws';
import '../styles/Homepage.css'


const CreateCaw = () => {
    const [caw, setCaw] = useState('');
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user);
    const caws = useSelector(state => state.caws.caws);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // setErrors([]);
        const cawInfo = {
            caw
        }
        await dispatch(createCaw(cawInfo));
        await dispatch(getAllCaws());

        setCaw('');
        history.push('/1')
        history.push('/')
        // console.log(caws)
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', borderBottom: 'black .5px solid', padding: '10px 10px', borderLeft: 'black .5px solid', borderRight: 'black .5px solid' }}>
            <div>
                <img style={{ height: '48px', width: '48px', borderRadius: '50%', padding: '5px 10px' }} src={user.profileImage} alt='profilePic' />
            </div>
            <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <form onSubmit={handleSubmit} className='pTag' >
                    <div>
                        <textarea
                            // style={{ overflow }}
                            type='text'
                            value={caw}
                            placeholder='Post a Caw?'
                            onChange={(e) => setCaw(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type='submit'>Post</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default CreateCaw

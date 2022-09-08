import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createCaw, getAllCaws } from '../store/caws';
import '../styles/Homepage.css'


const CreateCaw = ({ setLoaded }) => {
    const [errors, setErrors] = useState([]);
    const [caw, setCaw] = useState('');
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (caw.length === 0) {
            return setErrors(["Can't post an empty caw"])
        }

        if (caw.match(/^\s*$/)) {
            return setErrors(["Can't post an empty caw"])
        }
        const cawInfo = {
            caw
        }
        let cawCreated = await dispatch(createCaw(cawInfo));
        await setLoaded(false);
        await dispatch(getAllCaws());
        await setLoaded(true)
        // await setErrors(cawCreated)
        setCaw('');
        // history.push('/1')
        // history.push('/')
    }

    useEffect(() => {
        if (caw.length > 180) {
            setErrors(["Can't be more than 180 characters"])
        }
        else setErrors(null);
    }, [caw])

    return (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', borderBottom: 'black .5px solid', padding: '10px 10px', borderLeft: 'black .5px solid', borderRight: 'black .5px solid', margin: '0' }}>
            <div>
                <img style={{ height: '48px', width: '48px', borderRadius: '50%', padding: '5px 10px' }} src={user.profileImage} alt='profilePic' />
            </div>
            <div className='test' style={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                <form onSubmit={handleSubmit} className='pTag' >
                    <div>
                        {errors &&
                            errors.map((error, ind) => (
                                <div style={{ color: 'red' }} key={ind}>{error}</div>
                            ))
                        }
                    </div>
                    <div>
                        <textarea
                            style={{ width: '90%', height: '6rem', border: 'none', resize: 'none' }}
                            type='text'
                            value={caw}
                            placeholder='Post a Caw?'
                            onChange={(e) => setCaw(e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button disabled={errors ? true : false} className='submitButtonForCaw' type='submit'>Post</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default CreateCaw

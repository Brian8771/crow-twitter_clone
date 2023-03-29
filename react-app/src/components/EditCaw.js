import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCawFromId } from '../store/caws';
import { cawToEdit } from '../store/caws';
import '../styles/LoginForm.css';


const EditCaw = ({ hideModal }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const edit_caw = useSelector(state => state.caws.caw)
    const [caw, setCaw] = useState(edit_caw.caw)
    const image = edit_caw.image
    const [errors, setErrors] = useState([]);

    function handleChange(event) {
        setCaw(event.target.value)
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (caw.length === 0) {
            return setErrors(["Can't post an empty Caw"])
        }

        if (caw.match(/^\s*$/)) {
            return setErrors(["Can't post an empty caw"])
        }

        const cawInfo = {
            caw
        }
        await dispatch(cawToEdit(edit_caw.id, cawInfo));
        await dispatch(getCawFromId(edit_caw.id));
        hideModal()
        // history.push(`/${edit_caw.id}`)
        setCaw('');
        // history.push('/1')
        // history.push('/')
    }

    useEffect(() => {
        if (caw.length > 180) {
            setErrors(["Caw can't be more than 180 characters"])
        }
        else setErrors(null);
    }, [caw])


    return (
        <form className={` ${image ? 'h-[40rem]' : 'h-[20rem]'} w-[36rem] border-[.5px] border-white bg-black text-white flex flex-col justify-center items-center rounded-xl`} onSubmit={handleSubmit}>
            <div className='relative top-0 flex w-full items-center px-5 py-3'>
                <p className='cursor-pointer' onClick={() => hideModal()}>X</p>
                <h2 className='text-2xl ml-12 font-black'>Edit Caw</h2>
            </div>
            <div className='w-full flex h-full pl-8 mt-2 overflow-y-scroll'>
                <div className='w-full flex items-start'>
                    <div className='h-full'>
                        <img className=' h-24 w-28 rounded-full' src={edit_caw.user.profileImage} alt='profile pic' />
                    </div>
                    <div className='' style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                        <div>
                            {errors &&
                                errors.map((error, ind) => (
                                    <div style={{ color: 'red', marginBottom: '10px' }} key={ind}>{error}</div>
                                ))
                            }
                        </div>
                        <textarea
                            className='text-white bg-black text-md w-full pl-8 pr-4'
                            style={{ border: 'none', resize: 'none', marginBottom: '10px' }}
                            type='text'
                            name='firstName'
                            value={caw}
                            onChange={handleChange}
                        />
                        {image && <img className='h-96 w-96 aspect-square rounded-md' src={image} alt='image' />}
                    </div>
                </div>
            </div>
            <div className='flex w-full justify-end pb-2 px-6'>
                <button className='w-20 h-8 m-0 rounded-3xl bg-[#eff3f4] text-black cursor-pointer font-bold' disabled={errors ? true : false} type='submit'>Update</button>
            </div>
        </form>
    )
}

export default EditCaw

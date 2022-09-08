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
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const variables = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
        if (caw.length === 0) {
            return setErrors(["Can't post an empty Caw"])
        }
        if (caw.length > 0) {
            let arr = [];
            for (let el of caw) {
                if (variables.includes(el)) arr.push(el)
            }
            if (arr.length === 0) {
                return setErrors(["Can't post an empty caw"])

            }
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
        <form className='editFormModal' onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%' }}>
                <div>
                    <h2>Edit Caw</h2>
                </div>
                <div>
                    {errors &&
                        errors.map((error, ind) => (
                            <div style={{ color: 'red', marginBottom: '10px' }} key={ind}>{error}</div>
                        ))
                    }
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: '70%', alignItems: 'center' }}>
                    <textarea
                        style={{ width: '90%', height: '5rem', border: 'none', resize: 'none', marginBottom: '10px' }}
                        type='text'
                        name='firstName'
                        value={caw}
                        onChange={(e) => setCaw(e.target.value)}
                    />
                    <button className='submitButton' disabled={errors ? true : false} type='submit'>Edit</button>
                </div>
            </div>
        </form>
    )
}

export default EditCaw

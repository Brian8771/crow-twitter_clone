import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getCawFromId } from '../store/caws';
import { cawToEdit } from '../store/caws';


const EditCaw = ({ hideModal }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const edit_caw = useSelector(state => state.caws.caw)
    const [caw, setCaw] = useState(edit_caw.caw)
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cawInfo = {
            caw
        }
        if (caw.length > 180) {
            setErrors(['Cannot be longer than 180 characters']);
            return
        }
        await dispatch(cawToEdit(edit_caw.id, cawInfo));
        await dispatch(getCawFromId(edit_caw.id));
        hideModal()
        // history.push(`/${edit_caw.id}`)
        setCaw('');
        // history.push('/1')
        // history.push('/')
    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                {errors &&
                    errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))
                }
            </div>
            <div>
                <input
                    type='text'
                    name='firstName'
                    value={caw}
                    onChange={(e) => setCaw(e.target.value)}
                />
                <button type='submit'>Edit</button>
            </div>
        </form>
    )
}

export default EditCaw

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCaws } from '../store/caws';
import '../styles/Homepage.css'

const HomePage = () => {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false);
    const caws = Object.values(useSelector(state => state.caws.caws))

    useEffect(() => {
        dispatch(getAllCaws()).then(() => setLoaded(true))
    }, [])


    return (
        <div className='homePageContainer' >
            <div>
                <h1>Home</h1>
            </div>
            <div >
                <ul>
                    {loaded &&
                        caws.map(caw => {
                            { console.log(caw.caw) }
                            return <li key={caw.id}>{caw.caw}</li>
                        })
                    }
                </ul>
            </div>
        </div>

    )
}

export default HomePage

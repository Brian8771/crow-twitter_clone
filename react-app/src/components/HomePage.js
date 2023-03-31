import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCaws } from '../store/caws';
import CreateCaw from './CreateCaw';
import '../styles/Homepage.css'
import { getAllUsers, getFollowings } from '../store/session';
import '../../src/index.css'
import Caw from './Caw';

const HomePage = () => {
    const dispatch = useDispatch()
    const [loaded, setLoaded] = useState(false);
    const caws = Object.values(useSelector(state => state.caws.caws))
    const cawses = useSelector(state => state.caws.caws);
    const users = useSelector(state => state.session.users);
    const session = useSelector(state => state.session.user);
    const following = Object.values(useSelector(state => state.session.followings))
    const [loader, setLoader] = useState(false)
    const [loaders, setLoaders] = useState(false)

    const followerCaws = () => {
        let arr = []
        arr.push(session.id)
        let newArr = []
        for (let user of following) arr.push(user.id)
        // console.log('arr', arr)
        for (let caw of caws) {
            // console.log('caw', caw)
            // console.log(follows)
            if (arr.includes(caw.user.id)) newArr.push(caw)
        }
        return newArr
    }

    const content = <div className='flex flex-col-reverse'>
        {followerCaws().length > 0 && caws && users && loaded ?
            followerCaws().map(caw => {

                return <Caw caw={caw} setLoaded={setLoaded} />
            }) :
            <div className='flex justify-center items-center'>
                <div className='flex justify-center w-[90%]'>
                    {loaded && <h1 className='text-black flex justify-center items-center'>Follow Users to see their Caws</h1>}
                </div>
            </div>
        }

    </div>

    // console.log(followerCaws())
    // console.log(caws)

    useEffect(() => {
        setLoader(true)
        dispatch(getAllCaws()).then(dispatch(getAllUsers())).then(dispatch(getFollowings(session.id))).then(() => setLoaded(true)).then(() => setLoader(false))
    }, [dispatch, CreateCaw])


    return (
        <div className='homePageContainer' >
            <div >
                <div className='sticky top-0'>
                    <h1 className='header font-bold text-white text-xl' style={{ backgroundColor: 'rgba(0 0 0 / .85)' }}>Home</h1>
                </div>
                <div >
                    <CreateCaw setLoaded={setLoaded} setLoader={setLoaders} />
                </div>



                {loader ?
                    <>
                        <div className="bg-black">
                            <div className="border-b-[1px] bg-black border-gray-600 shadow pt-2 p-3 pb-5 max-w-lrg w-full mx-auto">
                                <div className="animate-pulse flex space-x-3">
                                    <div className='px-2 py-1.5'>
                                        <div className="rounded-full bg-gray-600 h-12 w-12"></div>
                                    </div>
                                    <div className="flex-1 space-y-4 py-1 m-0">
                                        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-600 rounded"></div>
                                            <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-black">
                            <div className="border-b-[1px] bg-black border-gray-600 shadow pt-2 p-3 pb-5 max-w-lrg w-full mx-auto">
                                <div className="animate-pulse flex space-x-3">
                                    <div className='px-2 py-1.5'>
                                        <div className="rounded-full bg-gray-600 h-12 w-12"></div>
                                    </div>
                                    <div className="flex-1 space-y-4 py-1 m-0">
                                        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-600 rounded"></div>
                                            <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-black">
                            <div className="border-b-[1px] bg-black border-gray-600 shadow pt-2 p-3 pb-5 max-w-lrg w-full mx-auto">
                                <div className="animate-pulse flex space-x-3">
                                    <div className='px-2 py-1.5'>
                                        <div className="rounded-full bg-gray-600 h-12 w-12"></div>
                                    </div>
                                    <div className="flex-1 space-y-4 py-1 m-0">
                                        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-600 rounded"></div>
                                            <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-black">
                            <div className="border-b-[1px] bg-black border-gray-600 shadow pt-2 p-3 pb-5 max-w-lrg w-full mx-auto">
                                <div className="animate-pulse flex space-x-3">
                                    <div className='px-2 py-1.5'>
                                        <div className="rounded-full bg-gray-600 h-12 w-12"></div>
                                    </div>
                                    <div className="flex-1 space-y-4 py-1 m-0">
                                        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-600 rounded"></div>
                                            <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-black">
                            <div className="border-b-[1px] bg-black border-gray-600 shadow pt-2 p-3 pb-5 max-w-lrg w-full mx-auto">
                                <div className="animate-pulse flex space-x-3">
                                    <div className='px-2 py-1.5'>
                                        <div className="rounded-full bg-gray-600 h-12 w-12"></div>
                                    </div>
                                    <div className="flex-1 space-y-4 py-1 m-0">
                                        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-600 rounded"></div>
                                            <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-black">
                            <div className="border-b-[1px] bg-black border-gray-600 shadow pt-2 p-3 pb-5 max-w-lrg w-full mx-auto">
                                <div className="animate-pulse flex space-x-3">
                                    <div className='px-2 py-1.5'>
                                        <div className="rounded-full bg-gray-600 h-12 w-12"></div>
                                    </div>
                                    <div className="flex-1 space-y-4 py-1 m-0">
                                        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-600 rounded"></div>
                                            <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-black">
                            <div className="border-b-[1px] bg-black border-gray-600 shadow pt-2 p-3 pb-5 max-w-lrg w-full mx-auto">
                                <div className="animate-pulse flex space-x-3">
                                    <div className='px-2 py-1.5'>
                                        <div className="rounded-full bg-gray-600 h-12 w-12"></div>
                                    </div>
                                    <div className="flex-1 space-y-4 py-1 m-0">
                                        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-600 rounded"></div>
                                            <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-black">
                            <div className="border-b-[1px] bg-black border-gray-600 shadow pt-2 p-3 pb-5 max-w-lrg w-full mx-auto">
                                <div className="animate-pulse flex space-x-3">
                                    <div className='px-2 py-1.5'>
                                        <div className="rounded-full bg-gray-600 h-12 w-12"></div>
                                    </div>
                                    <div className="flex-1 space-y-4 py-1 m-0">
                                        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-600 rounded"></div>
                                            <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-black">
                            <div className="border-b-[1px] bg-black border-gray-600 shadow pt-2 p-3 pb-5 max-w-lrg w-full mx-auto">
                                <div className="animate-pulse flex space-x-3">
                                    <div className='px-2 py-1.5'>
                                        <div className="rounded-full bg-gray-600 h-12 w-12"></div>
                                    </div>
                                    <div className="flex-1 space-y-4 py-1 m-0">
                                        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-600 rounded"></div>
                                            <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-black">
                            <div className="border-b-[1px] bg-black border-gray-600 shadow pt-2 p-3 pb-5 max-w-lrg w-full mx-auto">
                                <div className="animate-pulse flex space-x-3">
                                    <div className='px-2 py-1.5'>
                                        <div className="rounded-full bg-gray-600 h-12 w-12"></div>
                                    </div>
                                    <div className="flex-1 space-y-4 py-1 m-0">
                                        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                                        <div className="space-y-2">
                                            <div className="h-4 bg-gray-600 rounded"></div>
                                            <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>
                    :
                    content}
            </div>
        </div >

    )
}

export default HomePage

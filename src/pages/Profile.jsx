import React, { useContext, useEffect, useState } from 'react'
import userImage from '../assets/user.png'
import { MdDelete } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { Context, server } from '../main';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

const Profile = () => {
    const [showinput, setShowinput] = useState(false);
    const {
        isUserLoggedIn,
        setIsUserLoggedIn,
    } = useContext(Context);

    const Navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [secretMessage, setSecretMessage] = useState('');

    const deleteMessageHandler = async () => {
        const { data } = await axios.delete(`${server}/message/deletemessage`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        });
        if (data.success) {
            setMessage('');
        }
    }

    const addMessageHandler = async (e) => {
        e.preventDefault();
        const { data } = await axios.post(`${server}/message/createmessage`, {
            secretMessage
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        });
        if (data.success) {
            setMessage(data.createdMessage.message);
            setShowinput(false);
        }
    }

    useEffect(() => {
        setLoader(true);
        const authenticateUser = async () => {
            const { data } = await axios.get(`${server}/user/userlogin`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });

            if (!data.success) {
                Navigate('/');
            }
            else {
                const getProfile = async () => {
                    setLoader(true);
                    const { data } = await axios.get(`${server}/user/myprofile`, {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        withCredentials: true,
                    });
                    if (data.profile[0].message.length > 0) {
                        setMessage(data.profile[0].message[0].message);
                    }
                    setName(data.profile[0].name);
                    setLoader(false);
                }
                getProfile();
            }
        }
        authenticateUser();
    }, [isUserLoggedIn, message]);

    return (
        <>
            {
                loader ? <Loader /> : <div className="bg-orange-200 w-full h-screen">

                    <div className="w-72 m-auto pt-10 flex justify-center flex-col items-center">
                        <img src={userImage} alt="" />
                        <h3 className='mt-5 text-3xl font-medium'>{name}</h3>
                    </div>

                    <div className='w-full m-auto'>
                        <p className=' text-center px-5 py-6'>
                            {message ? message : "You have no Secret message. Please Add."}
                        </p>

                        <div className='flex items-center justify-center gap-1'>
                            {
                                (message) ? <button className=' bg-red-400 w-24 rounded-3xl h-10 flex items-center justify-center gap-1' onClick={deleteMessageHandler}>
                                    Delete <MdDelete />
                                </button> : <button className=' bg-sky-400 w-24 rounded-3xl h-10 flex items-center justify-center gap-1' onClick={() => {
                                    setShowinput(prev => !prev)
                                }}>
                                    Add <IoMdCreate />
                                </button>
                            }
                        </div>
                        {
                            showinput ? <div className=' w-80 m-auto my-10'>
                                <form onSubmit={addMessageHandler}>
                                    <input type="textarea" className='w-full outline-none'
                                        required onChange={(e) => {
                                            setSecretMessage(e.target.value)
                                        }} />
                                    <button className='text-center m-auto  bg-sky-400 w-24 rounded-3xl h-10 flex items-center justify-center gap-1 my-5' type='submit'>Create</button>
                                </form>
                            </div> : ""
                        }

                    </div>
                    <div className='flex items-center justify-center my-5'>
                        <Link to={'/messages'} className=' bg-emerald-400 w-32  h-10  gap-1 flex items-center justify-center' >
                            Go to Messages
                        </Link>
                    </div>
                </div >
            }
        </>
    )
}

export default Profile
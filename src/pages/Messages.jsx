import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Context, server } from '../main';
import { Link, useNavigate } from 'react-router-dom';
import MessageCard from '../components/MessageCard';
import { FaArrowCircleRight } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import Loader from '../components/Loader';


const Messages = () => {

    const {
        isUserLoggedIn,
        setIsUserLoggedIn,
        loader, setLoader
    } = useContext(Context);
    const Navigate = useNavigate();

    let [pageNo, setPageNo] = useState(1);
    const [messages, setMessages] = useState([]);
    const [pages, setPages] = useState(1);

    const increasePage = () => {
        if (pageNo < pages) {
            pageNo = pageNo + 1;
            setPageNo(pageNo);
        }
    }

    const decresePage = () => {
        if (pageNo > 1) {
            pageNo = pageNo - 1;
            setPageNo(pageNo);
        }
    }

    const logOutHandler = async () => {
        setLoader(true);
        const { data } = await axios.get(`${server}/user/logout`, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        });

        if (data.success) {
            setLoader(false);
            Navigate('/');
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
                const getMessages = async () => {
                    setLoader(true);
                    const { data } = await axios.get(`${server}/message/getmessages?pageNo=${pageNo}`, {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        withCredentials: true,
                    });
                    
                    setMessages(data.secretMessages);
                    setPages(data.totalPages);
                    setLoader(false);
                }
                getMessages();
            }
        }
        authenticateUser();
    }, [pageNo, isUserLoggedIn]);

    return (
        <>
            {
                loader ? <Loader /> : <div className=' bg-orange-200 w-full h-screen'>
                    <div
                        className='text-center flex justify-between items-center px-5'
                    >
                        <div className='flex gap-3 '>
                            <Link to={'/profile'} className=' '>
                                <span className='flex items-center gap-2  my-3 bg-yellow-400 rounded-sm h-10  p-3  '>
                                    My Profile <FaArrowCircleRight />
                                </span>
                            </Link>
                            <button onClick={logOutHandler}>
                                <span className='flex items-center gap-2  my-3 bg-yellow-400 rounded-sm h-10  p-3  '>
                                    Logout <IoMdLogOut />
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="
                bg-orange-200
                w-full 
                flex
                justify-center
                items-center
                gap-x-5
                px-4
                flex-wrap"
                    >
                        {
                            messages.map((value, index) => {
                                return <MessageCard key={index} message={value.message} />
                            })
                        }
                    </div>

                    <div className='flex justify-center gap-10   bg-orange-200 py-5'>
                        <button className='bg-red-400  w-24 rounded-3xl h-10' onClick={decresePage}>Prev</button>
                        <button className='bg-red-400  w-24 rounded-3xl h-10' onClick={increasePage}>Next</button>
                    </div>
                </div>
            }
        </>
    )
}

export default Messages
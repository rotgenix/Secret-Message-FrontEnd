import React, { useContext, useEffect, useState } from 'react'
import '../Styles/pageStyles/Home.css'
import { FcGoogle } from "react-icons/fc";
import { Context, server } from '../main';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [showLogin, setShowLogin] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const Navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const {
        isUserLoggedIn,
        setIsUserLoggedIn,
    } = useContext(Context);


    const loginHandler = async (e) => {
        setLoader(true);
        e.preventDefault();
        const { data } = await axios.post(`${server}/user/login`, {
            email, password
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        });

        if (data.success) {
            setIsUserLoggedIn(true);
            Navigate('/messages')
        }
        else {
            setShowError(true);
            setErrorMessage(data.message);
        }
    };

    const registerHandler = async (e) => {
        setLoader(true);
        e.preventDefault();
        const { data } = await axios.post(`${server}/user/register`, {
            name, email, password
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        });

        if (data.success) {
            setShowNotification(true)
            setIsUserLoggedIn(true);
        } else {
            setShowError(true);
            setErrorMessage(data.message);
        }
    };

    const showLoginHandler = () => {
        setName("");
        setEmail("");
        setPassword("");
        setShowLogin(true);
        setShowError(false);
        setErrorMessage('');
    };

    const showSignUpHandler = () => {
        setName("");
        setEmail("");
        setPassword("");
        setShowLogin(false);
        setShowError(false);
        setErrorMessage('');
    };

    useEffect(() => {
        setLoader(true);
        const authenticateUser = async () => {
            const { data } = await axios.get(`${server}/user/userlogin`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (data.success) {
                Navigate('/messages');
            }
        }
        authenticateUser();

    }, [isUserLoggedIn]);


    return (
        <>
            <div className="home bg-orange-200 w-full h-screen  flex justify-center items-center relative">

                <div className="form-box w-96   h-formHeight">
                    <div className="button-box w-56 my-9 mx-auto">
                        <button
                            type='button'
                            className={`w-1/2 toggle-btn ${showLogin ? 'bg-red-300 rounded-3xl' : ''}`}
                            onClick={showLoginHandler}
                        >
                            LogIn
                        </button>
                        <button
                            type='button'
                            className={`w-1/2 toggle-btn ${showLogin ? '' : 'bg-red-300 rounded-3xl'}`}
                            onClick={showSignUpHandler}
                        >
                            Register
                        </button>
                    </div>

                    <div className="social-icons  text-center">
                        <button className='google-login m-auto'>
                            <FcGoogle className='text-3xl' />
                        </button>
                    </div>

                    {
                        showLogin ? <form className='input-group' id='login' onSubmit={loginHandler}>
                            <input
                                type="text"
                                className='input-field'
                                placeholder='Email'
                                required
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                            />

                            <input
                                type="text"
                                className='input-field'
                                placeholder='Password'
                                required
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                            />

                            <button
                                type='submit'
                                className='submit-btn'
                            >
                                Login
                            </button>

                            {
                                showError ? <div className='m-auto text-center mt-4 bg-red-400 p-2'>{errorMessage}</div> : ""
                            }

                        </form>
                            :
                            <form
                                className='input-group'
                                id='register'
                                onSubmit={registerHandler}>
                                <input
                                    type="text"
                                    className='input-field'
                                    placeholder='Name'
                                    required
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value)
                                    }}
                                />

                                <input
                                    type="text"
                                    className='input-field'
                                    placeholder='Email'
                                    required
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }}
                                />

                                <input
                                    type="text"
                                    className='input-field'
                                    placeholder='Password'
                                    required
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}
                                />

                                <button
                                    type='submit'
                                    className='submit-btn'

                                >
                                    Register
                                </button>
                                {
                                    showError ? <div className='m-auto text-center mt-4 bg-red-400 p-2'>{errorMessage}</div> : ""
                                }
                            </form>
                    }


                </div>

                {
                    showNotification ? <div className='absolute z-10 bg-yellow-200 h-36 flex flex-col justify-center'>
                        <p className='text-center p-6'>
                            User Registered Successfully. Please Login
                        </p>
                        <button className='text-center w-16 p-1 rounded-sm bg-orange-300 m-auto' onClick={() => {
                            setShowNotification(false);
                            Navigate('/messages')
                        }}>Ok</button>
                    </div> : ""
                }
            </div>
        </>
    )
}

export default Home
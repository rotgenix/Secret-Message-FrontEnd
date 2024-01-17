import React from 'react'

const Loader = () => {
    return (
        <>

            <div className="loader h-screen flex justify-center items-center bg-slate-500">
                <div className="loader-container ">
                    <i className="fa-regular fa-circle fa-bounce text-9xl" ></i>
                </div>
            </div>
        </>
    )
}

export default Loader
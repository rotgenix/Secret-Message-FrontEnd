import React from 'react'

const MessageCard = ({ message }) => {
    return (
        <>
            <div className="
            message-card
            my-5 
            w-cardWidth
            relative border-cardBorder bg-slate-100 
            shadow-cardShadowOne
            border-white
            p-3
            text-center
            rounded-tr-3xl
            rounded-bl-3xl
            ">

                {message}

            </div>
        </>
    )
}

export default MessageCard
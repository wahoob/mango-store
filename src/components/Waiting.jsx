import React from 'react';
import waitingAnimation from "../images/waiting-vid.gif";

export default function Waiting() {
    return (
        <div className='fixed inset-0 bg-white flex flex-col justify-center items-center z-50 text-neutral-700'>
            <img src={waitingAnimation} alt='waiting' className='max-w-80' />
            <h3 className='text-3xl font-sem text-center'>المعلم سردينة <span className='text-lg block'>بيرحب بيك</span></h3>
        </div>
    )
}

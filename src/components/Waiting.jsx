import React from 'react';
import logo from "../images/logo.png";

export default function Waiting() {
    return (
        <div className='fixed inset-0 bg-white flex flex-col justify-center items-center z-50 text-neutral-700'>
            <img src={logo} alt='logo' className='max-w-32 hithere' />
            <h3 className='text-3xl font-sem text-center'>المعلم سردينة <span className='text-lg block'>بيرحب بيك</span></h3>
        </div>
    )
}

import React from 'react';
import logo from "../images/logo.png";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { MdLocalPhone, MdOutlineEmail } from "react-icons/md";
import { SiContactlesspayment } from "react-icons/si";
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className='xl:px-44 lg:px-32 px-4 py-4 border-t space-y-4'>
            <div className='flex justify-between text-neutral-500 flex-wrap gap-8'>
                <div className='space-y-2 max-sm:mx-auto'>
                    <img src={logo} alt='logo' className='max-w-20 max-sm:mx-auto' />
                    <p className='text-sm max-w-72 leading-6 max-sm:text-center'>إحنا في موقع المعلم سردينة بنقدم أعلى جودة من المنجا، طازجة ومن مزرعتنا مباشرة، بأفضل الشروط في اللون والطعم والشكل.</p>
                    <div className='raw'>
                        <FaFacebook className='max-w-6 size-5 cursor-pointer hover:text-blue-600' />
                        <FaInstagram className='max-w-6 size-5 cursor-pointer hover:text-pink-500' />
                        <FaWhatsapp className='max-w-6 size-5 cursor-pointer hover:text-green-600' />
                    </div>
                </div>
                <div className='space-y-2'>
                    <h3 className='text-lg font-bold text-orange-500'>عن المعلم سردينة</h3>
                    <ul className='space-y-2'>
                        <li className='raw hover:text-neutral-800'><Link to="/about">من نحن</Link></li>
                    </ul>
                </div>
                <div className='space-y-2'>
                    <h3 className='text-lg font-bold text-orange-500'>للتواصل</h3>
                    <ul className='space-y-2'>
                        <li className='raw'><MdOutlineEmail /> example@gmail.com</li>
                        <li className='raw'><MdLocalPhone /> 010011123413</li>
                    </ul>
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <p className='text-sm'>&copy; {new Date().getFullYear()} المعلم سردينة</p>
                <div className='raw font-semibold text-neutral-700'>
                    <SiContactlesspayment className='size-10' />
                    <p className='text-sm'>الدفع عن الاستلام</p>
                </div>
            </div>
        </div>
    )
}

import React, { useState } from 'react';
import logo from "../images/logo.png";
import { RiShoppingCartLine, RiMenu3Line } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import { useCartContext } from '../contexts/cartContext';

export default function Header() {
    const { amount, total } = useCartContext();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between gap-7 py-2.5 text-neutral-600 bg-white sticky top-0 z-30 w-full xl:px-44 lg:px-32 px-4">
            <div className='raw'>
                <div className='relative'>
                    <RiMenu3Line className='size-6 md:hidden cursor-pointer' onClick={() => setOpen((prev) => !prev)} />
                    {open && (
                        <div className='absolute top-10 right-0 md:hidden'>
                            <div className='border-x-[10px] border-b-[20px] border-x-transparent border-b-neutral-800-90 w-fit' />
                            <ul className='font-semibold bg-neutral-800-90 rounded-b rounded-l text-neutral-200 whitespace-nowrap py-4 pr-4 pl-8 space-y-4'>
                                <li className='hover:text-orange-400'>
                                    <Link to="/">الصفحة الرئيسية</Link>
                                </li>
                                <li className='hover:text-orange-400'>
                                    <Link to="about">معلومات عنا</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                <Link to="/">
                    <img src={logo} alt='logo' className='max-w-20' />
                </Link>

            </div>
            <ul className='raw gap-7 font-bold max-md:hidden'>
                <li className='hover:text-orange-400'>
                    <Link to="/">الصفحة الرئيسية</Link>
                </li>
                <li className='hover:text-orange-400'>
                    <Link to="about">معلومات عنا</Link>
                </li>
            </ul>
            <div className="raw gap-8">
                <div className='raw cursor-pointer hover:text-neutral-950' onClick={() => navigate("/my-account")}>
                    <FiUser className='size-6' />
                    <p className='max-sm:hidden'>تسجيل الدخول</p>
                </div>
                <div className='raw relative cursor-pointer hover:text-neutral-950' onClick={() => navigate("/cart")}>
                    <RiShoppingCartLine className='size-6' />
                    <p>{total.toFixed(2)}</p>
                    <div className='absolute -top-2.5 -right-2 bg-red-600 text-white size-4 flex items-center justify-center text-[0.7rem] rounded-full'>{amount}</div>
                </div>
                <div className='flex items-end max-sm:hidden'>
                    <HiOutlineLocationMarker className='size-7' />
                    <p className='font-bold'><span className='block text-xs font-normal'>التوصيل لـ</span> الاسكندرية</p>
                </div>
            </div>
        </div>
    );
}

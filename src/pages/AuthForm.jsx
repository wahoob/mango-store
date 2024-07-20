import React from 'react';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { Outlet } from 'react-router-dom';

export default function AuthForm() {

    return (
        <div className='lg:w-[50vw] md:px-16 px-4 mx-auto'>
            <div className='px-6 py-8 rounded text-neutral-700 flex flex-col gap-4 shadow-lg my-8 border max-sm:text-sm'>
                <Outlet />
                <div className='relative my-4'>
                    <hr />
                    <p className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-neutral-400'>أو</p>
                </div>
                <div className='flex flex-col gap-4'>
                    <p className='text-center text-sm text-neutral-400 sm:hidden'>سجل دخولك باستخدام</p>
                    <button className='text-white bg-[#4166B1] hover:bg-[#3358a1] w-full py-2 rounded flex items-center justify-center px-4'>
                        <p className='flex-1 max-sm:hidden'>تسجيل الدخول باستخدام فيسبوك</p>
                        <FaFacebook className='size-5' />
                    </button>
                    <button className='text-neutral-500 border-2 shadow-inner w-full py-2 rounded hover:bg-neutral-100 flex justify-center items-center px-4'>
                        <p className='flex-1 max-sm:hidden'>تسجيل الدخول باستخدام جوجل</p>
                        <FcGoogle className='size-5' />
                    </button>
                </div>
            </div>
        </div>
    )
}

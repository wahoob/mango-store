import { Link } from 'react-router-dom';
import { BiHide, BiShow } from "react-icons/bi";
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const ShowOrHideIcon = showPassword ? BiShow : BiHide;

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit(data) {
        console.log(data);
    }

    return (
        <>
            <h3 className='text-2xl font-bold text-center mb-4'>تسجيل الدخول</h3>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                <input type='string' placeholder='البريد الإلكتروني' className='border rounded px-4 py-1 border-neutral-300 shadow-inner outline-none focus:border-neutral-400' {...register("email")} />
                <div className='relative w-full'>
                    <input type={showPassword ? "text" : "password"} placeholder='كلمة المرور' className='border rounded pr-4 pl-8 py-1 border-neutral-300 shadow-inner outline-none focus:border-neutral-400 w-full' {...register("password")} />
                    <ShowOrHideIcon className='absolute top-1/2 left-2 -translate-y-1/2 text-neutral-400 cursor-pointer' onClick={() => setShowPassword((prev) => !prev)} />
                </div>
                <button type='button' className='text-orange-500 font-semibold text-sm hover:text-orange-600'>هل نسيت كلمة المرور؟</button>
                <button type='submit' className='text-white bg-orange-600 hover:bg-orange-700 w-full py-2 rounded max-sm:text-xs'>تسجيل الدخول</button>
            </form>
            <p className='text-center font-semibold text-sm'>ليس لديك حساب؟ <Link to="signup" className='text-orange-500 hover:text-orange-600'>إنشاء حساب جديد</Link></p>
        </>
    )
}

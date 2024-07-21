import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BiHide, BiShow } from "react-icons/bi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const ShowOrHideIcon = showPassword ? BiShow : BiHide;

    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).max(20).required(),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null]).required()
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    function onSubmit(data) {
        console.log(data);
    }

    return (
        <>
            <h3 className='text-2xl font-bold text-center mb-4'>إنشاء حساب</h3>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
                <input type='text' placeholder='البريد الإلكتروني' className='border rounded px-4 py-1 border-neutral-300 shadow-inner outline-none focus:border-neutral-400' {...register("email")} />
                <input type="password" placeholder='إنشاء كلمة مرور' className='border rounded pr-4 pl-8 py-1 border-neutral-300 shadow-inner outline-none focus:border-neutral-400 w-full' {...register("password")} />
                <div className='relative w-full'>
                    <input type={showPassword ? "text" : "password"} placeholder='تأكيد كلمة المرور' className='border rounded pr-4 pl-8 py-1 border-neutral-300 shadow-inner outline-none focus:border-neutral-400 w-full' {...register("confirmPassword")} />
                    <ShowOrHideIcon className='absolute top-1/2 left-2 -translate-y-1/2 text-neutral-400 cursor-pointer' onClick={() => setShowPassword((prev) => !prev)} />
                </div>
                <button type='submit' className='text-white bg-orange-600 hover:bg-orange-700 w-full py-2 rounded max-sm:text-xs'>إنشاء حساب</button>
            </form>
            <p className='text-center font-semibold text-sm'>لديك حساب بالفعل؟ <Link to="/my-account" className='text-orange-500 hover:text-orange-600'>تسجيل الدخول</Link></p>
        </>
    )
}

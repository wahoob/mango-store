import React from 'react';
import { IoMdClose } from "react-icons/io";

export default function AddressForm({ setOpen }) {
    function handleSubmit(e) {
        e.preventDefault();
        // logic here
        setOpen(false);
    }

    return (
        <div className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 sm:w-3/4 md:w-1/2 bg-white z-50 rounded-lg shadow-2xl overflow-hidden'>
            <div className='flex justify-between items-center bg-neutral-200 border-b py-4 px-8 text-xl font-bold shadow shadow-neutral-400'>
                <h3>أدخل عنوان الشحن</h3>
                <IoMdClose className='cursor-pointer' onClick={() => setOpen(false)} />
            </div>
            <form className='px-8 py-4 space-y-3 text-sm font-semibold' onSubmit={(e) => handleSubmit(e)}>
                <div className='flex flex-col space-y-2'>
                    <label htmlFor='full-name' className='font-bold'>الاسم بالكامل</label>
                    <input type='text' name='full-name' required className='border border-black rounded shadow-inner outline-none px-2 py-1 mr-2' />
                </div>

                <div className='flex flex-col space-y-2'>
                    <label htmlFor='city' className='font-bold'>المدينة</label>
                    <p className='mr-2'>القاهرة</p>
                    <p className='text-xs text-neutral-500'> في حالة الرغبة في تغيير المنطقة سيتعين عليك إعادة ملئ عربة التسوق بسبب اختلاف بعض المنتجات <button type='button' className='text-orange-700 hover:underline hover:text-orange-800'>تغيير إلى الاسكندرية</button></p>
                </div>

                <div className='flex flex-col space-y-2'>
                    <label htmlFor='district' className='font-bold'>المنطقة</label>
                    <select name='district' required className='border border-black rounded shadow-inner outline-none px-2 mr-2'>
                        <option>lol</option>
                        <option>lol2</option>
                    </select>
                </div>

                <div className='flex flex-col space-y-2'>
                    <label htmlFor='street'>عنوان الشارع / الحي</label>
                    <input type='text' name='street' required className='border border-black rounded shadow-inner outline-none px-2 py-1 mr-2' />
                </div>

                <div className='flex flex-col space-y-2'>
                    <label htmlFor='mobile-number'>رقم الهاتف</label>
                    <input type='number' name='mobile-number' required className='border border-black rounded shadow-inner outline-none px-2 py-1 mr-2' />
                    <p className='text-xs text-neutral-500'>سوف يتم استخدام رقم الهاتف في المساعدة على التوصيل</p>
                </div>

                <div className='flex flex-col space-y-2'>
                    <label htmlFor='notes'>ملاحظات الطلب (اختياري)</label>
                    <textarea name='notes' className='border border-black rounded shadow-inner outline-none px-2 py-1 mr-2' />
                </div>

                <button type='submit' className='bg-orange-600 hover:bg-orange-700 text-neutral-200 px-4 py-1'>إضافة عنوان</button>
            </form>
        </div>
    );
}

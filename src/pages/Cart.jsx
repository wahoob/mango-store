import React, { useState } from 'react';
import { useCartContext } from '../contexts/cartContext';
import AddressForm from '../components/AddressForm';
import { GoPlus } from "react-icons/go";
import { Link } from 'react-router-dom';
import { IoIosArrowRoundBack } from "react-icons/io";
import { toast } from 'react-toastify';
import { FaRegTrashAlt } from 'react-icons/fa';

export default function Cart() {
    const { amount, cart, total, clearCart } = useCartContext();
    const [open, setOpen] = useState();

    return (
        <div className='lg:grid grid-cols-[minmax(20rem,1fr)_3fr] min-h-[calc(100vh-7rem)] py-8'>
            <div className='bg-neutral-100 px-8 text-neutral-700 flex flex-col justify-between h-[calc(100vh-12rem)]'>
                <div className='flex-1 flex flex-col'>
                    <div className='flex items-center justify-between border-b-2 py-4 text-xl font-bold'>
                        <h3>تفاصيل الطلب</h3>
                    </div>
                    <div className='py-4 space-y-4 flex flex-col flex-1'>
                        <div className='space-y-2 flex-1 flex flex-col'>
                            <p className='font-bold'>عنوانك</p>
                            <div className='overflow-y-auto space-y-2 flex-1'>
                                <div className='flex items-start gap-2 text-sm bg-orange-50 border border-orange-200 py-2 px-3 rounded font-medium'>
                                    <input type='checkbox' className='mt-1' />
                                    <p>
                                        Ahmed Nabil شارع 15 أو شارع النيل عند الادارة التعليمية, عمارة رقم 45, 6th of October City, Giza, Egypt{" "}
                                        <button className='text-orange-800 font-semibold hover:underline hover:text-orange-950'>تعديل</button>
                                    </p>
                                </div>
                                <div className='flex items-end'>
                                    <GoPlus className='size-5 text-neutral-300' />
                                    <button className='text-teal-800 text-sm hover:underline hover:text-orange-600 font-medium' onClick={() => setOpen(true)}>إضافة عنوان جديد</button>
                                </div>
                            </div>
                        </div>
                        <div className='space-y-4'>
                            <div className='flex justify-between items-center font-bold'>
                                <p>{amount} منتجات</p>
                                <p>{total} جنيه</p>
                            </div>
                            <div className='flex justify-between items-center font-bold'>
                                <p>التوصيل</p>
                                <p>5 جنيه</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='py-4 border-t-2 space-y-4'>
                    <div className='flex justify-between items-center font-bold text-orange-600'>
                        <p>التكلفة الإجمالية</p>
                        <p>{total} جنيه</p>
                    </div>
                    <button disabled className='text-neutral-100 bg-orange-600 hover:bg-orange-700 w-full py-2 font-semibold'>تأكيد الطلب</button>
                </div>
            </div>
            <div className='lg:px-12 px-4 w-full flex-1'>
                <div className='flex items-center justify-between border-b-2 py-4 text-xl font-bold text-neutral-700'>
                    <h3>عربة التسوق</h3>
                    <h3>{amount} منتجات</h3>
                </div>
                {cart.length > 0 ? (
                    <>
                        <div className='py-6 space-y-4'>
                            <div className='grid sm:grid-cols-[repeat(3,1fr)_2fr] grid-cols-3 justify-items-center text-neutral-400 font-medium'>
                                <p>المجموع</p>
                                <p className='max-sm:hidden'>السعر</p>
                                <p>الكمية</p>
                                <p className='justify-self-end'>تفاصيل المنتج</p>
                            </div>
                            <div className='space-y-4'>
                                {cart.map((item) => <CartItem key={item.id} {...item} />)}
                            </div>
                        </div>
                        <div className='flex items-center justify-between font-bold text-orange-600'>
                            <Link to="/" className='raw'>
                                <p>تابع التسوق</p>
                                <IoIosArrowRoundBack className='size-6' />
                            </Link>
                            <button className='raw' onClick={() => clearCart()}>
                                <p className=''>إزالة جميع المنتجات</p>
                                <FaRegTrashAlt className='' />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className='w-full flex flex-col justify-center items-center py-8 space-y-2'>
                        <h1 className='text-3xl font-bold text-neutral-600'>عربة التسوق فارغة</h1>
                        <p className='font-semibold text-neutral-400 max-w-96 text-center'>تقدر تملي عربة التسوق الخاصة بيك بالمنجا الفريش من الصفحة الرئيسية</p>
                        <Link to="/" className='px-4 py-1 bg-orange-600 hover:bg-orange-700 text-neutral-200'>إذهب للصفحة الرئيسية</Link>
                    </div>
                )}
            </div>
            {open && (
                <>
                    <AddressForm setOpen={setOpen} open={open} />
                    <div className='fixed inset-0 bg-neutral-950 z-40 bg-opacity-50' />
                </>
            )}
        </div>
    );
}

const CartItem = ({ id, name, price, images, minOrderQty, maxOrderQty, qty }) => {
    const { toggleQTY, deleteItem } = useCartContext();
    const [input, setInput] = useState(qty);


    function updateCount(type) {
        if (type === "inc") {
            if (input < maxOrderQty || !maxOrderQty) {
                setInput((prev) => prev + 1);
                toggleQTY(id, "inc");
            } else {
                toast.warn("لا يمكنك تجاوز هذه الكمية");
            }
        } else if (type === "dec") {
            if (input > minOrderQty) {
                setInput((prev) => prev - 1);
                toggleQTY(id, "dec");
            } else {
                toast.warn("لا يمكنك طلب كمية اقل من هذا المنتج");
            }
        }
    }

    return (
        <div className='grid sm:grid-cols-[repeat(3,1fr)_2fr] grid-cols-3 gap-1 justify-items-center items-start font-bold text-neutral-700 max-lg:text-sm max-sm:text-xs'>
            <p>{(price * qty).toFixed(2)}</p>
            <p className='max-sm:hidden'>{price.toFixed(2)}</p>
            <div className='flex items-center'>
                <button className='border py-1 px-3 hover:bg-neutral-100 rounded' onClick={() => updateCount("inc")}>+</button>
                <input type='number' className='outline-0 appearance-none text-center flex-1 max-w-8 md:max-w-16 group-hover:bg-zinc-50' value={input} onChange={(e) => setInput(e.target.value)} onClick={(e) => e.stopPropagation()} />
                <button className='border py-1 px-3 hover:bg-neutral-100 rounded' onClick={() => updateCount("dec")}>-</button>
            </div>
            <div className='flex gap-8 justify-self-end'>
                <div className='flex flex-col justify-between flex-1 items-end'>
                    <p className='line-clamp-1 sm:line-clamp-3'>{name}</p>
                    <button className='text-neutral-500 font-semibold hover:text-neutral-600' onClick={() => deleteItem(id)}>إزالة</button>
                </div>
                <img src={images[0]} alt={name} className='size-28 object-cover max-sm:hidden' />
            </div>
        </div>
    );
}
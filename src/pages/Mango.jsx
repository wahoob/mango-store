import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCartContext } from '../contexts/cartContext';
import { QuantitySelector } from '../components';

export default function Mango() {
    const { id } = useParams();
    const { addItem } = useCartContext();
    const [mango, setMango] = useState({});
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(0);
    const [input, setInput] = useState(1);

    const getMango = useCallback(async () => {
        try {
            const response = await axios.get(`https://mango-backend-two.vercel.app/mango/${id}`);
            setMango(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        getMango();
    }, [getMango]);

    useEffect(() => {
        if (mango.minOrderQty) {
            setInput(mango.minOrderQty);
        }
    }, [mango]);

    if (loading) return <p>laoding</p>
    if (!mango) return <p>No data available</p>

    const { name, price, description, available, discountPercent, images, mangoLocation: { alexandria, cairo }, maxOrderQty, minOrderQty } = mango;
    return (
        <div className='lg:px-16 px-4 py-8 grid md:grid-cols-[1.5fr_2fr] gap-8'>
            <div className='flex flex-col gap-4'>
                <img src={images[current]} alt={name} className='rounded-md object-cover w-full h-[26rem]' />
                <div className='flex gap-4 w-full justify-center flex-wrap'>
                    {images.map((image, index) => (
                        <div key={index} className={`rounded-md hover:opacity-80 hover:-translate-y-1 transition ${index === current && "opacity-35 border-2 border-orange-600"}`} onClick={() => setCurrent(index)} >
                            <img src={image} alt={name} className="size-16 object-cover cursor-pointer rounded-md" />
                        </div>
                    ))}
                </div>
            </div>
            <div className='py-4 text-neutral-700 text-lg flex flex-col gap-12'>
                <div className='space-y-5'>
                    <h1 className='text-3xl font-bold'>{name}</h1>
                    <div className='raw'>
                        <p className={`text-2xl ${discountPercent > 0 ? "text-neutral-400 line-through font-semibold" : "text-orange-600 font-bold"}`}>{price.toFixed(2)} جنيه</p>
                        {discountPercent > 0 && <p className='text-2xl font-bold text-orange-600'>{(price - (price * discountPercent / 100)).toFixed(2)} جنيه</p>}
                    </div>
                    <p className='text-neutral-600'>{description}</p>
                    <p>متاح في: <span className='font-bold'>{alexandria && "الاسكندرية"}{cairo && `${" "}و القاهرة`}</span></p>
                    {available ? <p className='text-green-700 font-bold'>متاح الآن</p> : <p className='text-red-600 font-bold'>غير متاح الآن</p>}
                </div>
                <div className='space-y-8'>
                    <div className='raw gap-4 flex-wrap'>
                        <QuantitySelector input={input} setInput={setInput} minOrderQty={minOrderQty} maxOrderQty={maxOrderQty} className="max-w-16" />
                        <button className='text-white font-semibold bg-orange-600 hover:bg-orange-700 px-16 py-1 flex-1 whitespace-nowrap max-w-96' onClick={() => addItem(mango, input)}>إضافة الى السلة</button>
                    </div>
                    <p>اجمالي السعر: <span className='font-bold'>{(price * input).toFixed(2)}</span></p>
                </div>
            </div>
        </div>
    )
}

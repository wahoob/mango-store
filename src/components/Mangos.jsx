import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCartContext } from '../contexts/cartContext';
import { QuantitySelector } from "../components";

export default function Mangos() {
    const [loading, setLoading] = useState(false);
    const [mangos, setMangos] = useState([]);

    async function getAllMangos() {
        setLoading(true);
        try {
            const response = await axios.get("https://mango-backend-two.vercel.app/mangos");
            setMangos(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllMangos();
    }, []);

    return (
        <div className='py-16 space-y-8'>
            <h3 className='text-2xl font-bold text-neutral-700'>جميع المنتجات</h3>
            {loading ? (
                <p>Loading</p>
            ) : (
                <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-4'>
                    {mangos.map((mango) => <SingleMango key={mango.id} mango={mango} />)}
                </div>
            )}
        </div>
    )
}

const SingleMango = ({ mango }) => {
    const { id, name, price, images, available, minOrderQty, maxOrderQty, discountPercent } = mango;
    const { addItem } = useCartContext();
    const navigate = useNavigate();
    const [input, setInput] = useState(minOrderQty);

    function addToCart(e) {
        e.stopPropagation();
        addItem(mango, input);
        setInput(minOrderQty);
    }

    return (
        <div className='shadow-md border px-2 py-4 flex flex-col rounded hover:bg-neutral-50 group' onClick={() => navigate(`/mango/${id}`)}>
            <img src={images[0]} alt={name} className='w-full h-full max-h-52 object-cover mb-1' />
            <div className='flex items-start justify-between'>
                <h3 className='text-lg font-bold'>{name}</h3>
                <div className='text-neutral-700 text-sm font-medium w-fit'>
                    {available ? <div className='bg-green-500 px-2 py-0.5 text-neutral-950'>متوفر</div> : <div className='px-2 py-0.5 bg-red-600 text-neutral-100'>غير متوفر</div>}
                </div>
            </div>
            <div className='raw'>
                <div className='flex items-center'>
                    <p className='font-semibold text-lg'>{discountPercent > 0 ? (price - (price * discountPercent / 100)).toFixed(2) : price.toFixed(2)}</p>
                    <p className='text-xs font-semibold'>جنيه</p>
                </div>
                {discountPercent > 0 && (
                    <p className='text-sm text-neutral-500'>السعر القديم: <span className='line-through'>{price.toFixed(2)}</span></p>
                )}
            </div>
            <div className='raw mt-4'>
                <button className='bg-orange-500 py-1 text-neutral-100 flex-1 hover:bg-orange-600' onClick={(e) => addToCart(e)}>أضِف للسلة</button>
                <div className='basis-2/5'>
                    <QuantitySelector input={input} setInput={setInput} minOrderQty={minOrderQty} maxOrderQty={maxOrderQty} className="min-w-12 w-1/5" />
                </div>
            </div>
        </div>
    )
}

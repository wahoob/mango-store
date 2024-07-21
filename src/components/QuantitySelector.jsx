import React from 'react'
import { toast } from 'react-toastify';

export default function QuantitySelector({ input, setInput, minOrderQty, maxOrderQty, className }) {
    function updateCount(e, type) {
        e.stopPropagation();
        if (type === "inc") {
            if (input < maxOrderQty || !maxOrderQty) {
                setInput((prev) => prev + 1);
            } else {
                toast.warn("لا يمكنك تجاوز هذه الكمية");
            }
        } else if (type === "dec") {
            if (input > minOrderQty) {
                setInput((prev) => prev - 1)
            } else {
                toast.warn("لا يمكنك طلب كمية اقل من هذا المنتج");
            }
        }
    }

    return (
        <div className='flex items-center'>
            <button className='border py-1 px-3 hover:bg-neutral-100 rounded' onClick={(e) => updateCount(e, "dec")}>-</button>
            <input type='number' className={`outline-0 appearance-none text-center flex-1 group-hover:bg-zinc-50 ${className}`} value={input} onChange={(e) => setInput(e.target.value)} onClick={(e) => e.stopPropagation()} />
            <button className='border py-1 px-3 hover:bg-neutral-100 rounded' onClick={(e) => updateCount(e, "inc")}>+</button>
        </div>
    )
}

import React, { useState } from 'react';
import { IoIosChatbubbles, IoMdClose } from "react-icons/io";
import { MdLocalPhone } from "react-icons/md";
import { FaWhatsapp } from 'react-icons/fa';

export default function StickyPrompt() {
    const [open, setOpen] = useState(false);

    return (
        <div className={`${open && "space-y-2 flex-col"} raw fixed bottom-5 right-10 cursor-default`}>
            <div className={`bg-neutral-800 p-2 rounded-full cursor-pointer ${open && "order-1"}`} onClick={() => setOpen((prev) => !prev)}>
                {open ? (
                    <IoMdClose className='size-8 text-white' />
                ) : (
                    <IoIosChatbubbles className='size-8 text-white' />
                )}
            </div>
            {open ? (
                <div className='space-y-2'>
                    <div className='bg-green-500 p-2 rounded-full cursor-pointer'>
                        <FaWhatsapp className='size-8 text-white' />
                    </div>
                    <div className='bg-red-500 p-2 rounded-full cursor-pointer'>
                        <MdLocalPhone className='size-8 text-white' />
                    </div>
                </div>
            ) : (
                <div className='bg-white px-2 py-1 rounded shadow-lg text-lg'>لديك استفسار؟</div>
            )}
        </div>
    )
}

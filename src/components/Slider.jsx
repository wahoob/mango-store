import React, { useEffect, useState } from 'react';
import { sliderImages } from '../data';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSwipeable } from "react-swipeable"

export default function Slider() {
    const [current, setCurrent] = useState(0);
    const [isChanging, setIsChanging] = useState(false);

    useEffect(() => {
        if (current < 0) {
            setCurrent(sliderImages.length - 1);
        } else if (current > sliderImages.length - 1) {
            setCurrent(0);
        }
    }, [current])

    useEffect(() => {
        const interval = setTimeout(() => {
            setCurrent((prev) => prev + 1);
        }, 7000);

        return () => clearTimeout(interval);
    }, [current])

    useEffect(() => {
        setIsChanging(true);
        const timer = setTimeout(() => {
            setIsChanging(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [current])

    const handleSwipe = ({ dir }) => {
        if (dir === "Left") {
            setCurrent((prev) => prev + 1);
        } else if (dir === "Right") {
            setCurrent((prev) => prev - 1);
        }
    }
    const handlers = useSwipeable({
        onSwipedLeft: () => handleSwipe({ dir: "Left" }),
        onSwipedRight: () => handleSwipe({ dir: "Right" }),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    })

    return (
        <div className='flex justify-center px-4 md:h-[31rem] h-96 w-full relative'>
            <div className='flex items-center justify-center rounded-lg relative w-full max-w-screen-lg h-full overflow-hidden' {...handlers}>
                {sliderImages.map((image, index) => {
                    const { id, url, alt } = image;
                    let translate = 100;
                    if (index === current) {
                        translate = 0
                    } else if (index === current - 1 || (current === 0 && index === sliderImages.length - 1)) {
                        translate = -100
                    }
                    return (
                        <div key={id} className={`absolute w-full h-full bg-cover bg-bottom bottom-0 ${translate === 0 ? "transition-transform" : "transition-all opacity-0"} duration-500`} style={{
                            backgroundImage: `url(${url})`,
                            transform: `translateX(${translate}%)`,
                        }} aria-label={alt} />
                    );
                })}
                <div className='absolute top-1/2 -translate-y-1/2 left-0 cursor-pointer bg-neutral-800 h-1/4 bg-opacity-70 rounded-r-full px-1 opacity-55 hover:opacity-100 hover:px-2 transition-all flex items-center justify-center max-sm:hidden'
                    onClick={() => !isChanging && setCurrent((prev) => prev - 1)}>
                    <FaChevronLeft className='text-neutral-200 size-6' />
                </div>
                <div className='absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer bg-neutral-800 h-1/4 bg-opacity-70 rounded-l-full px-1 opacity-55 hover:opacity-100 hover:px-2 transition-all flex items-center justify-center max-sm:hidden' onClick={() => !isChanging && setCurrent((prev) => prev + 1)}>
                    <FaChevronRight className='text-neutral-200 size-6' />
                </div>
            </div>
            <div className='absolute -bottom-4 raw'>
                {[...Array(sliderImages.length).keys()].map((index) => {
                    if (index === current) {
                        return <div key={index} className='bg-orange-400 rounded cursor-pointer w-10 h-1.5 transition-all' onClick={() => !isChanging && setCurrent(index)} />
                    }
                    return <div key={index} className='bg-neutral-800-90 rounded-full cursor-pointer w-5 h-1.5 transition-all' onClick={() => !isChanging && setCurrent(index)} />
                })}
            </div>
        </div>
    );
}
import React from 'react'
import { Slider } from '../components'
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'

export default function About() {
    return (
        <div className='grid max-md:text-center md:grid-cols-2 gap-8 lg:px-16 px-4 py-8'>
            <div className='font-medium flex flex-col justify-between gap-4'>
                <div className='space-y-3 text-sm text-neutral-500'>
                    <h3 className='text-xl font-bold text-neutral-700'>اكبر سوق منجا في مصر</h3>
                    <p>احنا بنجيب كل سنة افضل جودة من مزارعنا اعلى مواصفات في مصر من لون وطعم وشكل وفوق كل ده بنقدملك جودة تصدير يعني منجا حكاية المنجا اللي متنقي بالواحدة لحد عندك وانت في مكانك بضغطة زرارز</p>
                    <p>نحن نقدم لك تشكيلة متنوعة من المنجا الطازجة المزروعة بعناية في مزارعنا. نحرص على أن تكون الفواكه بأعلى جودة ومطابقة للمواصفات العالمية من حيث الطعم والشكل. مع خدمة التوصيل السريع، يمكنك الاستمتاع بفواكه طازجة ولذيذة تصل إلى باب منزلك بضغطة زر.</p>
                </div>
                <div className='flex justify-between items-center px-24'>
                    <p className='text-lg font-bold text-neutral-700'>تابعنا</p>
                    <div className='raw text-2xl text-white'>
                        <div className='bg-blue-800 p-1 rounded-full cursor-pointer'>
                            <FaFacebookF />
                        </div>
                        <div className='bg-pink-500 p-1 rounded-full cursor-pointer'>
                            <FaInstagram />
                        </div>
                        <div className='bg-green-500 p-1 rounded-full cursor-pointer'>
                            <FaWhatsapp />
                        </div>
                    </div>
                </div>
            </div>
            <div className='max-h-[32rem]'>
                <Slider />
            </div>
        </div>
    )
}

'use client';
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import Bannerresponsive from '../Home/Topmobilebanner';

// Static banner images - replace these with your actual images
import Banner1Img1 from '../../../public/assets/images/homebanner/img..png';
import Banner1Img2 from '../../../public/assets/images/homebanner/img..png';
import Banner2Img1 from '../../../public/assets/images/homebanner/dronee (1).png';
import Banner2Img2 from '../../../public/assets/images/homebanner/dronee (2).png';
import Banner3Img1 from '../../../public/assets/images/homebanner/img..png';
import Banner3Img2 from '../../../public/assets/images/homebanner/img..png';
import Banner4Img1 from '../../../public/assets/images/homebanner/dronee (1).png';
import Banner4Img2 from '../../../public/assets/images/homebanner/dronee (1).png';

const Home = () => {
    // Static banner data
    const BannerDataOne = [
        { url: Banner1Img1, bannerType: "Banner 1" },
        { url: Banner1Img2, bannerType: "Banner 1" }
    ];
    
    const BannerDataTwo = [
        { url: Banner2Img1, bannerType: "Banner 2" },
        { url: Banner2Img2, bannerType: "Banner 2" }
    ];
    
    const BannerDataThree = [
        { url: Banner3Img1, bannerType: "Banner 3" },
        { url: Banner3Img2, bannerType: "Banner 3" }
    ];
    
    const BannerDataFour = [
        { url: Banner4Img1, bannerType: "Banner 4" },
        { url: Banner4Img2, bannerType: "Banner 4" }
    ];

    return (
        <>
            <Bannerresponsive />

            <div className="container mx-auto px-6 py-1 grid sm:mt-0 lg:mt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center hidden lg:grid">
                
                {/* First Banner */}
                <div className="w-full max-w-md pt-1 mx-auto">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        className="w-full max-w-md"
                    >
                        {BannerDataOne.map((img, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-[#9ecf3f] rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
                                    <Image
                                        src={img.url}
                                        alt="Grocery Items"
                                        className="rounded-md"
                                        width={400}
                                        height={350}
                                        priority
                                    />
                                    <h2 className="text-lg md:text-xl font-bold mt-4 mb-3 text-white">Get Up to 30%* OFF</h2>
                                    <button className="bg-black hover:bg-gray-800 text-white font-bold py-1 px-4 rounded-md w-full sm:w-auto">
                                        SHOP NOW
                                    </button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Second & Fourth Banner */}
                <div className="w-full max-w-md pt-1 mx-auto">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 4000 }}
                        className="w-full"
                    >
                        {BannerDataFour.map((img, index) => (
                            <SwiperSlide key={index}>
                                <Image
                                    src={img.url}
                                    alt="Service Image"
                                    className="rounded-2xl"
                                    width={500}
                                    height={290}
                                    priority
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className="my-2 pb-1" /> {/* Middle gap */}

                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 4000 }}
                        className="w-full"
                    >
                        {BannerDataTwo.map((img, index) => (
                            <SwiperSlide key={index}>
                                <Image
                                    src={img.url}
                                    alt="Service Image"
                                    className="rounded-2xl"
                                    width={500}
                                    height={290}
                                    priority
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Third Banner */}
                <div className="w-full max-w-md pt-1 mx-auto">
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3000 }}
                        className="w-full max-w-md"
                    >
                        {BannerDataThree.map((img, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-[#e78f54] rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
                                    <Image
                                        src={img.url}
                                        alt="Grocery Items"
                                        className="rounded-md"
                                        width={400}
                                        height={350}
                                        priority
                                    />
                                    <h2 className="text-lg md:text-xl font-bold mt-4 mb-3 text-white">Get Up to 30%* OFF</h2>
                                    <button className="bg-black hover:bg-gray-800 text-white font-bold py-1 px-4 rounded-md w-full sm:w-auto">
                                        SHOP NOW
                                    </button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    );
};

export default Home;
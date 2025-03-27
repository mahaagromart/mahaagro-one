'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import Bannerresponsive from '../Home/Topmobilebanner';
import { makeRequest } from "@/api";

const Home = () => {
    const [BannerDataOne, setBannerOneData] = useState([]);
    const [BannerDataTwo, setBannerDataTwo] = useState([]);
    const [BannerDataThree, setBannerDataThree] = useState([]);
    const [BannerDataFour, setBannerDataFour] = useState([]);

    const GetAllBanner = async () => {
        try {
            const storedToken = localStorage.getItem("authToken");
            if (!storedToken) {
                console.warn("No auth token found in localStorage.");
                return;
            }

            const response = await makeRequest("POST", "/Banner/GetAllBanner", {
                headers: { Authorization: `Bearer ${storedToken}` },
            });

            if (Array.isArray(response) && response.length > 0) {
                const firstResponse = response[0];

                if (firstResponse.message === "SUCCESS" && firstResponse.retval === "SUCCESS") {
                    const BannerType = firstResponse.dataset?.$values || [];

                    setBannerOneData(BannerType.filter(el => el.bannerType === "Banner 1"));
                    setBannerDataTwo(BannerType.filter(el => el.bannerType === "Banner 2"));
                    setBannerDataThree(BannerType.filter(el => el.bannerType === "Banner 3"));
                    setBannerDataFour(BannerType.filter(el => el.bannerType === "Banner 4"));
                } else {
                    console.warn("Response did not return SUCCESS:", firstResponse);
                }
            } else {
                console.warn("Invalid response format:", response);
            }
        } catch (error) {
            console.error("Error fetching banners:", error.response?.data || error.message || error);
        }
    };

    useEffect(() => {
        GetAllBanner();


    }, []);

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
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${img.url}`}
                                        alt="Grocery Items"
                                        className="rounded-md"
                                        width={400}
                                        height={350}
                                        unoptimized
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
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${img.url}`}
                                    alt="Service Image"
                                    className="rounded-2xl"
                                    width={500}
                                    height={290}
                                    unoptimized
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
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${img.url}`}
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
                                        src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${img.url}`}
                                        alt="Grocery Items"
                                        className="rounded-md"
                                        width={400}
                                        height={350}
                                        unoptimized
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
'use client';
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import {useState,useEffect} from "react"
import { makeRequest } from "@/api";

import Imageone from '../../../public/assets/images/homebanner/img..png';
import Imagethree from '../../../public/assets/images/homebanner/dronee (1).png';
import Imagefour from '../../../public/assets/images/homebanner/dronee (2).png';
import Imagefive from '../../../public/assets/images/homebanner/imgfour.png';
import Bannerresponsive from './Topmobilebanner'

const Home = () => {
    const [BannerDataOne,setBannerOneData]=useState([])


    const GetAllBanner = async() => {
        try {
            const storedToken = localStorage.getItem("authToken");
            if (!storedToken) {
                console.warn("No auth token found in localStorage.");
                return;
            }
    
            const response = await makeRequest("GET", "/Banner/GetAllBanner", {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
    

            if (Array.isArray(response) && response.length > 0) {
                const firstResponse = response[0];
    
                if (firstResponse.message === "SUCCESS" && firstResponse.retval === "SUCCESS") {
                    const BannerType = firstResponse.dataset?.$values || [];
    
                  
                    const BannerTopBannerData = BannerType.filter((el) => el.bannerType === "Banner 1");
    
           
                    setBannerOneData(BannerTopBannerData);
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
        console.log(BannerDataOne)

    }, []); 
    
    


    return (
<>
<Bannerresponsive/>

        <div className="container mx-auto px-6 py-1 grid sm:mt-0 lg:mt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center hidden lg:grid">


            {/* First Banner */}
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                className="w-2/3  h-[600px]"
            >
                {BannerDataOne.map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-[#9ecf3f] rounded-2xl shadow-lg lg:p-12 mt-4 h-[530px] flex flex-col items-center text-center">
                            <Image  
                                src={`http://localhost:5136${img.url}`}  
                                alt="Grocery Items" 
                                className="rounded-md lg:h-64" 
                                width={400} 
                                height={850}
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

            {/* Second Banner */}
            <div className="w-full max-w-md   pt-1 mx-auto">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    className="w-full"
                >
                    {[Imagethree, Imagethree].map((img, index) => (
                        <SwiperSlide key={index}>
                            <Image
                                src={img}
                                alt="Service Image"
                                className="rounded-2xl"
                                width={500}
                                height={300}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="my-2  pb-1" />  {/* This is the middle gap */}

                <Swiper
                    modules={[Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    className="w-full"
                >
                    {[Imagefour, Imagefour].map((img, index) => (
                        <SwiperSlide key={index}>
                            <Image
                                src={img}
                                alt="Service Image"
                                className="rounded-2xl"
                                width={500}
                                height={300}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>




            {/* Third Banner */}
            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                className="w-full max-w-md"
            >
                {[Imagefive, Imagefive].map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-[#e78f54] rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
                            <Image src={img} alt="Grocery Items" className="rounded-md" width={400} height={350} />
                            <h2 className="text-lg md:text-xl font-bold mt-4 mb-3 text-white">Get Up to 30%* OFF</h2>
                            <button className="bg-black hover:bg-gray-800 text-white font-bold py-1 px-4 rounded-md w-full sm:w-auto">
                                SHOP NOW
                            </button>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
    
        </div>
        </>
         
    );
};

export default Home;


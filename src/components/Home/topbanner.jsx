<<<<<<< HEAD
// 'use client';
// import React from 'react';
// import Image from 'next/image';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/autoplay';
// import { Pagination, Autoplay } from 'swiper/modules';
// import Bannerresponsive from '../Home/Topmobilebanner';

// // Static banner images - replace these with your actual images
// import Banner1Img1 from '../../../public/assets/images/homebanner/img..png';
// import Banner1Img2 from '../../../public/assets/images/homebanner/img..png';
// import Banner2Img1 from '../../../public/assets/images/homebanner/dronee (1).png';
// import Banner2Img2 from '../../../public/assets/images/homebanner/dronee (2).png';
// import Banner3Img1 from '../../../public/assets/images/homebanner/img..png';
// import Banner3Img2 from '../../../public/assets/images/homebanner/img..png';
// import Banner4Img1 from '../../../public/assets/images/homebanner/dronee (1).png';
// import Banner4Img2 from '../../../public/assets/images/homebanner/dronee (1).png';

// const topbanner = () => {
//     // Static banner data
//     const BannerDataOne = [
//         { url: Banner1Img1, bannerType: "Banner 1" },
//         { url: Banner1Img2, bannerType: "Banner 1" }
//     ];
    
//     const BannerDataTwo = [
//         { url: Banner2Img1, bannerType: "Banner 2" },
//         { url: Banner2Img2, bannerType: "Banner 2" }
//     ];
    
//     const BannerDataThree = [
//         { url: Banner3Img1, bannerType: "Banner 3" },
//         { url: Banner3Img2, bannerType: "Banner 3" }
//     ];
    
//     const BannerDataFour = [
//         { url: Banner4Img1, bannerType: "Banner 4" },
//         { url: Banner4Img2, bannerType: "Banner 4" }
//     ];

//     return (
//         <>
//             <Bannerresponsive />

//             <div className="container mx-auto px-6 py-1 grid sm:mt-0 lg:mt-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center hidden lg:grid">
                
//                 {/* First Banner */}
//                 <div className="w-full max-w-md pt-1 mx-auto">
//                     <Swiper
//                         modules={[Pagination, Autoplay]}
//                         spaceBetween={20}
//                         slidesPerView={1}
//                         pagination={{ clickable: true }}
//                         autoplay={{ delay: 3000 }}
//                         className="w-full max-w-md"
//                     >
//                         {BannerDataOne.map((img, index) => (
//                             <SwiperSlide key={index}>
//                                 <div className="bg-[#9ecf3f] rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
//                                     <Image
//                                         src={img.url}
//                                         alt="Grocery Items"
//                                         className="rounded-md"
//                                         width={400}
//                                         height={350}
//                                         priority
//                                     />
//                                     <h2 className="text-lg md:text-xl font-bold mt-4 mb-3 text-white">Get Up to 30%* OFF</h2>
//                                     <button className="bg-black hover:bg-gray-800 text-white font-bold py-1 px-4 rounded-md w-full sm:w-auto">
//                                         SHOP NOW
//                                     </button>
//                                 </div>
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>
//                 </div>

//                 {/* Second & Fourth Banner */}
//                 <div className="w-full max-w-md pt-1 mx-auto">
//                     <Swiper
//                         modules={[Pagination, Autoplay]}
//                         spaceBetween={20}
//                         slidesPerView={1}
//                         pagination={{ clickable: true }}
//                         autoplay={{ delay: 4000 }}
//                         className="w-full"
//                     >
//                         {BannerDataFour.map((img, index) => (
//                             <SwiperSlide key={index}>
//                                 <Image
//                                     src={img.url}
//                                     alt="Service Image"
//                                     className="rounded-2xl"
//                                     width={500}
//                                     height={290}
//                                     priority
//                                 />
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>

//                     <div className="my-2 pb-1" /> {/* Middle gap */}

//                     <Swiper
//                         modules={[Pagination, Autoplay]}
//                         spaceBetween={20}
//                         slidesPerView={1}
//                         pagination={{ clickable: true }}
//                         autoplay={{ delay: 4000 }}
//                         className="w-full"
//                     >
//                         {BannerDataTwo.map((img, index) => (
//                             <SwiperSlide key={index}>
//                                 <Image
//                                     src={img.url}
//                                     alt="Service Image"
//                                     className="rounded-2xl"
//                                     width={500}
//                                     height={290}
//                                     priority
//                                 />
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>
//                 </div>

//                 {/* Third Banner */}
//                 <div className="w-full max-w-md pt-1 mx-auto">
//                     <Swiper
//                         modules={[Pagination, Autoplay]}
//                         spaceBetween={20}
//                         slidesPerView={1}
//                         pagination={{ clickable: true }}
//                         autoplay={{ delay: 3000 }}
//                         className="w-full max-w-md"
//                     >
//                         {BannerDataThree.map((img, index) => (
//                             <SwiperSlide key={index}>
//                                 <div className="bg-[#e78f54] rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
//                                     <Image
//                                         src={img.url}
//                                         alt="Grocery Items"
//                                         className="rounded-md"
//                                         width={400}
//                                         height={350}
//                                         priority
//                                     />
//                                     <h2 className="text-lg md:text-xl font-bold mt-4 mb-3 text-white">Get Up to 30%* OFF</h2>
//                                     <button className="bg-black hover:bg-gray-800 text-white font-bold py-1 px-4 rounded-md w-full sm:w-auto">
//                                         SHOP NOW
//                                     </button>
//                                 </div>
//                             </SwiperSlide>
//                         ))}
//                     </Swiper>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default topbanner;
'use client';
import React, { useEffect, useState } from 'react';
=======
'use client';
import React from 'react';
>>>>>>> dac8d2866b52c5da2b4c043b1feb4d147d44dd32
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import Bannerresponsive from '../Home/Topmobilebanner';
<<<<<<< HEAD
import { makeRequest } from "@/api";

const TopBanner = () => {
    const [banners, setBanners] = useState({
        banner1: [],
        banner2: [],
        banner3: [],
        banner4: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fallbackImage = '/_next/static/media/oops.fc6bf510.png'; // Define a fallback image path

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await makeRequest('POST', '/Banner/GetAllBanner');

                // Validate and handle the response structure
                if (!response || !response[0] || !response[0].dataset || !response[0].dataset.$values) {
                    throw new Error('Invalid response structure from the server');
                }

                const allBanners = response[0].dataset.$values;

                // Group banners by their type
                const groupedBanners = {
                    banner1: allBanners.filter((b) => b.bannerType === "Banner 1"),
                    banner2: allBanners.filter((b) => b.bannerType === "Banner 2"),
                    banner3: allBanners.filter((b) => b.bannerType === "Banner 3"),
                    banner4: allBanners.filter((b) => b.bannerType === "Banner 4")
                };

                setBanners(groupedBanners);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching banners:', err);
                setError('Failed to fetch banners. Please try again later.');
                setLoading(false);
            }
        };

        fetchBanners();
    }, []);

    if (loading) {
        return <div className="container mx-auto px-6 py-4 text-center">Loading banners...</div>;
    }

    if (error) {
        return <div className="container mx-auto px-6 py-4 text-center text-red-500">{error}</div>;
    }
=======

// Static banner images - replace these with your actual images
import Banner1Img1 from '../../../public/assets/images/homebanner/img..png';
import Banner1Img2 from '../../../public/assets/images/homebanner/img..png';
import Banner2Img1 from '../../../public/assets/images/homebanner/dronee (1).png';
import Banner2Img2 from '../../../public/assets/images/homebanner/dronee (2).png';
import Banner3Img1 from '../../../public/assets/images/homebanner/img..png';
import Banner3Img2 from '../../../public/assets/images/homebanner/img..png';
import Banner4Img1 from '../../../public/assets/images/homebanner/dronee (1).png';
import Banner4Img2 from '../../../public/assets/images/homebanner/dronee (1).png';

const topbanner = () => {
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
>>>>>>> dac8d2866b52c5da2b4c043b1feb4d147d44dd32

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
<<<<<<< HEAD
                        {banners.banner1.map((banner, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-[#9ecf3f] rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
                                    <Image
                                        src={`https://api.mahaagro.org${banner.url}`}
                                        alt={`Banner 1 - ${index}`}
                                        width={400}
                                        height={350}
                                        priority
                                        onError={(e) => {
                                            e.target.src = fallbackImage; // Use fallback image if the original fails
                                        }}
=======
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
>>>>>>> dac8d2866b52c5da2b4c043b1feb4d147d44dd32
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
<<<<<<< HEAD
                        className="w-full rounded-lg"
                    >
                        {banners.banner4.map((banner, index) => (
                            <SwiperSlide key={index}>
                                <Image
                                    src={`https://api.mahaagro.org${banner.url}`}
                                    alt={`Banner 4 - ${index}`}
                                    width={500}
                                    height={290}
                                    priority
                                    onError={(e) => {
                                        e.target.src = fallbackImage; // Use fallback image if the original fails
                                    }}
=======
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
>>>>>>> dac8d2866b52c5da2b4c043b1feb4d147d44dd32
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
<<<<<<< HEAD
                        className="w-full rounded-lg"
                    >
                        {banners.banner2.map((banner, index) => (
                            <SwiperSlide key={index}>
                                <Image
                                    src={`https://api.mahaagro.org${banner.url}`}
                                    alt={`Banner 2 - ${index}`}
                                    width={500}
                                    height={290}
                                    priority
                                    onError={(e) => {
                                        e.target.src = fallbackImage; // Use fallback image if the original fails
                                    }}
=======
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
>>>>>>> dac8d2866b52c5da2b4c043b1feb4d147d44dd32
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
<<<<<<< HEAD
                        {banners.banner3.map((banner, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-[#e78f54] rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
                                    <Image
                                        src={`https://api.mahaagro.org${banner.url}`}
                                        alt={`Banner 3 - ${index}`}
                                        width={400}
                                        height={350}
                                        priority
                                        onError={(e) => {
                                            e.target.src = fallbackImage; // Use fallback image if the original fails
                                        }}
=======
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
>>>>>>> dac8d2866b52c5da2b4c043b1feb4d147d44dd32
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

<<<<<<< HEAD
export default TopBanner;
=======
export default topbanner;
>>>>>>> dac8d2866b52c5da2b4c043b1feb4d147d44dd32

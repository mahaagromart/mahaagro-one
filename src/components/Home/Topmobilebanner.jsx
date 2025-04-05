'use client'; // Mark this file as a client component
import Image from "next/image";
import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import MobileBanner from "../../../public/assets/images/Mobilebanner/mbanner.svg";
import Mobiletwo from "../../../public/assets/images/Mobilebanner/mtwo.svg"; // Ensure Mobiletwo is also imported
import { makeRequest } from '@/api';
const Topmobilebanner = () => {
    const [BannerDataOne, setBannerOneData] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const videoRefs = useRef([]);

    const slides = useMemo(() => [
        { type: 'image', src: MobileBanner },
        { type: 'image', src: Mobiletwo },
        // Add more slides here if needed
    ], []);

    const handlePrev = useCallback(() => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }, [slides.length]);

    const handleNext = useCallback(() => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, [slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            handleNext();
        }, 3000);

        return () => clearInterval(interval);
    }, [isPaused, handleNext]);

    useEffect(() => {
        videoRefs.current.forEach((video) => {
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });
 
        const currentVideo = videoRefs.current[currentSlide];
        if (currentVideo && slides[currentSlide].type === 'video') {
            const playVideo = async () => {
                try {
                    await currentVideo.play();
                } catch (error) {
                    console.error('Error playing video:', error);
                }
            };
            playVideo();
        }
    }, [currentSlide, slides]);

    return (
        <div className="sm:hidden block"> {/* Hide on large screens, show on mobile/tablet */}
            <div className="container mx-auto px-6 py-2">
                <div
                    className="relative w-full"
                    data-carousel="slide"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="relative overflow-hidden rounded-lg h-48 sm:h-64 md:h-80 lg:h-90">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-transform duration-700 ease-in-out transform ${index === currentSlide ? "translate-x-0" : "translate-x-full"}`}
                                data-carousel-item={index === currentSlide ? "active" : ""}
                            >
                                {slide.type === 'image' ? (
                                    <Image
                                        src={slide.src}
                                        alt={`Slide ${index + 1}`}
                                        fill
                                        style={{ objectFit: "cover" }}
                                        className="absolute top-0 left-0"
                                    />
                                ) : (
                                    <video
                                        ref={(el) => videoRefs.current[index] = el}
                                        className="absolute top-0 left-0 w-full h-full object-cover"
                                        loop
                                        muted
                                    >
                                        <source src={slide.src} type="video/mp4" />
                                    </video>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Carousel Navigation */}
                    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-2 md:space-x-3">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`w-4 h-1.5 rounded-lg md:w-6 md:h-2.5 transition-transform duration-300 ${index === currentSlide ? "bg-green-400 scale-125 shadow-lg" : "bg-gray-300 hover:bg-gray-400"}`}
                                aria-current={index === currentSlide ? "true" : "false"}
                                aria-label={`Slide ${index + 1}`}
                                onClick={() => goToSlide(index)}
                            ></button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Topmobilebanner;
'use client'; // Mark this file as a client component
import Image from "next/image";
import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import Bannerk from "../../../../public/assets/images/homebanner/foodb (1).png";
import Bannerm from "../../../../public/assets/images/homebanner/foodb (2).png";
import Bannerf from "../../../../public/assets/images/homebanner/foodb (3).png"; 


const Bannerthree = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const videoRefs = useRef([]);

    const slides = useMemo(() => [
        { type: 'image', src: Bannerk },
        { type: 'image', src: Bannerm },
        { type: 'image', src: Bannerf },
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
        <div>
            {/* Carousel for Mobile/Tablet (hidden on large screens) */}
            <div className="sm:hidden block">
                <div className="container mx-auto  ">
                    <div
                        className="relative w-full"
                        data-carousel="slide"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        <div className="relative overflow-hidden  h-48  sm:h-64 md:h-80 lg:h-90">
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

            {/* Grid Layout for Large Screens (hidden on mobile/tablet) */}
            <div className="hidden sm:block">
                <div className="container mx-auto px-6 py-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Column 1 - No rounding, bold border */}
                        <div className="example-5 relative p-16 sm:p-14 lg:p-28 bold-border">
                            <Image
                                src={Bannerk}
                                alt="Column 1 Image"
                                fill
                                className="rounded-lg"
                            />
                            <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <rect
                                    x="0"
                                    y="0"
                                    width="100%"
                                    height="100%"
                                    className="line"
                                    strokeWidth="4"  // Bold border
                                    style={{ strokeLinecap: "round" }}  // Move strokeLinecap to style
                                    fill="transparent"
                                />
                            </svg>
                        </div>

                        {/* Column 2 - No rounding, normal border */}
                        <div className="example-5 relative p-16 sm:p-14 lg:p-28">
                            <Image
                                src={Bannerf}
                                alt="Column 2 Image"
                                fill
                                className="rounded-lg"
                            />
                            <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <rect
                                    x="0"
                                    y="0"
                                    width="100%"
                                    height="100%"
                                    className="line"
                                    strokeWidth="2"  // Normal border
                                    style={{ strokeLinecap: "round" }}  // Move strokeLinecap to style
                                    fill="transparent"
                                />
                            </svg>
                        </div>

                        {/* Column 3 - No rounding, normal border */}
                        <div className="example-5 relative p-16 sm:p-14 lg:p-28">
                            <Image
                                src={Bannerm}
                                alt="Column 3 Image"
                                fill
                                className="rounded-lg"
                            />
                            <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <rect
                                    x="0"
                                    y="0"
                                    width="100%"
                                    height="100%"
                                    className="line"
                                    strokeWidth="2"  // Normal border
                                    style={{ strokeLinecap: "round" }}  // Move strokeLinecap to style
                                    fill="transparent"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bannerthree;
'use client';  // This tells Next.js that the component should run on the client side.
import { FaHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartslice";
import Weekly from "../../../public/assets/images/img/weekly.png";
import img from "../../../public/assets/images/fruitproduct/grape.png";
import Fooda from "../../../public/assets/images/foodproduct/food-1 (1).svg";
import Foodb from "../../../public/assets/images/foodproduct/food-1 (2).webp";
import Foodc from "../../../public/assets/images/foodproduct/food-1 (3).webp";
import Foodd from "../../../public/assets/images/foodproduct/food-1 (4).webp";
import Foode from "../../../public/assets/images/foodproduct/food-1 (5).webp";
import Foodf from "../../../public/assets/images/foodproduct/food-1 (6).webp";

const Banner = () => {
    const dispatch = useDispatch();
    const [cart, setCart] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [daysLeft, setDaysLeft] = useState(0);
    const [hoursLeft, setHoursLeft] = useState(0);
    const [minutesLeft, setMinutesLeft] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(0);

    useEffect(() => {
        // Update the time every second
        const interval = setInterval(() => {
            const now = new Date();
            setCurrentTime(now);

            // Set the target date for countdown
            const targetDate = new Date('2025-12-01'); // Changed to a future date
            const timeDiff = targetDate - now;

            if (timeDiff > 0) {
                const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

                setDaysLeft(days);
                setHoursLeft(hours);
                setMinutesLeft(minutes);
                setSecondsLeft(seconds);
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);
  
    const handleAddToCart = (product) => {
        const productToAdd = {
            ...product,
            selectedWeight: product.selectedWeight?.label ?? '', // Handle case where selectedWeight is undefined
            selectedPrice: product.selectedWeight?.discountedPrice ?? 0,
            selectedOriginalPrice: product.selectedWeight?.originalPrice ?? 0,
            selectedDiscountedPrice: product.selectedWeight?.discountedPrice ?? 0,
        };
        setCart([...cart, productToAdd]);
        dispatch(addToCart(productToAdd));
        console.log("Added to Cart:", productToAdd); // Optional: for debugging
    };

    return (
        <div className="border-4 bg-[#D8F2DE] border-red-500 container mx-auto rounded-xl">
            {/* Top Section: Day of the Week and Time */}
            <div className="p-2 rounded-lg shadow-md flex bg-[#FEFDF3] justify-between items-center flex-wrap">
                {/* Left Section: Deal of the Week */}
                <div className="text-xl font-semibold flex-grow">
                    <h1 className="text-2xl font-bold">Deal of the Week</h1>
                </div>

                {/* Right Section: Countdown Timer */}
                <div className="text-xl font-semibold">
                    <div className="flex p-2 rounded-lg space-x-2">
                        <div className="countdown-section text-white bg-red-500 px-2 rounded-lg">
                            <div className="countdown-number">{String(daysLeft).padStart(2, '0')}</div>
                            <div className="countdown-unit">Day</div>
                        </div>
                        <div className="countdown-section text-white bg-red-500 px-2 rounded-lg">
                            <div className="countdown-number">{String(hoursLeft).padStart(2, '0')}</div>
                            <div className="countdown-unit">Hr</div>
                        </div>
                        <div className="countdown-section text-white bg-red-500 px-2 rounded-lg">
                            <div className="countdown-number">{String(minutesLeft).padStart(2, '0')}</div>
                            <div className="countdown-unit">Min</div>
                        </div>
                        <div className="countdown-section text-white bg-red-500 px-2 rounded-lg">
                            <div className="countdown-number">{String(secondsLeft).padStart(2, '0')}</div>
                            <div className="countdown-unit">Secs</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Image and Product Columns */}
            <div className="flex p-6 rounded-md shadow-sm mt-4 flex-col md:flex-row">
                {/* Left Side Image - Online Image */}
                <div className="w-full md:w-1/2 ">
                    <Image
                        src={Weekly}
                        alt="Beverage"
                        className="  rounded-md md:h-[470px] md:mt-2"
                    />
                </div>

                {/* Right Side - 3 Columns */}
                <div className="w-full md:w-2/2 flex flex-col md:grid md:grid-cols-3 gap-2">
                    {/* First Column */}
                    <div className='bg-white rounded-lg'>
                        <div className="rounded-md shadow-sm">
                            <div className="space-y-3 p-6">
                                <div className="flex items-center justify-between">
                                    <ul className="flex space-x-1">
                                        <li className="bg-gray-200 px-1 py-0.5 rounded">
                                            <a href="" rel="tag">Fruit</a>
                                        </li>
                                    </ul>
                                    <FaHeart className="text-red-500 text-lg" />
                                </div>
                                
                                    <Image
                                        src={img}
                                        alt="Whole Foods Market, Organic Trimmed Green Beans, 12 oz"
                                        className="w-auto h-[280px] md:[160px] rounded"
                                    />
                     
                                <div>
                                    <h2 className="text-md font-semibold">Fresh Grapes  </h2>
                                    <div className="flex items-center space-x-1">
                                        <span className="text-green-500 font-bold text-sm">₹3.00 - ₹8.00</span>
                                        <span className="bg-red-500 text-white px-1 py-0.5 rounded text-xs">-77%</span>
                                    </div>
                                    <div className="flex items-center space-x-1 mt-1">
                                        <span className="text-yellow-500 text-sm">★★★★★</span>
                                        <span className="text-sm">(5.00)</span>
                                    </div>
                                    <div className="flex space-x-1 mt-2">
                                        <button className="bg-green-500 text-white px-2 py-1 rounded text-sm" onClick={() => handleAddToCart({ name: 'Fresh Grapes', img, selectedWeight: { label: '1kg', discountedPrice: 5, originalPrice: 8 } })}>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Second Column */}
                    <div className="space-y-2">
                        <div className="relative flex items-start p-3 space-x-3 bg-white rounded-lg">
                            <Image
                                src={Foodb}
                                alt="Delicious Lay’s Potato Chips, Classic, 8 oz Bag"
                                className="w-1/3 h-[130px] rounded"
                            />
                            <div className="flex-1">
                                <h2 className="text-md font-semibold">Chiliiy..</h2>
                                <div className="flex items-center space-x-1">
                                    <span className="line-through text-gray-500 text-sm">₹21.00</span>
                                </div>
                                <span className="text-green-500 font-bold text-sm">₹12.00</span>
                                <div className="flex items-center space-x-1 mt-1">
                                    <span className="text-yellow-500 text-sm">★★★☆</span>
                                    <span className="text-sm">4.6</span>
                                </div>
                                <div className="flex space-x-1 mt-2">
                                    <button className="bg-green-500 text-white px-2 py-1  rounded text-sm" onClick={() => handleAddToCart({ name: 'Chiliiy Powder', img: Fooda, selectedWeight: { label: '200g', discountedPrice: 12, originalPrice: 21 } })}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                        <div className="relative flex items-start p-3 space-x-3 bg-white rounded-lg">
                            <Image
                                src={Foodb}
                                alt="Delicious Lay’s Potato Chips, Classic, 8 oz Bag"
                                className="w-1/3 h-[130px] rounded"
                            />
                            <div className="flex-1">
                                <h2 className="text-md font-semibold">Kanda..</h2>
                                <div className="flex items-center space-x-1">
                                    <span className="line-through text-gray-500 text-sm">₹21.00</span>
                                </div>
                                <span className="text-green-500 font-bold text-sm">₹12.00</span>
                                <div className="flex items-center space-x-1 mt-1">
                                <span className="text-yellow-500 text-sm">★★★☆</span>
                                <span className="text-sm">4.6</span>
                                </div>
                                <div className="flex space-x-1 mt-2">
                                    <button className="bg-green-500 text-white px-2 py-1 rounded text-sm" onClick={() => handleAddToCart({ name: 'Kanda Lasun', img: Foodb, selectedWeight: { label: '200g', discountedPrice: 12, originalPrice: 21 } })}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                        <div className="relative flex items-start p-3 space-x-3 bg-white rounded-lg">
                            <Image
                                src={Foodc}
                                alt="Delicious Lay’s Potato Chips, Classic, 8 oz Bag"
                                className="w-1/3 h-[130px] rounded"
                            />
                            <div className="flex-1">
                                <h2 className="text-md font-semibold">Chiwda..</h2>
                                <div className="flex items-center space-x-1">
                                    <span className="line-through text-gray-500 text-sm">₹21.00</span>
                                </div>
                                <span className="text-green-500 font-bold text-sm">₹12.00</span>
                                <div className="flex items-center space-x-1 mt-1">
                                <span className="text-yellow-500 text-sm">★★★☆</span>
                                <span className="text-sm">4.6</span>
                                </div>
                                <div className="flex space-x-1 mt-2">
                                    <button className="bg-green-500 text-white px-2 py-1 rounded text-sm" onClick={() => handleAddToCart({ name: 'Chiwda Masala', img: Foodc, selectedWeight: { label: '200g', discountedPrice: 12, originalPrice: 21 } })}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Third Column */}
                    <div className="space-y-2">
                        <div className="relative flex items-start p-3 space-x-3 bg-white rounded-lg">
                            <Image
                                src={Foodd}
                                alt="Delicious Lay’s Potato Chips, Classic, 8 oz Bag"
                                className="w-1/3 h-[130px] rounded"
                            />
                            <div className="flex-1">
                                <h2 className="text-md font-semibold">Papad..</h2>
                                <div className="flex items-center space-x-1">
                                    <span className="line-through text-gray-500 text-sm">₹21.00</span>
                                </div>
                                <span className="text-green-500 font-bold text-sm">₹12.00</span>
                                <div className="flex items-center space-x-1 mt-1">
                                <span className="text-yellow-500 text-sm">★★★☆</span>
                                <span className="text-sm">4.6</span>
                                </div>
                                <div className="flex space-x-1 mt-2">
                                    <button className="bg-green-500 text-white px-2 py-1 rounded text-sm" onClick={() => handleAddToCart({ name: 'Papad Masala', img: Foodd, selectedWeight: { label: '200g', discountedPrice: 12, originalPrice: 21 } })}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                        <div className="relative flex items-start p-3 space-x-3 bg-white rounded-lg">
                            <Image
                                src={Foode}
                                alt="Delicious Lay’s Potato Chips, Classic, 8 oz Bag"
                                className="w-1/3 h-[130px] rounded"
                            />
                            <div className="flex-1">
                                <h2 className="text-md font-semibold">Kala..</h2>
                                <div className="flex items-center space-x-1">
                                    <span className="line-through text-gray-500 text-sm">₹21.00</span>
                                </div>
                                <span className="text-green-500 font-bold text-sm">₹12.00</span>
                                <div className="flex items-center space-x-1 mt-1">
                                <span className="text-yellow-500 text-sm">★★★☆</span>
                                <span className="text-sm">4.6</span>
                                </div>
                                <div className="flex space-x-1  mt-2">
                                    <button className="bg-green-500 text-white px-2 py-1 rounded text-sm" onClick={() => handleAddToCart({ name: 'Kala tikha', img: Foode, selectedWeight: { label: '200g', discountedPrice: 12, originalPrice: 21 } })}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                        <div className="relative flex items-start p-3 space-x-3 bg-white rounded-lg">
                            <Image
                                src={Foodf}
                                alt="Delicious Lay’s Potato Chips, Classic, 8 oz Bag"
                                className="w-1/3 h-[130px] rounded"
                            />
                            <div className="flex-1">
                                <h2 className="text-md font-semibold">Chilly..</h2>
                                <div className="flex items-center space-x-1">
                                    <span className="line-through text-gray-500 text-sm">₹21.00</span>
                                </div>
                                <span className="text-green-500 font-bold text-sm">₹12.00</span>
                                <div className="flex items-center space-x-1 mt-1">
                                <span className="text-yellow-500 text-sm">★★★☆</span>
                                <span className="text-sm">4.6</span>
                                </div>
                                <div className="flex space-x-1 mt-2">
                                    <button className="bg-green-500 text-white px-2 py-1 rounded text-sm" onClick={() => handleAddToCart({ name: 'Chilly Powder pro', img: Foodf, selectedWeight: { label: '200g', discountedPrice: 12, originalPrice: 21 } })}>Add to Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
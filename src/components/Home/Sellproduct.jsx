'use client';
import Image from 'next/image';
import { FaHeart, FaArrowRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import img from "../../../public/assets/images/fruitproduct/fruits.png";
import sella from "../../../public/assets/images/onthesell/sell (1).svg";
import sellb from "../../../public/assets/images/onthesell/sell (2).svg";
import sellc from "../../../public/assets/images/onthesell/sell (3).svg";
import selld from "../../../public/assets/images/onthesell/sell (4).svg";
import selle from "../../../public/assets/images/onthesell/sell (5).svg";
import sellf from "../../../public/assets/images/onthesell/selltwo.webp";

const Sellproduct = () => {
    return (
        <div className="container mx-auto px-4">
            {/* Header Section */}
            <div className="text-left py-6">
                <h1 className="text-3xl font-bold">On  sale  Products</h1>
            </div>

            {/* Grid Layout */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* First Column - Featured Product */}
                <div className="p-6 bg-white shadow-lg rounded-xl transition transform hover:scale-105 hover:shadow-2xl">
                    <div className='border border-gray-200 p-4 rounded-xl'>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">Premium Fruits</span>
                            <button className="p-2 rounded-full hover:bg-red-100">
                                <FaHeart className="text-red-500" />
                            </button>
                        </div>
                        <div className="my-8 mx-5 flex justify-center">
                            <Image src={img} alt="Fresh Blackberry" width={200} height={200} className="object-contain" />
                        </div>
                        <h2 className="text-lg font-semibold">Fresh Blackberry No.1 Quality</h2>
                        <p className="text-emerald-600 font-bold text-lg">₹3.00 - ₹8.00</p>
                        <p className="text-sm text-gray-500">★★★★★ (5.00)</p>
                        <button className="w-full mt-3 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg">
                            Add to Cart
                        </button>
                    </div>
                </div>

                {/* Second Column - More Deals */}
                <div className="flex justify-center items-center">
                    <div className="w-full max-w-4xl px-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">More Deals</h2>
                            <button className="flex items-center border-2 px-4 py-2 rounded-full hover:bg-gray-100">
                                See More <FaArrowRight className="ml-2" />
                            </button>
                        </div>
                        {[sella, sellb, sellc].map((product, index) => (
                            <div key={index} className="flex items-center bg-gray-100 rounded-lg p-5 mb-4 transition transform hover:scale-105 hover:shadow-xl">
                                <Image src={product} alt="Product" width={100} height={100} className="rounded-md border-2 " />
                                <div className="ml-4">
                                    <h3 className="text-md font-semibold">Product Name</h3>
                                    <p className="text-sm text-gray-500">★★★★☆ (4.00)</p>
                                    <p className="text-green-600 font-bold">₹12.00 <span className="line-through text-gray-500">₹21.00</span></p>
                                    <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Third Column - Best Sellers */}
                <div className="flex justify-center items-center">
                    <div className="w-full max-w-4xl px-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Best Seller</h2>
                            <button className="flex items-center border-2 px-4 py-2 rounded-full hover:bg-gray-100">
                                See More <FaArrowRight className="ml-2" />
                            </button>
                        </div>
                        {[selld, selle, sellf].map((product, index) => (
                            <div key={index} className="flex items-center bg-gray-100 rounded-lg p-5 mb-4 transition transform hover:scale-105 hover:shadow-xl">
                                <Image src={product} alt="Product" width={100} height={120} className="rounded-md border-2" />
                                <div className="ml-4">
                                    <h3 className="text-md-center font-semibold">Product Name</h3>
                                    <p className="text-sm text-gray-500">★★★★☆ (4.00)</p>
                                    <p className="text-green-600 font-bold">₹12.00 <span className="line-through text-gray-500">₹21.00</span></p>
                                    <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Sellproduct;

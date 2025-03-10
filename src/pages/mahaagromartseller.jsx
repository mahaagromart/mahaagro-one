import Image from 'next/image';
import Grexture from '../../public/assets/images/img/hint.webp';
import Meet from '../../public/assets/images/img/handshake.webp';
import Link from 'next/link';
import React from 'react';
import { FaUsers, FaGlobe, FaShippingFast, FaWallet, FaLock, FaCheck } from 'react-icons/fa';

function SmartSection() {
    return (
        <>
            <section className="flex bg-white container mx-auto p-2 justify-center items-center">
                <div className="flex flex-row w-full max-w-screen-lg mx-auto">
                    <div className="content flex flex-col justify-center mb-4 mr-4 text-left">
                        <h1 className="mb-2 text-4xl font-bold">
                            Be <span className="text-[#fcb800]">Smart</span>,
                            <span className="text-[#fcb800]">Relax</span> And
                            <span className="text-[#fcb800]">Sell</span> with
                            <span className="font-black">Mahaagro</span> mart
                        </h1>
                        <p className="mb-2 text-2xl">With a few simple steps start your own Online Business</p>
                        <Link href="/seller">
                            <button className="register_btn mt-2 bg-[#fcb800] hover:bg-green-800 text-white font-bold py-2 px-4 rounded">
                                Register Today
                            </button>
                        </Link>
                    </div>
                    <div className="hero_img flex justify-center">
                        <Image
                            src={Grexture}
                            alt="girl pointing Heading"
                            width={200}
                            height={100}
                            className="h-auto w-full max-w-[200px]"
                        />
                    </div>
                </div>
            </section>

            <br /><br />

            <div className="space-y-8">
                <div className='max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 h-auto'>
                    {/* Lakhs of Customers */}
                    <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg p-4 shadow-md">
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold">Lakhs of Customers</h2>
                        </div>
                        <div className="flex-shrink-0">
                            <FaUsers className="text-3xl text-[#fcb800]" />
                        </div>
                    </div>

                    {/* Sell Domestic */}
                    <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg p-4 shadow-md">
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold">Sell Domestic</h2>
                        </div>
                        <div className="flex-shrink-0">
                            <FaGlobe className="text-3xl text-[#fcb800]" />
                        </div>
                    </div>

                    {/* Free Shipping */}
                    <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg p-4 shadow-md">
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold">Free Shipping</h2>
                        </div>
                        <div className="flex-shrink-0">
                            <FaShippingFast className="text-3xl text-[#fcb800]" />
                        </div>
                    </div>

                    {/* Pay When You Sell */}
                    <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg p-4 shadow-md">
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold">Pay When You Sell</h2>
                        </div>
                        <div className="flex-shrink-0">
                            <FaWallet className="text-3xl text-[#fcb800]" />
                        </div>
                    </div>

                    {/* Secure and Timely Payments */}
                    <div className="flex items-center justify-between bg-white border border-gray-300 rounded-lg p-4 shadow-md">
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold">Secure and Timely Payments</h2>
                        </div>
                        <div className="flex-shrink-0">
                            <FaLock className="text-3xl text-[#fcb800]" />
                        </div>
                    </div>
                </div>
            </div>

            <br /><br />

            <section className="bg-white py-10">
                <h2 className="text-center text-4xl mb-5">How easy it is to sell on Mahaagro mart</h2>
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="text-center text-4xl mb-3 bg-green-300 rounded-full w-16 h-16 flex items-center justify-center">
                            1
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Set-up your Seller Account on Mahaagro</h3>
                        <p className="text-left">
                            Provide your business details, bank account details, and your tax information.
                        </p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="text-center text-4xl mb-3 bg-green-300 rounded-full w-16 h-16 flex items-center justify-center">
                            2
                        </div>
                        <h3 className="text-xl font-semibold mb-2">List Your Products</h3>
                        <p className="text-left">
                            Provide the description and price of the product(s) you want to sell. Customers use this information before they buy.
                        </p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="text-center text-4xl mb-3 bg-green-300 rounded-full w-16 h-16 flex items-center justify-center">
                            3
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Ship Orders</h3>
                        <p className="text-left">
                            Once a buyer orders your product, you can use Mahaagro's delivery service.
                        </p>
                    </div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <div className="text-center text-4xl mb-3 bg-green-300 rounded-full w-16 h-16 flex items-center justify-center">
                            4
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Get Payments</h3>
                        <p className="text-left">
                            Your payment is directly deposited in your bank account within 15 - 30 working days.
                        </p>
                    </div>
                </div>
            </section>

            <br />

            <section className="wwg">
                <div className="wwg_wrap flex flex-wrap">
                    <div className="w-full md:w-1/2">
                        <Image
                            className="ml-auto md:block p-6 rounded-full"
                            src={Meet}
                            alt="Handshake"
                            width={500}
                            height={300}
                        />
                    </div>
                    <div className="w-full md:w-1/2 pl-4 md:pl-0">
                        <h2 className="text-2xl font-bold mb-4">What we guarantee</h2>
                        <div>
                            {['High increase in your sales.', 'Better Profits.', 'Pay only when you sell.', 'Hassle Free timely payments.', 'Aggressive marketing of your products and company.'].map((item, index) => (
                                <div key={index} className="wwg_point my-3 flex items-center">
                                    <div className="check mr-4">
                                        <FaCheck className="text-3xl text-[#fcb800]" />
                                    </div>
                                    <p className="mb-0">{item}</p>
                                </div>
                            ))}
                            <Link href="/seller">
                                <button className="register_btn mt-2 bg-[#fcb800] hover:bg-green-800 text-white font-bold py-2 px-4 rounded">Register Today</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default SmartSection;
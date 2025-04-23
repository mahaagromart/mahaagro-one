// components/ProfileInfo.js
import React from 'react';

const ProfileInfo = () => {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
            {/* Sidebar */}
            <div className="w-full lg:w-1/4 bg-white shadow-lg rounded-lg p-4 sm:p-6 mb-6 lg:mb-0 lg:mr-6">
                <h3 className="font-bold text-xl sm:text-2xl text-gray-800 mb-4 sm:mb-6">My Order</h3>
                <ul className="space-y-3 sm:space-y-4">
                    <li className="text-gray-700 hover:text-blue-500 cursor-pointer">Track Your Order</li>
                    <li className="text-gray-700 hover:text-blue-500 cursor-pointer">Wish List</li>
                    <li className="text-gray-700 hover:text-blue-500 cursor-pointer">Chat With Seller</li>
                    <li className="text-gray-700 hover:text-blue-500 cursor-pointer">Chat With Delivery-Man</li>
                    <li className="text-blue-500 font-semibold cursor-pointer">Profile Info</li>
                    <li className="text-gray-700 hover:text-blue-500 cursor-pointer">Address</li>
                    <li className="text-gray-700 hover:text-blue-500 cursor-pointer">Support Ticket</li>
                    <li className="text-gray-700 hover:text-blue-500 cursor-pointer">Coupons</li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="w-full lg:w-3/4 bg-white shadow-lg rounded-lg p-4 sm:p-6 md:p-8">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">Profile Info</h2>
                <div className="space-y-4 sm:space-y-6">
                    <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">First name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Kabya"
                        />
                    </div>

                    <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Last name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Chalise"
                        />
                    </div>

                    <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Phone number ( * Country code is must like for BD 880 )</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="9842111456"
                        />
                    </div>

                    <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="admin@gmail.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">New password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Minimum 8 characters long"
                        />
                    </div>

                    <div>
                        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">Confirm password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Minimum 8 characters long"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
                        <button className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300">
                            Delete account
                        </button>
                        <button className="bg-yellow-400 text-black px-6 py-2 rounded-lg hover:bg-yellow-500 transition duration-300">
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;
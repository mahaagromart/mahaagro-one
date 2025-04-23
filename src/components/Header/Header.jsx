"use client";
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import { BiMenuAltLeft } from "react-icons/bi";
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import BottomNavBar from './Bottommenu';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Topbar from '../Header/Topbar';
import Navbar from '../Header/Navbar';
import logo from '../../../public/assets/images/img/logo.webp';
import { makeRequest } from "@/api";
import { Button } from 'antd';
import { logout,login } from '@/store/authSlice';
import { useDispatch } from "react-redux";


const Header = () => {
    const [Categorydata, setCategoryData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0); // State for cart count
    const wishlistCount = useSelector((state) => state.wishlist.wishlistItems.length);
    var user = useSelector((state) => state.auth.isAuthenicated);

    const dispatch = useDispatch();
    // Fetch cart data
    const fetchCartData = async () => {
        const storedToken = localStorage.getItem("authToken");
        if (!storedToken) return;

        try {
            const response = await makeRequest(
                "POST",
                "/Cart/GetCartData",
                {},
                { headers: { Authorization: `Bearer ${storedToken}` } }
            );

            if (response && response[0]?.dataset?.$values) {
                const totalQuantity = response[0].dataset.$values.reduce(
                    (total, item) => total + (item.minimumOrderQuantity || 0),
                    0
                );
                setCartCount(totalQuantity);
            }
        } catch (error) {
            console.error("Error fetching cart data:", error);
        }
    };

    // Fetch categories
    const GetAllCategory = async () => {
        try {
            const storedToken = localStorage.getItem("authToken");
            const response = await makeRequest(
                "POST",
                "/Category/GetAllCategory",
                {},
                { headers: { Authorization: `Bearer ${storedToken}` } }
            );

            if (response.message === "SUCCESS" && response.retval === "SUCCESS") {
                setCategoryData(response.categoryList.$values);
            }
        } catch (error) {
            console.error("Unexpected error fetching categories:", error);
        }
    };

    useEffect(() => {
        GetAllCategory();
        fetchCartData(); // Fetch cart data on mount

        // Set up interval to periodically check cart count
<<<<<<< HEAD
        const interval = setInterval(fetchCartData, 5000); // Check every 5 seconds

        return () => clearInterval(interval); // Clean up interval on unmount
=======
       // const interval = setInterval(fetchCartData, 5000); // Check every 5 seconds

        // return () => clearInterval(interval); // Clean up interval on unmount
>>>>>>> dac8d2866b52c5da2b4c043b1feb4d147d44dd32
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div>
            {/* Topbar */}
            <Topbar />

            <header className="container max-w-screen-3xl mx-auto flex items-center justify-between sm:px-7 lg:px-8 px-4 py-3">
                {/* Left side: Logo */}
                <div className="flex items-center space-x-4">
                    <Image
                        src={logo}
                        alt="Logo"
                        width={200}
                        height={200}
                        className="h-auto w-[350px] sm:w-[350px] md:w-[200px] lg:w-[120px]"
                    />
                </div>

                <div className="categories-dropdown">
                    {/* Desktop View */}
                    <div className="desktop-view">
                        <button
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            className="dropdown-btn"
                        >
                            <BiMenuAltLeft size={20} />
                            <span className="dropdown-text   font-family: ">All Categories</span>
                            <FiChevronDown size={20} className="dropdown-arrow" />
                        </button>
                        <div className={`dropdown-menu ${isCategoryOpen ? "open" : ""}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                            <ul>
                                {Categorydata.map((category, index) => (
                                    <li key={index} className="dropdown-item">
                                        {category.image && (
                                            <Image
                                                src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${category.image}`}
                                                width={40}
                                                height={40}
                                                alt={category.category_Name}
                                                className="category-image"
                                            />
                                        )}
                                        <a href={`/Category?category_id=${category.category_id}`} className='bottom'>
                                            {category.category_Name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative lg:flex md:hidden items-center space-x-4 w-full lg:w-auto xl:w-auto">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search..."
                        className="px-6 py-2 rounded-full border border-gray-300 focus:outline-none font-poppins focus:ring-2 focus:ring-green-800 text-lg transition-all duration-300 ease-in-out w-full sm:w-[300px] md:w-[360px] lg:w-[500px] xl:w-[600px] lg:flex hidden lg:block"
                    />
                    <button className="absolute right-0 top-0 bottom-0 bg-yellow-400 font-poppins flex items-center text-black px-6 py-2 rounded-r-full rounded-l-lg text-lg font-semibold transition-all duration-300 ease-in-out hover:bg-yellow-500 focus:outline-none lg:flex hidden lg:block">
                        Search
                        <span className="ml-2">
                            <FiSearch />
                        </span>
                    </button>
                </div>

                <div className="flex items-center space-x-4 sm:space-x-6">
                    <div
                        className="relative"
                        onMouseEnter={() => setIsUserMenuOpen(true)}
                        onMouseLeave={() => setIsUserMenuOpen(false)}
                    >
                        <FaUser className="text-xl cursor-pointer hover:text-gray-700 transition" />
                        {isUserMenuOpen && (
<<<<<<< HEAD
                            <div className="absolute right-0 w-20 bg-white shadow-md rounded-md z-50">
=======
                           <div className="absolute left-1/2 transform -translate-x-1/2 bg-white shadow-md text-center rounded-md z-50">

>>>>>>> dac8d2866b52c5da2b4c043b1feb4d147d44dd32
                                {user ? (
                                    <Link href="/profile" className="block px-4 py-2 text-gray-700 font-bold rounded-lg hover:bg-gray-100">
                                        Profile
                                    </Link>
                                ) : (
                                    <Link href="/login" className="block px-4 py-2 text-gray-700 font-bold rounded-lg hover:bg-gray-100">
                                        Login
                                    </Link>
                                )}
                                {user ?
                                    (<Link href="/" className="block px-4 py-2 text-gray-700 font-bold rounded-lg hover:bg-gray-100"

                                        onClick={() => {

                                            dispatch(logout());
                                            //window.location.reload();
                                        }}

                                    >
                                        Logout
                                    </Link> 
                                    ) : (<Link href="/register" className="block px-4 py-2 text-gray-700 font-bold rounded-lg hover:bg-gray-100">
                                        Register
                                    </Link>)

                                }
                            </div>
                        )}
                    </div>

                    <Link href="./wishlist" className="text-xl cursor-pointer hover:text-gray-700 transition-all duration-300 ease-in-out relative">
                        <FaHeart className="text-xl cursor-pointer hover:text-gray-700 transition-all duration-300 ease-in-out relative" />
                        {wishlistCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-medium rounded-full w-4 h-4 mb-2 flex items-center justify-center">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>
                    <Link
                        href="./cart"
                        className="flex flex-col items-center relative text-gray-700 hover:text-gray-900 transition-colors duration-200"
                    >
                        <div className="relative">
                            <svg
                                className="w-5 h-5"
                                viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M15.32 2.405H4.887C3 2.405 2.46.805 2.46.805L2.257.21C2.208.085 2.083 0 1.946 0H.336C.1 0-.064.24.024.46l.644 1.945L3.11 9.767c.047.137.175.23.32.23h8.418l-.493 1.958H3.768l.002.003c-.017 0-.033-.003-.05-.003-1.06 0-1.92.86-1.92 1.92s.86 1.92 1.92 1.92c.99 0 1.805-.75 1.91-1.712l5.55.076c.12.922.91 1.636 1.867 1.636 1.04 0 1.885-.844 1.885-1.885 0-.866-.584-1.593-1.38-1.814l2.423-8.832c.12-.433-.206-.86-.655-.86"
                                    fill="currentColor"
                                />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-medium rounded-full w-4 h-4 mb-2 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </div>

                    </Link>
                </div>
            </header>

            {/* Divider for Mobile */}
            <div className="sm:hidden mt-1 border-t-2 border-gray-300 my-1"></div>

            {/* Navbar */}
            <Navbar />
            {/* Bottommenu */}
            <BottomNavBar />
        </div>
    );
};

export default Header;
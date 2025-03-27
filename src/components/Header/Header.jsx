"use client";
import Image from 'next/image';
import Link from 'next/link';
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import { BiMenuAltLeft } from "react-icons/bi";
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import BottomNavBar from './Bottommenu';
// import { FaCodeCompare } from "react-icons/fa6";
import { useState ,useEffect} from 'react';
import { useSelector } from 'react-redux';
import Topbar from '../Header/Topbar';
import Navbar from '../Header/Navbar';
import logo from '../../../public/assets/images/img/logo.webp';
import { makeRequest } from "@/api";



// Categories array with image paths fixed




const Header = () => {
    const [Categorydata,setCategoryData]=useState([]) //To store Catgegory List
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [isCategoryOpen, setIsCategoryOpen] = useState(false); // State for category dropdown visibility
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { cartItems, totalQuantity, totalPrice } = useSelector((state) => state.cart);
    const totalItems = cartItems.length;
    const wishlistCount = useSelector((state) => state.wishlist.wishlistItems.length);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };
    var user = useSelector((state) => state.auth.isAuthenicated);

    //fetching All Top Category

      const GetAllCategory = async () => {
    
    
        try {
          const storedToken = localStorage.getItem("authToken");
          const response = await makeRequest("POST", "/Category/GetAllCategory", {
          headers: { Authorization: `Bearer ${storedToken}` },
          });
    

        if(response.message=="SUCCESS" && response.retval=="SUCCESS"){
      
        setCategoryData(response.categoryList.$values)
    
    
        }
        
      } catch (error) {
          console.error("Unexpected error fetching categories:", error);
        
        }
      };
      
    
    
    useEffect(() => {

      
      GetAllCategory();
      
     
 
    
    
    }, []); 
    return (
        <div>
            {/* Topbar */}
            <Topbar />

            <header className="container max-w-screen-3xl mx-auto flex items-center justify-between sm:px-7  lg:px-8 px-4 py-3">
                {/* Left side: Logo */}
                <div className="flex items-center space-x-4">
                    <Image src={logo} alt="Logo" width={200} height={200} className="h-auto w-[350px] sm:w-[350px] md:w-[200px] lg:w-[120px]" />
                </div>

                <div className="categories-dropdown">
                    {/* Desktop View */}
                    <div className="desktop-view">
                        <button
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)} // Toggle the dropdown
                            className="dropdown-btn"
                        >
                            <BiMenuAltLeft size={20} /> {/* Icon added */}
                            <span className="dropdown-text">All Categories</span>
                            <FiChevronDown size={20} className="dropdown-arrow" /> {/* Down arrow added */}
                        </button>
                        <div className={`dropdown-menu ${isCategoryOpen ? "open" : ""}`}>
                            <ul>
                                {Categorydata.map((category, index) => (
                                    <li key={index} className="dropdown-item">
                                        {/* Conditionally render image only if category has an image */}
                          
                                        {category.image && (
                                            <Image src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${category.image}`} width={40} height={40} alt={category.category_Name} className="category-image" />
                                        )}
                                        <a href={`/Category?category_id=${category.category_id}`} className='bottom'>{category.category_Name}</a>
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
                        className="px-6 py-2 rounded-full border border-gray-300 focus:outline-none font-poppins focus:ring-2 focus:ring-green-800 text-lg transition-all duration-300 ease-in-out w-full sm:w-[300px] md:w-[360px] lg:w-[500px] xl:w-[600px] lg:flex hidden lg:block" // Change lg:block to lg:hidden and adjust other widths
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
                            <div className="absolute right-0 w-20 bg-white shadow-md rounded-md z-50">
                                
                            {user ?   (
                                //TODO add profile i ran out of time PAVAN BAGWE
                            <Link href="/profile" className="block px-4 py-2 text-gray-700 font-bold rounded-lg hover:bg-gray-100">
                                Profile
                            </Link>):(
                            <Link href="/login" className="block px-4 py-2 text-gray-700 font-bold rounded-lg hover:bg-gray-100">
                                Login
                            </Link>
                            )}

                                <Link href="/register" className="block px-4 py-2 text-gray-700 font-bold rounded-lg hover:bg-gray-100">
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* <FaCodeCompare className="text-xl cursor-pointer hover:text-gray-700 transition-all duration-300 ease-in-out" /> */}
                    <Link href="./wishlist" className="text-xl cursor-pointer hover:text-gray-700 transition-all duration-300 ease-in-out relative">
                        <FaHeart className="text-xl cursor-pointer hover:text-gray-700 transition-all duration-300 ease-in-out relative" />
                        {wishlistCount > 0 && (
                            <span className="absolute bottom-5 right-1 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                                {wishlistCount}
                            </span>
                        )}
                    </Link>
                    <Link href="./cart" className="text-xl cursor-pointer hover:text-gray-700 transition-all duration-300 ease-in-out relative">
                        <FaShoppingCart />
                        {/* Cart item count */}
                        {totalQuantity > 0 && (
                            <span className="absolute bottom-5 right-1 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                                {totalQuantity}
                            </span>
                        )}
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
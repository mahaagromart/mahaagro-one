"use client";
import Link from 'next/link';
import  Banner from "../../public/assets/images/banner/Shopnow.svg"
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from "../store/cartslice";
import { addToWishList } from "../store/wishlistSlice.js";
import ProductList from '../components/Home/Drone';
import productsData from '../data/productfour';
import { useRouter } from 'next/router';

const CategoryPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [cartItems, setCartItems] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState([]);
    const [sortBy, setSortBy] = useState('latest');
    const [products, setProducts] = useState(productsData);
    const itemsPerPage = 6;
    const router = useRouter();
    const dispatch = useDispatch();
 
    const handleWeightChange = (weight, productId) => {
        setProducts(products.map(product => {
            if (product.id === productId) {
                return {
                    ...product,
                    selectedWeight: weight
                };
            }
            return product;
        }));
    };

    const handleAddToCart = (product) => {
        const productToAdd = {
            ...product,
            selectedWeight: product.selectedWeight.label,
            selectedPrice: product.selectedWeight.discountedPrice,
            selectedOriginalPrice: product.selectedWeight.originalPrice,
            selectedDiscountedPrice: product.selectedWeight.discountedPrice,
        };
        setCartItems([...cartItems, productToAdd]);
        dispatch(addToCart(productToAdd));
        console.log("Added to Cart:", productToAdd); // Optional: for debugging
    };

    const handleAddToWishList = (product) => {
        setWishlist([...wishlist, product]);
        dispatch(addToWishList(product));
        console.log("Added to Wish List:", product); // Optional: for debugging
    };

    const filteredProducts = Array.isArray(products) ? products.filter((product) => {
        const discountedPrice = product.price?.discounted ?? 0;
        const priceMatch = discountedPrice >= Number(priceRange[0]) && discountedPrice <= Number(priceRange[1]);
        const categoryMatch = selectedCategories.length ? selectedCategories.includes(product.category) : true;
        const statusMatch = selectedStatus.length ? selectedStatus.includes(product.status) : true;
        return priceMatch && categoryMatch && statusMatch;
    }) : [];

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'latest':
                return b.id - a.id;
            case 'price':
                return (a.price?.discounted ?? 0) - (b.price?.discounted ?? 0);
            case 'popularity':
                return b.popularity - a.popularity;
            default:
                return 0;
        }
    });
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(sortedProducts.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategories((prev) =>
            e.target.checked ? [...prev, category] : prev.filter((item) => item !== category)
        );
    };

    const handleStatusChange = (e) => {
        const status = e.target.value;
        setSelectedStatus((prev) =>
            e.target.checked ? [...prev, status] : prev.filter((item) => item !== status)
        );
    };

    useEffect(() => {
        // Load cart data from localStorage if available
        const storedCart = localStorage.getItem("products");
        if (storedCart) {
            const parsedCart = JSON.parse(storedCart);
            // Dispatch to Redux to sync the cart
            dispatch(addToCart(parsedCart));
            setCartItems(parsedCart); // Set the local state as well
        }
    }, [dispatch]); // Only run once when component mounts

    return (
        <>
            <div className="bg-white text-gray-800 min-h-screen flex flex-col">
                <div className="flex-1 container mx-auto py-18 px-4">
                    <div className="text-black text-2xl font-semibold mb-3">Category</div>
                    {/* <div className="border-b-2 border-gray-500 mb-1"></div>
                    <div className="flex items-center mb-4 space-x-3">
                        <Link href="/" className="text-black text-lg hover:text-green-300 transition-colors">Home</Link>
                        <span className="text-black">/</span>
                        <Link href="/seed" className="text-black text-lg hover:text-green-300 transition-colors">Seed</Link>
                    </div>
                    <div className="border-b-2 border-gray-500 mb-1"></div> */}

                   {/* Banner Section with Background Image */}
                   <div
                        className="w-full h-auto md:h-48 text-white rounded-lg shadow-md flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left p-6 md:p-8 mb-8"
                        style={{
                            backgroundImage: `url(${Banner.src})`, // Use the imported image
                            backgroundSize: 'cover',
                            height:'294px',
                        }}
                    >
                        {/* <div className="max-w-lg">
                            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Shop Now</h2>
                            <p className="text-sm md:text-base mb-4 md:mb-6">Don't miss out on our latest arrivals. Explore the collection today!</p>
                        </div>
                        <button className="px-6 py-3 bg-green-300 text-black font-semibold rounded-full hover:bg-green-400 transition-colors">
                            Shop Now
                        </button> */}
                    </div>

                    {/* Product Options Below the Banner */}
                    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 mb-6">
                        {/* Filter Section */}
                        <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md border border-gray-300">
                            <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
                                <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
                                </svg>
                                Filters
                            </h3>

                            {/* Price Filter */}
                            <div className="mb-8">
                                <h4 className="font-semibold mb-4 text-gray-700 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                    Price Range
                                </h4>
                                <input
                                    type="range"
                                    min="0"
                                    max="500"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
                                    className="w-full text-green-500"
                                />
                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <span>₹{priceRange[0]}</span>
                                    <span>₹{priceRange[1]}</span>
                                </div>
                            </div>
                            {/* Product Categories */}
                            <div className="mb-8">
                                <h4 className="font-semibold mb-4 text-gray-700 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
                                    </svg>
                                    Product Categories
                                </h4>
                                <div className="space-y-3">
                                    {/* Seeds Category */}
                                    <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                                        <div>
                                            <label
                                                className="for-hover-lable cursor-pointer"
                                                onClick={() => {
                                                    window.location.href = "https://mahaagromart.com/products?id=173&data_from=category&page=1";
                                                }}
                                            >
                                                Seeds
                                            </label>
                                        </div>
                                        <div
                                            className="px-2 cursor-pointer"
                                            onClick={(e) => {
                                                const collapseElement = document.getElementById("collapse-seeds");
                                                const toggleButton = e.currentTarget.querySelector(".pull-right");
                                                collapseElement.classList.toggle("hidden");
                                                toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
                                            }}
                                        >
                                            <strong className="pull-right for-brand-hover">+</strong>
                                        </div>
                                    </div>
                                    <div id="collapse-seeds" className="hidden pl-4 mt-2">
                                        <ul className="space-y-2">
                                            <li className="text-gray-600 hover:text-green-500 cursor-pointer">Vegetable Seeds</li>
                                            <li className="text-gray-600 hover:text-green-500 cursor-pointer">Fruit Seeds</li>
                                            <li className="text-gray-600 hover:text-green-500 cursor-pointer">Flower Seeds</li>
                                        </ul>
                                    </div>

                                    {/* Fertilizers Category */}
                                    <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                                        <div>
                                            <label
                                                className="for-hover-lable cursor-pointer"
                                                onClick={() => {
                                                    window.location.href = "https://mahaagromart.com/products?id=174&data_from=category&page=1";
                                                }}
                                            >
                                                Fertilizers
                                            </label>
                                        </div>
                                        <div
                                            className="px-2 cursor-pointer"
                                            onClick={(e) => {
                                                const collapseElement = document.getElementById("collapse-fertilizers");
                                                const toggleButton = e.currentTarget.querySelector(".pull-right");
                                                collapseElement.classList.toggle("hidden");
                                                toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
                                            }}
                                        >
                                            <strong className="pull-right for-brand-hover">+</strong>
                                        </div>
                                    </div>
                                    <div id="collapse-fertilizers" className="hidden pl-4 mt-2">
                                        <ul className="space-y-2">
                                            <li className="text-gray-600 hover:text-green-500 cursor-pointer">Organic Fertilizers</li>
                                            <li className="text-gray-600 hover:text-green-500 cursor-pointer">Chemical Fertilizers</li>
                                            <li className="text-gray-600 hover:text-green-500 cursor-pointer">Liquid Fertilizers</li>
                                        </ul>
                                    </div>

                                    {/* Agricultural Machineries Category */}
                                    <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                                        <div>
                                            <label
                                                className="for-hover-lable cursor-pointer"
                                                onClick={() => {
                                                    window.location.href = "https://mahaagromart.com/products?id=175&data_from=category&page=1";
                                                }}
                                            >
                                                Agricultural Machineries
                                            </label>
                                        </div>
                                        <div
                                            className="px-2 cursor-pointer"
                                            onClick={(e) => {
                                                const collapseElement = document.getElementById("collapse-machineries");
                                                const toggleButton = e.currentTarget.querySelector(".pull-right");
                                                collapseElement.classList.toggle("hidden");
                                                toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
                                            }}
                                        >
                                            <strong className="pull-right for-brand-hover">+</strong>
                                        </div>
                                    </div>
                                    <div id="collapse-machineries" className="hidden pl-4 mt-2">
                                        <ul className="space-y-2">
                                            <li className="text-gray-600 hover:text-green-500 cursor-pointer">Tractors</li>
                                            <li className="text-gray-600 hover:text-green-500 cursor-pointer">Harvesters</li>
                                            <li className="text-gray-600 hover:text-green-500 cursor-pointer">Plows</li>
                                        </ul>
                                    </div>

                                    {/* Drone Services Category */}
                                    <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                                        <div>
                                            <label
                                                className="for-hover-lable cursor-pointer"
                                                onClick={() => {
                                                    window.location.href = "https://mahaagromart.com/products?id=176&data_from=category&page=1";
                                                }}
                                            >
                                                Drone Services
                                            </label>
                                        </div>
                                        <div
                                            className="px-2 cursor-pointer"
                                            onClick={(e) => {
                                                const collapseElement = document.getElementById("collapse-drone-services");
                                                const toggleButton = e.currentTarget.querySelector(".pull-right");
                                                collapseElement.classList.toggle("hidden");
                                                toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
                                            }}
                                        >
                                            <strong className="pull-right for-brand-hover">+</strong>
                                        </div>
                                    </div>
                                    <div id="collapse-drone-services" className="hidden pl-4 mt-2">
                                        <ul className="space-y-2">
                                            <li className="text-gray-600 hover:text-green-500 cursor-pointer">Crop Monitoring</li>
                                            <li className="text-gray-600 hover:text-green-500 cursor-pointer">Spraying Services</li>
                                            <li className="text-gray-600 hover:text-green-500 cursor-pointer">Mapping Services</li>
                                        </ul>
                                    </div>

                                    {/* Add more categories similarly */}
                                    {/* Example for Animal Feed */}
                                    <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                                        <div>
                                            <label
                                                className="for-hover-lable cursor-pointer"
                                                onClick={() => {
                                                    window.location.href = "https://mahaagromart.com/products?id=177&data_from=category&page=1";
                                                }}
                                            >
                                                Animal Feed
                                            </label>
                                        </div>
                                        <div
                                            className="px-2 cursor-pointer"
                                            onClick={(e) => {
                                                const collapseElement = document.getElementById("collapse-animal-feed");
                                                const toggleButton = e.currentTarget.querySelector(".pull-right");
                                                collapseElement.classList.toggle("hidden");
                                                toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
                                            }}
                                        >
                                            <strong className="pull-right for-brand-hover">+</strong>
                                        </div>
                                    </div>
                                    <div id="collapse-animal-feed" className="hidden pl-4 mt-2">
                                        <ul className="space-y-2">
                                            <li className="text-gray-600 hover:text-green-500 cursor-pointer">Cattle Feed</li>
                                            <li className="text-gray-600 hover:text-green-500 cursor-pointer">Poultry Feed</li>
                                            <li className="text-gray-600 hover:text-green-500 cursor-pointer">Fish Feed</li>
                                        </ul>
                                    </div>

                                    {/* Repeat the above structure for other categories */}
                                    <div className="space-y-2">

                                        {/* Food Category */}
                                        <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                                            <div>
                                                <label
                                                    className="for-hover-lable cursor-pointer"
                                                    onClick={() => {
                                                        window.location.href = "https://mahaagromart.com/products?id=174&data_from=category&page=1";
                                                    }}
                                                >
                                                    Food
                                                </label>
                                            </div>
                                            <div
                                                className="px-2 cursor-pointer"
                                                onClick={(e) => {
                                                    const collapseElement = document.getElementById("collapse-food");
                                                    const toggleButton = e.currentTarget.querySelector(".pull-right");
                                                    collapseElement.classList.toggle("hidden");
                                                    toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
                                                }}
                                            >
                                                <strong className="pull-right for-brand-hover">+</strong>
                                            </div>
                                        </div>
                                        <div id="collapse-food" className="hidden pl-4 mt-2">
                                            <ul className="space-y-2">
                                                <li className="text-gray-600 hover:text-green-500 cursor-pointer">Organic Food</li>
                                                <li className="text-gray-600 hover:text-green-500 cursor-pointer">Snacks</li>
                                                <li className="text-gray-600 hover:text-green-500 cursor-pointer">Grains</li>
                                            </ul>
                                        </div>

                                        {/* Garden Category */}
                                        <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                                            <div>
                                                <label
                                                    className="for-hover-lable cursor-pointer"
                                                    onClick={() => {
                                                        window.location.href = "https://mahaagromart.com/products?id=175&data_from=category&page=1";
                                                    }}
                                                >
                                                    Garden
                                                </label>
                                            </div>
                                            <div
                                                className="px-2 cursor-pointer"
                                                onClick={(e) => {
                                                    const collapseElement = document.getElementById("collapse-garden");
                                                    const toggleButton = e.currentTarget.querySelector(".pull-right");
                                                    collapseElement.classList.toggle("hidden");
                                                    toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
                                                }}
                                            >
                                                <strong className="pull-right for-brand-hover">+</strong>
                                            </div>
                                        </div>
                                        <div id="collapse-garden" className="hidden pl-4 mt-2">
                                            <ul className="space-y-2">
                                                <li className="text-gray-600 hover:text-green-500 cursor-pointer">Gardening Tools</li>
                                                <li className="text-gray-600 hover:text-green-500 cursor-pointer">Pots & Planters</li>
                                                <li className="text-gray-600 hover:text-green-500 cursor-pointer">Soil & Fertilizers</li>
                                            </ul>
                                        </div>

                                        {/* Add more categories similarly */}
                                        {/* Noga, Combopacks, Millets, Service, Herb, Art and Craft, Packing Material, Plasticulture, Other, Fruit Vegetable */}

                                        {/* Example for Noga Category */}
                                        <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                                            <div>
                                                <label
                                                    className="for-hover-lable cursor-pointer"
                                                    onClick={() => {
                                                        window.location.href = "https://mahaagromart.com/products?id=176&data_from=category&page=1";
                                                    }}
                                                >
                                                    Noga
                                                </label>
                                            </div>
                                            <div
                                                className="px-2 cursor-pointer"
                                                onClick={(e) => {
                                                    const collapseElement = document.getElementById("collapse-noga");
                                                    const toggleButton = e.currentTarget.querySelector(".pull-right");
                                                    collapseElement.classList.toggle("hidden");
                                                    toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
                                                }}
                                            >
                                                <strong className="pull-right for-brand-hover">+</strong>
                                            </div>
                                        </div>
                                        <div id="collapse-noga" className="hidden pl-4 mt-2">
                                            <ul className="space-y-2">
                                                <li className="text-gray-600 hover:text-green-500 cursor-pointer">Noga Products 1</li>
                                                <li className="text-gray-600 hover:text-green-500 cursor-pointer">Noga Products 2</li>
                                                <li className="text-gray-600 hover:text-green-500 cursor-pointer">Noga Products 3</li>
                                            </ul>
                                        </div>

                                        {/* Continue adding more categories as needed... */}
                                        <div className="space-y-2">


                                            {/* Combo Pack Category */}
                                            <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                                                <div>
                                                    <label
                                                        className="for-hover-lable cursor-pointer"
                                                        onClick={() => {
                                                            window.location.href = "https://mahaagromart.com/products?id=174&data_from=category&page=1";
                                                        }}
                                                    >
                                                        Combo Pack
                                                    </label>
                                                </div>
                                                <div
                                                    className="px-2 cursor-pointer"
                                                    onClick={(e) => {
                                                        const collapseElement = document.getElementById("collapse-combo-pack");
                                                        const toggleButton = e.currentTarget.querySelector(".pull-right");
                                                        collapseElement.classList.toggle("hidden");
                                                        toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
                                                    }}
                                                >
                                                    <strong className="pull-right for-brand-hover">+</strong>
                                                </div>
                                            </div>
                                            <div id="collapse-combo-pack" className="hidden pl-4 mt-2">
                                                <ul className="space-y-2">
                                                    <li className="text-gray-600 hover:text-green-500 cursor-pointer">Seed Combos</li>
                                                    <li className="text-gray-600 hover:text-green-500 cursor-pointer">Gardening Kits</li>
                                                    <li className="text-gray-600 hover:text-green-500 cursor-pointer">Organic Food Packs</li>
                                                </ul>
                                            </div>

                                            {/* Millets Category */}
                                            <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                                                <div>
                                                    <label
                                                        className="for-hover-lable cursor-pointer"
                                                        onClick={() => {
                                                            window.location.href = "https://mahaagromart.com/products?id=175&data_from=category&page=1";
                                                        }}
                                                    >
                                                        Millets
                                                    </label>
                                                </div>
                                                <div
                                                    className="px-2 cursor-pointer"
                                                    onClick={(e) => {
                                                        const collapseElement = document.getElementById("collapse-millets");
                                                        const toggleButton = e.currentTarget.querySelector(".pull-right");
                                                        collapseElement.classList.toggle("hidden");
                                                        toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
                                                    }}
                                                >
                                                    <strong className="pull-right for-brand-hover">+</strong>
                                                </div>
                                            </div>
                                            <div id="collapse-millets" className="hidden pl-4 mt-2">
                                                <ul className="space-y-2">
                                                    <li className="text-gray-600 hover:text-green-500 cursor-pointer">Foxtail Millet</li>
                                                    <li className="text-gray-600 hover:text-green-500 cursor-pointer">Pearl Millet</li>
                                                    <li className="text-gray-600 hover:text-green-500 cursor-pointer">Finger Millet</li>
                                                </ul>
                                            </div>

                                            {/* Service Category */}
                                            <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                                                <div>
                                                    <label
                                                        className="for-hover-lable cursor-pointer"
                                                        onClick={() => {
                                                            window.location.href = "https://mahaagromart.com/products?id=176&data_from=category&page=1";
                                                        }}
                                                    >
                                                        Service
                                                    </label>
                                                </div>
                                                <div
                                                    className="px-2 cursor-pointer"
                                                    onClick={(e) => {
                                                        const collapseElement = document.getElementById("collapse-service");
                                                        const toggleButton = e.currentTarget.querySelector(".pull-right");
                                                        collapseElement.classList.toggle("hidden");
                                                        toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
                                                    }}
                                                >
                                                    <strong className="pull-right for-brand-hover">+</strong>
                                                </div>
                                            </div>
                                            <div id="collapse-service" className="hidden pl-4 mt-2">
                                                <ul className="space-y-2">
                                                    <li className="text-gray-600 hover:text-green-500 cursor-pointer">Soil Testing</li>
                                                    <li className="text-gray-600 hover:text-green-500 cursor-pointer">Farm Consultancy</li>
                                                    <li className="text-gray-600 hover:text-green-500 cursor-pointer">Irrigation Solutions</li>
                                                </ul>
                                            </div>

                                            {/* Agriculture Category */}
                                            <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                                                <div>
                                                    <label
                                                        className="for-hover-lable cursor-pointer"
                                                        onClick={() => {
                                                            window.location.href = "https://mahaagromart.com/products?id=177&data_from=category&page=1";
                                                        }}
                                                    >
                                                        Agriculture
                                                    </label>
                                                </div>
                                                <div
                                                    className="px-2 cursor-pointer"
                                                    onClick={(e) => {
                                                        const collapseElement = document.getElementById("collapse-agriculture");
                                                        const toggleButton = e.currentTarget.querySelector(".pull-right");
                                                        collapseElement.classList.toggle("hidden");
                                                        toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
                                                    }}
                                                >
                                                    <strong className="pull-right for-brand-hover">+</strong>
                                                </div>
                                            </div>
                                            <div id="collapse-agriculture" className="hidden pl-4 mt-2">
                                                <ul className="space-y-2">
                                                    <li className="text-gray-600 hover:text-green-500 cursor-pointer">Farming Equipment</li>
                                                    <li className="text-gray-600 hover:text-green-500 cursor-pointer">Crop Protection</li>
                                                    <li className="text-gray-600 hover:text-green-500 cursor-pointer">Fertilizers</li>
                                                </ul>
                                            </div>

                                            {/* Arts & Craft Category */}
                                            <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                                                <div>
                                                    <label
                                                        className="for-hover-lable cursor-pointer"
                                                        onClick={() => {
                                                            window.location.href = "https://mahaagromart.com/products?id=178&data_from=category&page=1";
                                                        }}
                                                    >
                                                        Arts & Craft
                                                    </label>
                                                </div>
                                                <div
                                                    className="px-2 cursor-pointer"
                                                    onClick={(e) => {
                                                        const collapseElement = document.getElementById("collapse-arts-craft");
                                                        const toggleButton = e.currentTarget.querySelector(".pull-right");
                                                        collapseElement.classList.toggle("hidden");
                                                        toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
                                                    }}
                                                >
                                                    <strong className="pull-right for-brand-hover">+</strong>
                                                </div>
                                            </div>
                                            <div id="collapse-arts-craft" className="hidden pl-4 mt-2">
                                                <ul className="space-y-2">
                                                    <li className="text-gray-600 hover:text-green-500 cursor-pointer">Handmade Crafts</li>
                                                    <li className="text-gray-600 hover:text-green-500 cursor-pointer">Painting Supplies</li>
                                                    <li className="text-gray-600 hover:text-green-500 cursor-pointer">DIY Kits</li>
                                                </ul>
                                            </div>

                                            {/* Packing Materials Category */}
                                            <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                                                <div>
                                                    <label
                                                        className="for-hover-lable cursor-pointer"
                                                        onClick={() => {
                                                            window.location.href = "https://mahaagromart.com/products?id=179&data_from=category&page=1";
                                                        }}
                                                    >
                                                        Packing Materials
                                                    </label>
                                                </div>
                                                <div
                                                    className="px-2 cursor-pointer"
                                                    onClick={(e) => {
                                                        const collapseElement = document.getElementById("collapse-packing-materials");
                                                        const toggleButton = e.currentTarget.querySelector(".pull-right");
                                                        collapseElement.classList.toggle("hidden");
                                                        toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
                                                    }}
                                                >
                                                    <strong className="pull-right for-brand-hover">+</strong>
                                                </div>
                                            </div>
                                            <div id="collapse-packing-materials" className="hidden pl-4 mt-2">
                                                <ul className="space-y-2">
                                                    <li className="text-gray-600 hover:text-green-500 cursor-pointer">Boxes</li>
                                                    <li className="text-gray-600 hover:text-green-500 cursor-pointer">Bubble Wrap</li>
                                                    <li className="text-gray-600 hover:text-green-500 cursor-pointer">Tapes</li>
                                                </ul>
                                            </div>
                                            <div className="space-y-2">


                                                {/* Plasticulture Category */}
                                                <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                                                    <div>
                                                        <label
                                                            className="for-hover-lable cursor-pointer"
                                                            onClick={() => {
                                                                window.location.href = "https://mahaagromart.com/products?id=180&data_from=category&page=1";
                                                            }}
                                                        >
                                                            Plasticulture
                                                        </label>
                                                    </div>
                                                    <div
                                                        className="px-2 cursor-pointer"
                                                        onClick={(e) => {
                                                            const collapseElement = document.getElementById("collapse-plasticulture");
                                                            const toggleButton = e.currentTarget.querySelector(".pull-right");
                                                            collapseElement.classList.toggle("hidden");
                                                            toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
                                                        }}
                                                    >
                                                        <strong className="pull-right for-brand-hover">+</strong>
                                                    </div>
                                                </div>
                                                <div id="collapse-plasticulture" className="hidden pl-4 mt-2">
                                                    <ul className="space-y-2">
                                                        <li className="text-gray-600 hover:text-green-500 cursor-pointer">Mulching Films</li>
                                                        <li className="text-gray-600 hover:text-green-500 cursor-pointer">Drip Irrigation</li>
                                                        <li className="text-gray-600 hover:text-green-500 cursor-pointer">Greenhouse Films</li>
                                                    </ul>
                                                </div>

                                                {/* Fruits Category */}
                                                <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                                                    <div>
                                                        <label
                                                            className="for-hover-lable cursor-pointer"
                                                            onClick={() => {
                                                                window.location.href = "https://mahaagromart.com/products?id=181&data_from=category&page=1";
                                                            }}
                                                        >
                                                            Fruits
                                                        </label>
                                                    </div>
                                                    <div
                                                        className="px-2 cursor-pointer"
                                                        onClick={(e) => {
                                                            const collapseElement = document.getElementById("collapse-fruits");
                                                            const toggleButton = e.currentTarget.querySelector(".pull-right");
                                                            collapseElement.classList.toggle("hidden");
                                                            toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
                                                        }}
                                                    >
                                                        <strong className="pull-right for-brand-hover">+</strong>
                                                    </div>
                                                </div>
                                                <div id="collapse-fruits" className="hidden pl-4 mt-2">
                                                    <ul className="space-y-2">
                                                        <li className="text-gray-600 hover:text-green-500 cursor-pointer">Fresh Fruits</li>
                                                        <li className="text-gray-600 hover:text-green-500 cursor-pointer">Dried Fruits</li>
                                                        <li className="text-gray-600 hover:text-green-500 cursor-pointer">Exotic Fruits</li>
                                                    </ul>
                                                </div>

                                                {/* Other Category */}
                                                <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                                                    <div>
                                                        <label
                                                            className="for-hover-lable cursor-pointer"
                                                            onClick={() => {
                                                                window.location.href = "https://mahaagromart.com/products?id=182&data_from=category&page=1";
                                                            }}
                                                        >
                                                            Other
                                                        </label>
                                                    </div>
                                                    <div
                                                        className="px-2 cursor-pointer"
                                                        onClick={(e) => {
                                                            const collapseElement = document.getElementById("collapse-other");
                                                            const toggleButton = e.currentTarget.querySelector(".pull-right");
                                                            collapseElement.classList.toggle("hidden");
                                                            toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
                                                        }}
                                                    >
                                                        <strong className="pull-right for-brand-hover">+</strong>
                                                    </div>
                                                </div>
                                                <div id="collapse-other" className="hidden pl-4 mt-2">
                                                    <ul className="space-y-2">
                                                        <li className="text-gray-600 hover:text-green-500 cursor-pointer">Miscellaneous Items</li>
                                                        <li className="text-gray-600 hover:text-green-500 cursor-pointer">Seasonal Products</li>
                                                        <li className="text-gray-600 hover:text-green-500 cursor-pointer">Special Offers</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Product Status */}
                            <div className="mb-8">
                                <h4 className="font-semibold mb-4 text-gray-700 flex items-center">
                                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    Product Status
                                </h4>
                                <ul className="space-y-3">
                                    <li className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="In Stock"
                                            onChange={handleStatusChange}
                                            id="status1"
                                            className="form-checkbox h-5 w-5 text-green-500 rounded"
                                        />
                                        <label htmlFor="status1" className="ml-3 text-gray-600">In Stock</label>
                                    </li>
                                    <li className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="Out of Stock"
                                            onChange={handleStatusChange}
                                            id="status2"
                                            className="form-checkbox h-5 w-5 text-green-500 rounded"
                                        />
                                        <label htmlFor="status2" className="ml-3 text-gray-600">Out of Stock</label>
                                    </li>
                                    <li className="flex items-center">
                                        <input
                                            type="checkbox"
                                            value="Coming Soon"
                                            onChange={handleStatusChange}
                                            id="status3"
                                            className="form-checkbox h-5 w-5 text-green-500 rounded"
                                        />
                                        <label htmlFor="status3" className="ml-3 text-gray-600">Coming Soon</label>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Product Listing Section */}
                        <div className="w-full md:w-2/3">
                            <div className="flex justify-between items-center mb-6">
                                <div className="text-sm text-gray-600">
                                    Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedProducts.length)} of {sortedProducts.length} results
                                </div>

                                <div className="flex items-center space-x-4">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="bg-white text-gray-700 p-2 rounded-md border border-gray-300"
                                    >
                                        <option value="latest">Sort by Latest</option>
                                        <option value="price">Sort by Price</option>
                                        <option value="popularity">Sort by Popularity</option>
                                    </select>
                                </div>
                            </div>

                            {/* Product List */}
                            <div className=" sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                                {currentItems.length > 0 ? (
                                    <ProductList
                                        products={currentItems}
                                        handleAddToCart={handleAddToCart}
                                        handleAddToWishList={handleAddToWishList}
                                        handleWeightChange={handleWeightChange}
                                    />
                                ) : (
                                    <div className="text-center col-span-3 text-gray-500">No products found</div>
                                )}
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center items-center mt-6 space-x-4">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50"
                                >
                                    &lt; Prev
                                </button>

                                <div className="flex space-x-2">
                                    {Array.from({ length: Math.ceil(sortedProducts.length / itemsPerPage) }, (_, index) => (
                                        <button
                                            key={index + 1}
                                            onClick={() => setCurrentPage(index + 1)}
                                            className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-green-300 text-black' : 'bg-white text-gray-600 hover:bg-green-200'} transition-colors`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === Math.ceil(sortedProducts.length / itemsPerPage)}
                                    className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50"
                                >
                                    Next &gt;
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryPage;    




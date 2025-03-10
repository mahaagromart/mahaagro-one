"use client";
import Image from "next/image";
import { useState, useRef } from 'react';
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartslice";
import Foodb from "../../../public/assets/images/foodproduct/food-1 (2).webp";
import Foodc from "../../../public/assets/images/foodproduct/food-1 (3).webp";
import Foodd from "../../../public/assets/images/foodproduct/food-1 (4).webp";
import Foode from "../../../public/assets/images/foodproduct/food-1 (5).webp";
import Foodf from "../../../public/assets/images/foodproduct/food-1 (6).webp";
import { FaHeart, FaArrowRight, FaArrowLeft } from 'react-icons/fa'; // Import heart and arrow icons
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
    const [cart, setCart] = useState([]);
    const dispatch = useDispatch();

    const [products, setProducts] = useState([
        {
            id: 1,
            category: 'Food',
            name: 'Kanda Lasun..',
            image: Foodb,
            price: {
                original: 8,
                discounted: 3,
            },
            discount: 77,
            rating: 5,
            reviews: 500,
            weights: [
                { label: '350g', originalPrice: 8, discountedPrice: 3 },
                { label: '500g', originalPrice: 10, discountedPrice: 4 },
                { label: '1kg', originalPrice: 15, discountedPrice: 7 },
            ],
            selectedWeight: { label: '350g', originalPrice: 8, discountedPrice: 3 }
        },
        {
            id: 2,
            category: 'Food',
            name: 'Kanda Lasun..',
            image: Foodb,
            price: {
                original: 8,
                discounted: 3,
            },
            discount: 77,
            rating: 5,
            reviews: 500,
            weights: [
                { label: '350g', originalPrice: 8, discountedPrice: 3 },
                { label: '500g', originalPrice: 10, discountedPrice: 4 },
                { label: '1kg', originalPrice: 15, discountedPrice: 7 },
            ],
            selectedWeight: { label: '350g', originalPrice: 8, discountedPrice: 3 }
        },
        {
            id: 3,
            category: 'Food',
            name: 'Chiwda Masala',
            image: Foodc,
            price: {
                original: 8,
                discounted: 3,
            },
            discount: 77,
            rating: 5,
            reviews: 500,
            weights: [
                { label: '350g', originalPrice: 8, discountedPrice: 3 },
                { label: '500g', originalPrice: 10, discountedPrice: 4 },
                { label: '1kg', originalPrice: 15, discountedPrice: 7 },
            ],
            selectedWeight: { label: '350g', originalPrice: 8, discountedPrice: 3 }
        },
        {
            id: 4,
            category: 'Food',
            name: 'Papad Masala',
            image: Foodd,
            price: {
                original: 8,
                discounted: 3,
            },
            discount: 77,
            rating: 5,
            reviews: 500,
            weights: [
                { label: '350g', originalPrice: 8, discountedPrice: 3 },
                { label: '500g', originalPrice: 10, discountedPrice: 4 },
                { label: '1kg', originalPrice: 15, discountedPrice: 7 },
            ],
            selectedWeight: { label: '350g', originalPrice: 8, discountedPrice: 3 }
        },
        {
            id: 5,
            category: 'Food',
            name: 'Garam Masala',
            image: Foode,
            price: {
                original: 8,
                discounted: 3,
            },
            discount: 77,
            rating: 5,
            reviews: 500,
            weights: [
                { label: '350g', originalPrice: 8, discountedPrice: 3 },
                { label: '500g', originalPrice: 10, discountedPrice: 4 },
                { label: '1kg', originalPrice: 15, discountedPrice: 7 },
            ],
            selectedWeight: { label: '350g', originalPrice: 8, discountedPrice: 3 }
        },
        {
            id: 6,
            category: 'Food',
            name: 'Chiliiy Powder',
            image: Foodf,
            price: {
                original: 8,
                discounted: 3,
            },
            discount: 77,
            rating: 5,
            reviews: 500,
            weights: [
                { label: '350g', originalPrice: 8, discountedPrice: 3 },
                { label: '500g', originalPrice: 10, discountedPrice: 4 },
                { label: '1kg', originalPrice: 15, discountedPrice: 7 },
            ],
            selectedWeight: { label: '350g', originalPrice: 8, discountedPrice: 3 }
        },
        // Add more products if necessary...
    ]);

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
        setCart([...cart, productToAdd]);
        dispatch(addToCart(productToAdd));
        console.log("Added to Cart:", productToAdd); // Optional: for debugging
    };

    const renderStars = (rating) => {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += i < rating ? '★' : '☆'; // Full stars for rating, empty stars for the rest
        }
        return stars;
    };

    const productContainerRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const startDragging = (e) => {
        isDragging.current = true;
        startX.current = e.pageX - productContainerRef.current.offsetLeft;
        scrollLeft.current = productContainerRef.current.scrollLeft;
    };

    const stopDragging = () => {
        isDragging.current = false;
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - productContainerRef.current.offsetLeft;
        const walk = (x - startX.current) * 2; // Adjust the scroll speed
        productContainerRef.current.scrollLeft = scrollLeft.current - walk;
    };

    return (
        <div className="container mx-auto p-4 font-poppins">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Food Product</h1>
                <a href="#" className="flex items-center text-green-700 hover:text-green-900">
                    View All <FaArrowRight className="ml-2" />
                </a>
            </div>
            <div className="relative">
                <button
                    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-lg z-10 opacity-60"
                    onClick={() => productContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' })}
                >
                    <FaArrowLeft />
                </button>
                <div
                    className="flex overflow-x-auto scrollbar-hide"
                    ref={productContainerRef}
                    onMouseDown={startDragging}
                    onMouseUp={stopDragging}
                    onMouseLeave={stopDragging}
                    onMouseMove={handleMouseMove}
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex-none w-64 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-200 rounded-lg overflow-hidden relative mr-4"
                        >
                            <div className="absolute top-0 left-0 bg-gray-200 text-xs font-semibold text-gray-700 p-4">
                                {product.category}
                            </div>
                            <div className="flex items-center justify-between p-4">
                                <FaHeart className="text-red-500 ml-auto text-xl" />
                            </div>
                            <div className="p-4">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    className="w-[200px] h-[200px] p-4  transition-transform duration-500 transform group-hover:scale-105"
                                />
                                <div className="mt-3">
                                    <div className="flex gap-2 mt-2">
                                        {product.weights.map((weight) => (
                                            <button
                                                key={weight.label}
                                                onClick={() => handleWeightChange(weight, product.id)}
                                                className={`px-3 py-1 rounded-full border text-xs ${product.selectedWeight.label === weight.label
                                                    ? 'bg-green-700 text-white'
                                                    : 'bg-green-200'
                                                    }`}
                                            >
                                                {weight.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-sm font-bold text-green-700">₹{product.selectedWeight.discountedPrice}</span>
                                        <span className="text-xs text-gray-500 line-through">₹{product.selectedWeight.originalPrice}</span>
                                    </div>
                                    <h2 className="text-sm font-semibold text-gray-800">
                                        {product.name}
                                        {product.discount > 0 && (
                                            <span className="bg-red-600 text-white text-xs font-bold ml-2 px-1 rounded">
                                                {product.discount}% OFF
                                            </span>
                                        )}
                                    </h2>
                                    <div className="text-xs text-gray-500 mt-1">({product.reviews} reviews)</div>
                                </div>
                                <div className="flex items-center mt-2">
                                    <span className="text-yellow-500 text-xs">{renderStars(product.rating)}</span>
                                </div>
                                <div className="mt-3">
                                    <button
                                        onClick={() => handleAddToCart(product)}
                                        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-lg z-10 opacity-60"
                    onClick={() => productContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' })}
                >
                    <FaArrowRight />
                </button>
            </div>
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>
        </div>
    );
}
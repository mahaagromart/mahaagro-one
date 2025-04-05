"use client"; // Required for Client Components in Next.js

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartslice"; // Adjust path as per your project structure
import { addToWishList } from "../../store/wishlistSlice"; // Adjust path as per your project structure
import { FaHeart } from "react-icons/fa";
import productsData from "../../data/productfour"; // Adjust path as per your project structure
import { useRouter } from "next/router"; // For Next.js 12/13 Pages Router

export default function Drone() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { category_id } = router.query; // Extract category_id from URL query (e.g., /?category_id=123)
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [products, setProducts] = useState([]);

    // Initialize products with a default selectedWeight
    useEffect(() => {
        const initializedProducts = productsData.map((product) => ({
            ...product,
            selectedWeight: product.weights?.[0] || {
                label: "N/A",
                discountedPrice: product.price?.discounted || 0,
                originalPrice: product.price?.original || 0,
            },
        }));
        setProducts(initializedProducts);
    }, []); // Empty dependency array to run once on mount

    // Filter products by category_id if provided
    const filteredProducts = category_id
        ? products.filter((product) => product.category_id === parseInt(category_id))
        : products;

    // Handle weight selection for a product
    const handleWeightChange = (weight, productId) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === productId ? { ...product, selectedWeight: weight } : product
            )
        );
    };

    // Add product to cart
    const handleAddToCart = (product) => {
        const productToAdd = {
            ...product,
            selectedWeight: product.selectedWeight.label,
            selectedPrice: product.selectedWeight.discountedPrice,
            selectedOriginalPrice: product.selectedWeight.originalPrice,
            selectedDiscountedPrice: product.selectedWeight.discountedPrice,
        };
        setCart((prevCart) => [...prevCart, productToAdd]);
        dispatch(addToCart(productToAdd));
        console.log("Added to Cart:", productToAdd);
    };

    // Add product to wishlist
    const handleAddToWishList = (product) => {
        setWishlist((prevWishlist) => [...prevWishlist, product]);
        dispatch(addToWishList(product));
        console.log("Added to Wish List:", product);
    };

    // Render star rating
    const renderStars = (rating) => {
        return Array(5)
            .fill(0)
            .map((_, i) => (i < rating ? "★" : "☆"))
            .join("");
    };

    return (
        <div className="container mx-auto p-4 font-poppins">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">
                    {category_id ? "Drone Product" : "Drone Product"}
                </h1>
                <Link href="#" className="flex items-center text-green-700 hover:text-green-900">
                    View All
                </Link>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id} // Use unique product.id as key
                            className="w-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-200 rounded-lg overflow-hidden relative"
                        >
                            {/* Category Label */}
                            <div className="absolute top-0 left-0 bg-gray-200 text-xs font-semibold text-gray-700 p-4">
                                {product.category || "Uncategorized"}
                            </div>

                            {/* Wishlist Icon */}
                            <div className="flex items-center justify-between p-4">
                                <FaHeart
                                    className="text-red-400 ml-auto text-xl cursor-pointer hover:text-red-600 transition-all duration-300 ease-in-out"
                                    onClick={() => handleAddToWishList(product)}
                                />
                            </div>

                            {/* Product Content */}
                            <div className="p-4">
                                {/* Product Image */}
                                <Link
                                    href={{
                                        pathname: "/Droneview",
                                        query: { productId: product.id },
                                    }}
                                    className="group"
                                >
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-56 p-4 object-cover transition-transform duration-500 transform group-hover:scale-105"
                                    />
                                </Link>

                                {/* Weight Options */}
                                <div className="mt-3">
                                    <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                                        {product.weights?.map((weight) => (
                                            <button
                                                key={weight.label}
                                                onClick={() => handleWeightChange(weight, product.id)}
                                                className={`px-3 py-1 rounded-full border text-xs ${product.selectedWeight?.label === weight.label
                                                        ? "bg-green-700 text-white"
                                                        : "bg-green-200 text-gray-800"
                                                    }`}
                                            >
                                                {weight.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>


                                {/* Price and Name */}
                                <div className="mt-4">
                                    <div className="flex justify-between items-center mt-2">
                                        <span className="text-sm font-bold text-green-700">
                                            ₹{product.selectedWeight?.discountedPrice || "N/A"}
                                        </span>
                                        <span className="text-xs text-gray-500 line-through">
                                            ₹{product.selectedWeight?.originalPrice || "N/A"}
                                        </span>
                                    </div>
                                    <h2 className="text-sm font-semibold text-gray-800">
                                        <Link href={`/product/${product.id}`}>{product.name}</Link>
                                        {product.discount > 0 && (
                                            <span className="bg-red-600 text-white text-xs font-bold ml-2 px-1 rounded">
                                                {product.discount}% OFF
                                            </span>
                                        )}
                                    </h2>
                                    <div className="text-xs text-gray-500 mt-1">
                                        ({product.reviews || 0} reviews)
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center mt-2">
                                    <span className="text-yellow-500 text-xs">
                                        {renderStars(product.rating || 0)}
                                    </span>
                                </div>

                                {/* Add to Cart Button */}
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
            ) : (
                <div className="text-center text-gray-500">
                    No products found{category_id ? ` for category ${category_id}` : ""}.
                </div>
            )}
        </div>
    );
}
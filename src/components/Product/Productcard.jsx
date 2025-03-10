"use client";
import Image from "next/image";
import { FaHeart } from 'react-icons/fa';

const ProductCard = ({ product, handleAddToCart, handleAddToWishList, handleWeightChange }) => {
    const renderStars = (rating) => {
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += i < rating ? '★' : '☆';
        }
        return stars;
    };

    return (
        <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
            <div className="relative">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="w-full h-48 object-cover rounded-md"
                />
                <FaHeart
                    className="absolute top-2 right-2 text-red-400 text-xl cursor-pointer hover:text-red-600 transition-all duration-300 ease-in-out"
                    onClick={() => handleAddToWishList(product)}
                />
            </div>
            
            <div className="mt-2">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                
                <div className="flex gap-2 mt-2">
                    {product.weights.map((weight) => (
                        <button
                            key={weight.label}
                            onClick={() => handleWeightChange(weight, product.id)}
                            className={`px-3 py-1 rounded-full border text-xs ${
                                product.selectedWeight.label === weight.label
                                    ? 'bg-green-300 text-black'
                                    : 'bg-gray-100 text-gray-600'
                            } hover:bg-green-400 transition-colors`}
                        >
                            {weight.label}
                        </button>
                    ))}
                </div>

                <p className="text-gray-600 mt-2">
                    {product.selectedWeight?.label || "Default"} - 
                    <span className="text-black"> ₹{product.selectedWeight.discountedPrice}</span>
                    <span className="line-through text-gray-400 ml-1">
                        ₹{product.selectedWeight.originalPrice}
                    </span>
                    {product.discount > 0 && (
                        <span className="text-green-600 ml-1">
                            ({product.discount}% off)
                        </span>
                    )}
                </p>

                <p className="text-yellow-500 mt-1">
                    {renderStars(product.rating)} ({product.reviews} reviews)
                </p>

                <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-2 w-full px-4 py-2 bg-green-300 text-black rounded-md hover:bg-green-400 transition-colors"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
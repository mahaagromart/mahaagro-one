"use client";
import { useRef } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import ProductCard from './ProductCard';

const ProductList = ({ products, handleAddToCart, handleAddToWishList, handleWeightChange }) => {
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
                    <ProductCard
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                        handleAddToWishList={handleAddToWishList}
                        handleWeightChange={handleWeightChange}
                    />
                ))}
            </div>
            <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white border border-gray-300 rounded-full p-2 shadow-lg z-10 opacity-60"
                onClick={() => productContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' })}
            >
                <FaArrowRight />
            </button>
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
};

export default ProductList;
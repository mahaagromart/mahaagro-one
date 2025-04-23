
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaHeart, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { makeRequest } from "@/api";
import { useRouter } from "next/router";

const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_API_URL;

export default function Nogaproduct() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const GetNogaProduct = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const response = await makeRequest("POST", "/Product/GetProductBycategory", { Id: 2 }, { headers: { Authorization: `Bearer ${storedToken}` } });




      // Map API data to the component's product structure
      const mappedProducts = response.dataset.$values.map((item) => {
        const variant = item.variants.$values[0];
        const originalPrice = parseFloat(variant.pricing.maximuM_RETAIL_PRICE);
        const discountAmount = parseFloat(variant.pricing.discounT_AMOUNT || "0");
        const discountedPrice = parseFloat(variant.pricing.calculateD_PRICE);

        // Calculate discount percentage
        const discountPercentage = discountAmount ? Math.round((discountAmount / originalPrice) * 100) : 0;

        return {
          id: item.proD_ID,
          category: item.categorY_ID === "2" ? "Pesticides" : "Unknown",
          name: item.product_Name,
          image: `${imageBaseUrl}${item.thumbnailImage}`, // Store full URL here
          price: {
            original: originalPrice,
            discounted: discountedPrice,
          },
          discount: discountPercentage,
          rating: 5, // Static, update if API provides rating
          reviews: 500, // Static, update if API provides reviews
          weights: [
            {
              label: variant.varient_Name, // e.g., "1kg" or "750ml"
              originalPrice: originalPrice,
              discountedPrice: discountedPrice,
            },
          ],
          selectedWeight: {
            label: variant.varient_Name,
            originalPrice: originalPrice,
            discountedPrice: discountedPrice,
          },
        };
      });

      setProducts(mappedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetNogaProduct();
  }, []);

  const handleWeightChange = (weight, productId) => {
    setProducts(
      products.map((product) => {
        if (product.id === productId) {
          return { ...product, selectedWeight: weight };
        }
        return product;
      })
    );
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

  };

  const renderStars = (rating) => {
    let stars = "";
    for (let i = 0; i < 5; i++) {
      stars += i < rating ? "★" : "☆";
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
    const walk = (x - startX.current) * 2;
    productContainerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div className="container mx-auto p-4 font-poppins">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl md:text-2xl font-bold">Pesticides Product</h1>
        <Link href="/Category?category_id=2" className="flex items-center text-green-700 hover:text-green-900">
          View All <FaArrowRight className="ml-2" />
        </Link>
      </div>
      <div className="relative">
        <button
          className="absolute top-1/2 left-[-12px] transform -translate-y-1/2 bg-red-900 border border-gray-300 rounded-full p-2 shadow-lg z-10 opacity-80 hover:opacity-100 transition"
          onClick={() => productContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' })}
        >
          <FaArrowLeft className="text-green-300 hover:text-green-200 transition-colors duration-200" />
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
              className="flex-none w-40 sm:w-50 md:w-64 transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-gray-200 rounded-lg overflow-hidden relative mr-4"
            >
              <div className="absolute top-0 left-0 bg-gray-200 text-xs font-semibold text-gray-700 p-2 md:p-4">
                {product.category}
              </div>
              <div className="flex items-center justify-between p-2 md:p-4">
                <FaHeart
                  className="text-red-400 ml-auto text-xl cursor-pointer hover:text-red-600 transition-all duration-300 ease-in-out"
                // onClick={() => handleAddToWishList(product)}
                />
              </div>
              <div className="p-2 md:p-4">
                <Link
                  href={{
                    pathname: "/productViewPage",
                    // query: { productId: product.id },
                    query: { proD_ID: product.id },
                  }}
                  className="group"
                >
                  <Image
                    src={product.image} // Use the full URL directly
                    alt={product.name}
                    width={0}
                    height={0}
                    sizes="(max-width: 640px) 100vw, 200px"
                    className="w-full max-w-[200px] aspect-square p-4 transition-transform duration-500 transform group-hover:scale-105 object-cover"
                  />

                </Link>
                <div className="mt-3">
                  <div className="flex gap-1 md:gap-2 mt-2">
                    {product.weights.map((weight) => (
                      <button
                        key={weight.label}
                        onClick={() => handleWeightChange(weight, product.id)}
                        className={`px-2 py-1 text-xs md:px-3 md:py-1 rounded-full border ${product.selectedWeight.label === weight.label
                          ? "bg-green-700 text-white"
                          : "bg-green-200"
                          }`}
                      >
                        {weight.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs md:text-sm font-bold text-green-700">
                      ₹{product.selectedWeight.discountedPrice}
                    </span>
                    <span className="text-xs text-gray-500 line-through">
                      ₹{product.selectedWeight.originalPrice}
                    </span>
                  </div>
                  <h2 className="text-xs md:text-sm font-semibold text-gray-800 flex items-center">
                    <Link href={`/product/${product.id}`} className="truncate">
                      {product.name.slice(0, 15)}...
                    </Link>
                    {product.discount > 0 && (
                      <span className="bg-red-600 text-white text-[10px] font-bold ml-2 px-1 rounded">
                        {product.discount}% OFF
                      </span>
                    )}
                  </h2>
                  <div className="text-xs text-gray-500 mt-1">({product.reviews} reviews)</div>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500 text-xs">{renderStars(product.rating)}</span>
                </div>

              </div>
            </div>
          ))}
        </div>
        <button
          className="absolute top-1/2 right-[-12px] transform -translate-y-1/2 bg-red-900 border border-gray-300 rounded-full p-2 shadow-lg z-10 opacity-80 hover:opacity-100 transition"
          onClick={() => productContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' })}
        >
          <FaArrowRight className="text-green-400 hover:text-green-600 transition-colors duration-200" />
        </button>
      </div>
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
}
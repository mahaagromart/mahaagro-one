


// "use client";
// import Banner from "../../public/assets/images/banner/Shopnow.svg";
// import { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../store/cartslice";
// import { addToWishList } from "../store/wishlistSlice.js";
// import { useRouter } from "next/router";
// import { makeRequest } from "@/api";
// import swal from "sweetalert";
// import Image from "next/image";

// const CategoryPage = () => {
//     const [products, setProducts] = useState([]);
//     const router = useRouter();
//     const dispatch = useDispatch();
//     const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_API_URL ;
//     const fallbackImage = "/fallback-image.jpg";

//     const formatVariants = (variants) => {
//         const variantMap = new Map();
//         variants.$values.forEach((variant) => {
//             const key = variant.varient_Name;
//             if (variantMap.has(key)) {
//                 const existing = variantMap.get(key);
//                 existing.images = [
//                     ...existing.images,
//                     ...variant.imageGallery.$values.map((img) => img.product_Images),
//                 ];
//             } else {
//                 variantMap.set(key, {
//                     ...variant,
//                     images: variant.imageGallery.$values.map((img) => img.product_Images),
//                 });
//             }
//         });
//         return Array.from(variantMap.values());
//     };

//     const getProductData = async (categoryId) => {
//         try {
//             const storedToken = localStorage.getItem("authToken");
//             const response = await makeRequest(
//                 "POST",
//                 "/Product/GetProductBycategory",
//                 { Id: categoryId },
//                 { headers: { Authorization: `Bearer ${storedToken}` } }
//             );

//             if (response.status === 0 && response.message === "Product details fetched successfully") {
             
//                 const formattedProducts = response.dataset.$values.map((product) => {
//                     const uniqueVariants = formatVariants(product.variants);
//                     return {
//                         ...product,
//                         varientList: { $values: uniqueVariants },
//                         selectedVariant: uniqueVariants[0] || null,
//                     };
//                 }) || [];
//                 setProducts(formattedProducts);
//             } else {
//                 swal("FAILURE", "DATA NOT FOUND", "error");
//             }
//         } catch (error) {
//             console.error("UNEXPECTED ERROR FETCHING PRODUCTS:", error.toString());
//             swal("ERROR", "Failed to fetch products", "error");
//         }
//     };

//     useEffect(() => {
//         if (router.query.category_id) {
//             getProductData(router.query.category_id);
//         }
//     }, [router.query.category_id]);
   

//     const handleAddToCart = (product, e) => {
//         e.stopPropagation();
//         if (!product.selectedVariant) return;
//         dispatch(addToCart(product.selectedVariant));
//     };

//     const handleAddToWishList = (product, e) => {
//         e.stopPropagation();
//         if (!product.selectedVariant) return;
//         dispatch(addToWishList(product.selectedVariant));
//     };

//     const handleVariantClick = (productId, variant, e) => {
//         e.stopPropagation();
//         setProducts(products.map((product) =>product.proD_ID === productId ? { ...product, selectedVariant: variant } : product
//         ));
//     };

//     const handleViewProduct = (proD_ID) => {
//         router.push({
//             pathname: "/productViewPage",
//             query: { proD_ID: proD_ID },
//         });
//     };

//     return (
//         <div className="bg-gray-50 min-h-screen rounded-3xl">
//             <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
//                 <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">
//                     Explore Our Collection
//                 </h2>

//                 <div className="mx-auto relative w-full h-56 sm:h-64 md:h-80 mb-12 rounded-xl overflow-hidden shadow-lg">
//                     <Image
//                         src={Banner}
//                         alt="Shop Now Banner"
//                         fill
//                         className="object-cover transition-transform duration-300 hover:scale-105"
//                     />
//                 </div>


//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                {products.length > 0 ? (
//                         products.map((product) => (
//                             <div
//                                 key={product.proD_ID}
//                                 onClick={() => handleViewProduct(product.proD_ID)}
//                                 className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
//                             >
//                                 <div className="relative w-full h-64 overflow-hidden object-cover">
//                                     <Image
//                                         src={
//                                             product.selectedVariant?.images?.[0]
//                                                 ? `${imageBaseUrl}${product.selectedVariant.images[0]}`
//                                                 : fallbackImage
//                                         }
//                                         alt={product.selectedVariant?.product_Name || "Product Image"}
//                                         fill
//                                         className="group-hover:scale-110 transition-transform duration-300"
//                                         onError={(e) => (e.target.src = fallbackImage)}
//                                     />
//                                     <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
//                                         <button
//                                             onClick={(e) => handleAddToWishList(product, e)}
//                                             className="p-2 bg-white rounded-full shadow-md hover:bg-blue-50"
//                                         >
//                                             <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                                             </svg>
//                                         </button>
//                                     </div>
//                                     {/* Add Discount Badge on Image */}
//                                     {product.selectedVariant?.pricing.calculatedPrice > 0 && (
//                                         <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
//                                             {product.selectedVariant?.pricing.discounT_TYPE === "Flat"
//                                                 ? `Flat ₹${product.selectedVariant?.pricing.discounT_AMOUNT} Off`
//                                                 : `${product.selectedVariant?.pricing.discounT_AMOUNT}% Off`}
//                                         </div>
//                                     )}
//                                 </div>

//                                 <div className="p-4">
//                                     <h3 className="text-lg font-semibold text-gray-900 truncate">
//                                         {product.selectedVariant?.product_Name || "Unnamed Product"}
//                                     </h3>

//                                     <div className="flex flex-wrap gap-2 mt-2">
//                                         {product.varientList?.$values.map((variant) => (
//                                             <button
//                                                 key={variant.varient_Name}
//                                                 onClick={(e) => handleVariantClick(product.proD_ID, variant, e)}
//                                                 className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${product.selectedVariant?.varient_Name === variant.varient_Name
//                                                         ? "bg-[#16A34A] text-white"
//                                                         : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                                                     }`}
//                                             >
//                                                 {variant.varient_Name}
//                                             </button>
//                                         ))}
//                                     </div>

//                                     <div className="mt-3 flex items-center gap-2">
//                                         <span className="text-lg font-bold text-[#16A34A]">
//                                             ₹{product.selectedVariant?.pricing.calculateD_PRICE || "N/A"}
//                                         </span>
//                                         {product.selectedVariant?.pricing.discounT_AMOUNT > 0 && (
//                                             <span className="text-sm text-red-600 font-bold line-through">
//                                                 ₹{product.selectedVariant?.pricing.maximuM_RETAIL_PRICE}
//                                             </span>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <div className="col-span-full text-center py-12">
//                             <p className="text-gray-500 text-lg">No products available</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CategoryPage;





"use client";
import Banner from "../../public/assets/images/banner/Shopnow.svg";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartslice";
import { addToWishList } from "../store/wishlistSlice.js";
import { useRouter } from "next/router";
import { makeRequest } from "@/api";
import swal from "sweetalert";
import Image from "next/image";

const CategoryPage = () => {
    const [products, setProducts] = useState([]);
    const router = useRouter();
    const dispatch = useDispatch();
    const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_API_URL ;
    const fallbackImage = "/fallback-image.jpg";

    const formatVariants = (variants) => {
        const variantMap = new Map();
        variants.$values.forEach((variant) => {
            const key = variant.varient_Name;
            if (variantMap.has(key)) {
                const existing = variantMap.get(key);
                existing.images = [
                    ...existing.images,
                    ...variant.imageGallery.$values.map((img) => img.product_Images),
                ];
            } else {
                variantMap.set(key, {
                    ...variant,
                    images: variant.imageGallery.$values.map((img) => img.product_Images),
                });
            }
        });
        return Array.from(variantMap.values());
    };

    const getProductData = async (categoryId) => {
        try {
            const storedToken = localStorage.getItem("authToken");
            const response = await makeRequest(
                "POST",
                "/Product/GetProductBycategory",
                { Id: categoryId },
                { headers: { Authorization: `Bearer ${storedToken}` } }
            );

            if (response.status === 0 && response.message === "Product details fetched successfully") {
             
                const formattedProducts = response.dataset.$values.map((product) => {
                    const uniqueVariants = formatVariants(product.variants);
                    return {
                        ...product,
                        varientList: { $values: uniqueVariants },
                        selectedVariant: uniqueVariants[0] || null,
                    };
                }) || [];
                setProducts(formattedProducts);
            } else {
                swal("FAILURE", "DATA NOT FOUND", "error");
            }
        } catch (error) {
            console.error("UNEXPECTED ERROR FETCHING PRODUCTS:", error.toString());
            swal("ERROR", "Failed to fetch products", "error");
        }
    };

    useEffect(() => {
        if (router.query.category_id) {
            getProductData(router.query.category_id);
        }
    }, [router.query.category_id]);
   

    const handleAddToCart = (product, e) => {
        e.stopPropagation();
        if (!product.selectedVariant) return;
        dispatch(addToCart(product.selectedVariant));
    };

    const handleAddToWishList = (product, e) => {
        e.stopPropagation();
        if (!product.selectedVariant) return;
        dispatch(addToWishList(product.selectedVariant));
    };

    const handleVariantClick = (productId, variant, e) => {
        e.stopPropagation();
        setProducts(products.map((product) =>
            product.proD_ID === productId ? { ...product, selectedVariant: variant } : product
        ));
    };

    const handleViewProduct = (proD_ID) => {
        router.push({
            pathname: "/productViewPage",
            query: { proD_ID: proD_ID },
        });
    };

    return (
        <div className="bg-gray-50 min-h-screen rounded-3xl">
            <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">
                    Explore Our Collection
                </h2>

                <div className="mx-auto relative w-full h-56 sm:h-64 md:h-80 mb-12 rounded-xl overflow-hidden shadow-lg">
                    <Image
                        src={Banner}
                        alt="Shop Now Banner"
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               {products.length > 0 ? (
                        products.map((product) => (
                            <div
                                key={product.proD_ID}
                                onClick={() => handleViewProduct(product.proD_ID)}
                                className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                            >
                                <div className="relative w-full h-64 overflow-hidden object-cover">
                                    <Image
                                        src={
                                            product.selectedVariant?.images?.[0]
                                                ? `${imageBaseUrl}${product.selectedVariant.images[0]}`
                                                : fallbackImage
                                        }
                                        alt={product.selectedVariant?.product_Name || "Product Image"}
                                        fill
                                        className="group-hover:scale-110 transition-transform duration-300"
                                        onError={(e) => (e.target.src = fallbackImage)}
                                    />
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                                        <button
                                            onClick={(e) => handleAddToWishList(product, e)}
                                            className="p-2 bg-white rounded-full shadow-md hover:bg-blue-50"
                                        >
                                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                    {/* Add Discount Badge on Image */}
                                    {product.selectedVariant?.pricing.calculatedPrice > 0 && (
                                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                                            {product.selectedVariant?.pricing.discounT_TYPE === "Flat"
                                                ? `Flat ₹${product.selectedVariant?.pricing.discounT_AMOUNT} Off`
                                                : `${product.selectedVariant?.pricing.discounT_AMOUNT}% Off`}
                                        </div>
                                    )}
                                </div>

                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                                        {product.selectedVariant?.product_Name || "Unnamed Product"}
                                    </h3>

                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {product.varientList?.$values.map((variant) => (
                                            <button
                                                key={variant.varient_Name}
                                                onClick={(e) => handleVariantClick(product.proD_ID, variant, e)}
                                                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${product.selectedVariant?.varient_Name === variant.varient_Name
                                                        ? "bg-[#16A34A] text-white"
                                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                    }`}
                                            >
                                                {variant.varient_Name}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="mt-3 flex items-center gap-2">
                                        <span className="text-lg font-bold text-[#16A34A]">
                                            ₹{product.selectedVariant?.pricing.calculateD_PRICE || "N/A"}
                                        </span>
                                        {product.selectedVariant?.pricing.discounT_AMOUNT > 0 && (
                                            <span className="text-sm text-red-600 font-bold line-through">
                                                ₹{product.selectedVariant?.pricing.maximuM_RETAIL_PRICE}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 text-lg">No products available</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
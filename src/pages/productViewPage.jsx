
// import { useRouter } from 'next/router';
// import { useDispatch } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { addToCart } from '../store/cartslice'; // Redux action to add to cart
// import productsData from '../data/product'; // Assuming your products data is here
// import Image from 'next/image'; // Correct import for Image
// import Product from '../components/Home/fruitstwo';
// import Reviews from "../components/Home/Review";
// import { AiOutlineShoppingCart, AiOutlineCheckCircle, AiFillHeart, AiOutlineShareAlt } from 'react-icons/ai';
// import { FaRupeeSign } from "react-icons/fa";
// import axios from 'axios';

// export default function ProductViewPage() {

//     const router = useRouter();
//     const { proD_ID } = router.query;
//     const [product, setProduct] = useState(null);
//     const { productId } = router.query; // Get the product ID from the URL
//     const dispatch = useDispatch();
//     const [quantity, setQuantity] = useState(1); // Define quantity state
//     const [selectedWeight, setSelectedWeight] = useState(null); // State for selected weight
//     const [newReview, setNewReview] = useState({ name: '', description: '' }); // State for new review



//     const getProductDetails=async(productId)=>{
//         try {
//             const storedToken = localStorage.getItem("authToken");
//             const response = await makeRequest("POST","/Product/GetCompletProductDescription",{ ProductId: productId },
//                 { headers: { Authorization: `Bearer ${storedToken}` } }
//             );
//             console.log(response)
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
//     }

//     // Ensure `id` is defined and match with the product ID type
//     const prodId = productId ? Number(productId) : null;

//     // Find the product with the given id
//     // const product = productsData.find((prod) => prod.id === prodId);

//     if (!product) {
//         return <div>Product not found</div>; // Handle case when product is not found
//     }

//     // Set default selected weight to the first weight if not already set
//     const initialWeight = selectedWeight || product.weights[0];
//     if (!selectedWeight) setSelectedWeight(initialWeight);

//     // Handle adding product to the cart
//     const handleAddToCart = () => {
//         const productToAdd = {
//             ...product,
//             selectedWeight: selectedWeight.label,
//             selectedPrice: selectedWeight.discountedPrice,
//             selectedOriginalPrice: selectedWeight.originalPrice,
//             selectedDiscountedPrice: selectedWeight.discountedPrice,
//             quantity,
//         };

//         // Dispatch action to add the product to the cart
//         dispatch(addToCart(productToAdd));
//         console.log("Added to Cart:", productToAdd);
//     };

//     // Handle review submission
//     const handleSubmitReview = (e) => {
//         e.preventDefault();
//         if (!newReview.name || !newReview.description) {
//             alert("Please provide both your name and a description for the review.");
//             return;
//         }

//         // Here you could handle saving the review, like dispatching to a store or making an API request
//         console.log("New Review:", newReview);
//         setNewReview({ name: '', description: '' }); // Reset review form
//     };


//     useEffect(() => {
//         if (proD_ID) {
//             console.log(proD_ID)
//             getProductDetails(proD_ID);
//         }
//     }, [proD_ID]);

//     return (
//         <div className="container mx-auto p-4 font-poppins">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {/* Left side with product image and details */}
//                 <div>
//                     <Image
//                         src={product.image}
//                         alt={product.name}
//                         className="w-full max-h-[680px] object-cover border-2 rounded-lg border-gray-200 shadow-md p-2  lg:max-h-[680px] md:max-h-[500px] sm:max-h-[400px] xs:max-h-[300px]"
//                         width={500}
//                         height={300}
//                     />
//                 </div>

//                 {/* Right side with product information and order section */}
//                 <div className="space-y-4">
//                     <h1 className="text-3xl font-semibold text-black">{product.name}</h1>
//                     <div className="flex items-center space-x-2">
//                         <div className="flex text-yellow-400">
//                             <span>⭐⭐⭐⭐⭐</span>
//                         </div>
//                         <span className="text-gray-600">{product.rating}</span>
//                     </div>
//                     {/* <div className="border-b border-gray-300 py-2"></div> */}
//                     {/* <p className="text-sm text-gray-600">Unique Code: {product.code}</p> */}
//                     <p className="text-base text-gray-800 mt-4">{product.description}</p>
//                     <p className="text-xl font-bold text-green-600 mt-2">₹{selectedWeight?.discountedPrice}</p>
//                     <p className="text-sm text-gray-500 line-through">₹{selectedWeight?.originalPrice}</p>
//                     <p className="text-sm text-red-500 font-semibold"> {product.discount}% OFF</p>

//                     {/* Weight Selection */}
//                     <div className="mt-4">
//                         <h4 className="text-lg font-semibold text-gray-700">Select Weight</h4>
//                         <div className="flex space-x-2 mt-2">
//                             {product.weights.map((weight, index) => (
//                                 <button
//                                     key={index}
//                                     onClick={() => setSelectedWeight(weight)}
//                                     className={`px-4 py-2 border rounded-md ${selectedWeight?.label === weight.label
//                                         ? 'bg-green-500 text-white border-green-500'
//                                         : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
//                                         }`}
//                                 >
//                                     {weight.label}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Order Section */}
//                     <div className="flex items-center space-x-4 mt-4">
//                         <button
//                             onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
//                             className="w-8 h-8 text-xl border border-gray-400 rounded-full hover:bg-gray-100"
//                         >
//                             -
//                         </button>
//                         <span className="text-lg">{quantity}</span>
//                         <button
//                             onClick={() => setQuantity(quantity + 1)}
//                             className="w-8 h-8 text-xl border border-gray-400 rounded-full hover:bg-gray-100"
//                         >
//                             +
//                         </button>
//                     </div>

//                     {/* Add to Cart and Buy Now with Icons */}
//                     <div className="flex space-x-4 mt-6">
//                         <button
//                             onClick={handleAddToCart}
//                             className="flex items-center px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//                         >
//                             <AiOutlineShoppingCart className="mr-2" />
//                             <span>Add to Cart</span>
//                         </button>
//                         <button className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
//                             <AiOutlineShoppingCart className="mr-2" />
//                             <span>Buy Now</span>
//                         </button>
//                     </div>

//                     {/* Payment Section with Icon */}
//                     <div className="mt-6 border-t border-gray-300 pt-4">
//                         <div className="flex items-center space-x-2">
//                             <FaRupeeSign className="w-6 h-6 text-green-500" />
//                             <span className="text-xl text-gray-700 font-semibold">Secure Payment</span>
//                         </div>
//                         <p className="text-sm text-gray-600 mt-2">Your transaction is 100% secure and guaranteed.</p>
//                     </div>

//                     {/* Warranty Section with Icon */}
//                     <div className="mt-6 border-t border-gray-300 pt-4">
//                         <div className="flex items-center space-x-2">
//                             <AiOutlineCheckCircle className="w-6 h-6 text-blue-500" />
//                             <span className="text-xl text-gray-700 font-semibold">Warranty</span>
//                         </div>
//                         <p className="text-sm text-gray-600 mt-2">1 Year Manufacturer's Warranty</p>
//                     </div>

//                     {/* Wishlist Section with Icon */}
//                     <div className="mt-6 border-t border-gray-300 pt-4">
//                         <div className="flex items-center space-x-2">
//                             <AiFillHeart className="w-6 h-6 text-red-500" />
//                             <span className="text-xl text-gray-700 font-semibold">Add to Wishlist</span>
//                         </div>
//                     </div>

//                     {/* Share Section with Icon */}
//                     <div className="mt-6 border-t border-gray-300 pt-4">
//                         <div className="flex items-center space-x-2">
//                             <AiOutlineShareAlt className="w-6 h-6 text-gray-700" />
//                             <span className="text-xl text-gray-700 font-semibold">Share</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Product Description */}
//             <div className="mt-8">
//                 <h3 className="text-2xl font-semibold text-black">Product Description</h3>
//                 <p className="text-xl text-gray-600 mt-4">
//                     Our premium-quality fruits are harvested from the best orchards, ensuring they are fresh, juicy, and packed with flavor. Each fruit is handpicked to guarantee the highest standards of quality, and they are carefully packed to maintain their freshness during shipping.
//                     Whether you're looking for a healthy snack or ingredients for your favorite recipe, these fruits are perfect for all occasions. Rich in vitamins and antioxidants, they offer numerous health benefits, helping to boost your immunity and keep you feeling energized.
//                     Enjoy the natural sweetness and freshness of our fruits, grown with care for your health and well-being.
//                 </p>
//             </div>

//             {/* Reviews Section */}

//             <Reviews />
//             {/* Related Products Section */}
//             <div className="mt-12">
//                 <h3 className="text-2xl font-semibold text-black">Related Products</h3>
//                 <div className="md:grid-cols-3 gap-8 mt-6">
//                     <Product />
//                 </div>
//             </div>
//         </div>
//     );
// }
// import { useRouter } from 'next/router';
// import { useDispatch } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { addToCart } from '../store/cartslice';
// import Image from 'next/image';
// import Product from '../components/Home/fruitstwo';
// import Reviews from '../components/Home/Review';
// import { AiOutlineShoppingCart, AiOutlineCheckCircle, AiFillHeart, AiOutlineShareAlt } from 'react-icons/ai';
// import { FaRupeeSign } from 'react-icons/fa';
// import { makeRequest } from '@/api'; // Ensure this path is correct

// export default function ProductViewPage() {
//     const router = useRouter();
//     const { proD_ID } = router.query; // e.g., "PROD-000001"
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true); // Add loading state
//     const [error, setError] = useState(null); // Add error state
//     const dispatch = useDispatch();
//     const [quantity, setQuantity] = useState(1);
//     const [selectedWeight, setSelectedWeight] = useState(null);
//     const [newReview, setNewReview] = useState({ name: '', description: '' });

//     // Fetch product details
//     const getProductDetails = async (productId) => {
//         try {
//             setLoading(true);
//             setError(null);
//             console.log('Fetching product with ID:', productId);

//             // Adjust payload to match backend expectation
//             const response = await makeRequest('post', '/Product/GetCompletProductDescription', { ProductId: productId });
//             console.log('API Response:', response);

//             if (response?.status === 0 && response?.message === 'Product details fetched successfully') {
//                 const formattedProducts = response.dataset.$values.map((product) => {
//                     const uniqueVariants = product.variants?.$values || []; // Adjust based on actual response structure
//                     return {
//                         ...product,
//                         varientList: { $values: uniqueVariants },
//                         selectedVariant: uniqueVariants[0] || null,
//                         weights: product.weights?.$values || [], // Ensure weights is an array
//                     };
//                 }) || [];
//                 setProduct(formattedProducts[0]); // Set first product
//             } else {
//                 setError('Product details not found');
//                 console.error('Unexpected response:', response);
//             }
//         } catch (error) {
//             setError('Failed to fetch product details');
//             console.error('Error fetching product:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Fetch product when proD_ID changes
//     useEffect(() => {
//         if (proD_ID) {
//             console.log('proD_ID from URL:', proD_ID);
//             getProductDetails(proD_ID);
//         }
//     }, [proD_ID]);

//     // Handle loading and error states
//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;
//     if (!product) return <div>Product not found</div>;

//     // Set default selected weight
//     const initialWeight = selectedWeight || product.weights[0];
//     if (!selectedWeight && product.weights.length > 0) setSelectedWeight(initialWeight);

//     // Handle adding product to cart
//     const handleAddToCart = () => {
//         const productToAdd = {
//             ...product,
//             selectedWeight: selectedWeight.label,
//             selectedPrice: selectedWeight.discountedPrice,
//             selectedOriginalPrice: selectedWeight.originalPrice,
//             selectedDiscountedPrice: selectedWeight.discountedPrice,
//             quantity,
//         };
//         dispatch(addToCart(productToAdd));
//         console.log('Added to Cart:', productToAdd);
//     };

//     // Handle review submission
//     const handleSubmitReview = (e) => {
//         e.preventDefault();
//         if (!newReview.name || !newReview.description) {
//             alert('Please provide both your name and a description for the review.');
//             return;
//         }
//         console.log('New Review:', newReview);
//         setNewReview({ name: '', description: '' });
//     };

//     return (
//         <div className="container mx-auto p-4 font-poppins">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div>
//                     <Image
//                         src={product.image}
//                         alt={product.name}
//                         className="w-full max-h-[680px] object-cover border-2 rounded-lg border-gray-200 shadow-md p-2"
//                         width={500}
//                         height={300}
//                     />
//                 </div>
//                 <div className="space-y-4">
//                     <h1 className="text-3xl font-semibold text-black">{product.name}</h1>
//                     <div className="flex items-center space-x-2">
//                         <div className="flex text-yellow-400">
//                             <span>⭐⭐⭐⭐⭐</span>
//                         </div>
//                         <span className="text-gray-600">{product.rating || 'N/A'}</span>
//                     </div>
//                     <p className="text-base text-gray-800 mt-4">{product.description}</p>
//                     <p className="text-xl font-bold text-green-600 mt-2">₹{selectedWeight?.discountedPrice}</p>
//                     <p className="text-sm text-gray-500 line-through">₹{selectedWeight?.originalPrice}</p>
//                     <p className="text-sm text-red-500 font-semibold">{product.discount}% OFF</p>

//                     {/* Weight Selection */}
//                     {product.weights.length > 0 && (
//                         <div className="mt-4">
//                             <h4 className="text-lg font-semibold text-gray-700">Select Weight</h4>
//                             <div className="flex space-x-2 mt-2">
//                                 {product.weights.map((weight, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => setSelectedWeight(weight)}
//                                         className={`px-4 py-2 border rounded-md ${
//                                             selectedWeight?.label === weight.label
//                                                 ? 'bg-green-500 text-white border-green-500'
//                                                 : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
//                                         }`}
//                                     >
//                                         {weight.label}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* Order Section */}
//                     <div className="flex items-center space-x-4 mt-4">
//                         <button
//                             onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
//                             className="w-8 h-8 text-xl border border-gray-400 rounded-full hover:bg-gray-100"
//                         >
//                             -
//                         </button>
//                         <span className="text-lg">{quantity}</span>
//                         <button
//                             onClick={() => setQuantity(quantity + 1)}
//                             className="w-8 h-8 text-xl border border-gray-400 rounded-full hover:bg-gray-100"
//                         >
//                             +
//                         </button>
//                     </div>

//                     {/* Add to Cart and Buy Now */}
//                     <div className="flex space-x-4 mt-6">
//                         <button
//                             onClick={handleAddToCart}
//                             className="flex items-center px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//                         >
//                             <AiOutlineShoppingCart className="mr-2" />
//                             <span>Add to Cart</span>
//                         </button>
//                         <button className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
//                             <AiOutlineShoppingCart className="mr-2" />
//                             <span>Buy Now</span>
//                         </button>
//                     </div>

//                     {/* Additional Sections */}
//                     <div className="mt-6 border-t border-gray-300 pt-4">
//                         <div className="flex items-center space-x-2">
//                             <FaRupeeSign className="w-6 h-6 text-green-500" />
//                             <span className="text-xl text-gray-700 font-semibold">Secure Payment</span>
//                         </div>
//                         <p className="text-sm text-gray-600 mt-2">Your transaction is 100% secure and guaranteed.</p>
//                     </div>
//                     <div className="mt-6 border-t border-gray-300 pt-4">
//                         <div className="flex items-center space-x-2">
//                             <AiOutlineCheckCircle className="w-6 h-6 text-blue-500" />
//                             <span className="text-xl text-gray-700 font-semibold">Warranty</span>
//                         </div>
//                         <p className="text-sm text-gray-600 mt-2">1 Year Manufacturer's Warranty</p>
//                     </div>
//                     <div className="mt-6 border-t border-gray-300 pt-4">
//                         <div className="flex items-center space-x-2">
//                             <AiFillHeart className="w-6 h-6 text-red-500" />
//                             <span className="text-xl text-gray-700 font-semibold">Add to Wishlist</span>
//                         </div>
//                     </div>
//                     <div className="mt-6 border-t border-gray-300 pt-4">
//                         <div className="flex items-center space-x-2">
//                             <AiOutlineShareAlt className="w-6 h-6 text-gray-700" />
//                             <span className="text-xl text-gray-700 font-semibold">Share</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Product Description */}
//             <div className="mt-8">
//                 <h3 className="text-2xl font-semibold text-black">Product Description</h3>
//                 <p className="text-xl text-gray-600 mt-4">{product.description}</p>
//             </div>

//             {/* Reviews Section */}
//             <Reviews />

//             {/* Related Products Section */}
//             <div className="mt-12">
//                 <h3 className="text-2xl font-semibold text-black">Related Products</h3>
//                 <div className="md:grid-cols-3 gap-8 mt-6">
//                     <Product />
//                 </div>
//             </div>
//         </div>
//     );
// }







// import { useRouter } from 'next/router';
// import { useDispatch } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { addToCart } from '../store/cartslice';
// import Image from 'next/image';
// import Product from '../components/Home/fruitstwo';
// import Reviews from '../components/Home/Review';
// import { AiOutlineShoppingCart, AiOutlineCheckCircle, AiFillHeart, AiOutlineShareAlt } from 'react-icons/ai';
// import { FaRupeeSign } from 'react-icons/fa';
// import { makeRequest } from '@/api';

// export default function ProductViewPage() {
//     const router = useRouter();
//     const { proD_ID } = router.query;
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const dispatch = useDispatch();
//     const [quantity, setQuantity] = useState(1);
//     const [selectedWeight, setSelectedWeight] = useState(null);
//     const [newReview, setNewReview] = useState({ name: '', description: '' });
//     const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_API_URL || "http://localhost:5136";

//     const getProductDetails = async (productId) => {
//         console.log(selectedWeight)
//         try {
//             setLoading(true);
//             setError(null);
//             console.log('Fetching product with ID:', productId);

//             const response = await makeRequest('post', '/Product/GetCompletProductDescription', { ProductId: productId });
//             console.log('API Response:', response);

//             if (response?.status === 0 && response?.message === 'Product details fetched successfully') {
//                 const rawProduct = response.dataset.$values[0];

//                    const weights = rawProduct.variants.$values.map((variant) => {

//                     return{

//                     label: variant.varient_Name,
//                     originalPrice: Number(variant.pricing.maximuM_RETAIL_PRICE),
//                     discountedPrice: Number(variant.pricing.sellinG_PRICE),
//                     calculatedPrice: Number(variant.pricing.calculateD_PRICE ),
//                     Pricing:Number(variant.Pricing),  
//                     discount: Number(variant.discounT_AMOUNT),
//                     discountType: variant.discounT_TYPE,
//                     currentStock: Number(variant.pricing.currenT_STOCK_QUANTITY), 
//                     minOrderQuantity: Number(variant.pricing.minimuM_ORDER_QUANTITY), 
//                     previousPrice: Number(variant.pricing.pricing),
//                     DiscountAmount:Number(variant.pricing.discounT_AMOUNT)
//                     }
//             });

//                 // Format product data with fallback for missing image
//                 const formattedProduct = {
//                     id: rawProduct.proD_ID,
//                     name: rawProduct.product_Name,
//                     image: rawProduct.thumbnailImage || '/default-image.jpg',
//                     description: rawProduct.product_Description,
//                     weights: weights,
//                     rating: 'N/A',
//                     discount: weights[0]?.discount || 0,
//                 };

//                 console.log('Formatted Product:', formattedProduct);
//                 setProduct(formattedProduct);
//             } else {
//                 setError('Product details not found');
//                 console.error('Unexpected response:', response);
//             }
//         } catch (error) {
//             setError('Failed to fetch product details');
//             console.error('Error fetching product:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (proD_ID) {
//             console.log('proD_ID from URL:', proD_ID);
//             getProductDetails(proD_ID);
//         }
//         console.log(selectedWeight)
//         console.log(window.location.pathname)
//     }, [proD_ID]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;
//     if (!product) return <div>Product not found</div>;

//     const initialWeight = selectedWeight || product.weights[0];
//     if (!selectedWeight && product.weights.length > 0) setSelectedWeight(initialWeight);

//     const handleAddToCart = () => {
//         const productToAdd = {
//             ...product,
//             selectedWeight: selectedWeight.label,
//             selectedPrice: selectedWeight.discountedPrice,
//             selectedOriginalPrice: selectedWeight.originalPrice,
//             selectedDiscountedPrice: selectedWeight.discountedPrice,
//             quantity,
//         };
//         dispatch(addToCart(productToAdd));
//         console.log('Added to Cart:', productToAdd);
//     };

//     const handleSubmitReview = (e) => {
//         e.preventDefault();
//         if (!newReview.name || !newReview.description) {
//             alert('Please provide both your name and a description for the review.');
//             return;
//         }
//         console.log('New Review:', newReview);
//         setNewReview({ name: '', description: '' });
//     };

//     const imageSrc = product.image.startsWith('http')
//         ? product.image
//         : `${imageBaseUrl}${product.image}`;

//     return (
//         <div className="container mx-auto p-4 font-poppins">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div>
//                     <Image
//                         src={imageSrc}
//                         alt={product.name}
//                         className="w-full max-h-[680px] object-cover border-2 rounded-lg border-gray-200 shadow-md p-2"
//                         width={500}
//                         height={300}
//                         onError={() => console.error('Image failed to load:', imageSrc)}
//                     />
//                 </div>
//                 <div className="space-y-4">
//                     <h1 className="text-3xl font-semibold text-black">{product.name}</h1>
//                     <div className="flex items-center space-x-2">
//                         <div className="flex text-yellow-400">
//                             <span>⭐⭐⭐⭐⭐</span>
//                         </div>
//                         <span className="text-gray-600">{product.rating}</span>
//                     </div>
//                     {/* <p className="text-base text-gray-800 mt-4" dangerouslySetInnerHTML={{ __html: product.description }} /> */}

//                     {/* Updated Pricing Section */}
//                     <div className="mt-4">

//                         <p className="text-xl font-bold text-green-600">₹{selectedWeight?.previousPrice ?? 'N/A'}</p>
//                         {/* <p className="text-sm text-gray-500 line-through">₹{selectedWeight?.Pricing}</p> Strikethrough Previous Price */}
//                         <p className="text-sm text-gray-500 line-through">₹{selectedWeight?.calculatedPrice}</p> {/* Fixed to previousPrice */}
//                         <p className="text-sm text-red-500 font-semibold">Discount: ({selectedWeight?.discountType}{selectedWeight?.DiscountAmount}😋)</p>
//                         {/* <p className="text-sm text-gray-700">Calculated Price: ₹{selectedWeight?.calculatedPrice}</p> */}
//                         <p className="text-sm text-gray-700">Stock: {selectedWeight?.currentStock} units</p>
//                         <p className="text-sm text-gray-700">Minimum Order: {selectedWeight?.minOrderQuantity} units</p>
//                     </div>

//                     {product.weights.length > 0 && (
//                         <div className="mt-4">
//                             <h4 className="text-lg font-semibold text-gray-700">Select Weight</h4>
//                             <div className="flex space-x-2 mt-2">
//                                 {product.weights.map((weight, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => setSelectedWeight(weight)}
//                                         className={`px-4 py-2 border rounded-md ${
//                                             selectedWeight?.label === weight.label
//                                                 ? 'bg-green-500 text-white border-green-500'
//                                                 : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
//                                         }`}
//                                     >
//                                         {weight.label}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     <div className="flex items-center space-x-4 mt-4">
//                         <button
//                             onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
//                             className="w-8 h-8 text-xl border border-gray-400 rounded-full hover:bg-gray-100"
//                         >
//                             -
//                         </button>
//                         <span className="text-lg">{quantity}</span>
//                         <button
//                             onClick={() => setQuantity(quantity + 1)}
//                             className="w-8 h-8 text-xl border border-gray-400 rounded-full hover:bg-gray-100"
//                         >
//                             +
//                         </button>
//                     </div>

//                     <div className="flex space-x-4 mt-6">
//                         <button
//                             onClick={handleAddToCart}
//                             className="flex items-center px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//                         >
//                             <AiOutlineShoppingCart className="mr-2" />
//                             <span>Add to Cart</span>
//                         </button>
//                         <button className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
//                             <AiOutlineShoppingCart className="mr-2" />
//                             <span>Buy Now</span>
//                         </button>
//                     </div>

//                     <div className="mt-6 border-t border-gray-300 pt-4">
//                         <div className="flex items-center space-x-2">
//                             <FaRupeeSign className="w-6 h-6 text-green-500" />
//                             <span className="text-xl text-gray-700 font-semibold">Secure Payment</span>
//                         </div>
//                         <p className="text-sm text-gray-600 mt-2">Your transaction is 100% secure and guaranteed.</p>
//                     </div>
//                     <div className="mt-6 border-t border-gray-300 pt-4">
//                         <div className="flex items-center space-x-2">
//                             <AiOutlineCheckCircle className="w-6 h-6 text-blue-500" />
//                             <span className="text-xl text-gray-700 font-semibold">Warranty</span>
//                         </div>
//                         <p className="text-sm text-gray-600 mt-2">1 Year Manufacturer's Warranty</p>
//                     </div>
//                     <div className="mt-6 border-t border-gray-300 pt-4">
//                         <div className="flex items-center space-x-2">
//                             <AiFillHeart className="w-6 h-6 text-red-500" />
//                             <span className="text-xl text-gray-700 font-semibold">Add to Wishlist</span>
//                         </div>
//                     </div>
//                     <div className="mt-6 border-t border-gray-300 pt-4">
//                         <div className="flex items-center space-x-2">
//                             <AiOutlineShareAlt className="w-6 h-6 text-gray-700" />
//                             <span className="text-xl text-gray-700 font-semibold">Share</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="mt-8">
//                 <h3 className="text-2xl font-semibold text-black">Product Description</h3>
//                 {/* <p className="text-xl text-gray-600 mt-4" dangerouslySetInnerHTML={{ __html: product.description }} /> */}
//             </div>

//             <Reviews />

//             <div className="mt-12">
//                 <h3 className="text-2xl font-semibold text-black">Related Products</h3>
//                 <div className="md:grid-cols-3 gap-8 mt-6">
//                     <Product />
//                 </div>
//             </div>
//         </div>
//     );
// }



// import { useRouter } from 'next/router';
// import { useDispatch } from 'react-redux';
// import { useEffect, useState } from 'react';
// import { addToCart } from '../store/cartslice';
// import Image from 'next/image';
// import Product from '../components/Home/fruitstwo';
// import Reviews from '../components/Home/Review';
// import { AiOutlineShoppingCart, AiOutlineCheckCircle, AiFillHeart, AiOutlineShareAlt } from 'react-icons/ai';
// import { FaRupeeSign } from 'react-icons/fa';
// import { makeRequest } from '@/api';

// export default function ProductViewPage() {
//     const router = useRouter();
//     const { proD_ID } = router.query;
//     const [product, setProduct] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const dispatch = useDispatch();
//     const [quantity, setQuantity] = useState(1);
//     const [selectedWeight, setSelectedWeight] = useState(null);
//     const [newReview, setNewReview] = useState({ name: '', description: '' });
//     const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_API_URL || "http://localhost:5136";

//     const getProductDetails = async (productId) => {
//         try {
//             setLoading(true);
//             setError(null);
//             console.log('Fetching product with ID:', productId);

//             const response = await makeRequest('post', '/Product/GetCompletProductDescription', { ProductId: productId });
//             console.log('API Response:', response);

//             if (response?.status === 0 && response?.message === 'Product details fetched successfully') {
//                 const rawProduct = response.dataset.$values[0];

//                 const weights = rawProduct.variants.$values.map((variant) => ({
//                     label: variant.varient_Name,
//                     originalPrice: Number(variant.pricing.maximuM_RETAIL_PRICE),
//                     discountedPrice: Number(variant.pricing.sellinG_PRICE),
//                     calculatedPrice: Number(variant.pricing.calculateD_PRICE),
//                     Pricing: Number(variant.Pricing),
//                     discount: Number(variant.discounT_AMOUNT),
//                     discountType: variant.discounT_TYPE,
//                     currentStock: Number(variant.pricing.currenT_STOCK_QUANTITY),
//                     minOrderQuantity: Number(variant.pricing.minimuM_ORDER_QUANTITY),
//                     previousPrice: Number(variant.pricing.pricing),
//                     DiscountAmount: Number(variant.pricing.discounT_AMOUNT),
//                 }));

//                 const formattedProduct = {
//                     id: rawProduct.proD_ID,
//                     name: rawProduct.product_Name,
//                     image: rawProduct.thumbnailImage || '/default-image.jpg',
//                     description: rawProduct.product_Description,
//                     weights,
//                     rating: 'N/A',
//                     discount: weights[0]?.discount || 0,
//                 };

//                 console.log('Formatted Product:', formattedProduct);
//                 setProduct(formattedProduct);
//                 setSelectedWeight(weights[0]); // Set default weight
//                 setQuantity(Math.min(1, weights[0]?.minOrderQuantity || 1)); // Initialize quantity to minOrderQuantity or 1
//             } else {
//                 setError('Product details not found');
//                 console.error('Unexpected response:', response);
//             }
//         } catch (error) {
//             setError('Failed to fetch product details');
//             console.error('Error fetching product:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (proD_ID) {
//             console.log('proD_ID from URL:', proD_ID);
//             getProductDetails(proD_ID);
//         }
//     }, [proD_ID]);

//     if (loading) return <div>Loading...</div>;
//     if (error) return <div>{error}</div>;
//     if (!product) return <div>Product not found</div>;

//     const handleAddToCart = () => {
//         const productToAdd = {
//             ...product,
//             selectedWeight: selectedWeight.label,
//             selectedPrice: selectedWeight.discountedPrice,
//             selectedOriginalPrice: selectedWeight.originalPrice,
//             selectedDiscountedPrice: selectedWeight.discountedPrice,
//             quantity,
//         };
//         dispatch(addToCart(productToAdd));
//         console.log('Added to Cart:', productToAdd);
//     };

//     const handleSubmitReview = (e) => {
//         e.preventDefault();
//         if (!newReview.name || !newReview.description) {
//             alert('Please provide both your name and a description for the review.');
//             return;
//         }
//         console.log('New Review:', newReview);
//         setNewReview({ name: '', description: '' });
//     };

//     // Update quantity based on selected weight
//     const handleWeightChange = (weight) => {
//         setSelectedWeight(weight);
//         // Reset quantity to 1 or minOrderQuantity, whichever is smaller
//         setQuantity(Math.min(1, weight.minOrderQuantity));
//     };

//     const imageSrc = product.image.startsWith('http')
//         ? product.image
//         : `${imageBaseUrl}${product.image}`;

//     return (
//         <div className="container mx-auto p-4 font-poppins">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 <div>
//                     <Image
//                         src={imageSrc}
//                         alt={product.name}
//                         className="w-full max-h-[680px] object-cover border-2 rounded-lg border-gray-200 shadow-md p-2"
//                         width={500}
//                         height={300}
//                         onError={() => console.error('Image failed to load:', imageSrc)}
//                     />
//                 </div>
//                 <div className="space-y-4">
//                     <h1 className="text-3xl font-semibold text-black">{product.name}</h1>
//                     <div className="flex items-center space-x-2">
//                         <div className="flex text-yellow-400">
//                             <span>⭐⭐⭐⭐⭐</span>
//                         </div>
//                         <span className="text-gray-600">{product.rating}</span>
//                     </div>

//                     {/* Updated Pricing Section */}
//                     <div className="mt-4">
//                         <p className="text-xl font-bold text-green-600">₹{selectedWeight?.discountedPrice ?? 'N/A'}</p>
//                         <p className="text-sm text-gray-500 line-through">₹{selectedWeight?.originalPrice}</p>
//                         <p className="text-sm font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full inline-block">
//                             🎉 Discount: <span className="text-red-700">{selectedWeight?.discountType} ₹{selectedWeight?.DiscountAmount}</span> Off! 🎉
//                         </p>
//                         <p className="text-sm text-gray-700">Calculated Price: ₹{selectedWeight?.calculatedPrice}</p>
//                         <p className="text-sm text-gray-700">Stock: {selectedWeight?.currentStock} units</p>
//                         <p className="text-sm text-gray-700">Minimum Order: {selectedWeight?.minOrderQuantity} units</p>
//                     </div>

//                     {product.weights.length > 0 && (
//                         <div className="mt-4">
//                             <h4 className="text-lg font-semibold text-gray-700">Select Weight</h4>
//                             <div className="flex space-x-2 mt-2">
//                                 {product.weights.map((weight, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => handleWeightChange(weight)}
//                                         className={`px-4 py-2 border rounded-md ${
//                                             selectedWeight?.label === weight.label
//                                                 ? 'bg-green-500 text-white border-green-500'
//                                                 : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
//                                         }`}
//                                     >
//                                         {weight.label}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     <div className="flex items-center space-x-4 mt-4">
//                         <button
//                             onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
//                             className="w-8 h-8 text-xl border border-gray-400 rounded-full hover:bg-gray-100"
//                         >
//                             -
//                         </button>
//                         <span className="text-lg">{quantity}</span>
//                         <button
//                             onClick={() =>
//                                 setQuantity(
//                                     quantity < selectedWeight?.minOrderQuantity ? quantity + 1 : quantity
//                                 )
//                             }
//                             className="w-8 h-8 text-xl border border-gray-400 rounded-full hover:bg-gray-100"
//                         >
//                             +
//                         </button>
//                     </div>

//                     <div className="flex space-x-4 mt-6">
//                         <button
//                             onClick={handleAddToCart}
//                             className="flex items-center px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//                         >
//                             <AiOutlineShoppingCart className="mr-2" />
//                             <span>Add to Cart</span>
//                         </button>
//                         <button className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
//                             <AiOutlineShoppingCart className="mr-2" />
//                             <span>Buy Now</span>
//                         </button>
//                     </div>

//                     <div className="mt-6 border-t border-gray-300 pt-4">
//                         <div className="flex items-center space-x-2">
//                             <FaRupeeSign className="w-6 h-6 text-green-500" />
//                             <span className="text-xl text-gray-700 font-semibold">Secure Payment</span>
//                         </div>
//                         <p className="text-sm text-gray-600 mt-2">Your transaction is 100% secure and guaranteed.</p>
//                     </div>
//                     <div className="mt-6 border-t border-gray-300 pt-4">
//                         <div className="flex items-center space-x-2">
//                             <AiOutlineCheckCircle className="w-6 h-6 text-blue-500" />
//                             <span className="text-xl text-gray-700 font-semibold">Warranty</span>
//                         </div>
//                         <p className="text-sm text-gray-600 mt-2">1 Year Manufacturer's Warranty</p>
//                     </div>
//                     <div className="mt-6 border-t border-gray-300 pt-4">
//                         <div className="flex items-center space-x-2">
//                             <AiFillHeart className="w-6 h-6 text-red-500" />
//                             <span className="text-xl text-gray-700 font-semibold">Add to Wishlist</span>
//                         </div>
//                     </div>
//                     <div className="mt-6 border-t border-gray-300 pt-4">
//                         <div className="flex items-center space-x-2">
//                             <AiOutlineShareAlt className="w-6 h-6 text-gray-700" />
//                             <span className="text-xl text-gray-700 font-semibold">Share</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <div className="mt-8">
//                 <h3 className="text-2xl font-semibold text-black">Product Description</h3>

//             </div>

//             <Reviews />

//             <div className="mt-12">
//                 <h3 className="text-2xl font-semibold text-black">Related Products</h3>
//                 <div className="md:grid-cols-3 gap-8 mt-6">
//                     <Product />
//                 </div>
//             </div>
//         </div>
//     );
// }


import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { addToCart } from '../store/cartslice';
import Image from 'next/image';
import Product from '../components/Home/fruitstwo';
import Reviews from '../components/Home/Review';
import { AiOutlineShoppingCart, AiOutlineCheckCircle, AiFillHeart, AiOutlineShareAlt } from 'react-icons/ai';
import { FaRupeeSign } from 'react-icons/fa';
import { makeRequest } from '@/api';

export default function ProductViewPage() {
    const router = useRouter();
    const { proD_ID } = router.query;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(null); // Initialize as null to set dynamically
    const [selectedWeight, setSelectedWeight] = useState(null);
    const [newReview, setNewReview] = useState({ name: '', description: '' });
    const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_API_URL || "http://localhost:5136";
    const [productId,setProductId]=useState()

    const getProductDetails = async (productId) => {
        try {
            setLoading(true);
            setError(null);


            const response = await makeRequest('post', '/Product/GetCompletProductDescription', { ProductId: productId });

            if (response?.status === 0 && response?.message === 'Product details fetched successfully') {
                const rawProduct = response.dataset.$values[0];
                setProductId(rawProduct.proD_ID);
                const weights = rawProduct.variants.$values.map((variant) => ({
         
                    
                    label: variant.varient_Name,
                    varient_id:variant.varientS_ID,
                    originalPrice: Number(variant.pricing.maximuM_RETAIL_PRICE),
                    discountedPrice: Number(variant.pricing.sellinG_PRICE),
                    calculatedPrice: Number(variant.pricing.calculateD_PRICE),
                    Pricing: Number(variant.Pricing),
                    discount: Number(variant.discounT_AMOUNT),
                    discountType: variant.discounT_TYPE,
                    currentStock: Number(variant.pricing.currenT_STOCK_QUANTITY),
                    minOrderQuantity: Number(variant.pricing.minimuM_ORDER_QUANTITY),
                    previousPrice: Number(variant.pricing.pricing),
                    DiscountAmount: Number(variant.pricing.discounT_AMOUNT),
                }));
               

                const formattedProduct = {
                    id: rawProduct.proD_ID,
                    name: rawProduct.product_Name,
                    image: rawProduct.thumbnailImage || '/default-image.jpg',
                    description: rawProduct.product_Description,
                    weights,
                    rating: 'N/A',
                    discount: weights[0]?.discount || 0,
                };


                setProduct(formattedProduct);
                setSelectedWeight(weights[0]); 
                setQuantity(weights[0]?.minOrderQuantity || 1);
            } else {
                setError('Product details not found');
                console.error('Unexpected response:', response);
            }
        } catch (error) {
            setError('Failed to fetch product details');
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };

    const InsertInCart=async(e)=>{
        console.log(e.varient_id ,productId);
        const response = await makeRequest('post', 'Cart/InsertCartData',
             { VARIENTS_ID : e.varient_id,
                PROD_ID : productId
              });
        console.log(response)



    }


    useEffect(() => {
        if (proD_ID) {

            getProductDetails(proD_ID);
        }
    }, [proD_ID]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Product not found</div>;



    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (!newReview.name || !newReview.description) {
            alert('Please provide both your name and a description for the review.');
            return;
        }
       
        setNewReview({ name: '', description: '' });
    };

    // Update quantity when changing weight
    const handleWeightChange = (weight) => {
        setSelectedWeight(weight);
        setQuantity(weight.minOrderQuantity); // Set quantity to new minOrderQuantity
    };

    const imageSrc = product.image.startsWith('http')
        ? product.image
        : `${imageBaseUrl}${product.image}`;

    return (
        <div className="container mx-auto p-4 font-poppins">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <Image
                        src={imageSrc}
                        alt={product.name}
                        className="w-full max-h-[680px] object-cover border-2 rounded-lg border-gray-200 shadow-md p-2"
                        width={500}
                        height={300}
                        onError={() => console.error('Image failed to load:', imageSrc)}
                    />
                </div>
                <div className="space-y-4">
                    <h1 className="text-3xl font-semibold text-black">{product.name}</h1>
                    <div className="flex items-center space-x-2">
                        <div className="flex text-yellow-400">
                            <span>⭐⭐⭐⭐⭐</span>
                        </div>
                        <span className="text-gray-600">{product.rating}</span>
                    </div>

                    {/* Updated Pricing Section */}
                    <div className="mt-4">
                        <p className="text-xl font-bold text-green-600">₹{selectedWeight?.discountedPrice ?? 'N/A'}</p>
                        <p className="text-sm text-gray-500 line-through">₹{selectedWeight?.originalPrice}</p>
                        <p className="text-sm font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full inline-block">
                            🎉 Discount: <span className="text-red-700">{selectedWeight?.discountType} ₹{selectedWeight?.DiscountAmount}</span> Off! 🎉
                        </p>
                        <p className="text-sm text-gray-700">Calculated Price: ₹{selectedWeight?.calculatedPrice}</p>
                        <p className="text-sm text-gray-700">Stock: {selectedWeight?.currentStock} units</p>
                        <p className="text-sm text-gray-700">Minimum Order: {selectedWeight?.minOrderQuantity} units</p>
                    </div>

                    {product.weights.length > 0 && (
                        <div className="mt-4">
                            <h4 className="text-lg font-semibold text-gray-700">Select Weight</h4>
                            <div className="flex space-x-2 mt-2">
                                {product.weights.map((weight, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleWeightChange(weight)}
                                        className={`px-4 py-2 border rounded-md ${selectedWeight?.label === weight.label
                                                ? 'bg-green-500 text-white border-green-500'
                                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                            }`}
                                    >
                                        {weight.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex items-center space-x-4 mt-4">
                        <button
                            onClick={() =>setQuantity(quantity > selectedWeight?.minOrderQuantity ? quantity - 1 : selectedWeight?.minOrderQuantity)}
                            className="w-8 h-8 text-xl border border-gray-400 rounded-full hover:bg-gray-100"
                        >
                            -
                        </button>
                        <span className="text-lg">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)}className="w-8 h-8 text-xl border border-gray-400 rounded-full hover:bg-gray-100">+</button>
                        <span class="text-2xl font-semibold text-green-500 bg-green-100 px-4 py-2 rounded-2xl shadow-md"> ₹{selectedWeight?.discountedPrice * selectedWeight?.minOrderQuantity}</span>

                    </div>

                    <div className="flex space-x-4 mt-6 gap-4">
                        <button onClick={() => InsertInCart(selectedWeight)} className="flex items-center px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"><AiOutlineShoppingCart className="mr-2" /><span>Add to Cart</span>
                        </button>
                        <button className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"><AiOutlineShoppingCart className="mr-2" /><span>Buy Now</span></button>
                    </div>

                    <div className="mt-6 border-t border-gray-300 pt-4">
                        <div className="flex items-center space-x-2">
                            <FaRupeeSign className="w-6 h-6 text-green-500" />
                            <span className="text-xl text-gray-700 font-semibold">Secure Payment</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Your transaction is 100% secure and guaranteed.</p>
                    </div>
                    <div className="mt-6 border-t border-gray-300 pt-4">
                        <div className="flex items-center space-x-2">
                            <AiOutlineCheckCircle className="w-6 h-6 text-blue-500" />
                            <span className="text-xl text-gray-700 font-semibold">Warranty</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">1 Year Manufacturer's Warranty</p>
                    </div>
                    <div className="mt-6 border-t border-gray-300 pt-4">
                        <div className="flex items-center space-x-2">
                            <AiFillHeart className="w-6 h-6 text-red-500" />
                            <span className="text-xl text-gray-700 font-semibold">Add to Wishlist</span>
                        </div>
                    </div>
                    <div className="mt-6 border-t border-gray-300 pt-4">
                        <div className="flex items-center space-x-2">
                            <AiOutlineShareAlt className="w-6 h-6 text-gray-700" />
                            <span className="text-xl text-gray-700 font-semibold">Share</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-2xl font-semibold text-black">Product Description</h3>

            </div>

            <Reviews />

            <div className="mt-12">
                <h3 className="text-2xl font-semibold text-black">Related Products</h3>
                <div className="md:grid-cols-3 gap-8 mt-6">
                    <Product />
                </div>
            </div>
        </div>
    );
}
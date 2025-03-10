// import { useRouter } from 'next/router';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../store/cartslice';  // Redux action to add to cart
// import productsData from '../data/product'; // Assuming your products data is here
// import Image from 'next/image';  // Correct import for Image
// import Product from '../components/Home/fruitstwo';

// export default function ProductViewPage() {
//     const router = useRouter();
//     const { productId } = router.query;  // Get the product ID from the URL
//     const dispatch = useDispatch();

//     // Ensure `id` is defined and match with the product ID type
//     const prodId = productId ? Number(productId) : null;

//     // Find the product with the given id
//     const product = productsData.find((prod) => prod.id === prodId);

//     if (!product) {
//         return <div>Product not found</div>;  // Handle case when product is not found
//     }

//     // If product has no selected weight, set the default weight (if available)
//     const selectedWeight = product.selectedWeight || product.weights[0]; // Default to the first weight if not selected

//     // Handle adding product to the cart
//     const handleAddToCart = () => {
//         const productToAdd = {
//             ...product,
//             selectedWeight: selectedWeight.label,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
//             selectedPrice: selectedWeight.discountedPrice,
//             selectedOriginalPrice: selectedWeight.originalPrice,
//             selectedDiscountedPrice: selectedWeight.discountedPrice,
//         };

//         // Dispatch action to add the product to the cart
//         dispatch(addToCart(productToAdd));
//         console.log("Added to Cart:", productToAdd);
//     };

//     return (
//         <div className="container mx-auto p-4 font-poppins">
//             <div className="product-details">
//                 <h1 className="text-2xl font-bold">{product.name}</h1>
//                 <Image
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-64 object-cover"
//                     width={500}  // Add width
//                     height={500} // Add height
//                 />
//                 <p className="mt-4">{product.description}</p>
//                 <div className="mt-4">
//                     <span className="text-green-700 text-lg">₹{selectedWeight.discountedPrice}</span>
//                     <span className="text-gray-500 line-through ml-2">₹{selectedWeight.originalPrice}</span>
//                 </div>
//                 <div className="mt-4">
//                     <button
//                         onClick={handleAddToCart}  // Add product to cart when clicked
//                         className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
//                     >
//                         Add to Cart
//                     </button>
//                 </div>
//             </div>
//             <div className="mt-12">
//                 <h3 className="text-2xl font-semibold text-black">Related Products</h3>
//                 <div className=" md:grid-cols-3 gap-8 mt-6">
//                <Product/>
//                 </div>
//             </div>
//         </div>
//     );
// }
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addToCart } from '../store/cartslice'; // Redux action to add to cart
import productsData from '../data/product'; // Assuming your products data is here
import Image from 'next/image'; // Correct import for Image
import Product from '../components/Home/fruitstwo';
import Reviews from "../components/Home/Review";
import { AiOutlineShoppingCart, AiOutlineCheckCircle, AiFillHeart, AiOutlineShareAlt } from 'react-icons/ai';
import { FaRupeeSign } from "react-icons/fa";

export default function ProductViewPage() {
    const router = useRouter();
    const { productId } = router.query; // Get the product ID from the URL
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1); // Define quantity state
    const [selectedWeight, setSelectedWeight] = useState(null); // State for selected weight
    const [newReview, setNewReview] = useState({ name: '', description: '' }); // State for new review

    // Ensure `id` is defined and match with the product ID type
    const prodId = productId ? Number(productId) : null;

    // Find the product with the given id
    const product = productsData.find((prod) => prod.id === prodId);

    if (!product) {
        return <div>Product not found</div>; // Handle case when product is not found
    }

    // Set default selected weight to the first weight if not already set
    const initialWeight = selectedWeight || product.weights[0];
    if (!selectedWeight) setSelectedWeight(initialWeight);

    // Handle adding product to the cart
    const handleAddToCart = () => {
        const productToAdd = {
            ...product,
            selectedWeight: selectedWeight.label,
            selectedPrice: selectedWeight.discountedPrice,
            selectedOriginalPrice: selectedWeight.originalPrice,
            selectedDiscountedPrice: selectedWeight.discountedPrice,
            quantity,
        };

        // Dispatch action to add the product to the cart
        dispatch(addToCart(productToAdd));
        console.log("Added to Cart:", productToAdd);
    };

    // Handle review submission
    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (!newReview.name || !newReview.description) {
            alert("Please provide both your name and a description for the review.");
            return;
        }

        // Here you could handle saving the review, like dispatching to a store or making an API request
        console.log("New Review:", newReview);
        setNewReview({ name: '', description: '' }); // Reset review form
    };

    return (
        <div className="container mx-auto p-4 font-poppins">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left side with product image and details */}
                <div>
                    <Image
                        src={product.image}
                        alt={product.name}
                        className="w-full max-h-[680px] object-cover border-2 rounded-lg border-gray-200 shadow-md p-2  lg:max-h-[680px] md:max-h-[500px] sm:max-h-[400px] xs:max-h-[300px]"
                        width={500}
                        height={300}
                    />
                </div>

                {/* Right side with product information and order section */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-semibold text-black">{product.name}</h1>
                    <div className="flex items-center space-x-2">
                        <div className="flex text-yellow-400">
                            <span>⭐⭐⭐⭐⭐</span>
                        </div>
                        <span className="text-gray-600">{product.rating}</span>
                    </div>
                    {/* <div className="border-b border-gray-300 py-2"></div> */}
                    {/* <p className="text-sm text-gray-600">Unique Code: {product.code}</p> */}
                    <p className="text-base text-gray-800 mt-4">{product.description}</p>
                    <p className="text-xl font-bold text-green-600 mt-2">₹{selectedWeight?.discountedPrice}</p>
                    <p className="text-sm text-gray-500 line-through">₹{selectedWeight?.originalPrice}</p>
                    <p className="text-sm text-red-500 font-semibold"> {product.discount}% OFF</p>

                    {/* Weight Selection */}
                    <div className="mt-4">
                        <h4 className="text-lg font-semibold text-gray-700">Select Weight</h4>
                        <div className="flex space-x-2 mt-2">
                            {product.weights.map((weight, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedWeight(weight)}
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

                    {/* Order Section */}
                    <div className="flex items-center space-x-4 mt-4">
                        <button
                            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                            className="w-8 h-8 text-xl border border-gray-400 rounded-full hover:bg-gray-100"
                        >
                            -
                        </button>
                        <span className="text-lg">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-8 h-8 text-xl border border-gray-400 rounded-full hover:bg-gray-100"
                        >
                            +
                        </button>
                    </div>

                    {/* Add to Cart and Buy Now with Icons */}
                    <div className="flex space-x-4 mt-6">
                        <button
                            onClick={handleAddToCart}
                            className="flex items-center px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                        >
                            <AiOutlineShoppingCart className="mr-2" />
                            <span>Add to Cart</span>
                        </button>
                        <button className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            <AiOutlineShoppingCart className="mr-2" />
                            <span>Buy Now</span>
                        </button>
                    </div>

                    {/* Payment Section with Icon */}
                    <div className="mt-6 border-t border-gray-300 pt-4">
                        <div className="flex items-center space-x-2">
                            <FaRupeeSign className="w-6 h-6 text-green-500" />
                            <span className="text-xl text-gray-700 font-semibold">Secure Payment</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Your transaction is 100% secure and guaranteed.</p>
                    </div>

                    {/* Warranty Section with Icon */}
                    <div className="mt-6 border-t border-gray-300 pt-4">
                        <div className="flex items-center space-x-2">
                            <AiOutlineCheckCircle className="w-6 h-6 text-blue-500" />
                            <span className="text-xl text-gray-700 font-semibold">Warranty</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">1 Year Manufacturer's Warranty</p>
                    </div>

                    {/* Wishlist Section with Icon */}
                    <div className="mt-6 border-t border-gray-300 pt-4">
                        <div className="flex items-center space-x-2">
                            <AiFillHeart className="w-6 h-6 text-red-500" />
                            <span className="text-xl text-gray-700 font-semibold">Add to Wishlist</span>
                        </div>
                    </div>

                    {/* Share Section with Icon */}
                    <div className="mt-6 border-t border-gray-300 pt-4">
                        <div className="flex items-center space-x-2">
                            <AiOutlineShareAlt className="w-6 h-6 text-gray-700" />
                            <span className="text-xl text-gray-700 font-semibold">Share</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Description */}
            <div className="mt-8">
                <h3 className="text-2xl font-semibold text-black">Product Description</h3>
                <p className="text-xl text-gray-600 mt-4">
                    Our premium-quality fruits are harvested from the best orchards, ensuring they are fresh, juicy, and packed with flavor. Each fruit is handpicked to guarantee the highest standards of quality, and they are carefully packed to maintain their freshness during shipping.
                    Whether you're looking for a healthy snack or ingredients for your favorite recipe, these fruits are perfect for all occasions. Rich in vitamins and antioxidants, they offer numerous health benefits, helping to boost your immunity and keep you feeling energized.
                    Enjoy the natural sweetness and freshness of our fruits, grown with care for your health and well-being.
                </p>
            </div>

            {/* Reviews Section */}
            
            <Reviews />
            {/* Related Products Section */}
            <div className="mt-12">
                <h3 className="text-2xl font-semibold text-black">Related Products</h3>
                <div className="md:grid-cols-3 gap-8 mt-6">
                    <Product />
                </div>
            </div>
        </div>
    );
}
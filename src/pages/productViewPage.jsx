

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
// import Swal from 'sweetalert2';
// import parse from 'html-react-parser'; // Import html-react-parser

// export default function ProductViewPage() {
//   const router = useRouter();
//   const { proD_ID } = router.query;
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const dispatch = useDispatch();
//   const [quantity, setQuantity] = useState(null);
//   const [selectedWeight, setSelectedWeight] = useState(null);
//   const [newReview, setNewReview] = useState({ name: '', description: '' });
//   const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_API_URL;
//   const [productId, setProductId] = useState();
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [Description, setDescription] = useState('');

//   const getProductDetails = async (productId) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await makeRequest('post', '/Product/GetCompletProductDescription', { ProductId: productId });


//       if (response?.status === 0 && response?.message === 'Product details fetched successfully') {
//         setDescription(response.dataset.$values[0].product_Description); // Store raw HTML string
//         const rawProduct = response.dataset.$values[0];
//         setProductId(rawProduct.proD_ID);
//         const weights = rawProduct.variants.$values.map((variant) => ({
//           label: variant.varient_Name,
//           varient_id: variant.varientS_ID,
//           originalPrice: Number(variant.pricing.maximuM_RETAIL_PRICE),
//           discountedPrice: Number(variant.pricing.sellinG_PRICE),
//           calculatedPrice: Number(variant.pricing.calculateD_PRICE),
//           Maximum_retail_price: Number(variant.pricing.maximuM_RETAIL_PRICE),
//           Pricing: Number(variant.Pricing),
//           discount: Number(variant.discounT_AMOUNT),
//           discountType: variant.discounT_TYPE,
//           currentStock: Number(variant.pricing.currenT_STOCK_QUANTITY),
//           minOrderQuantity: Number(variant.pricing.minimuM_ORDER_QUANTITY),
//           previousPrice: Number(variant.pricing.pricing),
//           DiscountAmount: Number(variant.pricing.discounT_AMOUNT),
//         }));

//         const formattedProduct = {
//           id: rawProduct.proD_ID,
//           name: rawProduct.product_Name,
//           image: rawProduct.thumbnailImage || '/default-image.jpg',
//           description: rawProduct.product_Description,
//           weights,
//           rating: 'N/A',
//           discount: weights[0]?.discount || 0,
//           images: rawProduct.variants.$values[0].imageGallery.$values.map(img => img.product_Images),
//         };

//         setProduct(formattedProduct);
//         setSelectedWeight(weights[0]);
//         setQuantity(weights[0]?.minOrderQuantity || 1);
//       } else {
//         setError('Product details not found');
//         console.error('Unexpected response:', response);
//       }
//     } catch (error) {
//       setError('Failed to fetch product details');
//       console.error('Error fetching product:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const InsertInCart = async (selectedVariant) => {

//   //   const storedToken = localStorage.getItem("authToken");
//   //   if(storedToken){
//   //   try {

//   //     const userId = localStorage.getItem("userId");


//   //     const response = await makeRequest('post','/Cart/InsertCartData',{ USERID: userId, VARIENTS_ID: selectedVariant.varient_id, PROD_ID: productId, Quantity: quantity },
//   //       { headers: { Authorization: `Bearer ${storedToken}` } }
//   //     );
//   //     console.log({USERID: userId, VARIENTS_ID: selectedVariant.varient_id, PROD_ID: productId, Quantity: quantity })
//   //     console.log(response)

//   //     // if (response && response[0]?.retval === "SUCCESS") {
//   //     //  window.location.reload();
//   //     if(response[0].code == 200  ){
        
//   //       Swal.fire({
//   //         title: "Success",
//   //         text: "Product Added to the cart",
//   //         icon: "sucess",
//   //         confirmButtonText: "OK",
//   //       }).then(()=>{
//   //         window.location.reload();
//   //       });

//   //     }else if( response[0].code == 409  ){
//   //       Swal.fire({
//   //         title: "Product Alerady In Cart",
//   //         text: "Please Go to Cart",
//   //         icon: "warning",
//   //         confirmButtonText: "OK",
//   //       }).then(()=>{
//   //         //TODO DISPATCH to CART 
//   //       });
//   //     } 
//   //     else {
//   //       Swal.fire({
//   //         title: "Error",
//   //         text: "Network Issue: Failed to InsertCart item",
//   //         icon: "error",
//   //         confirmButtonText: "OK",
//   //       });
//   //     }
//   //   } catch (error) {
//   //     console.error("InsertCart error:", error);
//   //     Swal.fire({
//   //       title: "Error",
//   //       text: "Network Issue: Failed to InsertCart item",
//   //       icon: "error",
//   //       confirmButtonText: "OK",
//   //     });
//   //   }
//   // }else{

//   // }
//   // };


//   // const InsertInCart = async (selectedVariant) => {
//   //   const storedToken = localStorage.getItem("authToken");
  
//   //   if (!storedToken) {
//   //     Swal.fire({
//   //       title: "Please Login",
//   //       text: "You need to login to add products to your cart.",
//   //       icon: "info",
//   //       confirmButtonText: "Login",
//   //     }).then(() => {
//   //       window.location.href = "/login"; // Adjust this path as needed
//   //     });
//   //     return;
//   //   }
  
//   //   try {
//   //     const userId = localStorage.getItem("userId");
  
//   //     const response = await makeRequest(
//   //       'post',
//   //       '/Cart/InsertCartData',
//   //       {
//   //         USERID: userId,
//   //         VARIENTS_ID: selectedVariant.varient_id,
//   //         PROD_ID: productId,
//   //         Quantity: quantity
//   //       },
//   //       {
//   //         headers: { Authorization: `Bearer ${storedToken}` }
//   //       }
//   //     );
  
//   //     console.log({
//   //       USERID: userId,
//   //       VARIENTS_ID: selectedVariant.varient_id,
//   //       PROD_ID: productId,
//   //       Quantity: quantity
//   //     });
//   //     console.log(response);
  
//   //     if (response[0].code === 200) {
//   //       Swal.fire({
//   //         title: "Success",
//   //         text: "Product Added to the cart",
//   //         icon: "success", // fixed typo from "sucess"
//   //         confirmButtonText: "OK",
//   //       }).then(() => {
//   //         window.location.reload();
//   //       });
  
//   //     } else if (response[0].code === 409) {
//   //       Swal.fire({
//   //         title: "Product Already In Cart",
//   //         text: "Please go to your cart.",
//   //         icon: "warning",
//   //         confirmButtonText: "OK",
//   //       }).then(() => {
//   //         // TODO: DISPATCH to CART 
//   //       });
  
//   //     } else {
//   //       Swal.fire({
//   //         title: "Error",
//   //         text: "Network Issue: Failed to insert cart item",
//   //         icon: "error",
//   //         confirmButtonText: "OK",
//   //       });
//   //     }
  
//   //   } catch (error) {
//   //     console.error("InsertCart error:", error);
//   //     Swal.fire({
//   //       title: "Error",
//   //       text: "Network Issue: Failed to insert cart item",
//   //       icon: "error",
//   //       confirmButtonText: "OK",
//   //     });
//   //   }
//   // };
  

//   const InsertInCart = async (selectedVariant) => {
//   const storedToken = localStorage.getItem("authToken");

//   if (!storedToken) {
//     router.push('/login');
//     return;
//   }

//   try {
//     const userId = localStorage.getItem("userId");
//     const response = await makeRequest(
//       'post',
//       '/Cart/InsertCartData',
//       {
//         USERID: userId,
//         VARIENTS_ID: selectedVariant.varient_id,
//         PROD_ID: productId,
//         Quantity: quantity
//       },
//       {
//         headers: { Authorization: `Bearer ${storedToken}` }
//       }
//     );

//     if (response[0].code === 200) {
//       router.reload(); // Refresh on success
//     } else if (response[0].code === 409) {
//       router.push('/cart'); // Redirect to cart if item exists
//     } else {
//       console.error("Failed to insert cart item");
//     }

//   } catch (error) {
//     console.error("InsertCart error:", error);
//   }
// };
//   useEffect(() => {
//     if (proD_ID) {
//       getProductDetails(proD_ID);
//     }
//   }, [proD_ID]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;
//   if (!product) return <div>Product not found</div>;

//   const handleSubmitReview = (e) => {
//     e.preventDefault();
//     if (!newReview.name || !newReview.description) {
//       alert('Please provide both your name and a description for the review.');
//       return;
//     }
//     setNewReview({ name: '', description: '' });
//   };

//   const handleWeightChange = (weight) => {
//     setSelectedWeight(weight);
//     setQuantity(weight.minOrderQuantity);
//   };

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
//   };

//   const imageSrc = product.image.startsWith('http')
//     ? product.image
//     : `${imageBaseUrl}${product.image}`;

//   const currentImageSrc = product.images[currentImageIndex].startsWith('http')
//     ? product.images[currentImageIndex]
//     : `${imageBaseUrl}${product.images[currentImageIndex]}`;

//   return (
//     <div className="container mx-auto p-4 font-poppins">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="relative">
//           <Image
//             src={currentImageSrc}
//             alt={product.name}
//             className="w-full max-h-[680px] object-cover border-2 rounded-lg border-gray-200 shadow-md p-2"
//             width={500}
//             height={680}
//             // onError={() => console.error('Image failed to load:', imageSrc)}
//           />
//           {product.images.length > 1 && (
//             <>
//               <button
//                 onClick={prevImage}
//                 className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//               >
//                 ←
//               </button>
//               <button
//                 onClick={nextImage}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
//               >
//                 →
//               </button>
//               <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//                 {product.images.map((_, index) => (
//                   <div
//                     key={index}
//                     className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-gray-400'}`}
//                   />
//                 ))}
//               </div>
//             </>
//           )}
//         </div>
//         <div className="space-y-4">
//           <h1 className="text-3xl font-semibold text-black">{product.name}</h1>
//           <div className="flex items-center space-x-2">
//             <div className="flex text-yellow-400">
//               <span>⭐⭐⭐⭐⭐</span>
//             </div>
//             <span className="text-gray-600">{product.rating}</span>
//           </div>

//           <div className="mt-4">
//             <p className="text-xl font-bold text-green-600">₹{selectedWeight?.calculatedPrice ?? 'N/A'}</p>
//             <p className="text-sm text-gray-500 line-through">₹{selectedWeight?.Maximum_retail_price}</p>
//             <p className="text-sm font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full inline-block">
//               🎉 Discount: <span className="text-red-700">{selectedWeight?.discountType} ₹{selectedWeight?.DiscountAmount}</span> Off! 🎉
//             </p>
//             <p className="text-sm text-gray-700">Stock: {selectedWeight?.currentStock} units</p>
//           </div>

//           {product.weights.length > 0 && (
//             <div className="mt-4">
//               <h4 className="text-lg font-semibold text-gray-700">Select Variation</h4>
//               <div className="flex space-x-2 mt-2">
//                 {product.weights.map((weight, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleWeightChange(weight)}
//                     className={`px-4 py-2 border rounded-md ${
//                       selectedWeight?.label === weight.label
//                         ? 'bg-green-500 text-white border-green-500'
//                         : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
//                     }`}
//                   >
//                     {weight.label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="flex items-center space-x-4 mt-4">
//             <button
//               onClick={() => setQuantity(quantity > selectedWeight?.minOrderQuantity ? quantity - 1 : selectedWeight?.minOrderQuantity)}
//               className="w-8 h-8 text-xl border border-gray-400 rounded-full hover:bg-gray-100"
//             >
//               -
//             </button>
//             <span className="text-lg">{quantity}</span>
//             <button
//               onClick={() => setQuantity(quantity + 1)}
//               className="w-8 h-8 text-xl border border-gray-400 rounded-full hover:bg-gray-100"
//             >
//               +
//             </button>
//             <span className="text-2xl font-semibold text-green-500 bg-green-100 px-4 py-2 rounded-2xl shadow-md">
//               ₹{selectedWeight?.calculatedPrice * quantity}
//             </span>
//           </div>

//           <div className="flex space-x-4 mt-6 gap-4">
//             <button
//               onClick={() => InsertInCart(selectedWeight)}
//               className="flex items-center px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//             >
//               <AiOutlineShoppingCart className="mr-2" />
//               <span>Add to Cart</span>
//             </button>
//             <button className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
//               <AiOutlineShoppingCart className="mr-2" />
//               <span>Buy Now</span>
//             </button>
//           </div>

//           <div className="mt-6 border-t border-gray-300 pt-4">
//             <div className="flex items-center space-x-2">
//               <FaRupeeSign className="w-6 h-6 text-green-500" />
//               <span className="text-xl text-gray-700 font-semibold">Secure Payment</span>
//             </div>
//             <p className="text-sm text-gray-600 mt-2">Your transaction is 100% secure and guaranteed.</p>
//           </div>
//           <div className="mt-6 border-t border-gray-300 pt-4">
//             <div className="flex items-center space-x-2">
//               <AiOutlineCheckCircle className="w-6 h-6 text-blue-500" />
//               <span className="text-xl text-gray-700 font-semibold">Warranty</span>
//             </div>
//             <p className="text-sm text-gray-600 mt-2">1 Year Manufacturer's Warranty</p>
//           </div>
//           <div className="mt-6 border-t border-gray-300 pt-4">
//             <div className="flex items-center space-x-2">
//               <AiFillHeart className="w-6 h-6 text-red-500" />
//               <span className="text-xl text-gray-700 font-semibold">Add to Wishlist</span>
//             </div>
//           </div>
//           <div className="mt-6 border-t border-gray-300 pt-4">
//             <div className="flex items-center space-x-2">
//               <AiOutlineShareAlt className="w-6 h-6 text-gray-700" />
//               <span className="text-xl text-gray-700 font-semibold">Share</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Updated Product Description Section */}
//       <div className="mt-8">
//         <h3 className="text-2xl font-semibold text-black">Product Description</h3>
//         <div className="text-gray-700">{parse(Description)}</div>
//       </div>

//       <Reviews />

//       <div className="mt-12">
//         <h3 className="text-2xl font-semibold text-black">Related Products</h3>
//         <div className="md:grid-cols-3 gap-8 mt-6">
//           <Product />
//         </div>
//       </div>
//     </div>
//   );
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
import Swal from 'sweetalert2';
import parse from 'html-react-parser';

// Loading Component
const Loader = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
    <p className="mt-4 text-lg text-gray-600">Loading product details...</p>
  </div>
);

// 404 Not Found Component
const NotFoundPage = ({ onBackClick }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
    <div className="w-64 h-64 bg-gray-200 rounded-full flex items-center justify-center mb-8">
      <span className="text-6xl">❌</span>
    </div>
    <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
    <p className="text-lg text-gray-600 mb-8">
      The product you're looking for doesn't exist or may have been removed.
    </p>
    <button
      onClick={onBackClick}
      className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
    >
      Back to Homepage
    </button>
  </div>
);

export default function ProductViewPage() {
  const router = useRouter();
  const { proD_ID } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [newReview, setNewReview] = useState({ name: '', description: '' });
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_API_URL;
  const [productId, setProductId] = useState();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [description, setDescription] = useState('');

  const getProductDetails = async (productId) => {
    try {
      setLoading(true);
      setError(null);
      setNotFound(false);

      const response = await makeRequest('post', '/Product/GetCompletProductDescription', { ProductId: productId });

      if (response?.status === 0 && response?.message === 'Product details fetched successfully') {
        if (!response.dataset?.$values || response.dataset.$values.length === 0) {
          setNotFound(true);
          return;
        }

        const rawProduct = response.dataset.$values[0];
        setDescription(rawProduct.product_Description);
        setProductId(rawProduct.proD_ID);
       
        if (!rawProduct.variants?.$values || rawProduct.variants.$values.length === 0) {
          setNotFound(true);
          return;
        }

        const weights = rawProduct.variants.$values.map((variant) => ({
          label: variant.varient_Name,
          varient_id: variant.varientS_ID,
          originalPrice: Number(variant.pricing.maximuM_RETAIL_PRICE),
          discountedPrice: Number(variant.pricing.sellinG_PRICE),
          calculatedPrice: Number(variant.pricing.calculateD_PRICE),
          Maximum_retail_price: Number(variant.pricing.maximuM_RETAIL_PRICE),
          Pricing: Number(variant.Pricing),
          discount: Number(variant.discounT_AMOUNT),
          discountType: variant.discounT_TYPE,
          currentStock: Number(variant.pricing.currenT_STOCK_QUANTITY),
          minOrderQuantity: Number(variant.pricing.minimuM_ORDER_QUANTITY),
          previousPrice: Number(variant.pricing.pricing),
          DiscountAmount: Number(variant.pricing.discounT_AMOUNT),
        }));

        const images = rawProduct.variants.$values[0].imageGallery?.$values?.map(img => img.product_Images) || [];
       
        const formattedProduct = {
          id: rawProduct.proD_ID,
          name: rawProduct.product_Name,
          image: rawProduct.thumbnailImage || '/default-image.jpg',
          description: rawProduct.product_Description,
          weights,
          rating: 'N/A',
          discount: weights[0]?.discount || 0,
          images: images.length > 0 ? images : ['/default-image.jpg'],
        };

        setProduct(formattedProduct);
        setSelectedWeight(weights[0]);
        setQuantity(weights[0]?.minOrderQuantity || 1);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      setError('Failed to fetch product details');
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const InsertInCart = async (selectedVariant) => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("userId");

      if (!storedToken || !userId) {
        Swal.fire({
          title: "Login Required",
          text: "Please login to add items to cart",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

      const response = await makeRequest(
        'post',
        '/Cart/InsertCartData',
        { USERID: userId, VARIENTS_ID: selectedVariant.varient_id, PROD_ID: productId, Quantity: quantity },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      if (response && response[0]?.code === 200) {
        Swal.fire({
          title: "Success",
          text: "Product Added to the cart",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          window.location.reload();
        });
      } else if (response && response[0]?.code === 409) {
        Swal.fire({
          title: "Product Already In Cart",
          text: "Please Go to Cart",
          icon: "warning",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to add item to cart",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("InsertCart error:", error);
      Swal.fire({
        title: "Error",
        text: "Network Issue: Failed to add item to cart",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.description) {
      alert('Please provide both your name and a description for the review.');
      return;
    }
    setNewReview({ name: '', description: '' });
  };

  const handleWeightChange = (weight) => {
    setSelectedWeight(weight);
    setQuantity(weight.minOrderQuantity);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  useEffect(() => {
    if (proD_ID) {
      getProductDetails(proD_ID);
    }
  }, [proD_ID]);

  if (loading) return <Loader />;
  if (notFound) return <NotFoundPage onBackClick={handleBackToHome} />;
  if (error || !product) return <NotFoundPage onBackClick={handleBackToHome} />;

  const imageSrc = product.image.startsWith('http')
    ? product.image
    : `${imageBaseUrl}${product.image}`;

  const currentImageSrc = product.images[currentImageIndex].startsWith('http')
    ? product.images[currentImageIndex]
    : `${imageBaseUrl}${product.images[currentImageIndex]}`;

  return (
    <div className="container mx-auto p-4 font-poppins">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <Image
            src={currentImageSrc}
            alt={product.name}
            className="w-full max-h-[680px] object-cover border-2 rounded-lg border-gray-200 shadow-md p-2"
            width={500}
            height={680}
            priority
            onError={(e) => {
              e.target.src = '/default-image.jpg';
            }}
          />
          {product.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
              >
                →
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {product.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-white' : 'bg-gray-400'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-semibold text-black">{product.name}</h1>
          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">
              <span>⭐⭐⭐⭐⭐</span>
            </div>
            <span className="text-gray-600">{product.rating}</span>
          </div>

          <div className="mt-4">
            <p className="text-xl font-bold text-green-600">₹{selectedWeight?.calculatedPrice ?? 'N/A'}</p>
            <p className="text-sm text-gray-500 line-through">₹{selectedWeight?.Maximum_retail_price}</p>
            <p className="text-sm font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full inline-block">
              🎉 Discount: <span className="text-red-700">{selectedWeight?.discountType} ₹{selectedWeight?.DiscountAmount}</span> Off! 🎉
            </p>
            <p className="text-sm text-gray-700">Stock: {selectedWeight?.currentStock} units</p>
          </div>

          {product.weights.length > 0 && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-gray-700">Select Variation</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.weights.map((weight, index) => (
                  <button
                    key={index}
                    onClick={() => handleWeightChange(weight)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedWeight?.label === weight.label
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
              onClick={() => setQuantity(quantity > selectedWeight?.minOrderQuantity ? quantity - 1 : selectedWeight?.minOrderQuantity)}
              className="w-8 h-8 text-xl border border-gray-400 rounded-full hover:bg-gray-100"
              disabled={quantity <= selectedWeight?.minOrderQuantity}
            >
              -
            </button>
            <span className="text-lg">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 text-xl border border-gray-400 rounded-full hover:bg-gray-100"
              disabled={quantity >= selectedWeight?.currentStock}
            >
              +
            </button>
            <span className="text-2xl font-semibold text-green-500 bg-green-100 px-4 py-2 rounded-2xl shadow-md">
              ₹{(selectedWeight?.calculatedPrice * quantity).toFixed(2)}
            </span>
          </div>

          <div className="flex space-x-4 mt-6 gap-4">
            <button
              onClick={() => InsertInCart(selectedWeight)}
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
        <div className="text-gray-700">{parse(description)}</div>
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



























































































































































































































































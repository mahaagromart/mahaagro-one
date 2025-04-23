
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
import axios from 'axios';
import { devUseWarning } from 'antd/es/_util/warning';

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
  const [pincode, setPincode] = useState('');
  const [availability, setAvailability] = useState(null);
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);
  const [token, setToken] = useState('');
  const [deliverydata, setDeliveryData] = useState([]);
  const [deliveryCharges, setDeliveryCharges] = useState();



  function getDeliveryCharges(data) {
    if (!data) return 0;
    let totalDeliveryCharges = 0;
    const volWeight = (data.length * data.width * data.height) / 5000;
    const finalWeight = Math.max(volWeight, data.weight);

    const baseCharge = 90;

    if (finalWeight <= 2000) {
      totalDeliveryCharges = baseCharge;
    } else {
      const additionalWeight = finalWeight - 2000;
      const additionalKg = Math.ceil(additionalWeight / 1000);
      totalDeliveryCharges = baseCharge + (additionalKg * 35);
    }

    const gst = totalDeliveryCharges * 0.18;
    return Math.round(totalDeliveryCharges + gst);
  }
  function getDeliveryDatePlus8Days() {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + 8 * 24 * 60 * 60 * 1000);
    return futureDate.toDateString();
  }


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
          Packagelength: Number(variant.logistics.packagE_LENGTH),
          width: Number(variant.logistics.packagE_WIDTH),
          height: Number(variant.logistics.packagE_HEIGHT),
          weight: Number(variant.logistics.packagE_WEIGHT),
        }));

        console.log(weights[0].Packagelength, weights[0].width, weights[0].height, weights[0].weight)
        const del = {
          length: weights[0].Packagelength,
          width: weights[0].width,
          height: weights[0].height,
          weight: weights[0].weight
        };

        setDeliveryData(del);


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

    setPincode("");
    setDeliveryData({
      length: weight.Packagelength,
      width: weight.width,
      height: weight.height,
      weight: weight.weight
    });
    setQuantity(weight.minOrderQuantity);
    setAvailability(null);
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


  const checkPincodeAvailability = async (pin) => {

    if (pin.length !== 6 || !deliverydata) {
      setAvailability(null);
      return;
    }
    try {
      const response = await makeRequest('get', `/Order/GetServiceAvailability?pincode=${pin}`);

      if (response.retval === "SUCCESS") {
        const charges = getDeliveryCharges(deliverydata);
        setDeliveryCharges(charges);

        setAvailability({
          available: true,
          deliveryDate: getDeliveryDatePlus8Days(),
          deliveryCharge: deliveryCharges

        });
      } else {
        setAvailability({
          available: false,
          message: 'Delivery not available for this pincode',
        });
      }
    } catch (error) {
      setAvailability({
        available: false,
        message: 'Error checking availability',
      });
    }
  };
  const handleBuyNow = () => {
    InsertInCart(selectedWeight);
    router.push('/cart');
  };



  useEffect(() => {

    if (proD_ID) {
      getProductDetails(proD_ID);
    }
  }, [proD_ID]);


  useEffect(() => {

    console.log(deliverydata)
    if (deliverydata.length > 0) {
      const charges = getDeliveryCharges(deliverydata);
      setDeliveryCharges(charges);

    }
  }, [deliverydata, deliveryCharges]);



  useEffect(() => {
    const timer = setTimeout(() => {
      if (pincode.length === 6) {
        checkPincodeAvailability(pincode);
      } else {
        setAvailability(null);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [pincode]);

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
              disabled={!availability?.available}
              className={`flex items-center px-6 py-2 rounded-md ${availability?.available ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}>
              <AiOutlineShoppingCart className="mr-2" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={handleBuyNow} className={`flex items-center px-6 py-2 rounded-md ${availability?.available ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
            >
              <AiOutlineShoppingCart className="mr-2" />
              <span>Buy Now</span>
            </button>
          </div>

          {/* pincode section starts */}
          <div className="mt-6">
            <div className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2">
                  <div className="text-sm font-medium text-gray-600 mb-2">Delivery</div>
                  <div className="relative flex items-center">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 9 12"
                      className="absolute left-3 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="currentColor"
                        d="M4.2 5.7c-.828 0-1.5-.672-1.5-1.5 0-.398.158-.78.44-1.06.28-.282.662-.44 1.06-.44.828 0 1.5.672 1.5 1.5 0 .398-.158.78-.44 1.06-.28.282-.662.44-1.06.44zm0-5.7C1.88 0 0 1.88 0 4.2 0 7.35 4.2 12 4.2 12s4.2-4.65 4.2-7.8C8.4 1.88 6.52 0 4.2 0z"
                        fillRule="evenodd"
                      />
                    </svg>

                    <input
                      className="w-full pl-8 pr-24 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter Delivery Pincode"
                      type="text"
                      maxLength={6}
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    />

                    {pincodeLoading && (
                      <div className="absolute right-20">
                        <svg
                          className="w-4 h-4 text-blue-600 animate-spin"
                          viewBox="25 25 50 50"
                        >
                          <circle
                            stroke="currentColor"
                            cx="50"
                            cy="50"
                            r="10"
                            fill="none"
                            strokeWidth="3"
                            strokeMiterlimit="10"
                          />
                        </svg>
                      </div>
                    )}

                    {pincode.length === 6 && !pincodeLoading && (
                      <button
                        className="absolute right-3 text-blue-600 text-sm font-medium"
                        onClick={() => setPincode('')}
                      >
                        Change
                      </button>
                    )}
                  </div>

                  {availability && (
                    <div className="mt-3">
                      {availability.available ? (
                        <div className="text-sm">
                          Delivery by{' '}
                          <span className="font-medium">{availability.deliveryDate}</span>{' '}
                          <span className="mx-1">|</span>{' '}
                          <span>Delivery Charges <span className="text-green-600">- ₹{availability.deliveryCharge} </span> </span>{' '}
                          <span className="line-through text-gray-500 ml-1">{availability.originalCharge}</span>

                        </div>
                      ) : (
                        <div className="text-red-500 text-sm">{availability.message}</div>
                      )}
                    </div>
                  )}

                  {availability?.available && (
                    <div className="mt-2">
                      <button
                        className="text-blue-600 text-sm font-medium"
                        onClick={() => setShowDeliveryDetails(!showDeliveryDetails)}
                      >
                        {showDeliveryDetails ? 'Hide Details' : 'View Details'}
                      </button>
                    </div>
                  )}

                  <div className="mt-4 flex items-start">
                    <div className="mr-2 mt-0.5">
                      <svg
                        width="11"
                        height="9"
                        viewBox="0 0 11 9"
                        className="text-blue-600"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          stroke="currentColor"
                          strokeWidth=".5"
                          d="M4.148 7.852a.205.205 0 01-.293.003l-2.71-2.71a.204.204 0 01-.006-.284l.72-.72a.202.202 0 01.284.004L4 6l4.856-4.856c.08-.08.21-.078.283-.005l.72.72c.078.078.073.207-.01.288l-5.7 5.704z"
                        />
                      </svg>
                    </div>
                    <div className="text-sm">Schedule delivery at your convenience</div>
                  </div>
                </div>
              </div>

              {showDeliveryDetails && (
                <div className="mt-4 p-4 border border-gray-200 rounded-sm bg-gray-50">
                  <h4 className="font-medium mb-2">Delivery Details</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Standard Delivery: {availability?.deliveryDate || 'Not available'}</li>
                    <li>• Free delivery on orders above ₹5000</li>
                    <li>• Cash on delivery is not available</li>
                    <li>• No return policy</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          {/* pincode section ends */}

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
// import parse from 'html-react-parser';
// import ReactImageMagnify from 'react-image-magnify';

// // Loading Component
// const Loader = () => (
//   <div className="flex flex-col items-center justify-center min-h-screen">
//     <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
//     <p className="mt-4 text-lg text-gray-600">Loading product details...</p>
//   </div>
// );

// // 404 Not Found Component
// const NotFoundPage = ({ onBackClick }) => (
//   <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
//     <div className="w-64 h-64 bg-gray-200 rounded-full flex items-center justify-center mb-8">
//       <span className="text-6xl">❌</span>
//     </div>
//     <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
//     <p className="text-lg text-gray-600 mb-8">
//       The product you're looking for doesn't exist or may have been removed.
//     </p>
//     <button
//       onClick={onBackClick}
//       className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
//     >
//       Back to Homepage
//     </button>
//   </div>
// );

// export default function ProductViewPage() {
//   const router = useRouter();
//   const { proD_ID } = router.query;
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [notFound, setNotFound] = useState(false);
//   const dispatch = useDispatch();
//   const [quantity, setQuantity] = useState(1);
//   const [selectedWeight, setSelectedWeight] = useState(null);
//   const [newReview, setNewReview] = useState({ name: '', description: '' });
//   const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_API_URL;
//   const [productId, setProductId] = useState();
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [description, setDescription] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [availability, setAvailability] = useState(null);
//   const [pincodeLoading, setPincodeLoading] = useState(false);
//   const [showDeliveryDetails, setShowDeliveryDetails] = useState(false);
//   const [deliverydata, setDeliveryData] = useState([]);
//   const [deliveryCharges, setDeliveryCharges] = useState();

//   function getDeliveryCharges(data) {
//     if (!data) return 0;
//     let totalDeliveryCharges = 0;
//     const volWeight = (data.length * data.width * data.height) / 5000;
//     const finalWeight = Math.max(volWeight, data.weight);

//     const baseCharge = 90;

//     if (finalWeight <= 2000) {
//       totalDeliveryCharges = baseCharge;
//     } else {
//       const additionalWeight = finalWeight - 2000;
//       const additionalKg = Math.ceil(additionalWeight / 1000);
//       totalDeliveryCharges = baseCharge + (additionalKg * 35);
//     }

//     const gst = totalDeliveryCharges * 0.18;
//     return Math.round(totalDeliveryCharges + gst);
//   }

//   const InsertInCart = (weight) => {
//     if (!weight || !product) return;
    
//     const productToAdd = {
//       id: product.id,
//       name: product.name,
//       image: product.image,
//       price: weight.calculatedPrice,
//       originalPrice: weight.Maximum_retail_price,
//       weight: weight.label,
//       weightId: weight.varient_id,
//       quantity: quantity,
//       stock: weight.currentStock
//     };
    
//     dispatch(addToCart(productToAdd));
    
//     Swal.fire({
//       position: 'top-end',
//       icon: 'success',
//       title: 'Added to cart!',
//       showConfirmButton: false,
//       timer: 1500
//     });
//   };

//   const handleBuyNow = () => {
//     InsertInCart(selectedWeight);
//     router.push('/cart'); 
//   };

//   const getProductDetails = async (productId) => {
//     try {
//       setLoading(true);
//       setError(null);
//       setNotFound(false);

//       const response = await makeRequest('post', '/Product/GetCompletProductDescription', { ProductId: productId });

//       if (response?.status === 0 && response?.message === 'Product details fetched successfully') {
//         if (!response.dataset?.$values || response.dataset.$values.length === 0) {
//           setNotFound(true);
//           return;
//         }

//         const rawProduct = response.dataset.$values[0];

//         setDescription(rawProduct.product_Description);
//         setProductId(rawProduct.proD_ID);

//         if (!rawProduct.variants?.$values || rawProduct.variants.$values.length === 0) {
//           setNotFound(true);
//           return;
//         }

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
//           Packagelength: Number(variant.logistics.packagE_LENGTH),
//           width: Number(variant.logistics.packagE_WIDTH),
//           height: Number(variant.logistics.packagE_HEIGHT),
//           weight: Number(variant.logistics.packagE_WEIGHT),
//         }));

//         const del = {
//           length: weights[0].Packagelength,
//           width: weights[0].width,
//           height: weights[0].height,
//           weight: weights[0].weight
//         };

//         setDeliveryData(del);

//         const images = rawProduct.variants.$values[0].imageGallery?.$values?.map(img => img.product_Images) || [];

//         const formattedProduct = {
//           id: rawProduct.proD_ID,
//           name: rawProduct.product_Name,
//           image: rawProduct.thumbnailImage || '/default-image.jpg',
//           description: rawProduct.product_Description,
//           weights,
//           rating: 'N/A',
//           discount: weights[0]?.discount || 0,
//           images: images.length > 0 ? images : ['/default-image.jpg'],
//         };

//         setProduct(formattedProduct);
//         setSelectedWeight(weights[0]);
//         setQuantity(weights[0]?.minOrderQuantity || 1);
//       } else {
//         setNotFound(true);
//       }
//     } catch (error) {
//       setError('Failed to fetch product details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleWeightChange = (weight) => {
//     setSelectedWeight(weight);
//     setPincode("");
//     setDeliveryData({
//       length: weight.Packagelength,
//       width: weight.width,
//       height: weight.height,
//       weight: weight.weight
//     });
//     setQuantity(weight.minOrderQuantity);
//     setAvailability(null);
//   };

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
//   };

//   const prevImage = () => {
//     setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
//   };

//   const handleBackToHome = () => {
//     router.push('/');
//   };

//   useEffect(() => {
//     if (proD_ID) {
//       getProductDetails(proD_ID);
//     }
//   }, [proD_ID]);

//   useEffect(() => {
//     if (deliverydata.length > 0) {
//       const charges = getDeliveryCharges(deliverydata);
//       setDeliveryCharges(charges);
//     }
//   }, [deliverydata]);

//   if (loading) return <Loader />;
//   if (notFound) return <NotFoundPage onBackClick={handleBackToHome} />;
//   if (error || !product) return <NotFoundPage onBackClick={handleBackToHome} />;

//   const currentImageSrc = product.images[currentImageIndex].startsWith('http')
//     ? product.images[currentImageIndex]
//     : `${imageBaseUrl}${product.images[currentImageIndex]}`;

//   return (
//     <div className="container mx-auto p-4 font-poppins">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Image Gallery Section */}
//         <div className="relative">
//           <div className="flex flex-col md:flex-row gap-6">
//             {/* Thumbnail list */}
//             <div className="w-20 md:w-24 flex-shrink-0">
//               <div className="overflow-y-auto h-[400px]">
//                 <ul className="space-y-2">
//                   {product.images.map((image, index) => (
//                     <li
//                       key={index}
//                       className={`cursor-pointer p-1 border rounded ${
//                         currentImageIndex === index
//                           ? 'border-green-500'
//                           : 'border-gray-200'
//                       }`}
//                       onClick={() => setCurrentImageIndex(index)}
//                     >
//                       <Image
//                         src={
//                           image.startsWith('http') ? image : `${imageBaseUrl}${image}`
//                         }
//                         alt={`Thumbnail ${index + 1}`}
//                         width={80}
//                         height={80}
//                         className="object-cover rounded"
//                       />
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>

//             {/* Main image section with zoom */}
//             <div className="relative flex-1 flex items-center justify-center">
//               <button
//                 onClick={prevImage}
//                 className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200 z-10"
//               >
//                 ◀
//               </button>

//               <ReactImageMagnify
//                 {...{
//                   smallImage: {
//                     alt: `Image ${currentImageIndex + 1}`,
//                     isFluidWidth: true,
//                     src: currentImageSrc,
//                   },
//                   largeImage: {
//                     src: currentImageSrc,
//                     width: 800,
//                     height: 800,
//                   },
//                   lensStyle: { backgroundColor: 'rgba(0,0,0,0.4)' },
//                   enlargedImageContainerStyle: { zIndex: 100 },
//                   enlargedImageContainerDimensions: {
//                     width: '127%',
//                     height: '100%',
//                   },
//                 }}
//               />

//               <button
//                 onClick={nextImage}
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow-md hover:bg-gray-200 z-10"
//               >
//                 ▶
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Product Details Section */}
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
//               <div className="flex flex-wrap gap-2 mt-2">
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
//               disabled={quantity <= selectedWeight?.minOrderQuantity}
//             >
//               -
//             </button>
//             <span className="text-lg">{quantity}</span>
//             <button
//               onClick={() => setQuantity(quantity + 1)}
//               className="w-8 h-8 text-xl border border-gray-400 rounded-full hover:bg-gray-100"
//               disabled={quantity >= selectedWeight?.currentStock}
//             >
//               +
//             </button>
//             <span className="text-2xl font-semibold text-green-500 bg-green-100 px-4 py-2 rounded-2xl shadow-md">
//               ₹{(selectedWeight?.calculatedPrice * quantity).toFixed(2)}
//             </span>
//           </div>

//           {/* Add to Cart and Buy Now Buttons */}
//           <div className="flex space-x-4 mt-6 gap-4">
//             <button
//               onClick={() => InsertInCart(selectedWeight)}
//               className="flex items-center px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
//             >
//               <AiOutlineShoppingCart className="mr-2" />
//               <span>Add to Cart</span>
//             </button>
//             <button
//               onClick={handleBuyNow}
//               className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//             >
//               <AiOutlineShoppingCart className="mr-2" />
//               <span>Buy Now</span>
//             </button>
//           </div>

//           {/* Pincode section */}
//           <div className="mt-6">
//             <div className="p-4">
//               <div className="flex flex-col md:flex-row gap-4">
//                 <div className="w-full md:w-1/2">
//                   <div className="text-sm font-medium text-gray-600 mb-2">Delivery</div>
//                   <div className="relative flex items-center">
//                     <svg
//                       width="12"
//                       height="12"
//                       viewBox="0 0 9 12"
//                       className="absolute left-3 text-blue-600"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         fill="currentColor"
//                         d="M4.2 5.7c-.828 0-1.5-.805-1.5-1.5 0-.398.158-.78.44-1.06.28-.282.662-.44 1.06-.44.828 0 1.5.672 1.5 1.5 0 .398-.158.78-.44 1.06-.28.282-.662.44-1.06.44zm0-5.7C1.88 0 0 1.88 0 4.2 0 7.35 4.2 12 4.2 12s4.2-4.65 4.2-7.8C8.4 1.88 6.52 0 4.2 0z"
//                         fillRule="evenodd"
//                       />
//                     </svg>

//                     <input
//                       className="w-full pl-8 pr-24 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//                       placeholder="Enter Delivery Pincode"
//                       type="text"
//                       maxLength={6}
//                       value={pincode}
//                       onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
//                     />

//                     {pincodeLoading && (
//                       <div className="absolute right-20">
//                         <svg
//                           className="w-4 h-4 text-blue-600 animate-spin"
//                           viewBox="25 25 50 50"
//                         >
//                           <circle
//                             stroke="currentColor"
//                             cx="50"
//                             cy="50"
//                             r="10"
//                             fill="none"
//                             strokeWidth="3"
//                             strokeMiterlimit="10"
//                           />
//                         </svg>
//                       </div>
//                     )}

//                     {pincode.length === 6 && !pincodeLoading && (
//                       <button
//                         className="absolute right-3 text-blue-600 text-sm font-medium"
//                         onClick={() => setPincode('')}
//                       >
//                         Change
//                       </button>
//                     )}
//                   </div>

//                   {availability && (
//                     <div className="mt-3">
//                       {availability.available ? (
//                         <div className="text-sm">
//                           Delivery by{' '}
//                           <span className="font-medium">{availability.deliveryDate}</span>{' '}
//                           <span className="mx-1">|</span>{' '}
//                           <span>Delivery Charges <span className="text-green-600">- ₹{availability.deliveryCharge} </span> </span>{' '}
//                           <span className="line-through text-gray-500 ml-1">{availability.originalCharge}</span>
//                         </div>
//                       ) : (
//                         <div className="text-red-500 text-sm">{availability.message}</div>
//                       )}
//                     </div>
//                   )}

//                   {availability?.available && (
//                     <div className="mt-2">
//                       <button
//                         className="text-blue-600 text-sm font-medium"
//                         onClick={() => setShowDeliveryDetails(!showDeliveryDetails)}
//                       >
//                         {showDeliveryDetails ? 'Hide Details' : 'View Details'}
//                       </button>
//                     </div>
//                   )}

//                   <div className="mt-4 flex items-start">
//                     <div className="mr-2 mt-0.5">
//                       <svg
//                         width="11"
//                         height="9"
//                         viewBox="0 0 11 9"
//                         className="text-blue-600"
//                       >
//                         <path
//                           fill="currentColor"
//                           fillRule="evenodd"
//                           stroke="currentColor"
//                           strokeWidth=".5"
//                           d="M4.148 7.852a.205.205 0 01-.293.003l-2.71-2.71a.204.204 0 01-.006-.284l.72-.72a.202.202 0 01.284.004L4 6l4.856-4.856c.08-.08.21-.078.283-.005l.72.72c.078.078.073.207-.01.288l-5.7 5.704z"
//                         />
//                       </svg>
//                     </div>
//                     <div className="text-sm">Schedule delivery at your convenience</div>
//                   </div>
//                 </div>
//               </div>

//               {showDeliveryDetails && (
//                 <div className="mt-4 p-4 border border-gray-200 rounded-sm bg-gray-50">
//                   <h4 className="font-medium mb-2">Delivery Details</h4>
//                   <ul className="text-sm space-y-1">
//                     <li>• Standard Delivery: {availability?.deliveryDate || 'Not available'}</li>
//                     <li>• Free delivery on orders above ₹5000</li>
//                     <li>• Cash on delivery is not available</li>
//                     <li>• No return policy</li>
//                   </ul>
//                 </div>
//               )}
//             </div>
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

//       <div className="mt-8">
//         <h3 className="text-2xl font-semibold text-black">Product Description</h3>
//         <div className="text-gray-700">{parse(description)}</div>
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






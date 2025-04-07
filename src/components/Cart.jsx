// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from 'next/router';
// import { useEffect, useState } from "react";
// import { TbCircleLetterGFilled } from "react-icons/tb";
// import { FaTrash } from "react-icons/fa"; // Import FaTrash icon
// import { makeRequest } from "@/api";
// import Swal from 'sweetalert2';

// const Cart = () => {
//   const router = useRouter();
//   const [data, setData] = useState([]); // State to hold cart data
//   const [cartLength, setLength] = useState(0); // Initialize cartLength to 0
//   const [deletingId, setDeletingId] = useState(null); // Track item being deleted

//   // Fetch cart data on mount
//   const GetCartData = async () => {
//     const storedToken = localStorage.getItem("authToken");
   
//     try {
//       const response = await makeRequest("POST", "/Cart/GetCartData", {}, { 
//         headers: { Authorization: `Bearer ${storedToken}` } 
//       });

     
//       if (response && response[0] && response[0].dataset && response[0].dataset.$values) {
//         const cartItems = response[0].dataset.$values;
//         setLength(cartItems.length); 
//         setData(cartItems); 
//       } else {
//         setLength(0); 
//         setData([]);
//         console.log("No valid dataset.$values in response, setting defaults");
//       }
//     } catch (error) {
//       setLength(0); 
//       setData([]); 
//       console.error("Error fetching cart data:", error);
//     }
//   };

//   useEffect(() => {
//     GetCartData();
//   }, []);

//   // Calculate total price and quantity
//   const totalQuantity = data?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
//   const totalPrice = data?.reduce((total, item) => {
//     const price = parseFloat(item.calculatedPrice) || 0;
//     const qty = item.quantity || 0;
//     return total + (price * qty);
//   }, 0) || 0;

//   // Load Razorpay Script
//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   // Handle Product Details Navigation
//   const handleProductDetails = (id) => {
//     router.push(`/product/${id}`);
//   };

//   // Handle Place Order
//   const handlePlaceOrder = async () => {
//     try {
//       const storedToken = localStorage.getItem("authToken");
//       const user_id = localStorage.getItem("userId");

//       const response = await makeRequest("POST", "Order/CreateOrder", { CustomerID: user_id, VarientID: data[0]?.varientsId }, { headers: { Authorization: `Bearer ${storedToken}`}});
//       console.log(CustomerID,VarientID)
//       console.log(response)
      
//       if (response && response[0]?.dataset) {
//         const { id: order_id, amount, currency } = response[0].dataset;

//         const res = await loadRazorpayScript();
//         if (!res) {
//           alert("Failed to load Razorpay. Please check your connection.");
//           return;
//         }

//         const options = {
//           key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//           amount: amount * 100,
//           currency: currency,
//           name: "My E-commerce",
//           description: "Test Transaction",
//           order_id: order_id,
//           handler: async (response) => {
//             const paymentVerification = {
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_signature: response.razorpay_signature,
//             };

//             try {
//               const verifyResponse = await makeRequest(
//                 "POST",
//                 "Order/VerifyPayment",
//                 paymentVerification,
//                 { headers: { Authorization: `Bearer ${storedToken}` } }
//               );

//               if (verifyResponse) {
//                 Swal.fire("Payment Verified! ✅", "", "success").then(() => router.push("/order-success"));
//               } else {
//                 Swal.fire("Payment Verification Failed! ❌", "", "error");
//               }
//             } catch (error) {
//               console.error("Error Verifying Payment:", error);
//               Swal.fire("Payment Verification Error", "", "error");
//             }
//           },
//           prefill: {
//             name: "John Doe",
//             email: "johndoe@example.com",
//             contact: "9999999999",
//           },
//           theme: {
//             color: "#3399cc",
//           },
//         };

//         const razorpay = new window.Razorpay(options);
//         razorpay.on("payment.failed", (response) => {
//           console.error("Payment Failed:", response.error);
//           Swal.fire("Payment Failed!", "Please try again.", "error");
//         });
//         razorpay.open();
//       } else {
//         Swal.fire("Failed to create order", "", "error");
//       }
//     } catch (error) {
//       console.error("Error Creating Order:", error);
//       Swal.fire("Something went wrong!", "Unable to place the order.", "error");
//     }
//   };

//   // Handle Delete Item with Animation
//   const handleDeleteItem = async (VARIENTS_ID, PROD_ID, Quantity) => {
//     setDeletingId(VARIENTS_ID); // Mark item as deleting for animation

//     const storedToken = localStorage.getItem("authToken");
//     const UserId = localStorage.getItem("userId");

//     try {
//       const response = await makeRequest(
//         "POST",
//         "/Cart/UpdateCartData",
//         { USERID: UserId, VARIENTS_ID: VARIENTS_ID, PROD_ID: PROD_ID, Quantity: Quantity },
//         { headers: { Authorization: `Bearer ${storedToken}` } }
//       );

//       if (response[0].retval === "SUCCESS" && response[0].message === "SUCCESS") {
//         // Wait for animation to complete (500ms) before refreshing data
//         setTimeout(() => {
//           Swal.fire({
//             title: "Success",
//             text: "Successfully deleted item",
//             icon: "success",
//             confirmButtonText: "OK",
//           }).then((result) => {
//             if (result.isConfirmed) {
//               GetCartData(); // Refresh cart data
//               setDeletingId(null); // Reset deleting state
//             }
//           });
//         }, 500); // Match this with the animation duration
//       } else {
//         setDeletingId(null); // Reset if failed
//         Swal.fire("Failed to delete item", "", "error");
//       }
//     } catch (error) {
//       setDeletingId(null); // Reset if error
//       console.error("Delete error:", error);
//       Swal.fire("Network Issue", "Failed to delete item", "error");
//     }
//   };

//   // Function to generate random rating and stars
//   const generateRating = () => {
//     const rating = (Math.random() * 4 + 1).toFixed(1); // Random between 1 and 5
//     const fullStars = Math.floor(rating);
//     const halfStar = rating % 1 >= 0.5 ? 1 : 0;
//     const emptyStars = 5 - fullStars - halfStar;
    
//     const stars = '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
//     const reviews = Math.floor(Math.random() * 101); // Random between 0 and 100
    
//     return { rating, stars, reviews };
//   };

//   return (
//     <div className="container mx-auto p-6 bg-white shadow-lg rounded-xl font-poppins max-w-6xl">
//       {data?.length > 0 ? (
//         <ul className="space-y-6">
//           {data.map((item) => {
//             const { rating, stars, reviews } = generateRating(); // Generate rating for each item
//             const isDeleting = deletingId === item.varientsId; // Check if this item is being deleted

//             return (
//               <li
//                 key={item.varientsId}
//                 className={`flex flex-col md:flex-row justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 ${
//                   isDeleting ? 'opacity-0 translate-x-[-100%]' : 'opacity-100 translate-x-0'
//                 }`}
//               >
//                 {/* Product Info */}
//                 <div
//                   className="flex items-center w-full md:w-2/5 cursor-pointer"
//                   onClick={() => handleProductDetails(item.productId)}
//                 >
//                   <Image
//                     src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${item.productImages?.$values[0]}`}
//                     alt={item.productName || 'Product'}
//                     width={100}
//                     height={100}
//                     style={{objectFit:'cover'}}
//                     // className="rounded-md object-cover mr-4 border border-gray-200"
//                   />
//                   <div className="space-y-1">
//                     <span className="font-semibold text-lg text-gray-800 hover:text-green-600 transition-colors duration-200">
//                       {item.productName || 'Unnamed Product'}
//                     </span>
//                     <div className="text-xs text-gray-500">({reviews} reviews)</div>
//                     <div className="text-yellow-400 text-sm">{stars} <span className="text-gray-600 text-xs">({rating})</span></div>
//                   </div>
//                 </div>

//                 {/* Price */}
//                 <div className="text-center w-full md:w-1/5 mt-4 md:mt-0">
//                   <span className="font-semibold text-xl text-green-600">
//                     ₹{(parseFloat(item.calculatedPrice) * item.quantity).toFixed(2)}
//                   </span>
//                   <div className="text-xs text-gray-500 mt-1">({item.varientsName || 'N/A'})</div>
//                 </div>

//                 {/* Quantity & Delete */}
//                 <div className="flex items-center justify-between w-full md:w-2/5 mt-4 md:mt-0">
//                   <span className="text-gray-700 font-medium">Qty: {item.quantity || 0}</span>
//                   <button
//                     onClick={() => handleDeleteItem(item.varientsId, item.productId, item.minimumOrderQuantity)}
//                     className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all duration-300 shadow-sm hover:shadow-md flex items-center"
//                   >
//                     <FaTrash className="w-4 h-4" /> {/* Trash icon */}
//                   </button>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       ) : (
//         <div className="text-center py-10">
//           <p className="text-gray-600 text-lg">Your cart is empty.</p>
//           <Link href="/">
//             <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 shadow-md">
//               Return to Shop
//             </button>
//           </Link>
//         </div>
//       )}

//       {/* Totals */}
//       {cartLength > 0 && (
//         <div className="mt-8 border-t pt-6">
//           <div className="flex flex-col md:flex-row justify-between items-center text-gray-800">
//             <h3 className="text-xl font-semibold">Total Items: <span className="text-green-600">{cartLength}</span></h3>
//             <h3 className="text-xl font-semibold mt-2 md:mt-0">
//               Total Price: <span className="text-green-600">₹{totalPrice.toFixed(2)}</span>
//             </h3>
//           </div>

//           {/* Place Order Button */}
//           <div className="mt-6 text-center">
//             <button
//               onClick={handlePlaceOrder}
//               className="bg-green-500 text-white px-8 py-3 rounded-md hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//             >
//               Place Order
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;







// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { TbCircleLetterGFilled } from "react-icons/tb";
// import { FaTrash } from "react-icons/fa";
// import { makeRequest } from "@/api";
// import Swal from "sweetalert2";

// const Cart = () => {
//   const router = useRouter();
//   const [data, setData] = useState([]);
//   const [cartLength, setLength] = useState(0);
//   const [deletingId, setDeletingId] = useState(null);
//   const [addresses, setAddresses] = useState([]); // State for user addresses
//   const [selectedAddress, setSelectedAddress] = useState(null); // Selected address ID
//   const [isAddressModalOpen, setIsAddressModalOpen] = useState(false); // Modal visibility

//   // Fetch cart data on mount
//   const GetCartData = async () => {
//     const storedToken = localStorage.getItem("authToken");
//     try {
//       const response = await makeRequest("POST", "/Cart/GetCartData", {}, { 
//         headers: { Authorization: `Bearer ${storedToken}` } 
//       });
//       if (response && response[0] && response[0].dataset && response[0].dataset.$values) {
//         const cartItems = response[0].dataset.$values;
//         setLength(cartItems.length);
//         setData(cartItems);
//       } else {
//         setLength(0);
//         setData([]);
//         console.log("No valid dataset.$values in response, setting defaults");
//       }
//     } catch (error) {
//       setLength(0);
//       setData([]);
//       console.error("Error fetching cart data:", error);
//     }
//   };


//   const fetchAddresses = async () => {
//     const storedToken = localStorage.getItem("authToken");
//     try {
//       const response = await makeRequest("POST", "/Authentication/GetUserProfile", {}, { 
//         headers: { Authorization: `Bearer ${storedToken}` } 
//       });
//       console.log(response)
 
   
//       setAddresses(response.userProfilesEntity.$values[0]);
//       setSelectedAddress(response?.data[0]?.id || mockAddresses[0]?.id); 
//     } catch (error) {
//       console.error("Error fetching addresses:", error);
//       setAddresses([]);
//     }
//   };

//   useEffect(() => {
//     GetCartData();
//     fetchAddresses();
//   }, []);

//   // Calculate total price and quantity
//   const totalQuantity = data?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
//   const totalPrice = data?.reduce((total, item) => {
//     const price = parseFloat(item.calculatedPrice) || 0;
//     const qty = item.quantity || 0;
//     return total + (price * qty);
//   }, 0) || 0;

//   // Load Razorpay Script
//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   // Handle Product Details Navigation
//   const handleProductDetails = (id) => {
//     router.push(`/product/${id}`);
//   };

//   // Handle Place Order
//   const handlePlaceOrder = async () => {
//     try {
//       const storedToken = localStorage.getItem("authToken");
//       const user_id = localStorage.getItem("userId");

//       const response = await makeRequest("POST", "Order/CreateOrder", { CustomerID: user_id, VarientID: data[0]?.varientsId }, { headers: { Authorization: `Bearer ${storedToken}`}});
//       console.log(CustomerID,VarientID)
//       console.log(response)
      
//       if (response && response[0]?.dataset) {
//         const { id: order_id, amount, currency } = response[0].dataset;

//         const res = await loadRazorpayScript();
//         if (!res) {
//           alert("Failed to load Razorpay. Please check your connection.");
//           return;
//         }

//         const options = {
//           key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//           amount: amount * 100,
//           currency: currency,
//           name: "My E-commerce",
//           description: "Test Transaction",
//           order_id: order_id,
//           handler: async (response) => {
//             const paymentVerification = {
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_signature: response.razorpay_signature,
//             };

//             try {
//               const verifyResponse = await makeRequest(
//                 "POST",
//                 "Order/VerifyPayment",
//                 paymentVerification,
//                 { headers: { Authorization: `Bearer ${storedToken}` } }
//               );

//               if (verifyResponse) {
//                 Swal.fire("Payment Verified! ✅", "", "success").then(() => router.push("/order-success"));
//               } else {
//                 Swal.fire("Payment Verification Failed! ❌", "", "error");
//               }
//             } catch (error) {
//               console.error("Error Verifying Payment:", error);
//               Swal.fire("Payment Verification Error", "", "error");
//             }
//           },
//           prefill: {
//             name: "John Doe",
//             email: "johndoe@example.com",
//             contact: "9999999999",
//           },
//           theme: {
//             color: "#3399cc",
//           },
//         };

//         const razorpay = new window.Razorpay(options);
//         razorpay.on("payment.failed", (response) => {
//           console.error("Payment Failed:", response.error);
//           Swal.fire("Payment Failed!", "Please try again.", "error");
//         });
//         razorpay.open();
//       } else {
//         Swal.fire("Failed to create order", "", "error");
//       }
//     } catch (error) {
//       console.error("Error Creating Order:", error);
//       Swal.fire("Something went wrong!", "Unable to place the order.", "error");
//     }
//   };

//   // Handle Delete Item with Animation
//   const handleDeleteItem = async (VARIENTS_ID, PROD_ID, Quantity) => {
//     setDeletingId(VARIENTS_ID);

//     const storedToken = localStorage.getItem("authToken");
//     const UserId = localStorage.getItem("userId");

//     try {
//       const response = await makeRequest(
//         "POST",
//         "/Cart/UpdateCartData",
//         { USERID: UserId, VARIENTS_ID: VARIENTS_ID, PROD_ID: PROD_ID, Quantity: Quantity },
//         { headers: { Authorization: `Bearer ${storedToken}` } }
//       );

//       if (response[0].retval === "SUCCESS" && response[0].message === "SUCCESS") {
//         setTimeout(() => {
//           Swal.fire({
//             title: "Success",
//             text: "Successfully deleted item",
//             icon: "success",
//             confirmButtonText: "OK",
//           }).then((result) => {
//             if (result.isConfirmed) {
//               GetCartData();
//               setDeletingId(null);
//             }
//           });
//         }, 500);
//       } else {
//         setDeletingId(null);
//         Swal.fire("Failed to delete item", "", "error");
//       }
//     } catch (error) {
//       setDeletingId(null);
//       console.error("Delete error:", error);
//       Swal.fire("Network Issue", "Failed to delete item", "error");
//     }
//   };

//   // Function to generate random rating and stars
//   const generateRating = () => {
//     const rating = (Math.random() * 4 + 1).toFixed(1);
//     const fullStars = Math.floor(rating);
//     const halfStar = rating % 1 >= 0.5 ? 1 : 0;
//     const emptyStars = 5 - fullStars - halfStar;
    
//     const stars = "★".repeat(fullStars) + (halfStar ? "½" : "") + "☆".repeat(emptyStars);
//     const reviews = Math.floor(Math.random() * 101);
    
//     return { rating, stars, reviews };
//   };

//   // Handle address selection
//   const handleAddressSelect = (addressId) => {
//     setSelectedAddress(addressId);
//     setIsAddressModalOpen(false); // Close modal after selection
//   };

//   return (
//     <div className="container mx-auto p-6 bg-white shadow-lg rounded-xl font-poppins max-w-6xl">
//       {/* Address Section */}
//       <div className="mb-6 p-4 bg-gray-100 rounded-lg">
//         <div className="flex justify-between items-center">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">
//               Deliver to: {selectedAddress ? addresses.find(addr => addr.id === selectedAddress)?.name : "Select an address"}
//             </h3>
//             {selectedAddress && (
//               <p className="text-sm text-gray-600">
//                 {addresses.find(addr => addr.id === selectedAddress)?.address}, 
//                 {addresses.find(addr => addr.id === selectedAddress)?.city}, 
//                 {addresses.find(addr => addr.id === selectedAddress)?.state} - 
//                 {addresses.find(addr => addr.id === selectedAddress)?.pincode}
//               </p>
//             )}
//           </div>
//           <button
//             onClick={() => setIsAddressModalOpen(true)}
//             className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
//           >
//             Change
//           </button>
//         </div>
//       </div>

//       {/* Address Selection Modal */}
//       {isAddressModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-semibold text-gray-800">Select Delivery Address</h3>
//               <button
//                 onClick={() => setIsAddressModalOpen(false)}
//                 className="text-gray-600 hover:text-gray-800 text-xl"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="space-y-4">
//               {addresses.length > 0 ? (
//                 addresses.map((address) => (
//                   <label
//                     key={address.id}
//                     className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
//                       selectedAddress === address.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name="address"
//                       value={address.id}
//                       checked={selectedAddress === address.id}
//                       onChange={() => handleAddressSelect(address.id)}
//                       className="mt-1 mr-3 accent-blue-600"
//                     />
//                     <div>
//                       <p className="font-semibold text-gray-800">{address.name}</p>
//                       <p className="text-sm text-gray-600">
//                         {address.address}, {address.city}, {address.state} - {address.pincode}
//                       </p>
//                       <p className="text-sm text-gray-500">Mobile: {address.phone}</p>
//                     </div>
//                   </label>
//                 ))
//               ) : (
//                 <p className="text-gray-600">No addresses found.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Cart Items */}
//       {data?.length > 0 ? (
//         <ul className="space-y-6">
//           {data.map((item) => {
//             const { rating, stars, reviews } = generateRating();
//             const isDeleting = deletingId === item.varientsId;

//             return (
//               <li
//                 key={item.varientsId}
//                 className={`flex flex-col md:flex-row justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 ${
//                   isDeleting ? "opacity-0 translate-x-[-100%]" : "opacity-100 translate-x-0"
//                 }`}
//               >
//                 <div
//                   className="flex items-center w-full md:w-2/5 cursor-pointer"
//                   onClick={() => handleProductDetails(item.productId)}
//                 >
//                   <Image
//                     src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${item.productImages?.$values[0]}`}
//                     alt={item.productName || "Product"}
//                     width={100}
//                     height={100}
//                     style={{ objectFit: "cover" }}
//                   />
//                   <div className="space-y-1">
//                     <span className="font-semibold text-lg text-gray-800 hover:text-green-600 transition-colors duration-200">
//                       {item.productName || "Unnamed Product"}
//                     </span>
//                     <div className="text-xs text-gray-500">({reviews} reviews)</div>
//                     <div className="text-yellow-400 text-sm">
//                       {stars} <span className="text-gray-600 text-xs">({rating})</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text-center w-full md:w-1/5 mt-4 md:mt-0">
//                   <span className="font-semibold text-xl text-green-600">
//                     ₹{(parseFloat(item.calculatedPrice) * item.quantity).toFixed(2)}
//                   </span>
//                   <div className="text-xs text-gray-500 mt-1">({item.varientsName || "N/A"})</div>
//                 </div>
//                 <div className="flex items-center justify-between w-full md:w-2/5 mt-4 md:mt-0">
//                   <span className="text-gray-700 font-medium">Qty: {item.quantity || 0}</span>
//                   <button
//                     onClick={() => handleDeleteItem(item.varientsId, item.productId, item.minimumOrderQuantity)}
//                     className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all duration-300 shadow-sm hover:shadow-md flex items-center"
//                   >
//                     <FaTrash className="w-4 h-4" />
//                   </button>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       ) : (
//         <div className="text-center py-10">
//           <p className="text-gray-600 text-lg">Your cart is empty.</p>
//           <Link href="/">
//             <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 shadow-md">
//               Return to Shop
//             </button>
//           </Link>
//         </div>
//       )}

//       {/* Totals */}
//       {cartLength > 0 && (
//         <div className="mt-8 border-t pt-6">
//           <div className="flex flex-col md:flex-row justify-between items-center text-gray-800">
//             <h3 className="text-xl font-semibold">
//               Total Items: <span className="text-green-600">{cartLength}</span>
//             </h3>
//             <h3 className="text-xl font-semibold mt-2 md:mt-0">
//               Total Price: <span className="text-green-600">₹{totalPrice.toFixed(2)}</span>
//             </h3>
//           </div>
//           <div className="mt-6 text-center">
//             <button
//               onClick={handlePlaceOrder}
//               className="bg-green-500 text-white px-8 py-3 rounded-md hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//             >
//               Place Order
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;





// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { FaTrash } from "react-icons/fa";
// import { makeRequest } from "@/api";
// import Swal from "sweetalert2";

// const Cart = () => {
//   const router = useRouter();
//   const [data, setData] = useState([]);
//   const [cartLength, setLength] = useState(0);
//   const [deletingId, setDeletingId] = useState(null);
//   const [addresses, setAddresses] = useState([]); // State for user addresses
//   const [selectedAddress, setSelectedAddress] = useState(null); // Selected address $id
//   const [isAddressModalOpen, setIsAddressModalOpen] = useState(false); // Modal visibility

//   // Fetch cart data on mount
//   const GetCartData = async () => {
//     const storedToken = localStorage.getItem("authToken");
//     try {
//       const response = await makeRequest("POST", "/Cart/GetCartData", {}, { 
//         headers: { Authorization: `Bearer ${storedToken}` } 
//       });
//       if (response && response[0] && response[0].dataset && response[0].dataset.$values) {
//         const cartItems = response[0].dataset.$values;
//         setLength(cartItems.length);
//         setData(cartItems);
//       } else {
//         setLength(0);
//         setData([]);
//         console.log("No valid dataset.$values in response, setting defaults");
//       }
//     } catch (error) {
//       setLength(0);
//       setData([]);
//       console.error("Error fetching cart data:", error);
//     }
//   };

//   // Fetch user addresses from API
//   const fetchAddresses = async () => {
//     const storedToken = localStorage.getItem("authToken");
//     try {
//       const response = await makeRequest("POST", "/Authentication/GetUserProfile", {}, { 
//         headers: { Authorization: `Bearer ${storedToken}` } 
//       });
//       // Extract the $values array from userProfilesEntity
//       const addressData = response?.userProfilesEntity?.$values || [];
//       console.log(addressData)
//       setAddresses(addressData);
//       setSelectedAddress(addressData[0]?.$id || null); // Default to first address $id
//     } catch (error) {
//       console.error("Error fetching addresses:", error);
//       setAddresses([]);
//     }
//   };

//   useEffect(() => {
//     GetCartData();
//     fetchAddresses();
//   }, []);

//   // Calculate total price and quantity
//   const totalQuantity = data?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
//   const totalPrice = data?.reduce((total, item) => {
//     const price = parseFloat(item.calculatedPrice) || 0;
//     const qty = item.quantity || 0;
//     return total + (price * qty);
//   }, 0) || 0;

//   // Load Razorpay Script
//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   // Handle Product Details Navigation
//   const handleProductDetails = (id) => {
//     router.push(`/product/${id}`);
//   };

//   // Handle Place Order
//   const handlePlaceOrder = async () => {
//     try {
//       const storedToken = localStorage.getItem("authToken");
//       const user_id = localStorage.getItem("userId");

//       const response = await makeRequest("POST", "Order/CreateOrder", { CustomerID: user_id, VarientID: data[0]?.varientsId }, { headers: { Authorization: `Bearer ${storedToken}`}});
//       console.log(response)
//       console.log("CustomerID:", user_id, "VarientID:", data[0]?.varientsId);
//       console.log(response);
      
//       if (response && response[0]?.dataset) {
//         const { id: order_id, amount, currency } = response[0].dataset;

//         const res = await loadRazorpayScript();
//         if (!res) {
//           alert("Failed to load Razorpay. Please check your connection.");
//           return;
//         }

//         const options = {
//           key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//           amount: amount * 100,
//           currency: currency,
//           name: "My E-commerce",
//           description: "Test Transaction",
//           order_id: order_id,
//           handler: async (response) => {
//             const paymentVerification = {
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_signature: response.razorpay_signature,
//             };

//             try {
//               const verifyResponse = await makeRequest(
//                 "POST",
//                 "Order/VerifyPayment",
//                 paymentVerification,
//                 { headers: { Authorization: `Bearer ${storedToken}` } }
//               );

//               if (verifyResponse) {
//                 Swal.fire("Payment Verified! ✅", "", "success").then(() => router.push("/order-success"));
//               } else {
//                 Swal.fire("Payment Verification Failed! ❌", "", "error");
//               }
//             } catch (error) {
//               console.error("Error Verifying Payment:", error);
//               Swal.fire("Payment Verification Error", "", "error");
//             }
//           },
//           prefill: {
//             name: "John Doe",
//             email: "johndoe@example.com",
//             contact: "9999999999",
//           },
//           theme: {
//             color: "#3399cc",
//           },
//         };

//         const razorpay = new window.Razorpay(options);
//         razorpay.on("payment.failed", (response) => {
//           console.error("Payment Failed:", response.error);
//           Swal.fire("Payment Failed!", "Please try again.", "error");
//         });
//         razorpay.open();
//       } else {
//         Swal.fire("Failed to create order", "", "error");
//       }
//     } catch (error) {
//       console.error("Error Creating Order:", error);
//       Swal.fire("Something went wrong!", "Unable to place the order.", "error");
//     }
//   };

//   // Handle Delete Item with Animation
//   const handleDeleteItem = async (VARIENTS_ID, PROD_ID, Quantity) => {
//     setDeletingId(VARIENTS_ID);
//     const storedToken = localStorage.getItem("authToken");
//     const UserId = localStorage.getItem("userId");

//     try {
//       const response = await makeRequest(
//         "POST",
//         "/Cart/UpdateCartData",
//         { USERID: UserId, VARIENTS_ID: VARIENTS_ID, PROD_ID: PROD_ID, Quantity: Quantity },
//         { headers: { Authorization: `Bearer ${storedToken}` } }
//       );

//       if (response[0].retval === "SUCCESS" && response[0].message === "SUCCESS") {
//         setTimeout(() => {
//           Swal.fire({
//             title: "Success",
//             text: "Successfully deleted item",
//             icon: "success",
//             confirmButtonText: "OK",
//           }).then((result) => {
//             if (result.isConfirmed) {
//               GetCartData();
//               setDeletingId(null);
//             }
//           });
//         }, 500);
//       } else {
//         setDeletingId(null);
//         Swal.fire("Failed to delete item", "", "error");
//       }
//     } catch (error) {
//       setDeletingId(null);
//       console.error("Delete error:", error);
//       Swal.fire("Network Issue", "Failed to delete item", "error");
//     }
//   };

//   // Function to generate random rating and stars
//   const generateRating = () => {
//     const rating = (Math.random() * 4 + 1).toFixed(1);
//     const fullStars = Math.floor(rating);
//     const halfStar = rating % 1 >= 0.5 ? 1 : 0;
//     const emptyStars = 5 - fullStars - halfStar;
    
//     const stars = "★".repeat(fullStars) + (halfStar ? "½" : "") + "☆".repeat(emptyStars);
//     const reviews = Math.floor(Math.random() * 101);
    
//     return { rating, stars, reviews };
//   };

//   // Handle address selection
//   const handleAddressSelect = (addressId) => {
//     setSelectedAddress(addressId);
//     setIsAddressModalOpen(false);
//   };

//   return (
//     <div className="container mx-auto p-6 bg-white shadow-lg rounded-xl font-poppins max-w-6xl">
//       {/* Address Section */}
//       <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//         <div className="flex justify-between items-center">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">
//               Deliver to: {selectedAddress ? `${addresses.find(addr => addr.$id === selectedAddress)?.firstName} ${addresses.find(addr => addr.$id === selectedAddress)?.lastName}` : "Select an address"}
//             </h3>
//             {selectedAddress && (
//               <p className="text-sm text-gray-600">
//                 {addresses.find(addr => addr === selectedAddress)?.address}, 
//                 {addresses.find(addr => addr === selectedAddress)?.cityName}, 
//                 {addresses.find(addr => addr === selectedAddress)?.stateName} - 
//                 {addresses.find(addr => addr === selectedAddress)?.pincode}
//               </p>
//             )}
//           </div>
//           <button
//             onClick={() => setIsAddressModalOpen(true)}
//             className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
//           >
//             Change
//           </button>
//         </div>
//       </div>

//       {/* Address Selection Modal */}
//       {isAddressModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-xl">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-xl font-semibold text-gray-800">Select Delivery Address</h3>
//               <button
//                 onClick={() => setIsAddressModalOpen(false)}
//                 className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="space-y-4">
//               {addresses.length > 0 ? (
//                 addresses.map((address) => (
//                   <label
//                     key={address.$id}
//                     className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
//                       selectedAddress === address.$id ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-200 hover:bg-gray-50"
//                     }`}
//                   >
//                     <input
//                       type="radio"
//                       name="address"
//                       value={address.$id}
//                       checked={selectedAddress === address.$id}
//                       onChange={() => handleAddressSelect(address.$id)}
//                       className="mt-1 mr-4 accent-blue-600 h-5 w-5"
//                     />
//                     <div className="flex-1">
//                       <p className="font-semibold text-gray-800 text-lg">{`${address.firstName} ${address.lastName}`}</p>
//                       <p className="text-sm text-gray-600 mt-1">
//                         {address.address}, {address.cityName}, {address.stateName} - {address.pincode}
//                       </p>
//                       <p className="text-sm text-gray-500 mt-1">Mobile: {address.phoneNumber}</p>
//                     </div>
//                   </label>
//                 ))
//               ) : (
//                 <p className="text-gray-600 text-center py-4">No addresses found.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Cart Items */}
//       {data?.length > 0 ? (
//         <ul className="space-y-6">
//           {data.map((item) => {
//             const { rating, stars, reviews } = generateRating();
//             const isDeleting = deletingId === item.varientsId;

//             return (
//               <li
//                 key={item.varientsId}
//                 className={`flex flex-col md:flex-row justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 ${
//                   isDeleting ? "opacity-0 translate-x-[-100%]" : "opacity-100 translate-x-0"
//                 }`}
//               >
//                 <div
//                   className="flex items-center w-full md:w-2/5 cursor-pointer"
//                   onClick={() => handleProductDetails(item.productId)}
//                 >
//                   <Image
//                     src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${item.productImages?.$values[0]}`}
//                     alt={item.productName || "Product"}
//                     width={100}
//                     height={100}
//                     style={{ objectFit: "cover" }}
//                   />
//                   <div className="space-y-1 ml-4">
//                     <span className="font-semibold text-lg text-gray-800 hover:text-green-600 transition-colors duration-200">
//                       {item.productName || "Unnamed Product"}
//                     </span>
//                     <div className="text-xs text-gray-500">({reviews} reviews)</div>
//                     <div className="text-yellow-400 text-sm">
//                       {stars} <span className="text-gray-600 text-xs">({rating})</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text-center w-full md:w-1/5 mt-4 md:mt-0">
//                   <span className="font-semibold text-xl text-green-600">
//                     ₹{(parseFloat(item.calculatedPrice) * item.quantity).toFixed(2)}
//                   </span>
//                   <div className="text-xs text-gray-500 mt-1">({item.varientsName || "N/A"})</div>
//                 </div>
//                 <div className="flex items-center justify-between w-full md:w-2/5 mt-4 md:mt-0">
//                   <span className="text-gray-700 font-medium">Qty: {item.quantity || 0}</span>
//                   <button
//                     onClick={() => handleDeleteItem(item.varientsId, item.productId, item.minimumOrderQuantity)}
//                     className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all duration-300 shadow-sm hover:shadow-md flex items-center"
//                   >
//                     <FaTrash className="w-4 h-4" />
//                   </button>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       ) : (
//         <div className="text-center py-10">
//           <p className="text-gray-600 text-lg">Your cart is empty.</p>
//           <Link href="/">
//             <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 shadow-md">
//               Return to Shop
//             </button>
//           </Link>
//         </div>
//       )}

//       {/* Totals */}
//       {cartLength > 0 && (
//         <div className="mt-8 border-t pt-6">
//           <div className="flex flex-col md:flex-row justify-between items-center text-gray-800">
//             <h3 className="text-xl font-semibold">
//               Total Items: <span className="text-green-600">{cartLength}</span>
//             </h3>
//             <h3 className="text-xl font-semibold mt-2 md:mt-0">
//               Total Price: <span className="text-green-600">₹{totalPrice.toFixed(2)}</span>
//             </h3>
//           </div>
//           <div className="mt-6 text-center">
//             <button
//               onClick={handlePlaceOrder}
//               className="bg-green-500 text-white px-8 py-3 rounded-md hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//             >
//               Place Order
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;




// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { FaTrash } from "react-icons/fa";
// import { makeRequest } from "@/api";
// import Swal from "sweetalert2";

// const Cart = () => {
//   const router = useRouter();
//   const [data, setData] = useState([]);
//   const [cartLength, setLength] = useState(0);
//   const [deletingId, setDeletingId] = useState(null);
//   const [addresses, setAddresses] = useState([]); // State for user addresses
//   const [selectedAddress, setSelectedAddress] = useState(null); // Selected address id
//   const [isAddressModalOpen, setIsAddressModalOpen] = useState(false); // Modal visibility

//   // Fetch cart data on mount
//   const GetCartData = async () => {
//     const storedToken = localStorage.getItem("authToken");
//     try {
//       const response = await makeRequest("POST", "/Cart/GetCartData", {}, { 
//         headers: { Authorization: `Bearer ${storedToken}` } 
//       });
//       if (response && response[0] && response[0].dataset && response[0].dataset.$values) {
//         const cartItems = response[0].dataset.$values;
//         setLength(cartItems.length);
//         setData(cartItems);
//       } else {
//         setLength(0);
//         setData([]);
//         console.log("No valid dataset.$values in response, setting defaults");
//       }
//     } catch (error) {
//       setLength(0);
//       setData([]);
//       console.error("Error fetching cart data:", error);
//     }
//   };

//   // Fetch user addresses from API
//   const fetchAddresses = async () => {
//     const storedToken = localStorage.getItem("authToken");
//     const userId=localStorage.getItem("userId");
//     try {
//       const response = await makeRequest("POST", "/Authentication/GetUserProfile", {UserId:userId}, { 
//         headers: { Authorization: `Bearer ${storedToken}` } 
//       });
      
//       // Extract the addresses and pincodes
//       const addressData = response?.userProfilesEntity?.$values || [];
//       const formattedAddresses = addressData.map(addr => ({
//         id: addr.$id,
//         fullAddress: `${addr.address}, ${addr.cityName}, ${addr.stateName} - ${addr.pincode}`,
//         addressOne: `${addr.addressOne}, ${addr.cityName}, ${addr.stateName} - ${addr.pincode1}`,
//         addressTwo: `${addr.addressTwo}, ${addr.cityName}, ${addr.stateName} - ${addr.pincode2}`,
//         firstName: addr.firstName,
//         lastName: addr.lastName,
//         phoneNumber: addr.phoneNumber,
//       }));

//       setAddresses(formattedAddresses);
//       setSelectedAddress(formattedAddresses[0]?.id || null); // Default to first address id
//     } catch (error) {
//       console.error("Error fetching addresses:", error);
//       setAddresses([]);
//     }
//   };

//   useEffect(() => {
//     GetCartData();
//     fetchAddresses();
//   }, []);

//   // Calculate total price and quantity
//   const totalQuantity = data?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
//   const totalPrice = data?.reduce((total, item) => {
//     const price = parseFloat(item.calculatedPrice) || 0;
//     const qty = item.quantity || 0;
//     return total + (price * qty);
//   }, 0) || 0;

//   // Load Razorpay Script
//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   // Handle Product Details Navigation
//   const handleProductDetails = (id) => {
//     router.push(`/product/${id}`);
//   };

//   // Handle Place Order
//   const handlePlaceOrder = async () => {
//     try {
//       const storedToken = localStorage.getItem("authToken");
//       const user_id = localStorage.getItem("userId");

//       const response = await makeRequest("POST", "Order/CreateOrder", { CustomerID: user_id, VarientID: data[0]?.varientsId }, { headers: { Authorization: `Bearer ${storedToken}` } });
//       console.log(response);
//       console.log("CustomerID:", user_id, "VarientID:", data[0]?.varientsId);
      
//       if (response && response[0]?.dataset) {
//         const { id: order_id, amount, currency } = response[0].dataset;

//         const res = await loadRazorpayScript();
//         if (!res) {
//           alert("Failed to load Razorpay. Please check your connection.");
//           return;
//         }

//         const options = {
//           key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//           amount: amount * 100,
//           currency: currency,
//           name: "My E-commerce",
//           description: "Test Transaction",
//           order_id: order_id,
//           handler: async (response) => {
//             const paymentVerification = {
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_signature: response.razorpay_signature,
//             };

//             try {
//               const verifyResponse = await makeRequest(
//                 "POST",
//                 "Order/VerifyPayment",
//                 paymentVerification,
//                 { headers: { Authorization: `Bearer ${storedToken}` } }
//               );

//               if (verifyResponse) {
//                 Swal.fire("Payment Verified! ✅", "", "success").then(() => router.push("/order-success"));
//               } else {
//                 Swal.fire("Payment Verification Failed! ❌", "", "error");
//               }
//             } catch (error) {
//               console.error("Error Verifying Payment:", error);
//               Swal.fire("Payment Verification Error", "", "error");
//             }
//           },
//           prefill: {
//             name: "John Doe",
//             email: "johndoe@example.com",
//             contact: "9999999999",
//           },
//           theme: {
//             color: "#3399cc",
//           },
//         };

//         const razorpay = new window.Razorpay(options);
//         razorpay.on("payment.failed", (response) => {
//           console.error("Payment Failed:", response.error);
//           Swal.fire("Payment Failed!", "Please try again.", "error");
//         });
//         razorpay.open();
//       } else {
//         Swal.fire("Failed to create order", "", "error");
//       }
//     } catch (error) {
//       console.error("Error Creating Order:", error);
//       Swal.fire("Something went wrong!", "Unable to place the order.", "error");
//     }
//   };

//   // Handle Delete Item with Animation
//   const handleDeleteItem = async (VARIENTS_ID, PROD_ID, Quantity) => {
//     setDeletingId(VARIENTS_ID);
//     const storedToken = localStorage.getItem("authToken");
//     const UserId = localStorage.getItem("userId");

//     try {
//       const response = await makeRequest(
//         "POST",
//         "/Cart/UpdateCartData",
//         { USERID: UserId, VARIENTS_ID: VARIENTS_ID, PROD_ID: PROD_ID, Quantity: Quantity },
//         { headers: { Authorization: `Bearer ${storedToken}` } }
//       );

//       if (response[0].retval === "SUCCESS" && response[0].message === "SUCCESS") {
//         setTimeout(() => {
//           Swal.fire({
//             title: "Success",
//             text: "Successfully deleted item",
//             icon: "success",
//             confirmButtonText: "OK",
//           }).then((result) => {
//             if (result.isConfirmed) {
//               GetCartData();
//               setDeletingId(null);
//             }
//           });
//         }, 500);
//       } else {
//         setDeletingId(null);
//         Swal.fire("Failed to delete item", "", "error");
//       }
//     } catch (error) {
//       setDeletingId(null);
//       console.error("Delete error:", error);
//       Swal.fire("Network Issue", "Failed to delete item", "error");
//     }
//   };

//   // Handle address selection
//   const handleAddressSelect = (addressId) => {
//     setSelectedAddress(addressId);
//     setIsAddressModalOpen(false);
//   };

//   return (
//     <div className="container mx-auto p-6 bg-white shadow-lg rounded-xl font-poppins max-w-6xl">
//       {/* Address Section */}
//       <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
//         <div className="flex justify-between items-center">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-800">
//               Deliver to: {selectedAddress ? `${addresses.find(addr => addr.id === selectedAddress)?.firstName} ${addresses.find(addr => addr.id === selectedAddress)?.lastName}` : "Select an address"}
//             </h3>
//             {selectedAddress && (
//               <p className="text-sm text-gray-600">
//                 {addresses.find(addr => addr.id === selectedAddress)?.fullAddress}
//               </p>
//             )}
//           </div>
//           <button
//             onClick={() => setIsAddressModalOpen(true)}
//             className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
//           >
//             Change
//           </button>
//         </div>
//       </div>

//       {/* Address Selection Modal */}
//       {isAddressModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-xl">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-xl font-semibold text-gray-800">Select Delivery Address</h3>
//               <button
//                 onClick={() => setIsAddressModalOpen(false)}
//                 className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="space-y-4">
//               {addresses.length > 0 ? (
//                 addresses.map((address) => (
//                   <label
//                     key={address.id}
//                     className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all duration-200 ${selectedAddress === address.id ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-200 hover:bg-gray-50"}`}
//                   >
//                     <input
//                       type="radio"
//                       name="address"
//                       value={address.id}
//                       checked={selectedAddress === address.id}
//                       onChange={() => handleAddressSelect(address.id)}
//                       className="mt-1 mr-4 accent-blue-600 h-5 w-5"
//                     />
//                     <div className="flex-1">
//                       <p className="font-semibold text-gray-800 text-lg">{`${address.firstName} ${address.lastName}`}</p>
//                       <p className="text-sm text-gray-600 mt-1">{address.fullAddress}</p>
//                       <p className="text-sm text-gray-600 mt-1">{address.addressOne}</p>
//                       <p className="text-sm text-gray-600 mt-1">{address.addressTwo}</p>
//                       <p className="text-sm text-gray-500 mt-1">Mobile: {address.phoneNumber}</p>
//                     </div>
//                   </label>
//                 ))
//               ) : (
//                 <p className="text-gray-600 text-center py-4">No addresses found.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Cart Items */}
//       {data?.length > 0 ? (
//         <ul className="space-y-6">
//           {data.map((item) => {
//             const isDeleting = deletingId === item.varientsId;

//             return (
//               <li
//                 key={item.varientsId}
//                 className={`flex flex-col md:flex-row justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 ${isDeleting ? "opacity-0 translate-x-[-100%]" : "opacity-100 translate-x-0"}`}
//               >
//                 <div
//                   className="flex items-center w-full md:w-2/5 cursor-pointer"
//                   onClick={() => handleProductDetails(item.productId)}
//                 >
//                   <Image
//                     src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${item.productImages?.$values[0]}`}
//                     alt={item.productName || "Product"}
//                     width={100}
//                     height={100}
//                     style={{ objectFit: "cover" }}
//                   />
//                   <div className="space-y-1 ml-4">
//                     <span className="font-semibold text-lg text-gray-800 hover:text-green-600 transition-colors duration-200">
//                       {item.productName || "Unnamed Product"}
//                     </span>
//                     <div className="text-xs text-gray-500">({item.reviews || 0} reviews)</div>
//                     <div className="text-yellow-400 text-sm">
//                       {"★".repeat(item.rating)} <span className="text-gray-600 text-xs">({item.rating})</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="text-center w-full md:w-1/5 mt-4 md:mt-0">
//                   <span className="font-semibold text-xl text-green-600">
//                     ₹{(parseFloat(item.calculatedPrice) * item.quantity).toFixed(2)}
//                   </span>
//                   <div className="text-xs text-gray-500 mt-1">({item.varientsName || "N/A"})</div>
//                 </div>
//                 <div className="flex items-center justify-between w-full md:w-2/5 mt-4 md:mt-0">
//                   <span className="text-gray-700 font-medium">Qty: {item.quantity || 0}</span>
//                   <button
//                     onClick={() => handleDeleteItem(item.varientsId, item.productId, item.minimumOrderQuantity)}
//                     className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all duration-300 shadow-sm hover:shadow-md flex items-center"
//                   >
//                     <FaTrash className="w-4 h-4" />
//                   </button>
//                 </div>
//               </li>
//             );
//           })}
//         </ul>
//       ) : (
//         <div className="text-center py-10">
//           <p className="text-gray-600 text-lg">Your cart is empty.</p>
//           <Link href="/">
//             <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 shadow-md">
//               Return to Shop
//             </button>
//           </Link>
//         </div>
//       )}

//       {/* Totals */}
//       {cartLength > 0 && (
//         <div className="mt-8 border-t pt-6">
//           <div className="flex flex-col md:flex-row justify-between items-center text-gray-800">
//             <h3 className="text-xl font-semibold">
//               Total Items: <span className="text-green-600">{cartLength}</span>
//             </h3>
//             <h3 className="text-xl font-semibold mt-2 md:mt-0">
//               Total Price: <span className="text-green-600">₹{totalPrice.toFixed(2)}</span>
//             </h3>
//           </div>
//           <div className="mt-6 text-center">
//             <button
//               onClick={handlePlaceOrder}
//               className="bg-green-500 text-white px-8 py-3 rounded-md hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
//             >
//               Place Order
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;



import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { makeRequest } from "@/api";
import Swal from "sweetalert2";

const Cart = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [cartLength, setLength] = useState(0);
  const [deletingId, setDeletingId] = useState(null);
  const [addresses, setAddresses] = useState([]); // State for user addresses
  const [selectedAddress, setSelectedAddress] = useState(null); // Selected address id
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false); // Modal visibility

  // Fetch cart data on mount
  const GetCartData = async () => {
    const storedToken = localStorage.getItem("authToken");
    try {
      const response = await makeRequest("POST", "/Cart/GetCartData", {}, { 
        headers: { Authorization: `Bearer ${storedToken}` } 
      });
      if (response && response[0] && response[0].dataset && response[0].dataset.$values) {
        const cartItems = response[0].dataset.$values;
        setLength(cartItems.length);
        setData(cartItems);
      } else {
        setLength(0);
        setData([]);
        console.log("No valid dataset.$values in response, setting defaults");
      }
    } catch (error) {
      setLength(0);
      setData([]);
      console.error("Error fetching cart data:", error);
    }
  };

  // Fetch user addresses from API
  const fetchAddresses = async () => {
    const storedToken = localStorage.getItem("authToken");
    const userId=localStorage.getItem("userId");
        try {
          const response = await makeRequest("POST", "/Authentication/GetUserProfile", {UserId:userId}, { 
            headers: { Authorization: `Bearer ${storedToken}` } 
          });
      // Extract the addresses and pincodes
      const addressData = response?.userProfilesEntity?.$values || [];
      const formattedAddresses = addressData.flatMap(addr => [
        {
          id: addr.$id,
          fullAddress: `${addr.address}, ${addr.cityName}, ${addr.stateName} - ${addr.pincode}`,
          firstName: addr.firstName,
          lastName: addr.lastName,
          phoneNumber: addr.phoneNumber,
        },
        {
          id: addr.$id + "_1", // Unique ID for addressOne
          fullAddress: `${addr.addressOne}, ${addr.cityName}, ${addr.stateName} - ${addr.pincode1}`,
          firstName: addr.firstName,
          lastName: addr.lastName,
          phoneNumber: addr.phoneNumber,
        },
        {
          id: addr.$id + "_2", // Unique ID for addressTwo
          fullAddress: `${addr.addressTwo}, ${addr.cityName}, ${addr.stateName} - ${addr.pincode2}`,
          firstName: addr.firstName,
          lastName: addr.lastName,
          phoneNumber: addr.phoneNumber,
        }
      ]);

      setAddresses(formattedAddresses);
      setSelectedAddress(formattedAddresses[0]?.id || null); // Default to first address id
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setAddresses([]);
    }
  };

  useEffect(() => {
    GetCartData();
    fetchAddresses();
  }, []);

  // Calculate total price and quantity
  const totalQuantity = data?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
  const totalPrice = data?.reduce((total, item) => {
    const price = parseFloat(item.calculatedPrice) || 0;
    const qty = item.quantity || 0;
    return total + (price * qty);
  }, 0) || 0;

  // Load Razorpay Script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Handle Product Details Navigation
  const handleProductDetails = (id) => {
    router.push(`/product/${id}`);
  };

  // Handle Place Order
  const handlePlaceOrder = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const user_id = localStorage.getItem("userId");

      const response = await makeRequest("POST", "Order/CreateOrder", { CustomerID: user_id, VarientID: data[0]?.varientsId }, { headers: { Authorization: `Bearer ${storedToken}` } });
      console.log(response);
      console.log("CustomerID:", user_id, "VarientID:", data[0]?.varientsId);
      
      if (response && response[0]?.dataset) {
        const { id: order_id, amount, currency } = response[0].dataset;

        const res = await loadRazorpayScript();
        if (!res) {
          alert("Failed to load Razorpay. Please check your connection.");
          return;
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: amount * 100,
          currency: currency,
          name: "My E-commerce",
          description: "Test Transaction",
          order_id: order_id,
          handler: async (response) => {
            const paymentVerification = {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            };

            try {
              const verifyResponse = await makeRequest(
                "POST",
                "Order/VerifyPayment",
                paymentVerification,
                { headers: { Authorization: `Bearer ${storedToken}` } }
              );

              if (verifyResponse) {
                Swal.fire("Payment Verified! ✅", "", "success").then(() => router.push("/order-success"));
              } else {
                Swal.fire("Payment Verification Failed! ❌", "", "error");
              }
            } catch (error) {
              console.error("Error Verifying Payment:", error);
              Swal.fire("Payment Verification Error", "", "error");
            }
          },
          prefill: {
            name: "John Doe",
            email: "johndoe@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.on("payment.failed", (response) => {
          console.error("Payment Failed:", response.error);
          Swal.fire("Payment Failed!", "Please try again.", "error");
        });
        razorpay.open();
      } else {
        Swal.fire("Failed to create order", "", "error");
      }
    } catch (error) {
      console.error("Error Creating Order:", error);
      Swal.fire("Something went wrong!", "Unable to place the order.", "error");
    }
  };

  // Handle Delete Item with Animation
  const handleDeleteItem = async (VARIENTS_ID, PROD_ID, Quantity) => {
    setDeletingId(VARIENTS_ID);
    const storedToken = localStorage.getItem("authToken");
    const UserId = localStorage.getItem("userId");

    try {
      const response = await makeRequest(
        "POST",
        "/Cart/UpdateCartData",
        { USERID: UserId, VARIENTS_ID: VARIENTS_ID, PROD_ID: PROD_ID, Quantity: Quantity },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      if (response[0].retval === "SUCCESS" && response[0].message === "SUCCESS") {
        setTimeout(() => {
          Swal.fire({
            title: "Success",
            text: "Successfully deleted item",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              GetCartData();
              setDeletingId(null);
            }
          });
        }, 500);
      } else {
        setDeletingId(null);
        Swal.fire("Failed to delete item", "", "error");
      }
    } catch (error) {
      setDeletingId(null);
      console.error("Delete error:", error);
      Swal.fire("Network Issue", "Failed to delete item", "error");
    }
  };

  // Handle address selection
  const handleAddressSelect = (addressId) => {
    setSelectedAddress(addressId);
    setIsAddressModalOpen(false);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-xl font-poppins max-w-6xl">
      {/* Address Section */}
      <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Deliver to: {selectedAddress ? `${addresses.find(addr => addr.id === selectedAddress)?.firstName} ${addresses.find(addr => addr.id === selectedAddress)?.lastName}` : "Select an address"}
            </h3>
            {selectedAddress && (
              <p className="text-sm text-gray-600">
                {addresses.find(addr => addr.id === selectedAddress)?.fullAddress}
              </p>
            )}
          </div>
          <button
            onClick={() => setIsAddressModalOpen(true)}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
          >
            Change
          </button>
        </div>
      </div>

      {/* Address Selection Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Select Delivery Address</h3>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="text-gray-600 hover:text-gray-800 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              {addresses.length > 0 ? (
                addresses.map((address) => (
                  <label
                    key={address.id}
                    className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all duration-200 ${selectedAddress === address.id ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-200 hover:bg-gray-50"}`}
                  >
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      checked={selectedAddress === address.id}
                      onChange={() => handleAddressSelect(address.id)}
                      className="mt-1 mr-4 accent-blue-600 h-5 w-5"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-lg">{`${address.firstName} ${address.lastName}`}</p>
                      <p className="text-sm text-gray-600 mt-1">{address.fullAddress}</p>
                    </div>
                  </label>
                ))
              ) : (
                <p className="text-gray-600 text-center py-4">No addresses found.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart Items */}
      {data?.length > 0 ? (
        <ul className="space-y-6">
          {data.map((item) => {
            const isDeleting = deletingId === item.varientsId;

            return (
              <li
                key={item.varientsId}
                className={`flex flex-col md:flex-row justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 ${isDeleting ? "opacity-0 translate-x-[-100%]" : "opacity-100 translate-x-0"}`}
              >
                <div
                  className="flex items-center w-full md:w-2/5 cursor-pointer"
                  onClick={() => handleProductDetails(item.productId)}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${item.productImages?.$values[0]}`}
                    alt={item.productName || "Product"}
                    width={100}
                    height={100}
                    style={{ objectFit: "cover" }}
                  />
                  <div className="space-y-1 ml-4">
                    <span className="font-semibold text-lg text-gray-800 hover:text-green-600 transition-colors duration-200">
                      {item.productName || "Unnamed Product"}
                    </span>
                    <div className="text-xs text-gray-500">({item.reviews || 0} reviews)</div>
                    <div className="text-yellow-400 text-sm">
                      {"★".repeat(item.rating)} <span className="text-gray-600 text-xs">({item.rating})</span>
                    </div>
                  </div>
                </div>
                <div className="text-center w-full md:w-1/5 mt-4 md:mt-0">
                  <span className="font-semibold text-xl text-green-600">
                    ₹{(parseFloat(item.calculatedPrice) * item.quantity).toFixed(2)}
                  </span>
                  <div className="text-xs text-gray-500 mt-1">({item.varientsName || "N/A"})</div>
                </div>
                <div className="flex items-center justify-between w-full md:w-2/5 mt-4 md:mt-0">
                  <span className="text-gray-700 font-medium">Qty: {item.quantity || 0}</span>
                  <button
                    onClick={() => handleDeleteItem(item.varientsId, item.productId, item.minimumOrderQuantity)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all duration-300 shadow-sm hover:shadow-md flex items-center"
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
          <Link href="/">
            <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all duration-300 shadow-md">
              Return to Shop
            </button>
          </Link>
        </div>
      )}

      {/* Totals */}
      {cartLength > 0 && (
        <div className="mt-8 border-t pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-800">
            <h3 className="text-xl font-semibold">
              Total Items: <span className="text-green-600">{cartLength}</span>
            </h3>
            <h3 className="text-xl font-semibold mt-2 md:mt-0">
              Total Price: <span className="text-green-600">₹{totalPrice.toFixed(2)}</span>
            </h3>
          </div>
          <div className="mt-6 text-center">
            <button
              onClick={handlePlaceOrder}
              className="bg-green-500 text-white px-8 py-3 rounded-md hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
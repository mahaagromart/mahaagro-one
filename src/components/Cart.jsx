


// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { FaTrash } from "react-icons/fa";
// import { makeRequest } from "@/api";
// import Swal from "sweetalert2";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// const Cart = () => {
//   const router = useRouter();
//   const [data, setData] = useState([]);
//   const [cartLength, setLength] = useState(0);
//   const [deletingId, setDeletingId] = useState(null);
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(1); // Default to Address 1
//   const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
//   const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [availability, setAvailability] = useState(null);
//   const [deliverydata, setDeliveryData] = useState([]);
//   const [isPincodeValid, setIsPincodeValid] = useState(false);

//   const Loader = () => (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
//       <p className="mt-4 text-lg text-gray-600">Loading product details...</p>
//     </div>
//   );

//   const CalculateDeliveryCharge = (data) => {
//     let totalDeliveryCharges = 0;

//     data.forEach((item) => {
//       const quantity = parseInt(item.quantity || 1);
//       const length = parseFloat(item.packageLength || 0);
//       const width = parseFloat(item.packageWidth || 0);
//       const height = parseFloat(item.packageHeight || 0);
//       const weight = parseFloat(item.packageWeight || 0);

//       const volumetricWeight = (length * width * height) / 5000;
//       const finalWeightPerUnit = Math.max(volumetricWeight, weight * quantity);

//       let deliveryChargePerUnit = 90; // base charge for up to 2kg
//       if (finalWeightPerUnit > 2000) {
//         const extraWeight = finalWeightPerUnit - 2000;
//         const extraKg = Math.ceil(extraWeight / 1000);
//         deliveryChargePerUnit += extraKg * 35;
//       }

//       const gst = deliveryChargePerUnit * 0.18;
//       const totalPerUnit = deliveryChargePerUnit + gst;

//       totalDeliveryCharges += totalPerUnit;
//     });

//     return Math.round(totalDeliveryCharges);
//   };

//   const GetCartData = async (retries = 2) => {
//     setLoading(true);
//     const storedToken = localStorage.getItem("authToken");

//     if (!storedToken) {
//       setLoading(false);
//       Swal.fire("Session Expired", "Please log in to view your cart.", "warning");
//       router.push("/login");
//       return;
//     }

//     try {
//       const response = await makeRequest("POST", "/Cart/GetCartData", {}, {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       });

//       if (response && Array.isArray(response) && response[0]?.dataset?.$values) {
//         const cartItems = response[0].dataset.$values;
//         setLength(cartItems.length);
//         setData(cartItems);
//         setDeliveryData(cartItems);
//       } else {
//         console.warn("No valid cart data found in response:", response);
//         setLength(0);
//         setData([]);
//         setDeliveryData([]);
//       }
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//       if (retries > 0) {
//         console.log(`Retrying... (${retries} attempts left)`);
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         return GetCartData(retries - 1);
//       }
//       setLength(0);
//       setData([]);
//       setDeliveryData([]);
//       Swal.fire("Error", "Failed to fetch cart data. Please try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkPincodeAvailability = async (pin) => {
//     if (!pin || pin.length !== 6 || !deliverydata.length) {
//       setAvailability({
//         available: false,
//         message: !deliverydata.length ? "Cart is empty" : "Invalid pincode",
//       });
//       setIsPincodeValid(false);
//       return;
//     }

//     try {
//       const response = await makeRequest(
//         "GET",
//         `/Order/GetServiceAvailability?pincode=${pin}`
//       );

//       if (response.retval === "SUCCESS") {
//         const charges = CalculateDeliveryCharge(deliverydata);
//         setAvailability({
//           available: true,
//           deliveryDate: getDeliveryDatePlus8Days(),
//           deliveryCharge: charges,
//         });
//         setIsPincodeValid(true);
//       } else {
//         setAvailability({
//           available: false,
//           message: "Delivery not available for this pincode",
//         });
//         setIsPincodeValid(false);
//       }
//     } catch (error) {
//       console.error("Error checking pincode availability:", error);
//       setAvailability({
//         available: false,
//         message: "Error checking availability",
//       });
//       setIsPincodeValid(false);
//     }
//   };

//   const getDeliveryDatePlus8Days = () => {
//     const date = new Date();
//     date.setDate(date.getDate() + 8);
//     return date.toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const fetchAddresses = async () => {
//     const storedToken = localStorage.getItem("authToken");
//     const userId = localStorage.getItem("userId");

//     try {
//       const response = await makeRequest(
//         "POST",
//         "/Authentication/GetUserProfile",
//         { UserId: userId },
//         { headers: { Authorization: `Bearer ${storedToken}` } }
//       );
//       console.log(response)

//       const addressData = response?.userProfilesEntity?.$values || [];
//       const formattedAddresses = addressData
//         .flatMap((addr) => {
//           const addressList = [
//             { address: addr.address, pincode: addr.pincode, isDefault: true },
//             { address: addr.addressOne, pincode: addr.pincode1 },
//             { address: addr.addressTwo, pincode: addr.pincode2 },
//             { address: addr.address_Three, pincode: addr.pincode3 },
//             { address: addr.address_Four, pincode: addr.pincode4 },
//           ];
//           return addressList
//             .map((item, index) => ({
//               ...item,
//               id: index + 1, // 1-based indexing (1 to 5)
//               fullAddress: item.address?.trim() && item.pincode?.trim() ? `${item.address}, ${item.pincode}` : null,
//             }))
//             .filter((item) => item.fullAddress);
//         });

//       setAddresses(formattedAddresses);
//       if (formattedAddresses.length > 0) {
//         setSelectedAddress(1); // Default to Address 1
//         // Update backend to set SelectedAddressBlock to 1
//         try {
//           await makeRequest(
//             "POST",
//             "/Authentication/UpdateAddressIndex",
//             { UserId: userId, SelectedAddressBlock: 1 },
//             { headers: { Authorization: `Bearer ${storedToken}` } }
//           );
//         } catch (error) {
//           console.error("Error setting default address index:", error);
//         }
//       } else {
//         setSelectedAddress(null);
//         setIsPincodeValid(false);
//         setAvailability({
//           available: false,
//           message: "No addresses available",
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching addresses:", error);
//       setAddresses([]);
//       setSelectedAddress(null);
//       setIsPincodeValid(false);
//       setAvailability({
//         available: false,
//         message: "Error fetching addresses",
//       });
//     }
//   };

//   const handleAddAddress = async (values, { resetForm }) => {
//     const storedToken = localStorage.getItem("authToken");
//     const userId = localStorage.getItem("userId");
//     const nextIndex = addresses.length + 1; // Next available index (1 to 5)

//     if (nextIndex > 5) {
//       Swal.fire("Error", "Maximum of 5 addresses allowed.", "error");
//       return;
//     }

//     try {
//       const response = await makeRequest(
//         "POST",
//         "/Authentication/EditAddressPincode", // Adjust endpoint as needed
//         {
//           UserId: userId,
//           SelectedAddressBlock: nextIndex,
//           Address: values.address,
//           pincode: values.pincode,
//         },
//         { headers: { Authorization: `Bearer ${storedToken}` } }
//       );

//       if (response.retval === "SUCCESS") {
//         await fetchAddresses(); // Refresh addresses
//         setSelectedAddress(nextIndex); // Select the new address
//         setIsAddAddressModalOpen(false);
//         resetForm();
//         Swal.fire("Success", "Address added successfully.", "success");
//       } else {
//         Swal.fire("Error", "Failed to add address.", "error");
//       }
//     } catch (error) {
//       console.error("Error adding address:", error);
//       Swal.fire("Error", "Failed to add address.", "error");
//     }
//   };

//   useEffect(() => {

//     const initialize = async () => {
//       setLoading(true);
//       await GetCartData();
//       await fetchAddresses();
//       if (addresses.length > 0 && deliverydata.length > 0) {
//         const initialAddress = addresses.find((addr) => addr.id === 1);
//         if (initialAddress) {
//           await checkPincodeAvailability(initialAddress.pincode);
//         }
//       }
//       setLoading(false);
//     };
//     initialize();
//   }, []);

//   useEffect(() => {
//     if (selectedAddress !== null && addresses.length > 0 && deliverydata.length > 0) {
//       const selectedAddr = addresses.find((addr) => addr.id === selectedAddress);
//       if (selectedAddr) {
//         checkPincodeAvailability(selectedAddr.pincode);
//       }
//     }
//   }, [addresses, deliverydata, selectedAddress]);

//   const handleAddressSelect = async (addressId) => {
//     setSelectedAddress(addressId);
//     const selectedAddr = addresses.find((addr) => addr.id === addressId);
//     if (selectedAddr) {
//       await checkPincodeAvailability(selectedAddr.pincode);
//       // Update backend with new selected address index
//       try {
//         const storedToken = localStorage.getItem("authToken");
//         const response = await makeRequest(
//           "POST",
//           "/Authentication/UpdateAddressIndex",
//           { UserId: localStorage.getItem("userId"), SelectedAddressBlock: addressId },
//           { headers: { Authorization: `Bearer ${storedToken}` } }
//         );
//         if (response.retval !== "SUCCESS") {
//           console.warn("Failed to update address index in backend");
//         }
//       } catch (error) {
//         console.error("Error updating address index:", error);
//       }
//     }
//     setIsAddressModalOpen(false);
//   };

//   const addressValidationSchema = Yup.object({
//     address: Yup.string().required("Address is required"),
//     pincode: Yup.string()
//       .matches(/^\d{6}$/, "Pincode must be 6 digits")
//       .required("Pincode is required"),
//   });

//   const totalQuantity = data?.reduce(
//     (total, item) => total + (item.quantity || 0),
//     0
//   ) || 0;
//   const totalPrice = data?.reduce((total, item) => {
//     const price = parseFloat(item.pricing) || 0;
//     const qty = item.quantity || 0;
//     return total + price * qty;
//   }, 0) || 0;

//   const ActualPrice = data?.reduce((total, item) => {
//     const qty = item.quantity || 1;
//     const calculatePrice = item.calculatedPrice || 0;
//     return total + calculatePrice * qty;
//   }, 0) || 0;

//   const discount = data?.reduce((total, item) => {
//     const discountAmt = parseFloat(item.discountAmount) || 0;
//     const qty = item.quantity || 0;
//     if (item.discountType === "Flat") {
//       return total + discountAmt * qty;
//     } else if (item.discountType === "Percentage") {
//       const price = parseFloat(item.calculatedPrice) || 0;
//       return total + ((price * discountAmt) / 100) * qty;
//     }
//     return total;
//   }, 0) || 0;

//   const deliveryCharge = CalculateDeliveryCharge(data);
//   const totalAmount = ActualPrice + deliveryCharge;

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handleProductDetails = (id) => {
//     router.push(`/product/${id}`);
//   };

//   const handlePlaceOrder = async () => {
//     console.log(selectedAddress)
//     if (selectedAddress === null || data?.length === 0 || !isPincodeValid) {
//       Swal.fire(
//         "Cannot place order",
//         "Please select a valid address with available delivery.",
//         "warning"
//       );
//       return;
//     }

//     const selectedAddressObj = addresses.find(
//       (addr) => addr.id === selectedAddress
//     );
//     const cartItems = data;

//     const storedToken = localStorage.getItem("authToken");
//     const variantIDs = cartItems.map(
//       (item) => `${item.varientsId},${item.quantity}`
//     );

//     const payload = {
//       varientID: variantIDs,
//       DeliveryAddress: selectedAddressObj.fullAddress,
//     };

//     try {
//       const response = await makeRequest("POST", "Order/CreateOrder", payload, {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       });

//       if (!response || !response.dataset || !response.dataset.orderDetails) {
//         Swal.fire("Order creation failed", "No order details returned", "error");
//         return;
//       }

//       const orderDetails = response.dataset.orderDetails;
//       const { id: order_id, amount, currency } = orderDetails;

//       const razorpayLoaded = await loadRazorpayScript();
//       if (!razorpayLoaded) {
//         Swal.fire("Failed to load Razorpay", "", "error");
//         return;
//       }

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount,
//         currency,
//         name: "Mahaagromart",
//         description: "Order Payment",
//         order_id,
//         handler: async (response) => {
//           const paymentVerification = {
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_signature: response.razorpay_signature,
//           };

//           try {
//             const verifyResponse = await makeRequest(
//               "POST",
//               "Order/VerifyPayment",
//               paymentVerification,
//               {
//                 headers: { Authorization: `Bearer ${storedToken}` },
//               }
//             );

//             if (verifyResponse) {
//               for (const item of cartItems) {
//                 await handleDeleteItem(
//                   item.varientsId,
//                   item.productId,
//                   item.minimumOrderQuantity
//                 );
//               }
//               Swal.fire(
//                 "Payment Successful!",
//                 "Your order has been placed.",
//                 "success"
//               );
//               router.push("/Ordertrack");
//             } else {
//               Swal.fire("Payment Verification Failed! ❌", "", "error");
//             }
//           } catch (error) {
//             console.error("Error verifying payment:", error);
//             Swal.fire("Payment Verification Error", "", "error");
//           }
//         },
//         prefill: {
//           name: `${localStorage.getItem("firstName")} ${localStorage.getItem(
//             "lastName"
//           )}`,
//           email: localStorage.getItem("email") || "mahaagromart.com",
//           contact: localStorage.getItem("phone") || "",
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const razorpay = new window.Razorpay(options);

//       razorpay.on("payment.failed", (response) => {
//         console.error("Payment Failed:", response.error);
//         Swal.fire("Payment Failed!", "Please try again.", "error");
//       });

//       razorpay.open();
//     } catch (error) {
//       console.error("Order creation error:", error);
//       Swal.fire("Something went wrong!", "Unable to place the order.", "error");
//     }
//   };

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

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <div className="container mx-auto p-4 md:p-8 bg-gray-100 rounded-xl font-poppins max-w-7xl">
//       {/* Address Section */}
//       <div className="mb-8 p-6 bg-white rounded-lg border border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-xl font-semibold text-gray-800">Delivery Address</h3>
//           <button
//             onClick={() => setIsAddressModalOpen(true)}
//             className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center transition-colors duration-200"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-4 w-4 mr-1"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//               />
//             </svg>
//             Change Address
//           </button>
//         </div>

//         {addresses.length > 0 && selectedAddress !== null ? (
//           <div className="p-4 rounded-lg border border-blue-500 bg-blue-50 transition-all duration-200">
//             <div className="flex items-start">
//               <div className="flex-shrink-0 h-6 w-6 rounded-full border border-blue-500 bg-blue-500 flex items-center justify-center mt-0.5 mr-3">
//                 <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                   <path
//                     fillRule="evenodd"
//                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//               </div>
//               <div>
//                 <div className="flex items-center">
//                   <h4 className="font-semibold text-gray-900">Selected Address</h4>
//                   <span className="ml-3 px-2.5 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
//                     {addresses.find((addr) => addr.id === selectedAddress)?.isDefault
//                       ? "Default"
//                       : `Address ${selectedAddress}`}
//                   </span>
//                 </div>
//                 <p className="mt-1 text-sm text-gray-700">
//                   {addresses.find((addr) => addr.id === selectedAddress)?.address}
//                 </p>
//                 <div className="mt-2 flex items-center text-sm text-gray-600">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 mr-1.5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4-4.243a8 8 0 1111.314 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   </svg>
//                   Pincode: <span className="font-medium">
//                     {addresses.find((addr) => addr.id === selectedAddress)?.pincode}
//                   </span>
//                 </div>
//                 {availability && (
//                   <div className="mt-2 text-sm">
//                     {availability.available ? (
//                       <p className="text-green-600 font-medium">
//                         Delivery available by <strong>{availability.deliveryDate}</strong>
//                       </p>
//                     ) : (
//                       <p className="text-red-600 font-medium">{availability.message}</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-12 w-12 mx-auto text-gray-400"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4-4.243a8 8 0 1111.314 0z"
//               />
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//               />
//             </svg>
//             <p className="mt-3 text-gray-600 font-medium">No addresses found</p>
//             <button
//               onClick={() => setIsAddAddressModalOpen(true)}
//               className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
//             >
//               + Add New Address
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Address Selection Modal */}
//       {isAddressModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
//           <div className="bg-white rounded-xl p-8 w-full max-w-md max-h-[80vh] overflow-y-auto shadow-2xl transform transition-all duration-300 scale-100">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-2xl font-bold text-gray-800">Select Delivery Address</h3>
//               <button
//                 onClick={() => setIsAddressModalOpen(false)}
//                 className="text-gray-600 hover:text-gray-800 text-2xl font-bold transition-colors duration-200"
//               >
//                 ×
//               </button>
//             </div>
//             <div className="space-y-4">
//               {addresses.length > 0 ? (
//                 addresses.map((address) => (
//                   <div
//                     key={address.id}
//                     className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer hover:shadow-lg ${
//                       selectedAddress === address.id
//                         ? "border-blue-600 bg-blue-50 shadow-md"
//                         : "border-gray-200 hover:border-gray-400"
//                     }`}
//                     onClick={() => handleAddressSelect(address.id)}
//                   >
//                     <div className="flex items-start">
//                       <div
//                         className={`flex-shrink-0 h-6 w-6 rounded-full border flex items-center justify-center mt-0.5 mr-3 ${
//                           selectedAddress === address.id
//                             ? "border-blue-600 bg-blue-600"
//                             : "border-gray-300"
//                         }`}
//                       >
//                         {selectedAddress === address.id && (
//                           <svg
//                             className="h-4 w-4 text-white"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         )}
//                       </div>
//                       <div>
//                         <div className="flex items-center">
//                           <h4 className="font-semibold text-gray-900">
//                             Address {address.id}
//                           </h4>
//                           {address.isDefault && (
//                             <span className="ml-3 px-2.5 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
//                               Default
//                             </span>
//                           )}
//                         </div>
//                         <p className="mt-1 text-sm text-gray-700">{address.address}</p>
//                         <div className="mt-2 flex items-center text-sm text-gray-600">
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-5 w-5 mr-1.5"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4-4.243a8 8 0 1111.314 0z"
//                             />
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                             />
//                           </svg>
//                           Pincode: <span className="font-medium">{address.pincode}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-12 w-12 mx-auto text-gray-400"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1.5}
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4-4.243a8 8 0 1111.314 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={1.5}
//                       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   </svg>
//                   <p className="mt-3 text-gray-600 font-medium">No addresses found</p>
//                   <button
//                     onClick={() => {
//                       setIsAddressModalOpen(false);
//                       setIsAddAddressModalOpen(true);
//                     }}
//                     className="mt-4 text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
//                   >
//                     + Add New Address
//                   </button>
//                 </div>
//               )}
//             </div>
//             {addresses.length < 5 && (
//               <div className="mt-6 flex justify-end">
//                 <button
//                   onClick={() => {
//                     setIsAddressModalOpen(false);
//                     setIsAddAddressModalOpen(true);
//                   }}
//                   className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
//                 >
//                   + Add New Address
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Add Address Modal */}
//       {isAddAddressModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity duration-300">
//           <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl transform transition-all duration-300 scale-100">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-2xl font-bold text-gray-800">Add New Address</h3>
//               <button
//                 onClick={() => setIsAddAddressModalOpen(false)}
//                 className="text-gray-600 hover:text-gray-800 text-2xl font-bold transition-colors duration-200"
//               >
//                 ×
//               </button>
//             </div>
//             <Formik
//               initialValues={{ address: "", pincode: "" }}
//               validationSchema={addressValidationSchema}
//               onSubmit={handleAddAddress}
//             >
//               {({ isSubmitting }) => (
//                 <Form className="space-y-4">
//                   <div>
//                     <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                       Address
//                     </label>
//                     <Field
//                       type="text"
//                       name="address"
//                       className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                     />
//                     <ErrorMessage
//                       name="address"
//                       component="div"
//                       className="text-red-600 text-sm mt-1"
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
//                       Pincode
//                     </label>
//                     <Field
//                       type="text"
//                       name="pincode"
//                       className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                     />
//                     <ErrorMessage
//                       name="pincode"
//                       component="div"
//                       className="text-red-600 text-sm mt-1"
//                     />
//                   </div>
//                   <div className="flex justify-end space-x-4">
//                     <button
//                       type="button"
//                       onClick={() => setIsAddAddressModalOpen(false)}
//                       className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-md"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       disabled={isSubmitting}
//                       className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-all duration-200 disabled:bg-gray-400"
//                     >
//                       Save Address
//                     </button>
//                   </div>
//                 </Form>
//               )}
//             </Formik>
//           </div>
//         </div>
//       )}

//       {/* Main Content */}
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Cart Items - Left Side */}
//         <div className="lg:w-8/12">
//           {data?.length > 0 ? (
//             <ul className="space-y-6">
//               {data.map((item) => {
//                 const isDeleting = deletingId === item.varientsId;

//                 return (
//                   <li
//                     key={item.varientsId}
//                     className={`flex flex-col md:flex-row justify-between items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-500 ${
//                       isDeleting ? "opacity-0 translate-x-[-100%]" : "opacity-100 translate-x-0"
//                     }`}
//                   >
//                     <div
//                       className="flex items-center w-full md:w-2/5 cursor-pointer"
//                       onClick={() => handleProductDetails(item.productId)}
//                     >
//                       <Image
//                         src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${item.productImages?.$values[0]}`}
//                         alt={item.productName || "Product"}
//                         width={120}
//                         height={120}
//                         className="object-cover rounded-lg shadow-sm"
//                       />
//                       <div className="space-y-2 ml-4">
//                         <span className="font-semibold text-lg text-gray-800 hover:text-green-600 transition-colors duration-200">
//                           {item.productName || "Unnamed Product"}
//                         </span>
//                         <div className="text-sm text-gray-500">({item.reviews || 0} reviews)</div>
//                         <div className="text-yellow-400 text-sm flex items-center">
//                           {"★".repeat(item.rating || 0)}
//                           <span className="ml-2 text-gray-600 text-xs">({item.rating || 0})</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="text-center w-full md:w-1/5 mt-4 md:mt-0">
//                       <span className="font-semibold text-xl text-green-600">
//                         ₹{(parseFloat(item.calculatedPrice) * item.quantity).toFixed(2)}
//                       </span>
//                       <div className="text-sm text-gray-500 mt-1">({item.varientsName || "N/A"})</div>
//                     </div>
//                     <div className="flex items-center justify-between w-full md:w-2/5 mt-4 md:mt-0">
//                       <span className="text-gray-700 font-medium">Qty: {item.quantity || 0}</span>
//                       <button
//                         onClick={() =>
//                           handleDeleteItem(item.varientsId, item.productId, item.minimumOrderQuantity)
//                         }
//                         className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all duration-300 shadow-sm hover:shadow-md flex items-center"
//                       >
//                         <FaTrash className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </li>
//                 );
//               })}
//             </ul>
//           ) : (
//             <div className="text-center py-12 bg-white rounded-lg shadow-md">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-16 w-16 mx-auto text-gray-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={1.5}
//                   d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                 />
//               </svg>
//               <p className="mt-4 text-gray-600 text-lg font-medium">Your cart is empty.</p>
//               <Link href="/">
//                 <button className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg">
//                   Return to Shop
//                 </button>
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Price Details - Right Side */}
//         {data?.length > 0 && (
//           <div className="lg:w-4/12">
//             <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md sticky top-4">
//               <div className="pb-4 border-b border-gray-200">
//                 <span className="text-xl font-semibold text-gray-800">Price Details</span>
//               </div>

//               <div className="space-y-4 mt-4">
//                 <div className="flex justify-between text-gray-600">
//                   <span>
//                     Price ({totalQuantity} {totalQuantity > 1 ? "items" : "item"})
//                   </span>
//                   <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Discount</span>
//                   <span className="text-green-600 font-medium">
//                     - ₹{discount.toFixed(2)}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Current Price</span>
//                   <span className="font-medium">₹{ActualPrice.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-600">
//                   <span>Delivery Charges</span>
//                   <span className="font-medium">
//                     {deliveryCharge > 0 ? (
//                       `₹${deliveryCharge.toFixed(2)}`
//                     ) : (
//                       <span className="text-green-600">Free</span>
//                     )}
//                   </span>
//                 </div>
//               </div>

//               <div className="mt-6 pt-4 border-t border-gray-200">
//                 <div className="flex justify-between items-center">
//                   <span className="text-lg font-bold text-gray-800">Total Amount</span>
//                   <span className="text-xl font-bold text-green-600">
//                     ₹{totalAmount.toFixed(2)}
//                   </span>
//                 </div>
//                 <div className="mt-2 text-sm text-green-600">
//                   You will save ₹{discount.toFixed(2)} on this order
//                 </div>
//               </div>

//               <button
//                 onClick={handlePlaceOrder}
//                 disabled={selectedAddress === null || data?.length === 0 || !isPincodeValid}
//                 className={`w-full mt-6 py-3 rounded-md text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg ${
//                   selectedAddress === null || data?.length === 0 || !isPincodeValid
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-green-600 hover:bg-green-700"
//                 }`}
//               >
//                 Place Order
//               </button>

//               <div className="mt-4 text-xs text-gray-500 text-center">
//                 Safe and Secure Payments. Easy returns. 100% Authentic products.
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
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
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// const Cart = () => {
//   const router = useRouter();
//   const [data, setData] = useState([]);
//   const [cartLength, setLength] = useState(0);
//   const [deletingId, setDeletingId] = useState(null);
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(1);
//   const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
//   const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [availability, setAvailability] = useState(null);
//   const [deliverydata, setDeliveryData] = useState([]);
//   const [isPincodeValid, setIsPincodeValid] = useState(false);

//   const Loader = () => (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"></div>
//       <p className="mt-4 text-lg text-gray-600 font-medium">Loading your cart...</p>
//     </div>
//   );

//   const CalculateDeliveryCharge = (data) => {
//     let totalDeliveryCharges = 0;

//     data.forEach((item) => {
//       const quantity = parseInt(item.quantity || 1);
//       const length = parseFloat(item.packageLength || 0);
//       const width = parseFloat(item.packageWidth || 0);
//       const height = parseFloat(item.packageHeight || 0);
//       const weight = parseFloat(item.packageWeight || 0);

//       const volumetricWeight = (length * width * height) / 5000;
//       const finalWeightPerUnit = Math.max(volumetricWeight, weight * quantity);

//       let deliveryChargePerUnit = 90;
//       if (finalWeightPerUnit > 2000) {
//         const extraWeight = finalWeightPerUnit - 2000;
//         const extraKg = Math.ceil(extraWeight / 1000);
//         deliveryChargePerUnit += extraKg * 35;
//       }

//       const gst = deliveryChargePerUnit * 0.18;
//       const totalPerUnit = deliveryChargePerUnit + gst;

//       totalDeliveryCharges += totalPerUnit;
//     });

//     return Math.round(totalDeliveryCharges);
//   };

//   const GetCartData = async (retries = 2) => {
//     setLoading(true);
//     const storedToken = localStorage.getItem("authToken");

//     if (!storedToken) {
//       setLoading(false);
//       Swal.fire("Session Expired", "Please log in to view your cart.", "warning");
//       router.push("/login");
//       return;
//     }

//     try {
//       const response = await makeRequest("POST", "/Cart/GetCartData", {}, {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       });

//       if (response && Array.isArray(response) && response[0]?.dataset?.$values) {
//         const cartItems = response[0].dataset.$values;
//         setLength(cartItems.length);
//         setData(cartItems);
//         setDeliveryData(cartItems);
//       } else {
//         setLength(0);
//         setData([]);
//         setDeliveryData([]);
//       }
//     } catch (error) {
//       if (retries > 0) {
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         return GetCartData(retries - 1);
//       }
//       setLength(0);
//       setData([]);
//       setDeliveryData([]);
//       Swal.fire("Error", "Failed to fetch cart data.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkPincodeAvailability = async (pin) => {
//     if (!pin || pin.length !== 6 || !deliverydata.length) {
//       setAvailability({
//         available: false,
//         message: !deliverydata.length ? "Cart is empty" : "Invalid pincode",
//       });
//       setIsPincodeValid(false);
//       return;
//     }

//     try {
//       const response = await makeRequest(
//         "GET",
//         `/Order/GetServiceAvailability?pincode=${pin}`
//       );

//       if (response.retval === "SUCCESS") {
//         const charges = CalculateDeliveryCharge(deliverydata);
//         setAvailability({
//           available: true,
//           deliveryDate: getDeliveryDatePlus8Days(),
//           deliveryCharge: charges,
//         });
//         setIsPincodeValid(true);
//       } else {
//         setAvailability({
//           available: false,
//           message: "Delivery not available for this pincode",
//         });
//         setIsPincodeValid(false);
//       }
//     } catch (error) {
//       setAvailability({
//         available: false,
//         message: "Error checking availability",
//       });
//       setIsPincodeValid(false);
//     }
//   };

//   const getDeliveryDatePlus8Days = () => {
//     const date = new Date();
//     date.setDate(date.getDate() + 8);
//     return date.toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const fetchAddresses = async () => {
//     const storedToken = localStorage.getItem("authToken");
//     const userId = localStorage.getItem("userId");

//     try {
//       const response = await makeRequest(
//         "POST",
//         "/Authentication/GetUserProfile",
//         { UserId: userId },
//         { headers: { Authorization: `Bearer ${storedToken}` } }
//       );

//       const addressData = response?.userProfilesEntity?.$values || [];
//       const formattedAddresses = addressData
//         .flatMap((addr) => {
//           const addressList = [
//             { address: addr.address, pincode: addr.pincode, isDefault: true },
//             { address: addr.addressOne, pincode: addr.pincode1 },
//             { address: addr.addressTwo, pincode: addr.pincode2 },
//             { address: addr.address_Three, pincode: addr.pincode3 },
//             { address: addr.address_Four, pincode: addr.pincode4 },
//           ];
//           return addressList
//             .map((item, index) => ({
//               ...item,
//               id: index + 1,
//               fullAddress: item.address?.trim() && item.pincode?.trim() ? `${item.address}, ${item.pincode}` : null,
//             }))
//             .filter((item) => item.fullAddress);
//         });

//       setAddresses(formattedAddresses);
//       if (formattedAddresses.length > 0) {
//         setSelectedAddress(1);
//         try {
//           await makeRequest(
//             "POST",
//             "/Authentication/UpdateAddressIndex",
//             { UserId: userId, SelectedAddressBlock: 1 },
//             { headers: { Authorization: `Bearer ${storedToken}` } }
//           );
//         } catch (error) {
//           console.error("Error setting default address index:", error);
//         }
//       } else {
//         setSelectedAddress(null);
//         setIsPincodeValid(false);
//         setAvailability({
//           available: false,
//           message: "No addresses available",
//         });
//       }
//     } catch (error) {
//       setAddresses([]);
//       setSelectedAddress(null);
//       setIsPincodeValid(false);
//       setAvailability({
//         available: false,
//         message: "Error fetching addresses",
//       });
//     }
//   };

//   const handleAddAddress = async (values, { resetForm }) => {
//     const storedToken = localStorage.getItem("authToken");
//     const userId = localStorage.getItem("userId");
//     const nextIndex = addresses.length + 1;

//     if (nextIndex > 5) {
//       Swal.fire("Error", "Maximum of 5 addresses allowed.", "error");
//       return;
//     }

//     try {
//       const response = await makeRequest(
//         "POST",
//         "/Authentication/EditAddressPincode",
//         {
//           UserId: userId,
//           SelectedAddressBlock: nextIndex,
//           Address: values.address,
//           pincode: values.pincode,
//         },
//         { headers: { Authorization: `Bearer ${storedToken}` } }
//       );

//       if (response.retval === "SUCCESS") {
//         await fetchAddresses();
//         setSelectedAddress(nextIndex);
//         setIsAddAddressModalOpen(false);
//         resetForm();
//         Swal.fire("Success", "Address added successfully.", "success");
//       } else {
//         Swal.fire("Error", "Failed to add address.", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error", "Failed to add address.", "error");
//     }
//   };

//   useEffect(() => {
//     const initialize = async () => {
//       setLoading(true);
//       await GetCartData();
//       await fetchAddresses();
//       if (addresses.length > 0 && deliverydata.length > 0) {
//         const initialAddress = addresses.find((addr) => addr.id === 1);
//         if (initialAddress) {
//           await checkPincodeAvailability(initialAddress.pincode);
//         }
//       }
//       setLoading(false);
//     };
//     initialize();
//   }, []);

//   useEffect(() => {
//     if (selectedAddress !== null && addresses.length > 0 && deliverydata.length > 0) {
//       const selectedAddr = addresses.find((addr) => addr.id === selectedAddress);
//       if (selectedAddr) {
//         checkPincodeAvailability(selectedAddr.pincode);
//         try {
//           const storedToken = localStorage.getItem("authToken");
//           makeRequest(
//             "POST",
//             "/Authentication/UpdateAddressIndex",
//             { UserId: localStorage.getItem("userId"), SelectedAddressBlock: selectedAddress },
//             { headers: { Authorization: `Bearer ${storedToken}` } }
//           );
//         } catch (error) {
//           console.error("Error updating address index:", error);
//         }
//       }
//     }
//   }, [addresses, deliverydata, selectedAddress]);

//   const handleAddressSelect = async (addressId) => {
//     setSelectedAddress(addressId);
//     setIsAddressModalOpen(false);
//   };

//   const addressValidationSchema = Yup.object({
//     address: Yup.string().required("Address is required"),
//     pincode: Yup.string()
//       .matches(/^\d{6}$/, "Pincode must be 6 digits")
//       .required("Pincode is required"),
//   });

//   const totalQuantity = data?.reduce(
//     (total, item) => total + (item.quantity || 0),
//     0
//   ) || 0;
//   const totalPrice = data?.reduce((total, item) => {
//     const price = parseFloat(item.pricing) || 0;
//     const qty = item.quantity || 0;
//     return total + price * qty;
//   }, 0) || 0;

//   const ActualPrice = data?.reduce((total, item) => {
//     const qty = item.quantity || 1;
//     const calculatePrice = item.calculatedPrice || 0;
//     return total + calculatePrice * qty;
//   }, 0) || 0;

//   const discount = data?.reduce((total, item) => {
//     const discountAmt = parseFloat(item.discountAmount) || 0;
//     const qty = item.quantity || 0;
//     if (item.discountType === "Flat") {
//       return total + discountAmt * qty;
//     } else if (item.discountType === "Percentage") {
//       const price = parseFloat(item.calculatedPrice) || 0;
//       return total + ((price * discountAmt) / 100) * qty;
//     }
//     return total;
//   }, 0) || 0;

//   const deliveryCharge = CalculateDeliveryCharge(data);
//   const totalAmount = ActualPrice + deliveryCharge;

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handleProductDetails = (id) => {
//     router.push(`/product/${id}`);
//   };

//   const handlePlaceOrder = async () => {
//     if (selectedAddress === null || data?.length === 0 || !isPincodeValid) {
//       Swal.fire(
//         "Cannot place order",
//         "Please select a valid address with available delivery.",
//         "warning"
//       );
//       return;
//     }

//     const selectedAddressObj = addresses.find(
//       (addr) => addr.id === selectedAddress
//     );
//     const cartItems = data;

//     const storedToken = localStorage.getItem("authToken");
//     const variantIDs = cartItems.map(
//       (item) => `${item.varientsId},${item.quantity}`
//     );

//     const payload = {
//       varientID: variantIDs,
//       DeliveryAddress: selectedAddressObj.fullAddress,
//     };

//     try {
//       const response = await makeRequest("POST", "Order/CreateOrder", payload, {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       });

//       if (!response || !response.dataset || !response.dataset.orderDetails) {
//         Swal.fire("Order creation failed", "No order details returned", "error");
//         return;
//       }

//       const orderDetails = response.dataset.orderDetails;
//       const { id: order_id, amount, currency } = orderDetails;

//       const razorpayLoaded = await loadRazorpayScript();
//       if (!razorpayLoaded) {
//         Swal.fire("Failed to load Razorpay", "", "error");
//         return;
//       }

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount,
//         currency,
//         name: "Mahaagromart",
//         description: "Order Payment",
//         order_id,
//         handler: async (response) => {
//           const paymentVerification = {
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_signature: response.razorpay_signature,
//           };

//           try {
//             const verifyResponse = await makeRequest(
//               "POST",
//               "Order/VerifyPayment",
//               paymentVerification,
//               {
//                 headers: { Authorization: `Bearer ${storedToken}` },
//               }
//             );

//             if (verifyResponse) {
//               for (const item of cartItems) {
//                 await handleDeleteItem(
//                   item.varientsId,
//                   item.productId,
//                   item.minimumOrderQuantity
//                 );
//               }
//               Swal.fire(
//                 "Payment Successful!",
//                 "Your order has been placed.",
//                 "success"
//               );
//               router.push("/Ordertrack");
//             } else {
//               Swal.fire("Payment Verification Failed! ❌", "", "error");
//             }
//           } catch (error) {
//             Swal.fire("Payment Verification Error", "", "error");
//           }
//         },
//         prefill: {
//           name: `${localStorage.getItem("first poppinsName")} ${localStorage.getItem(
//             "lastName"
//           )}`,
//           email: localStorage.getItem("email") || "mahaagromart.com",
//           contact: localStorage.getItem("phone") || "",
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const razorpay = new window.Razorpay(options);

//       razorpay.on("payment.failed", (response) => {
//         Swal.fire("Payment Failed!", "Please try again.", "error");
//       });

//       razorpay.open();
//     } catch (error) {
//       Swal.fire("Something went wrong!", "Unable to place the order.", "error");
//     }
//   };

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
//       Swal.fire("Network Issue", "Failed to delete item", "error");
//     }
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 font-poppins">
//       <div className="container mx-auto px-4 py-8 max-w-7xl">
//         {/* Address Section */}
//         <section className="mb-8 bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-bold text-gray-800">Delivery Address</h2>
//             <button
//               onClick={() => setIsAddressModalOpen(true)}
//               className="flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
//             >
//               <svg
//                 className="w-5 h-5 mr-2"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                 />
//               </svg>
//               Change Address
//             </button>
//           </div>

//           {addresses.length > 0 && selectedAddress !== null ? (
//             <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 transition-all duration-200">
//               <div className="flex items-start">
//                 <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mr-3">
//                   <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path
//                       fillRule="evenodd"
//                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </div>
//                 <div>
//                   <div className="flex items-center">
//                     <h3 className="font-semibold text-gray-900">Selected Address</h3>
//                     <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
//                       {addresses.find((addr) => addr.id === selectedAddress)?.isDefault
//                         ? "Default"
//                         : `Address ${selectedAddress}`}
//                     </span>
//                   </div>
//                   <p className="mt-1 text-sm text-gray-700">
//                     {addresses.find((addr) => addr.id === selectedAddress)?.address}
//                   </p>
//                   <div className="mt-2 flex items-center text-sm text-gray-600">
//                     <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4-4.243a8 8 0 1111.314 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                     </svg>
//                     Pincode: <span className="font-medium">
//                       {addresses.find((addr) => addr.id === selectedAddress)?.pincode}
//                     </span>
//                   </div>
//                   {availability && (
//                     <p className={`mt-2 text-sm font-medium ${availability.available ? "text-green-600" : "text-red-600"}`}>
//                       {availability.available
//                         ? `Delivery by ${availability.deliveryDate}`
//                         : availability.message}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-200">
//               <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={1.5}
//                   d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4-4.243a8 8 0 1111.314 0z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={1.5}
//                   d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                 />
//               </svg>
//               <p className="mt-3 text-gray-600 font-medium">No addresses found</p>
//               <button
//                 onClick={() => setIsAddAddressModalOpen(true)}
//                 className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
//               >
//                 + Add New Address
//               </button>
//             </div>
//           )}
//         </section>

//         {/* Address Selection Modal */}
//         {isAddressModalOpen && (
//           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//             <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-2xl animate-fade-in">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-gray-800">Select Address</h2>
//                 <button
//                   onClick={() => setIsAddressModalOpen(false)}
//                   className="text-gray-600 hover:text-gray-800 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>
//               <div className="space-y-4">
//                 {addresses.length > 0 ? (
//                   addresses.map((address) => (
//                     <div
//                       key={address.id}
//                       className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 hover:shadow-md ${
//                         selectedAddress === address.id
//                           ? "border-blue-500 bg-blue-50"
//                           : "border-gray-200"
//                       }`}
//                       onClick={() => handleAddressSelect(address.id)}
//                     >
//                       <div className="flex items-start">
//                         <div
//                           className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
//                             selectedAddress === address.id
//                               ? "bg-blue-500 border-blue-500"
//                               : "border-gray-300"
//                           }`}
//                         >
//                           {selectedAddress === address.id && (
//                             <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                               <path
//                                 fillRule="evenodd"
//                                 d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                                 clipRule="evenodd"
//                               />
//                             </svg>
//                           )}
//                         </div>
//                         <div>
//                           <div className="flex items-center">
//                             <h3 className="font-semibold text-gray-900">Address {address.id}</h3>
//                             {address.isDefault && (
//                               <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
//                                 Default
//                               </span>
//                             )}
//                           </div>
//                           <p className="mt-1 text-sm text-gray-700">{address.address}</p>
//                           <div className="mt-2 flex items-center text-sm text-gray-600">
//                             <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4-4.243a8 8 0 1111.314 0z"
//                               />
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                               />
//                             </svg>
//                             Pincode: <span className="font-medium">{address.pincode}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
//                     <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={1.5}
//                         d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4-4.243a8 8 0 1111.314 0z"
//                       />
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={1.5}
//                         d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                       />
//                     </svg>
//                     <p className="mt-3 text-gray-600 font-medium">No addresses found</p>
//                     <button
//                       onClick={() => {
//                         setIsAddressModalOpen(false);
//                         setIsAddAddressModalOpen(true);
//                       }}
//                       className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
//                     >
//                       + Add New Address
//                     </button>
//                   </div>
//                 )}
//               </div>
//               {addresses.length < 5 && (
//                 <button
//                   onClick={() => {
//                     setIsAddressModalOpen(false);
//                     setIsAddAddressModalOpen(true);
//                   }}
//                   className="mt-6 text-blue-600 hover:text-blue-700 font-semibold"
//                 >
//                   + Add New Address
//                 </button>
//               )}
//             </div>
//           </div>
//         )}

//         {/* Add Address Modal */}
//         {isAddAddressModalOpen && (
//           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//             <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-fade-in">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-gray-800">Add New Address</h2>
//                 <button
//                   onClick={() => setIsAddAddressModalOpen(false)}
//                   className="text-gray-600 hover:text-gray-800 text-2xl"
//                 >
//                   ×
//                 </button>
//               </div>
//               <Formik
//                 initialValues={{ address: "", pincode: "" }}
//                 validationSchema={addressValidationSchema}
//                 onSubmit={handleAddAddress}
//               >
//                 {({ isSubmitting }) => (
//                   <Form className="space-y-4">
//                     <div>
//                       <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                         Address
//                       </label>
//                       <Field
//                         type="text"
//                         name="address"
//                         className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                         placeholder="Enter your address"
//                       />
//                       <ErrorMessage
//                         name="address"
//                         component="div"
//                         className="text-red-600 text-sm mt-1"
//                       />
//                     </div>
//                     <div>
//                       <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
//                         Pincode
//                       </label>
//                       <Field
//                         type="text"
//                         name="pincode"
//                         className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
//                         placeholder="Enter 6-digit pincode"
//                       />
//                       <ErrorMessage
//                         name="pincode"
//                         component="div"
//                         className="text-red-600 text-sm mt-1"
//                       />
//                     </div>
//                     <div className="flex justify-end space-x-4">
//                       <button
//                         type="button"
//                         onClick={() => setIsAddAddressModalOpen(false)}
//                         className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
//                       >
//                         Save Address
//                       </button>
//                     </div>
//                   </Form>
//                 )}
//               </Formik>
//             </div>
//           </div>
//         )}

//         {/* Main Content */}
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2">
//             {data?.length > 0 ? (
//               <ul className="space-y-6">
//                 {data.map((item) => {
//                   const isDeleting = deletingId === item.varientsId;
//                   return (
//                     <li
//                       key={item.varientsId}
//                       className={`flex flex-col sm:flex-row items-center p-6 bg-white rounded-2xl shadow-md transition-all duration-500 ${
//                         isDeleting ? "opacity-0 translate-x-[-100%]" : "opacity-100"
//                       }`}
//                     >
//                       <div
//                         className="flex items-center w-full sm:w-1/2 cursor-pointer"
//                         onClick={() => handleProductDetails(item.productId)}
//                       >
//                         <Image
//                           src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${item.productImages?.$values[0]}`}
//                           alt={item.productName || "Product"}
//                           width={100}
//                           height={100}
//                           className="object-cover rounded-lg"
//                         />
//                         <div className="ml-4 space-y-1">
//                           <h3 className="font-semibold text-lg text-gray-800 hover:text-blue-600">
//                             {item.productName || "Unnamed Product"}
//                           </h3>
//                           <p className="text-sm text-gray-500">({item.reviews || 0} reviews)</p>
//                           <div className="flex items-center text-yellow-400 text-sm">
//                             {"★".repeat(item.rating || 0)}
//                             <span className="ml-1 text-gray-600">({item.rating || 0})</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center justify-between w-full sm:w-1/2 mt-4 sm:mt-0">
//                         <div className="text-center">
//                           <p className="font-semibold text-lg text-green-600">
//                             ₹{(parseFloat(item.calculatedPrice) * item.quantity).toFixed(2)}
//                           </p>
//                           <p className="text-sm text-gray-500">{item.varientsName || "N/A"}</p>
//                         </div>
//                         <div className="flex items-center space-x-4">
//                           <span className="text-gray-700">Qty: {item.quantity || 0}</span>
//                           <button
//                             onClick={() =>
//                               handleDeleteItem(item.varientsId, item.productId, item.minimumOrderQuantity)
//                             }
//                             className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
//                           >
//                             <FaTrash className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     </li>
//                   );
//                 })}
//               </ul>
//             ) : (
//               <div className="text-center py-12 bg-white rounded-2xl shadow-md">
//                 <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1.5}
//                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                   />
//                 </svg>
//                 <p className="mt-4 text-gray-600 text-lg font-medium">Your cart is empty</p>
//                 <Link href="/">
//                   <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                     Shop Now
//                   </button>
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Price Details */}
//           {data?.length > 0 && (
//             <div className="lg:col-span-1">
//               <div className="p-6 bg-white rounded-2xl shadow-md sticky top-4">
//                 <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
//                 <div className="space-y-3">
//                   <div className="flex justify-between text-gray-600">
//                     <span>Items ({totalQuantity})</span>
//                     <span>₹{totalPrice.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-gray-600">
//                     <span>Discount</span>
//                     <span className="text-green-600">-₹{discount.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-gray-600">
//                     <span>Subtotal</span>
//                     <span>₹{ActualPrice.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-gray-600">
//                     <span>Delivery</span>
//                     <span>
//                       {deliveryCharge > 0 ? `₹${deliveryCharge.toFixed(2)}` : <span className="text-green-600">Free</span>}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="mt-4 pt-4 border-t border-gray-200">
//                   <div className="flex justify-between text-lg font-bold">
//                     <span>Total</span>
//                     <span className="text-green-600">₹{totalAmount.toFixed(2)}</span>
//                   </div>
//                   <p className="mt-2 text-sm text-green-600">
//                     You save ₹{discount.toFixed(2)} on this order
//                   </p>
//                 </div>
//                 <button
//                   onClick={handlePlaceOrder}
//                   disabled={selectedAddress === null || data?.length === 0 || !isPincodeValid}
//                   className={`w-full mt-6 py-3 rounded-lg text-white font-semibold ${
//                     selectedAddress === null || data?.length === 0 || !isPincodeValid
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-green-600 hover:bg-green-700"
//                   }`}
//                 >
//                   Place Order
//                 </button>
//                 <p className="mt-4 text-xs text-gray-500 text-center">
//                   Safe & Secure Payments | Easy Returns | 100% Authentic
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: scale(0.95);
//           }
//           to {
//             opacity: 1;
//             transform: scale(1);
//           }
//         }
//         .animate-fade-in {
//           animation: fadeIn 0.3s ease-in-out;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Cart;





// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { FaTrash, FaMapMarkerAlt, FaPlus } from "react-icons/fa";
// import { makeRequest } from "@/api";
// import Swal from "sweetalert2";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { motion, AnimatePresence } from "framer-motion";

// const Cart = () => {
//   const router = useRouter();
//   const [data, setData] = useState([]);
//   const [cartLength, setLength] = useState(0);
//   const [deletingId, setDeletingId] = useState(null);
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(1);
//   const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
//   const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [availability, setAvailability] = useState(null);
//   const [deliverydata, setDeliveryData] = useState([]);
//   const [isPincodeValid, setIsPincodeValid] = useState(false);

//   const Loader = () => (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
//       <motion.div
//         animate={{ rotate: 360 }}
//         transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//         className="rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"
//       />
//       <motion.p
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mt-4 text-lg font-medium text-gray-600"
//       >
//         Loading your cart...
//       </motion.p>
//     </div>
//   );

//   const CalculateDeliveryCharge = (data) => {
//     let totalDeliveryCharges = 0;

//     data.forEach((item) => {
//       const quantity = parseInt(item.quantity || 1);
//       const length = parseFloat(item.packageLength || 0);
//       const width = parseFloat(item.packageWidth || 0);
//       const height = parseFloat(item.packageHeight || 0);
//       const weight = parseFloat(item.packageWeight || 0);

//       const volumetricWeight = (length * width * height) / 5000;
//       const finalWeightPerUnit = Math.max(volumetricWeight, weight * quantity);

//       let deliveryChargePerUnit = 90;
//       if (finalWeightPerUnit > 2000) {
//         const extraWeight = finalWeightPerUnit - 2000;
//         const extraKg = Math.ceil(extraWeight / 1000);
//         deliveryChargePerUnit += extraKg * 35;
//       }

//       const gst = deliveryChargePerUnit * 0.18;
//       const totalPerUnit = deliveryChargePerUnit + gst;

//       totalDeliveryCharges += totalPerUnit;
//     });

//     return Math.round(totalDeliveryCharges);
//   };

//   const GetCartData = async (retries = 2) => {
//     setLoading(true);
//     const storedToken = localStorage.getItem("authToken");

//     if (!storedToken) {
//       setLoading(false);
//       Swal.fire({
//         title: "Session Expired",
//         text: "Please log in to view your cart.",
//         icon: "warning",
//         confirmButtonColor: "#2563eb",
//       });
//       router.push("/login");
//       return;
//     }

//     try {
//       const response = await makeRequest("POST", "/Cart/GetCartData", {}, {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       });

//       if (response && Array.isArray(response) && response[0]?.dataset?.$values) {
//         const cartItems = response[0].dataset.$values;
//         setLength(cartItems.length);
//         setData(cartItems);
//         setDeliveryData(cartItems);
//       } else {
//         setLength(0);
//         setData([]);
//         setDeliveryData([]);
//       }
//     } catch (error) {
//       if (retries > 0) {
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         return GetCartData(retries - 1);
//       }
//       setLength(0);
//       setData([]);
//       setDeliveryData([]);
//       Swal.fire({
//         title: "Error",
//         text: "Failed to fetch cart data.",
//         icon: "error",
//         confirmButtonColor: "#2563eb",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkPincodeAvailability = async (pin) => {
//     if (!pin || pin.length !== 6 || !deliverydata.length) {
//       setAvailability({
//         available: false,
//         message: !deliverydata.length ? "Cart is empty" : "Invalid pincode",
//       });
//       setIsPincodeValid(false);
//       return;
//     }

//     try {
//       const response = await makeRequest(
//         "GET",
//         `/Order/GetServiceAvailability?pincode=${pin}`
//       );

//       if (response.retval === "SUCCESS") {
//         const charges = CalculateDeliveryCharge(deliverydata);
//         setAvailability({
//           available: true,
//           deliveryDate: getDeliveryDatePlus8Days(),
//           deliveryCharge: charges,
//         });
//         setIsPincodeValid(true);
//       } else {
//         setAvailability({
//           available: false,
//           message: "Delivery not available for this pincode",
//         });
//         setIsPincodeValid(false);
//       }
//     } catch (error) {
//       setAvailability({
//         available: false,
//         message: "Error checking availability",
//       });
//       setIsPincodeValid(false);
//     }
//   };

//   const getDeliveryDatePlus8Days = () => {
//     const date = new Date();
//     date.setDate(date.getDate() + 8);
//     return date.toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const fetchAddresses = async () => {
//     const storedToken = localStorage.getItem("authToken");
//     const userId = localStorage.getItem("userId");

//     try {
//       const response = await makeRequest(
//         "POST",
//         "/Authentication/GetUserProfile",
//         { UserId: userId },
//         { headers: { Authorization: `Bearer ${storedToken}` } }
//       );

//       const addressData = response?.userProfilesEntity?.$values || [];
//       const formattedAddresses = addressData
//         .flatMap((addr) => {
//           const addressList = [
//             { address: addr.address, pincode: addr.pincode, isDefault: true },
//             { address: addr.addressOne, pincode: addr.pincode1 },
//             { address: addr.addressTwo, pincode: addr.pincode2 },
//             { address: addr.address_Three, pincode: addr.pincode3 },
//             { address: addr.address_Four, pincode: addr.pincode4 },
//           ];
//           return addressList
//             .map((item, index) => ({
//               ...item,
//               id: index + 1,
//               fullAddress: item.address?.trim() && item.pincode?.trim() ? `${item.address}, ${item.pincode}` : null,
//             }))
//             .filter((item) => item.fullAddress);
//         });

//       setAddresses(formattedAddresses);
//       if (formattedAddresses.length > 0) {
//         setSelectedAddress(1);
//         try {
//           await makeRequest(
//             "POST",
//             "/Authentication/UpdateAddressIndex",
//             { UserId: userId, SelectedAddressBlock: 1 },
//             { headers: { Authorization: `Bearer ${storedToken}` } }
//           );
//         } catch (error) {
//           console.error("Error setting default address index:", error);
//         }
//       } else {
//         setSelectedAddress(null);
//         setIsPincodeValid(false);
//         setAvailability({
//           available: false,
//           message: "No addresses available",
//         });
//       }
//     } catch (error) {
//       setAddresses([]);
//       setSelectedAddress(null);
//       setIsPincodeValid(false);
//       setAvailability({
//         available: false,
//         message: "Error fetching addresses",
//       });
//     }
//   };

//   const handleAddAddress = async (values, { resetForm }) => {
//     const storedToken = localStorage.getItem("authToken");
//     const userId = localStorage.getItem("userId");
//     const nextIndex = addresses.length + 1;

//     if (nextIndex > 5) {
//       Swal.fire({
//         title: "Error",
//         text: "Maximum of 5 addresses allowed.",
//         icon: "error",
//         confirmButtonColor: "#2563eb",
//       });
//       return;
//     }

//     try {
//       const response = await makeRequest(
//         "POST",
//         "/Authentication/EditAddressPincode",
//         {
//           UserId: userId,
//           SelectedAddressBlock: nextIndex,
//           Address: values.address,
//           pincode: values.pincode,
//         },
//         { headers: { Authorization: `Bearer ${storedToken}` } }
//       );

//       if (response.retval === "SUCCESS") {
//         await fetchAddresses();
//         setSelectedAddress(nextIndex);
//         setIsAddAddressModalOpen(false);
//         resetForm();
//         Swal.fire({
//           title: "Success",
//           text: "Address added successfully.",
//           icon: "success",
//           confirmButtonColor: "#2563eb",
//         });
//       } else {
//         Swal.fire({
//           title: "Error",
//           text: "Failed to add address.",
//           icon: "error",
//           confirmButtonColor: "#2563eb",
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "Error",
//         text: "Failed to add address.",
//         icon: "error",
//         confirmButtonColor: "#2563eb",
//       });
//     }
//   };

//   useEffect(() => {
//     const initialize = async () => {
//       setLoading(true);
//       await GetCartData();
//       await fetchAddresses();
//       if (addresses.length > 0 && deliverydata.length > 0) {
//         const initialAddress = addresses.find((addr) => addr.id === 1);
//         if (initialAddress) {
//           await checkPincodeAvailability(initialAddress.pincode);
//         }
//       }
//       setLoading(false);
//     };
//     initialize();
//   }, []);

//   useEffect(() => {
//     if (selectedAddress !== null && addresses.length > 0 && deliverydata.length > 0) {
//       const selectedAddr = addresses.find((addr) => addr.id === selectedAddress);
//       if (selectedAddr) {
//         checkPincodeAvailability(selectedAddr.pincode);
//         try {
//           const storedToken = localStorage.getItem("authToken");
//           makeRequest(
//             "POST",
//             "/Authentication/UpdateAddressIndex",
//             { UserId: localStorage.getItem("userId"), SelectedAddressBlock: selectedAddress },
//             { headers: { Authorization: `Bearer ${storedToken}` } }
//           );
//         } catch (error) {
//           console.error("Error updating address index:", error);
//         }
//       }
//     }
//   }, [addresses, deliverydata, selectedAddress]);

//   const handleAddressSelect = async (addressId) => {
//     setSelectedAddress(addressId);
//     setIsAddressModalOpen(false);
//   };

//   const addressValidationSchema = Yup.object({
//     address: Yup.string().required("Address is required"),
//     pincode: Yup.string()
//       .matches(/^\d{6}$/, "Pincode must be 6 digits")
//       .required("Pincode is required"),
//   });

//   const totalQuantity = data?.reduce(
//     (total, item) => total + (item.quantity || 0),
//     0
//   ) || 0;
//   const totalPrice = data?.reduce((total, item) => {
//     const price = parseFloat(item.pricing) || 0;
//     const qty = item.quantity || 0;
//     return total + price * qty;
//   }, 0) || 0;

//   const ActualPrice = data?.reduce((total, item) => {
//     const qty = item.quantity || 1;
//     const calculatePrice = item.calculatedPrice || 0;
//     return total + calculatePrice * qty;
//   }, 0) || 0;

//   const discount = data?.reduce((total, item) => {
//     const discountAmt = parseFloat(item.discountAmount) || 0;
//     const qty = item.quantity || 0;
//     if (item.discountType === "Flat") {
//       return total + discountAmt * qty;
//     } else if (item.discountType === "Percentage") {
//       const price = parseFloat(item.calculatedPrice) || 0;
//       return total + ((price * discountAmt) / 100) * qty;
//     }
//     return total;
//   }, 0) || 0;

//   const deliveryCharge = CalculateDeliveryCharge(data);
//   const totalAmount = ActualPrice + deliveryCharge;

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handleProductDetails = (id) => {
//     router.push(`/product/${id}`);
//   };

//   const handlePlaceOrder = async () => {
//     if (selectedAddress === null || data?.length === 0 || !isPincodeValid) {
//       Swal.fire({
//         title: "Cannot Place Order",
//         text: "Please select a valid address with available delivery.",
//         icon: "warning",
//         confirmButtonColor: "#2563eb",
//       });
//       return;
//     }

//     const selectedAddressObj = addresses.find(
//       (addr) => addr.id === selectedAddress
//     );
//     const cartItems = data;

//     const storedToken = localStorage.getItem("authToken");
//     const variantIDs = cartItems.map(
//       (item) => `${item.varientsId},${item.quantity}`
//     );

//     const payload = {
//       varientID: variantIDs,
//       DeliveryAddress: selectedAddressObj.fullAddress,
//     };

//     try {
//       const response = await makeRequest("POST", "Order/CreateOrder", payload, {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       });

//       if (!response || !response.dataset || !response.dataset.orderDetails) {
//         Swal.fire({
//           title: "Order Creation Failed",
//           text: "No order details returned",
//           icon: "error",
//           confirmButtonColor: "#2563eb",
//         });
//         return;
//       }

//       const orderDetails = response.dataset.orderDetails;
//       const { id: order_id, amount, currency } = orderDetails;

//       const razorpayLoaded = await loadRazorpayScript();
//       if (!razorpayLoaded) {
//         Swal.fire({
//           title: "Failed to Load Razorpay",
//           icon: "error",
//           confirmButtonColor: "#2563eb",
//         });
//         return;
//       }

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount,
//         currency,
//         name: "Mahaagromart",
//         description: "Order Payment",
//         order_id,
//         handler: async (response) => {
//           const paymentVerification = {
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_signature: response.razorpay_signature,
//           };

//           try {
//             const verifyResponse = await makeRequest(
//               "POST",
//               "Order/VerifyPayment",
//               paymentVerification,
//               {
//                 headers: { Authorization: `Bearer ${storedToken}` },
//               }
//             );

//             if (verifyResponse) {
//               for (const item of cartItems) {
//                 await handleDeleteItem(
//                   item.varientsId,
//                   item.productId,
//                   item.minimumOrderQuantity
//                 );
//               }
//               Swal.fire({
//                 title: "Payment Successful!",
//                 text: "Your order has been placed.",
//                 icon: "success",
//                 confirmButtonColor: "#2563eb",
//               });
//               router.push("/Ordertrack");
//             } else {
//               Swal.fire({
//                 title: "Payment Verification Failed!",
//                 icon: "error",
//                 confirmButtonColor: "#2563eb",
//               });
//             }
//           } catch (error) {
//             Swal.fire({
//               title: "Payment Verification Error",
//               icon: "error",
//               confirmButtonColor: "#2563eb",
//             });
//           }
//         },
//         prefill: {
//           name: `${localStorage.getItem("firstName")} ${localStorage.getItem(
//             "lastName"
//           )}`,
//           email: localStorage.getItem("email") || "mahaagromart.com",
//           contact: localStorage.getItem("phone") || "",
//         },
//         theme: {
//           color: "#2563eb",
//         },
//       };

//       const razorpay = new window.Razorpay(options);

//       razorpay.on("payment.failed", () => {
//         Swal.fire({
//           title: "Payment Failed!",
//           text: "Please try again.",
//           icon: "error",
//           confirmButtonColor: "#2563eb",
//         });
//       });

//       razorpay.open();
//     } catch (error) {
//       Swal.fire({
//         title: "Something Went Wrong!",
//         text: "Unable to place the order.",
//         icon: "error",
//         confirmButtonColor: "#2563eb",
//       });
//     }
//   };

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
//         Swal.fire({
//           title: "Success",
//           text: "Item removed from cart",
//           icon: "success",
//           confirmButtonColor: "#2563eb",
//         }).then(() => {
//           GetCartData();
//           setDeletingId(null);
//         });
//       } else {
//         setDeletingId(null);
//         Swal.fire({
//           title: "Failed to Remove Item",
//           icon: "error",
//           confirmButtonColor: "#2563eb",
//         });
//       }
//     } catch (error) {
//       setDeletingId(null);
//       Swal.fire({
//         title: "Network Issue",
//         text: "Failed to remove item",
//         icon: "error",
//         confirmButtonColor: "#2563eb",
//       });
//     }
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-poppins">
//       <div className="container mx-auto px-4 py-12 max-w-7xl">
//         {/* Address Section */}
//         <motion.section
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mb-10 bg-white rounded-3xl shadow-xl p-8"
//         >
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-3xl font-bold text-gray-900">Delivery Address</h2>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setIsAddressModalOpen(true)}
//               className="flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
//             >
//               <FaMapMarkerAlt className="mr-2" />
//               Change Address
//             </motion.button>
//           </div>

//           {addresses.length > 0 && selectedAddress !== null ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="p-6 rounded-2xl bg-blue-50 border border-blue-200"
//             >
//               <div className="flex items-start">
//                 <motion.div
//                   className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4"
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path
//                       fillRule="evenodd"
//                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </motion.div>
//                 <div>
//                   <div className="flex items-center">
//                     <h3 className="text-lg font-semibold text-gray-900">Selected Address</h3>
//                     <span className="ml-3 px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
//                       {addresses.find((addr) => addr.id === selectedAddress)?.isDefault
//                         ? "Default"
//                         : `Address ${selectedAddress}`}
//                     </span>
//                   </div>
//                   <p className="mt-2 text-gray-700">{addresses.find((addr) => addr.id === selectedAddress)?.address}</p>
//                   <div className="mt-2 flex items-center text-gray-600">
//                     <FaMapMarkerAlt className="w-5 h-5 mr-2 text-blue-500" />
//                     Pincode: <span className="font-medium ml-1">{addresses.find((addr) => addr.id === selectedAddress)?.pincode}</span>
//                   </div>
//                   {availability && (
//                     <motion.p
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className={`mt-3 font-medium ${availability.available ? "text-green-600" : "text-red-600"}`}
//                     >
//                       {availability.available
//                         ? `Expected delivery by ${availability.deliveryDate}`
//                         : availability.message}
//                     </motion.p>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-center py-12 bg-gray-50 rounded-2xl border border-gray-200"
//             >
//               <FaMapMarkerAlt className="w-12 h-12 mx-auto text-gray-400" />
//               <p className="mt-4 text-gray-600 font-medium">No addresses found</p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setIsAddAddressModalOpen(true)}
//                 className="mt-4 text-blue-600 hover:text-blue-700 font-semibold flex items-center mx-auto"
//               >
//                 <FaPlus className="mr-2" /> Add New Address
//               </motion.button>
//             </motion.div>
//           )}
//         </motion.section>

//         {/* Address Selection Modal */}
//         <AnimatePresence>
//           {isAddressModalOpen && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//                 className="bg-white rounded-3xl p-8 w-full max-w-md max-h-[80vh] overflow-y-auto shadow-2xl"
//               >
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-2xl font-bold text-gray-900">Select Delivery Address</h2>
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     onClick={() => setIsAddressModalOpen(false)}
//                     className="text-gray-600 hover:text-gray-800 text-2xl"
//                   >
//                     ×
//                   </motion.button>
//                 </div>
//                 <div className="space-y-4">
//                   {addresses.length > 0 ? (
//                     addresses.map((address) => (
//                       <motion.div
//                         key={address.id}
//                         whileHover={{ scale: 1.02 }}
//                         className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
//                           selectedAddress === address.id
//                             ? "border-blue-500 bg-blue-50 shadow-md"
//                             : "border-gray-200 hover:border-gray-300"
//                         }`}
//                         onClick={() => handleAddressSelect(address.id)}
//                       >
//                         <div className="flex items-start">
//                           <div
//                             className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
//                               selectedAddress === address.id
//                                 ? "bg-blue-500 border-blue-500"
//                                 : "border-gray-300"
//                             }`}
//                           >
//                             {selectedAddress === address.id && (
//                               <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                             )}
//                           </div>
//                           <div>
//                             <div className="flex items-center">
//                               <h3 className="font-semibold text-gray-900">Address {address.id}</h3>
//                               {address.isDefault && (
//                                 <span className="ml-3 px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
//                                   Default
//                                 </span>
//                               )}
//                             </div>
//                             <p className="mt-1 text-sm text-gray-700">{address.address}</p>
//                             <div className="mt-2 flex items-center text-sm text-gray-600">
//                               <FaMapMarkerAlt className="w-5 h-5 mr-2 text-blue-500" />
//                               Pincode: <span className="font-medium">{address.pincode}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))
//                   ) : (
//                     <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-200">
//                       <FaMapMarkerAlt className="w-12 h-12 mx-auto text-gray-400" />
//                       <p className="mt-4 text-gray-600 font-medium">No addresses found</p>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => {
//                           setIsAddressModalOpen(false);
//                           setIsAddAddressModalOpen(true);
//                         }}
//                         className="mt-4 text-blue-600 hover:text-blue-700 font-semibold flex items-center mx-auto"
//                       >
//                         <FaPlus className="mr-2" /> Add New Address
//                       </motion.button>
//                     </div>
//                   )}
//                 </div>
//                 {addresses.length < 5 && (
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => {
//                       setIsAddressModalOpen(false);
//                       setIsAddAddressModalOpen(true);
//                     }}
//                     className="mt-6 text-blue-600 hover:text-blue-700 font-semibold flex items-center"
//                   >
//                     <FaPlus className="mr-2" /> Add New Address
//                   </motion.button>
//                 )}
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Add Address Modal */}
//         <AnimatePresence>
//           {isAddAddressModalOpen && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//                 className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
//               >
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-2xl font-bold text-gray-900">Add New Address</h2>
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     onClick={() => setIsAddAddressModalOpen(false)}
//                     className="text-gray-600 hover:text-gray-800 text-2xl"
//                   >
//                     ×
//                   </motion.button>
//                 </div>
//                 <Formik
//                   initialValues={{ address: "", pincode: "" }}
//                   validationSchema={addressValidationSchema}
//                   onSubmit={handleAddAddress}
//                 >
//                   {({ isSubmitting }) => (
//                     <Form className="space-y-6">
//                       <div>
//                         <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                           Address
//                         </label>
//                         <Field
//                           type="text"
//                           name="address"
//                           className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                           placeholder="Enter your full address"
//                         />
//                         <ErrorMessage
//                           name="address"
//                           component="div"
//                           className="text-red-600 text-sm mt-1"
//                         />
//                       </div>
//                       <div>
//                         <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
//                           Pincode
//                         </label>
//                         <Field
//                           type="text"
//                           name="pincode"
//                           className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                           placeholder="Enter 6-digit pincode"
//                         />
//                         <ErrorMessage
//                           name="pincode"
//                           component="div"
//                           className="text-red-600 text-sm mt-1"
//                         />
//                       </div>
//                       <div className="flex justify-end space-x-4">
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           type="button"
//                           onClick={() => setIsAddAddressModalOpen(false)}
//                           className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg"
//                         >
//                           Cancel
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           type="submit"
//                           disabled={isSubmitting}
//                           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-all"
//                         >
//                           Save Address
//                         </motion.button>
//                       </div>
//                     </Form>
//                   )}
//                 </Formik>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Main Content */}
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2">
//             {data?.length > 0 ? (
//               <ul className="space-y-6">
//                 <AnimatePresence>
//                   {data.map((item) => (
//                     <motion.li
//                       key={item.varientsId}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, x: -100 }}
//                       transition={{ duration: 0.3 }}
//                       className="flex flex-col sm:flex-row items-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
//                     >
//                       <div
//                         className="flex items-center w-full sm:w-1/2 cursor-pointer"
//                         onClick={() => handleProductDetails(item.productId)}
//                       >
//                         <Image
//                           src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${item.productImages?.$values[0]}`}
//                           alt={item.productName || "Product"}
//                           width={120}
//                           height={120}
//                           className="object-cover rounded-xl shadow-sm"
//                         />
//                         <div className="ml-4 space-y-2">
//                           <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
//                             {item.productName || "Unnamed Product"}
//                           </h3>
//                           <p className="text-sm text-gray-500">({item.reviews || 0} reviews)</p>
//                           <div className="flex items-center text-yellow-400 text-sm">
//                             {"★".repeat(item.rating || 0)}
//                             <span className="ml-1 text-gray-600">({item.rating || 0})</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center justify-between w-full sm:w-1/2 mt-4 sm:mt-0">
//                         <div className="text-center">
//                           <p className="text-lg font-semibold text-green-600">
//                             ₹{(parseFloat(item.calculatedPrice) * item.quantity).toFixed(2)}
//                           </p>
//                           <p className="text-sm text-gray-500">{item.varientsName || "N/A"}</p>
//                         </div>
//                         <div className="flex items-center space-x-4">
//                           <span className="text-gray-700 font-medium">Qty: {item.quantity || 0}</span>
//                           <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={() =>
//                               handleDeleteItem(item.varientsId, item.productId, item.minimumOrderQuantity)
//                             }
//                             className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
//                           >
//                             <FaTrash className="w-4 h-4" />
//                           </motion.button>
//                         </div>
//                       </div>
//                     </motion.li>
//                   ))}
//                 </AnimatePresence>
//               </ul>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="text-center py-16 bg-white rounded-3xl shadow-lg"
//               >
//                 <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1.5}
//                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                   />
//                 </svg>
//                 <p className="mt-4 text-gray-600 text-lg font-medium">Your cart is empty</p>
//                 <Link href="/">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                   >
//                     Explore Products
//                   </motion.button>
//                 </Link>
//               </motion.div>
//             )}
//           </div>

//           {/* Order Summary */}
//           {data?.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="lg:col-span-1"
//             >
//               <div className="p-6 bg-white rounded-3xl shadow-lg sticky top-4">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
//                 <div className="space-y-4">
//                   <div className="flex justify-between text-gray-600">
//                     <span>Items ({totalQuantity})</span>
//                     <span>₹{totalPrice.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-gray-600">
//                     <span>Discount</span>
//                     <span className="text-green-600">-₹{discount.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-gray-600">
//                     <span>Subtotal</span>
//                     <span>₹{ActualPrice.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-gray-600">
//                     <span>Delivery Charges</span>
//                     <span>
//                       {deliveryCharge > 0 ? `₹${deliveryCharge.toFixed(2)}` : <span className="text-green-600">Free</span>}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="mt-6 pt-4 border-t border-gray-200">
//                   <div className="flex justify-between text-lg font-bold">
//                     <span>Total</span>
//                     <span className="text-green-600">₹{totalAmount.toFixed(2)}</span>
//                   </div>
//                   <p className="mt-2 text-sm text-green-600">
//                     You save ₹{discount.toFixed(2)} on this order
//                   </p>
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handlePlaceOrder}
//                   disabled={selectedAddress === null || data?.length === 0 || !isPincodeValid}
//                   className={`w-full mt-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
//                     selectedAddress === null || data?.length === 0 || !isPincodeValid
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
//                   }`}
//                 >
//                   Place Order
//                 </motion.button>
//                 <p className="mt-4 text-xs text-gray-500 text-center">
//                   Secure Payments | Easy Returns | 100% Authentic Products
//                 </p>
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes pulse {
//           0% { transform: scale(1); }
//           50% { transform: scale(1.05); }
//           100% { transform: scale(1); }
//         }
//         .animate-pulse {
//           animation: pulse 2s infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Cart;




// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
// import { FaTrash, FaMapMarkerAlt, FaPlus } from "react-icons/fa";
// import { makeRequest } from "@/api";
// import Swal from "sweetalert2";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { motion, AnimatePresence } from "framer-motion";

// const Cart = () => {
//   const router = useRouter();
//   const [data, setData] = useState([]);
//   const [cartLength, setLength] = useState(0);
//   const [deletingId, setDeletingId] = useState(null);
//   const [addresses, setAddresses] = useState([]);
//   const [selectedAddress, setSelectedAddress] = useState(1);
//   const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
//   const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [availability, setAvailability] = useState(null);
//   const [deliverydata, setDeliveryData] = useState([]);
//   const [isPincodeValid, setIsPincodeValid] = useState(false);

//   const Loader = () => (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
//       <motion.div
//         animate={{ rotate: 360 }}
//         transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
//         className="rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"
//       />
//       <motion.p
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="mt-4 text-lg font-medium text-gray-600"
//       >
//         Loading your cart...
//       </motion.p>
//     </div>
//   );

//   const CalculateDeliveryCharge = (data) => {
//     let totalDeliveryCharges = 0;

//     data.forEach((item) => {
//       const quantity = parseInt(item.quantity || 1);
//       const length = parseFloat(item.packageLength || 0);
//       const width = parseFloat(item.packageWidth || 0);
//       const height = parseFloat(item.packageHeight || 0);
//       const weight = parseFloat(item.packageWeight || 0);

//       const volumetricWeight = (length * width * height) / 5000;
//       const finalWeightPerUnit = Math.max(volumetricWeight, weight * quantity);

//       let deliveryChargePerUnit = 90;
//       if (finalWeightPerUnit > 2000) {
//         const extraWeight = finalWeightPerUnit - 2000;
//         const extraKg = Math.ceil(extraWeight / 1000);
//         deliveryChargePerUnit += extraKg * 35;
//       }

//       const gst = deliveryChargePerUnit * 0.18;
//       const totalPerUnit = deliveryChargePerUnit + gst;

//       totalDeliveryCharges += totalPerUnit;
//     });

//     return Math.round(totalDeliveryCharges);
//   };

//   const GetCartData = async (retries = 2) => {
//     setLoading(true);
//     const storedToken = localStorage.getItem("authToken");

//     if (!storedToken) {
//       setLoading(false);
//       Swal.fire({
//         title: "Session Expired",
//         text: "Please log in to view your cart.",
//         icon: "warning",
//         confirmButtonColor: "#2563eb",
//       });
//       router.push("/login");
//       return;
//     }

//     try {
//       const response = await makeRequest("POST", "/Cart/GetCartData", {}, {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       });

//       if (response && Array.isArray(response) && response[0]?.dataset?.$values) {
//         const cartItems = response[0].dataset.$values;
//         setLength(cartItems.length);
//         setData(cartItems);
//         setDeliveryData(cartItems);
//       } else {
//         setLength(0);
//         setData([]);
//         setDeliveryData([]);
//       }
//     } catch (error) {
//       if (retries > 0) {
//         await new Promise((resolve) => setTimeout(resolve, 1000));
//         return GetCartData(retries - 1);
//       }
//       setLength(0);
//       setData([]);
//       setDeliveryData([]);
//       Swal.fire({
//         title: "Error",
//         text: "Failed to fetch cart data.",
//         icon: "error",
//         confirmButtonColor: "#2563eb",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const checkPincodeAvailability = async (pin) => {
//     if (!pin || pin.length !== 6 || !deliverydata.length) {
//       setAvailability({
//         available: false,
//         message: !deliverydata.length ? "Cart is empty" : "Invalid pincode",
//       });
//       setIsPincodeValid(false);
//       return;
//     }

//     try {
//       const response = await makeRequest(
//         "GET",
//         `/Order/GetServiceAvailability?pincode=${pin}`
//       );

//       if (response.retval === "SUCCESS") {
//         const charges = CalculateDeliveryCharge(deliverydata);
//         setAvailability({
//           available: true,
//           deliveryDate: getDeliveryDatePlus8Days(),
//           deliveryCharge: charges,
//         });
//         setIsPincodeValid(true);
//       } else {
//         setAvailability({
//           available: false,
//           message: "Delivery not available for this pincode",
//         });
//         setIsPincodeValid(false);
//       }
//     } catch (error) {
//       setAvailability({
//         available: false,
//         message: "Error checking availability",
//       });
//       setIsPincodeValid(false);
//     }
//   };

//   const getDeliveryDatePlus8Days = () => {
//     const date = new Date();
//     date.setDate(date.getDate() + 8);
//     return date.toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const fetchAddresses = async () => {
//     const storedToken = localStorage.getItem("authToken");
//     const userId = localStorage.getItem("userId");

//     try {
//       const response = await makeRequest(
//         "POST",
//         "/Authentication/GetUserProfile",
//         { UserId: userId },
//         { headers: { Authorization: `Bearer ${storedToken}` } }
//       );

//       const addressData = response?.userProfilesEntity?.$values || [];
//       const formattedAddresses = addressData
//         .flatMap((addr) => {
//           const addressList = [
//             { address: addr.address, pincode: addr.pincode, isDefault: true },
//             { address: addr.addressOne, pincode: addr.pincode1 },
//             { address: addr.addressTwo, pincode: addr.pincode2 },
//             { address: addr.address_Three, pincode: addr.pincode3 },
//             { address: addr.address_Four, pincode: addr.pincode4 },
//           ];
//           return addressList
//             .map((item, index) => ({
//               ...item,
//               id: index + 1,
//               fullAddress: item.address?.trim() && item.pincode?.trim() ? `${item.address}, ${item.pincode}` : null,
//             }))
//             .filter((item) => item.fullAddress);
//         });

//       setAddresses(formattedAddresses);
//       if (formattedAddresses.length > 0) {
//         setSelectedAddress(1);
//         try {
//           await makeRequest(
//             "POST",
//             "/Authentication/UpdateAddressIndex",
//             { UserId: userId, SelectedAddressBlock: 1 },
//             { headers: { Authorization: `Bearer ${storedToken}` } }
//           );
//         } catch (error) {
//           console.error("Error setting default address index:", error);
//         }
//       } else {
//         setSelectedAddress(null);
//         setIsPincodeValid(false);
//         setAvailability({
//           available: false,
//           message: "No addresses available",
//         });
//       }
//     } catch (error) {
//       setAddresses([]);
//       setSelectedAddress(null);
//       setIsPincodeValid(false);
//       setAvailability({
//         available: false,
//         message: "Error fetching addresses",
//       });
//     }
//   };

//   const handleAddAddress = async (values, { resetForm }) => {
//     const storedToken = localStorage.getItem("authToken");
//     const userId = localStorage.getItem("userId");
//     const nextIndex = addresses.length + 1;

//     if (nextIndex > 5) {
//       Swal.fire({
//         title: "Error",
//         text: "Maximum of 5 addresses allowed.",
//         icon: "error",
//         confirmButtonColor: "#2563eb",
//       });
//       return;
//     }

//     try {
//       const response = await makeRequest(
//         "POST",
//         "/Authentication/EditAddressPincode",
//         {
//           UserId: userId,
//           SelectedAddressBlock: nextIndex,
//           Address: values.address,
//           pincode: values.pincode,
//         },
//         { headers: { Authorization: `Bearer ${storedToken}` } }
//       );

//       if (response.retval === "SUCCESS") {
//         await fetchAddresses();
//         setSelectedAddress(nextIndex);
//         setIsAddAddressModalOpen(false);
//         resetForm();
//         Swal.fire({
//           title: "Success",
//           text: "Address added successfully.",
//           icon: "success",
//           confirmButtonColor: "#2563eb",
//         });
//       } else {
//         Swal.fire({
//           title: "Error",
//           text: "Failed to add address.",
//           icon: "error",
//           confirmButtonColor: "#2563eb",
//         });
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "Error",
//         text: "Failed to add address.",
//         icon: "error",
//         confirmButtonColor: "#2563eb",
//       });
//     }
//   };

//   useEffect(() => {
//     const initialize = async () => {
//       setLoading(true);
//       await GetCartData();
//       await fetchAddresses();
//       if (addresses.length > 0 && deliverydata.length > 0) {
//         const initialAddress = addresses.find((addr) => addr.id === 1);
//         if (initialAddress) {
//           await checkPincodeAvailability(initialAddress.pincode);
//         }
//       }
//       setLoading(false);
//     };
//     initialize();
//   }, []);

//   useEffect(() => {
//     if (selectedAddress !== null && addresses.length > 0 && deliverydata.length > 0) {
//       const selectedAddr = addresses.find((addr) => addr.id === selectedAddress);
//       if (selectedAddr) {
//         checkPincodeAvailability(selectedAddr.pincode);
//         try {
//           const storedToken = localStorage.getItem("authToken");
//           makeRequest(
//             "POST",
//             "/Authentication/UpdateAddressIndex",
//             { UserId: localStorage.getItem("userId"), SelectedAddressBlock: selectedAddress },
//             { headers: { Authorization: `Bearer ${storedToken}` } }
//           );
//         } catch (error) {
//           console.error("Error updating address index:", error);
//         }
//       }
//     }
//   }, [addresses, deliverydata, selectedAddress]);

//   const handleAddressSelect = async (addressId) => {
//     setSelectedAddress(addressId);
//     setIsAddressModalOpen(false);
//   };

//   const addressValidationSchema = Yup.object({
//     address: Yup.string().required("Address is required"),
//     pincode: Yup.string()
//       .matches(/^\d{6}$/, "Pincode must be 6 digits")
//       .required("Pincode is required"),
//   });

//   const totalQuantity = data?.reduce(
//     (total, item) => total + (item.quantity || 0),
//     0
//   ) || 0;
//   const totalPrice = data?.reduce((total, item) => {
//     const price = parseFloat(item.pricing) || 0;
//     const qty = item.quantity || 0;
//     return total + price * qty;
//   }, 0) || 0;

//   const ActualPrice = data?.reduce((total, item) => {
//     const qty = item.quantity || 1;
//     const calculatePrice = item.calculatedPrice || 0;
//     return total + calculatePrice * qty;
//   }, 0) || 0;

//   const discount = data?.reduce((total, item) => {
//     const discountAmt = parseFloat(item.discountAmount) || 0;
//     const qty = item.quantity || 0;
//     if (item.discountType === "Flat") {
//       return total + discountAmt * qty;
//     } else if (item.discountType === "Percentage") {
//       const price = parseFloat(item.calculatedPrice) || 0;
//       return total + ((price * discountAmt) / 100) * qty;
//     }
//     return total;
//   }, 0) || 0;

//   const deliveryCharge = CalculateDeliveryCharge(data);
//   const totalAmount = ActualPrice + deliveryCharge;

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handleProductDetails = (id) => {
//     router.push(`/product/${id}`);
//   };

//   const handlePlaceOrder = async () => {
//     if (selectedAddress === null || data?.length === 0 || !isPincodeValid) {
//       Swal.fire({
//         title: "Cannot Place Order",
//         text: "Please select a valid address with available delivery.",
//         icon: "warning",
//         confirmButtonColor: "#2563eb",
//       });
//       return;
//     }

//     const selectedAddressObj = addresses.find(
//       (addr) => addr.id === selectedAddress
//     );
//     const cartItems = data;

//     const storedToken = localStorage.getItem("authToken");
//     const variantIDs = cartItems.map(
//       (item) => `${item.varientsId},${item.quantity}`
//     );

//     const payload = {
//       varientID: variantIDs,
//       DeliveryAddress: selectedAddressObj.fullAddress,
//     };

//     try {
//       const response = await makeRequest("POST", "Order/CreateOrder", payload, {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       });

//       if (!response || !response.dataset || !response.dataset.orderDetails) {
//         Swal.fire({
//           title: "Order Creation Failed",
//           text: "No order details returned",
//           icon: "error",
//           confirmButtonColor: "#2563eb",
//         });
//         return;
//       }

//       const orderDetails = response.dataset.orderDetails;
//       const { id: order_id, amount, currency } = orderDetails;

//       const razorpayLoaded = await loadRazorpayScript();
//       if (!razorpayLoaded) {
//         Swal.fire({
//           title: "Failed to Load Razorpay",
//           icon: "error",
//           confirmButtonColor: "#2563eb",
//         });
//         return;
//       }

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//         amount,
//         currency,
//         name: "Mahaagromart",
//         description: "Order Payment",
//         order_id,
//         handler: async (response) => {
//           const paymentVerification = {
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_signature: response.razorpay_signature,
//           };

//           try {
//             const verifyResponse = await makeRequest(
//               "POST",
//               "Order/VerifyPayment",
//               paymentVerification,
//               {
//                 headers: { Authorization: `Bearer ${storedToken}` },
//               }
//             );

//             if (verifyResponse) {
//               for (const item of cartItems) {
//                 await handleDeleteItem(
//                   item.varientsId,
//                   item.productId,
//                   item.minimumOrderQuantity
//                 );
//               }
//               Swal.fire({
//                 title: "Payment Successful!",
//                 text: "Your order has been placed.",
//                 icon: "success",
//                 confirmButtonColor: "#2563eb",
//               });
//               router.push("/Ordertrack");
//             } else {
//               Swal.fire({
//                 title: "Payment Verification Failed!",
//                 icon: "error",
//                 confirmButtonColor: "#2563eb",
//               });
//             }
//           } catch (error) {
//             Swal.fire({
//               title: "Payment Verification Error",
//               icon: "error",
//               confirmButtonColor: "#2563eb",
//             });
//           }
//         },
//         prefill: {
//           name: `${localStorage.getItem("firstName")} ${localStorage.getItem(
//             "lastName"
//           )}`,
//           email: localStorage.getItem("email") || "mahaagromart.com",
//           contact: localStorage.getItem("phone") || "",
//         },
//         theme: {
//           color: "#2563eb",
//         },
//       };

//       const razorpay = new window.Razorpay(options);

//       razorpay.on("payment.failed", () => {
//         Swal.fire({
//           title: "Payment Failed!",
//           text: "Please try again.",
//           icon: "error",
//           confirmButtonColor: "#2563eb",
//         });
//       });

//       razorpay.open();
//     } catch (error) {
//       Swal.fire({
//         title: "Something Went Wrong!",
//         text: "Unable to place the order.",
//         icon: "error",
//         confirmButtonColor: "#2563eb",
//       });
//     }
//   };

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
//         Swal.fire({
//           title: "Success",
//           text: "Item removed from cart",
//           icon: "success",
//           confirmButtonColor: "#2563eb",
//         }).then(() => {
//           GetCartData();
//           setDeletingId(null);
//         });
//       } else {
//         setDeletingId(null);
//         Swal.fire({
//           title: "Failed to Remove Item",
//           icon: "error",
//           confirmButtonColor: "#2563eb",
//         });
//       }
//     } catch (error) {
//       setDeletingId(null);
//       Swal.fire({
//         title: "Network Issue",
//         text: "Failed to remove item",
//         icon: "error",
//         confirmButtonColor: "#2563eb",
//       });
//     }
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-poppins">
//       <div className="container mx-auto px-4 py-12 max-w-7xl">
//         {/* Address Section */}
//         <motion.section
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mb-10 bg-white rounded-3xl shadow-xl p-6"
//         >
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold text-gray-900">Delivery Address</h2>
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={() => setIsAddressModalOpen(true)}
//               className="flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
//             >
//               <FaMapMarkerAlt className="mr-2" />
//               Change Address
//             </motion.button>
//           </div>

//           {addresses.length > 0 && selectedAddress !== null ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="p-4 rounded-2xl bg-blue-50 border border-blue-200"
//             >
//               <div className="flex items-start">
//                 <motion.div
//                   className="flex-shrink-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center mr-3"
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ type: "spring", stiffness: 300 }}
//                 >
//                   <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                     <path
//                       fillRule="evenodd"
//                       d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </motion.div>
//                 <div>
//                   <div className="flex items-center">
//                     <h3 className="text-base font-semibold text-gray-900">Selected Address</h3>
//                     <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
//                       {addresses.find((addr) => addr.id === selectedAddress)?.isDefault
//                         ? "Default"
//                         : `Address ${selectedAddress}`}
//                     </span>
//                   </div>
//                   <p className="mt-1 text-sm text-gray-700">{addresses.find((addr) => addr.id === selectedAddress)?.address}</p>
//                   <div className="mt-1 flex items-center text-sm text-gray-600">
//                     <FaMapMarkerAlt className="w-4 h-4 mr-1 text-blue-500" />
//                     Pincode: <span className="font-medium ml-1">{addresses.find((addr) => addr.id === selectedAddress)?.pincode}</span>
//                   </div>
//                   {availability && (
//                     <motion.p
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       className={`mt-1 text-sm font-medium ${availability.available ? "text-green-600" : "text-red-600"}`}
//                     >
//                       {availability.available
//                         ? `Expected delivery by ${availability.deliveryDate}`
//                         : availability.message}
//                     </motion.p>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           ) : (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-center py-8 bg-gray-50 rounded-2xl border border-gray-200"
//             >
//               <FaMapMarkerAlt className="w-10 h-10 mx-auto text-gray-400" />
//               <p className="mt-2 text-gray-600 font-medium text-sm">No addresses found</p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setIsAddAddressModalOpen(true)}
//                 className="mt-2 text-blue-600 hover:text-blue-700 font-semibold flex items-center mx-auto text-sm"
//               >
//                 <FaPlus className="mr-1" /> Add New Address
//               </motion.button>
//             </motion.div>
//           )}
//         </motion.section>

//         {/* Address Selection Modal */}
//         <AnimatePresence>
//           {isAddressModalOpen && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//                 className="bg-white rounded-3xl p-8 w-full max-w-md max-h-[80vh] overflow-y-auto shadow-2xl"
//               >
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-2xl font-bold text-gray-900">Select Delivery Address</h2>
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     onClick={() => setIsAddressModalOpen(false)}
//                     className="text-gray-600 hover:text-gray-800 text-2xl"
//                   >
//                     ×
//                   </motion.button>
//                 </div>
//                 <div className="space-y-4">
//                   {addresses.length > 0 ? (
//                     addresses.map((address) => (
//                       <motion.div
//                         key={address.id}
//                         whileHover={{ scale: 1.02 }}
//                         className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
//                           selectedAddress === address.id
//                             ? "border-blue-500 bg-blue-50 shadow-md"
//                             : "border-gray-200 hover:border-gray-300"
//                         }`}
//                         onClick={() => handleAddressSelect(address.id)}
//                       >
//                         <div className="flex items-start">
//                           <div
//                             className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
//                               selectedAddress === address.id
//                                 ? "bg-blue-500 border-blue-500"
//                                 : "border-gray-300"
//                             }`}
//                           >
//                             {selectedAddress === address.id && (
//                               <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                             )}
//                           </div>
//                           <div>
//                             <div className="flex items-center">
//                               <h3 className="font-semibold text-gray-900">Address {address.id}</h3>
//                               {address.isDefault && (
//                                 <span className="ml-3 px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
//                                   Default
//                                 </span>
//                               )}
//                             </div>
//                             <p className="mt-1 text-sm text-gray-700">{address.address}</p>
//                             <div className="mt-2 flex items-center text-sm text-gray-600">
//                               <FaMapMarkerAlt className="w-5 h-5 mr-2 text-blue-500" />
//                               Pincode: <span className="font-medium">{address.pincode}</span>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))
//                   ) : (
//                     <div className="text-center py-10 bg-gray-50 rounded-xl border border-gray-200">
//                       <FaMapMarkerAlt className="w-12 h-12 mx-auto text-gray-400" />
//                       <p className="mt-4 text-gray-600 font-medium">No addresses found</p>
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={() => {
//                           setIsAddressModalOpen(false);
//                           setIsAddAddressModalOpen(true);
//                         }}
//                         className="mt-4 text-blue-600 hover:text-blue-700 font-semibold flex items-center mx-auto"
//                       >
//                         <FaPlus className="mr-2" /> Add New Address
//                       </motion.button>
//                     </div>
//                   )}
//                 </div>
//                 {addresses.length < 5 && (
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => {
//                       setIsAddressModalOpen(false);
//                       setIsAddAddressModalOpen(true);
//                     }}
//                     className="mt-6 text-blue-600 hover:text-blue-700 font-semibold flex items-center"
//                   >
//                     <FaPlus className="mr-2" /> Add New Address
//                   </motion.button>
//                 )}
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Add Address Modal */}
//         <AnimatePresence>
//           {isAddAddressModalOpen && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 transition={{ type: "spring", stiffness: 300 }}
//                 className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
//               >
//                 <div className="flex justify-between items-center mb-6">
//                   <h2 className="text-2xl font-bold text-gray-900">Add New Address</h2>
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     onClick={() => setIsAddAddressModalOpen(false)}
//                     className="text-gray-600 hover:text-gray-800 text-2xl"
//                   >
//                     ×
//                   </motion.button>
//                 </div>
//                 <Formik
//                   initialValues={{ address: "", pincode: "" }}
//                   validationSchema={addressValidationSchema}
//                   onSubmit={handleAddAddress}
//                 >
//                   {({ isSubmitting }) => (
//                     <Form className="space-y-6">
//                       <div>
//                         <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                           Address
//                         </label>
//                         <Field
//                           type="text"
//                           name="address"
//                           className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                           placeholder="Enter your full address"
//                         />
//                         <ErrorMessage
//                           name="address"
//                           component="div"
//                           className="text-red-600 text-sm mt-1"
//                         />
//                       </div>
//                       <div>
//                         <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
//                           Pincode
//                         </label>
//                         <Field
//                           type="text"
//                           name="pincode"
//                           className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                           placeholder="Enter 6-digit pincode"
//                         />
//                         <ErrorMessage
//                           name="pincode"
//                           component="div"
//                           className="text-red-600 text-sm mt-1"
//                         />
//                       </div>
//                       <div className="flex justify-end space-x-4">
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           type="button"
//                           onClick={() => setIsAddAddressModalOpen(false)}
//                           className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg"
//                         >
//                           Cancel
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           type="submit"
//                           disabled={isSubmitting}
//                           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-all"
//                         >
//                           Save Address
//                         </motion.button>
//                       </div>
//                     </Form>
//                   )}
//                 </Formik>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Main Content */}
//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* Cart Items */}
//           <div className="lg:col-span-2">
//             {data?.length > 0 ? (
//               <ul className="space-y-6">
//                 <AnimatePresence>
//                   {data.map((item) => (
//                     <motion.li
//                       key={item.varientsId}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, x: -100 }}
//                       transition={{ duration: 0.3 }}
//                       className="flex flex-col sm:flex-row items-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
//                     >
//                       <div
//                         className="flex items-center w-full sm:w-1/2 cursor-pointer"
//                         onClick={() => handleProductDetails(item.productId)}
//                       >
//                         <Image
//                           src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${item.productImages?.$values[0]}`}
//                           alt={item.productName || "Product"}
//                           width={120}
//                           height={120}
//                           className="object-cover rounded-xl shadow-sm"
//                         />
//                         <div className="ml-4 space-y-2">
//                           <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
//                             {item.productName || "Unnamed Product"}
//                           </h3>
//                           <p className="text-sm text-gray-500">({item.reviews || 0} reviews)</p>
//                           <div className="flex items-center text-yellow-400 text-sm">
//                             {"★".repeat(item.rating || 0)}
//                             <span className="ml-1 text-gray-600">({item.rating || 0})</span>
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center justify-between w-full sm:w-1/2 mt-4 sm:mt-0">
//                         <div className="text-center">
//                           <p className="text-lg font-semibold text-green-600">
//                             ₹{(parseFloat(item.calculatedPrice) * item.quantity).toFixed(2)}
//                           </p>
//                           <p className="text-sm text-gray-500">{item.varientsName || "N/A"}</p>
//                         </div>
//                         <div className="flex items-center space-x-4">
//                           <span className="text-gray-700 font-medium">Qty: {item.quantity || 0}</span>
//                           <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={() =>
//                               handleDeleteItem(item.varientsId, item.productId, item.minimumOrderQuantity)
//                             }
//                             className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
//                           >
//                             <FaTrash className="w-4 h-4" />
//                           </motion.button>
//                         </div>
//                       </div>
//                     </motion.li>
//                   ))}
//                 </AnimatePresence>
//               </ul>
//             ) : (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="text-center py-16 bg-white rounded-3xl shadow-lg"
//               >
//                 <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1.5}
//                     d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
//                   />
//                 </svg>
//                 <p className="mt-4 text-gray-600 text-lg font-medium">Your cart is empty</p>
//                 <Link href="/">
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                   >
//                     Explore Products
//                   </motion.button>
//                 </Link>
//               </motion.div>
//             )}
//           </div>

//           {/* Order Summary */}
//           {data?.length > 0 && (
//             <motion.div
//               initial={{ opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="lg:col-span-1"
//             >
//               <div className="p-6 bg-white rounded-3xl shadow-lg sticky top-4">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
//                 <div className="space-y-4">
//                   <div className="flex justify-between text-gray-600">
//                     <span>Items ({totalQuantity})</span>
//                     <span>₹{totalPrice.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-gray-600">
//                     <span>Discount</span>
//                     <span className="text-green-600">-₹{discount.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-gray-600">
//                     <span>Subtotal</span>
//                     <span>₹{ActualPrice.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-gray-600">
//                     <span>Delivery Charges</span>
//                     <span>
//                       {deliveryCharge > 0 ? `₹${deliveryCharge.toFixed(2)}` : <span className="text-green-600">Free</span>}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="mt-6 pt-4 border-t border-gray-200">
//                   <div className="flex justify-between text-lg font-bold">
//                     <span>Total</span>
//                     <span className="text-green-600">₹{totalAmount.toFixed(2)}</span>
//                   </div>
//                   <p className="mt-2 text-sm text-green-600">
//                     You save ₹{discount.toFixed(2)} on this order
//                   </p>
//                 </div>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handlePlaceOrder}
//                   disabled={selectedAddress === null || data?.length === 0 || !isPincodeValid}
//                   className={`w-full mt-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
//                     selectedAddress === null || data?.length === 0 || !isPincodeValid
//                       ? "bg-gray-400 cursor-not-allowed"
//                       : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
//                   }`}
//                 >
//                   Place Order
//                 </motion.button>
//                 <p className="mt-4 text-xs text-gray-500 text-center">
//                   Secure Payments | Easy Returns | 100% Authentic Products
//                 </p>
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes pulse {
//           0% { transform: scale(1); }
//           50% { transform: scale(1.05); }
//           100% { transform: scale(1); }
//         }
//         .animate-pulse {
//           animation: pulse 2s infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Cart;




import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaTrash, FaMapMarkerAlt, FaPlus } from "react-icons/fa";
import { makeRequest } from "@/api";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [cartLength, setLength] = useState(0);
  const [deletingId, setDeletingId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState(null);
  const [deliverydata, setDeliveryData] = useState([]);
  const [isPincodeValid, setIsPincodeValid] = useState(false);

  const Loader = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="rounded-full h-12 w-12 border-t-4 border-b-4 border-green-500"
      />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 text-lg font-medium text-gray-600"
      >
        Loading your cart...
      </motion.p>
    </div>
  );

  const CalculateDeliveryCharge = (data) => {
    let totalDeliveryCharges = 0;

    data.forEach((item) => {
      const quantity = parseInt(item.quantity || 1);
      const length = parseFloat(item.packageLength || 0);
      const width = parseFloat(item.packageWidth || 0);
      const height = parseFloat(item.packageHeight || 0);
      const weight = parseFloat(item.packageWeight || 0);

      const volumetricWeight = (length * width * height) / 5000;
      const finalWeightPerUnit = Math.max(volumetricWeight, weight * quantity);

      let deliveryChargePerUnit = 90;
      if (finalWeightPerUnit > 2000) {
        const extraWeight = finalWeightPerUnit - 2000;
        const extraKg = Math.ceil(extraWeight / 1000);
        deliveryChargePerUnit += extraKg * 35;
      }

      const gst = deliveryChargePerUnit * 0.18;
      const totalPerUnit = deliveryChargePerUnit + gst;

      totalDeliveryCharges += totalPerUnit;
    });

    return Math.round(totalDeliveryCharges);
  };

  const GetCartData = async (retries = 2) => {
    setLoading(true);
    const storedToken = localStorage.getItem("authToken");

    if (!storedToken) {
      setLoading(false);
      Swal.fire({
        title: "Session Expired",
        text: "Please log in to view your cart.",
        icon: "warning",
        confirmButtonColor: "#2563eb",
      });
      router.push("/login");
      return;
    }

    try {
      const response = await makeRequest("POST", "/Cart/GetCartData", {}, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      if (response && Array.isArray(response) && response[0]?.dataset?.$values) {
        const cartItems = response[0].dataset.$values;
        setLength(cartItems.length);
        setData(cartItems);
        setDeliveryData(cartItems);
      } else {
        setLength(0);
        setData([]);
        setDeliveryData([]);
      }
    } catch (error) {
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return GetCartData(retries - 1);
      }
      setLength(0);
      setData([]);
      setDeliveryData([]);
      Swal.fire({
        title: "Error",
        text: "Failed to fetch cart data.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkPincodeAvailability = async (pin) => {
    if (!pin || pin.length !== 6 || !deliverydata.length) {
      setAvailability({
        available: false,
        message: !deliverydata.length ? "Cart is empty" : "Invalid pincode",
      });
      setIsPincodeValid(false);
      return;
    }

    try {
      const response = await makeRequest(
        "GET",
        `/Order/GetServiceAvailability?pincode=${pin}`
      );

      if (response.retval === "SUCCESS") {
        const charges = CalculateDeliveryCharge(deliverydata);
        setAvailability({
          available: true,
          deliveryDate: getDeliveryDatePlus8Days(),
          deliveryCharge: charges,
        });
        setIsPincodeValid(true);
      } else {
        setAvailability({
          available: false,
          message: "Delivery not available for this pincode",
        });
        setIsPincodeValid(false);
      }
    } catch (error) {
      setAvailability({
        available: false,
        message: "Error checking availability",
      });
      setIsPincodeValid(false);
    }
  };

  const getDeliveryDatePlus8Days = () => {
    const date = new Date();
    date.setDate(date.getDate() + 8);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const fetchAddresses = async () => {
    const storedToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");

    try {
      const response = await makeRequest(
        "POST",
        "/Authentication/GetUserProfile",
        { UserId: userId },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      const addressData = response?.userProfilesEntity?.$values || [];
      const formattedAddresses = addressData
        .flatMap((addr) => {
          const addressList = [
            { address: addr.address, pincode: addr.pincode, isDefault: true },
            { address: addr.addressOne, pincode: addr.pincode1 },
            { address: addr.addressTwo, pincode: addr.pincode2 },
            { address: addr.address_Three, pincode: addr.pincode3 },
            { address: addr.address_Four, pincode: addr.pincode4 },
          ];
          return addressList
            .map((item, index) => ({
              ...item,
              id: index + 1,
              fullAddress: item.address?.trim() && item.pincode?.trim() ? `${item.address}, ${item.pincode}` : null,
            }))
            .filter((item) => item.fullAddress);
        });

      setAddresses(formattedAddresses);
      if (formattedAddresses.length > 0) {
        setSelectedAddress(1);
        try {
          await makeRequest(
            "POST",
            "/Authentication/UpdateAddressIndex",
            { UserId: userId, SelectedAddressBlock: 1 },
            { headers: { Authorization: `Bearer ${storedToken}` } }
          );
        } catch (error) {
          console.error("Error setting default address index:", error);
        }
      } else {
        setSelectedAddress(null);
        setIsPincodeValid(false);
        setAvailability({
          available: false,
          message: "No addresses available",
        });
      }
    } catch (error) {
      setAddresses([]);
      setSelectedAddress(null);
      setIsPincodeValid(false);
      setAvailability({
        available: false,
        message: "Error fetching addresses",
      });
    }
  };

  const handleAddAddress = async (values, { resetForm }) => {
    const storedToken = localStorage.getItem("authToken");
    const userId = localStorage.getItem("userId");
    const nextIndex = addresses.length + 1;

    if (nextIndex > 5) {
      Swal.fire({
        title: "Error",
        text: "Maximum of 5 addresses allowed.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    try {
      const response = await makeRequest(
        "POST",
        "/Authentication/EditAddressPincode",
        {
          UserId: userId,
          SelectedAddressBlock: nextIndex,
          Address: values.address,
          pincode: values.pincode,
        },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      if (response.retval === "SUCCESS") {
        await fetchAddresses();
        setSelectedAddress(nextIndex);
        setIsAddAddressModalOpen(false);
        resetForm();
        Swal.fire({
          title: "Success",
          text: "Address added successfully.",
          icon: "success",
          confirmButtonColor: "#2563eb",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to add address.",
          icon: "error",
          confirmButtonColor: "#2563eb",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Failed to add address.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      await GetCartData();
      await fetchAddresses();
      if (addresses.length > 0 && deliverydata.length > 0) {
        const initialAddress = addresses.find((addr) => addr.id === 1);
        if (initialAddress) {
          await checkPincodeAvailability(initialAddress.pincode);
        }
      }
      setLoading(false);
    };
    initialize();
  }, []);

  useEffect(() => {
    if (selectedAddress !== null && addresses.length > 0 && deliverydata.length > 0) {
      const selectedAddr = addresses.find((addr) => addr.id === selectedAddress);
      if (selectedAddr) {
        checkPincodeAvailability(selectedAddr.pincode);
        try {
          const storedToken = localStorage.getItem("authToken");
          makeRequest(
            "POST",
            "/Authentication/UpdateAddressIndex",
            { UserId: localStorage.getItem("userId"), SelectedAddressBlock: selectedAddress },
            { headers: { Authorization: `Bearer ${storedToken}` } }
          );
        } catch (error) {
          console.error("Error updating address index:", error);
        }
      }
    }
  }, [addresses, deliverydata, selectedAddress]);

  const handleAddressSelect = async (addressId) => {
    setSelectedAddress(addressId);
    setIsAddressModalOpen(false);
  };

  const addressValidationSchema = Yup.object({
    address: Yup.string().required("Address is required"),
    pincode: Yup.string()
      .matches(/^\d{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
  });

  const totalQuantity = data?.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  ) || 0;
  const totalPrice = data?.reduce((total, item) => {
    const price = parseFloat(item.pricing) || 0;
    const qty = item.quantity || 0;
    return total + price * qty;
  }, 0) || 0;

  const ActualPrice = data?.reduce((total, item) => {
    const qty = item.quantity || 1;
    const calculatePrice = item.calculatedPrice || 0;
    return total + calculatePrice * qty;
  }, 0) || 0;

  const discount = data?.reduce((total, item) => {
    const discountAmt = parseFloat(item.discountAmount) || 0;
    const qty = item.quantity || 0;
    if (item.discountType === "Flat") {
      return total + discountAmt * qty;
    } else if (item.discountType === "Percentage") {
      const price = parseFloat(item.calculatedPrice) || 0;
      return total + ((price * discountAmt) / 100) * qty;
    }
    return total;
  }, 0) || 0;

  const deliveryCharge = CalculateDeliveryCharge(data);
  const totalAmount = ActualPrice + deliveryCharge;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleProductDetails = (id) => {
    router.push(`/product/${id}`);
  };

  const handlePlaceOrder = async () => {
    if (selectedAddress === null || data?.length === 0 || !isPincodeValid) {
      Swal.fire({
        title: "Cannot Place Order",
        text: "Please select a valid address with available delivery.",
        icon: "warning",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    const selectedAddressObj = addresses.find(
      (addr) => addr.id === selectedAddress
    );
    const cartItems = data;

    const storedToken = localStorage.getItem("authToken");
    const variantIDs = cartItems.map(
      (item) => `${item.varientsId},${item.quantity}`
    );

    const payload = {
      varientID: variantIDs,
      DeliveryAddress: selectedAddressObj.fullAddress,
    };

    try {
      const response = await makeRequest("POST", "Order/CreateOrder", payload, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      if (!response || !response.dataset || !response.dataset.orderDetails) {
        Swal.fire({
          title: "Order Creation Failed",
          text: "No order details returned",
          icon: "error",
          confirmButtonColor: "#2563eb",
        });
        return;
      }

      const orderDetails = response.dataset.orderDetails;
      const { id: order_id, amount, currency } = orderDetails;

      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        Swal.fire({
          title: "Failed to Load Razorpay",
          icon: "error",
          confirmButtonColor: "#2563eb",
        });
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "Mahaagromart",
        description: "Order Payment",
        order_id,
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
              {
                headers: { Authorization: `Bearer ${storedToken}` },
              }
            );

            if (verifyResponse) {
              for (const item of cartItems) {
                await handleDeleteItem(
                  item.varientsId,
                  item.productId,
                  item.minimumOrderQuantity
                );
              }
              Swal.fire({
                title: "Payment Successful!",
                text: "Your order has been placed.",
                icon: "success",
                confirmButtonColor: "#2563eb",
              });
              router.push("/Ordertrack");
            } else {
              Swal.fire({
                title: "Payment Verification Failed!",
                icon: "error",
                confirmButtonColor: "#2563eb",
              });
            }
          } catch (error) {
            Swal.fire({
              title: "Payment Verification Error",
              icon: "error",
              confirmButtonColor: "#2563eb",
            });
          }
        },
        prefill: {
          name: `${localStorage.getItem("firstName")} ${localStorage.getItem(
            "lastName"
          )}`,
          email: localStorage.getItem("email") || "mahaagromart.com",
          contact: localStorage.getItem("phone") || "",
        },
        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", () => {
        Swal.fire({
          title: "Payment Failed!",
          text: "Please try again.",
          icon: "error",
          confirmButtonColor: "#2563eb",
        });
      });

      razorpay.open();
    } catch (error) {
      Swal.fire({
        title: "Something Went Wrong!",
        text: "Unable to place the order.",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    }
  };

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
        Swal.fire({
          title: "Success",
          text: "Item removed from cart",
          icon: "success",
          confirmButtonColor: "#2563eb",
        }).then(() => {
          GetCartData();
          setDeletingId(null);
        });
      } else {
        setDeletingId(null);
        Swal.fire({
          title: "Failed to Remove Item",
          icon: "error",
          confirmButtonColor: "#2563eb",
        });
      }
    } catch (error) {
      setDeletingId(null);
      Swal.fire({
        title: "Network Issue",
        text: "Failed to remove item",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-poppins">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Address Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 bg-white rounded-3xl shadow-xl p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Delivery Address</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAddressModalOpen(true)}
              className="flex items-center text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
            >
              <FaMapMarkerAlt className="mr-2" />
              Change Address
            </motion.button>
          </div>

          {addresses.length > 0 && selectedAddress !== null ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 rounded-2xl bg-blue-50 border border-blue-200"
            >
              <div className="flex items-start">
                <motion.div
                  className="flex-shrink-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center mr-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.div>
                <div>
                  <div className="flex items-center">
                    <h3 className="text-base font-semibold text-gray-900">Selected Address</h3>
                    <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {addresses.find((addr) => addr.id === selectedAddress)?.isDefault
                        ? "Default"
                        : `Address ${selectedAddress}`}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-700">{addresses.find((addr) => addr.id === selectedAddress)?.address}</p>
                  <div className="mt-1 flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="w-4 h-4 mr-1 text-blue-500" />
                    Pincode: <span className="font-medium ml-1">{addresses.find((addr) => addr.id === selectedAddress)?.pincode}</span>
                  </div>
                  {availability && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`mt-1 text-sm font-medium ${availability.available ? "text-green-600" : "text-red-600"}`}
                    >
                      {availability.available
                        ? `Expected delivery by ${availability.deliveryDate}`
                        : availability.message}
                    </motion.p>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 bg-gray-50 rounded-2xl border border-gray-200"
            >
              <FaMapMarkerAlt className="w-10 h-10 mx-auto text-gray-400" />
              <p className="mt-2 text-gray-600 font-medium text-sm">No addresses found</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAddAddressModalOpen(true)}
                className="mt-2 text-blue-600 hover:text-blue-700 font-semibold flex items-center mx-auto text-sm"
              >
                <FaPlus className="mr-1" /> Add New Address
              </motion.button>
            </motion.div>
          )}
        </motion.section>

        {/* Address Selection Modal */}
        <AnimatePresence>
          {isAddressModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-3xl p-6 w-full max-w-md max-h-[80vh] overflow-y-hidden shadow-2xl"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Select Delivery Address</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setIsAddressModalOpen(false)}
                    className="text-gray-600 hover:text-gray-800 text-2xl"
                  >
                    ×
                  </motion.button>
                </div>
                <div className="space-y-3">
                  {addresses.length > 0 ? (
                    addresses.map((address) => (
                      <motion.div
                        key={address.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-3 rounded-xl border cursor-pointer transition-all duration-300 ${
                          selectedAddress === address.id
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => handleAddressSelect(address.id)}
                      >
                        <div className="flex items-start">
                          <div
                            className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                              selectedAddress === address.id
                                ? "bg-blue-500 border-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            {selectedAddress === address.id && (
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-semibold text-gray-900">Address {address.id}</h3>
                              {address.isDefault && (
                                <span className="ml-3 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-sm text-gray-700">{address.address}</p>
                            <div className="mt-1 flex items-center text-sm text-gray-600">
                              <FaMapMarkerAlt className="w-4 h-4 mr-1 text-blue-500" />
                              Pincode: <span className="font-medium">{address.pincode}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-xl border border-gray-200">
                      <FaMapMarkerAlt className="w-10 h-10 mx-auto text-gray-400" />
                      <p className="mt-2 text-gray-600 font-medium text-sm">No addresses found</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setIsAddressModalOpen(false);
                          setIsAddAddressModalOpen(true);
                        }}
                        className="mt-2 text-blue-600 hover:text-blue-700 font-semibold flex items-center mx-auto text-sm"
                      >
                        <FaPlus className="mr-1" /> Add New Address
                      </motion.button>
                    </div>
                  )}
                </div>
                {addresses.length < 5 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsAddressModalOpen(false);
                      setIsAddAddressModalOpen(true);
                    }}
                    className="mt-4 text-blue-600 hover:text-blue-700 font-semibold flex items-center text-sm"
                  >
                    <FaPlus className="mr-1" /> Add New Address
                  </motion.button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Address Modal */}
        <AnimatePresence>
          {isAddAddressModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">Add New Address</h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => setIsAddAddressModalOpen(false)}
                    className="text-gray-600 hover:text-gray-800 text-2xl"
                  >
                    ×
                  </motion.button>
                </div>
                <Formik
                  initialValues={{ address: "", pincode: "" }}
                  validationSchema={addressValidationSchema}
                  onSubmit={handleAddAddress}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-4">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                          Address
                        </label>
                        <Field
                          type="text"
                          name="address"
                          className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="Enter your full address"
                        />
                        <ErrorMessage
                          name="address"
                          component="div"
                          className="text-red-600 text-sm mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                          Pincode
                        </label>
                        <Field
                          type="text"
                          name="pincode"
                          className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="Enter 6-digit pincode"
                        />
                        <ErrorMessage
                          name="pincode"
                          component="div"
                          className="text-red-600 text-sm mt-1"
                        />
                      </div>
                      <div className="flex justify-end space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => setIsAddAddressModalOpen(false)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium rounded-lg"
                        >
                          Cancel
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="submit"
                          disabled={isSubmitting}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-all"
                        >
                          Save Address
                        </motion.button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {data?.length > 0 ? (
              <ul className="space-y-6">
                <AnimatePresence>
                  {data.map((item) => (
                    <motion.li
                      key={item.varientsId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col sm:flex-row items-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div
                        className="flex items-center w-full sm:w-1/2 cursor-pointer"
                        onClick={() => handleProductDetails(item.productId)}
                      >
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${item.productImages?.$values[0]}`}
                          alt={item.productName || "Product"}
                          width={120}
                          height={120}
                          className="object-cover rounded-xl shadow-sm"
                        />
                        <div className="ml-4 space-y-2">
                          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                            {item.productName || "Unnamed Product"}
                          </h3>
                          <p className="text-sm text-gray-500">({item.reviews || 0} reviews)</p>
                          <div className="flex items-center text-yellow-400 text-sm">
                            {"★".repeat(item.rating || 0)}
                            <span className="ml-1 text-gray-600">({item.rating || 0})</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between w-full sm:w-1/2 mt-4 sm:mt-0">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-green-600">
                            ₹{(parseFloat(item.calculatedPrice) * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">{item.varientsName || "N/A"}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-700 font-medium">Qty: {item.quantity || 0}</span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              handleDeleteItem(item.varientsId, item.productId, item.minimumOrderQuantity)
                            }
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
                          >
                            <FaTrash className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white rounded-3xl shadow-lg"
              >
                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <p className="mt-4 text-gray-600 text-lg font-medium">Your cart is empty</p>
                <Link href="/">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Explore Products
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Order Summary */}
          {data?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="p-6 bg-white rounded-3xl shadow-lg sticky top-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Items ({totalQuantity})</span>
                    <span>₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Discount</span>
                    <span className="text-green-600">-₹{discount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{ActualPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charges</span>
                    <span>
                      {deliveryCharge > 0 ? `₹${deliveryCharge.toFixed(2)}` : <span className="text-green-600">Free</span>}
                    </span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">₹{totalAmount.toFixed(2)}</span>
                  </div>
                  <p className="mt-2 text-sm text-green-600">
                    You save ₹{discount.toFixed(2)} on this order
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlaceOrder}
                  disabled={selectedAddress === null || data?.length === 0 || !isPincodeValid}
                  className={`w-full mt-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ${
                    selectedAddress === null || data?.length === 0 || !isPincodeValid
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                  }`}
                >
                  Place Order
                </motion.button>
                <p className="mt-4 text-xs text-gray-500 text-center">
                  Secure Payments | Easy Returns | 100% Authentic Products
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        .animate-pulse {
          animation: pulse 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Cart;
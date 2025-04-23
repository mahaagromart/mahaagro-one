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
//     const userId = localStorage.getItem("userId");
//     try {
//       const response = await makeRequest("POST", "/Authentication/GetUserProfile", { UserId: userId }, {
//         headers: { Authorization: `Bearer ${storedToken}` }
//       });

//       // Extract the addresses and pincodes
//       const addressData = response?.userProfilesEntity?.$values || [];
//       const formattedAddresses = addressData.flatMap(addr => [
//         {
//           id: addr.$id,
//           fullAddress: `${addr.address}, ${addr.cityName}, ${addr.stateName} - ${addr.pincode}`,
//           firstName: addr.firstName,
//           lastName: addr.lastName,
//           phoneNumber: addr.phoneNumber,
//         },
//         {
//           id: addr.$id + "_1", // Unique ID for addressOne
//           fullAddress: `${addr.addressOne}, ${addr.cityName}, ${addr.stateName} - ${addr.pincode1}`,
//           firstName: addr.firstName,
//           lastName: addr.lastName,
//           phoneNumber: addr.phoneNumber,
//         },
//         {
//           id: addr.$id + "_2", // Unique ID for addressTwo
//           fullAddress: `${addr.addressTwo}, ${addr.cityName}, ${addr.stateName} - ${addr.pincode2}`,
//           firstName: addr.firstName,
//           lastName: addr.lastName,
//           phoneNumber: addr.phoneNumber,
//         }
//       ]);

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

// //   const handlePlaceOrder = async (selectedAddressObj, cartItems) => {
// //     console.log("called")
// //     // if (!selectedAddressObj || cartItems.length === 0) {
// //     //   console.warn("Missing address or cart items");
// //     //   return;
// //     // }

// //     const storedToken = localStorage.getItem("authToken");
// // debugger
// //     console.log(cartItems);



// //     const variantIDs = cartItems.map(item => item.varientsId.toString());

// //     // Create request payload
// //     const payload = {
// //       varientID: variantIDs,
// //       DeliveryAddress: selectedAddressObj.fullAddress
// //     };



// //     try {
// //       const response = await makeRequest("POST","Order/CreateOrder",payload, {headers: {Authorization: `Bearer ${storedToken}`}});

// //       const dataset = response?.[0]?.dataset;
// //       if (dataset) {
// //         const { id: order_id, amount, currency } = dataset.orderDetails;

// //         const res = await loadRazorpayScript();
// //         if (!res) {
// //           alert("Failed to load Razorpay. Please check your connection.");
// //           return;
// //         }

// //         const options = {
// //           key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
// //           amount: amount,
// //           currency: currency,
// //           name: "Mahaagromart",
// //           description: "Order Payment",
// //           order_id: order_id,
// //           handler: async (response) => {
// //             const paymentVerification = {
// //               razorpay_payment_id: response.razorpay_payment_id,
// //               razorpay_order_id: response.razorpay_order_id,
// //               razorpay_signature: response.razorpay_signature,
// //             };

// //             try {
// //               const verifyResponse = await makeRequest(
// //                 "POST",
// //                 "Order/VerifyPayment",
// //                 paymentVerification,
// //                 {
// //                   headers: {
// //                     Authorization: `Bearer ${storedToken}`
// //                   }
// //                 }
// //               );

// //               if (verifyResponse) {
// //                 Swal.fire("Payment Verified! ✅", "", "success").then(() =>
// //                   router.push("/order-success")
// //                 );
// //               } else {
// //                 Swal.fire("Payment Verification Failed! ❌", "", "error");
// //               }
// //             } catch (error) {
// //               console.error("Error Verifying Payment:", error);
// //               Swal.fire("Payment Verification Error", "", "error");
// //             }
// //           },
// //           prefill: {
// //             name: selectedAddressObj.name || "John Doe",
// //             email: "johndoe@example.com",
// //             contact: "9999999999",
// //           },
// //           theme: {
// //             color: "#3399cc",
// //           },
// //         };

// //         const razorpay = new window.Razorpay(options);
// //         razorpay.on("payment.failed", (response) => {
// //           console.error("Payment Failed:", response.error);
// //           Swal.fire("Payment Failed!", "Please try again.", "error");
// //         });

// //         razorpay.open();
// //       } else {
// //         Swal.fire("Failed to create order", "", "error");
// //       }
// //     } catch (error) {
// //       console.error("Error Creating Order:", error);
// //       Swal.fire("Something went wrong!", "Unable to place the order.", "error");
// //     }
// //   };

// const handlePlaceOrder = async (selectedAddressObj, cartItems) => {
//   if (!selectedAddressObj || cartItems.length === 0) {
//     Swal.fire("Missing address or cart items", "", "warning");
//     return;
//   }

//   const storedToken = localStorage.getItem("authToken");

//   const variantIDs = cartItems.map(item => `${item.varientsId},${item.quantity}`);

//   const payload = {
//     varientID: variantIDs,
//     DeliveryAddress: selectedAddressObj.id // or .fullAddress if required
//   };

//   try {
//     const response = await makeRequest("POST", "Order/CreateOrder", payload, {
//       headers: { Authorization: `Bearer ${storedToken}` }
//     });
  
//     if (!response || !response.dataset || !response.dataset.orderDetails) {
//       Swal.fire("Order creation failed", "No order details returned", "error");
//       return;
//     }
  
//     const orderDetails = response.dataset.orderDetails;
//     const { id: order_id, amount, currency } = orderDetails;
//     const message = response.message || "Order created successfully";
  
//     const razorpayLoaded = await loadRazorpayScript();
//     if (!razorpayLoaded) {
//       Swal.fire("Failed to load Razorpay", "", "error");
//       return;
//     }
  
//     const options = {
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//       amount,
//       currency,
//       name: "Mahaagromart",
//       description: "Order Payment",
//       order_id,
//       handler: async (response) => {
//         const paymentVerification = {
//           razorpay_payment_id: response.razorpay_payment_id,
//           razorpay_order_id: response.razorpay_order_id,
//           razorpay_signature: response.razorpay_signature,
//         };
  
//         try {
//           const verifyResponse = await makeRequest(
//             "POST",
//             "Order/VerifyPayment",
//             paymentVerification,
//             {
//               headers: {
//                 Authorization: `Bearer ${storedToken}`
//               }
//             }
//           );
  
//           if (verifyResponse) {
//             for (const item of cartItems) {
//               await handleDeleteItem(item.varientsId, item.productId, item.minimumOrderQuantity);
//             }
//           } else {
//             Swal.fire("Payment Verification Failed! ❌", "", "error");
//           }
//         } catch (error) {
//           console.error("Error verifying payment:", error);
//           Swal.fire("Payment Verification Error", "", "error");
//         }
//       },
//       prefill: {
//         name: `${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}`,
//         email: "mahaagromart.com",
//         contact: selectedAddressObj.phoneNumber  ,
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };
  
//     const razorpay = new window.Razorpay(options);
  
//     razorpay.on("payment.failed", (response) => {
//       console.error("Payment Failed:", response.error);
//       Swal.fire("Payment Failed!", "Please try again.", "error");
//     });
  
//     razorpay.open();
//   } catch (error) {
//     console.error("Order creation error:", error);
//     Swal.fire("Something went wrong!", "Unable to place the order.", "error");
//   }
// };

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


//       console.log(response)

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
//             <button onClick={() => handlePlaceOrder(addresses.find(addr => addr.id === selectedAddress),data )}
//               disabled={!selectedAddress || data?.length === 0}
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
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [availability, setAvailability] = useState(null);
  const [deliverydata, setDeliveryData] = useState([]);

  const Loader = () => (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
      <p className="mt-4 text-lg text-gray-600">Loading product details...</p>
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
  
      let deliveryChargePerUnit = 90; // base charge for up to 2kg
  
      if (finalWeightPerUnit > 2000) {
        const extraWeight = finalWeightPerUnit - 2000;
        const extraKg = Math.ceil(extraWeight / 1000);
        deliveryChargePerUnit += extraKg * 35;
      }
  
      const gst = deliveryChargePerUnit * 0.18;
      const totalPerUnit = deliveryChargePerUnit + gst;
  
      totalDeliveryCharges += totalPerUnit ;
    });
  
    return Math.round(totalDeliveryCharges);
  };
  
  const GetCartData = async (retries = 2) => {
    setLoading(true);
    const storedToken = localStorage.getItem("authToken");

    if (!storedToken) {
      setLoading(false);
      Swal.fire("Session Expired", "Please log in to view your cart.", "warning");
      router.push("/login");
      return;
    }

    try {
      const response = await makeRequest("POST", "/Cart/GetCartData", {}, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });



      if (
        response &&
        Array.isArray(response) &&
        response[0]?.dataset?.$values
      ) {
        const cartItems = response[0].dataset.$values;
 
        setLength(cartItems.length);
        setData(cartItems);
      } else {
        console.warn("No valid cart data found in response:", response);
        setLength(0);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
      if (retries > 0) {
        console.log(`Retrying... (${retries} attempts left)`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return GetCartData(retries - 1);
      }
      setLength(0);
      setData([]);
      Swal.fire("Error", "Failed to fetch cart data. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };


  // const checkPincodeAvailability = async (pin) => {
  
  //     if (pin.length !== 6 || !deliverydata) {
  //       setAvailability(null);
  //       return;
  //     }
  //     try {
  //       const response = await makeRequest('get', `/Order/GetServiceAvailability?pincode=${pin}`);
  
  //       if (response.retval === "SUCCESS") {
  //         const charges = getDeliveryCharges(deliverydata);
  //         setDeliveryCharges(charges);
  
  //         setAvailability({
  //           available: true,
  //           deliveryDate: getDeliveryDatePlus8Days(),
  //           deliveryCharge: deliveryCharges
  
  //         });
  //       } else {
  //         setAvailability({
  //           available: false,
  //           message: 'Delivery not available for this pincode',
  //         });
  //       }
  //     } catch (error) {
  //       setAvailability({
  //         available: false,
  //         message: 'Error checking availability',
  //       });
  //     }
  //   };

 
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
          // Include all 5 possible addresses
          const addressList = [
            { address: addr.address, pincode: addr.pincode, isDefault: true },
            { address: addr.addressOne, pincode: addr.pincode1 },
            { address: addr.addressTwo, pincode: addr.pincode2 },
            { address: addr.address_Three, pincode: addr.pincode3 },
            { address: addr.address_Four, pincode: addr.pincode4 },
          ];
          // Filter out empty addresses
          return addressList.filter((item) => item.address?.trim() && item.pincode?.trim());
        })
        .map((item, index) => ({
          ...item,
          id: index,
          fullAddress: `${item.address}, ${item.pincode}`,
        }));
  
      setAddresses(formattedAddresses);
      
      // Default to first address (index 0) if available
      if (formattedAddresses.length > 0) {
        setSelectedAddress(0);
      } else {
        setSelectedAddress(null);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setAddresses([]);
      setSelectedAddress(null);
    }
  };
  useEffect(() => {
    GetCartData();
    fetchAddresses();
    console.log(addresses)
 
  }, []);


  
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (pincode.length === 6) {
  //       checkPincodeAvailability(pincode);
  //     } else {
  //       setAvailability(null);
  //     }
  //   }, 500);

  //   return () => clearTimeout(timer);

  // }, [pincode]);



  const totalQuantity = data?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
  const totalPrice = data?.reduce((total, item) => {
    const price = parseFloat(item.pricing) || 0;
    const qty = item.quantity || 0;
    return total + price * qty;
  }, 0) || 0;

  const ActualPrice = data?.reduce((total, item) => {
    const qty = item.quantity || 1;
    const calculatePrice = item.calculatedPrice || 0;
    return total + (calculatePrice * qty);
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

  const deliveryCharge =  CalculateDeliveryCharge(data);
  const totalAmount = ActualPrice + deliveryCharge;


  const getGST =()=>{
    data?.map((taxCalculation , taxAmount)=>{
      if(taxCalculation == null){
        return  0;
      }else{
        return  taxAmount;
      }
    })
  } 

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
    if (!selectedAddress || data?.length === 0) {
      Swal.fire("Missing address or cart items", "", "warning");
      return;
    }

    const selectedAddressObj = addresses.find((addr) => addr.id === selectedAddress);
    const cartItems = data;

    const storedToken = localStorage.getItem("authToken");
    const variantIDs = cartItems.map((item) => `${item.varientsId},${item.quantity}`);

    const payload = {
      varientID: variantIDs,
      DeliveryAddress: selectedAddressObj.fullAddress,
    };

    try {
      const response = await makeRequest("POST", "Order/CreateOrder", payload, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });

      if (!response || !response.dataset || !response.dataset.orderDetails) {
        Swal.fire("Order creation failed", "No order details returned", "error");
        return;
      }
      console.log(response)

      const orderDetails = response.dataset.orderDetails;
      const { id: order_id, amount, currency } = orderDetails;


      const razorpayLoaded = await loadRazorpayScript();
      if (!razorpayLoaded) {
        Swal.fire("Failed to load Razorpay", "", "error");
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
                await handleDeleteItem(item.varientsId, item.productId, item.minimumOrderQuantity);
              }
              Swal.fire("Payment Successful!", "Your order has been placed.", "success");
              router.push("/Ordertrack");
            } else {
              Swal.fire("Payment Verification Failed! ❌", "", "error");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            Swal.fire("Payment Verification Error", "", "error");
          }
        },
        prefill: {
          name: `${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}`,
          email: localStorage.getItem("email") || "mahaagromart.com",
          contact: localStorage.getItem("phone") || "",
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
    } catch (error) {
      console.error("Order creation error:", error);
      Swal.fire("Something went wrong!", "Unable to place the order.", "error");
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

  const handleAddressSelect = (addressId) => {

    setSelectedAddress(addressId);
    setIsAddressModalOpen(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-4 md:p-8 bg-white rounded-xl font-poppins max-w-7xl">
      {/* Address Section */}
      <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Delivery Address</h3>
          <button
            onClick={() => setIsAddressModalOpen(true)}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Change
          </button>
        </div>

        {addresses.length > 0 && selectedAddress !== null && selectedAddress < addresses.length ? (
  <div className="p-4 rounded-lg border border-blue-500 bg-blue-50 transition-all duration-200">
    <div className="flex items-start">
      <div className="flex-shrink-0 h-5 w-5 rounded-full border border-blue-500 bg-blue-500 flex items-center justify-center mt-0.5 mr-3">
        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div>
        <div className="flex items-center">
          <h4 className="font-medium text-gray-900">Delivery Address</h4>
          <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">Default</span>
        </div>
        <p className="mt-1 text-sm text-gray-600">{addresses[selectedAddress].address}</p>
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
              Pincode: {addresses[selectedAddress].pincode}
        </div>
      </div>
    </div>
  </div>
) : (
  <div className="text-center py-6 bg-gray-50 rounded-lg">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 mx-auto text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
    <p className="mt-2 text-gray-600">No addresses found</p>
    <button
      onClick={() => setIsAddressModalOpen(true)}
      className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
    >
      + Add New Address
    </button>
  </div>
)}
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
                addresses.map((address, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md ${
                      selectedAddress === index ? "border-blue-500 bg-blue-50 shadow-sm" : "border-gray-200 hover:border-gray-300"}`}
                    onClick={() => handleAddressSelect(index)}
                  >
                    <div className="flex items-start">
                      <div
                        className={`flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center mt-0.5 mr-3 ${
                          selectedAddress === index ? "border-blue-500 bg-blue-500" : "border-gray-300"
                        }`}
                      >
                        {selectedAddress === index && (
                          <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
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
                          <h4 className="font-medium text-gray-900">Address {index + 1}</h4>
                          {selectedAddress === index && (
                            <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">Default</span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-gray-600">{address.address}</p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          Pincode: {address.pincode}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 bg-gray-50 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 mx-auto text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <p className="mt-2 text-gray-600">No addresses found</p>
                  <button
                    onClick={() => router.push("/profile")}
                    className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                  >
                    + Add New Address
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items - Left Side */}
        <div className="lg:w-8/12">
          {data?.length > 0 ? (
            <ul className="space-y-6">
              {data.map((item) => {
                const isDeleting = deletingId === item.varientsId;

                return (
                  <li
                    key={item.varientsId}
                    className={`flex flex-col md:flex-row justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 ${
                      isDeleting ? "opacity-0 translate-x-[-100%]" : "opacity-100 translate-x-0"
                    }`}
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
                        className="object-cover rounded"
                      />
                      <div className="space-y-1 ml-4">
                        <span className="font-semibold text-lg text-gray-800 hover:text-green-600 transition-colors duration-200">
                          {item.productName || "Unnamed Product"}
                        </span>
                        <div className="text-xs text-gray-500">({item.reviews || 0} reviews)</div>
                        <div className="text-yellow-400 text-sm">
                          {"★".repeat(item.rating || 0)} <span className="text-gray-600 text-xs">({item.rating || 0})</span>
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
        </div>

        {/* Price Details - Right Side */}
        {data?.length > 0 && (
          <div className="lg:w-4/12">
            <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm sticky top-4">
              <div className="pb-4 border-b border-gray-200">
                <span className="text-lg font-semibold">Price Details</span>
              </div>

              <div className="space-y-4 mt-4">
                <div className="flex justify-between">
                  <div className="text-gray-600">
                    Price ({totalQuantity} {totalQuantity > 1 ? "items" : "item"})
                  </div>
                  <div className="font-medium">₹{totalPrice.toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-gray-600">Discount</div>
                  <div className="text-green-600 font-medium">- ₹{discount.toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-gray-600">Current Price</div>
                  <div className="text-green-600 font-medium">+ ₹{ActualPrice.toFixed(2)}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-gray-600">Delivery Charges</div>
                  <div className="font-medium">
                    +{deliveryCharge > 0 ? `₹${deliveryCharge.toFixed(2)}` : <span className="text-green-600">Free</span>}
                  </div>
                </div>
{/*                 
                <div className="flex justify-between">
                  <div className="text-gray-600">GST</div>
                  {getGST() > 0 ? getGST().toFixed() : "GST INCLUDED"}
                  <div className="font-medium">{0}</div>
                </div> */}
              </div>






              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-bold">Total Amount</div>
                  <div className="text-xl font-bold text-green-600">₹{totalAmount.toFixed(2)}</div>
                </div>
                <div className="mt-2 text-sm text-green-600">You will save ₹{discount.toFixed(2)} on this order</div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={!selectedAddress || data?.length === 0}
                className={`w-full mt-6 py-3 rounded-md text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg ${
                  !selectedAddress || data?.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                }`}
              >
                Place Order
              </button>

              <div className="mt-4 text-xs text-gray-500 text-center">
                Safe and Secure Payments. Easy returns. 100% Authentic products.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
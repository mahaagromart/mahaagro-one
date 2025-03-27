// import Image from "next/image";
// import { useSelector, useDispatch } from "react-redux";
// import { removeFromCart, clearCart } from "../store/cartslice";
// import Link from "next/link";
// import { useRouter } from 'next/router';

// const Cart = ({cartData}) => {
//   console.log(cartData)


//   const { cartItems, totalQuantity } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const router = useRouter();

//   // Calculate total price
//   const totalPrice = cartItems.reduce((total, item) => {
//     return total + (item.selectedDiscountedPrice ?? 0) * item.quantity;
//   }, 0);

//   const renderStars = (rating) => {
//     let stars = '';
//     for (let i = 0; i < 5; i++) {
//       stars += i < rating ? '★' : '☆';
//     }
//     return stars;
//   };

//   const handleProductDetails = (id) => {
//     router.push(`/product/${id}`);
//   };

//   const handlePlaceOrder = () => {
//     router.push({
//       pathname: '/Billform',
//       query: { totalPrice, totalQuantity }
//     });
//   };

//   return (
//     <div className="container mx-auto p-4 border-2 rounded-lg font-poppins">
//       <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <ul className="mb-4">
//           {cartItems.map((item) => (
//             <li key={item.id} className="flex flex-col md:flex-row justify-between items-center mb-2 p-2 border-b">
//               <div className="flex items-center cursor-pointer w-full md:w-auto" onClick={() => handleProductDetails(item.id)}>
//                 <Image
//                   src={item.image ?? '/path/to/default-image.webp'}
//                   alt={item.name}
//                   width={50}
//                   height={50}
//                   className="mr-4"
//                 />
//                 <div>
//                   <span className="font-semibold">{item.name}</span>
//                   <div className="text-xs text-gray-500">{item.category}</div>
//                   <div className="text-xs text-gray-500 mt-1">({item.reviews} reviews)</div>
//                   <div className="text-yellow-500 text-xs">{renderStars(item.rating)}</div>
//                 </div>
//               </div>

//               <div className="text-right w-full md:w-auto mt-2 md:mt-0">
//                 <span className="font-semibold">₹{item.selectedDiscountedPrice}</span>
//                 <div className="text-xs text-gray-500">({item.selectedWeight})</div>
//               </div>

//               <div className="flex items-center w-full md:w-auto mt-2 md:mt-0">
//                 <span className="mr-2">Quantity: {item.quantity}</span>
//                 <button
//                   onClick={() => dispatch(removeFromCart(item.id))}
//                   className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300 w-full md:w-auto"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//       <div className="mb-4">
//         <h3 className="text-xl font-semibold">Total Items: {totalQuantity}</h3>
//         <h3 className="text-xl font-semibold">Total Price: ₹{totalPrice.toFixed(2)}</h3>
//       </div>

//       <div className="flex flex-col md:flex-row justify-between items-center">
//         <button
//           onClick={() => dispatch(clearCart())}
//           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 mb-2 md:mb-0 w-full md:w-auto"
//         >
//           Clear Cart
//         </button>

//         {cartItems.length > 0 ? (
//           <button onClick={handlePlaceOrder} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 w-full md:w-auto">
//             Place Order
//           </button>
//         ) : (
//           <Link href="/">
//             <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-full md:w-auto">
//               Return to Shop
//             </button>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;



// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from 'next/router';

// const Cart = ({ data }) => {
//   console.log("Cart Data in Cart component:", data);
//   const router = useRouter();

//   // Calculate total price and quantity from cartData
//   const totalQuantity = cartData?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
//   const totalPrice = cartData?.reduce((total, item) => {
//     return total + (item.selectedDiscountedPrice || 0) * (item.quantity || 0);
//   }, 0) || 0;

//   const renderStars = (rating) => {
//     let stars = '';
//     for (let i = 0; i < 5; i++) {
//       stars += i < rating ? '★' : '☆';
//     }
//     return stars;
//   };

//   const handleProductDetails = (id) => {
//     router.push(`/product/${id}`);
//   };

//   const handlePlaceOrder = () => {
//     router.push({
//       pathname: '/Billform',
//       query: { totalPrice, totalQuantity }
//     });
//   };

//   return (
//     <div className="container mx-auto p-4 border-2 rounded-lg font-poppins">
//       <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
//       {cartData?.length > 0 ? (
//         <ul className="mb-4">
//           {cartData.map((item) => (
//             <li key={item.id} className="flex flex-col md:flex-row justify-between items-center mb-2 p-2 border-b">
//               <div className="flex items-center cursor-pointer w-full md:w-auto" onClick={() => handleProductDetails(item.id)}>
//                 <Image
//                   src={item.image || '/path/to/default-image.webp'}
//                   alt={item.name || 'Product'}
//                   width={50}
//                   height={50}
//                   className="mr-4"
//                 />
//                 <div>
//                   <span className="font-semibold">{item.name || 'Unnamed Product'}</span>
//                   <div className="text-xs text-gray-500">{item.category}</div>
//                   <div className="text-xs text-gray-500 mt-1">({item.reviews || 0} reviews)</div>
//                   <div className="text-yellow-500 text-xs">{renderStars(item.rating || 0)}</div>
//                 </div>
//               </div>

//               <div className="text-right w-full md:w-auto mt-2 md:mt-0">
//                 <span className="font-semibold">₹{item.selectedDiscountedPrice || 0}</span>
//                 <div className="text-xs text-gray-500">({item.selectedWeight || 'N/A'})</div>
//               </div>

//               <div className="flex items-center w-full md:w-auto mt-2 md:mt-0">
//                 <span className="mr-2">Quantity: {item.quantity || 0}</span>
//                 {/* You might want to add a remove functionality here */}
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Your cart is empty.</p>
//       )}
//       <div className="mb-4">
//         <h3 className="text-xl font-semibold">Total Items: {totalQuantity}</h3>
//         <h3 className="text-xl font-semibold">Total Price: ₹{totalPrice.toFixed(2)}</h3>
//       </div>

//       <div className="flex flex-col md:flex-row justify-between items-center">
//         {cartData?.length > 0 ? (
//           <button onClick={handlePlaceOrder} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 w-full md:w-auto">
//             Place Order
//           </button>
//         ) : (
//           <Link href="/">
//             <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-full md:w-auto">
//               Return to Shop
//             </button>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;




// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from 'next/router';
// import { makeRequest } from '@/api';
// import { useEffect } from "react";
// import { useRouter } from "next/router";
// const Cart = ({ data }) => {
//   console.log("Cart Data in Cart component:", data);
//   const router = useRouter();

//   // Calculate total price and quantity from data
//   const totalQuantity = data?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
//   const totalPrice = data?.reduce((total, item) => {
//     return total + (parseFloat(item.calculatedPrice) || 0) * (item.quantity || 0);
//   }, 0) || 0;

//   const renderStars = (rating) => {
//     let stars = '';
//     for (let i = 0; i < 5; i++) {
//       stars += i < rating ? '★' : '☆';
//     }
//     return stars;
//   };


//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => {
//         resolve(true);
//       };
//       script.onerror = () => {
//         resolve(false);
//       };
//       document.body.appendChild(script);
//     });
//   };

//   const handleProductDetails = (id) => {
//     router.push(`/product/${id}`);
//   };

//   const handlePlaceOrder = async() => {
//     router.push({
//       pathname: '/Billform',
//       query: { totalPrice, totalQuantity }
//     });

//  const storedToken = localStorage.getItem("authToken");
//  const user_id=localStorage.getItem("userId")
//  console.log(data.varientsId)
// const response = await makeRequest("POST","Order/CreateOrder",{CustomerID: user_id,VarientID :data[0].varientsId}, { headers: { Authorization: `Bearer ${storedToken}` } }
//           );


//   };

//   return (
//     <div className="container mx-auto p-4 border-2 rounded-lg font-poppins">
//       <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
//       {data?.length > 0 ? (
//         <ul className="mb-4">
//           {data.map((item) => (
//             <li key={item.varientsId} className="flex flex-col md:flex-row justify-between items-center mb-2 p-2 border-b">
//               <div className="flex items-center cursor-pointer w-full md:w-auto" onClick={() => handleProductDetails(item.productId)}>
//                 <Image
//                   src={item.productImages?.$values[0] || '/path/to/default-image.webp'}
//                   alt={item.productName || 'Product'}
//                   width={50}
//                   height={50}
//                   className="mr-4"
//                 />
//                 <div>
//                   <span className="font-semibold">{item.productName || 'Unnamed Product'}</span>
//                   {/* Assuming categoryId needs to be mapped to a category name */}
//                   <div className="text-xs text-gray-500">Category ID: {item.categoryId}</div>
//                   {/* No reviews field in your data, defaulting to 0 */}
//                   <div className="text-xs text-gray-500 mt-1">(0 reviews)</div>
//                   {/* No rating field in your data, defaulting to 0 */}
//                   <div className="text-yellow-500 text-xs">{renderStars(0)}</div>
//                 </div>
//               </div>

//               <div className="text-right w-full md:w-auto mt-2 md:mt-0">
//                 <span className="font-semibold">₹{item.calculatedPrice || 0}</span>
//                 <div className="text-xs text-gray-500">({item.varientsName || 'N/A'})</div>
//               </div>

//               <div className="flex items-center w-full md:w-auto mt-2 md:mt-0">
//                 <span className="mr-2">Quantity: {item.quantity || 0}</span>
//                 {/* Add remove functionality here if needed */}
//               </div>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Your cart is empty.</p>
//       )}
//       <div className="mb-4">
//         <h3 className="text-xl font-semibold">Total Items: {totalQuantity}</h3>
//         <h3 className="text-xl font-semibold">Total Price: ₹{totalPrice.toFixed(2)}</h3>
//       </div>

//       <div className="flex flex-col md:flex-row justify-between items-center">
//         {data?.length > 0 ? (
//           <button onClick={handlePlaceOrder} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 w-full md:w-auto">
//             Place Order
//           </button>
//         ) : (
//           <Link href="/">
//             <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-full md:w-auto">
//               Return to Shop
//             </button>
//           </Link>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Cart;



import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { makeRequest } from '@/api';
import { useEffect } from "react";
import { TbCircleLetterGFilled } from "react-icons/tb";

const Cart = ({ data }) => {
  console.log(data)
  const router = useRouter();

  // Calculate total price and quantity
  const totalQuantity = data?.reduce((total, item) => total + (item.quantity || 0), 0) || 0;
  const totalPrice = data?.reduce((total, item) => {
    return total + (parseFloat(item.calculatedPrice) || 0) * (item.quantity || 0);
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

      // Step 1: Create Order
      const response = await makeRequest(
        "POST",
        "Order/CreateOrder",
        { CustomerID: user_id, VarientID: data[0]?.varientsId },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );

      if (response && response[0]?.dataset) {
        console.log("Order Created:", response[0]);
        const { id: order_id, amount, currency } = response[0].dataset;

        // Step 2: Load Razorpay
        const res = await loadRazorpayScript();
        if (!res) {
          alert("Failed to load Razorpay. Please check your connection.");
          return;
        }

        // Step 3: Open Razorpay Checkout
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // From .env.local
          amount: amount * 100, // Razorpay takes paisa, so multiply by 100
          currency: currency,
          name: "My E-commerce",
          description: "Test Transaction",
          order_id: order_id,
          handler: async (response) => {
            // Step 4: Verify Payment
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
                alert("Payment Verified! ✅");
                router.push("/order-success");
              } else {
                alert("Payment Verification Failed! ❌");
              }
            } catch (error) {
              console.error("Error Verifying Payment:", error);
              alert("Payment Verification Error.");
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
          alert("Payment Failed! Please try again.");
        });
        razorpay.open();
      } else {
        alert("Failed to create order");
      }
    } catch (error) {
      console.error("Error Creating Order:", error);
      alert("Something went wrong while placing the order.");
    }
  };

  return (
    <div className="container mx-auto p-4 border-2 rounded-lg font-poppins">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {data?.length > 0 ? (
        <ul className="mb-4">
          {data.map((item) => (
            <li key={item.varientsId} className="flex flex-col md:flex-row justify-between items-center mb-2 p-2 border-b">
              <div
                className="flex items-center cursor-pointer w-full md:w-auto"
                onClick={() => handleProductDetails(item.productId)}
              >
                <Image
                  src={item.productImages?.$values[0] || '/path/to/default-image.webp'}
                  alt={item.productName || 'Product'}
                  width={50}
                  height={50}
                  className="mr-4"
                />
                <div>
                  <span className="font-semibold">{item.productName || 'Unnamed Product'}</span>
                  <div className="text-xs text-gray-500">Category ID: {item.categoryId}</div>
                  <div className="text-xs text-gray-500 mt-1">(0 reviews)</div>
                  <div className="text-yellow-500 text-xs">★★★★★</div>
                </div>
              </div>

              <div className="text-right w-full md:w-auto mt-2 md:mt-0">
                <span className="font-semibold">₹{item.calculatedPrice || 0}</span>
                <div className="text-xs text-gray-500">({item.varientsName || 'N/A'})</div>
              </div>

              <div className="flex items-center w-full md:w-auto mt-2 md:mt-0">
                <span className="mr-2">Quantity: {item.quantity || 0}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <div className="mb-4">
        <h3 className="text-xl font-semibold">Total Items: {totalQuantity}</h3>
        <h3 className="text-xl font-semibold">Total Price: ₹{totalPrice.toFixed(2)}</h3>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center">
        {data?.length > 0 ? (
          <button onClick={handlePlaceOrder} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 w-full md:w-auto">
            Place Order
          </button>
        ) : (
          <Link href="/">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 w-full md:w-auto">
              Return to Shop
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;

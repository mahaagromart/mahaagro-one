import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { TbCircleLetterGFilled } from "react-icons/tb";
import { FaTrash } from "react-icons/fa"; // Import FaTrash icon
import { makeRequest } from "@/api";
import Swal from 'sweetalert2';

const Cart = () => {
  const router = useRouter();
  const [data, setData] = useState([]); // State to hold cart data
  const [cartLength, setLength] = useState(0); // Initialize cartLength to 0
  const [deletingId, setDeletingId] = useState(null); // Track item being deleted

  // Fetch cart data on mount
  const GetCartData = async () => {
    const storedToken = localStorage.getItem("authToken");
    console.log("Entering GetCartData, token:", storedToken); // Debug entry
    try {
      const response = await makeRequest("POST", "/Cart/GetCartData", {}, { 
        headers: { Authorization: `Bearer ${storedToken}` } 
      });

      // Check if response is valid and has the expected structure
      if (response && response[0] && response[0].dataset && response[0].dataset.$values) {
        const cartItems = response[0].dataset.$values;
        setLength(cartItems.length); // Set cart length
        setData(cartItems); // Set cart items
      } else {
        setLength(0); // Fallback to 0 if no valid data
        setData([]); // Clear data if no items
        console.log("No valid dataset.$values in response, setting defaults");
      }
    } catch (error) {
      setLength(0); // Set to 0 on error
      setData([]); // Clear data on error
      console.error("Error fetching cart data:", error);
    }
  };

  useEffect(() => {
    GetCartData();
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

      const response = await makeRequest("POST", "Order/CreateOrder", { 
        CustomerID: user_id, 
        VarientID: data[0]?.varientsId 
      }, { 
        headers: { Authorization: `Bearer ${storedToken}` } 
      });
      
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
    setDeletingId(VARIENTS_ID); // Mark item as deleting for animation

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
        // Wait for animation to complete (500ms) before refreshing data
        setTimeout(() => {
          Swal.fire({
            title: "Success",
            text: "Successfully deleted item",
            icon: "success",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              GetCartData(); // Refresh cart data
              setDeletingId(null); // Reset deleting state
            }
          });
        }, 500); // Match this with the animation duration
      } else {
        setDeletingId(null); // Reset if failed
        Swal.fire("Failed to delete item", "", "error");
      }
    } catch (error) {
      setDeletingId(null); // Reset if error
      console.error("Delete error:", error);
      Swal.fire("Network Issue", "Failed to delete item", "error");
    }
  };

  // Function to generate random rating and stars
  const generateRating = () => {
    const rating = (Math.random() * 4 + 1).toFixed(1); // Random between 1 and 5
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    const stars = '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
    const reviews = Math.floor(Math.random() * 101); // Random between 0 and 100
    
    return { rating, stars, reviews };
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-xl font-poppins max-w-6xl">
      {data?.length > 0 ? (
        <ul className="space-y-6">
          {data.map((item) => {
            const { rating, stars, reviews } = generateRating(); // Generate rating for each item
            const isDeleting = deletingId === item.varientsId; // Check if this item is being deleted

            return (
              <li
                key={item.varientsId}
                className={`flex flex-col md:flex-row justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-500 ${
                  isDeleting ? 'opacity-0 translate-x-[-100%]' : 'opacity-100 translate-x-0'
                }`}
              >
                {/* Product Info */}
                <div
                  className="flex items-center w-full md:w-2/5 cursor-pointer"
                  onClick={() => handleProductDetails(item.productId)}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${item.productImages?.$values[0]}`}
                    alt={item.productName || 'Product'}
                    width={100}
                    height={100}
                    style={{objectFit:'cover'}}
                    // className="rounded-md object-cover mr-4 border border-gray-200"
                  />
                  <div className="space-y-1">
                    <span className="font-semibold text-lg text-gray-800 hover:text-green-600 transition-colors duration-200">
                      {item.productName || 'Unnamed Product'}
                    </span>
                    <div className="text-xs text-gray-500">({reviews} reviews)</div>
                    <div className="text-yellow-400 text-sm">{stars} <span className="text-gray-600 text-xs">({rating})</span></div>
                  </div>
                </div>

                {/* Price */}
                <div className="text-center w-full md:w-1/5 mt-4 md:mt-0">
                  <span className="font-semibold text-xl text-green-600">
                    ₹{(parseFloat(item.calculatedPrice) * item.quantity).toFixed(2)}
                  </span>
                  <div className="text-xs text-gray-500 mt-1">({item.varientsName || 'N/A'})</div>
                </div>

                {/* Quantity & Delete */}
                <div className="flex items-center justify-between w-full md:w-2/5 mt-4 md:mt-0">
                  <span className="text-gray-700 font-medium">Qty: {item.quantity || 0}</span>
                  <button
                    onClick={() => handleDeleteItem(item.varientsId, item.productId, item.minimumOrderQuantity)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all duration-300 shadow-sm hover:shadow-md flex items-center"
                  >
                    <FaTrash className="w-4 h-4" /> {/* Trash icon */}
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
            <h3 className="text-xl font-semibold">Total Items: <span className="text-green-600">{cartLength}</span></h3>
            <h3 className="text-xl font-semibold mt-2 md:mt-0">
              Total Price: <span className="text-green-600">₹{totalPrice.toFixed(2)}</span>
            </h3>
          </div>

          {/* Place Order Button */}
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
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { FiShoppingBag, FiHeart, FiSettings, FiCreditCard, FiMapPin, FiLogOut } from 'react-icons/fi';
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from 'next/router';
import { makeRequest } from "@/api";
import Swal from 'sweetalert2';
import { useDispatch } from "react-redux";

// import { clearAuthToken } from  '../auth.js';  
import { clearAuthToken } from '@/api/auth.js';
import { logout,login } from '@/store/authSlice';

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('orders');
  const [cartData, setCartData] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([
    // { id: 1, name: 'grape', price: '₹129.99', image: '/headphones.jpg' },
    // { id: 2, name: 'mango', price: '₹249.99', image: '/smartwatch.jpg' },
    // { id: 3, name: 'kiwi', price: '₹59.99', image: '/wallet.jpg' },
  ]);
  var user = useSelector((state) => state.auth.isAuthenicated);
  const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_API_URL;
  const [userProfile, setUserProfile] = useState({
    profileImage: '',
    firstName: 'User',
    lastName: '',
    emailId: '',
    phoneNumber: '',
    designationName: '',
    joiningDate: '',
    countryName: '',
    stateName: '',
    cityName: ''
  });

  const orders = [
    // { id: '#EC-78945', date: '12 Oct 2023', status: 'Delivered', total: '$245.00' },
    // { id: '#EC-78944', date: '5 Oct 2023', status: 'Delivered', total: '$178.50' },
    // { id: '#EC-78943', date: '28 Sep 2023', status: 'Cancelled', total: '$92.75' },
  ];

  // Fetch cart data
  const GetCartData = async () => {
    const storedToken = localStorage.getItem("authToken");
    try {
      const response = await makeRequest("POST", "/Cart/GetCartData", {}, { headers: { Authorization: `Bearer ${storedToken}` } });
      if (response && response[0]?.dataset?.$values) {
        setCartData(response[0].dataset.$values);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const GetUserProfile = async () => {
    const storedToken = localStorage.getItem("authToken");
    try {
      const response = await makeRequest("POST", "/Authentication/GetUserProfile", {}, { headers: { Authorization: `Bearer ${storedToken}` } });
      if (response && response.userProfilesEntity?.$values?.length > 0) {
        console.log(response)
        const profileData = response.userProfilesEntity.$values[0];
        setUserProfile({
          profileImage: profileData.profileImage || '',
          firstName: profileData.firstName || 'User',
          lastName: profileData.lastName || '',
          emailId: profileData.emailId || '',
          phoneNumber: profileData.phoneNumber || '',
          designationName: profileData.designationName || '',
          joiningDate: profileData.joiningDate || '',
          countryName: profileData.countryName || '',
          stateName: profileData.stateName || '',
          cityName: profileData.cityName || ''
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    // debugger
    if (!user) {
      router.push("/login");
    }else{
      GetUserProfile();
      GetCartData();

    }
  }, []);



  // Calculate total price and quantity
  const totalQuantity = cartData?.reduce((total, item) => total + (item.minimumOrderQuantity || 0), 0) || 0;
  const totalPrice = cartData?.reduce((total, item) => total + (parseFloat(item.calculatedPrice) || 0) * (item.minimumOrderQuantity || 0), 0) || 0;

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

      const response = await makeRequest("POST", "Order/CreateOrder", { CustomerID: user_id, VarientID: cartData[0]?.varientsId }, { headers: { Authorization: `Bearer ${storedToken}` } });
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
            name: userProfile.firstName + ' ' + userProfile.lastName,
            email: userProfile.emailId,
            contact: userProfile.phoneNumber,
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

  // Handle Delete Item
  const handleDeleteItem = async (VARIENTS_ID, PROD_ID, Quantity) => {
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
          text: "Successfully deleted item",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            GetCartData();
          }
        });
      } else {
        Swal.fire("Failed to delete item", "", "error");
      }
    } catch (error) {
      console.error("Delete error:", error);
      Swal.fire("Network Issue", "Failed to delete item", "error");
    }
  };

  return (
    <>
      <Head>
        <title>My Account | YourStore</title>
        <meta name="description" content="Your e-commerce account dashboard" />
      </Head>

      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>
         
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden">
                    {userProfile.profileImage ? (
                      <img
                        src={`${imageBaseUrl}${userProfile.profileImage}`}
                        alt="Profile"
                        className="h-full w-auto rounded-full bg-pink-200 shadow-lg flex items-center justify-center text-pink-800 font-semibold"

                      />
                    ) : (
                      <div className="h-full w-full bg-purple-100 flex items-center justify-center text-purple-600 text-2xl font-bold">
                        {userProfile.firstName.charAt(0)}{userProfile.lastName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {userProfile.firstName} {userProfile.lastName}
                    </h2>
                    <p className="text-sm text-gray-500">{userProfile.designationName}</p>
                  </div>
                </div>

                <div className="mb-6 text-sm">
                  <p className="text-gray-600 mb-1">Member since: {userProfile.joiningDate}</p>
                  <p className="text-gray-600">{userProfile.cityName}, {userProfile.stateName}, {userProfile.countryName}</p>
                </div>

                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('orders')}
                    className={`flex items-center space-x-3 px-3 py-2 w-full text-left rounded-lg font-medium ${activeTab === 'orders' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <FiShoppingBag className="text-lg" />
                    <span>My Orders</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('wishlist')}
                    className={`flex items-center space-x-3 px-3 py-2 w-full text-left rounded-lg font-medium ${activeTab === 'wishlist' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <FiHeart className="text-lg" />
                    <span>Wishlist</span>
                    <span className="ml-auto bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">{wishlistItems.length}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('cart')}
                    className={`flex items-center space-x-3 px-3 py-2 w-full text-left rounded-lg font-medium ${activeTab === 'cart' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <FiShoppingBag className="text-lg" />
                    <span>Shopping Cart</span>
                    {cartData.length > 0 && (
                      <span className="ml-auto bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">{cartData.length}</span>
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('payments')}
                    className={`flex items-center space-x-3 px-3 py-2 w-full text-left rounded-lg font-medium ${activeTab === 'payments' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <FiCreditCard className="text-lg" />
                    <span>Payment Methods</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('address')}
                    className={`flex items-center space-x-3 px-3 py-2 w-full text-left rounded-lg font-medium ${activeTab === 'address' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <FiMapPin className="text-lg" />
                    <span>Address Book</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`flex items-center space-x-3 px-3 py-2 w-full text-left rounded-lg font-medium ${activeTab === 'settings' ? 'bg-purple-50 text-purple-700' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <FiSettings className="text-lg" />
                    <span>Account Settings</span>
                  </button>
                  <button className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium w-full text-left"
                    onClick={()=>{

                      dispatch(logout()); 
                      window.location.reload();
                    }}
                  >
                    <FiLogOut className="text-lg" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Order History Section */}
              {activeTab === 'orders' && (
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
                    <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">View All</button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                          <th scope="col" className="relative px-6 py-3"><span className="sr-only">Action</span></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-600">{order.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.total}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button className="text-purple-600 hover:text-purple-900">View Details</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Wishlist Section */}
              {activeTab === 'wishlist' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Wishlist</h2>
                    <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">View All</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlistItems.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition duration-300">
                        <div className="h-48 bg-gray-100 flex items-center justify-center">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                          <p className="text-purple-600 font-semibold mb-3">{item.price}</p>
                          <div className="flex space-x-2">
                            <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded text-sm font-medium transition duration-300">
                              Add to Cart
                            </button>
                            <button className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-red-500 border border-gray-200 rounded">
                              <FiHeart className="text-lg" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cart Section */}
              {activeTab === 'cart' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Shopping Cart</h2>
                 
                  {cartData?.length > 0 ? (
                    <>
                      <ul className="space-y-6 mb-8">
                        {cartData.map((item) => (
                          <li
                            key={item.varientsId}
                            className="flex flex-col md:flex-row justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
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
                                className="rounded-md object-cover mr-4 border border-gray-200"
                              />
                              <div className="space-y-1">
                                <span className="font-semibold text-lg text-gray-800 hover:text-green-600 transition-colors duration-200">
                                  {item.productName || 'Unnamed Product'}
                                </span>
                                <div className="text-xs text-gray-500">Category ID: {item.categoryId}</div>
                                <div className="text-xs text-gray-500">(0 reviews)</div>
                                <div className="text-yellow-400 text-sm">★★★★★</div>
                              </div>
                            </div>

                            {/* Price */}
                            <div className="text-center w-full md:w-1/5 mt-4 md:mt-0">
                              <span className="font-semibold text-xl text-green-600">₹{item.calculatedPrice || 0}</span>
                              <div className="text-xs text-gray-500 mt-1">({item.varientsName || 'N/A'})</div>
                            </div>

                            {/* Quantity & Delete */}
                            <div className="flex items-center justify-between w-full md:w-2/5 mt-4 md:mt-0">
                              <span className="text-gray-700 font-medium">Qty: {item.minimumOrderQuantity || 0}</span>
                              <button
                                onClick={() => handleDeleteItem(item.varientsId, item.productId, item.minimumOrderQuantity)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all duration-300 shadow-sm hover:shadow-md flex items-center"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                                Delete
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>

                      {/* Totals */}
                      <div className="mt-8 border-t pt-6">
                        <div className="flex flex-col md:flex-row justify-between items-center text-gray-800">
                          <h3 className="text-xl font-semibold">Total Items: <span className="text-green-600">{totalQuantity}</span></h3>
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
                    </>
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
              )}

              {/* Other sections can be added similarly */}
              {activeTab === 'payments' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Methods</h2>
                  <p className="text-gray-600">Your payment methods will appear here.</p>
                </div>
              )}

              {activeTab === 'address' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Address Book</h2>
                  <p className="text-gray-600">Your saved addresses will appear here.</p>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-800">Personal Information</h3>
                      <p className="text-gray-600 mt-1">
                        Name: {userProfile.firstName} {userProfile.lastName}
                      </p>
                      <p className="text-gray-600">Email: {userProfile.emailId}</p>
                      <p className="text-gray-600">Phone: {userProfile.phoneNumber}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Location</h3>
                      <p className="text-gray-600 mt-1">
                        {userProfile.cityName}, {userProfile.stateName}, {userProfile.countryName}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">Account Details</h3>
                      <p className="text-gray-600 mt-1">Role: {userProfile.designationName}</p>
                      <p className="text-gray-600">Member since: {userProfile.joiningDate}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
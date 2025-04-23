// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import Link from "next/link";
// import { makeRequest } from '@/api';
// import Cart from "../components/Cart";

// const CartPage = () => {
//   const user = useSelector((state) => state.auth.isAuthenicated);
//   const [cartData, setCartData] = useState(null); // Start with null instead of []
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (user) {
//       getAllCartData();
     
//     } else {
//       setLoading(false); // No need to fetch if not authenticated
//     }
//   }, [user]);



//   const getAllCartData = async () => {
//     try {
//       setLoading(true);
//       const storedToken = localStorage.getItem("authToken");
//       const response = await makeRequest("POST","/Cart/GetCartData",{},{ headers: { Authorization: `Bearer ${storedToken}` } });

//       const data = response[0].dataset?.$values || [];

//       setCartData(data);
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//       setCartData([]);
//     } finally {
//       setLoading(false);

//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
//       <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
//         Your Shopping Cart
//       </h1>

//       {user ? (
//         cartData?.length > 0 ? (
//           <Cart data={cartData} />
//         ) : (
//           <p className="text-gray-600 text-xl">Your cart is empty.</p>
//         )
//       ) : (
//         <div className="text-center space-y-4">
//           <p className="text-xl text-gray-700">Please login to view your Cart</p>
//           <p className="text-xl text-gray-700">
//             If you don't have an account, please{" "}
//             <Link
//               href="/register"
//               className="text-blue-500 hover:underline font-semibold"
//             >
//               register
//             </Link>
//           </p>
//           <div className="mt-4">
//             <Link
//               href="/login"
//               className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
//             >
//               Go to Login Page
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;






import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { makeRequest } from '@/api';
import Cart from "../components/Cart";

const CartPage = () => {
  const user = useSelector((state) => state.auth.isAuthenicated);
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false); // State for address form

  useEffect(() => {
    if (user) {
      getAllCartData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const getAllCartData = async () => {
    try {
      setLoading(true);
      const storedToken = localStorage.getItem("authToken");
      const response = await makeRequest(
        "POST",
        "/Cart/GetCartData",
        {},
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      const data = response[0].dataset?.$values || [];
      setCartData(data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setCartData([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center py-12 px-4">
      <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-10 tracking-tight">
        Your Shopping Cart
      </h1>

      {user ? (
        cartData?.length > 0 ? (
          <>
            <Cart data={cartData} />
            {/* Add Address Button */}
            <button
              onClick={() => setShowAddressForm(!showAddressForm)}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              {showAddressForm ? "Cancel" : "Add New Address"}
            </button>

            {/* Address Form (Elegant Design) */}
            {showAddressForm && (
              <div className="mt-8 w-full max-w-lg bg-white p-6 rounded-xl shadow-2xl transform transition-all duration-500 ease-in-out animate-fadeIn">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Delivery Address</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Street Address</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
                      placeholder="123 Elegant St."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">City</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-200"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                  >
                    Save Address
                  </button>
                </form>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-600 text-xl font-medium">Your cart is empty.</p>
        )
      ) : (
        <div className="text-center space-y-6 bg-white p-8 rounded-xl shadow-lg max-w-md">
          <p className="text-xl font-semibold text-gray-700">Please login to view your Cart</p>
          <p className="text-lg text-gray-600">
            If you don’t have an account, please{" "}
            <Link href="/register" className="text-indigo-500 hover:underline font-semibold">
              register
            </Link>
          </p>
          <div className="mt-6">
            <Link
              href="/login"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
            >
              Go to Login Page
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
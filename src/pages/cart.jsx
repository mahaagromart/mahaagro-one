import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { makeRequest } from '@/api';
import Cart from "../components/Cart";

const CartPage = () => {
  const user = useSelector((state) => state.auth.isAuthenicated);
  const [cartData, setCartData] = useState(null); // Start with null instead of []
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getAllCartData();
     
    } else {
      setLoading(false); // No need to fetch if not authenticated
    }
  }, [user]);



  const getAllCartData = async () => {
    try {
      setLoading(true);
      const storedToken = localStorage.getItem("authToken");
      const response = await makeRequest("POST","/Cart/GetCartData",{},{ headers: { Authorization: `Bearer ${storedToken}` } });

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
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
        Your Shopping Cart
      </h1>

      {user ? (
        cartData?.length > 0 ? (
          <Cart data={cartData} />
        ) : (
          <p className="text-gray-600 text-xl">Your cart is empty.</p>
        )
      ) : (
        <div className="text-center space-y-4">
          <p className="text-xl text-gray-700">Please login to view your Cart</p>
          <p className="text-xl text-gray-700">
            If you don't have an account, please{" "}
            <Link
              href="/register"
              className="text-blue-500 hover:underline font-semibold"
            >
              register
            </Link>
          </p>
          <div className="mt-4">
            <Link
              href="/login"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
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




import Cart from "../components/Cart";
import { useSelector } from "react-redux";
import Link from "next/link"; // Import the Next.js Link


const CartPage = () => {
  var user = useSelector((state) => state.auth.isAuthenicated);
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-center text-3xl font-bold text-gray-800 mb-8">
        Your Cart
      </h1>
      {user ? (
        <Cart />
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

import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../store/cartslice";
import Link from "next/link";
import { useRouter } from 'next/router';

const Cart = () => {
  const { cartItems, totalQuantity } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.selectedDiscountedPrice ?? 0) * item.quantity;
  }, 0);

  const renderStars = (rating) => {
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < rating ? '★' : '☆';
    }
    return stars;
  };

  const handleProductDetails = (id) => {
    router.push(`/product/${id}`);
  };

  const handlePlaceOrder = () => {
    router.push({
      pathname: '/Billform',
      query: { totalPrice, totalQuantity }
    });
  };

  return (
    <div className="container mx-auto p-4 border-2 rounded-lg font-poppins">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="mb-4">
          {cartItems.map((item) => (
            <li key={item.id} className="flex flex-col md:flex-row justify-between items-center mb-2 p-2 border-b">
              <div className="flex items-center cursor-pointer w-full md:w-auto" onClick={() => handleProductDetails(item.id)}>
                <Image
                  src={item.image ?? '/path/to/default-image.webp'}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="mr-4"
                />
                <div>
                  <span className="font-semibold">{item.name}</span>
                  <div className="text-xs text-gray-500">{item.category}</div>
                  <div className="text-xs text-gray-500 mt-1">({item.reviews} reviews)</div>
                  <div className="text-yellow-500 text-xs">{renderStars(item.rating)}</div>
                </div>
              </div>

              <div className="text-right w-full md:w-auto mt-2 md:mt-0">
                <span className="font-semibold">₹{item.selectedDiscountedPrice}</span>
                <div className="text-xs text-gray-500">({item.selectedWeight})</div>
              </div>

              <div className="flex items-center w-full md:w-auto mt-2 md:mt-0">
                <span className="mr-2">Quantity: {item.quantity}</span>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300 w-full md:w-auto"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Total Items: {totalQuantity}</h3>
        <h3 className="text-xl font-semibold">Total Price: ₹{totalPrice.toFixed(2)}</h3>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center">
        <button
          onClick={() => dispatch(clearCart())}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 mb-2 md:mb-0 w-full md:w-auto"
        >
          Clear Cart
        </button>

        {cartItems.length > 0 ? (
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
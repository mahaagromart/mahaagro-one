import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishList, clearWishList } from "../store/wishlistSlice";
import Link from "next/link";
import { useRouter } from 'next/router';


const Wishlist = () => {
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const router = useRouter();

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
    // Here you would typically want to move items from wishlist to cart or directly to checkout
    // For simplicity, we'll just redirect to login with wishlist details
    router.push({
      pathname: '/Billform',
      query: { 
        totalItems: wishlistItems.length,
        // Assuming there's a way to calculate this from wishlist items:
        totalPrice: wishlistItems.reduce((total, item) => total + (item.selectedWeight.discountedPrice || 0), 0).toFixed(2)
      }
    });
  };

  return (
    <div className="container mx-auto p-4 border-2 rounded-lg font-poppins">
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <ul className="mb-4">
          {wishlistItems.map((item) => (
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
                <span className="font-semibold">₹{item.selectedWeight.discountedPrice}</span>
                <div className="text-xs text-gray-500">Original Price: ₹{item.selectedWeight.originalPrice}</div>
                <div className="text-xs text-gray-500">({item.selectedWeight.label})</div>
              </div>
              <div className="flex items-center w-full md:w-auto mt-2 md:mt-0">
                <span className="mr-2">Quantity: {item.quantity || 1}</span>
                <button
                  onClick={() => dispatch(removeFromWishList(item.id))}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300 w-full md:w-auto"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {/* <div className="mb-4">
        <h3 className="text-xl font-semibold">Total Items: {wishlistItems.length}</h3>
        <h3 className="text-xl font-semibold">Total Price: ₹{
          wishlistItems.reduce((total, item) => total + (item.selectedWeight.discountedPrice || 0), 0).toFixed(2)
        }</h3>
      </div> */}

      <div className="flex flex-col md:flex-row justify-between items-center">
        <button
          onClick={() => dispatch(clearWishList())}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 mb-2 md:mb-0 w-full md:w-auto"
        >
          Clear Wishlist
        </button>

        {wishlistItems.length > 0 ? (
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

export default Wishlist;
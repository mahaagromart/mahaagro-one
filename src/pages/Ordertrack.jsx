import { useState, useEffect } from 'react';
import Review from "../components/Home/Review"
const OrderTracker = () => {
  const [status, setStatus] = useState('Dispatched');

  const statuses = [
    { id: 1, name: 'Order Placed', description: 'Your order has been placed.' },
    { id: 2, name: 'Order Confirmed', description: 'Your order has been confirmed.' },
    { id: 3, name: 'Dispatched', description: 'Your order has been dispatched.' },
    { id: 4, name: 'Shipped', description: 'Your order is on its way.' },
    { id: 5, name: 'Out for Delivery', description: 'Your order is out for delivery.' },
    { id: 6, name: 'Delivered', description: 'Your order has been delivered.' },
  ];

  const product = {
    id: 1,
    category_id: 1,
    category: 'Fruits',
    name: 'Blackberry',
    image: '/assets/images/fruitproduct/fruits.png', // Correct path to the image
    price: {
      original: 250,
      discounted: 180,
    },
    discount: 28,
    rating: 4.8,
    reviews: 320,
    weights: [
      { label: '350g', originalPrice: 250, discountedPrice: 180 },
      { label: '500g', originalPrice: 350, discountedPrice: 280 },
      { label: '1kg', originalPrice: 600, discountedPrice: 500 },
    ],
    selectedWeight: { label: '350g', originalPrice: 250, discountedPrice: 180 },
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus((prevStatus) => {
        const currentIndex = statuses.findIndex((s) => s.name === prevStatus);
        const nextIndex = (currentIndex + 1) % statuses.length;
        return statuses[nextIndex].name;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 bg-gray-50 min-h-screen">


      {/* Order ID Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order ID: #123456</h1>
      </div>

      {/* Order Tracking Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Order Tracking</h1>
        {/* Product Image and Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-col md:flex-row-reverse items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 md:space-x-reverse">
            <img
              src={product.image}
              alt={product.name}
              className="w-48 h-48 object-cover bg-white p-4 border-2 rounded-lg"
            />
            <div className="flex-1 text-left">
              <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
              <p className="text-gray-600 mt-2">{product.category}</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-400 text-xl">★</span>
                <span className="text-gray-800 ml-1">{product.rating}</span>
                <span className="text-gray-500 ml-2">({product.reviews} reviews)</span>
              </div>
              <div className="mt-4">
                <span className="text-gray-500 line-through">₹{product.selectedWeight.originalPrice}</span>
                <span className="text-green-600 font-bold ml-2">₹{product.selectedWeight.discountedPrice}</span>
                <span className="text-green-600 ml-2">{product.discount}% off</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative space-y-8">

          {/* Vertical line spanning full height */}
          <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-300" />
          <div
            className="absolute left-4 top-4 bottom-4 w-0.5 bg-green-500"
            style={{
              height: `${((statuses.findIndex((s) => s.name === status) + 1) * 85) / statuses.length}%`,
            }}
          />
          {statuses.map((s, index) => (
            <div key={s.id} className="relative flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${status === s.name ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'
                  }`}
              >
                {status === 'Delivered' && s.name === 'Delivered' ? '✓' : index + 1}
              </div>
              <div className="ml-4">
                <p className={`font-semibold ${status === s.name ? 'text-green-500' : 'text-gray-500'}`}>
                  {s.name}
                </p>
                <p className="text-sm text-gray-500">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipment Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Shipment Details</h1>
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="text-gray-600">Product Name</p>
            <p className="text-gray-800 font-semibold">{product.name}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Weight</p>
            <p className="text-gray-800 font-semibold">{product.selectedWeight.label}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Delivery Address</p>
            <p className="text-gray-800 font-semibold">123 Main St, City, Country</p>
          </div>
        </div>
      </div>

      {/* Price Details Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Price Details</h1>
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="text-gray-600">Selling Price</p>
            <p className="text-gray-800 font-semibold">₹{product.selectedWeight.discountedPrice}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Handling Fees</p>
            <p className="text-gray-800 font-semibold">₹20</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Total Amount</p>
            <p className="text-gray-800 font-semibold">₹{product.selectedWeight.discountedPrice + 20}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Payment Method</p>
            <p className="text-gray-800 font-semibold">Cash on Delivery</p>
          </div>
        </div>
      </div>

      {/* Rate Your Experience Section */}
     <Review/>
    </div>
  );
};

export default OrderTracker;
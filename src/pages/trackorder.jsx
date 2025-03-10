import { useState } from 'react';

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle form submission, e.g., API call or navigation.
    console.log('Submitted:', { orderId, phoneNumber });
  };

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Track Your Order</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="order_id" className="sr-only">Order ID</label>
              <input 
                id="order_id" 
                name="order_id" 
                type="text" 
                required 
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phone_number" className="sr-only">Phone Number</label>
              <input 
                id="phone_number" 
                name="phone_number" 
                type="text" 
                required 
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Your Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button 
              type="submit" 
              className="w-40 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Track Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrackOrder;
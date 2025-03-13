import { useState, useEffect } from 'react';

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

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus((prevStatus) => {
        const currentIndex = statuses.findIndex(s => s.name === prevStatus);
        const nextIndex = (currentIndex + 1) % statuses.length;
        return statuses[nextIndex].name;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Order Tracking</h1>
      <div className="relative space-y-8">
        {/* Vertical line spanning full height */}
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-300" />
        <div
          className="absolute left-4 top-4 bottom-4 w-0.5 bg-green-500"
          style={{ height: `${(statuses.findIndex(s => s.name === status) + 1) * 85 / statuses.length}%` }}
        />
        {statuses.map((s, index) => (
          <div key={s.id} className="relative flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10
              ${status === s.name ? 'bg-green-500 text-white' : 'bg-gray-300 text-black'}`}>
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
  );
};

export default OrderTracker;
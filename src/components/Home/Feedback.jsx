import { FaTruck, FaRegClock, FaUndo, FaCreditCard, FaPhoneAlt } from 'react-icons/fa';

const features = [
  {
    title: 'Free Delivery',
    description: 'Free delivery on all orders.',
    icon: <FaTruck />,
  },
  {
    title: '6 Hour Shipment',
    description: 'Get your items shipped within 6 hours.',
    icon: <FaRegClock />,
  },
  {
    title: 'Easy Return',
    description: 'Easy returns within 30 days.',
    icon: <FaUndo />,
  },
  {
    title: 'All Payment Methods',
    description: 'We support all major payment methods.',
    icon: <FaCreditCard />,
  },
  {
    title: 'Customer Support',
    description: '24/7 customer support available.',
    icon: <FaPhoneAlt />,
  },
];

const Feedback = () => {
  return (
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-4 bg-white rounded-lg border-2 border-black-500 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="text-green-500 text-3xl">{feature.icon}</div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;

import { useState } from 'react';
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaUtensils, FaEnvelope } from 'react-icons/fa';

export default function MobileMenuPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="bg-green-600 text-white py-4 shadow-lg">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Mobile Menu</h1>
          <button onClick={toggleMenu} className="lg:hidden">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </header>

      {/* Menu Content */}
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={toggleMenu}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
        >
          {isMenuOpen ? 'Hide Menu' : 'Show Menu'}
        </button>

        {/* Toggleable Menu Content */}
        {isMenuOpen && (
          <div className="mt-8">
            <h2 className="text-3xl font-bold mb-4">Our Menu</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems.map((item, index) => (
                <div key={index} className="bg-white border border-green-100 rounded-lg shadow-lg overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    <p className="text-gray-700 mb-4">{item.description}</p>
                    <p className="text-green-600 font-bold">${item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const menuItems = [
  {
    name: "Green Salad",
    description: "Fresh and healthy salad with mixed greens, tomatoes, and cucumbers.",
    price: 8.99,
    image: "https://via.placeholder.com/400x300",
  },
  {
    name: "Grilled Chicken",
    description: "Juicy grilled chicken served with a side of vegetables.",
    price: 12.99,
    image: "https://via.placeholder.com/400x300",
  },
  {
    name: "Vegan Burger",
    description: "A delicious vegan burger made with plant-based ingredients.",
    price: 10.99,
    image: "https://via.placeholder.com/400x300",
  },
];
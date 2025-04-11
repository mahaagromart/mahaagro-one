import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


      {/* Mobile Navigation */}
      
        <div className="px-2 pt-2 pb-3 space-y-1  ">
          <Link 
            href="/" 
            className="block px-3 py-2 rounded-md text-base font-bold text-white bg-green-600 "
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className="block px-3 py-2 rounded-md text-base font-bold text-white hover:text-green-600 hover:bg-gray-50 bg-green-600"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link 
            href="/Service" 
            className="block px-3 py-2 rounded-md text-base font-bold text-white hover:text-green-600 hover:bg-gray-50 bg-green-600"
            onClick={() => setIsOpen(false)}
          >
            Service
          </Link>
          <Link 
            href="/contact" 
            className="block px-3 py-2 rounded-md text-base font-bold text-white hover:text-green-600 hover:bg-gray-50 bg-green-600"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
   
        </div>
      </div>
    </nav>
  );
}
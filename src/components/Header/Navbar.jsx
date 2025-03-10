import Link from 'next/link';
import { TbPhoneCalling } from 'react-icons/tb';
import Image from 'next/image'; 
import Line from '../../../public/assets/images/homebanner/line.svg';

// import "./navbar.css";
const Navbar = () => {
  return (
    <nav className="bg-gray-100 container max-w-screen-3xl border-2  mx-auto rounded-lg hidden sm:block"> {/* Hide on mobile by default */}
      <div className="flex justify-between items-center">
        <ul className="flex space-x-6 px-6">
          <li>
            <Link href="/" className="text-gray-800 hover:text-blue-500  hover:text-yellow-500 font-bold font-poppins">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-gray-800 hover:text-blue-500  hover:text-yellow-500 font-bold font-poppins">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/service" className="text-gray-800 hover:text-blue-500  hover:text-yellow-500 font-bold font-poppins">
              Services
            </Link>
          </li>
          <li>
            <Link href="/b2b" className="text-gray-800 hover:text-blue-500  hover:text-yellow-500 font-bold font-poppins">
              B2B
            </Link>
          </li>
          <li>
            <Link href="/seller" className="text-gray-800 hover:text-blue-500  hover:text-yellow-500 font-bold font-poppins">
              Become a Seller
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-800 hover:text-blue-500  hover:text-yellow-500 font-bold font-poppins">
              Contact
            </Link>
          </li>
        </ul>


        {/* Phone Info Section (Visible on medium screens and larger) */}
        <div className="hidden sm:flex items-center bg-cover bg-center px-4 py-1 relative ml-auto">
          <Image
            src={Line}
            alt="Line Background"
            layout="fill" // Cover the div
            objectFit="cover" // Ensure the image covers the container
            className="absolute inset-0 rounded-tr-lg rounded-br-lg" // Make sure it fills the div
          />
          <span className="flex items-center text-3xl px-4 text-white relative z-10">
            <TbPhoneCalling />
            <span className="text-lg px-2 font-bold font-poppins ">Call info:</span>
          </span>
          <a
            href="tel:+918888842300"
            className="text-yellow-400 hover:text-white py-2 font-bold font-poppins relative z-10"
          >
            +91 88888-42-300
          </a>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;


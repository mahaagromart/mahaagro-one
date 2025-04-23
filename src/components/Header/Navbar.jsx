import Link from 'next/link';
import { TbPhoneCalling } from 'react-icons/tb';
import Image from 'next/image'; 
import Line from '../../../public/assets/images/homebanner/line.svg';

const Navbar = () => {
  return (
    <nav className="bg-gray-100 container max-w-screen-3xl border-2 mx-auto rounded-lg hidden sm:block">
      <div className="flex justify-between items-center">
        <ul className="flex space-x-6 px-6">
          {[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About Us' },
            { href: '/service', label: 'Services' },
            { href: '/b2b', label: 'B2B' },
            { href: '/seller', label: 'Become a Seller' },
            { href: '/contact', label: 'Contact' }
          ].map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="text-gray-800 hover:text-yellow-500 font-bold font-poppins">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Phone Info Section */}
        <div className="hidden sm:flex items-center px-4 py-1 relative ml-auto overflow-hidden rounded-tr-lg rounded-br-lg">
          <Image
            src={Line}
            alt="Line Background"
            fill
            style={{ objectFit: 'cover', zIndex: 0 }}
            className="absolute inset-0"
          />
          <span className="flex items-center text-3xl px-4 text-white relative z-10">
            <TbPhoneCalling />
            <span className="text-lg px-2 font-bold font-poppins">Call info:</span>
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

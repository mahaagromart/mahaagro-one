import Image from 'next/image';
import logo from '../../public/assets/images/img/footerlogo.webp';
import barcode from '../../public/assets/images/img/qrcode.png';
import iosIcon from '../../public/assets/images/img/secure.png';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaClock,FaLock } from 'react-icons/fa'; // React icons

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-16">
      <div className=" mx-auto container px-6 sm:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-10 md:gap-12">

          {/* First Column: Logo & Contact Info */}
          <div className="flex flex-col items-start space-y-2">
            <Image src={logo} alt="Logo" className="mb-6 max-w-[250px] max-h-[80px]" />
            <div className="space-y-4">
              <p className="text-sm text-gray-600 flex items-center">
                <FaPhoneAlt className="text-green-600 mr-2 text-xl" />
                <span>Call us: Monday - Friday, 9:30 AM - 5:50 PM</span>
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <FaMapMarkerAlt className="text-green-600 mr-2 text-6xl" /> {/* Increased icon size */}
                <span>Address: MAIDC, Krushi Udyog Bhavan Dinkarrao Desai Marg, Aarey Milk Colony, Goregaon (E), Mumbai - 400065</span>
              </p>
              <p className="text-sm text-gray-600 flex items-center">
                <FaEnvelope className="text-green-600 mr-2 text-3xl" /> {/* Increased icon size */}
                <span>Email: support@mahaagromart.com, info@mahaagromart.com</span>
              </p>
              {/* Working Hours */}
              <p className="text-sm text-gray-600 flex items-center">
                <FaClock className="text-green-600 mr-2 text-2xl" />
                <span>Working Hours: Mon - Fri, 9:30 AM - 5:50 PM</span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-green-600 mb-4">Seller Links</h3>
            <ul className="space-y-2">
              <li><a href="/sellerlist" className="text-sm text-gray-600 hover:text-green-600 transition duration-300">Seller List</a></li>
              <li><a href="/sellerlogin" className="text-sm text-gray-600 hover:text-green-600 transition duration-300">Seller Login</a></li>
              <li><a href="/seller" className="text-sm text-gray-600 hover:text-green-600 transition duration-300">Become a Seller</a></li>
             
            </ul>
          </div>
          {/* Second Column: Helpful Links */}
          <div>
            <h3 className="text-lg font-bold text-green-600 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm text-gray-600 hover:text-green-600 transition duration-300">About us</a></li>
              <li><a href="/contact" className="text-sm text-gray-600 hover:text-green-600 transition duration-300">Contact us</a></li>
              <li><a href="/Faq" className="text-sm text-gray-600 hover:text-green-600 transition duration-300">FAQ</a></li>
              <li><a href="/Termscondition" className="text-sm text-gray-600 hover:text-green-600 transition duration-300">Terms &amp; conditions</a></li>
              <li><a href="/privacypolicy" className="text-sm text-gray-600 hover:text-green-600 transition duration-300">Privacy Policy</a></li>
              <li><a href="/downloadourapp" className="text-sm text-gray-600 hover:text-green-600 transition duration-300">Download our app</a></li>
              <li><a href="/mahaagromartseller" className="text-sm text-gray-600 hover:text-green-600 transition duration-300">Seller on Mahaagromart</a></li>
            </ul>
          </div>

          {/* Third Column: Services */}
          <div>
            <h3 className="text-lg font-bold text-green-600 mb-4">Account &amp; shipping info</h3>
            <ul className="space-y-2">
              <li><a href="/profileinfo" className="text-sm text-gray-600 hover:text-green-600 transition duration-300">Profile Info</a></li>
              <li><a href="/trackorder" className="text-sm text-gray-600 hover:text-green-600 transition duration-300">Track Order</a></li>
              <li><a href="/refundpolicy" className="text-sm text-gray-600 hover:text-green-600 transition duration-300">Refund policy</a></li>
              <li><a href="/returnpolicy" className="text-sm text-gray-600 hover:text-green-600 transition duration-300">Return policy</a></li>
              <li><a href="/cancellationpolicy" className="text-sm text-gray-600 hover:text-green-600 transition duration-300">Cancellation policy</a></li>
            </ul>
          </div>

        {/* Fourth Column: Barcode, App Download, Payment & Social Links */}
          <div>
            <h3 className="text-lg font-bold text-green-600 mb-4">Install  App</h3>
            <div className="flex flex-col items-start space-y-6">
              {/* Barcode */}
              <Image src={barcode} alt="Barcode" width={130} height={130} className="transition-transform duration-300 transform hover:scale-105" />
              <div className="flex space-x-6">
                <a href="#" className="text-gray-600 hover:text-green-600 transition duration-300">
                  <Image src={iosIcon} alt="Download on iOS" width={180} height={80} />
                </a>
              </div>
              {/* Payment Security & Social Icons */}
              <div className="flex items-center space-x-4 mt-4">
                <FaLock className="text-gray-600" />
                <p className="text-sm text-gray-600">Secure Payment Gateway</p>
              </div>
              <div className="flex space-x-6 mt-6">
                <a href="#" className="text-gray-600 hover:text-green-600 transition duration-300"><FaFacebookF className="text-xl" /></a>
                <a href="#" className="text-gray-600 hover:text-green-600 transition duration-300"><FaTwitter className="text-xl" /></a>
                <a href="#" className="text-gray-600 hover:text-green-600 transition duration-300"><FaInstagram className="text-xl" /></a>
                <a href="#" className="text-gray-600 hover:text-green-600 transition duration-300"><FaLinkedinIn className="text-xl" /></a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-green-600 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-white">&copy; 2025 MAIDC. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

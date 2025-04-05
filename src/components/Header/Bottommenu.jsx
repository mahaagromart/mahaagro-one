import { useState } from "react";
import { FaHome, FaSearch, FaThList, FaLifeRing, FaBars } from "react-icons/fa";
import Link from "next/link"; // Import Next.js Link

const Bottommenu = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-[#D32F2F] to-[#388E3C] z-50 md:hidden">
      <div className="flex justify-between items-center px-4 py-1 mt-2 bg-white rounded-t-4xl shadow-lg rounded-tr-2xl rounded-tl-2xl">
        <NavItem
          icon={<FaHome size={24} />}
          label="Home"
          isActive={activeTab === 0}
          onClick={() => setActiveTab(0)}
          ariaLabel="Home"
          linkTo="/"
        />
        <NavItem
          icon={<FaSearch size={24} />}
          label="Search"
          isActive={activeTab === 1}
          onClick={() => setActiveTab(1)}
          ariaLabel="Search"
          linkTo="/Mobilesearch"
        />
        <NavItem
          icon={<FaThList size={24} />}
          label="Category"
          isActive={activeTab === 2}
          onClick={() => setActiveTab(2)}
          ariaLabel="Category"
          linkTo="/mobilecategory"
        />
        <NavItem
          icon={<FaLifeRing size={24} />}
          label="Help/Support"
          isActive={activeTab === 3}
          onClick={() => setActiveTab(3)}
          ariaLabel="Help/Support"
          linkTo="/Helpsupport"
        />
        <NavItem
          icon={<FaBars size={24} />}
          label="Menu"
          isActive={activeTab === 4}
          onClick={() => setActiveTab(4)}
          ariaLabel="Menu"
          linkTo="/Mobilemenu"
        />
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, isActive, onClick, ariaLabel, linkTo }) => {
  return (
    <Link
      href={linkTo}
      className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
        isActive
          ? "text-white scale-110 shadow-lg transform-gpu"
          : "text-green-800 hover:text-[#FF5722] hover:scale-110"
      }`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <div
        className={`p-3 rounded-full transition-all duration-100 transform-gpu ${
          isActive
            ? "bg-[#FF5722] text-white shadow-xl scale-110 translate-y-[-25px]"
            : "hover:bg-[#388E3C] hover:scale-110 hover:translate-y-[-8px]"
        }`}
      >
        {icon}
      </div>
      <span className="text-xs text-gray-700">{label}</span>
    </Link>
  );
};

export default Bottommenu;
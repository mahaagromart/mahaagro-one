import React from "react";
import { FaCalendar, FaArrowRight } from "react-icons/fa";

const B2BDetails = () => {
  const relatedItems = [
    {
      id: 22,
      title: "Bulk Pack of Premium Rose Syrup – 2 Boxes (24 Bottles)",
      image: "https://mahaagromart.com/storage/app/public/poster/2025-03-05-67c806398fb9f.png",
      link: "/forum-details/22"
    },
    {
      id: 21,
      title: "Khus Syrup Bulk 2 Boxes (24 Bottles) 750ml each",
      image: "https://mahaagromart.com/storage/app/public/poster/2025-03-05-67c7e6f43b1ea.png",
      link: "/forum-details/21"
    },
    {
      id: 18,
      title: "Animal Feed B2B Selling",
      image: "https://mahaagromart.com/storage/app/public/poster/2024-12-10-6757f6ba2b2f8.png",
      link: "/forum-details/18"
    }
  ];

  return (
    <div className="container mx-auto px-4 rtl">
      <h2 className="text-center my-5 text-2xl font-bold">B2B Details</h2>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Main Content */}
        <div className="w-full md:w-9/11 bg-white rounded-lg shadow-md p-6">
          <img 
            className="w-full rounded-t-lg" 
            src="https://mahaagromart.com/storage/app/public/poster/2024-11-06-672b2f3cb385c.png" 
            alt="Cotton (BULK Selling)"
            onError={(e) => {
              e.target.src = 'https://mahaagromart.com/assets/front-end/img/placeholder.png';
            }}
          />
          
          <div className="mt-4">
            <h3 className="text-xl font-bold">Cotton (BULK Selling)</h3>

            <div className="flex items-center text-gray-600 my-2">
              <FaCalendar className="mr-2" />
              <span>2024-09-09</span>
            </div>

            <p className="mt-4 text-gray-700">
              MahaAgroMart's Cotton B2B service is designed to connect large-scale cotton suppliers with buyers across industries, fostering a streamlined marketplace for high-quality cotton products. Whether for textile manufacturers, garment producers, or exporters, MahaAgroMart facilitates easy access to bulk cotton, ensuring reliable sourcing, quality verification, and competitive pricing. The platform's dedicated support for cotton as a commodity enhances transparency and efficiency, making it simpler for businesses to source cotton through a trusted network.
            </p>

        

            <a 
              href="/customer/auth/login" 
              className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              B2B Service Request
            </a>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-3/12">
          {relatedItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
              <img 
                className="w-full h-48 object-cover rounded-t-lg"
                src={item.image}
                alt={item.title}
                onError={(e) => {
                  e.target.src = 'https://mahaagromart.com/assets/front-end/img/placeholder.png';
                }}
              />
              <div className="mt-3">
                <h6 className="font-semibold text-gray-800">{item.title}</h6>
                <a 
                  href={item.link} 
                  className="inline-flex items-center mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors text-sm"
                >
                  Read More <FaArrowRight className="ml-2" />
                </a>
              </div>
            </div>
          ))}

          <div className="text-center mt-3">
            <a 
              href="/forum" 
              className="inline-block px-4 py-2 font-bold text-green-600 hover:text-green-800 transition-colors"
            >
              <strong>View More &gt;&gt;&gt;</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default B2BDetails;
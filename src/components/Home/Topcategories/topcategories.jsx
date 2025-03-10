// "use client";
// import Link from 'next/link';
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import Noga from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/noga.svg";
// import Fertilizer from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/fertilizer.svg";
// import Agriculture from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/agriculturemachines.svg";
// import Drone from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/droneservice.svg";
// import Animal from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/animalfeed.svg";
// import Food from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/foodproduct.svg";
// import Gardening from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/gardening.svg";
// import Millets from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/millets.svg";
// import Service from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/service.svg";
// import Herbal from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/herbal.svg";
// import Art from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/artandcraft.svg";
// import Fruits from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/fruits.svg";

// const ProductCategories = () => {
//   const categories = [
//     { category_id:1,category: "Nogaa brand..", image: Noga, link: "/Category" },
//     { category_id:2,category: "Fertilizer", image: Fertilizer, link: "/Category" },
//     { category: "Agriculture", image: Agriculture, link: "/agriculture" },
//     { category: "Drone Service", image: Drone, link: "/drone-service" },
//     { category: "Animal feed", image: Animal, link: "/animal-feed" },
//     { category: "Food product", image: Food, link: "/food-product" },
//     { category: "Gardening", image: Gardening, link: "/gardening" },
//     { category: "Millets", image: Millets, link: "/millets" },
//     { category: "Service", image: Service, link: "/service" },
//     { category: "Herbal product", image: Herbal, link: "/herbal-product" },
//     { category: "Art and craft", image: Art, link: "/art-and-craft" },
//     { category: "Fruits", image: Fruits, link: "/fruits" },
//   ];

//   const categoriesPerSlide = {
//     base: 12, 
//     md: 12,   
//     lg: 5,  
//   };

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [categoriesPerView, setCategoriesPerView] = useState(categoriesPerSlide.base);

//   useEffect(() => {
//     const updateCategoriesPerView = () => {
//       if (window.innerWidth >= 1024) {
//         setCategoriesPerView(categoriesPerSlide.lg);
//       } else if (window.innerWidth >= 768) {
//         setCategoriesPerView(categoriesPerSlide.md);
//       } else {
//         setCategoriesPerView(categoriesPerSlide.base);
//       }
//     };

//     updateCategoriesPerView();
//     window.addEventListener("resize", updateCategoriesPerView);
//     return () => window.removeEventListener("resize", updateCategoriesPerView);
//   }, []);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => {
//       const newIndex = prevIndex + categoriesPerView;
//       return newIndex >= categories.length ? 0 : newIndex;
//     });
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => {
//       const newIndex = prevIndex - categoriesPerView;
//       return newIndex < 0 ? categories.length - categoriesPerView : newIndex;
//     });
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Top Categories</h1>

//       <div className="relative flex justify-center items-center">
//         <button
//           onClick={prevSlide}
//           className="absolute left-0 p-2 bg-gray-300 rounded-full text-black focus:outline-none"
//           style={{ top: '50%', transform: 'translateY(-50%)', opacity: '0.6' }}
//         >
//           <FontAwesomeIcon icon={faChevronLeft} />
//         </button>

//         <div className="flex flex-nowrap overflow-x-auto scrollbar-hide">
//           {categories.slice(currentIndex, currentIndex + categoriesPerView).map((category, index) => (
//            <Link key={index} href={`${category.link}/?category_id=${category.category_id}`} passHref>
//               <div className="w-64 flex-shrink-0 flex items-center cursor-pointer">
//                 <div className="bg-[#e8f2ee] rounded-full inline-block p-2 ml-2">
//                   <Image
//                     src={category.image}
//                     alt={category.category}
//                     className="w-20 h-20 rounded-full"
//                   />
//                 </div>
//                 <div className="flex flex-col">
//                   <h2 className="text-lg font-bold p-4">{category.category}</h2>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         <button
//           onClick={nextSlide}
//           className="absolute right-0 p-2 bg-gray-300 rounded-full text-black focus:outline-none"
//           style={{ top: '50%', transform: 'translateY(-50%)', opacity: '0.6' }}
//         >
//           <FontAwesomeIcon icon={faChevronRight} />
//         </button>
//       </div>

//       <style jsx>{`
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }
//         .scrollbar-hide {
//           -ms-overflow-style: none;  
//           scrollbar-width: none;  
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductCategories;

"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Noga from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/noga.svg";
import Fertilizer from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/fertilizer.svg";
import Agriculture from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/agriculturemachines.svg";
import Drone from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/droneservice.svg";
import Animalfeed from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/animalfeed.svg";
import Food from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/foodproduct.svg";
import Gardening from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/gardening.svg";
import Millets from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/millets.svg";
import Service from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/service.svg";
import Herbal from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/herbal.svg";
import Art from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/artandcraft.svg";
import Fruits from "../../../../public/assets/images/hometopcategoryicon/homecategorytwo/fruits.svg";

const CategorySection = () => {
  const categories = [
    { name: "Fertilizer", image: Fertilizer, link: "/category/fertilizer" },
    { name: "Drones", image: Drone, link: "/category/drones" },
    { name: "Agri-Machiner..", image: Agriculture, link: "/category/agricultural-machineries" },
    { name: "Animal Feed", image: Animalfeed, link: "/category/animal-feed" },
    { name: "Noga", image: Noga, link: "/category/noga" },
    { name: "Food Products", image: Food, link: "/category/food-products" },
    { name: "Gardening Tools", image: Gardening, link: "/category/gardening-tools" },
    { name: "Combo", image: Millets, link: "/category/combo" },
    { name: "Organic", image: Herbal, link: "/category/organic" },
    { name: "Arts and Crafts", image: Art, link: "/category/arts-and-crafts" },
    { name: "Packing", image: Service, link: "/category/packing" },
    { name: "Plasticulture", image: Herbal, link: "/category/plasticulture" },
    { name: "Vegetables", image: Fruits, link: "/category/vegetables" },
  ];

  return (
    <div className="container mx-auto p-4 font-poppins">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Top Categories</h1>
    </div>
  
    <div className="p-2 text-center">
      <div className="flex justify-center items-center mb-4">
        {/* Categories Grid for All Screens */}
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4 w-full max-w-[1500px] mx-auto">
          {categories.map((category, index) => (
            <div key={index} className="relative text-center group">
              {/* Circular Image */}
              <div className="flex justify-center">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={80}
                  height={80}
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 border-green-500"
                />
              </div>
              {/* Centered Category Name */}
              <h4 className="mt-2 text-xs sm:text-sm text-center">
                <a href={category.link} className="text-green-600 font-bold">
                  {category.name}
                </a>
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  );
};

export default CategorySection;
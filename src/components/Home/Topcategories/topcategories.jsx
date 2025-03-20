
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { makeRequest } from "@/api";


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
   const [Categorydata,setCategoryData]=useState([])


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
  const GetAllCategory = async () => {


    try {
      const storedToken = localStorage.getItem("authToken");
      const response = await makeRequest("POST", "/Category/GetAllCategory", {
      headers: { Authorization: `Bearer ${storedToken}` },
      });


    if(response.message=="SUCCESS" && response.retval=="SUCCESS"){
    setCategoryData(response.categoryList.$values)


    }
    
  } catch (error) {
      console.error("Unexpected error fetching categories:", error);
    
    }
  };
  


useEffect(() => {
  
  GetAllCategory();



}, []); 
  return (
    <div className="container mx-auto p-4 font-poppins">

    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">Top Categories</h1>
    </div>
  
    <div className="p-2 text-center">
      <div className="flex justify-center items-center mb-4">
        {/* Categories Grid for All Screens */}
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4 w-full max-w-[1500px] mx-auto">
          {Categorydata.map((category, index) => (
            <div key={index} className="relative text-center group">
              {/* Circular Image */}
              <div className="flex justify-center">
              <img
              src={`http://localhost:5136/${category.image}`}
              alt={category.category_Name}
              width="80"
              height="80"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 border-green-500"
              />
              </div>
              {/* Centered Category Name */}
              <h4 className="mt-2 text-xs sm:text-sm text-center">
                <h5 className="text-green-600 font-bold">
                  {category.category_Name}
                </h5>
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
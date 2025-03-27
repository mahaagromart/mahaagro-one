
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { makeRequest } from "@/api";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
// Import static images (optional fallback if API image fails)
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
import { CloudCog } from "lucide-react";



const CategorySection = () => {
    const [categoryData, setCategoryData] = useState([]);

    // Fetch categories from API
    const GetAllCategory = async () => {
        try {
            const storedToken = localStorage.getItem("authToken");
            const response = await makeRequest(
                "POST",
                "/Category/GetAllCategory",
                {}, // No body needed unless API requires specific data
                { headers: { Authorization: `Bearer ${storedToken}` } }
            );

            if (response.message === "SUCCESS" && response.retval === "SUCCESS") {
                setCategoryData(response.categoryList.$values);
              
            } else {
                console.error("Failed to fetch categories:", response.message);
            }
        } catch (error) {
            console.error("Unexpected error fetching categories:", error);
        }
    };

    useEffect(() => {
        GetAllCategory();
        console.log(categoryData)
    }, []);

    return (
        <div className="container mx-auto p-4 font-poppins">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Top Categories</h1>
            </div>

            <div className="p-2 text-center">
                <div className="flex justify-center items-center mb-4">
                    {/* Categories Grid */}
                    <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4 w-full max-w-[1500px] mx-auto">
                        {categoryData.map((category,index) => (
                            <Link
                                key={index} // Assuming category_Id is the unique identifier
                                href={{
                                    pathname: "/Category",
                                    query: { category_id: category.category_id }, // Pass category_id as query string
                                }}
                                passHref
                            >
                                <div className="relative text-center group cursor-pointer">
                                    {/* Circular Image */}
                                    <div className="flex justify-center">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${category.image}`}
                                            alt={category.category_Name}
                                            width="80"
                                            height="80"
                                            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 border-green-500 object-cover"
                                            onError={(e) => {
                                                e.target.src = Noga.src; // Fallback image if API image fails
                                            }}
                                        />
                                    </div>
                                    {/* Centered Category Name */}
                                    <h4 className="mt-2 text-xs sm:text-sm text-center">
                                        <span className="text-green-600 font-bold">
                                        <a href={`/Category?category_id=${category.category_id}`} className='bottom'>{category.category_Name}</a> 
                                        </span>
                                    </h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategorySection;
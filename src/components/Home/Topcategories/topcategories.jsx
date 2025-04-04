
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { makeRequest } from "@/api";
import Image from "next/image";



const CategorySection = () => {
    const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_API_URL;

    console.log(imageBaseUrl)
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
                                    <Image
                                    src={`${imageBaseUrl}${category.image}`}  // Ensure you are using category.image.src
                                    alt={category.category_Name}
                                    width="80"
                                    height="80"
                                    style={{objectFit:'cover'}}
                                    className="w-16 h-16 p-2 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 border-green-500 object-cover"
                                    // onError={(e) => {e.target.src = Noga.src; }}
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
// "use client";
// import Link from 'next/link';
// import  Banner from "../../public/assets/images/banner/Shopnow.svg"
// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { addToCart } from "../store/cartslice";
// import { addToWishList } from "../store/wishlistSlice.js";
// import ProductList from '../components/Home/fruitstwo';
// // import productsData from '../data/product';
// import { useRouter } from 'next/router';
// import { makeRequest } from "@/api";
// import swal from 'sweetalert';
// import { TbCircleLetterG } from 'react-icons/tb';
// // import { endpointClientChangedSubscribe } from 'next/dist/build/swc/generated-native';


// const CategoryPage = () => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [cartItems, setCartItems] = useState([]);
//     const [wishlist, setWishlist] = useState([]);
//     const [priceRange, setPriceRange] = useState([0, 500]);
//     const [selectedCategories, setSelectedCategories] = useState([]);
//     const [selectedStatus, setSelectedStatus] = useState([]);
//     const [sortBy, setSortBy] = useState('latest');
//     const [products, setProducts] = useState([]);
//     const itemsPerPage = 6;
//     const router = useRouter();
//     const dispatch = useDispatch();
//     const { category_id } = router.query;




 
//     const handleWeightChange = (weight, productId) => {
//         setProducts(products.map(product => {
//             if (product.id === productId) {
//                 return {
//                     ...product,
//                     selectedWeight: weight
//                 };
//             }
//             return product;
//         }));
//     };

//     const handleAddToCart = (product) => {
//         const productToAdd = {
//             ...product,
//             selectedWeight: product.selectedWeight.label,
//             selectedPrice: product.selectedWeight.discountedPrice,
//             selectedOriginalPrice: product.selectedWeight.originalPrice,
//             selectedDiscountedPrice: product.selectedWeight.discountedPrice,
//         };
//         setCartItems([...cartItems, productToAdd]);
//         dispatch(addToCart(productToAdd));
//         console.log("Added to Cart:", productToAdd); // Optional: for debugging
//     };

//     const handleAddToWishList = (product) => {
//         setWishlist([...wishlist, product]);
//         dispatch(addToWishList(product));
//         console.log("Added to Wish List:", product); // Optional: for debugging
//     };


//     const filteredProducts = products.filter((product) => {
        
//         const priceMatch = product.varientList.$values.price.discounted >= priceRange[0] && product.price.discounted <= priceRange[1];
//         const categoryMatch = selectedCategories.length ? selectedCategories.includes(product.category) : true;
//         const statusMatch = selectedStatus.length ? selectedStatus.includes(product.status) : true;
//         return priceMatch && categoryMatch && statusMatch;
//     });

//     const sortedProducts = [...filteredProducts].sort((a, b) => {
//         switch (sortBy) {
//             case 'latest':
//                 return b.id - a.id;
//             case 'price':
//                 return a.price.discounted - b.price.discounted;
//             case 'popularity':
//                 return b.popularity - a.popularity;
//             default:
//                 return 0;
//         }
//     });

//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

//     const handleNextPage = () => {
//         if (currentPage < Math.ceil(sortedProducts.length / itemsPerPage)) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const handlePrevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };

//     const handleCategoryChange = (e) => {
//         const category = e.target.value;
//         setSelectedCategories((prev) =>
//             e.target.checked ? [...prev, category] : prev.filter((item) => item !== category)
//         );
//     };

//     const handleStatusChange = (e) => {
//         const status = e.target.value;
//         setSelectedStatus((prev) =>
//             e.target.checked ? [...prev, status] : prev.filter((item) => item !== status)
//         );
//     };



//     //fetching product data from api 
//     const getProductData=async(categoryId)=>{
        
//     try {
//         const storedToken = localStorage.getItem("authToken");
//         const response = await makeRequest("POST", "/Product/GetProductBycategory", { Id: categoryId }, {
//             headers: { Authorization: `Bearer ${storedToken}` },
//         });

//       if(response[0].message=="SUCCESS" && response[0].retval=="SUCCESS"){
//         const list= response[0]?.dataset?.$values?.flatMap(product => product.varientList?.$values) || []
       

//      console.log(response[0]?.dataset?.$values)
//         setProducts(response[0]?.dataset?.$values);

  
  
//       }else if(response[0].message=="FAILURE" && response[0].retval=="FAILURE"){
//         swal('FAILURE', 'DATA NOT FOUND', 'FAILURE');
        
//       }else{
//         swal('SOMETHING WENT WRONG');
//       }
      
//     } catch (error) {
//         console.error("UNEXPECTED ERROR FETCHING PRODUCTS:", error.tostring());
      
//       }

//     }

//     useEffect(() => {
//         console.log(products)
      
//         const storedCart = localStorage.getItem("products");
//         if (storedCart) {
//             const parsedCart = JSON.parse(storedCart);
        
//             dispatch(addToCart(parsedCart));
//             setCartItems(parsedCart); 
//         }

      
//     }, [dispatch]); 

//     useEffect(()=>{
 
//         //  const data=products.varientList.$values.map(el=>console.log(el))
//         //  console.log(data)

        

      
//         if(router.query.category_id){
//             getProductData(router.query.category_id)
//         }
//     },[router.query.category_id])

//     return (
//         <>
//             <div className="bg-white text-gray-800 min-h-screen flex flex-col">
//                 <div className="flex-1 container mx-auto py-18 px-4">
//                     <div className="text-black text-2xl font-semibold mb-3">Category</div>
                
//                    <div
//                         className="w-full h-auto md:h-48 text-white rounded-lg shadow-md flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left p-6 md:p-8 mb-8"
//                         style={{
//                             backgroundImage: `url(${Banner.src})`, // Use the imported image
//                             backgroundSize: 'cover',
//                             height:'294px',
//                         }}
//                     >
                      
//                     </div>

//                     {/* Product Options Below the Banner */}
//                     <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 mb-6">
//                         {/* Filter Section */}
//                         <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md border border-gray-300">
//                             <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center">
//                                 <svg className="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
//                                 </svg>
//                                 Filters
//                             </h3>

//                             {/* Price Filter */}
//                             <div className="mb-8">
//                                 <h4 className="font-semibold mb-4 text-gray-700 flex items-center">
//                                     <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
//                                     </svg>
//                                     Price Range
//                                 </h4>
//                                 <input
//                                     type="range"
//                                     min="0"
//                                     max="500"
//                                     value={priceRange[1]}
//                                     onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
//                                     className="w-full text-green-500"
//                                 />
//                                 <div className="flex justify-between text-sm text-gray-600 mt-2">
//                                     <span>₹{priceRange[0]}</span>
//                                     <span>₹{priceRange[1]}</span>
//                                 </div>
//                             </div>
//                             {/* Product Categories */}
//                             <div className="mb-8">
//                                 <h4 className="font-semibold mb-4 text-gray-700 flex items-center">
//                                     <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
//                                     </svg>
//                                     Product Categories
//                                 </h4>
//                                 <div className="space-y-3">
//                                     {/* Seeds Category */}
//                                     <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
//                                         <div>
//                                             <label
//                                                 className="for-hover-lable cursor-pointer"
//                                                 onClick={() => {
//                                                     window.location.href = "https://mahaagromart.com/products?id=173&data_from=category&page=1";
//                                                 }}
//                                             >
//                                                 Seeds
//                                             </label>
//                                         </div>
//                                         <div
//                                             className="px-2 cursor-pointer"
//                                             onClick={(e) => {
//                                                 const collapseElement = document.getElementById("collapse-seeds");
//                                                 const toggleButton = e.currentTarget.querySelector(".pull-right");
//                                                 collapseElement.classList.toggle("hidden");
//                                                 toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
//                                             }}
//                                         >
//                                             <strong className="pull-right for-brand-hover">+</strong>
//                                         </div>
//                                     </div>
//                                     <div id="collapse-seeds" className="hidden pl-4 mt-2">
//                                         <ul className="space-y-2">
//                                             <li className="text-gray-600 hover:text-green-500 cursor-pointer">Vegetable Seeds</li>
//                                             <li className="text-gray-600 hover:text-green-500 cursor-pointer">Fruit Seeds</li>
//                                             <li className="text-gray-600 hover:text-green-500 cursor-pointer">Flower Seeds</li>
//                                         </ul>
//                                     </div>

//                                     {/* Fertilizers Category */}
//                                     <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
//                                         <div>
//                                             <label
//                                                 className="for-hover-lable cursor-pointer"
//                                                 onClick={() => {
//                                                     window.location.href = "https://mahaagromart.com/products?id=174&data_from=category&page=1";
//                                                 }}
//                                             >
//                                                 Fertilizers
//                                             </label>
//                                         </div>
//                                         <div
//                                             className="px-2 cursor-pointer"
//                                             onClick={(e) => {
//                                                 const collapseElement = document.getElementById("collapse-fertilizers");
//                                                 const toggleButton = e.currentTarget.querySelector(".pull-right");
//                                                 collapseElement.classList.toggle("hidden");
//                                                 toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
//                                             }}
//                                         >
//                                             <strong className="pull-right for-brand-hover">+</strong>
//                                         </div>
//                                     </div>
//                                     <div id="collapse-fertilizers" className="hidden pl-4 mt-2">
//                                         <ul className="space-y-2">
//                                             <li className="text-gray-600 hover:text-green-500 cursor-pointer">Organic Fertilizers</li>
//                                             <li className="text-gray-600 hover:text-green-500 cursor-pointer">Chemical Fertilizers</li>
//                                             <li className="text-gray-600 hover:text-green-500 cursor-pointer">Liquid Fertilizers</li>
//                                         </ul>
//                                     </div>

//                                     {/* Agricultural Machineries Category  */}
//                                      <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
//                                         <div>
//                                             <label
//                                                 className="for-hover-lable cursor-pointer"
//                                                 onClick={() => {
//                                                     window.location.href = "https://mahaagromart.com/products?id=175&data_from=category&page=1";
//                                                 }}
//                                             >
//                                                 Agricultural Machineries
//                                             </label>
//                                         </div>
//                                         <div
//                                             className="px-2 cursor-pointer"
//                                             onClick={(e) => {
//                                                 const collapseElement = document.getElementById("collapse-machineries");
//                                                 const toggleButton = e.currentTarget.querySelector(".pull-right");
//                                                 collapseElement.classList.toggle("hidden");
//                                                 toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
//                                             }}
//                                         >
//                                             <strong className="pull-right for-brand-hover">+</strong>
//                                         </div>
//                                     </div>
//                                     <div id="collapse-machineries" className="hidden pl-4 mt-2">
//                                         <ul className="space-y-2">
//                                             <li className="text-gray-600 hover:text-green-500 cursor-pointer">Tractors</li>
//                                             <li className="text-gray-600 hover:text-green-500 cursor-pointer">Harvesters</li>
//                                             <li className="text-gray-600 hover:text-green-500 cursor-pointer">Plows</li>
//                                         </ul>
//                                     </div> 

//                                     {/* Drone Services Category */}
//                                     <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
//                                         <div>
//                                             <label
//                                                 className="for-hover-lable cursor-pointer"
//                                                 onClick={() => {
//                                                     window.location.href = "https://mahaagromart.com/products?id=176&data_from=category&page=1";
//                                                 }}
//                                             >
//                                                 Drone Services
//                                             </label>
//                                         </div>
//                                         <div
//                                             className="px-2 cursor-pointer"
//                                             onClick={(e) => {
//                                                 const collapseElement = document.getElementById("collapse-drone-services");
//                                                 const toggleButton = e.currentTarget.querySelector(".pull-right");
//                                                 collapseElement.classList.toggle("hidden");
//                                                 toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
//                                             }}
//                                         >
//                                             <strong className="pull-right for-brand-hover">+</strong>
//                                         </div>
//                                     </div>
//                                     <div id="collapse-drone-services" className="hidden pl-4 mt-2">
//                                         <ul className="space-y-2">
//                                             <li className="text-gray-600 hover:text-green-500 cursor-pointer">Crop Monitoring</li>
//                                             <li className="text-gray-600 hover:text-green-500 cursor-pointer">Spraying Services</li>
//                                             <li className="text-gray-600 hover:text-green-500 cursor-pointer">Mapping Services</li>
//                                         </ul>
//                                     </div>

                                 
//                                     {/* Example for Animal Feed */}
//                                     <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
//                                         <div>
//                                             <label
//                                                 className="for-hover-lable cursor-pointer"
//                                                 onClick={() => {
//                                                     window.location.href = "https://mahaagromart.com/products?id=177&data_from=category&page=1";
//                                                 }}
//                                             >
//                                                 Animal Feed
//                                             </label>
//                                         </div>
//                                         <div
//                                             className="px-2 cursor-pointer"
//                                             onClick={(e) => {
//                                                 const collapseElement = document.getElementById("collapse-animal-feed");
//                                                 const toggleButton = e.currentTarget.querySelector(".pull-right");
//                                                 collapseElement.classList.toggle("hidden");
//                                                 toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
//                                             }}
//                                         >
//                                             <strong className="pull-right for-brand-hover">+</strong>
//                                         </div>
//                                     </div>
//                                     <div id="collapse-animal-feed" className="hidden pl-4 mt-2">
//                                         <ul className="space-y-2">
//                                             <li className="text-gray-600 hover:text-green-500 cursor-pointer">Cattle Feed</li>
//                                             <li className="text-gray-600 hover:text-green-500 cursor-pointer">Poultry Feed</li>
//                                             <li className="text-gray-600 hover:text-green-500 cursor-pointer">Fish Feed</li>
//                                         </ul>
//                                     </div> 

//                                     {/* Repeat the above structure for other categories */}
//                                     <div className="space-y-2">

//                                         {/* Food Category */}
//                                      <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
//                                             <div>
//                                                 <label
//                                                     className="for-hover-lable cursor-pointer"
//                                                     onClick={() => {
//                                                         window.location.href = "https://mahaagromart.com/products?id=174&data_from=category&page=1";
//                                                     }}
//                                                 >
//                                                     Food
//                                                 </label>
//                                             </div>
//                                             <div
//                                                 className="px-2 cursor-pointer"
//                                                 onClick={(e) => {
//                                                     const collapseElement = document.getElementById("collapse-food");
//                                                     const toggleButton = e.currentTarget.querySelector(".pull-right");
//                                                     collapseElement.classList.toggle("hidden");
//                                                     toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
//                                                 }}
//                                             >
//                                                 <strong className="pull-right for-brand-hover">+</strong>
//                                             </div>
//                                         </div>
//                                         <div id="collapse-food" className="hidden pl-4 mt-2">
//                                             <ul className="space-y-2">
//                                                 <li className="text-gray-600 hover:text-green-500 cursor-pointer">Organic Food</li>
//                                                 <li className="text-gray-600 hover:text-green-500 cursor-pointer">Snacks</li>
//                                                 <li className="text-gray-600 hover:text-green-500 cursor-pointer">Grains</li>
//                                             </ul>
//                                         </div> 

//                                    {/* Garden Category */}
//                                         <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
//                                             <div>
//                                                 <label
//                                                     className="for-hover-lable cursor-pointer"
//                                                     onClick={() => {
//                                                         window.location.href = "https://mahaagromart.com/products?id=175&data_from=category&page=1";
//                                                     }}
//                                                 >
//                                                     Garden
//                                                 </label>
//                                             </div>
//                                             <div
//                                                 className="px-2 cursor-pointer"
//                                                 onClick={(e) => {
//                                                     const collapseElement = document.getElementById("collapse-garden");
//                                                     const toggleButton = e.currentTarget.querySelector(".pull-right");
//                                                     collapseElement.classList.toggle("hidden");
//                                                     toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
//                                                 }}
//                                             >
//                                                 <strong className="pull-right for-brand-hover">+</strong>
//                                             </div>
//                                         </div>
//                                         <div id="collapse-garden" className="hidden pl-4 mt-2">
//                                             <ul className="space-y-2">
//                                                 <li className="text-gray-600 hover:text-green-500 cursor-pointer">Gardening Tools</li>
//                                                 <li className="text-gray-600 hover:text-green-500 cursor-pointer">Pots & Planters</li>
//                                                 <li className="text-gray-600 hover:text-green-500 cursor-pointer">Soil & Fertilizers</li>
//                                             </ul>
//                                         </div> 

//                                         {/* Add more categories similarly */}
//                                         {/* Noga, Combopacks, Millets, Service, Herb, Art and Craft, Packing Material, Plasticulture, Other, Fruit Vegetable */}

//                                         {/* Example for Noga Category */}
//                                      <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
//                                             <div>
//                                                 <label
//                                                     className="for-hover-lable cursor-pointer"
//                                                     onClick={() => {
//                                                         window.location.href = "https://mahaagromart.com/products?id=176&data_from=category&page=1";
//                                                     }}
//                                                 >
//                                                     Noga
//                                                 </label>
//                                             </div>
//                                             <div
//                                                 className="px-2 cursor-pointer"
//                                                 onClick={(e) => {
//                                                     const collapseElement = document.getElementById("collapse-noga");
//                                                     const toggleButton = e.currentTarget.querySelector(".pull-right");
//                                                     collapseElement.classList.toggle("hidden");
//                                                     toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
//                                                 }}
//                                             >
//                                                 <strong className="pull-right for-brand-hover">+</strong>
//                                             </div>
//                                         </div>
//                                         <div id="collapse-noga" className="hidden pl-4 mt-2">
//                                             <ul className="space-y-2">
//                                                 <li className="text-gray-600 hover:text-green-500 cursor-pointer">Noga Products 1</li>
//                                                 <li className="text-gray-600 hover:text-green-500 cursor-pointer">Noga Products 2</li>
//                                                 <li className="text-gray-600 hover:text-green-500 cursor-pointer">Noga Products 3</li>
//                                             </ul>
//                                         </div> 

//                                         {/* Continue adding more categories as needed... */}
//                                         <div className="space-y-2">


//                                             {/* Combo Pack Category */}
//                                             <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
//                                                 <div>
//                                                     <label
//                                                         className="for-hover-lable cursor-pointer"
//                                                         onClick={() => {
//                                                             window.location.href = "https://mahaagromart.com/products?id=174&data_from=category&page=1";
//                                                         }}
//                                                     >
//                                                         Combo Pack
//                                                     </label>
//                                                 </div>
//                                                 <div
//                                                     className="px-2 cursor-pointer"
//                                                     onClick={(e) => {
//                                                         const collapseElement = document.getElementById("collapse-combo-pack");
//                                                         const toggleButton = e.currentTarget.querySelector(".pull-right");
//                                                         collapseElement.classList.toggle("hidden");
//                                                         toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
//                                                     }}
//                                                 >
//                                                     <strong className="pull-right for-brand-hover">+</strong>
//                                                 </div>
//                                             </div>
//                                             <div id="collapse-combo-pack" className="hidden pl-4 mt-2">
//                                                 <ul className="space-y-2">
//                                                     <li className="text-gray-600 hover:text-green-500 cursor-pointer">Seed Combos</li>
//                                                     <li className="text-gray-600 hover:text-green-500 cursor-pointer">Gardening Kits</li>
//                                                     <li className="text-gray-600 hover:text-green-500 cursor-pointer">Organic Food Packs</li>
//                                                 </ul>
//                                             </div> 

//                                             {/* Millets Category */}
//                                              <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
//                                                 <div>
//                                                     <label
//                                                         className="for-hover-lable cursor-pointer"
//                                                         onClick={() => {
//                                                             window.location.href = "https://mahaagromart.com/products?id=175&data_from=category&page=1";
//                                                         }}
//                                                     >
//                                                         Millets
//                                                     </label>
//                                                 </div>
//                                                 <div
//                                                     className="px-2 cursor-pointer"
//                                                     onClick={(e) => {
//                                                         const collapseElement = document.getElementById("collapse-millets");
//                                                         const toggleButton = e.currentTarget.querySelector(".pull-right");
//                                                         collapseElement.classList.toggle("hidden");
//                                                         toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
//                                                     }}
//                                                 >
//                                                     <strong className="pull-right for-brand-hover">+</strong>
//                                                 </div>
//                                             </div>
//                                             <div id="collapse-millets" className="hidden pl-4 mt-2">
//                                                 <ul className="space-y-2">
//                                                     <li className="text-gray-600 hover:text-green-500 cursor-pointer">Foxtail Millet</li>
//                                                     <li className="text-gray-600 hover:text-green-500 cursor-pointer">Pearl Millet</li>
//                                                     <li className="text-gray-600 hover:text-green-500 cursor-pointer">Finger Millet</li>
//                                                 </ul>
//                                             </div> 

//                                             {/* Service Category */}
//                                              <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
//                                                 <div>
//                                                     <label
//                                                         className="for-hover-lable cursor-pointer"
//                                                         onClick={() => {
//                                                             window.location.href = "https://mahaagromart.com/products?id=176&data_from=category&page=1";
//                                                         }}
//                                                     >
//                                                         Service
//                                                     </label>
//                                                 </div>
//                                                 <div
//                                                     className="px-2 cursor-pointer"
//                                                     onClick={(e) => {
//                                                         const collapseElement = document.getElementById("collapse-service");
//                                                         const toggleButton = e.currentTarget.querySelector(".pull-right");
//                                                         collapseElement.classList.toggle("hidden");
//                                                         toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
//                                                     }}
//                                                 >
//                                                     <strong className="pull-right for-brand-hover">+</strong>
//                                                 </div>
//                                             </div>
//                                             <div id="collapse-service" className="hidden pl-4 mt-2">
//                                                 <ul className="space-y-2">
//                                                     <li className="text-gray-600 hover:text-green-500 cursor-pointer">Soil Testing</li>
//                                                     <li className="text-gray-600 hover:text-green-500 cursor-pointer">Farm Consultancy</li>
//                                                     <li className="text-gray-600 hover:text-green-500 cursor-pointer">Irrigation Solutions</li>
//                                                 </ul>
//                                             </div> 

//                                             {/* Agriculture Category */}
//                                              <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
//                                                 <div>
//                                                     <label
//                                                         className="for-hover-lable cursor-pointer"
//                                                         onClick={() => {
//                                                             window.location.href = "https://mahaagromart.com/products?id=177&data_from=category&page=1";
//                                                         }}
//                                                     >
//                                                         Agriculture
//                                                     </label>
//                                                 </div>
//                                                 <div
//                                                     className="px-2 cursor-pointer"
//                                                     onClick={(e) => {
//                                                         const collapseElement = document.getElementById("collapse-agriculture");
//                                                         const toggleButton = e.currentTarget.querySelector(".pull-right");
//                                                         collapseElement.classList.toggle("hidden");
//                                                         toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
//                                                     }}
//                                                 >
//                                                     <strong className="pull-right for-brand-hover">+</strong>
//                                                 </div>
//                                             </div>
//                                             <div id="collapse-agriculture" className="hidden pl-4 mt-2">
//                                                 <ul className="space-y-2">
//                                                     <li className="text-gray-600 hover:text-green-500 cursor-pointer">Farming Equipment</li>
//                                                     <li className="text-gray-600 hover:text-green-500 cursor-pointer">Crop Protection</li>
//                                                     <li className="text-gray-600 hover:text-green-500 cursor-pointer">Fertilizers</li>
//                                                 </ul>
//                                             </div>

//                                             {/* Arts & Craft Category */}
//                                          <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
//                                                 <div>
//                                                     <label
//                                                         className="for-hover-lable cursor-pointer"
//                                                         onClick={() => {
//                                                             window.location.href = "https://mahaagromart.com/products?id=178&data_from=category&page=1";
//                                                         }}
//                                                     >
//                                                         Arts & Craft
//                                                     </label>
//                                                 </div>
//                                                 <div
//                                                     className="px-2 cursor-pointer"
//                                                     onClick={(e) => {
//                                                         const collapseElement = document.getElementById("collapse-arts-craft");
//                                                         const toggleButton = e.currentTarget.querySelector(".pull-right");
//                                                         collapseElement.classList.toggle("hidden");
//                                                         toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
//                                                     }}
//                                                 >
//                                                     <strong className="pull-right for-brand-hover">+</strong>
//                                                 </div>
//                                             </div>
//                                             <div id="collapse-arts-craft" className="hidden pl-4 mt-2">
//                                                 <ul className="space-y-2">
//                                                     <li className="text-gray-600 hover:text-green-500 cursor-pointer">Handmade Crafts</li>
//                                                     <li className="text-gray-600 hover:text-green-500 cursor-pointer">Painting Supplies</li>
//                                                     <li className="text-gray-600 hover:text-green-500 cursor-pointer">DIY Kits</li>
//                                                 </ul>
//                                             </div> 

//                                             {/* Packing Materials Category */}
//                                             <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
//                                                 <div>
//                                                     <label
//                                                         className="for-hover-lable cursor-pointer"
//                                                         onClick={() => {
//                                                             window.location.href = "https://mahaagromart.com/products?id=179&data_from=category&page=1";
//                                                         }}
//                                                     >
//                                                         Packing Materials
//                                                     </label>
//                                                 </div>
//                                                 <div
//                                                     className="px-2 cursor-pointer"
//                                                     onClick={(e) => {
//                                                         const collapseElement = document.getElementById("collapse-packing-materials");
//                                                         const toggleButton = e.currentTarget.querySelector(".pull-right");
//                                                         collapseElement.classList.toggle("hidden");
//                                                         toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
//                                                     }}
//                                                 >
//                                                     <strong className="pull-right for-brand-hover">+</strong>
//                                                 </div>
//                                             </div>
//                                             <div id="collapse-packing-materials" className="hidden pl-4 mt-2">
//                                                 <ul className="space-y-2">
//                                                     <li className="text-gray-600 hover:text-green-500 cursor-pointer">Boxes</li>
//                                                     <li className="text-gray-600 hover:text-green-500 cursor-pointer">Bubble Wrap</li>
//                                                     <li className="text-gray-600 hover:text-green-500 cursor-pointer">Tapes</li>
//                                                 </ul>
//                                             </div> 
//                                             <div className="space-y-2">


//                                                 {/* Plasticulture Category */}
//                                                  <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
//                                                     <div>
//                                                         <label
//                                                             className="for-hover-lable cursor-pointer"
//                                                             onClick={() => {
//                                                                 window.location.href = "https://mahaagromart.com/products?id=180&data_from=category&page=1";
//                                                             }}
//                                                         >
//                                                             Plasticulture
//                                                         </label>
//                                                     </div>
//                                                     <div
//                                                         className="px-2 cursor-pointer"
//                                                         onClick={(e) => {
//                                                             const collapseElement = document.getElementById("collapse-plasticulture");
//                                                             const toggleButton = e.currentTarget.querySelector(".pull-right");
//                                                             collapseElement.classList.toggle("hidden");
//                                                             toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
//                                                         }}
//                                                     >
//                                                         <strong className="pull-right for-brand-hover">+</strong>
//                                                     </div>
//                                                 </div>
//                                                 <div id="collapse-plasticulture" className="hidden pl-4 mt-2">
//                                                     <ul className="space-y-2">
//                                                         <li className="text-gray-600 hover:text-green-500 cursor-pointer">Mulching Films</li>
//                                                         <li className="text-gray-600 hover:text-green-500 cursor-pointer">Drip Irrigation</li>
//                                                         <li className="text-gray-600 hover:text-green-500 cursor-pointer">Greenhouse Films</li>
//                                                     </ul>
//                                                 </div> 

//                                                 {/* Fruits Category */}
//                                                  <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
//                                                     <div>
//                                                         <label
//                                                             className="for-hover-lable cursor-pointer"
//                                                             onClick={() => {
//                                                                 window.location.href = "https://mahaagromart.com/products?id=181&data_from=category&page=1";
//                                                             }}
//                                                         >
//                                                             Fruits
//                                                         </label>
//                                                     </div>
//                                                     <div
//                                                         className="px-2 cursor-pointer"
//                                                         onClick={(e) => {
//                                                             const collapseElement = document.getElementById("collapse-fruits");
//                                                             const toggleButton = e.currentTarget.querySelector(".pull-right");
//                                                             collapseElement.classList.toggle("hidden");
//                                                             toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
//                                                         }}
//                                                     >
//                                                         <strong className="pull-right for-brand-hover">+</strong>
//                                                     </div>
//                                                 </div>
//                                                 <div id="collapse-fruits" className="hidden pl-4 mt-2">
//                                                     <ul className="space-y-2">
//                                                         <li className="text-gray-600 hover:text-green-500 cursor-pointer">Fresh Fruits</li>
//                                                         <li className="text-gray-600 hover:text-green-500 cursor-pointer">Dried Fruits</li>
//                                                         <li className="text-gray-600 hover:text-green-500 cursor-pointer">Exotic Fruits</li>
//                                                     </ul>
//                                                 </div> 

//                                                 {/* Other Category */}
//                                                 <div className="card-header p-1 flex justify-between items-center bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
//                                                     <div>
//                                                         <label
//                                                             className="for-hover-lable cursor-pointer"
//                                                             onClick={() => {
//                                                                 window.location.href = "https://mahaagromart.com/products?id=182&data_from=category&page=1";
//                                                             }}
//                                                         >
//                                                             Other
//                                                         </label>
//                                                     </div>
//                                                     <div
//                                                         className="px-2 cursor-pointer"
//                                                         onClick={(e) => {
//                                                             const collapseElement = document.getElementById("collapse-other");
//                                                             const toggleButton = e.currentTarget.querySelector(".pull-right");
//                                                             collapseElement.classList.toggle("hidden");
//                                                             toggleButton.textContent = toggleButton.textContent === "+" ? "-" : "+";
//                                                         }}
//                                                     >
//                                                         <strong className="pull-right for-brand-hover">+</strong>
//                                                     </div>
//                                                 </div>
//                                                 <div id="collapse-other" className="hidden pl-4 mt-2">
//                                                     <ul className="space-y-2">
//                                                         <li className="text-gray-600 hover:text-green-500 cursor-pointer">Miscellaneous Items</li>
//                                                         <li className="text-gray-600 hover:text-green-500 cursor-pointer">Seasonal Products</li>
//                                                         <li className="text-gray-600 hover:text-green-500 cursor-pointer">Special Offers</li>
//                                                     </ul>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             {/* Product Status */}
//                             <div className="mb-8">
//                                 <h4 className="font-semibold mb-4 text-gray-700 flex items-center">
//                                     <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//                                     </svg>
//                                     Product Status
//                                 </h4>
//                                 <ul className="space-y-3">
//                                     <li className="flex items-center">
//                                         <input
//                                             type="checkbox"
//                                             value="In Stock"
//                                             onChange={handleStatusChange}
//                                             id="status1"
//                                             className="form-checkbox h-5 w-5 text-green-500 rounded"
//                                         />
//                                         <label htmlFor="status1" className="ml-3 text-gray-600">In Stock</label>
//                                     </li>
//                                     <li className="flex items-center">
//                                         <input
//                                             type="checkbox"
//                                             value="Out of Stock"
//                                             onChange={handleStatusChange}
//                                             id="status2"
//                                             className="form-checkbox h-5 w-5 text-green-500 rounded"
//                                         />
//                                         <label htmlFor="status2" className="ml-3 text-gray-600">Out of Stock</label>
//                                     </li>
//                                     <li className="flex items-center">
//                                         <input
//                                             type="checkbox"
//                                             value="Coming Soon"
//                                             onChange={handleStatusChange}
//                                             id="status3"
//                                             className="form-checkbox h-5 w-5 text-green-500 rounded"
//                                         />
//                                         <label htmlFor="status3" className="ml-3 text-gray-600">Coming Soon</label>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>

//                         {/* Product Listing Section */}
//                         <div className="w-full md:w-2/3">
//                             <div className="flex justify-between items-center mb-6">
//                                 <div className="text-sm text-gray-600">
//                                     Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, sortedProducts.length)} of {sortedProducts.length} results
//                                 </div>

//                                 <div className="flex items-center space-x-4">
//                                     <select
//                                         value={sortBy}
//                                         onChange={(e) => setSortBy(e.target.value)}
//                                         className="bg-white text-gray-700 p-2 rounded-md border border-gray-300"
//                                     >
//                                         <option value="latest">Sort by Latest</option>
//                                         <option value="price">Sort by Price</option>
//                                         <option value="popularity">Sort by Popularity</option>
//                                     </select>
//                                 </div>
//                             </div>

//                             {/* Product List */}
//                             <div className=" sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//                                 {currentItems.length > 0 ? (
//                                     <ProductList
//                                         products={currentItems}
//                                         handleAddToCart={handleAddToCart}
//                                         handleAddToWishList={handleAddToWishList}
//                                         handleWeightChange={handleWeightChange}
//                                     />
//                                 ) : (
//                                     <div className="text-center col-span-3 text-gray-500">No products found</div>
//                                 )}
//                             </div>

//                             {/* Pagination */}
//                             <div className="flex justify-center items-center mt-6 space-x-4">
//                                 <button
//                                     onClick={handlePrevPage}
//                                     disabled={currentPage === 1}
//                                     className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50"
//                                 >
//                                     &lt; Prev
//                                 </button>

//                                 <div className="flex space-x-2">
//                                     {Array.from({ length: Math.ceil(sortedProducts.length / itemsPerPage) }, (_, index) => (
//                                         <button
//                                             key={index + 1}
//                                             onClick={() => setCurrentPage(index + 1)}
//                                             className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-green-300 text-black' : 'bg-white text-gray-600 hover:bg-green-200'} transition-colors`}
//                                         >
//                                             {index + 1}
//                                         </button>
//                                     ))}
//                                 </div>

//                                 <button
//                                     onClick={handleNextPage}
//                                     disabled={currentPage === Math.ceil(sortedProducts.length / itemsPerPage)}
//                                     className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50"
//                                 >
//                                     Next &gt;
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default CategoryPage;    







//NEW DESIGN


// "use client";
// import Link from 'next/link';
// import  Banner from "../../public/assets/images/banner/Shopnow.svg"
// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { addToCart } from "../store/cartslice";
// import { addToWishList } from "../store/wishlistSlice.js";
// import ProductList from '../components/Home/fruitstwo';
// // import productsData from '../data/product';
// import { useRouter } from 'next/router';
// import { makeRequest } from "@/api";
// import swal from 'sweetalert';
// import { TbCircleLetterG } from 'react-icons/tb';
// // import { endpointClientChangedSubscribe } from 'next/dist/build/swc/generated-native';


// const CategoryPage = () => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [cartItems, setCartItems] = useState([]);
//     const [wishlist, setWishlist] = useState([]);
//     const [priceRange, setPriceRange] = useState([0, 500]);
//     const [selectedCategories, setSelectedCategories] = useState([]);
//     const [selectedStatus, setSelectedStatus] = useState([]);
//     const [sortBy, setSortBy] = useState('latest');
//     const [products, setProducts] = useState([]);
//     const itemsPerPage = 6;
//     const router = useRouter();
//     const dispatch = useDispatch();
//     const { category_id } = router.query;




 
//     const handleWeightChange = (weight, productId) => {
//         setProducts(products.map(product => {
//             if (product.id === productId) {
//                 return {
//                     ...product,
//                     selectedWeight: weight
//                 };
//             }
//             return product;
//         }));
//     };

//     const handleAddToCart = (product) => {
//         const productToAdd = {
//             ...product,
//             selectedWeight: product.selectedWeight.label,
//             selectedPrice: product.selectedWeight.discountedPrice,
//             selectedOriginalPrice: product.selectedWeight.originalPrice,
//             selectedDiscountedPrice: product.selectedWeight.discountedPrice,
//         };
//         setCartItems([...cartItems, productToAdd]);
//         dispatch(addToCart(productToAdd));
//         console.log("Added to Cart:", productToAdd); // Optional: for debugging
//     };

//     const handleAddToWishList = (product) => {
//         setWishlist([...wishlist, product]);
//         dispatch(addToWishList(product));
//         console.log("Added to Wish List:", product); // Optional: for debugging
//     };



//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

//     const handleNextPage = () => {
//         if (currentPage < Math.ceil(products.length / itemsPerPage)) {
//             setCurrentPage(currentPage + 1);
//         }
//     };

//     const handlePrevPage = () => {
//         if (currentPage > 1) {
//             setCurrentPage(currentPage - 1);
//         }
//     };


//     //fetching product data from api 
//     const getProductData=async(categoryId)=>{
        
//     try {
//         const storedToken = localStorage.getItem("authToken");
//         const response = await makeRequest("POST", "/Product/GetProductBycategory", { Id: categoryId }, {
//             headers: { Authorization: `Bearer ${storedToken}` },
//         });

//       if(response[0].message=="SUCCESS" && response[0].retval=="SUCCESS"){
//         const list= response[0]?.dataset?.$values?.flatMap(product => product.varientList?.$values) || []
//         console.log(response[0]?.dataset?.$values)
       

  
//         setProducts(response[0]?.dataset?.$values);

  
  
//       }else if(response[0].message=="FAILURE" && response[0].retval=="FAILURE"){
//         swal('FAILURE', 'DATA NOT FOUND', 'FAILURE');
        
//       }else{
//         swal('SOMETHING WENT WRONG');
//       }
      
//     } catch (error) {
//         console.error("UNEXPECTED ERROR FETCHING PRODUCTS:", error.tostring());
      
//       }

//     }

//     useEffect(() => {
//         console.log(products)
      
//         const storedCart = localStorage.getItem("products");
//         if (storedCart) {
//             const parsedCart = JSON.parse(storedCart);
        
//             dispatch(addToCart(parsedCart));
//             setCartItems(parsedCart); 
//         }

      
//     }, [dispatch]); 

//     useEffect(()=>{
 
//         //  const data=products.varientList.$values.map(el=>console.log(el))
//         //  console.log(data)

        

      
//         if(router.query.category_id){
//             getProductData(router.query.category_id)
//         }
//     },[router.query.category_id])

//     return (
//         <>
//             <div className="bg-white text-gray-800 min-h-screen flex flex-col">
//                 <div className="flex-1 container mx-auto py-18 px-4">
//                     <div className="text-black text-2xl font-semibold mb-3">Category</div>
                
//                    <div
//                         className="w-full h-auto md:h-48 text-white rounded-lg shadow-md flex flex-col md:flex-row justify-center md:justify-between items-center text-center md:text-left p-6 md:p-8 mb-8"
//                         style={{
//                             backgroundImage: `url(${Banner.src})`, // Use the imported image
//                             backgroundSize: 'cover',
//                             height:'294px',
//                         }}
//                     >
                      
//                     </div>

//                     {/* Product Listing Section */}
//                     {/* <div className="w-full md:w-2/3">
//                         <div className="flex justify-between items-center mb-6">
//                             <div className="text-sm text-gray-600">
//                                 Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, products.length)} of {products.length} results
//                             </div>

//                             <div className="flex items-center space-x-4">
//                                 <select
//                                     value={sortBy}
//                                     onChange={(e) => setSortBy(e.target.value)}
//                                     className="bg-white text-gray-700 p-2 rounded-md border border-gray-300"
//                                 >
//                                     <option value="latest">Sort by Latest</option>
//                                     <option value="price">Sort by Price</option>
//                                     <option value="popularity">Sort by Popularity</option>
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Product List */}
//                         <div className=" sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//                             {currentItems.length > 0 ? (
//                                 <ProductList
//                                     products={currentItems}
//                                     handleAddToCart={handleAddToCart}
//                                     handleAddToWishList={handleAddToWishList}
//                                     handleWeightChange={handleWeightChange}
//                                 />
//                             ) : (
//                                 <div className="text-center col-span-3 text-gray-500">No products found</div>
//                             )}
//                         </div>

//                         {/* Pagination */}
//                         <div className="flex justify-center items-center mt-6 space-x-4">
//                             <button
//                                 onClick={handlePrevPage}
//                                 disabled={currentPage === 1}
//                                 className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50"
//                             >
//                                 &lt; Prev
//                             </button>

//                             <div className="flex space-x-2">
//                                 {Array.from({ length: Math.ceil(products.length / itemsPerPage) }, (_, index) => (
//                                     <button
//                                         key={index + 1}
//                                         onClick={() => setCurrentPage(index + 1)}
//                                         className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-green-300 text-black' : 'bg-white text-gray-600 hover:bg-green-200'} transition-colors`}
//                                     >
//                                         {index + 1}
//                                     </button>
//                                 ))}
//                             </div>

//                             <button
//                                 onClick={handleNextPage}
//                                 disabled={currentPage === Math.ceil(products.length / itemsPerPage)}
//                                 className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50"
//                             >
//                                 Next &gt;
//                             </button>
//                         </div>
//                     {/* </div>  */}

//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
//     {products.map((product) => (
//         <div key={product.productId} className="bg-white p-4 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-gray-900">{product.varientList?.$values[0]?.productName}</h3>
            
//             {product.varientList?.$values.map((variant, index) => (
//                 <div key={index} className="border p-2 mt-2 rounded-md">
//                     <img 
//                         src={variant.images[0]} 
//                         alt={variant.productName} 
//                         className="w-full h-40 object-cover rounded-md"
//                     />
//                     <p className="text-gray-700 mt-2">Variant: {variant.varientName}</p>
//                     <p className="text-gray-900 font-bold">Price: ₹{variant.price}</p>

//                     <button 
//                         onClick={() => handleAddToCart(variant)} 
//                         className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
//                     >
//                         Add to Cart
//                     </button>
//                     <button 
//                         onClick={() => handleAddToWishList(variant)} 
//                         className="ml-2 mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
//                     >
//                         Add to Wishlist
//                     </button>
//                 </div>
//             ))}
//         </div>
//     ))}
// </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default CategoryPage; 








"use client";
import Banner from "../../public/assets/images/banner/Shopnow.svg";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from "../store/cartslice";
import { addToWishList } from "../store/wishlistSlice.js";
import { useRouter } from 'next/router';
import { makeRequest } from "@/api";
import swal from 'sweetalert';

const CategoryPage = () => {
    const [products, setProducts] = useState([]);
    const router = useRouter();
    const dispatch = useDispatch();
    const imageBaseUrl = process.env.NEXT_PUBLIC_IMAGE_API_URL;

    // Fetch product data from API
    const getProductData = async (categoryId) => {
        try {
            const storedToken = localStorage.getItem("authToken");
            const response = await makeRequest("POST", "/Product/GetProductBycategory", { Id: categoryId }, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });

            if (response[0].message === "SUCCESS" && response[0].retval === "SUCCESS") {
                const formattedProducts = response[0]?.dataset?.$values?.map(product => ({
                    ...product,
                    selectedVariant: product.varientList?.$values[0] || null // Default to the first variant
                })) || [];
                console.log(formattedProducts)
                setProducts(formattedProducts);
            } else {
                swal('FAILURE', 'DATA NOT FOUND', 'error');
            }
        } catch (error) {
            console.error("UNEXPECTED ERROR FETCHING PRODUCTS:", error.toString());
        }
    };

    useEffect(() => {
        if (router.query.category_id) {
            getProductData(router.query.category_id);
        }
    }, [router.query.category_id]);

    const handleAddToCart = (product) => {
        if (!product.selectedVariant) return;
        dispatch(addToCart(product.selectedVariant));
        console.log("Added to Cart:", product.selectedVariant);
    };

    const handleAddToWishList = (product) => {
        if (!product.selectedVariant) return;
        dispatch(addToWishList(product.selectedVariant));
        console.log("Added to Wish List:", product.selectedVariant);
    };

    const handleVariantClick = (productId, variant) => {
        setProducts(products.map(product =>
            product.productId === productId ? { ...product, selectedVariant: variant } : product
        ));
    };

    return (
        <div className="bg-white text-gray-800 min-h-screen flex flex-col">
            <div className="container mx-auto py-18 px-4">
                <div className="text-black text-2xl font-semibold mb-3">Category</div>

                {/* Banner */}
                <div
                    className="w-full h-auto md:h-48 rounded-lg shadow-md flex flex-col md:flex-row justify-center md:justify-between items-center p-6 md:p-8 mb-8"
                    style={{ backgroundImage: `url(${Banner.src})`, backgroundSize: 'cover', height: '294px' }}
                />

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product.productId} className="bg-white p-4 rounded-lg shadow-md">
                                <h3 className="text-lg font-semibold text-gray-900">{product.selectedVariant?.productName}</h3>

                                {/* Image Updates When Variant is Clicked */}
                                <img 
                                  src={`${imageBaseUrl}/${product.selectedVariant.images[0]}`}
                                    // src={product.selectedVariant?.images[0]} 
                                    alt={product.selectedVariant?.productName} 
                                    className="w-full h-40 object-cover rounded-md"
                                />

                                {/* Variant Selection Buttons */}
                                <div className="flex gap-2 mt-3">
                                    {product.varientList?.$values.map((variant) => (
                                        <button
                                            key={variant.varientName}
                                            className={`px-3 py-1 rounded-md border ${
                                                product.selectedVariant?.varientName === variant.varientName
                                                    ? "bg-green-500 text-white"
                                                    : "bg-gray-200 text-gray-700"
                                            }`}
                                            onClick={() => handleVariantClick(product.productId, variant)}
                                        >
                                            {variant.varientName}
                                        </button>
                                    ))}
                                </div>

                                {/* Price Updates When Variant is Clicked */}
                                <p className="text-gray-900 font-bold mt-2">Price: ₹{product.selectedVariant?.price}</p>

                                {/* Action Buttons */}
                                <div className="flex gap-2 mt-3">
                                    <button 
                                        onClick={() => handleAddToCart(product)} 
                                        className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                    >
                                        Add to Cart
                                    </button>
                                    <button 
                                        onClick={() => handleAddToWishList(product)} 
                                        className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                    >
                                        Add to Wishlist
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center col-span-3 text-gray-500">No products found</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;

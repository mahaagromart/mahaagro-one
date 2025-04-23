// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import Link from "next/link";
// import { makeRequest } from '@/api';
// import Cart from "../components/Cart";

// const CartPage = () => {
//   const user = useSelector((state) => state.auth.isAuthenicated);
//   const [cartData, setCartData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showAddressForm, setShowAddressForm] = useState(false); 
//   useEffect(() => {
//     if (user) {
//       getAllCartData();
//     } else {
//       setLoading(false);
//     }
//   }, [user]);

//   const getAllCartData = async () => {
//     try {
//       setLoading(true);
//       const storedToken = localStorage.getItem("authToken");
//       const response = await makeRequest(
//         "POST",
//         "/Cart/GetCartData",
//         {},
//         { headers: { Authorization: `Bearer ${storedToken}` } }
//       );
//       const data = response[0].dataset?.$values || [];
//       setCartData(data);
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//       setCartData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center">
//         <p className="text-xl font-semibold text-gray-700 animate-pulse">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center py-12 px-4">
//       <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-10 tracking-tight">
//         Your Shopping Cart
//       </h1>

//       {user ? (
//         cartData?.length > 0 ? (
//           <>
//             <Cart data={cartData} />
//             {/* Add Address Button */}
//             <button
//               onClick={() => setShowAddressForm(!showAddressForm)}
//               className="mt-6 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
//             >
//               {showAddressForm ? "Cancel" : "Add New Address"}
//             </button>

//             {/* Address Form (Elegant Design) */}
//             {showAddressForm && (
//            <div className="mt-8 w-full max-w-md bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 ease-in-out animate-fadeIn border border-gray-100 overflow-hidden">
//            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-400 to-green-500"></div>
           
//            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center font-sans tracking-normal">
//              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-600">
//                Delivery Address
//              </span>
//            </h2>
           
//            <form className="space-y-5">
//              <div className="space-y-1">
//                <label className="block text-sm font-medium text-gray-600 mb-1.5 pl-1">Street Address</label>
//                <input
//                  type="text"
//                  className="w-full px-4 py-3 border-0 rounded-xl bg-gray-50 focus:ring-2 focus:ring-green-300 focus:bg-white focus:shadow-md transition-all duration-200 placeholder-gray-400"
//                  placeholder="123 Luxury Avenue"
//                />
//              </div>
             
//              <div>
//                <label className="block text-sm font-medium text-gray-600 mb-1.5 pl-1">Postal Code</label>
//                <input
//                  type="text"
//                  className="w-full px-4 py-3 border-0 rounded-xl bg-gray-50 focus:ring-2 focus:ring-green-300 focus:bg-white focus:shadow-md transition-all duration-200 placeholder-gray-400"
//                  placeholder="10001"
//                />
//              </div>
             
//              <div className="pt-3">
//                <button
//                  type="submit"
//                  className="w-full py-3.5 bg-green-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center space-x-2"
//                >
//                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                  </svg>
//                  <span>Save Address</span>
//                </button>
//              </div>
//            </form>
           
//            <div className="mt-5 text-center">
//              <p className="text-xs text-gray-400 font-light">
//                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
//                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                </svg>
//                Securely encrypted and stored
//              </p>
//            </div>
//          </div>
//             )}
//           </>
//         ) : (
//           <p className="text-gray-600 text-xl font-medium">Your cart is empty.</p>
//         )
//       ) : (
//         <div className="text-center space-y-6 bg-white p-8 rounded-xl shadow-lg max-w-md">
//           <p className="text-xl font-semibold text-gray-700">Please login to view your Cart</p>
//           <p className="text-lg text-gray-600">
//             If you don’t have an account, please{" "}
//             <Link href="/register" className="text-indigo-500 hover:underline font-semibold">
//               register
//             </Link>
//           </p>
//           <div className="mt-6">
//             <Link
//               href="/login"
//               className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
//             >
//               Go to Login Page
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;



// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import Link from "next/link";
// import { makeRequest } from '@/api';
// import Cart from "../components/Cart";
// import { useFormik } from 'formik';
// import * as Yup from 'yup';

// // Validation Schema
// const addressSchema = Yup.object().shape({
//   Address: Yup.string()
//     .min(4, 'Address must be at least 10 characters')
//     .max(100, 'Address too long')
//     .required('Street address is required'),
//     Pincode: Yup.string()
//     .matches(/^[0-9]+$/, 'Postal code must be only digits')
//     .min(6, 'Postal code must be at least 6 digits')
//     .max(6, 'Postal code too long')
//     .required('Postal code is required')
// });

// const CartPage = () => {
//   const user = useSelector((state) => state.auth.isAuthenicated);
//   const [cartData, setCartData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showAddressForm, setShowAddressForm] = useState(false);
  

//   const formik = useFormik({
//     initialValues: {
//       Address: '',
//       Pincode: ''
//     },
//     validationSchema: addressSchema,
//     onSubmit: async (values) => {
//       try {
//         const storedToken = localStorage.getItem("authToken");
//       const response = await makeRequest('post','/Authentication/EditaddressPincode',{ Address: values.Address, Pincode: values.Pincode},{ headers: { Authorization: `Bearer ${storedToken}` } });
//         console.log(response)

//         setShowAddressForm(false);
//         formik.resetForm();
//       } catch (error) {
//         console.error('Error saving address:', error);
//         swal("ERROR", "Failed to save address", "error");
//       }
//     }
//   });

//   useEffect(() => {
//     if (user) {
//       getAllCartData();
//     } else {
//       setLoading(false);
//     }
//   }, [user]);

//   const getAllCartData = async () => {
//     try {
//       setLoading(true);
//       const storedToken = localStorage.getItem("authToken");streetAddress
//       const response = await makeRequest(
//         "POST",
//         "/Cart/GetCartData",
//         {},
//         { headers: { Authorization: `Bearer ${storedToken}` } }
//       );
//       const data = response[0].dataset?.$values || [];
//       setCartData(data);
//     } catch (error) {
//       console.error("Error fetching cart data:", error);
//       setCartData([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center">
//         <p className="text-xl font-semibold text-gray-700 animate-pulse">Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center py-12 px-4">
//       <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-10 tracking-tight">
//         Your Shopping Cart
//       </h1>

//       {user ? (
//         cartData?.length > 0 ? (
//           <>
//             <Cart data={cartData} />
//             {/* Add Address Button */}
//             <button
//               onClick={() => setShowAddressForm(!showAddressForm)}
//               className="mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
//             >
//               {showAddressForm ? "Cancel" : "Add New Address"}
//             </button>

//             {/* Address Form with Formik */}
//             {showAddressForm && (
//               <div className="mt-8 w-full max-w-md bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 ease-in-out animate-fadeIn border border-gray-100 overflow-hidden">
//                 <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-green-400 to-green-500"></div>
                
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center font-sans tracking-normal">
//                   <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-green-600">
//                     Delivery Address
//                   </span>
//                 </h2>
                
//                 <form onSubmit={formik.handleSubmit} className="space-y-5">
//                   <div className="space-y-1">
//                     <label htmlFor="Address" className="block text-sm font-medium text-gray-600 mb-1.5 pl-1">
//                       Street Address
//                     </label>
//                     <input
//                       id="Address"
//                       name="Address"
//                       type="text"
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       value={formik.values.Address}
//                       className={`w-full px-4 py-3 rounded-xl bg-gray-50 focus:ring-2 focus:bg-white focus:shadow-md transition-all duration-200 placeholder-gray-400 ${
//                         formik.touched.Address && formik.errors.Address 
//                           ? 'border-red-300 focus:ring-red-300' 
//                           : 'border-0 focus:ring-green-300'
//                       }`}
//                       placeholder="123 Luxury Avenue"
//                     />
//                     {formik.touched.Address && formik.errors.Address ? (
//                       <div className="text-red-500 text-xs mt-1 pl-1">{formik.errors.Address}</div>
//                     ) : null}
//                   </div>
                  
//                   <div>
//                     <label htmlFor="Pincode" className="block text-sm font-medium text-gray-600 mb-1.5 pl-1">
//                       Postal Code
//                     </label>
//                     <input
//                       id="Pincode"
//                       name="Pincode"
//                       type="text"
//                       onChange={formik.handleChange}
//                       onBlur={formik.handleBlur}
//                       value={formik.values.Pincode}
//                       className={`w-full px-4 py-3 rounded-xl bg-gray-50 focus:ring-2 focus:bg-white focus:shadow-md transition-all duration-200 placeholder-gray-400 ${
//                         formik.touched.Pincode && formik.errors.Pincode 
//                           ? 'border-red-300 focus:ring-red-300' 
//                           : 'border-0 focus:ring-green-300'
//                       }`}
//                       placeholder="10001"
//                     />
//                     {formik.touched.Pincode && formik.errors.Pincode ? (
//                       <div className="text-red-500 text-xs mt-1 pl-1">{formik.errors.Pincode}</div>
//                     ) : null}
//                   </div>
                  
//                   <div className="pt-3">
//                     <button
//                       type="submit"
//                       disabled={formik.isSubmitting}
//                       className="w-full py-3.5 bg-green-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:bg-green-700 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
//                     >
//                       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                       </svg>
//                       <span>{formik.isSubmitting ? 'Saving...' : 'Save Address'}</span>
//                     </button>
//                   </div>
//                 </form>
                
//                 <div className="mt-5 text-center">
//                   <p className="text-xs text-gray-400 font-light">
//                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                     </svg>
//                     Securely encrypted and stored
//                   </p>
//                 </div>
//               </div>
//             )}
//           </>
//         ) : (
//           <p className="text-gray-600 text-xl font-medium">Your cart is empty.</p>
//         )
//       ) : (
//         <div className="text-center space-y-6 bg-white p-8 rounded-xl shadow-lg max-w-md">
//           <p className="text-xl font-semibold text-gray-700">Please login to view your Cart</p>
//           <p className="text-lg text-gray-600">
//             If you don't have an account, please{" "}
//             <Link href="/register" className="text-green-500 hover:underline font-semibold">
//               register
//             </Link>
//           </p>
//           <div className="mt-6">
//             <Link
//               href="/login"
//               className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full shadow-md hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
//             >
//               Go to Login Page
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { makeRequest } from '@/api';
import Cart from "../components/Cart";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert';

// Validation Schema
const addressSchema = Yup.object().shape({
  SelectedIndex: Yup.number()
    .required('Address number is required')
    .min(1, 'Must be between 1-5')
    .max(5, 'Maximum 5 addresses allowed')
    .integer('Must be a whole number'),
  Address: Yup.string()
    .min(2, 'Address must be at least 10 characters') 
    .max(100, 'Address too long')
    .required('Street address is required'),
  Pincode: Yup.string()
    .matches(/^[0-9]{6}$/, 'Postal code must be exactly 6 digits')
    .required('Postal code is required')
});

const CartPage = () => {
  const user = useSelector((state) => state.auth.isAuthenicated);
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(false);
  
  const formik = useFormik({
    initialValues: {
      SelectedIndex: '',
      Address: '',
      Pincode: ''
    },
    validationSchema: addressSchema,
    onSubmit: async (values) => {
      try {
        const storedToken = localStorage.getItem("authToken");
        const response = await makeRequest('post','/Authentication/EditaddressPincode',  
          { Address: values.Address, Pincode: values.Pincode, SelectedIndex: values.SelectedIndex },
          { headers: { Authorization: `Bearer ${storedToken}` } }
        );
        
        console.log(response);
        swal("Success", "Address saved successfully!", "success");
        setShowAddressForm(false);
        formik.resetForm();
        window.location.reload();
      } catch (error) {
        console.error('Error saving address:', error);
        swal("ERROR", "Failed to save address", "error");
      }
    }
  });

  useEffect(() => {
    if (user) {
      getAllCartData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const getAllCartData = async () => {
    try {
      setLoading(true);
      const storedToken = localStorage.getItem("authToken");
      const response = await makeRequest(
        "POST",
        "/Cart/GetCartData",
        {},
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      const data = response[0].dataset?.$values || [];
      setCartData(data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setCartData([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center">
        <p className="text-xl font-semibold text-gray-700 animate-pulse">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center py-12 px-4">
      <h1 className="text-center text-4xl font-extrabold text-gray-800 mb-10 tracking-tight">
        Your Shopping Cart
      </h1>

      {user ? (
        cartData?.length > 0 ? (
          <>
            <Cart data={cartData} />
            <button
              onClick={() => setShowAddressForm(!showAddressForm)}
              className="mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105"
            >
              {showAddressForm ? "Cancel" : "Add New Address"}
            </button>

            {showAddressForm && (
              <div className="mt-8 w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  {formik.values.SelectedIndex ? `Address #${formik.values.SelectedIndex}` : 'Delivery Address'}
                </h2>
                
                <form onSubmit={formik.handleSubmit} className="space-y-5">

                  {/* Address Number */}
                  <div>
                    <label htmlFor="SelectedIndex" className="block text-sm font-medium text-gray-700">Address Number (1–5)</label>
                    <select
                      id="SelectedIndex"
                      name="SelectedIndex"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.SelectedIndex}
                      className={`mt-1 block w-full px-3 py-2 border ${formik.touched.SelectedIndex && formik.errors.SelectedIndex ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`}
                    >
                      <option value="">Select address number</option>
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>Address {num}</option>
                      ))}

                    </select>
                    {formik.touched.SelectedIndex && formik.errors.SelectedIndex && (
                      <p className="mt-1 text-sm text-red-500">{formik.errors.SelectedIndex}</p>
                    )}
                  </div>

                  {/* Address Field */}
                  <div>
                    <label htmlFor="Address" className="block text-sm font-medium text-gray-700">Street Address</label>
                    <input
                      id="Address"
                      name="Address"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Address}
                      className={`mt-1 block w-full px-3 py-2 border ${formik.touched.Address && formik.errors.Address ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`}
                    />
                    {formik.touched.Address && formik.errors.Address && (
                      <p className="mt-1 text-sm text-red-500">{formik.errors.Address}</p>
                    )}
                  </div>

                  {/* Pincode Field */}
                  <div>
                    <label htmlFor="Pincode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                    <input
                      id="Pincode"
                      name="Pincode"
                      type="text"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.Pincode}
                      className={`mt-1 block w-full px-3 py-2 border ${formik.touched.Pincode && formik.errors.Pincode ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`}
                    />
                    {formik.touched.Pincode && formik.errors.Pincode && (
                      <p className="mt-1 text-sm text-red-500">{formik.errors.Pincode}</p>
                    )}
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                    >
                      Save Address
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        ) : (
          <p className="text-lg text-gray-600 mt-8">Your cart is empty.</p>
        )
      ) : (
        <div className="text-center">
          <p className="text-lg text-gray-700">Please <Link href="/login" className="text-green-600 underline">login</Link> to view your cart.</p>
        </div>
      )}
    </div>
  );
};

export default CartPage;

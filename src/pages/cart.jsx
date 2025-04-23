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
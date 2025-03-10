// 
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';  // Import useRouter hook
import { makeRequest } from '@/api';
import swal from 'sweetalert';
import { useDispatch } from "react-redux";
import { login } from '../store/authSlice.js';

export default function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
   
  const router = useRouter();
  const { totalPrice, totalQuantity } = router.query;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    let formErrors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!formData.email) {
      formErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      formErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      formErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters long';
    }

    return formErrors;
  };

  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    console.log('Signin Data:', formData);
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);
    if (Object.keys(formErrors).length === 0) {
      try {
        var data = makeRequest('POST', '/Authentication/Login', {
          EmailId: formData.email,
          Password: formData.password
        })
      }catch (error) {
        swal('Error', 'Network Error', 'error');
      } 

      data.then((response) => {
        if(response.code === 200) {
          swal('Success', 'Logged In Successfully', 'success').then(() => {
            const userData = {
              userId: response.authenticationsList.$values[0].userId,
              firstName: response.authenticationsList.$values[0].firstName,
              lastName: response.authenticationsList.$values[0].lastName,
              designationId: response.authenticationsList.$values[0].designationId,
              designationName: response.authenticationsList.$values[0].designationName,
              accessToken: response.token,
          };

            dispatch(login(userData));
            router.push('/');
          })
        }else if(response.code === 401){
          swal('Error', 'Mail address is not verified', 'error');
        }else{
          swal('Error', 'Invalid Credentials', 'error');
        }
      })
      .catch((error) => {
        swal('Error', 'Invalid Credentials', 'error');
      });
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Log In</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 mb-6"
            >
              Log In
            </button>
            <div className="text-center mb-6">
              <Link href="/register">
                <span className="text-lg text-green-500 hover:underline">
                  Don&apos;t have an account? Register
                </span>
              </Link>
            </div>
            <div className="text-center">
              <Link href="/forgot-password">
                <span className="text-lg text-green-500 hover:underline">
                  Forgot Password?
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
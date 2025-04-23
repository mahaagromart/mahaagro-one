import { useState } from 'react';
import { useRouter } from 'next/router';
import { makeRequest } from '@/api'; // Replace with your API utility
import swal from 'sweetalert';

export default function ForgetPasswordOtpValidate() {
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    otp: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

    if (!formData.otp) {
      formErrors.otp = 'OTP is required';
    } else if (formData.otp.length !== 4) {
      formErrors.otp = 'OTP must be 4 digits';
    }

    if (!formData.password) {
      formErrors.password = 'Password is required';
    } else if (formData.password.length < 4) {
      formErrors.password = 'Password must be at least 4 characters long';
    }

    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      setIsLoading(true);

      try {
        // Call your API to validate OTP and reset password
        const response = await makeRequest('POST', '/Authentication/ForgetPasswordOtpValidate', {
          email: formData.email,
          otp: formData.otp,
          password: formData.password,
        });

        if (response.code === 200) {
          swal('Success', 'Password reset successfully!', 'success').then(() => {
            router.push('/login'); // Redirect to the sign-in page
          });
        } else {
          swal('Error', response.message || 'Failed to reset password', 'error');
        }
      } catch (error) {
        swal('Error', 'An error occurred. Please try again later.', 'error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Reset Password</h2>
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
            <label htmlFor="otp" className="block text-lg font-medium text-gray-700 mb-2">
              OTP
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter OTP"
              value={formData.otp}
              onChange={handleChange}
              required
            />
            {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 mb-6"
            disabled={isLoading}
          >
            {isLoading ? 'Resetting Password...' : 'Reset Password'}
          </button>
          <div className="text-center">
            <button
              type="button"
              className="text-lg text-green-500 hover:underline"
              onClick={() => router.push('/login')}
            >
              Back to log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
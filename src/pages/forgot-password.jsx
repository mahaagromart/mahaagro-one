import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { makeRequest } from '@/api'; // Replace with your API utility
import swal from 'sweetalert';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Call your API to send a password reset email
      const response = await makeRequest('POST', '/Authentication/ForgetPasswordOtpTrigger', {
        email: email,
      });

      if (response.code === 200) {
        swal('Success', 'Password reset email sent successfully!', 'success').then(() => {
          router.push('/ForgetPasswordOtpValidate'); // Redirect to the sign-in page
        });
      } else {
        swal('Error', response.message || 'Failed to send password reset email', 'error');
      }
    } catch (error) {
      swal('Error', 'An error occurred. Please try again later.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Forgot Password</h2>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 mb-6"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
          <div className="text-center">
            <Link href="/login">
              <span className="text-lg text-green-500 hover:underline">
                Back to Login
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
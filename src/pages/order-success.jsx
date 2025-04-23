// pages/order/success.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function OrderSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page after 5 seconds
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Head>
        <title>Order Confirmed | Your Store</title>
        <meta name="description" content="Your order has been successfully placed" />
      </Head>

      <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          {/* Animated checkmark */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <svg
              className="h-10 w-10 text-green-600 animate-check"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Order Confirmed!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>

          <div className="mt-10">
            <div className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              Order # {router.query.orderId || '12345'}
            </div>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-500">
              You'll receive a confirmation email shortly.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Redirecting to home page in <span className="font-medium">5</span> seconds...
            </p>
          </div>

          <div className="mt-10">
            <a
              href="/"
              className="text-base font-medium text-green-600 hover:text-green-500"
            >
              Go back home<span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
      </div>

      {/* Add some animation styles */}
      <style jsx global>{`
        @keyframes check {
          0% {
            stroke-dashoffset: 50;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .animate-check {
          animation: check 0.5s ease-in-out forwards;
          stroke-dasharray: 50;
          stroke-dashoffset: 50;
        }
      `}</style>
    </div>
  );
}
import Head from 'next/head';

export default function MaintenancePage() {
  return (
    <div className="min-h-[50vh] w-full flex items-center justify-center bg-gradient-to-br from-green-600 via-amber-600 to-brown-600 p-2 sm:p-4 rounded-3xl">
      <Head>
        <title>Maintenance Mode - AgriFuture</title>
        <meta name="description" content="Our site is under maintenance. We’ll be back soon!" />
      </Head>

      <div className="w-full max-w-xs sm:max-w-md md:max-w-lg bg-white/95 backdrop-blur-lg p-4 sm:p-6 md:p-8 rounded-xl shadow-2xl text-center transform transition-all hover:scale-[1.02]">
        {/* Title Section */}
        <div className="relative mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-900 mb-2 relative z-10">
            🌾 This page is Under Maintainence
          </h1>
          <div className="absolute inset-0 h-1 sm:h-2 bg-gradient-to-r from-green-300 to-amber-300 rounded-full blur-md -top-1 sm:-top-2 opacity-60" />
        </div>

        {/* Message */}
        <p className="text-gray-800 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 font-medium leading-relaxed">
               We're crafting something amazing! Our site is undergoing scheduled maintenance. Please return shortly for an enhanced experience.
        </p>

        {/* Loading Dots */}
        <div className="flex justify-center gap-1 sm:gap-2 mb-4 sm:mb-6">
          <div
            className="h-2 w-2 sm:h-3 sm:w-3 bg-green-500 rounded-full animate-subtle-bounce"
            style={{ animationDelay: '0s' }}
          />
          <div
            className="h-2 w-2 sm:h-3 sm:w-3 bg-amber-500 rounded-full animate-subtle-bounce"
            style={{ animationDelay: '0.2s' }}
          />
          <div
            className="h-2 w-2 sm:h-3 sm:w-3 bg-gray-900 rounded-full animate-subtle-bounce"
            style={{ animationDelay: '0.4s' }}
          />
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="h-1 bg-gradient-to-r from-green-400 to-amber-400 rounded-full w-24 sm:w-32 mx-auto animate-pulse" />
          <div className="absolute inset-0 h-1 bg-white rounded-full w-24 sm:w-32 mx-auto blur-sm opacity-40" />
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx global>{`
        @keyframes subtleBounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .animate-subtle-bounce {
          animation: subtleBounce 1.2s infinite ease-in-out;
        }
        @media (min-width: 640px) {
          @keyframes subtleBounce {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-8px);
            }
          }
        }
      `}</style>
    </div>
  );
}
import Image from "next/image";
import Img from "../../../../public/assets/images/img/banners.png"; // Desktop Image
import Apple from "../../../../public/assets/images/img/icontwo.png";
import Playstore from "../../../../public/assets/images/img/playstore.png";

export default function Bannereleven() {
  return (
    <main className="container mx-auto px-6 py-8">
      {/* Desktop Banner */}
      <section className="relative text-white py-8 w-full mx-auto hidden lg:block">
        <div className="absolute inset-0 z-0 opacity-80">
          <Image
            src={Img} // Desktop Image
            alt="Background banner"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="relative z-10 max-w-2xl text-center mx-auto px-6 py-8 bg-opacity-50 rounded-xl">
          <h2 className="text-2xl font-bold text-green-800 leading-tight tracking-wide">
            Download Mahaagromart App Now!
          </h2>
          <p className="text-sm py-4 text-gray-700">
            Shop smarter with Mahaagromart. Get it now on your phone!
          </p>
          <div className="flex justify-center space-x-8">
            <a href="" target="_blank">
              <Image
                src={Apple}
                alt="App Store"
                width={64}
                height={64}
                className="rounded-full border-2 border-green-600 shadow-lg transition-transform duration-300 hover:scale-110"
              />
            </a>
            <a href="" target="_blank">
              <Image
                src={Playstore}
                alt="Play Store"
                width={64}
                height={64}
                className="rounded-full border-2 border-green-600 shadow-lg transition-transform duration-300 hover:scale-110"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Mobile Banner */}
      <section className="relative text-white w-full lg:hidden">
        <div className="relative w-full bg-green-50 rounded-lg p-8">
          <div className="relative z-10 text-center mx-auto px-6 py-8 bg-white bg-opacity-80 rounded-xl max-w-sm">
            <h2 className="text-2xl font-semibold mb-4 text-green-700">
              Download Mahaagromart App Now!
            </h2>
            <p className="text-base mb-6 text-gray-600">
              Shop smarter with Mahaagromart. Get it now on your phone!
            </p>
            <div className="flex justify-center space-x-6">
              <a href="" target="_blank">
                <Image
                  src={Apple}
                  alt="App Store"
                  width={56}
                  height={56}
                  className="rounded-full border-2 border-green-500 shadow-lg transition-transform duration-300 hover:scale-110"
                />
              </a>
              <a href="" target="_blank">
                <Image
                  src={Playstore}
                  alt="Play Store"
                  width={56}
                  height={56}
                  className="rounded-full border-2 border-green-500 shadow-lg transition-transform duration-300 hover:scale-110"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
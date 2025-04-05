import Image from 'next/image';
import Img from '../../../../public/assets/images/homebanner/bannerthree.jpg';

const Bannertwo = () => {
  return (
    <div className="flex justify-center">
      <div className="container max-w-screen-2xl px-4 py-8">
        {/* This is the container wrapping the image */}
        <div className="e-flex e-con-boxed e-con e-parent e-lazyloaded">
          <div className="e-con-inner">
            <div className="elementor-widget-container">
              <div className="rt-image hidden md:block"> {/* Hide on mobile, show on medium screens and up */}
                {/* Image with lazy load */}
                <Image
                  loading="lazy"
                  decoding="async"
                  src={Img}
                  alt="banner"
                  width={1530}
                  height={183}
                  className="w-full h-auto" // Makes the image responsive
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bannertwo;
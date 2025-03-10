import React from 'react';


const MarqueeSlider = () => {
  return (
    <div className="container mx-auto  h-[2cm] overflow-hidden">
      <div className="e-con-full e-flex e-con e-parent">
        <div className="elementor-widget-container">
          <div className="rt-marquee-slider">
            <div className="rt-marquee marquee_left flex animate-marquee">
              {/* Single Item (Paragraph styled one by one) */}
              <div className="rt-marquee-item p-4 bg-green-800 ">
                <p className="text-xl font-semibold text-white">
                  <span className="mr-2 text-white opacity-75">
                    <i aria-hidden="true" className="fas fa-asterisk" />
                  </span>
                  First, your free trial and enjoy 1 month of Mahaagromart  for{' '}
                  <strong className="text-green-400">$2/month</strong> on select plans.
                </p>
              </div>


              <div className="rt-marquee-item p-4 bg-green-800 ">
                <p className="text-xl font-semibold text-white">
                  <span className="mr-2 text-white opacity-75">
                    <i aria-hidden="true" className="fas fa-asterisk" />
                  </span>
                  Next, your pro enjoy 5 months of Mahaagromart  for{' '}
                  <strong className="text-green-400">$10/month</strong> on select plans.
                </p>
              </div>

              <div className="rt-marquee-item p-4 bg-green-800 ">
                <p className="text-xl font-semibold text-white">
                  <span className="mr-2 text-white opacity-75">
                    <i aria-hidden="true" className="fas fa-asterisk" />
                  </span>
                  Previous, your pro enjoy 10 months of Mahaagromart  for{' '}
                  <em className="text-red-500">$20/month</em> on select plans.
                </p>
              </div>

              <div className="rt-marquee-item p-4 bg-green-800 ">
                <p className="text-xl font-semibold text-white">
                  <span className="mr-2 text-white opacity-75">
                    <i aria-hidden="true" className="fas fa-asterisk" />
                  </span>
                  Next, your pro enjoy 12 months of Mahaagromart  for{' '}
                  <em className="text-red-500">$50/month</em> on select plans.
                </p>
              </div>

              <div className="rt-marquee-item p-4 bg-green-800 ">
                <p className="text-xl font-semibold text-white">
                  <span className="mr-2 text-white opacity-75">
                    <i aria-hidden="true" className="fas fa-asterisk" />
                  </span>
                  Next, your pro enjoy 12 months of Mahaagromart  for{' '}
                  <em className="text-red-500">$50/month</em> on select plans.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarqueeSlider;

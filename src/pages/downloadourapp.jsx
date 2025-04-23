const DownloadAppsSection = () => {
    const apps = [
      {
        title: 'Mahaagro Apk',
        imgSrc: 'https://mahaagromart.com/public/assets/front-end/qr/appstore_user.png',
        altText: 'Mahaagro User Apk QR',
      },
      {
        title: 'Delivery Apk',
        imgSrc: 'https://mahaagromart.com/public/assets/front-end/qr/playstore_delivery.png',
        altText: 'Mahaagro Delivery QR',
      },
      {
        title: 'Seller Apk',
        imgSrc: 'https://mahaagromart.com/public/assets/front-end/qr/appstore_seller.png',
        altText: 'Mahaagro Seller QR',
      },
    ];
  
    return (
      <section className="container mx-auto p-4">
        <h1 className="text-center text-2xl font-bold mt-5">Download Our Apps</h1>
  
        {/* Appstore Section */}
        <div className="mt-10">
          <h3 className="text-center text-xl font-semibold mt-5">Appstore Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
            {apps.map((app, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                <h3 className="text-center font-medium text-lg">{app.title}</h3>
                <div className="flex justify-center mt-3">
                  <img src={app.imgSrc} alt={app.altText} className="w-40 h-40 object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* Playstore Section */}
        <div className="mt-10">
          <h3 className="text-center text-xl font-semibold mt-5">Playstore Links</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
            {apps.map((app, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
                <h3 className="text-center font-medium text-lg">{app.title}</h3>
                <div className="flex justify-center mt-3">
                  <img src={app.imgSrc} alt={app.altText} className="w-40 h-40 object-contain" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default DownloadAppsSection;
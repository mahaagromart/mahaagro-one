import { useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '50vh',
};

const StoreLocator = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [nearbyStores, setNearbyStores] = useState([]);

  // Load Google Maps API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your actual API key
  });

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          fetchNearbyStores(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }, []);

  const fetchNearbyStores = (lat, lng) => {
    setNearbyStores([
      { id: 1, name: 'Store 1', lat: lat + 0.01, lng: lng + 0.01 },
      { id: 2, name: 'Store 2', lat: lat - 0.01, lng: lng - 0.01 },
    ]);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    fetchNearbyStores(location.lat, location.lng);
  };

  return (
    <div className="bg-gray-100 container mx-auto p-4 flex">
      <div className="w-1/3 pr-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Find your nearest Store</h1>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter postcode, town or city"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            onClick={handleSearchClick}
            className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Search
          </button>
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mb-4"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {showFilters && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Filters</h2>
            <div className="flex flex-col">
              {[2, 5, 7, 8].map((km) => (
                <label key={km} className="mt-2">
                  <input type="checkbox" className="mr-2" />
                  {km} km
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="w-2/3">
        {isLoaded ? (
          <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={12}>
            {nearbyStores.map((store) => (
              <Marker
                key={store.id}
                position={{ lat: store.lat, lng: store.lng }}
                label={store.name}
                icon={{
                  url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                  scaledSize: new window.google.maps.Size(32, 32),
                }}
              />
            ))}
          </GoogleMap>
        ) : (
          <p>Loading map...</p>
        )}
      </div>
    </div>
  );
};

export default StoreLocator;

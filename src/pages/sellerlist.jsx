import React from 'react';

const Sellerlist = () => {
  const sellers = [
    { id: 33, name: 'Dhage Foods Pr...' },
    { id: 34, name: 'VT enterprises' },
    { id: 35, name: 'Green Fields A...' },
    { id: 36, name: 'Frmedo Seads i...' },
    { id: 44, name: 'TSK AGRI BIOTE...' },
    { id: 45, name: 'RANWARA AGRO P...' },
    { id: 46, name: 'Hifield AG Che...' },
    { id: 47, name: 'farmer' },
    { id: 48, name: 'SHRIKRISHNA BA...' },
    { id: 49, name: 'Vasundhara Far...' },
    { id: 50, name: 'SHWETA AGRO SY...' },
    { id: 51, name: 'ANASUIA TRADER...' },
  ];

//   const currentPage = 1;
//   const totalPages = 38;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-6 space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center border-b pb-4">
        <h4 className="text-2xl font-bold text-center md:text-left">All Sellers</h4>
        <form action="/search-shop" className="w-full md:w-1/2">
          <div className="flex">
            <input 
              type="text" 
              name="shop_name" 
              placeholder="Shop name" 
              required 
              className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* Grid layout for sellers, responsive with gap */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sellers.map(seller => (
          <div key={seller.id} className="shadow-lg rounded-lg overflow-hidden">
            <a href={`/shopView/${seller.id}`} className="block p-3 text-center text-gray-800 hover:bg-gray-100">
              <span className="font-semibold text-sm">{seller.name}</span>
            </a>
          </div>
        ))}
      </div>

      {/* Pagination
      <nav className="mt-6">
        <ul className="flex flex-wrap justify-center items-center -space-x-px">
          <li>
            <a href="#" className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700">
              <span className="sr-only">Previous</span>‹
            </a>
          </li>
          {[...Array(10).keys()].map(i => (
            <li key={i}>
              <a href={`/sellers?page=${i + 1}`} className={`px-3 py-2 leading-tight ${i === 0 ? 'text-blue-600 bg-blue-50' : 'text-gray-500 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}>
                {i + 1}
              </a>
            </li>
          ))}
          <li>
            <a href="#" className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700">
              <span className="sr-only">Next</span>›
            </a>
          </li>
        </ul>
      </nav> */}
    </div>
  );
};

export default Sellerlist;
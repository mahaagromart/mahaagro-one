// pages/search.js
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/search?query=${query}`);
    const data = await response.json();
    setResults(data);
  };

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-8">Search Page</h1>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="flex-grow p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-5 py-3 flex items-center gap-2 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <Search size={20} />
            </button>
          </div>
        </form>
        <div>
          {results.length > 0 ? (
            results.map((result, index) => (
              <div key={index} className="bg-black p-5 mb-4 rounded-xl shadow text-white">
                <h2 className="text-2xl font-semibold text-green-400">{result.title}</h2>
                <p className="text-gray-300">{result.description}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

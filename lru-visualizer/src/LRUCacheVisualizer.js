import React, { useState } from "react";

const LRUCacheVisualizer = () => {
  const [cache, setCache] = useState([]);
  const [capacity, setCapacity] = useState(3);
  const [map, setMap] = useState({});
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const put = (key, value) => {
    let newCache = [...cache];
    let newMap = { ...map };

    if (newMap[key]) {
      newCache = newCache.filter((item) => item.key !== key);
    } else if (newCache.length >= capacity) {
      const removed = newCache.pop();
      delete newMap[removed.key];
    }

    newCache.unshift({ key, value });
    newMap[key] = value;
    setCache(newCache);
    setMap(newMap);
  };

  const get = (key) => {
    if (map[key]) {
      put(key, map[key]);
      setSearchResult(map[key]);
    } else {
      setSearchResult("Not Found");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center text-blue-600">LRU Cache Visualizer</h2>

        {/* Capacity Input */}
        <div className="mt-4">
          <label className="block text-gray-700 font-medium">Cache Capacity</label>
          <input
            type="number"
            className="p-2 border rounded w-full"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
          />
        </div>

        {/* Key-Value Input */}
        <div className="mt-4 flex space-x-2">
          <input
            type="text"
            className="p-2 border rounded w-1/2"
            placeholder="Key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <input
            type="text"
            className="p-2 border rounded w-1/2"
            placeholder="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
            onClick={() => put(key, value)}
          >
            Put
          </button>
        </div>

        {/* Search Key */}
        <div className="mt-4 flex space-x-2">
          <input
            type="text"
            className="p-2 border rounded w-full"
            placeholder="Search Key"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700 transition"
            onClick={() => get(searchKey)}
          >
            Get
          </button>
        </div>

        {/* Search Result */}
        {searchResult !== null && (
          <div className="mt-4 p-3 bg-yellow-200 text-center text-lg font-medium rounded">
            Search Result: {searchResult}
          </div>
        )}

        {/* Cache Display */}
        <div className="mt-6 border p-4 rounded-lg bg-gray-50 shadow">
          <h3 className="text-xl font-semibold text-center mb-3">LRU Cache</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {cache.map((item, index) => (
              <div
                key={item.key}
                className={`px-4 py-2 rounded-lg text-white ${
                  index === 0 ? "bg-green-500" : "bg-blue-400"
                }`}
              >
                {item.key}: {item.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LRUCacheVisualizer;

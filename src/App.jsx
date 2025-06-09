import { useEffect, useState } from "react";

function App() {
  const [skips, setSkips] = useState([]);
  const [selectedSkipIds, setSelectedSkipIds] = useState([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetch("https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft")
      .then((res) => res.json())
      .then((data) => setSkips(data));
  }, []);

  const handleSelect = (id) => {
    const alreadySelected = selectedSkipIds.includes(id);
    if (alreadySelected) {
      setSelectedSkipIds(selectedSkipIds.filter((skipId) => skipId !== id));
    } else {
      setSelectedSkipIds([...selectedSkipIds, id]);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const getImage = (size) => `/skips/${size}-yard.jpg`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-zinc-900 text-white p-6">
      {/* Header Steps */}
      <div className="flex flex-wrap gap-2 justify-center mb-8 text-sm text-gray-400 font-medium">
        <span className="text-blue-400">📍 Postcode</span>
        <span>➝</span>
        <span className="text-blue-400">🧱 Waste Type</span>
        <span>➝</span>
        <span className="text-blue-400">🚛 Select Skip</span>
        <span>➝</span>
        <span className="text-gray-500">📄 Permit</span>
        <span>➝</span>
        <span className="text-gray-500">📅 Date</span>
        <span>➝</span>
        <span className="text-gray-500">💳 Payment</span>
      </div>

      <h1 className="text-3xl font-bold text-center mb-2">
        Choose Your Skip Size
      </h1>
      <p className="text-center text-gray-400 mb-8">
        Select one or more skips that fit your project
      </p>

      {/* Skip Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {skips.map((skip) => {
          const isSelected = selectedSkipIds.includes(skip.id);
          return (
            <div
              key={skip.id}
              className={`rounded-2xl overflow-hidden shadow-lg transition duration-300 ${
                isSelected
                  ? "ring-2 ring-blue-500 bg-gradient-to-br from-[#1e1e28] to-[#101018]"
                  : "bg-gradient-to-br from-[#16161f] to-[#0f0f17] hover:ring-2 hover:ring-blue-500"
              } border border-[#2e2e3e]`}
            >
              {/* Image Container */}
              <div className="relative w-full h-56 bg-gradient-to-t from-[#0e0e14] to-[#181821] flex items-center justify-center p-4">
                <div className="absolute inset-0 rounded-t-2xl bg-gradient-to-t from-[#0e0e14] to-transparent opacity-80" />
                <img
                  src={getImage(skip.size)}
                  alt={`${skip.size} Yard Skip`}
                  className="relative z-10 object-contain max-h-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)]"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 text-white space-y-3">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    {skip.size} Yard Skip
                  </h2>
                  <span className="text-xs bg-blue-700 px-3 py-1 rounded-full font-medium">
                    {skip.size} Yards
                  </span>
                </div>

                <p className="text-sm text-gray-400">
                  {skip.hire_period_days} day hire
                </p>

                <p className="text-blue-400 text-lg font-bold">
                  £{skip.price || Math.floor(200 + skip.size * 10)}
                </p>

                <button
                  onClick={() => handleSelect(skip.id)}
                  className={`w-full py-2.5 mt-3 rounded-lg font-semibold text-sm tracking-wide transition ${
                    isSelected
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-[#2c2c3c] text-white hover:bg-[#353545]"
                  }`}
                >
                  {isSelected ? "Selected ✓" : "Select This Skip"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 left-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce z-50">
          ✅ Skip added to your selection!
        </div>
      )}

      {/* Continue Button */}
      {selectedSkipIds.length > 0 && (
        <div className="fixed bottom-4 right-4 z-40">
          <button
            onClick={() => alert("Continue to next step")}
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow hover:bg-blue-700 transition"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

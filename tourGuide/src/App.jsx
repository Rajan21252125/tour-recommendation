import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "./component/Button";
import Navbar from "./component/Navbar";
import Cards from "./component/Cards";
import BottomNavbar from "./component/BottomNavbar";
import Loader from "./component/Loader";  // Import Loader Component

const API_BASE_URL = "https://tour-recommendation-117t.onrender.com/api";

const App = () => {
  const [states, setStates] = useState([]); 
  const [selectedState, setSelectedState] = useState("");
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stateLoading, setStateLoading] = useState(false);
  const [typeLoading, setTypeLoading] = useState(false);

  // Fetch all states on component mount
  useEffect(() => {
    setStateLoading(true);
    fetch(`${API_BASE_URL}/places`)
      .then((res) => res.json())
      .then((data) => setStates(data.states || []))
      .catch((err) => console.error("Error fetching states:", err))
      .finally(() => setStateLoading(false));
  }, []);

  // Fetch types when state changes
  useEffect(() => {
    if (selectedState) {
      setTypeLoading(true);
      fetch(`${API_BASE_URL}/state-types?state=${selectedState}`)
        .then((res) => res.json())
        .then((data) => {
          setTypes(data.types || []);
          setSelectedTypes("");
        })
        .catch((err) => console.error("Error fetching types:", err))
        .finally(() => setTypeLoading(false)); 
    }
  }, [selectedState]);

  const handleFetchRecommendations = () => {
    if (!selectedState || selectedTypes.length === 0) {
      alert("Please select a state and at least one type");
      return;
    }

    setLoading(true);
    fetch(`${API_BASE_URL}/recommend-by-state?state=${selectedState}&types=${selectedTypes}`)
      .then((res) => res.json())
      .then((data) => setPlaces(data || []))
      .catch((err) => console.error("Error fetching recommendations:", err))
      .finally(() => setLoading(false)); 
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="w-full flex justify-center items-center">
        <BottomNavbar />
      </div>

      <motion.div 
        className="p-6 max-w-2xl mx-auto w-full md:w-3/4 lg:w-1/2 bg-white shadow-lg rounded-lg mt-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-xl md:text-2xl font-bold mb-4 text-center text-green-600">
          Find Places to Visit As per Your Interest
        </h1>

        {/* State Selection */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Select State</label>
          <select
            className="w-full p-3 border rounded focus:ring-2 focus:ring-green-500"
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedTypes("");
              setTypes([]);
            }}
            disabled={stateLoading}
          >
            {stateLoading ? (
              <option>Loading states...</option>
            ) : (
              <>
                <option value="">Select a state</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </>
            )}
          </select>
        </div>
        
        {/* Type Selection */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700">Select Types</label>
          <select
            className="w-full p-3 border rounded focus:ring-2 focus:ring-green-500"
            onChange={(e) => setSelectedTypes(e.target.value)}
            disabled={typeLoading || types.length === 0}
          >
            {typeLoading ? (
              <option>Loading types...</option>
            ) : (
              <>
                <option value="">Select types</option>
                {types.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </>
            )}
          </select>
        </div>

        {/* Find Places Button */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Button 
            className={`w-full p-3 rounded shadow-md ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 text-white hover:bg-green-700"}`}
            onClick={handleFetchRecommendations}
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Recommendations"}
          </Button>
        </motion.div>

        {/* Display Places */}
        <div className="mt-6">
          {loading ? (
            <Loader />
          ) : places.length > 0 ? (
            <motion.ul className="grid gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              {places.map((place) => (
                <Cards key={place.id} place={place} />
              ))}
            </motion.ul>
          ) : (
            <p className="text-center text-gray-500">No places found. Try selecting other options.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default App;

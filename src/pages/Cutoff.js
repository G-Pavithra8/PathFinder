import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Added this line

const CutoffCalculator = () => {
  const [physics, setPhysics] = useState("");
  const [chemistry, setChemistry] = useState("");
  const [maths, setMaths] = useState("");
  const [csOrBio, setCsOrBio] = useState("");
  const [cutoff, setCutoff] = useState(null);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate(); // ✅ Added this line

  const calculateCutoff = () => {
    const p = parseFloat(physics);
    const c = parseFloat(chemistry);
    const m = parseFloat(maths);
    const b = parseFloat(csOrBio);

    if (isNaN(p) || isNaN(c) || isNaN(m) || isNaN(b)) {
      setCutoff(null);
      setError("Please enter valid marks.");
      return;
    }

    if (p > 100 || c > 100 || m > 100 || b > 100 || p < 0 || c < 0 || m < 0 || b < 0) {
      setCutoff(null);
      setError("Marks should be between 0 and 100.");
      return;
    }

    const result = (p / 2) + (c / 2) + (m / 2) + (b / 2);
    setCutoff(result.toFixed(2));
    setError("");
    setShowPopup(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#D8BFD8] px-4 relative">
      <div className="absolute inset-0 bg-[#D8BFD8] opacity-100 neon-box"></div>
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border border-[#8A2BE2] relative z-10 transform transition duration-300 hover:scale-105 neon-box">
        <h1 className="text-3xl font-bold text-center text-[#4B0082] mb-6">
          🎓 Calculate Your Engineering Cutoff
        </h1>

        <div className="space-y-4">
          {[{ label: "Physics", state: physics, setState: setPhysics },
            { label: "Chemistry", state: chemistry, setState: setChemistry },
            { label: "Mathematics", state: maths, setState: setMaths },
            { label: "Computer Science / Biology", state: csOrBio, setState: setCsOrBio }].map((subject, index) => (
            <div key={index} className="neon-input">
              <label className="block text-md font-semibold text-[#4B0082]">
                {subject.label} Marks
              </label>
              <input
                type="number"
                value={subject.state}
                onChange={(e) => subject.setState(e.target.value)}
                className="mt-1 w-full p-3 border border-gray-400 rounded-lg focus:ring-4 focus:ring-purple-500 focus:outline-none transition-all shadow-md hover:shadow-lg neon-input"
                placeholder={`Enter ${subject.label} Marks`}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={() => {
              setPhysics("");
              setChemistry("");
              setMaths("");
              setCsOrBio("");
              setCutoff(null);
              setError("");
            }}
            className="w-1/2 bg-gradient-to-r from-[#6A5ACD] to-[#8A2BE2] text-white text-md font-semibold py-3 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-110 transform ring-4 ring-[#6A5ACD] hover:ring-6 border border-[#483D8B] neon-effect"
          >
            Back
          </button>
          <button
            onClick={calculateCutoff}
            className="w-1/2 bg-gradient-to-r from-[#6A5ACD] to-[#8A2BE2] text-white text-md font-semibold py-3 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-110 transform ring-4 ring-[#6A5ACD] hover:ring-6 border border-[#483D8B] neon-effect"
          >
            Submit
          </button>
        </div>

        {error && (
          <div className="mt-4 text-center">
            <p className="text-md font-bold text-red-600 animate-pulse">{error}</p>
          </div>
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#D8BFD8] bg-opacity-90 backdrop-blur-lg z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg border border-[#8A2BE2] transform transition-all scale-105 z-10">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-700 hover:text-red-600 text-2xl font-bold transition transform hover:scale-110"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-[#4B0082] text-center">
              🎉 Cutoff Score Analysis
            </h2>
            <p className="text-center text-3xl font-bold text-[#6A5ACD] mt-4">
              {cutoff}
            </p>
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => navigate("/search")} // ✅ Navigate to Search
                className="explore-button px-6 py-3 text-white rounded-full font-bold text-lg transition-all transform relative overflow-hidden"
              >
                Explore
                <span className="shimmer"></span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          .neon-effect {
            box-shadow: 0 0 10px #8A2BE2, 0 0 20px #8A2BE2;
            transition: all 0.3s ease-in-out;
          }
          .neon-effect:hover {
            box-shadow: 0 0 20px #8A2BE2, 0 0 40px #8A2BE2;
          }
          .explore-button {
            background: linear-gradient(90deg, #6A5ACD, #8A2BE2);
            box-shadow: 0 0 10px #8A2BE2;
            transition: all 0.3s ease-in-out;
            position: relative;
            overflow: hidden;
          }
          .shimmer {
            position: absolute;
            top: 0;
            left: -100%;
            width: 200%;
            height: 100%;
            background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: 0.75s;
          }
          .explore-button:hover .shimmer {
            left: 100%;
          }
        `}
      </style>
    </div>
  );
};

export default CutoffCalculator;

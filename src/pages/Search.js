import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [colleges, setColleges] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);
  
  const [filters, setFilters] = useState({
    name: '',
    fee_range: '',
    course: '',
    max_cutoff: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch courses first
        const coursesRes = await axios.get('http://pathfinder-backend-qnv1.onrender.com/api/courses');
        setCourses(coursesRes.data);
        
        // Then fetch all colleges
        const collegesRes = await axios.get('http://pathfinder-backend-qnv1.onrender.com/api/colleges');
        setColleges(collegesRes.data);
        setFilteredColleges(collegesRes.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await axios.get(`http://pathfinder-backend-qnv1.onrender.com/api/colleges?${params.toString()}`);
      setFilteredColleges(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      name: '',
      fee_range: '',
      course: '',
      max_cutoff: ''
    });
    setFilteredColleges(colleges);
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-xl font-semibold">Loading college data...</div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-xl font-semibold text-red-500">Error: {error}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-800 mb-8 text-center">College Finder</h1>
        
        {/* Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* College Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">College Name</label>
              <input
                type="text"
                name="name"
                value={filters.name}
                onChange={handleFilterChange}
                placeholder="Search by name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Fee Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fee Range</label>
              <select
                name="fee_range"
                value={filters.fee_range}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Fee Ranges</option>
                <option value="below_50k">Below ₹50,000</option>
                <option value="50k_to_80k">₹50,000 - ₹80,000</option>
                <option value="above_80k">Above ₹80,000</option>
              </select>
            </div>

            {/* Course */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <select
                name="course"
                value={filters.course}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">All Courses</option>
                {courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>

            {/* Max Cutoff */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Cutoff</label>
              <input
                type="number"
                name="max_cutoff"
                value={filters.max_cutoff}
                onChange={handleFilterChange}
                placeholder="Enter cutoff"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Apply Filters
            </button>
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-white text-purple-600 border border-purple-600 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {filteredColleges.length > 0 ? (
            <div className="space-y-4">
              {filteredColleges.map((college, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-purple-800">{college.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                    <div>
                      <p className="text-sm text-gray-600">Rank: <span className="font-medium">{college.rank}</span></p>
                      <p className="text-sm text-gray-600">Fee: <span className="font-medium">{college.fee}</span></p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Cutoff: <span className="font-medium">{college.cutoff}</span></p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Courses: <span className="font-medium">{college.courses.join(', ')}</span></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600">No colleges match your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
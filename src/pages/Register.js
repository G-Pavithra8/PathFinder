import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    city: "",
    schoolId: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Student Data:", formData);
    alert("🎉 Registration Successful!");
    navigate("/cutoff");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#D8BFD8] px-4 relative">
      <div className="absolute inset-0 bg-[#D8BFD8] opacity-100 neon-box"></div>

      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-lg border border-[#8A2BE2] relative z-10 transform transition duration-300 hover:scale-105 neon-box">
        <h2 className="text-3xl font-bold text-center text-[#4B0082] mb-6">
          📝 Student Registration Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { name: "name", type: "text", placeholder: "Full Name" },
            { name: "email", type: "email", placeholder: "Email Address" },
            { name: "phone", type: "tel", placeholder: "Phone Number" },
            { name: "dob", type: "date", placeholder: "Date of Birth" },
            { name: "city", type: "text", placeholder: "City" },
            { name: "schoolId", type: "text", placeholder: "School ID (Optional)" },
          ].map((field, index) => (
            <input
              key={index}
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.name !== "schoolId"}
              className="w-full px-4 py-3 bg-purple-50 text-black border border-gray-300 rounded-lg focus:ring-4 focus:ring-purple-400 focus:outline-none transition shadow-md hover:shadow-lg"
            />
          ))}

          <div className="flex gap-6 items-center font-medium text-purple-800">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                required
                className="mr-2 accent-purple-600"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
                required
                className="mr-2 accent-pink-500"
              />
              Female
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#6A5ACD] to-[#8A2BE2] text-white font-semibold py-3 rounded-full transition-all shadow-lg hover:shadow-xl hover:scale-110 ring-4 ring-[#6A5ACD] border border-[#483D8B] neon-effect"
          >
            Proceed
          </button>
        </form>
      </div>

      <style>
        {`
          .neon-effect {
            box-shadow: 0 0 10px #8A2BE2, 0 0 20px #8A2BE2;
            transition: all 0.3s ease-in-out;
          }
          .neon-effect:hover {
            box-shadow: 0 0 20px #8A2BE2, 0 0 40px #8A2BE2;
          }
        `}
      </style>
    </div>
  );
}

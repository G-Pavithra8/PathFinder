import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gradient-to-b from-purple-300 to-indigo-900 text-white font-bold text-lg px-6 py-3 rounded-full shadow-lg transition-transform transform hover:scale-110 hover:shadow-2xl hover:from-purple-400 hover:to-indigo-800"
    >
      {text}
    </button>
  );
};

export default Button;

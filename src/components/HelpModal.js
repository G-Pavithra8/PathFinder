// src/components/HelpModal.js
import { useState } from "react";
import axios from "axios";

const HelpModal = ({ show, onClose }) => {
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!email.trim()) {
      alert("Please enter your email.");
      return;
    }
    if (!message.trim()) {
      alert("Please enter your query.");
      return;
    }
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/help", {
        message,
        email,
      }, { withCredentials: true });
      alert("Your query has been sent!");
      setMessage("");
      onClose();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to send help request.");
    }
    setLoading(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Describe your issue or question:</h2>
        <input
          type="email"
          className="w-80 border border-gray-300 rounded-md p-2 mb-4"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Your email"
        />
        <textarea
          className="w-80 h-32 border border-gray-300 rounded-md p-2 mb-4"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
            disabled={loading}
          >
            Back
          </button>
          <button
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;

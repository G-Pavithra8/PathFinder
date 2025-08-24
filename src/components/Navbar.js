import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import axios from "axios";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post('https://pathfinder-backend-qnv1.onrender.com/api/logout', {}, { withCredentials: true });
    } catch (err) {
      // Optionally handle error
    }
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    setShowLogoutConfirm(false);
    navigate('/login');
  };

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-purple-500 to-indigo-600 shadow-xl flex justify-between items-center py-4 px-8 z-50">
      {/* Logo */}
      <h1 className="text-4xl font-extrabold text-white tracking-wide drop-shadow-lg">
        Path Finder
      </h1>

      {/* Navigation Buttons */}
      <div className="flex space-x-6">
        <Button text="About" onClick={() => window.location.href = "/about"} />
        {isLoggedIn && (
          <>
            <Link to="/register">
              <Button text="Register" />
            </Link>
            <Button text="Logout" onClick={() => setShowLogoutConfirm(true)} />
          </>
        )}
        {!isLoggedIn && (
          <Link to="/login">
            <Button text="Login" />
          </Link>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Are you sure you want to logout?</h2>
            <div className="flex space-x-4">
              <Button text="Back" onClick={() => setShowLogoutConfirm(false)} />
              <Button text="Logout" onClick={handleLogout} />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

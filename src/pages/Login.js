import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle Sign Up
  const handleSignUp = async () => {
    if (!email || !password || !name) {
      alert('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('http://pathfinder-backend-qnv1.onrender.com/api/signup', {
        email, password, name
      }, { withCredentials: true });
      // Show success if status is 201 or message exists
      if (res.status === 201 || res.data.message) {
        alert('Sign Up Successful! You can now Sign In.');
        setIsSignUp(false);
        setEmail('');
        setPassword('');
        setName('');
      } else {
        alert(res.data?.error || 'Sign Up failed');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Sign Up failed');
    }
    setLoading(false);
  };

  // Handle Sign In
  const handleSignIn = async () => {
    if (!email || !password) {
      alert('Please enter email and password.');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('http://pathfinder-backend-qnv1.onrender.com/api/login', {
        email, password
      }, { withCredentials: true });
      alert('Login Successful!');
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', res.data.name);
      navigate('/register');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className={`relative w-[700px] h-[450px] bg-white rounded-[20px] overflow-hidden
        shadow-[-10px_-10px_15px_rgba(255,255,255,0.3),10px_10px_15px_rgba(70,70,70,0.15)]
        hover:shadow-[0_0_15px_rgba(147,51,234,0.3)]`}>

        {/* Sign In Form */}
        <div className="absolute w-[440px] h-full p-8">
          <h2 className="text-2xl font-semibold text-center mb-8 text-black">Welcome</h2>
          <div className="w-[260px] mx-auto space-y-6">
            <label className="block">
              <span className="block text-sm text-gray-500 mb-1">Email</span>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-purple-300 pb-2 text-center focus:outline-none focus:border-purple-500" 
              />
            </label>
            <label className="block">
              <span className="block text-sm text-gray-500 mb-1">Password</span>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-purple-300 pb-2 text-center focus:outline-none focus:border-purple-500" 
              />
            </label>
            <p className="text-sm text-purple-400 text-center cursor-pointer hover:text-gray-500">
              Forgot password?
            </p>
            <button
              onClick={handleSignIn}
              className="w-full bg-purple-600 text-white rounded-full py-2 hover:bg-purple-700 transition-colors
              shadow-[0_0_10px_rgba(147,51,234,0.3)]"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'SIGN IN'}
            </button>
          </div>
        </div>

        {/* Sliding Container */}
        <div className={`absolute top-0 left-[440px] w-[700px] h-full pl-[260px] bg-white transition-transform duration-1000 
          ${isSignUp ? '-translate-x-[440px]' : ''}`}>

          {/* Purple Side Panel */}
          <div className="absolute left-0 top-0 w-[260px] h-full bg-purple-600 text-white flex flex-col items-center justify-center
            shadow-[0_0_20px_rgba(147,51,234,0.4)]">
            <div className={`transition-all duration-700 ${isSignUp ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
              <h3 className="text-xl mb-4">Don't have an account?</h3>
              <p className="mb-8 text-center">Please Sign up!</p>
            </div>
            <div className={`absolute transition-all duration-700 ${!isSignUp ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
              <h3 className="text-xl mb-4">Already have an account?</h3>
              <p className="mb-8 text-center">Please Sign in.</p>
            </div>
            <button 
              onClick={() => {
                setIsSignUp(!isSignUp);
                setEmail('');
                setPassword('');
                setName('');
              }}
              className="border-2 border-white rounded-full px-8 py-2 uppercase text-sm hover:bg-white hover:text-purple-600 transition-colors"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

          {/* Sign Up Form */}
          <div className="w-[440px] h-full p-8">
            <h2 className="text-2xl font-semibold text-center mb-8 text-black">Create Account</h2>
            <div className="w-[260px] mx-auto space-y-6">
              <label className="block">
                <span className="block text-sm text-gray-500 mb-1">Name</span>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b border-purple-300 pb-2 text-center focus:outline-none focus:border-purple-500" 
                />
              </label>
              <label className="block">
                <span className="block text-sm text-gray-500 mb-1">Email</span>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-purple-300 pb-2 text-center focus:outline-none focus:border-purple-500" 
                />
              </label>
              <label className="block">
                <span className="block text-sm text-gray-500 mb-1">Password</span>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b border-purple-300 pb-2 text-center focus:outline-none focus:border-purple-500" 
                />
              </label>
              <button
                onClick={handleSignUp}
                className="w-full bg-purple-600 text-white rounded-full py-2 hover:bg-purple-700 transition-colors
                shadow-[0_0_10px_rgba(147,51,234,0.3)]"
                disabled={loading}
              >
                {loading ? 'Signing Up...' : 'SIGN UP'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

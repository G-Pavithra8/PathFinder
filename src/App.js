import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react"; // Import useEffect for tracking
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cutoff from "./pages/Cutoff";
import Footer from "./components/Footer";
import Search from "./pages/Search";
import axios from "axios";

const App = () => {
  // Custom hook for tracking page views
  const TrackPageView = () => {
    const location = useLocation();

    useEffect(() => {
      // Replace this console.log with your tracking logic
      console.log("Tracking page view:", location.pathname);

      // Example with Google Analytics:
      // window.gtag('config', 'GA_MEASUREMENT_ID', {
      //   page_path: location.pathname,
      // });
    }, [location]);

    return null; // This component does not render anything
  };

  return (
    <Router>
      <TrackPageView /> {/* Place tracking component here */}
      <Routes>
        {/* Home includes About for vertical scrolling */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <About /> {/* Added here for vertical scrolling */}
              <Footer />
            </>
          }
        />

        {/* About as a separate page */}
        <Route
          path="/about"
          element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          }
        />

        {/* Register and Login pages without Navbar & Footer */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cutoff" element={<Cutoff />} />
        <Route path="/search" element={<Search />} />

      </Routes>
    </Router>
  );
}

export default App;
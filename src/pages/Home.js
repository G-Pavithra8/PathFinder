import { useEffect, useState } from "react";

const Home = () => {
  const [text, setText] = useState("");
  const title = "WELCOME TO THE PATHFINDER";
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < title.length) {
        setText((prev) => prev + title.charAt(index)); // Ensure index is within bounds
        index++;
      } else {
        clearInterval(typingInterval); // Stop when title is fully typed
      }
    }, 100);

    setTimeout(() => {
      setFadeIn(true);
    }, title.length * 100 + 500); // Delay fade-in until typing completes

    return () => clearInterval(typingInterval); // Cleanup interval
  }, []); // No dependencies needed

  return (
    <section
      id="home"
      className="h-screen flex flex-col items-center justify-center text-center p-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/college-bg.jpg')" }}
    >
      <div
        className={`p-10 rounded-2xl shadow-2xl bg-white bg-opacity-80 transition-all duration-1000 ease-in-out ${
          fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h1 className="text-6xl font-extrabold text-purple-600 drop-shadow-lg mb-4">
          {text}
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto mb-6">
          Your one-stop platform to explore career opportunities and find your perfect path.
        </p>
      </div>
    </section>
  );
};

export default Home;

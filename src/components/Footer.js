import React, { useState } from 'react';
import HelpModal from "./HelpModal";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showHelp, setShowHelp] = useState(false);

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  const handleGetHelp = () => {
    if (!isLoggedIn) {
      window.location.href = "/login";
      return;
    }
    setShowHelp(true);
  };

  const faqs = [
    {
      question: "What is PathFinder?",
      answer: "PathFinder is a comprehensive platform for students to explore college options and navigate through their academic journey."
    },
    {
      question: "How do I register?",
      answer: "You can register by clicking on the 'Register' button on our homepage and filling out the form with the required details."
    },
    {
      question: "Is there a fee to use PathFinder?",
      answer: "No, PathFinder is completely free for all users. Our goal is to provide accessible resources for students."
    },
    {
      question: "Can I get help with financial aid?",
      answer: "Yes! We have resources and guides that help you understand and apply for various financial aid options."
    },
    {
      question: "How can I contact support?",
      answer: "You can reach our support team through the 'Contact Us' section on the website or by emailing us at support@pathfinder.com."
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the active index
  };

  return (
    <div className="flex justify-between items-start p-6 space-x-4">
      {/* FAQ Section */}
      <div className="bg-purple-600 p-6 rounded-lg shadow-md w-1/2">
        <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`transition-transform duration-300 ease-in-out transform ${activeIndex === index ? 'rotate-y-180' : ''} cursor-pointer bg-white shadow-lg rounded-lg p-4 hover:bg-purple-500`}
              onClick={() => toggleFAQ(index)}
            >
              <h3 className={`text-lg font-semibold text-purple-600 ${activeIndex === index ? 'hidden' : ''}`}>
                {faq.question}
              </h3>
              <p
                className={`text-gray-700 ${activeIndex === index ? 'block' : 'hidden'}`}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Help and Resources Section */}
      <div className="w-1/2 flex flex-col space-y-4">
        {/* Help Section */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
          <p className="mb-6">If you're facing any issues or have questions, reach out for assistance!</p>
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded-full shadow-md transition-transform duration-300 hover:scale-110"
            onClick={handleGetHelp}
          >
            Get Help
          </button>
          <HelpModal show={showHelp} onClose={() => setShowHelp(false)} />
        </div>

        {/* Resources Section */}
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <h3 className="text-xl font-semibold mb-4">Useful Resources</h3>
          <ul className="text-left space-y-2">
            <li>
              <a href="/https://www.crimsoneducation.org/in/blog/financial-aid-colleges-explained/" className="text-purple-600 hover:underline">
                Financial Aid Guide
              </a>
            </li>
            <li>
              <a href="https://www.wemakescholars.com/other/government-of-india/scholarships" className="text-purple-600 hover:underline">
                Scholarship Opportunities
              </a>
            </li>
            <li>
              <a href="https://www.usnews.com/education/best-colleges/articles/college-application-process" className="text-purple-600 hover:underline">
                College Application Tips
              </a>
            </li>
            <li>
              <a href="https://mycareer.mycareerdreams.com/" className="text-purple-600 hover:underline">
                 Online Career Counseling
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
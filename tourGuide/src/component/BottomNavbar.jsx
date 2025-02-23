import { useState } from "react";
import { Menu, X } from "lucide-react";

const BottomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white w-[90vw] md:w-[80vw] md:px-8 px-4 py-4 flex items-center justify-between mt-8 shadow-lg rounded-md relative">
      {/* Logo */}
      <div className="text-xl md:text-2xl font-bold">
        <span className="text-black">TOUR</span>
        <span className="text-green-500">EASE</span>
      </div>

      {/* Desktop Navbar Links */}
      <div className="hidden lg:flex space-x-6 text-gray-800 font-semibold text-md">
        <a href="https://omgupta115.github.io/tourGuideDemo/index.html" className="hover:text-green-500 transition duration-200">Home</a>
        <a href="https://omgupta115.github.io/tourGuideDemo/about.html" className="hover:text-green-500 transition duration-200">About</a>
        <a href="/" className="text-green-500 font-semibold">AI-Suggestion</a>
        <a href="https://omgupta115.github.io/tourGuideDemo/package.html" className="hover:text-green-500 transition duration-200">Tour Packages</a>
        <a href="https://omgupta115.github.io/tourGuideDemo/contact.html" className="hover:text-green-500 transition duration-200">Contact</a>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden text-gray-800" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Navbar Links */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center py-4 space-y-4 lg:hidden">
          <a href="https://omgupta115.github.io/tourGuideDemo/index.html" className="hover:text-green-500 transition duration-200">Home</a>
          <a href="https://omgupta115.github.io/tourGuideDemo/about.html" className="hover:text-green-500 transition duration-200">About</a>
          <a href="/" className="text-green-500 font-semibold">AI-Suggestion</a>
          <a href="https://omgupta115.github.io/tourGuideDemo/package.html" className="hover:text-green-500 transition duration-200">Tour Packages</a>
          <a href="https://omgupta115.github.io/tourGuideDemo/contact.html" className="hover:text-green-500 transition duration-200">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default BottomNavbar;

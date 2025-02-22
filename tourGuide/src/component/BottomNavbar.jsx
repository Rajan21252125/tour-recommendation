

const BottomNavbar = () => {

  return (
    <nav className="bg-white w-[80vw] px-8 py-4 flex items-center justify-between shadow-lg rounded-md">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <span className="text-black">TOUR</span>
        <span className="text-green-500">EASE</span>
      </div>

      {/* Navbar Links */}
      <div className="hidden md:flex space-x-6 text-gray-800 font-semibold text-md">
        <a href="https://omgupta115.github.io/tourGuideDemo/index.html" className="hover:text-green-500 transition duration-200">Home</a>
        <a href="https://omgupta115.github.io/tourGuideDemo/about.html" className="hover:text-green-500 transition duration-200">About</a>
        <a href="/" className="text-green-500 font-semibold">AI-Suggestion</a>
        <a href="https://omgupta115.github.io/tourGuideDemo/package.html" className="hover:text-green-500 transition duration-200">Tour Packages</a>
        <a href="https://omgupta115.github.io/tourGuideDemo/contact.html" className="hover:text-green-500 transition duration-200">Contact</a>
    </div>
    </nav>
  );
};

export default BottomNavbar;

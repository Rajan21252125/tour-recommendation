import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";

const Navbar = () => {
    return (
      <header className="bg-gray-100 text-gray-700 text-sm py-2 px-6 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <span>📧 info@example.com</span>
          <span>📞 +012 345 6789</span>
        </div>
        <div className="flex gap-3 text-green-600 text-lg">
          <FaFacebookF />
          <FaTwitter />
          <FaLinkedinIn />
          <FaInstagram />
          <FaYoutube />
        </div>
      </header>
    );
  };


export default Navbar;
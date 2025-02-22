/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { MapPin, Camera, Clock, Star, Calendar, Info, IndianRupee } from "lucide-react";

const Cards = ({ place }) => {
  return (
    <a href={place["Image_url"]} target="_blank" rel="noopener noreferrer">
    <motion.div
      className="border p-4 rounded-xl bg-white shadow-xl flex flex-col md:flex-row gap-6 items-center max-w-3xl mx-auto transition-transform h-96"
      whileHover={{ scale: 1.02 }}
    >
      {/* Left: Image */}
      <div className="w-full md:w-1/2 h-52 rounded-lg overflow-hidden">
        <img
          src={place["image place"]}
          alt={place["Name"]}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right: Info */}
      <div className="w-full md:w-1/2 flex flex-col gap-2">
        <h2 className="text-xl font-bold text-gray-800">{place["Name"]}</h2>
        <p className="text-gray-600 flex items-center gap-2">
          <MapPin size={16} className="text-blue-500" />
          {place["City"]}, {place["State"]}
        </p>

        <div className="grid grid-cols-2 gap-2 mt-2 text-gray-700 text-sm">
          <p className="flex items-center gap-2">
            <Info size={16} className="text-purple-500" />
            Type: {place["Type"]}
          </p>
          <p className="flex items-center gap-2">
            <Star size={16} className="text-yellow-500" />
            Rating: {place["Google review rating"]}⭐
          </p>
          <p className="flex items-center gap-2">
            <Clock size={16} className="text-green-500" />
            Visit Time: {place["time needed to visit in hrs"]} hrs
          </p>
          <p className="flex items-center gap-2">
            <Calendar size={16} className="text-red-500" />
            Best Time: {place["Best Time to visit"]} ({place["Best Month to Visit"]})
          </p>
          <p className="flex items-center gap-2">
            <Camera size={16} className="text-pink-500" />
            DSLR Allowed: {place["DSLR Allowed"]}
          </p>
          <p className="flex items-center gap-2">
            <IndianRupee size={16} className="text-indigo-500" />
            Entry Fee: ₹{place["Entrance Fee in INR"]}
          </p>
        </div>
      </div>
    </motion.div>
    </a>
  );
};

export default Cards;

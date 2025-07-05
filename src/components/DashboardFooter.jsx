import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const DashboardFooter = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Holy Lab Hospital. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Powered by <span className="text-blue-400">Soft WebMission</span>
          </p>
        </div>
    </footer>
  );
};

export default DashboardFooter;
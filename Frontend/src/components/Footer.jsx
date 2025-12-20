import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 shadow-inner">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">

        {/* Contact Info */}
        <div className="space-y-2">
          <p className="text-lg font-bold tracking-wide">Contact Us</p>
          
          <p className="text-gray-400 text-sm">
            Email:{" "}
            <a
              href="mailto:info@RegiumInnovations.com"
              className="hover:underline hover:text-sky-500 transition-all duration-300"
            >
              info@RegiumInnovations.com
            </a>
          </p>
          
          <p className="text-gray-400 text-sm">
            Support:{" "}
            <a
              href="mailto:support-mr.kashyap@RegiumInnovations.com"
              className="hover:underline hover:text-sky-500 transition-all duration-300"
            >
              support-mr.kashyap@RegiumInnovations.com
            </a>
          </p>
          
          <p className="text-gray-500 text-sm">
            Phone: Mr. Kashyap (+91-8405897753, +91-8521947060)
          </p>
          
          <p className="text-gray-500 text-sm">Address: Patna, India</p>
        </div>

        {/* Developer / Socials */}
        <div className="flex flex-col md:items-end items-start gap-4">
          <p className="text-lg font-semibold tracking-wide">Developer</p>
          
          <div className="flex gap-6">
            <a
              href="https://github.com/pawan0110"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-sky-500 hover:scale-110 transition-colors duration-300 text-2xl"
            >
              <FaGithub />
            </a>
            
            <a
              href="https://www.linkedin.com/in/pawan-kumar0075"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-sky-500 hover:scale-110  transition-colors duration-300 text-2xl"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-800 pt-4 text-center text-gray-500 text-sm">
        © 2025 Regium Innovations and Research Pvt. Ltd. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

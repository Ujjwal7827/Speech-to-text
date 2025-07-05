import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaMicrophoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10  px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
        
        {/* Logo / Brand */}
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 flex justify-center sm:justify-start items-center gap-2">
            <FaMicrophoneAlt className="text-cyan-400" /> Speech Notes AI
          </h2>
          <p className="mt-2 text-gray-400 text-sm">
            Your voice-powered note assistant.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-cyan-300">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/" className="hover:text-white transition">🏠 Home</Link>
            </li>
            <li>
              <Link to="/live" className="hover:text-white transition">🎙️ Live Notes</Link>
            </li>
            <li>
              <Link to="/saved" className="hover:text-white transition">💾 Saved Notes</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">ℹ️ About</Link>
            </li>
          </ul>
        </div>

        {/* Contact / Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-cyan-300">Connect</h3>
          <p className="text-sm text-gray-400 mb-2">Built with ❤️ using React, Tailwind CSS, and Web APIs.</p>
          <a
            href="https://github.com/Ujjwal7827/Speech-to-text"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm"
          >
            <FaGithub /> GitHub
          </a>
        </div>
      </div>

      <hr className="my-6 border-gray-700" />
      <p className="text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Speech Notes AI. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;

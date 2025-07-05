import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = (
    <>
      <li>
        <Link
          to="/"
          className="relative group hover:text-cyan-400 transition"
          onClick={() => setIsMobileOpen(false)}
        >
          Home
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
        </Link>
      </li>

      <li className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="hover:text-cyan-400 transition relative group"
        >
          Features
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
        </button>

        <AnimatePresence>
          {dropdownOpen && (
            <motion.ul
              key="dropdown"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute mt-2 right-0 w-48 bg-gray-800/70 backdrop-blur-md rounded-lg overflow-hidden shadow-lg z-50"
            >
              {[
                { label: "🎙️ Live Notes", path: "/live" },
                { label: "💾 Saved Notes", path: "/Saved" }
              ].map(({ label, path }) => (
                <li key={label}>
                  <Link
                    to={path}
                    className="block px-4 py-2 hover:bg-white hover:text-black text-sm transition-all"
                    onClick={() => {
                      setDropdownOpen(false);
                      setIsMobileOpen(false);
                    }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </li>

      <li>
        <Link
          to="/about"
          className="relative group hover:text-cyan-400 transition"
          onClick={() => setIsMobileOpen(false)}
        >
          About
          <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
        </Link>
      </li>
    </>
  );

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md z-50 relative">
      <h1 className="text-2xl font-bold text-cyan-400 tracking-wide drop-shadow">
        📝 Speech Notes AI
      </h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-6 text-md font-medium items-center">
        {navLinks}
      </ul>

      {/* Mobile Hamburger Icon */}
      <div className="md:hidden z-50">
        <button
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="text-white focus:outline-none"
        >
          {isMobileOpen ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenuAlt3 className="text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-16 left-0 right-0 bg-gray-800 border-t border-gray-700 text-white flex flex-col gap-4 px-6 py-6 text-center z-40 shadow-lg"
          >
            {navLinks}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

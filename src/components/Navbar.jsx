import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export const Navbar = () => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white text-blue-700 shadow-lg py-2" 
        : "bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-4"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <span className={`text-2xl transform transition-transform duration-300 group-hover:rotate-12 ${
              isScrolled ? "text-blue-600" : "text-yellow-300"
            }`}>
              🌟
            </span>
            <span className="text-xl md:text-2xl font-bold tracking-tight transition-all duration-300">
              Bright Future
              <span className={`block h-0.5 mt-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                isScrolled ? "bg-blue-600" : "bg-yellow-300"
              }`}></span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" isActive={isActive("/")} isScrolled={isScrolled}>Home</NavLink>
            <NavLink to="/signup" isActive={isActive("/signup")} isScrolled={isScrolled}>Volunteer</NavLink>
            <NavLink to="/donate" isActive={isActive("/donate")} isScrolled={isScrolled}>Donate</NavLink>
            <NavLink to="/programs" isActive={isActive("/programs")} isScrolled={isScrolled}>Programs</NavLink>
            <NavLink to="/contact" isActive={isActive("/contact")} isScrolled={isScrolled}>Contact</NavLink>
            {isAdmin ? (
              <>
                <NavLink to="/dashboard" isActive={isActive("/dashboard")} isScrolled={isScrolled}>Dashboard</NavLink>
                <button
                  onClick={handleLogout}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    isScrolled ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-white text-blue-700 hover:bg-blue-50"
                  }`}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                  isScrolled ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-white text-blue-700 hover:bg-blue-50"
                }`}
              >
                Admin Login
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5">
              <span className={`absolute w-6 h-0.5 transition-all duration-300 ${
                isScrolled ? "bg-blue-700" : "bg-white"
              } ${isMenuOpen ? "top-2 rotate-45" : "top-0"}`}></span>
              <span className={`absolute w-6 h-0.5 top-2 transition-opacity duration-300 ${
                isScrolled ? "bg-blue-700" : "bg-white"
              } ${isMenuOpen ? "opacity-0" : "opacity-100"}`}></span>
              <span className={`absolute w-6 h-0.5 transition-all duration-300 ${
                isScrolled ? "bg-blue-700" : "bg-white"
              } ${isMenuOpen ? "top-2 -rotate-45" : "top-4"}`}></span>
            </div>
          </button>
        </div>

        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-64 opacity-100 py-4" : "max-h-0 opacity-0"
        }`}>
          <div className="flex flex-col space-y-4 pt-2">
            <MobileNavLink to="/" isActive={isActive("/")} isScrolled={isScrolled}>Home</MobileNavLink>
            <MobileNavLink to="/signup" isActive={isActive("/signup")} isScrolled={isScrolled}>Volunteer</MobileNavLink>
            <MobileNavLink to="/donate" isActive={isActive("/donate")} isScrolled={isScrolled}>Donate</MobileNavLink>
            <MobileNavLink to="/programs" isActive={isActive("/programs")} isScrolled={isScrolled}>Programs</MobileNavLink>
            <MobileNavLink to="/contact" isActive={isActive("/contact")} isScrolled={isScrolled}>Contact</MobileNavLink>
            {isAdmin ? (
              <>
                <MobileNavLink to="/dashboard" isActive={isActive("/dashboard")} isScrolled={isScrolled}>Dashboard</MobileNavLink>
                <button
                  onClick={handleLogout}
                  className={`py-2 px-3 rounded-lg font-medium text-center ${
                    isScrolled ? "bg-blue-600 text-white" : "bg-white text-blue-700"
                  }`}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className={`py-2 px-3 rounded-lg font-medium text-center ${
                  isScrolled ? "bg-blue-600 text-white" : "bg-white text-blue-700"
                }`}
              >
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ children, to, isActive, isScrolled }) => (
  <Link
    to={to}
    className={`relative font-medium transition-all duration-300 ${
      isActive
        ? isScrolled ? "text-blue-700" : "text-yellow-300"
        : isScrolled ? "text-blue-600 hover:text-blue-800" : "text-white hover:text-blue-100"
    }`}
  >
    {children}
    <span className={`absolute bottom-0 left-0 w-full h-0.5 transform transition-transform duration-300 ${
      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
    } ${
      isScrolled ? "bg-blue-600" : "bg-yellow-300"
    }`}></span>
  </Link>
);

const MobileNavLink = ({ children, to, isActive, isScrolled }) => (
  <Link
    to={to}
    className={`py-2 px-3 font-medium rounded-lg ${
      isActive
        ? isScrolled ? "bg-blue-100 text-blue-700" : "bg-blue-800 text-white"
        : isScrolled ? "text-blue-600 hover:bg-blue-50" : "text-white hover:bg-blue-800/40"
    }`}
  >
    {children}
  </Link>
);

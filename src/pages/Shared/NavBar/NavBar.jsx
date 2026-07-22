import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import useAuth from "../../../hooks/useAuth";
import {
  FaRecycle,
  FaHome,
  FaTachometerAlt,
  FaUser,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaLeaf,
  FaCog,
  FaSignOutAlt,
  FaChartLine,
} from "react-icons/fa";

const NavBar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [location]);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-lg"
            : "bg-white shadow-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo & Brand */}
            <Link
              to="/"
              className="flex items-center gap-2 group transition-all duration-300"
            >
              <div className="relative">
                <FaRecycle className="text-4xl text-green-600 group-hover:rotate-180 transition-transform duration-500" />
                <div className="absolute inset-0 bg-green-400 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
              <div>
                <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  GreenLoop
                </span>
                <div className="text-xs text-gray-500 -mt-1 hidden md:block">
                  Recycle Smarter
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <NavLink to="/" icon={<FaHome />} isActive={isActive("/")}>
                Home
              </NavLink>
              <NavLink
                to="/dashboard"
                icon={<FaTachometerAlt />}
                isActive={isActive("/dashboard")}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/marketplace"
                icon={<FaChartLine />}
                isActive={isActive("/marketplace")}
              >
                Marketplace
              </NavLink>
              <NavLink
                to="/impact"
                icon={<FaLeaf />}
                isActive={isActive("/impact")}
              >
                My Impact
              </NavLink>
            </div>

            {/* Right Section - Auth & Profile */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <div className="relative">
                  {/* Profile Dropdown Trigger */}
                  <button
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
                    className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-lg">
                          {(user.displayName || user.email)
                            .charAt(0)
                            .toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="text-left hidden xl:block">
                      <div className="font-semibold text-gray-800 text-sm">
                        {user.displayName || "User"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {user.email?.length > 20
                          ? user.email.substring(0, 20) + "..."
                          : user.email}
                      </div>
                    </div>
                    <FaChevronDown
                      className={`text-gray-400 transition-transform duration-300 ${
                        isProfileDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isProfileDropdownOpen && (
                    <>
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      ></div>

                      {/* Dropdown Content */}
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-slideDown">
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="font-semibold text-gray-800">
                            {user.displayName || "User"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                          <div className="mt-2 inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                            ASSALAMU WOALIKUM
                          </div>
                        </div>

                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <FaUser className="text-gray-400" />
                          <span className="text-gray-700">My Profile</span>
                        </Link>

                        <Link
                          to="/settings"
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <FaCog className="text-gray-400" />
                          <span className="text-gray-700">Settings</span>
                        </Link>

                        <div className="border-t border-gray-100 my-2"></div>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600"
                        >
                          <FaSignOutAlt />
                          <span className="font-semibold">Logout</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-6 py-2.5 rounded-xl font-semibold text-gray-700 hover:bg-gray-100 transition-all duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-6 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/50 hover:scale-105 transition-all duration-300"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="text-2xl text-gray-700" />
              ) : (
                <FaBars className="text-2xl text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        {/* Menu Content */}
        <div
          className={`absolute top-20 left-0 right-0 bg-white shadow-2xl transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="px-4 py-6 space-y-1">
            <MobileNavLink
              to="/"
              icon={<FaHome />}
              isActive={isActive("/")}
            >
              Home
            </MobileNavLink>
            <MobileNavLink
              to="/dashboard"
              icon={<FaTachometerAlt />}
              isActive={isActive("/dashboard")}
            >
              Dashboard
            </MobileNavLink>
            <MobileNavLink
              to="/marketplace"
              icon={<FaChartLine />}
              isActive={isActive("/marketplace")}
            >
              Marketplace
            </MobileNavLink>
            <MobileNavLink
              to="/impact"
              icon={<FaLeaf />}
              isActive={isActive("/impact")}
            >
              My Impact
            </MobileNavLink>

            {user ? (
              <>
                <div className="border-t border-gray-200 my-4"></div>
                <div className="px-4 py-3 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span>
                          {(user.displayName || user.email)
                            .charAt(0)
                            .toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {user.displayName || "User"}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <div className="mb-3 inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                    🌟 850 EcoPoints
                  </div>
                </div>

                <MobileNavLink to="/profile" icon={<FaUser />}>
                  My Profile
                </MobileNavLink>
                <MobileNavLink to="/settings" icon={<FaCog />}>
                  Settings
                </MobileNavLink>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-semibold"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <div className="border-t border-gray-200 my-4"></div>
                <Link
                  to="/login"
                  className="block w-full px-4 py-3 rounded-xl text-center font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full px-4 py-3 rounded-xl text-center font-semibold bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg transition-all"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-20"></div>
    </>
  );
};

// Desktop Navigation Link Component
const NavLink = ({ to, icon, children, isActive }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg shadow-green-500/30"
        : "text-gray-700 hover:bg-gray-100"
    }`}
  >
    <span className={isActive ? "text-yellow-300" : "text-gray-400"}>
      {icon}
    </span>
    <span>{children}</span>
  </Link>
);

// Mobile Navigation Link Component
const MobileNavLink = ({ to, icon, children, isActive }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
      isActive
        ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
        : "text-gray-700 hover:bg-gray-100"
    }`}
  >
    <span className={`text-xl ${isActive ? "text-yellow-300" : "text-gray-400"}`}>
      {icon}
    </span>
    <span>{children}</span>
  </Link>
);

export default NavBar;
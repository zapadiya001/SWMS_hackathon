// "use client";

// import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { Menu, X } from "lucide-react";
// import { motion } from "framer-motion";
// import { useAuth } from "../context/AuthContext";

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const location = useLocation();
//   const { isAuthenticated, user } = useAuth();

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLinks = [
//     { path: "/features", label: "Features" },
//     { path: "/learn", label: "Learn" },
//     { path: "/shop", label: "Shop" },
//     { path: "/sell-trash", label: "Sell Trash" },
//     { path: "/nearby", label: "Nearby" },
//     // { path: "/about-us", label: "About Us" },
//   ];

//   const dashboardLinks = [
//     { path: "/waste-diary", label: "Waste Diary" },
//     { path: "/waste-classifier", label: "Classify" },
//     { path: "/eco-calendar", label: "Eco Calendar" },
//     { path: "/quiz", label: "Quiz" },
//     { path: "/chatbot", label: "Chatbot" },
//   ];

//   // Determine the image source for the profile button
//   const profileImageSrc =
//     isAuthenticated && user?.profileImage
//       ? user.profileImage
//       : "/images/guest-user.webp";

//   // Log the determined image source for debugging
//   useEffect(() => {
//     console.log("Navbar Profile Image Source:", profileImageSrc);
//     if (!isAuthenticated) {
//       console.log("User is not authenticated, using guest image.");
//     } else if (user && !user.profileImage) {
//       console.log(
//         "User is authenticated but has no profile image, using guest image."
//       );
//     } else if (user && user.profileImage) {
//       console.log(
//         "User is authenticated and has a profile image:",
//         user.profileImage
//       );
//     }
//   }, [isAuthenticated, user, profileImageSrc]);

//   return (
//     <header
//       className={`w-full sticky top-0 z-40 backdrop-blur-lg border-b border-white/5 transition-all duration-300 ${
//         isScrolled ? "bg-neutral-950/90" : "bg-transparent"
//       }`}
//     >
//       <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
//         <Link
//           to="/"
//           className="text-lg tracking-tight font-semibold hover:text-lime-400 transition-colors"
//         >
//           SWMS
//         </Link>

//         <nav className="hidden md:flex gap-8 text-sm font-medium">
//           {navLinks.map((link) => (
//             <Link
//               key={link.path}
//               to={link.path}
//               className={`nav-link transition-colors hover:text-lime-400 ${
//                 location.pathname === link.path ? "text-lime-400" : ""
//               }`}
//             >
//               {link.label}
//             </Link>
//           ))}
//           {isAuthenticated &&
//             dashboardLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`nav-link transition-colors hover:text-lime-400 ${
//                   location.pathname === link.path ? "text-lime-400" : ""
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           {isAuthenticated && user?.role === "admin" && (
//             <Link
//               to="/admin-dashboard"
//               className={`nav-link transition-colors hover:text-lime-400 ${
//                 location.pathname === "/admin-dashboard" ? "text-lime-400" : ""
//               }`}
//             >
//               Dashboard
//             </Link>
//           )}
//         </nav>

//         <div className="hidden md:flex gap-4 text-sm font-medium">
//           {/* Using the determined profileImageSrc */}
//           <Link
//             to="/profile"
//             className="p-2 rounded-full hover:bg-white/10 transition-colors"
//           >
//             <img
//               src={profileImageSrc || "/placeholder.svg"}
//               alt={user?.name || "User Profile"}
//               className="w-6 h-6 rounded-full object-cover"
//             />
//           </Link>
//         </div>

//         <button
//           onClick={() => setIsMenuOpen(true)}
//           className="md:hidden p-2 rounded hover:bg-white/10 transition-colors"
//         >
//           <Menu size={20} />
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-neutral-950/90 backdrop-blur-lg flex flex-col items-center justify-center gap-8 text-lg font-medium z-50"
//         >
//           {navLinks.map((link) => (
//             <Link
//               key={link.path}
//               to={link.path}
//               onClick={() => setIsMenuOpen(false)}
//               className={`nav-link transition-colors hover:text-lime-400 ${
//                 location.pathname === link.path ? "text-lime-400" : ""
//               }`}
//             >
//               {link.label}
//             </Link>
//           ))}
//           {isAuthenticated &&
//             dashboardLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 onClick={() => setIsMenuOpen(false)}
//                 className={`nav-link transition-colors hover:text-lime-400 ${
//                   location.pathname === link.path ? "text-lime-400" : ""
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//           {/* Using the determined profileImageSrc for mobile menu */}
//           <Link
//             to="/profile"
//             onClick={() => setIsMenuOpen(false)}
//             className="p-3 rounded-full hover:bg-white/10 transition-colors"
//           >
//             <img
//               src={profileImageSrc || "/placeholder.svg"}
//               alt={user?.name || "User Profile"}
//               className="w-8 h-8 rounded-full object-cover"
//             />
//           </Link>
//           <button
//             onClick={() => setIsMenuOpen(false)}
//             className="absolute top-6 right-6 p-3 rounded hover:bg-white/10 transition-colors"
//           >
//             <X size={20} />
//           </button>
//         </motion.div>
//       )}
//     </header>
//   );
// };

// export default Navbar;

"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/dashhboard", label: "Dashboard" },
    { path: "/learn", label: "Learn" },
    { path: "/shop", label: "Shop" },
    { path: "/sell-trash", label: "Sell Trash" },
    { path: "/nearby", label: "Nearby" },
  ];

  const dashboardLinks = [
    { path: "/waste-diary", label: "Waste Diary" },
    { path: "/waste-classifier", label: "Classify" },
    { path: "/eco-calendar", label: "Eco Calendar" },
    { path: "/quiz", label: "Quiz" },
    { path: "/chatbot", label: "Chatbot" },
  ];

  const profileImageSrc =
    isAuthenticated && user?.profileImage
      ? user.profileImage
      : "/images/guest-user.webp";

  const toggleMobileSubmenu = (menu) => {
    setMobileSubmenu(mobileSubmenu === menu ? null : menu);
  };

  return (
    <header
      className={`w-full sticky top-0 z-50 backdrop-blur-lg border-b transition-all duration-300 ${
        isScrolled
          ? "bg-neutral-950/90 border-white/10"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent"
        >
          SWMS
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 lg:gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-2 py-1 text-sm font-medium transition-colors hover:text-lime-400 ${
                location.pathname === link.path
                  ? "text-lime-400"
                  : "text-gray-300"
              }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 bottom-0 w-full h-0.5 bg-lime-400"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}

          {isAuthenticated && (
            <div className="relative group h-full">
              <div className="h-full flex items-center">
                <button className="flex items-center px-2 py-1 text-sm font-medium text-gray-300 hover:text-lime-400 transition-colors">
                  Features
                  <ChevronDown className="w-4 h-4 mt-0.5 transition-transform group-hover:rotate-180" />
                </button>
              </div>
              <div className="absolute hidden pt-2 group-hover:block top-full left-0 w-48 bg-neutral-900 border border-white/10 rounded-lg shadow-lg z-10">
                {dashboardLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-2 text-sm hover:bg-neutral-800 ${
                      location.pathname === link.path
                        ? "text-lime-400"
                        : "text-gray-300"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {isAuthenticated && user?.role === "admin" && (
            <Link
              to="/admin-dashboard"
              className={`relative px-2 py-1 text-sm font-medium transition-colors hover:text-lime-400 ${
                location.pathname === "/admin-dashboard"
                  ? "text-lime-400"
                  : "text-gray-300"
              }`}
            >
              Admin
              {location.pathname === "/admin-dashboard" && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 bottom-0 w-full h-0.5 bg-lime-400"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/profile"
            className="relative group p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <img
              src={profileImageSrc}
              alt={user?.name || "User Profile"}
              className="w-8 h-8 rounded-full object-cover border-2 border-transparent group-hover:border-lime-400 transition-all"
            />
            {isAuthenticated && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-lime-400 rounded-full border-2 border-neutral-900"></span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Open Menu"
        >
          <div className="space-y-1.5">
            <span className="block w-6 h-0.5 bg-gray-300"></span>
            <span className="block w-6 h-0.5 bg-gray-300"></span>
            <span className="block w-4 h-0.5 bg-gray-300 ml-auto"></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-opacity-50"
        aria-label="Open Menu"
      >
        <div className="space-y-1.5">
          <span className="block w-6 h-0.5 bg-gray-300 transition-transform duration-300"></span>
          <span className="block w-6 h-0.5 bg-gray-300 transition-transform duration-300"></span>
          <span className="block w-4 h-0.5 bg-gray-300 ml-auto transition-transform duration-300"></span>
        </div>
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/70 z-30"
            />

            {/* Menu Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-neutral-900/95 backdrop-blur-lg z-40 shadow-xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xl font-bold bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent"
                >
                  SWMS
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-opacity-50"
                  aria-label="Close Menu"
                >
                  <X size={24} className="text-gray-300" />
                </button>
              </div>

              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto p-6">
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                        location.pathname === link.path
                          ? "bg-lime-400/10 text-lime-400"
                          : "text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {isAuthenticated && (
                    <>
                      <button
                        onClick={() => toggleMobileSubmenu("dashboard")}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                          mobileSubmenu === "dashboard"
                            ? "bg-white/10 text-lime-400"
                            : "text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        <span>Features</span>
                        {mobileSubmenu === "dashboard" ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>

                      <AnimatePresence>
                        {mobileSubmenu === "dashboard" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-4"
                          >
                            {dashboardLinks.map((link) => (
                              <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                                  location.pathname === link.path
                                    ? "bg-lime-400/10 text-lime-400"
                                    : "text-gray-400 hover:bg-white/10"
                                }`}
                              >
                                {link.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}

                  {isAuthenticated && user?.role === "admin" && (
                    <Link
                      to="/admin-dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className={`px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                        location.pathname === "/admin-dashboard"
                          ? "bg-lime-400/10 text-lime-400"
                          : "text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </nav>
              </div>

              {/* Footer with Profile */}
              <div className="p-6 border-t border-white/10">
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium text-gray-300 hover:bg-white/10 transition-colors"
                >
                  <div className="relative">
                    <img
                      src={profileImageSrc}
                      alt={user?.name || "User Profile"}
                      className="w-10 h-10 rounded-full object-cover border-2 border-lime-400/50"
                    />
                    {isAuthenticated && (
                      <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-lime-400 rounded-full border-2 border-neutral-900"></span>
                    )}
                  </div>
                  <span>
                    {isAuthenticated ? "My Profile" : "Guest Profile"}
                  </span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

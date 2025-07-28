import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef();

  // Simulate user login status (replace with real auth later)
  const isLoggedIn = false; // ← change to false to test logged-out state

  const staticLinks = [
    { label: "Home", to: "/" },
    { label: "Security", to: "/security" },
    { label: "About", to: "/about" },
  ];

  const vaultLink = { label: "Vault", to: "/vault" };

  // Close sidebar if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Header */}
      <header className="w-full fixed top-0 left-0 z-50 bg-[#0f0c29]/80 backdrop-blur-md shadow-md border-b border-gray-700 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-cyan-400 to-fuchsia-500 bg-clip-text text-transparent">
            PasswordSaver 🔐
          </h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 items-center text-sm font-medium text-gray-300">
            {/* Static Links */}
            {staticLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `transition hover:text-white ${
                    isActive ? "text-white underline underline-offset-4" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {/* Vault only if logged in */}
            {isLoggedIn && (
              <NavLink
                to={vaultLink.to}
                className={({ isActive }) =>
                  `transition hover:text-white ${
                    isActive ? "text-white underline underline-offset-4" : ""
                  }`
                }
              >
                {vaultLink.label}
              </NavLink>
            )}

            {/* Auth Buttons */}
            <div className="flex gap-3 ml-6">
              {!isLoggedIn ? (
                <>
                  <NavLink
                    to="/signin"
                    className="px-4 py-1.5 rounded-md text-white border border-cyan-400 hover:bg-cyan-600 transition text-sm"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="px-4 py-1.5 rounded-md text-white bg-fuchsia-500 hover:bg-fuchsia-600 transition text-sm"
                  >
                    Sign Up
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/profile"
                    className="px-4 py-1.5 rounded-md text-white border border-gray-400 hover:bg-gray-700 transition text-sm"
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={() => {
                      alert("You are now logged out!");
                      // clear auth state here
                    }}
                    className="px-4 py-1.5 rounded-md text-white bg-red-500 hover:bg-red-600 transition text-sm"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-200"
            onClick={() => setIsOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden flex justify-end items-start pt-16 px-4">
          <div
            ref={sidebarRef}
            className="bg-[#1e1e2f] rounded-lg shadow-xl w-[90%] max-w-sm p-6 animate-slide-in-right"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Menu</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-4 text-gray-300 text-base">
              {/* Static links */}
              {staticLinks.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `transition hover:text-white ${
                      isActive ? "text-white underline underline-offset-4" : ""
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Vault only if logged in */}
              {isLoggedIn && (
                <NavLink
                  to={vaultLink.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `transition hover:text-white ${
                      isActive ? "text-white underline underline-offset-4" : ""
                    }`
                  }
                >
                  {vaultLink.label}
                </NavLink>
              )}
            </nav>

            {/* Auth Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              {!isLoggedIn ? (
                <>
                  <NavLink
                    to="/signin"
                    onClick={() => setIsOpen(false)}
                    className="w-full px-4 py-2 rounded-md text-white border border-cyan-400 hover:bg-cyan-600 transition text-sm"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="w-full px-4 py-2 rounded-md text-white bg-fuchsia-500 hover:bg-fuchsia-600 transition text-sm"
                  >
                    Sign Up
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="w-full px-4 py-2 rounded-md text-white border border-gray-400 hover:bg-gray-700 transition text-sm"
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      alert("You are now logged out!");
                    }}
                    className="w-full px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600 transition text-sm"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

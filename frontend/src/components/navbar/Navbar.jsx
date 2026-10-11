import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  // const { user, logout } = useContext(AuthContext);
  const { globalData } = useData();
  const navLinks = globalData?.navLinks || [];
  const logo = globalData?.logo || "https://res.cloudinary.com/damlvqiwv/image/upload/v1772118343/test_dl2h0c.png";
  const logo2 = globalData?.logoAlt || "https://res.cloudinary.com/damlvqiwv/image/upload/v1772188218/image_m9k017.png";

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkBaseClasses =
    "relative px-1 py-2 text-[15px] font-medium font-barlow transition-colors duration-300";

  const linkInactiveClasses = [
    theme === "light"
      ? "text-[hsl(var(--subtext0))]"
      : "text-[hsl(var(--subtext1))]",
    "hover:text-[hsl(var(--highlight))]",
  ].join(" ");

  const linkActiveClasses =
    "text-[hsl(var(--highlight))] font-semibold";

  const handleToggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const themeToggleButton = (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[hsl(var(--surface0))] hover:bg-[hsl(var(--surface1))] text-[hsl(var(--text))] transition-all duration-300 border border-[hsl(var(--surface0))] hover:border-[hsl(var(--highlight)/0.5)] overflow-hidden group shadow-sm"
    >
      <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${theme === 'dark' ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <Moon className="w-[18px] h-[18px] group-hover:text-[hsl(var(--highlight))] transition-colors" />
      </div>
      <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${theme === 'light' ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
        <Sun className="w-[18px] h-[18px] group-hover:text-amber-500 transition-colors" />
      </div>
    </button>
  );

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-[hsl(var(--base))/0.85] backdrop-blur-xl border-b border-[hsl(var(--surface0))] transition-colors duration-300">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
              <span className="text-2xl font-barlow font-bold tracking-tight text-[hsl(var(--text))]">
                Zsyio
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  [
                    linkBaseClasses,
                    isActive ? linkActiveClasses : linkInactiveClasses,
                  ].join(" ")
                }
              >
                {link.title}
              </NavLink>
            ))}
            
            {/* Theme Toggle in Desktop Nav */}
            <div className="pl-4 ml-2 border-l border-[hsl(var(--surface0))] h-8 flex items-center">
              {themeToggleButton}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5 md:hidden">
            {/* Mobile Menu Button */}
            <div className="flex">
              <button
                type="button"
                onClick={handleToggleMenu}
                className="inline-flex items-center justify-center p-2 text-[hsl(var(--text))] hover:bg-[hsl(var(--surface0))] transition-colors rounded-lg"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Accordion */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'max-h-96 border-b border-[hsl(var(--surface0))] bg-[hsl(var(--base))/0.95] backdrop-blur-xl' : 'max-h-0'
        }`}
      >
        <div className="space-y-1 px-4 pb-4 pt-2 sm:px-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                [
                  "block px-3 py-3 text-base font-medium font-barlow transition-colors duration-200 rounded-lg",
                  isActive
                    ? "bg-[hsl(var(--highlight))/0.1] text-[hsl(var(--highlight))]"
                    : "text-[hsl(var(--subtext0))] hover:bg-[hsl(var(--surface0))] hover:text-[hsl(var(--text))]",
                ].join(" ")
              }
              onClick={closeMenu}
            >
              {link.title}
            </NavLink>
          ))}
          
          {/* Mobile Theme Toggle */}
          <div className="flex items-center justify-between px-3 py-4 mt-2 border-t border-[hsl(var(--surface0))]">
            <span className="text-base font-medium font-barlow text-[hsl(var(--subtext0))]">Appearance</span>
            {themeToggleButton}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

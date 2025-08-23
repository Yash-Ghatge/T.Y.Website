import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  const closeMenu = () => {
    setOpen(false);
    document.body.classList.remove("menu-open");
  };

  const toggleMenu = () => {
    setOpen((prev) => !prev);
    document.body.classList.toggle("menu-open", !open);
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("menu-open");
    };
  }, []);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src="/j.jpg" alt="Logo" />
      </div>

      {/* Navigation Menu */}
      <div className={`nav-menu ${open ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/" onClick={closeMenu}>Home</Link>
          </li>
          <li>
            <Link to="/jobs" onClick={closeMenu}>Jobs</Link>
          </li>
          {isAuthenticated ? (
            <li>
              <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
            </li>
          ) : (
            <li>
              <Link to="/login" onClick={closeMenu}>Login</Link>
            </li>
          )}
        </ul>
      </div>

      {/* Hamburger Icon */}
      <div className={`hamburger ${open ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;

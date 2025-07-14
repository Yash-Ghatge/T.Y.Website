import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  const closeMenu = () => setShow(false);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/j.jpg" alt="Logo" />
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${show ? "active" : ""}`}>
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

      {/* Hamburger */}
      <div
        className={`hamburger ${show ? "open" : ""}`}
        onClick={() => setShow(!show)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;

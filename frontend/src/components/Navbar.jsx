import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  const closeMenu = () => {
    setOpen(false);
    document.body.classList.remove('menu-open');
  };

  const toggleMenu = () => {
    setOpen(!open);
    if (!open) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  // Clean up body class on component unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/j.jpg" alt="logo" />
      </div>
      
      <div className={`nav-menu ${open ? "open" : ""}`}>
        <ul>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/jobs" onClick={closeMenu}>Jobs</Link></li>
          {isAuthenticated ? (
            <li><Link to="/dashboard" onClick={closeMenu}>Dashboard</Link></li>
          ) : (
            <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
          )}
        </ul>
      </div>
      
      <div className={`hamburger ${open ? "open" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;
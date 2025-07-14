import  { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect } from "react";
const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
   useEffect(() => {
    const hamburger = document.querySelector('.navbar .hamburger');
    const mobileMenu = document.querySelector('.navbar .mobile-menu');
    let mobileMenuOverlay = document.querySelector('.navbar .mobile-menu-overlay');
    const mobileMenuLinks = document.querySelectorAll('.navbar .mobile-menu a');

    // Create overlay if it doesn't exist
    if (!mobileMenuOverlay) {
      mobileMenuOverlay = document.createElement('div');
      mobileMenuOverlay.className = 'mobile-menu-overlay';
      document.querySelector('.navbar')?.appendChild(mobileMenuOverlay);
    }

    const toggleMobileMenu = () => {
      hamburger?.classList.toggle('active');
      mobileMenu?.classList.toggle('active');
      mobileMenuOverlay?.classList.toggle('active');
      document.body.style.overflow = mobileMenu?.classList.contains('active') ? 'hidden' : '';
    };

    const closeMobileMenu = () => {
      hamburger?.classList.remove('active');
      mobileMenu?.classList.remove('active');
      mobileMenuOverlay?.classList.remove('active');
      document.body.style.overflow = '';
    };

    hamburger?.addEventListener('click', toggleMobileMenu);
    mobileMenuOverlay?.addEventListener('click', closeMobileMenu);
    mobileMenuLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    });

    const sidebarIcon = document.querySelector('.sidebar_icon');
    const sidebar = document.querySelector('.account .container .sidebar');

    const handleSidebarClickOutside = (e) => {
      if (!sidebar?.contains(e.target) && !sidebarIcon?.contains(e.target)) {
        sidebar?.classList.remove('active');
      }
    };

    sidebarIcon?.addEventListener('click', () => {
      sidebar?.classList.toggle('active');
    });

    document.addEventListener('click', handleSidebarClickOutside);

    // Cleanup function
    return () => {
      hamburger?.removeEventListener('click', toggleMobileMenu);
      mobileMenuOverlay?.removeEventListener('click', closeMobileMenu);
      mobileMenuLinks.forEach(link => link.removeEventListener('click', closeMobileMenu));
      window.removeEventListener('resize', closeMobileMenu);
      sidebarIcon?.removeEventListener('click', () => sidebar?.classList.toggle('active'));
      document.removeEventListener('click', handleSidebarClickOutside);
    };
  }, []);
  return (
    <>
      <nav className={show ? "navbar show_navbar" : "navbar"}>
        <div className="logo">
          <img src="/j.jpg" alt="logo" />
        </div>
        <div className="links">
          <ul>
            <li>
              <Link to={"/"} onClick={() => setShow(!show)}>
                HOME
              </Link>
            </li>
            <li>
              <Link to={"/jobs"} onClick={() => setShow(!show)}>
                JOBS
              </Link>
            </li>
            {isAuthenticated ? (
              <li>
                <Link to={"/dashboard"} onClick={() => setShow(!show)}>
                  DASHBOARD
                </Link>
              </li>
            ) : (
              <li>
                <Link to={"/login"} onClick={() => setShow(!show)}>
                  LOGIN
                </Link>
              </li>
            )}
          </ul>
        </div>
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </nav>
    </>
  );
};

export default Navbar;

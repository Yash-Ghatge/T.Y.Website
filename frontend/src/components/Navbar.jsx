// import  { useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { GiHamburgerMenu } from "react-icons/gi";
// const Navbar = () => {
//   const [show, setShow] = useState(false);
//   const { isAuthenticated } = useSelector((state) => state.user);
//   return (
//     <>
//       <nav className={show ? "navbar show_navbar" : "navbar"}>
//         <div className="logo">
//           <img src="/j.jpg" alt="logo" />
//         </div>
//         <div className="links">
//           <ul>
//             <li>
//               <Link to={"/"} onClick={() => setShow(!show)}>
//                 HOME
//               </Link>
//             </li>
//             <li>
//               <Link to={"/jobs"} onClick={() => setShow(!show)}>
//                 JOBS
//               </Link>
//             </li>
//             {isAuthenticated ? (
//               <li>
//                 <Link to={"/dashboard"} onClick={() => setShow(!show)}>
//                   DASHBOARD
//                 </Link>
//               </li>
//             ) : (
//               <li>
//                 <Link to={"/login"} onClick={() => setShow(!show)}>
//                   LOGIN
//                 </Link>
//               </li>
//             )}
//           </ul>
//         </div>
//         <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
//       </nav>
//     </>
//   );
// };

// export default Navbar;

import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <nav className={`navbar ${show ? "show_navbar" : ""}`}>
      <div className="logo">
        <img src="/j.jpg" alt="logo" />
      </div>
      <div className="links">
        <ul>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={"/jobs"} onClick={() => setShow(false)}>
              JOBS
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <Link to={"/dashboard"} onClick={() => setShow(false)}>
                DASHBOARD
              </Link>
            </li>
          ) : (
            <li>
              <Link to={"/login"} onClick={() => setShow(false)}>
                LOGIN
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* Hamburger Icon */}
      <div
        className={`hamburger ${show ? "menu-open" : ""}`}
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

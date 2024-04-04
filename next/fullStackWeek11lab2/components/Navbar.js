import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {SidebarData} from "./SideBarData.js";
import "../pages/Navbar.css"
//import "../App.css"
import "../pages/Home.css"
import {
  FaBars,
  FaTimes,
  FaAlignJustify,
  FaAlignLeft,
  FaBeer,
} from "react-icons/fa";
import { GiMirrorMirror } from "react-icons/gi";
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import { IconContext } from "react-icons/lib";

function Navbar() {
  const[sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
    <IconContext.Provider value={{color: "undefined"}}>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <FaAlignJustify onClick={showSidebar} />
          <GiMirrorMirror />
        </Link>
        Smart  mirror
      </div>

      <nav className={sidebar ? "nav-menu active": "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar} >
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <GiMirrorMirror />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return(
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icons}
                  <span>{item.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </IconContext.Provider>
    </>
  );
}

export default Navbar;


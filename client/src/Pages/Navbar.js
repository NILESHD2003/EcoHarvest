import React, { useState } from "react";
import { Nav_link } from "../Utils/Navlinks";
import { NavLink, Outlet } from "react-router-dom";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  return (
    <>
      <nav className="nav">
        <div className="logo">
          <h1 className="logo__name">EcoHarvest</h1>
        </div>
        <div className="nav__links">
          <div className="nav__hamBurger" onClick={toggleMenu}></div>
          {isMenuOpen && (
            <div className="overlay" onClick={toggleMenu}>
              {/* Your full-screen menu content goes here */}
              <ul>
                {Nav_link.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.link}
                      className="nav__no"
                      activeClassName="active"
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <ul className="nav__ul">
            {Nav_link.map((item) => (
              <li key={item.id} className="nav__items">
                <NavLink
                  to={item.link}
                  className="nav__no"
                  activeClassName="active"
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <div className="nav__user">
              {/* <img src="#" alt="" className="nav__user-img" /> */}
            </div>
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;

import React, { useState } from "react";
import { logout } from "../Slice/authSlice";
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
  };

  const Nav_link = [
    { name: "Home", link: "/home" },
    { name: "Features", link: "/features1" },
    { name: "Contact", link: "/contact" },
    { name: "Log-Out", link: "/", onClick: handleLogout }, // Add onClick event handler for logout
  ];

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
                      onClick={item.onClick}
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
                  onClick={item.onClick}
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

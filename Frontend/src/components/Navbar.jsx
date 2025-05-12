import "../styles/Navbar.css";
import logo from "../img/Adventures_logo.png";
import { FaUser, FaSearch } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dropdownRef = useRef(null);
  const navbarRef = useRef(null);

  const toggleNavbar = () => setIsCollapsed(!isCollapsed);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  return (
    <nav
      className="nabarhub navbar custom-navbar navbar-expand-lg"
      ref={navbarRef}
    >
      <div className="container-fluid px-3">
        {/* Logo y búsqueda primero en móvil */}
        <div className="d-flex align-items-center mobile-top-section">
          <a
            className="navbar-brand d-flex align-items-center me-auto"
            href="#"
          >
            <img
              src={logo}
              alt="Adventures logo"
              className="navbar-logo me-2"
            />
            <span className="brand-text d-none d-lg-inline">Adventures</span>
          </a>

          {/* Barra de búsqueda visible en móvil */}
          <form
            className="d-flex search-container mobile-search me-2"
            role="search"
          >
            <input
              className="form-control search-input"
              type="search"
              placeholder="Buscar..."
              aria-label="Buscar"
            />
            <button className="btn search-button" type="submit">
              <FaSearch />
            </button>
          </form>

          {/* Botón hamburguesa */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div
          className={`collapse navbar-collapse ${isCollapsed ? "" : "show"}`}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-links">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Categorías
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Favoritos
              </a>
            </li>
          </ul>

          {/* Barra de búsqueda para desktop */}
          <form
            className="d-flex search-container desktop-search me-3"
            role="search"
          >
            <input
              className="form-control search-input"
              type="search"
              placeholder="Buscar..."
              aria-label="Buscar"
            />
            <button className="btn search-button" type="submit">
              <FaSearch />
            </button>
          </form>

          <div className="profile-dropdown" ref={dropdownRef}>
            <div
              className="profile-icon d-flex align-items-center justify-content-center"
              onClick={toggleDropdown}
              aria-expanded={showDropdown}
            >
              <FaUser />
            </div>
            {showDropdown && (
              <div className="dropdown-menu show" style={{ display: "block" }}>
                {isLoggedIn ? (
                  <>
                    <NavLink
                      className="dropdown-item"
                      to="#"
                      onClick={() => setShowDropdown(false)}
                    >
                      Mi perfil
                    </NavLink>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      className="dropdown-item"
                      to="/login"
                      onClick={() => {
                        setIsLoggedIn(true);
                        setShowDropdown(false);
                      }}
                    >
                      Iniciar sesión
                    </NavLink>
                    <NavLink
                      className="dropdown-item"
                      to="/registerUsuario"
                      onClick={() => setShowDropdown(false)}
                    >
                      Registrarse
                    </NavLink>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

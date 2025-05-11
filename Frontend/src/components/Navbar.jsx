import '../styles/Navbar.css';
import logo from '../img/Adventures_logo.png';
import { FaUser, FaSearch } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dropdownRef = useRef(null);

  const toggleNavbar = () => setIsCollapsed(!isCollapsed);
  const toggleDropdown = () => setShowDropdown(prev => !prev);

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
    <nav className="navbar custom-navbar navbar-expand-lg">
      <div className="container-fluid px-3">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src={logo} alt="Adventures logo" className="navbar-logo me-2" />
          <span className="brand-text">Adventures</span>
        </a>

        {/* Botón hamburguesa solo visible en pantallas pequeñas */}
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          onClick={toggleNavbar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-links">
            <li className="nav-item"><a className="nav-link" href="#">Inicio</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Categorías</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Favoritos</a></li>
          </ul>

          <form className="d-flex search-container me-3" role="search">
            <input
              className="form-control search-input"
              type="search"
              placeholder="Buscar..."
              aria-label="Buscar"
            />
            <button className="btn search-button ms-2" type="submit">
              <FaSearch />
            </button>
          </form>

          <div className="profile-dropdown" ref={dropdownRef}>
            <div className="profile-icon" onClick={toggleDropdown}>
              <FaUser />
            </div>
            {showDropdown && (
              <ul className="dropdown-menu show">
                {isLoggedIn ? (
                  <>
                    <li><a className="dropdown-item" href="#">Mi perfil</a></li>
                    <li><button className="dropdown-item" onClick={handleLogout}>Cerrar sesión</button></li>
                  </>
                ) : (
                  <>
                    <li><a className="dropdown-item" href="#" onClick={() => setIsLoggedIn(true)}>Iniciar sesión</a></li>
                    <li><a className="dropdown-item" href="#">Registrarse</a></li>
                  </>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import "../styles/Navbar.css";
import logo from "../img/Adventures_logo.png";
import { FaSearch, FaUser, FaBriefcase, FaUserTie, FaUserShield } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [rol, setRol] = useState("");

  const dropdownRef = useRef(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    const rolGuardado = localStorage.getItem("rol");
    if (rolGuardado) {
      setRol(rolGuardado);
      setIsLoggedIn(true);
    } else {
      setRol("");
      setIsLoggedIn(false);
    }
  }, []);

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
    localStorage.removeItem("rol");
    localStorage.removeItem("logeado");
    setRol("");
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case "emprendedor":
        return <FaBriefcase size={18} title="Emprendedor" />;
      case "inversionista":
        return <FaUserTie size={18} title="Inversionista" />;
      case "usuarioNormal":
        return <FaUser size={18} title="Usuario" />;
      case "administrador":
        return <FaUserShield size={18} title="Administrador" />;
      default:
        return <FaUser size={18} title="Invitado" />;
    }
  };

  return (
    <nav
      className={`nabarhub navbar custom-navbar navbar-expand-lg ${
        scrolled ? "scrolled" : ""
      }`}
      ref={navbarRef}
    >
      <div className="container-fluid px-3">
        {/* Logo y búsqueda en móvil */}
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
              <NavLink className="nav-link NavLink-Inicio" to="/">
                Inicio
              </NavLink>
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

            {/* Opciones para Inversionista */}
            {rol === "inversionista" && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/invertir">
                    Invertir
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/mis-inversiones">
                    Mis Inversiones
                  </NavLink>
                </li>
              </>
            )}

            {/* Opciones para Emprendedor */}
            {rol === "emprendedor" && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/crearEmprendimiento">
                    Crear Emprendimiento
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/misEmprendimientos">
                    Mis Emprendimientos
                  </NavLink>
                </li>
              </>
            )}

            {/* Opción para Administrador */}
            {rol === "administrador" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/modificar-usuarios">
                  Modificar Usuarios
                </NavLink>
              </li>
            )}
          </ul>

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
              className="profile-icon d-flex align-items-center justify-content-center icon_perfile_1"
              onClick={toggleDropdown}

              title={rol}
            >
              {getRoleIcon(rol)}
            </div>

            {showDropdown && (
              <div className="dropdown-menu show">
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

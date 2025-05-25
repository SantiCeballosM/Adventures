import "../styles/Navbar.css";
import logo from "../img/Adventures_logo.png";
import {
  FaSearch,
  FaUser,
  FaBriefcase,
  FaUserTie,
  FaUserShield,
} from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  // Estados
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [showDropdownProfile, setShowDropdownProfile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [rol, setRol] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Referencias para detectar clicks fuera de dropdowns
  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const navigate = useNavigate();

  // Detectar clicks fuera para cerrar dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchResults([]);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setShowDropdownProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cargar rol y nombre desde localStorage al montar componente
  useEffect(() => {
    const rolGuardado = localStorage.getItem("rol");
    const nombreGuardado = localStorage.getItem("nombreUsuario");

    if (rolGuardado && nombreGuardado) {
      setRol(rolGuardado.toLowerCase());
      setNombreUsuario(nombreGuardado);
      setIsLoggedIn(true);
    } else {
      setRol("");
      setNombreUsuario("");
      setIsLoggedIn(false);
    }
  }, []);

  // Detectar scroll para cambiar estilo del navbar
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

  // Logout: limpiar localStorage y estados, navegar a home
  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdownProfile(false);
    localStorage.removeItem("rol");
    localStorage.removeItem("logeado");
    localStorage.removeItem("nombreUsuario");
    localStorage.removeItem("token");
    setRol("");
    setNombreUsuario("");
    navigate("/");
  };

  // Icono según rol
  const getRoleIcon = (role) => {
    switch (role) {
      case "emprendedor":
        return <FaBriefcase size={18} title="Emprendedor" />;
      case "inversionista":
        return <FaUserTie size={18} title="Inversionista" />;
      case "usuarionormal":
        return <FaUser size={18} title="Usuario" />;
      case "administrador":
        return <FaUserShield size={18} title="Administrador" />;
      default:
        return <FaUser size={18} title="Invitado" />;
    }
  };

  // Buscar emprendimientos desde backend
  const fetchSearchResults = async (query) => {
    try {
      if (query.trim() === "") {
        setSearchResults([]);
        return;
      }
      const response = await axios.get(
        `http://localhost:5000/api/emprendimientos?search=${encodeURIComponent(
          query
        )}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error en búsqueda:", error);
      setSearchResults([]);
    }
  };

  // Manejar input de búsqueda
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchSearchResults(value);
  };

  // Navegar a detalle de emprendimiento seleccionado
  const handleSelectResult = (id) => {
    setSearchTerm("");
    setSearchResults([]);
    navigate(`/emprendimiento/${id}`); // Ajusta según ruta real
  };

  return (
    <nav
      className={`navbar custom-navbar navbar-expand-lg ${
        scrolled ? "scrolled" : ""
      }`}
      ref={dropdownRef}
    >
      <div className="container-fluid px-3">
        {/* Logo y menú móvil */}
        <div className="d-flex align-items-center mobile-top-section">
          <NavLink
            className="navbar-brand d-flex align-items-center me-auto"
            to="/"
          >
            <img
              src={logo}
              alt="Adventures logo"
              className="navbar-logo me-2"
            />
          </NavLink>

          {/* Búsqueda móvil */}
          <div className="search-container mobile-search me-2 position-relative">
            <input
              className="form-control search-input"
              type="search"
              placeholder="Buscar..."
              aria-label="Buscar"
              value={searchTerm}
              onChange={handleSearchChange}
              autoComplete="off"
            />
            <button className="btn search-button" type="submit" disabled>
              <FaSearch />
            </button>
            {searchResults.length > 0 && (
              <ul className="search-dropdown">
                {searchResults.map((item) => (
                  <li
                    key={item.id}
                    className="search-dropdown-item"
                    onClick={() => handleSelectResult(item.id)}
                  >
                    {item.nombre_Emprendimiento}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Botón toggle menú */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        {/* Menú colapsable */}
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

            {/* Opciones según rol */}
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

            {rol === "emprendedor" && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/registerEmprendimiento">
                    Crear Emprendimiento
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/mostrarEmprendimientos">
                    Mis Emprendimientos
                  </NavLink>
                </li>
              </>
            )}

            {rol === "administrador" && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/modificar-usuarios">
                  Modificar Usuarios
                </NavLink>
              </li>
            )}
          </ul>

          {/* Búsqueda desktop */}
          <div
            className="search-container desktop-search position-relative me-3"
            ref={dropdownRef}
          >
            <input
              className="form-control search-input"
              type="search"
              placeholder="Buscar..."
              aria-label="Buscar"
              value={searchTerm}
              onChange={handleSearchChange}
              autoComplete="off"
              onFocus={() => {
                if (searchResults.length > 0) setSearchResults(searchResults);
              }}
            />
            <button className="btn search-button" type="submit" disabled>
              <FaSearch />
            </button>
            {searchTerm.trim() !== "" && (
              <ul className="search-dropdown">
                {searchResults.length > 0 ? (
                  searchResults.slice(0, 5).map((item) => (
                    <li
                      key={item.id}
                      className="search-dropdown-item"
                      onClick={() => handleSelectResult(item.id)}
                    >
                      {item.nombre_Emprendimiento}
                    </li>
                  ))
                ) : (
                  <li className="search-dropdown-item no-results">
                    No se encontraron resultados
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* Dropdown perfil */}
          <div className="profile-dropdown" ref={profileDropdownRef}>
            <div
              className="d-flex align-items-center gap-2 cursor-pointer"
              onClick={() => setShowDropdownProfile(!showDropdownProfile)}
              title={rol}
            >
              {isLoggedIn && (
                <div className="text-end me-1 small user-label">
                  <div className="fw-bold">{nombreUsuario}</div>
                  <div className="text-muted">({rol})</div>
                </div>
              )}
              <div className="profile-icon d-flex align-items-center justify-content-center icon_perfile_1">
                {getRoleIcon(rol)}
              </div>
            </div>

            {showDropdownProfile && (
              <div className="dropdown-menu show">
                {isLoggedIn ? (
                  <>
                    <NavLink
                      className="dropdown-item"
                      to="/perfil"
                      onClick={() => setShowDropdownProfile(false)}
                    >
                      Mi perfil
                    </NavLink>
                    <button
                      className="dropdown-item btn-logout"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      className="dropdown-item"
                      to="/login"
                      onClick={() => setShowDropdownProfile(false)}
                    >
                      Iniciar sesión
                    </NavLink>
                    <NavLink
                      className="dropdown-item"
                      to="/registerUsuario"
                      onClick={() => setShowDropdownProfile(false)}
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

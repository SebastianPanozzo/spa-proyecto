import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const handleLogout = () => {
    localStorage.clear();
    alert("Sesión cerrada");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Logo e identificación */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <span style={{ color: "pink", fontStyle: "italic", fontWeight: "bold" }}>Spa Sentirse Bien</span>
          <img src="/logo192.png" alt="logo" style={{ height: "30px", marginLeft: "8px" }} />
        </Link>

        {/* Botón responsive */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Menú de navegación */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/sobre-nosotros">Sobre nosotros</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contacto">Contactarse</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/anuncios">Anuncios</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/servicios">Servicios</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/comentarios">Comentarios</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/empleo">Empleo</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/otros">Otros</Link></li>
          </ul>

          {/* Login / Logout */}
          <ul className="navbar-nav ms-auto">
            {!usuario ? (
              <>
                <li className="nav-item"><Link className="nav-link" to="/login">Iniciar sesión</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/registro">Registrarse</Link></li>
              </>
            ) : (
              <>
                {usuario.rol === "admin" && (
                  <li className="nav-item"><Link className="nav-link" to="/admin">Panel Admin</Link></li>
                )}
                <li className="nav-item">
                  <button className="btn btn-outline-danger btn-sm ms-2" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

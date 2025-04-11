import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState(""); // Cambiado el nombre de la variable
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(""); // Añadido para manejar errores
  const navigate = useNavigate();

  useEffect(() => {
    // Si ya hay token, redirige automáticamente
    const token = localStorage.getItem("token");
    if (token) {
      const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));
      if (usuarioGuardado?.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpia cualquier error previo

    try {
      console.log("Enviando datos:", { nombreUsuario, contrasena }); // Para debug
      
      const response = await axios.post("http://localhost:3000/api/clientes/login", {
        nombreUsuario, // Ahora usamos directamente nombreUsuario
        contrasena,
      });

      const data = response.data;

      if (data.success) {
        const cliente = data.cliente;

        // Guardar en localStorage
        localStorage.setItem("usuario", JSON.stringify(cliente));
        localStorage.setItem("clienteId", cliente.id);
        if (data.token) {
          localStorage.setItem("token", data.token);
        }

        alert("Inicio de sesión exitoso");

        if (cliente.rol === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } else {
        setError(data.message || "Credenciales incorrectas");
        alert(data.message || "Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      // Mejor manejo de errores
      let mensaje = "Error al iniciar sesión. Intenta más tarde.";
      
      if (error.response) {
        // El servidor respondió con un código de error
        mensaje = error.response.data?.message || `Error ${error.response.status}: ${error.response.statusText}`;
        console.log("Respuesta del servidor:", error.response.data); // Para debug
      } else if (error.request) {
        // No se obtuvo respuesta
        mensaje = "No se pudo conectar con el servidor";
      }
      
      setError(mensaje);
      alert(mensaje);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h4 className="text-center text-success mb-4">Iniciar Sesión</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label text-danger">Nombre de Usuario:</label>
            <input
              type="text"
              className="form-control"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-danger">Contraseña:</label>
            <input
              type="password"
              className="form-control"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Iniciar Sesión
          </button>
        </form>
        <p className="mt-3 text-center">
          ¿No te has registrado?{" "}
          <Link to="/registro" className="text-success">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
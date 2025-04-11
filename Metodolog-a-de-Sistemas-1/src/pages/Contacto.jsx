import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import isLoggedIn from "../utils/isLoggedIn"; // ✅

const Contacto = () => {
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  // ✅ Redirigir si no está logueado
  useEffect(() => {
    if (!isLoggedIn()) {
      alert("Debes iniciar sesión para enviar un mensaje");
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensaje enviado correctamente. Te responderemos a la brevedad.");
    setMensaje("");
  };

  return (
    <div className="container my-5">
      <h2>Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Mensaje</label>
          <textarea
            className="form-control"
            rows="4"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-success">Enviar mensaje</button>
      </form>
    </div>
  );
};

export default Contacto;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: ""
  });

  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    // Podés agregar una lógica aquí si querés redireccionar directamente al cargar el componente
    if (!usuario) {
      setError("Debes iniciar sesión para enviar un mensaje.");
    }
  }, [usuario]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validación: ¿Usuario logueado?
    if (!usuario) {
      alert("Debes iniciar sesión para enviar un mensaje.");
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:3000/api/contacto", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setEnviado(true);
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        mensaje: ""
      });

      setTimeout(() => setEnviado(false), 5000);
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      setError("No se pudo enviar el mensaje. Por favor, intente nuevamente.");
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
          <h2 className="mb-4">¡Hablemos!</h2>
          <div className="mb-4">
            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="bi bi-geo-alt-fill text-success me-2"></i>
                Av. Santa Fe 2271 - 1ºA (CABA)
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone-fill text-success me-2"></i>
                01140461910
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope-fill text-success me-2"></i>
                info@spasentirsebien.com
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h4 className="mb-3">Horarios de atención</h4>
            <p>Lunes a Domingo: 12:00 - 22:00</p>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h4 className="card-title mb-4">Envíanos un mensaje</h4>

              {enviado && (
                <div className="alert alert-success" role="alert">
                  ¡Mensaje enviado correctamente! Te responderemos a la brevedad.
                </div>
              )}

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {!usuario ? (
                <div className="text-center">
                  <p className="text-danger">Debes iniciar sesión para contactar con nosotros.</p>
                  <button className="btn btn-outline-success" onClick={() => navigate("/login")}>
                    Iniciar sesión
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre completo</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="telefono" className="form-label">Número de teléfono</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="mensaje" className="form-label">Mensaje</label>
                    <textarea
                      className="form-control"
                      id="mensaje"
                      name="mensaje"
                      rows="4"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-success w-100">
                    Enviar mensaje
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;

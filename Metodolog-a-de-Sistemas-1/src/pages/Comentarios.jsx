import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Comentarios = () => {
  const [comentarios, setComentarios] = useState([]);
  const [formData, setFormData] = useState({
    titulo: "",
    contenido: "",
    alias: "",
  });

  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const obtenerComentarios = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/comentarios");
      setComentarios(res.data);
    } catch (error) {
      console.error("Error al cargar comentarios:", error);
    }
  };

  useEffect(() => {
    obtenerComentarios();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario) {
      alert("Debes iniciar sesión para comentar.");
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:3000/api/comentarios",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Comentario publicado correctamente.");
      setFormData({ titulo: "", contenido: "", alias: "" });
      obtenerComentarios();
    } catch (error) {
      console.error("Error al publicar comentario:", error);

      let mensaje = "Error al publicar comentario.";
      if (error.response) {
        mensaje = error.response.data?.message || `Error ${error.response.status}`;
      } else if (error.request) {
        mensaje = "No se pudo conectar con el servidor.";
      }
      alert(mensaje);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center text-success">Publicaciones</h2>

      <div className="bg-white shadow rounded p-4 my-4">
        <h5 className="text-danger mb-3">Crear Publicación</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Título:</label>
            <input
              type="text"
              name="titulo"
              className="form-control"
              placeholder="Título del post"
              value={formData.titulo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contenido:</label>
            <textarea
              name="contenido"
              className="form-control"
              placeholder="Contenido del post"
              rows="4"
              value={formData.contenido}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Alias:</label>
            <input
              type="text"
              name="alias"
              className="form-control"
              placeholder="Alias para postear"
              value={formData.alias}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Crear Publicación
          </button>
        </form>
      </div>

      <div className="mt-5">
        <h4>Comentarios publicados:</h4>
        {comentarios.length === 0 ? (
          <p>No hay comentarios aún.</p>
        ) : (
          comentarios.map((comentario) => (
            <div key={comentario._id} className="border rounded p-3 mb-3">
              <h5 className="text-primary">{comentario.titulo}</h5>
              <p>{comentario.contenido}</p>
              <small className="text-muted">— {comentario.alias}</small>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comentarios;

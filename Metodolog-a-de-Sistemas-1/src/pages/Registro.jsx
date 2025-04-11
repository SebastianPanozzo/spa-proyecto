import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Registro = () => {
  const [formData, setFormData] = useState({
    usuario: "",
    nombre: "",
    apellido: "",
    cuil: "",
    telefono: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.contrasena !== formData.confirmarContrasena) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const cliente = {
        nombreUsuario: formData.usuario,
        contrasena: formData.contrasena,
        nombre: `${formData.nombre} ${formData.apellido}`,
        cuil: formData.cuil,
        telefono: formData.telefono,
        email: formData.correo,
      };

      const response = await axios.post("http://localhost:3000/api/clientes", cliente);

      if (response.status === 201) {
        alert("¡Registro exitoso!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error al registrar. Intenta nuevamente.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h4 className="text-center text-success mb-4">Registrarse</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label text-danger">Nombre de Usuario:</label>
            <input
              type="text"
              name="usuario"
              className="form-control"
              value={formData.usuario}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label className="form-label text-danger">Nombre:</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label className="form-label text-danger">Apellido:</label>
            <input
              type="text"
              name="apellido"
              className="form-control"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label className="form-label text-danger">CUIL:</label>
            <input
              type="text"
              name="cuil"
              className="form-control"
              value={formData.cuil}
              onChange={handleChange}
              required
              pattern="\d{11}"
              title="El CUIL debe contener 11 números"
            />
          </div>
          <div className="mb-2">
            <label className="form-label text-danger">Teléfono:</label>
            <input
              type="text"
              name="telefono"
              className="form-control"
              value={formData.telefono}
              onChange={handleChange}
              required
              pattern="\d{10,15}"
              title="Ingrese un teléfono válido"
            />
          </div>
          <div className="mb-2">
            <label className="form-label text-danger">Correo Electrónico:</label>
            <input
              type="email"
              name="correo"
              className="form-control"
              value={formData.correo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label className="form-label text-danger">Contraseña:</label>
            <input
              type="password"
              name="contrasena"
              className="form-control"
              value={formData.contrasena}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label text-danger">Confirmar Contraseña:</label>
            <input
              type="password"
              name="confirmarContrasena"
              className="form-control"
              value={formData.confirmarContrasena}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-success w-100">Registrarse</button>
        </form>
        <p className="mt-3 text-center">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-success">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registro;

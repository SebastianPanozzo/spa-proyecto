import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    // Redirige si no hay usuario o no es admin
    if (!usuario || usuario.rol !== 'admin') {
      alert("Acceso denegado");
      navigate('/');
    }
  }, [navigate, usuario]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Panel de Administración</h2>
      <div className="row justify-content-center">
        <div className="col-md-4 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Reservas</h5>
              <p className="card-text">Ver, administrar y eliminar reservas.</p>
              <Link to="/admin/reservas" className="btn btn-primary">Ir a Reservas</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Clientes</h5>
              <p className="card-text">Gestionar datos de los clientes registrados.</p>
              <Link to="/admin/clientes" className="btn btn-primary">Ir a Clientes</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Comentarios</h5>
              <p className="card-text">Leer y eliminar comentarios de usuarios.</p>
              <Link to="/admin/comentarios" className="btn btn-primary">Ir a Comentarios</Link>
            </div>
          </div>
        </div>
        {/* Nueva tarjeta para Mensajes de Contacto */}
        <div className="col-md-4 mb-3">
          <div className="card text-center shadow">
            <div className="card-body">
              <h5 className="card-title">Mensajes de Contacto</h5>
              <p className="card-text">Ver y gestionar mensajes recibidos de los usuarios.</p>
              <Link to="/admin/contacto" className="btn btn-primary">Ir a Mensajes</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
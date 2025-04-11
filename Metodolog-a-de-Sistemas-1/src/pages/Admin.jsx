import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    // Redirige si no hay usuario o no es admin
    if (!usuario || usuario.rol !== 'admin') {
      alert("Acceso denegado");
      navigate('/');
      return;
    }

    const fetchReservas = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/reservas');
        setReservas(res.data);
      } catch (error) {
        console.error("Error al obtener reservas", error);
      }
    };

    fetchReservas();
  }, [navigate, usuario]);

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar esta reserva?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/reservas/${id}`);
      setReservas(reservas.filter(r => r._id !== id));
    } catch (error) {
      alert("Error al eliminar");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Panel de Administración</h2>
      {reservas.length === 0 ? (
        <p className="text-center">No hay reservas cargadas.</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Cliente</th>
              <th>Servicio</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((r, i) => (
              <tr key={i}>
                <td>{r.cliente?.nombre || r.cliente}</td>
                <td>{r.servicio}</td>
                <td>{new Date(r.fecha).toLocaleDateString()}</td>
                <td>{r.hora}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(r._id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Admin;

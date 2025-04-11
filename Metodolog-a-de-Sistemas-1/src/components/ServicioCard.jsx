import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServicioCard = ({ servicio }) => {
  const navigate = useNavigate();

  if (!servicio || !servicio.nombre || !servicio.descripcion || !servicio.imagen) {
    return null;
  }

  const handleReservar = () => {
    navigate(`/reserva?servicio=${encodeURIComponent(servicio.nombre)}`);
  };

  const handleImagenError = (e) => {
    e.target.onerror = null;
    e.target.src = '/imagenes/default.jpg'; // Asegurate de tener esta imagen en public/imagenes
  };

  return (
    <div className="card shadow-sm m-2" style={{ width: '18rem' }}>
      <img
        src={servicio.imagen}
        className="card-img-top"
        alt={`Imagen del servicio ${servicio.nombre}`}
        onError={handleImagenError}
      />
      <div className="card-body">
        <h5 className="card-title text-danger">{servicio.nombre}</h5>
        <p className="card-text">{servicio.descripcion}</p>
        {servicio.precio && (
          <p className="card-text text-success fw-bold">
            ${Number(servicio.precio).toLocaleString('es-AR')}
          </p>
        )}
        <button className="btn btn-danger w-100" onClick={handleReservar}>
          Reservar ahora
        </button>
      </div>
    </div>
  );
};

export default ServicioCard;

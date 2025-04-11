import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import servicios from '../data/serviciosData';
import axios from 'axios';
import isLoggedIn from '../utils/isLoggedIn';

const Reserva = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const servicioDesdeUrl = params.get('servicio');

  const [servicio, setServicio] = useState(servicioDesdeUrl || '');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [clienteId, setClienteId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn()) {
      alert('Debes iniciar sesión para reservar un servicio');
      navigate('/login');
      return;
    }

    const id = localStorage.getItem('clienteId');
    if (id) setClienteId(id);
  }, [navigate]);

  const validarFechaHora = () => {
    const ahora = new Date();
    const seleccion = new Date(`${fecha}T${hora}`);
    return seleccion > ahora;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!clienteId || !servicio || !fecha || !hora) {
      setMensaje('⚠️ Completa todos los campos');
      return;
    }

    if (!validarFechaHora()) {
      setMensaje('⚠️ La fecha y hora deben ser futuras');
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      setMensaje('❌ Sesión expirada. Por favor, iniciá sesión de nuevo.');
      navigate('/login');
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        'http://localhost:3000/api/reservas',
        {
          cliente: clienteId,
          servicio,
          fecha,
          hora,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Corregido
            'Content-Type': 'application/json',
          },
        }
      );

      setMensaje('✅ Reserva creada con éxito');
      setTimeout(() => {
        navigate('/confirmacion');
      }, 1500);
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        setMensaje('❌ Sesión expirada o inválida. Por favor, iniciá sesión nuevamente.');
        localStorage.removeItem('token');
        localStorage.removeItem('clienteId');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        setMensaje(error.response?.data?.mensaje || '❌ Error al crear la reserva');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Reservar un servicio</h2>

      <form onSubmit={handleSubmit}>
        {!servicioDesdeUrl && (
          <div className="mb-3">
            <label className="form-label">Servicio</label>
            <select
              className="form-select"
              value={servicio}
              onChange={(e) => setServicio(e.target.value)}
              required
            >
              <option value="">Seleccione un servicio</option>
              {servicios.map((s, i) => (
                <option key={i} value={s.nombre}>
                  {s.nombre}
                </option>
              ))}
            </select>
          </div>
        )}

        {servicioDesdeUrl && (
          <div className="mb-3">
            <label className="form-label">Servicio</label>
            <input
              type="text"
              className="form-control"
              value={servicio}
              disabled
              readOnly
            />
          </div>
        )}

        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Hora</label>
          <input
            type="time"
            className="form-control"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-success w-100"
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Confirmar Reserva'}
        </button>
      </form>

      {mensaje && (
        <div
          className={`alert mt-3 ${
            mensaje.startsWith('✅') ? 'alert-success' : 'alert-warning'
          }`}
        >
          {mensaje}
        </div>
      )}
    </div>
  );
};

export default Reserva;

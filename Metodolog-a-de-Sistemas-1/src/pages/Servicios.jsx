import React, { useState } from "react";
import ServicioCard from "../components/ServicioCard";
import servicios from "../data/serviciosData";

const Servicios = () => {
  const [tipo, setTipo] = useState(""); // "Individual" o "Grupal"
  const [subcategoria, setSubcategoria] = useState("");

  const subcategorias = ["Masajes", "Belleza", "Facial", "Corporal"];

  const serviciosFiltrados = servicios.filter((servicio) => {
    if (tipo === "Grupal") return servicio.categoria === "Grupal";
    if (tipo === "Individual" && subcategoria) return servicio.categoria === subcategoria;
    return false;
  });

  return (
    <div className="container my-5 text-center">
      <h2 className="text-danger fw-bold">Nuestros Servicios</h2>
      <p>
        En Sentirse Bien Spa, ofrecemos una variedad de servicios individuales y grupales para tu bienestar.
      </p>

      {/* Botones de selección principal */}
      <div className="d-flex justify-content-center gap-3 my-4">
        <button
          className={`btn ${tipo === "Individual" ? "btn-danger" : "btn-outline-danger"}`}
          onClick={() => {
            setTipo("Individual");
            setSubcategoria("");
          }}
        >
          Servicios Individuales
        </button>
        <button
          className={`btn ${tipo === "Grupal" ? "btn-danger" : "btn-outline-danger"}`}
          onClick={() => {
            setTipo("Grupal");
            setSubcategoria("");
          }}
        >
          Servicios Grupales
        </button>
      </div>

      {/* Botones de subcategoría si es individual */}
      {tipo === "Individual" && (
        <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
          {subcategorias.map((cat) => (
            <button
              key={cat}
              className={`btn ${subcategoria === cat ? "btn-success" : "btn-outline-success"}`}
              onClick={() => setSubcategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Mostrar servicios filtrados */}
      <div className="d-flex flex-wrap justify-content-center">
        {serviciosFiltrados.map((servicio) => (
          <ServicioCard key={servicio.nombre} servicio={servicio} />
        ))}
      </div>
    </div>
  );
};

export default Servicios;

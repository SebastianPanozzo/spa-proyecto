import React from "react";

const SobreNosotros = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Sobre Nosotros</h2>

      <section className="mb-5">
        <h4>Conozca Nuestra Historia</h4>
        <p>
          Descubra la esencia de <strong>Sentirse Bien Spa</strong>.
          <br />
          Más de una década dedicada a su bienestar y relajación.
        </p>
      </section>

      <section className="mb-5">
        <h4>Nuestro Equipo</h4>
        <p>
          Contamos con un equipo de profesionales altamente calificados, comprometidos con brindarte la mejor experiencia posible en cada tratamiento.
        </p>
      </section>

      <section>
        <h4>Nuestros Valores</h4>

        <div className="mt-3">
          <h5>Excelencia</h5>
          <p>
            Nos esforzamos por ofrecer el más alto estándar en todos nuestros tratamientos y servicios de masajes,
            asegurando una experiencia inigualable que supera las expectativas de nuestros clientes.
          </p>
        </div>

        <div className="mt-3">
          <h5>Bienestar Integral</h5>
          <p>
            Creemos en un enfoque holístico para el cuidado de nuestros clientes. Nuestros masajes no solo alivian
            tensiones físicas, sino que también promueven un equilibrio emocional y mental.
          </p>
        </div>

        <div className="mt-3">
          <h5>Innovación</h5>
          <p>
            Buscamos constantemente las últimas técnicas y tratamientos en el mundo del bienestar para ofrecer lo mejor a nuestros clientes.
          </p>
        </div>

        <div className="mt-3">
          <h5>Atención Personalizada</h5>
          <p>
            Entendemos que cada persona es única. Por eso, ofrecemos tratamientos personalizados adaptados a las necesidades individuales de cada cliente.
          </p>
        </div>
      </section>
    </div>
  );
};

export default SobreNosotros;

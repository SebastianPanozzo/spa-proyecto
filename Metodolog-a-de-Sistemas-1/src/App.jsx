import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';

import Servicios from "./pages/Servicios";
import Reserva from "./pages/Reserva";
import Contacto from "./pages/Contacto";
import Confirmacion from "./pages/Confirmacion";

import SobreNosotros from "./pages/SobreNosotros";
import Anuncios from "./pages/Anuncios";
import Comentarios from "./pages/Comentarios";
import Empleo from "./pages/Empleo";
import Otros from "./pages/Otros";
import Login from "./pages/login";
import Registro from "./pages/Registro";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-fill">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/reserva" element={<Reserva />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/confirmacion" element={<Confirmacion />} />
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
            <Route path="/anuncios" element={<Anuncios />} />
            <Route path="/comentarios" element={<Comentarios />} />
            <Route path="/empleo" element={<Empleo />} />
            <Route path="/otros" element={<Otros />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

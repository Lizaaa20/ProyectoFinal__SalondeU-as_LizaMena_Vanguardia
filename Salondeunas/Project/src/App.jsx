import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './auth/Login';
import Register from './auth/Register';
import Catalogo from './catalogo/Catalogo';
import Sucursales from './sucursales/Sucursales';
import Reservas from './reservas/Reservas';
import QuienesSomos from './pages/Quienessomos';
import Dashboard from './admin/Dashboard';

// Componente que decide si mostrar el Navbar
function Layout() {
    const location = useLocation();

    // Rutas donde NO se muestra el Navbar
    const sinNavbar = ['/login', '/register'];
    const mostrarNavbar = !sinNavbar.includes(location.pathname);

    return (
        <>
            {/* Solo muestra el Navbar si la ruta no está en la lista */}
            {mostrarNavbar && <Navbar />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/servicios" element={<Catalogo />} />
                <Route path="/sucursales" element={<Sucursales />} />
                <Route path="/reservas" element={<Reservas />} />
                <Route path="/quienes-somos" element={<QuienesSomos />} />
                <Route path="/admin" element={<Dashboard />} />

            </Routes>
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
}

export default App;
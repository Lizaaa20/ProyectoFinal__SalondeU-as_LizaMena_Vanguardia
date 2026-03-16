import { useState } from 'react'
import Login from './auth/Login';
import Register from './auth/Register';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importar componentes
import Navbar from './components/Navbar';

// Importar páginas
import Home from './pages/Home';



function App() {
    return (
        // BrowserRouter habilita el sistema de rutas
        <BrowserRouter>

            {/* Navbar visible en todas las páginas */}
            <Navbar />
            {/* Rutas de la aplicación */}
            <Routes>
                {/* Página de inicio */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;
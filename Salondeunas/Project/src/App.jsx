import { useState } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importar componentes

import Navbar from './components/Navbar';

// Importar páginas

import Home from './pages/Home';

function App() {

    return (

        // BrowserRouter envuelve toda la aplicación para habilitar el enrutamiento

        <BrowserRouter>

            {/* Navbar se muestra en todas las páginas */}

            <Navbar />

            {/* Definición de rutas de la aplicación */}

            <Routes>

                {/* Ruta de inicio */}

                <Route path="/" element={<Home />} />

            </Routes>

        </BrowserRouter>

    );

}

export default App;
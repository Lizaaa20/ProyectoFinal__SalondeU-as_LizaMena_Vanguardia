import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Catalogo.css';


import esmaltado       from '../assets/Esmaltadosemipermanente.jpg';
import frenchUnas      from '../assets/frenchuñas.png';
import limpieza        from '../assets/limpiezauña.jpg';
import limpiezaPedicure from '../assets/limpiezapaticure.jpg';
import manicura        from '../assets/manicurabasica.jpg';
import acrilicas       from '../assets/uñasacrilicas.jpg';
import almendradas     from '../assets/uñasalmendradas.jpg';
import cuadradas       from '../assets/uñascuadradas.png';
import gel             from '../assets/uñasgel.jpg';
import nailart         from '../assets/Nailart.jpg';
import pedicura        from '../assets/pedicura.jpg';

// categoría 
// Mapa de _id → imagen específica
const imagenesServicios = {
    '69ae610f387a6dd265bfe426': manicura,        // Manicure básico
    '69ae6154387a6dd265bfe428': pedicura,         // Pedicure Clásico
    '69ae61ae387a6dd265bfe42a': acrilicas,        // Uñas acrílicas
    '69ae61dc387a6dd265bfe42c': gel,              // Uñas en Gel
    '69b12562625a1528c9b7b008': nailart,          // Nail Art Personalizado
    '69b7d0dc2ac293e54ce37010': frenchUnas,       // French Nails
    '69b7d0f72ac293e54ce37012': esmaltado,        // Esmaltado Semipermanente
    '69b8939a65910a837224912d': limpieza,         // Limpieza Manos
    '69b8943965910a837224912f': cuadradas,        // Uñas Cuadradas
    '69b8958565910a8372249132': almendradas,      // Uñas Almendradas
    '69b8a13a65910a8372249154': limpiezaPedicure, // Limpieza Pies
};

function Catalogo() {

    // Estado para guardar todos los servicios
    const [servicios, setServicios] = useState([]);

    // Estado para el filtro de categoría activo
    const [categoriaActiva, setCategoriaActiva] = useState('Todos');

    // Estado para mostrar carga
    const [loading, setLoading] = useState(true);

    // Estado para mostrar errores
    const [error, setError] = useState('');

    // Hook para redirigir
    const navigate = useNavigate();

    // Cargar servicios al montar el componente
    useEffect(() => {
        async function fetchServicios() {
            try {
                // Petición GET al backend para obtener todos los servicios
                const res = await axios.get('http://localhost:3000/api/servicios');
                setServicios(res.data);
            } catch (err) {
                setError('Error al cargar los servicios');
            } finally {
                setLoading(false);
            }
        }
        fetchServicios();
    }, []);

    // Obtener categorías únicas de los servicios
    const categorias = ['Todos', ...new Set(servicios.map(s => s.categoria))];

    // Filtrar servicios según la categoría activa
    const serviciosFiltrados = categoriaActiva === 'Todos'
        ? servicios
        : servicios.filter(s => s.categoria === categoriaActiva);

    // Manejar clic en reservar
    function handleReservar(servicio) {
        // Verificar si el usuario está autenticado
        const token = localStorage.getItem('token');
        if (!token) {
            // Si no está autenticado, redirigir al login
            navigate('/login');
            return;
        }
        // Si está autenticado, redirigir a reservas con el servicio seleccionado
        navigate('/reservas', { state: { servicio } });
    }

    return (
        <div className="catalogo-page">

            {/* ── HEADER ── */}
            <div className="catalogo-header">
                <h1>Nuestros Servicios</h1>
                <p>Descubre todos los tratamientos que tenemos para ti</p>
            </div>

            {/* ── FILTROS POR CATEGORÍA ── */}
            <div className="catalogo-filtros">
                {categorias.map((cat) => (
                    <button
                        key={cat}
                        className={`filtro-btn ${categoriaActiva === cat ? 'filtro-activo' : ''}`}
                        onClick={() => setCategoriaActiva(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* ── CONTENIDO ── */}
            <div className="catalogo-contenido">

                {/* Mostrar carga */}
                {loading && (
                    <div className="catalogo-loading">
                        <p>Cargando servicios...</p>
                    </div>
                )}

                {/* Mostrar error */}
                {error && (
                    <div className="catalogo-error">
                        <p>{error}</p>
                    </div>
                )}

                {/* Grid de servicios */}
                {!loading && !error && (
                    <div className="catalogo-grid">
                        {serviciosFiltrados.map((servicio) => (
                            <div key={servicio._id} className="servicio-card">

                                {/* Imagen del servicio — usa imagen local según categoría */}
                                <div className="servicio-imagen">
                                    <img
                                        src={imagenesServicios[servicio._id] || manicura}
                                        alt={servicio.nombreServicio}
                                    />
                                    {/* Badge de categoría */}
                                    <span className="servicio-categoria">{servicio.categoria}</span>
                                </div>

                                {/* Info del servicio */}
                                <div className="servicio-info">
                                    <h3>{servicio.nombreServicio}</h3>
                                    <p>{servicio.descripcion}</p>

                                    {/* Duración y precio */}
                                    <div className="servicio-detalles">
                                        <span>⏱ {servicio.duracionMin} min</span>
                                        <span className="servicio-precio">L. {servicio.precioBase}</span>
                                    </div>

                                    {/* Botón reservar */}
                                    <button
                                        className="btn-reservar-servicio"
                                        onClick={() => handleReservar(servicio)}
                                    >
                                        Reservar
                                    </button>
                                </div>

                            </div>
                        ))}
                    </div>
                )}

                {/* Mensaje si no hay servicios en esa categoría */}
                {!loading && !error && serviciosFiltrados.length === 0 && (
                    <div className="catalogo-vacio">
                        <p>No hay servicios en esta categoría</p>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Catalogo;
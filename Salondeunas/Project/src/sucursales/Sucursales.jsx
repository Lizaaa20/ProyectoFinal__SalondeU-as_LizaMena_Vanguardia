import { useState, useEffect } from 'react';
import axios from 'axios';
import './Sucursales.css';

function Sucursales() {

    // Estado para guardar las sucursales
    const [sucursales, setSucursales] = useState([]);

    // Estado para mostrar carga
    const [loading, setLoading] = useState(true);

    // Estado para mostrar errores
    const [error, setError] = useState('');

    // Cargar sucursales al montar el componente
    useEffect(() => {
        async function fetchSucursales() {
            try {
                // Petición GET al backend para obtener todas las sucursales
                const res = await axios.get('http://localhost:3000/api/sucursales');
                setSucursales(res.data);
            } catch (err) {
                setError('Error al cargar las sucursales');
            } finally {
                setLoading(false);
            }
        }
        fetchSucursales();
    }, []);

    return (
        <div className="sucursales-page">

            {/* ── HEADER ── */}
            <div className="sucursales-header">
                <h1>Nuestras Sucursales 🏪</h1>
                <p>Encuéntranos en diferentes puntos de la ciudad</p>
            </div>

            {/* ── CONTENIDO ── */}
            <div className="sucursales-contenido">

                {/* Mostrar carga */}
                {loading && (
                    <div className="sucursales-loading">
                        <p>Cargando sucursales...</p>
                    </div>
                )}

                {/* Mostrar error */}
                {error && (
                    <div className="sucursales-error">
                        <p>{error}</p>
                    </div>
                )}

                {/* Grid de sucursales */}
                {!loading && !error && (
                    <div className="sucursales-grid">
                        {sucursales.map((sucursal) => (
                            <div key={sucursal._id} className="sucursal-card">

                                {/* Ícono decorativo */}
                                <div className="sucursal-icono">🏪</div>

                                {/* Nombre de la sucursal */}
                                <h3>{sucursal.nombre}</h3>

                                {/* Información de la sucursal */}
                                <div className="sucursal-info">

                                    {/* Dirección */}
                                    <div className="sucursal-dato">
                                        <span className="dato-icono">📍</span>
                                        <span>{sucursal.direccion}</span>
                                    </div>

                                    {/* Teléfono */}
                                    <div className="sucursal-dato">
                                        <span className="dato-icono">📞</span>
                                        <span>{sucursal.telefono}</span>
                                    </div>

                                    {/* Horario */}
                                    <div className="sucursal-dato">
                                        <span className="dato-icono">🕐</span>
                                        <span>{sucursal.horarioApertura} — {sucursal.horarioCierre}</span>
                                    </div>

                                </div>

                                {/* Badge activa */}
                                <span className={`sucursal-estado ${sucursal.activa ? 'activa' : 'inactiva'}`}>
                                    {sucursal.activa ? '✓ Abierta' : '✗ Cerrada'}
                                </span>

                            </div>
                        ))}
                    </div>
                )}

                {/* Mensaje si no hay sucursales */}
                {!loading && !error && sucursales.length === 0 && (
                    <div className="sucursales-vacio">
                        <p>No hay sucursales disponibles</p>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Sucursales;
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Sucursales.css';

// Importar imágenes de sucursales desde assets
import imgSucursal1 from '../assets/Sucursal Principal.jpeg';
import imgSucursal2 from '../assets/Segundasucursal.jpg';
import imgSucursal3 from '../assets/TerceraSucursal.jpg';

// Mapa de nombre de sucursal → imagen y link de Google Maps
const sucursalData = {
    'Sucurcal Central': {
        imagen: imgSucursal1,
        mapa: 'https://google.com/maps/dir//Vanity+Nail+Studio,+Res,+calle+principal+%23+29,+21102+San+Pedro+Sula,+Cortés/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x8f665b916b5a4d4f:0x19f2a8289c7e5240?sa=X&ved=1t:57443&ictx=111'
    },
    'Segunda Sucursal': {
        imagen: imgSucursal2,
        mapa: 'https://www.google.com/maps/dir/15.565574,-88.0017969/ARYANIS,+N.O,+7+CALLE+11+AVE,+21102+San+Pedro+Sula,+Cort%C3%A9s/@15.5384327,-88.0354102,14z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x8f665b41c828e1bf:0xa138fdcdfccfffae!2m2!1d-88.0302553!2d15.5117634?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D'
    },
    'Tercera Sucursal': {
        imagen: imgSucursal3,
        mapa: 'https://www.google.com/maps/dir/15.565574,-88.0017969/Adriana+Rivera+Nails+Spa,+Condominios+Metropolis,+Boulevard+Suyapa,+Tegucigalpa,+Francisco+Moraz%C3%A1n/@15.1467149,-88.1386385,9z/data=!4m9!4m8!1m1!4e1!1m5!1m1!1s0x8f6fa30debe7659b:0x759d25598e43ed9f!2m2!1d-87.1862911!2d14.0856468?entry=ttu&g_ep=EgoyMDI2MDMxMS4wIKXMDSoASAFQAw%3D%3D'
    },
};

// Imagen por defecto si no hay imagen asignada
import imgDefault from '../assets/h.jpg';

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
                <h1>Nuestras Sucursales</h1>
                <p>Encuéntranos en diferentes puntos del país</p>
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
                        {sucursales.map((sucursal) => {

                            // Obtener imagen y link de mapa según el nombre
                            const data = sucursalData[sucursal.nombre] || {};
                            const imagen = data.imagen || imgDefault;
                            const mapa   = data.mapa || '#';

                            return (
                                <div key={sucursal._id} className="sucursal-card">

                                    {/* Imagen de la sucursal */}
                                    <div className="sucursal-imagen">
                                        <img src={imagen} alt={sucursal.nombre} />
                                        {/* Badge de estado encima de la imagen */}
                                        <span className={`sucursal-estado ${sucursal.activa ? 'activa' : 'inactiva'}`}>
                                            {sucursal.activa ? '✓ Abierta' : '✗ Cerrada'}
                                        </span>
                                    </div>

                                    {/* Info de la sucursal */}
                                    <div className="sucursal-body">

                                        {/* Nombre */}
                                        <h3>{sucursal.nombre}</h3>

                                        {/* Datos */}
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

                                        {/* Botón ver en Google Maps */}
                                        <a
                                            href={mapa}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn-mapa"
                                        >
                                            📍 Ver en Google Maps
                                        </a>

                                    </div>
                                </div>
                            );
                        })}
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
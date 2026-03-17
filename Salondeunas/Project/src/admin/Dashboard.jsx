import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

function Dashboard() {

    // Estado para las estadísticas del dashboard
    const [stats, setStats] = useState({
        totalReservas:  0,
        totalClientes:  0,
        totalServicios: 0,
        totalDisenos:   0,
    });

    // Estado para las reservas recientes
    const [reservasRecientes, setReservasRecientes] = useState([]);

    // Estado para mostrar carga
    const [loading, setLoading] = useState(true);

    // Hook para redirigir
    const navigate = useNavigate();

    // Obtener datos del usuario del localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const token   = localStorage.getItem('token');

    // Verificar que el usuario sea admin
    useEffect(() => {
        if (!token || !usuario || usuario.rol !== 'admin') {
            navigate('/login');
            return;
        }
        fetchStats();
    }, []);

    // Cargar estadísticas
    async function fetchStats() {
        try {
            const headers = { authorization: token };

            // Cargar reservas, servicios y diseños en paralelo
            const [resReservas, resServicios, resDisenos] = await Promise.all([
                axios.get('http://localhost:3000/api/reservas',    { headers }),
                axios.get('http://localhost:3000/api/servicios'),
                axios.get('http://localhost:3000/api/disenios',    { headers }),
            ]);

            // Actualizar estadísticas
            setStats({
                totalReservas:  resReservas.data.length,
                totalServicios: resServicios.data.length,
                totalDisenos:   resDisenos.data.length,
                totalClientes:  resReservas.data.length,
            });

            // Guardar las últimas 5 reservas
            setReservasRecientes(resReservas.data.slice(0, 5));

        } catch (err) {
            console.error('Error al cargar estadísticas', err);
        } finally {
            setLoading(false);
        }
    }

    // Cerrar sesión
    function cerrarSesion() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        navigate('/login');
    }

    return (
        <div className="admin-layout">

            {/* ── SIDEBAR ── */}
            <aside className="admin-sidebar">

                {/* Logo */}
                <div className="sidebar-logo">
                    <span>💅 Angel Nails</span>
                    <small>Panel Admin</small>
                </div>

                {/* Links de navegación */}
                <nav className="sidebar-nav">
                    <Link to="/admin" className="sidebar-link activo">
                        📊 Dashboard
                    </Link>
                    <Link to="/admin/reservas" className="sidebar-link">
                        📅 Reservas
                    </Link>
                    <Link to="/admin/disenios" className="sidebar-link">
                        🎨 Diseños
                    </Link>
                    <Link to="/admin/servicios" className="sidebar-link">
                        💅 Servicios
                    </Link>
                    <Link to="/admin/sucursales" className="sidebar-link">
                        🏪 Sucursales
                    </Link>
                </nav>

                {/* Botón cerrar sesión */}
                <button className="sidebar-logout" onClick={cerrarSesion}>
                    🚪 Cerrar Sesión
                </button>

            </aside>

            {/* ── CONTENIDO PRINCIPAL ── */}
            <main className="admin-main">

                {/* Header del dashboard */}
                <div className="admin-topbar">
                    <h1>Dashboard</h1>
                    <span>Bienvenida, {usuario?.nombre} 👋</span>
                </div>

                {/* Tarjetas de estadísticas */}
                <div className="stats-grid">

                    {/* Total reservas */}
                    <div className="stat-card">
                        <div className="stat-icono">📅</div>
                        <div className="stat-info">
                            <h3>{loading ? '...' : stats.totalReservas}</h3>
                            <p>Total Reservas</p>
                        </div>
                    </div>

                    {/* Total servicios */}
                    <div className="stat-card">
                        <div className="stat-icono">💅</div>
                        <div className="stat-info">
                            <h3>{loading ? '...' : stats.totalServicios}</h3>
                            <p>Servicios</p>
                        </div>
                    </div>

                    {/* Total diseños */}
                    <div className="stat-card">
                        <div className="stat-icono">🎨</div>
                        <div className="stat-info">
                            <h3>{loading ? '...' : stats.totalDisenos}</h3>
                            <p>Diseños Enviados</p>
                        </div>
                    </div>

                    {/* Accesos rápidos */}
                    <div className="stat-card stat-card-pink">
                        <div className="stat-icono">⭐</div>
                        <div className="stat-info">
                            <h3>Angel Nails</h3>
                            <p>3 Sucursales</p>
                        </div>
                    </div>

                </div>

                {/* Reservas recientes */}
                <div className="admin-section">
                    <div className="section-header">
                        <h2>Reservas Recientes</h2>
                        <Link to="/admin/reservas" className="ver-todas">Ver todas →</Link>
                    </div>

                    {/* Tabla de reservas recientes */}
                    <div className="tabla-container">
                        <table className="admin-tabla">
                            <thead>
                                <tr>
                                    <th>Cliente</th>
                                    <th>Servicio</th>
                                    <th>Sucursal</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="tabla-loading">Cargando...</td>
                                    </tr>
                                ) : reservasRecientes.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="tabla-vacia">No hay reservas aún</td>
                                    </tr>
                                ) : (
                                    reservasRecientes.map((r) => (
                                        <tr key={r._id}>
                                            <td>{r.usuarioId?.nombre} {r.usuarioId?.apellido}</td>
                                            <td>{r.servicioId?.nombreServicio}</td>
                                            <td>{r.sucursalId?.nombre}</td>
                                            <td>{new Date(r.fechaCita).toLocaleDateString('es-ES')}</td>
                                            <td>{r.horaCita}</td>
                                            <td>
                                                <span className={`estado-badge estado-${r.estado}`}>
                                                    {r.estado}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Accesos rápidos */}
                <div className="admin-section">
                    <h2>Accesos Rápidos</h2>
                    <div className="accesos-grid">
                        <Link to="/admin/reservas" className="acceso-card">
                            <span>📅</span>
                            <p>Gestionar Reservas</p>
                        </Link>
                        <Link to="/admin/disenios" className="acceso-card">
                            <span>🎨</span>
                            <p>Ver Diseños</p>
                        </Link>
                        <Link to="/admin/servicios" className="acceso-card">
                            <span>💅</span>
                            <p>Gestionar Servicios</p>
                        </Link>
                        <Link to="/admin/sucursales" className="acceso-card">
                            <span>🏪</span>
                            <p>Gestionar Sucursales</p>
                        </Link>
                    </div>
                </div>

            </main>
        </div>
    );
}

export default Dashboard;
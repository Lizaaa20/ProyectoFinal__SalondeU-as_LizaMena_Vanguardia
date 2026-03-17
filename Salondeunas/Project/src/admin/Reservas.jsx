import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

function AdminReservas() {

    // Estado para todas las reservas
    const [reservas, setReservas] = useState([]);

    // Estado para el filtro de estado activo
    const [filtro, setFiltro] = useState('todos');

    // Estado para mostrar carga
    const [loading, setLoading] = useState(true);

    // Estado para mensajes
    const [mensaje, setMensaje] = useState('');

    // Obtener token del localStorage
    const token = localStorage.getItem('token');

    // Cargar reservas al montar el componente
    useEffect(() => {
        fetchReservas();
    }, []);

    // Función para cargar todas las reservas
    async function fetchReservas() {
        try {
            const res = await axios.get('http://localhost:3000/api/reservas', {
                headers: { authorization: token }
            });
            setReservas(res.data);
        } catch (err) {
            console.error('Error al cargar reservas', err);
        } finally {
            setLoading(false);
        }
    }

    // Cambiar el estado de una reserva
    async function cambiarEstado(id, nuevoEstado) {
        try {
            await axios.put(
                `http://localhost:3000/api/reservas/update/${id}`,
                { estado: nuevoEstado },
                { headers: { authorization: token } }
            );

            // Actualizar la lista de reservas localmente
            setReservas(prev => prev.map(r =>
                r._id === id ? { ...r, estado: nuevoEstado } : r
            ));

            setMensaje(`Reserva ${nuevoEstado} correctamente`);

            // Limpiar mensaje después de 3 segundos
            setTimeout(() => setMensaje(''), 3000);

        } catch (err) {
            console.error('Error al actualizar reserva', err);
        }
    }

    // Filtrar reservas según el estado seleccionado
    const reservasFiltradas = filtro === 'todos'
        ? reservas
        : reservas.filter(r => r.estado === filtro);

    return (
        <div className="admin-layout">

            {/* ── SIDEBAR ── */}
            <aside className="admin-sidebar">
                <div className="sidebar-logo">
                    <span>💅 Angel Nails</span>
                    <small>Panel Admin</small>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/admin" className="sidebar-link"> Dashboard</Link>
                    <Link to="/admin/reservas" className="sidebar-link activo"> Reservas</Link>
                    <Link to="/admin/disenios" className="sidebar-link"> Diseños</Link>
                    <Link to="/admin/servicios" className="sidebar-link"> Servicios</Link>
                    <Link to="/admin/sucursales" className="sidebar-link"> Sucursales</Link>
                </nav>
                <button className="sidebar-logout" onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('usuario');
                    window.location.href = '/login-admin';
                }}>
                    🚪 Cerrar Sesión
                </button>
            </aside>

            {/* ── CONTENIDO ── */}
            <main className="admin-main">

                {/* Topbar */}
                <div className="admin-topbar">
                    <h1>Gestión de Reservas</h1>
                    <span>Total: {reservas.length} reservas</span>
                </div>

                <div style={{ padding: '28px 32px' }}>

                    {/* Mensaje de éxito */}
                    {mensaje && <div className="admin-exito">{mensaje}</div>}

                    {/* Filtros por estado */}
                    <div className="reservas-filtros">
                        {['todos', 'pendiente', 'confirmada', 'cancelada', 'completada'].map((estado) => (
                            <button
                                key={estado}
                                className={`filtro-estado-btn ${filtro === estado ? 'filtro-estado-activo' : ''}`}
                                onClick={() => setFiltro(estado)}
                            >
                                {estado.charAt(0).toUpperCase() + estado.slice(1)}
                                {/* Contador de reservas por estado */}
                                <span className="filtro-count">
                                    {estado === 'todos'
                                        ? reservas.length
                                        : reservas.filter(r => r.estado === estado).length}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Tabla de reservas */}
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
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="tabla-loading">Cargando reservas...</td>
                                    </tr>
                                ) : reservasFiltradas.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="tabla-vacia">No hay reservas {filtro !== 'todos' ? `con estado "${filtro}"` : ''}</td>
                                    </tr>
                                ) : (
                                    reservasFiltradas.map((r) => (
                                        <tr key={r._id}>
                                            {/* Nombre del cliente */}
                                            <td>
                                                <strong>{r.usuarioId?.nombre} {r.usuarioId?.apellido}</strong>
                                                <br />
                                                <small style={{ color: '#999' }}>{r.usuarioId?.correo}</small>
                                            </td>

                                            {/* Servicio */}
                                            <td>{r.servicioId?.nombreServicio}</td>

                                            {/* Sucursal */}
                                            <td>{r.sucursalId?.nombre}</td>

                                            {/* Fecha */}
                                            <td>{new Date(r.fechaCita).toLocaleDateString('es-ES')}</td>

                                            {/* Hora */}
                                            <td>{r.horaCita}</td>

                                            {/* Estado */}
                                            <td>
                                                <span className={`estado-badge estado-${r.estado}`}>
                                                    {r.estado}
                                                </span>
                                            </td>

                                            {/* Acciones */}
                                            <td>
                                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                                    {/* Confirmar — solo si está pendiente */}
                                                    {r.estado === 'pendiente' && (
                                                        <button
                                                            className="btn-admin-success"
                                                            onClick={() => cambiarEstado(r._id, 'confirmada')}
                                                        >
                                                            ✓ Confirmar
                                                        </button>
                                                    )}

                                                    {/* Completar — solo si está confirmada */}
                                                    {r.estado === 'confirmada' && (
                                                        <button
                                                            className="btn-admin-success"
                                                            onClick={() => cambiarEstado(r._id, 'completada')}
                                                        >
                                                            ✓ Completar
                                                        </button>
                                                    )}

                                                    {/* Cancelar — si está pendiente o confirmada */}
                                                    {(r.estado === 'pendiente' || r.estado === 'confirmada') && (
                                                        <button
                                                            className="btn-admin-danger"
                                                            onClick={() => cambiarEstado(r._id, 'cancelada')}
                                                        >
                                                            ✗ Cancelar
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </main>
        </div>
    );
}

export default AdminReservas;
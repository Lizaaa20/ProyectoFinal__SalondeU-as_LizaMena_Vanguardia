import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

function AdminDisenios() {

    // Estado para todos los diseños
    const [disenios, setDisenios] = useState([]);

    // Estado para el filtro de estado activo
    const [filtro, setFiltro] = useState('todos');

    // Estado para el diseño seleccionado para cotizar
    const [disenioSeleccionado, setDisenioSeleccionado] = useState(null);

    // Estado para el formulario de cotización
    const [cotizacion, setCotizacion] = useState({
        montoEstimado: '',
        notasAdmin: ''
    });

    // Estado para mostrar carga
    const [loading, setLoading] = useState(true);

    // Estado para mensajes
    const [mensaje, setMensaje] = useState('');
    const [error, setError]     = useState('');

    // Obtener token y usuario del localStorage
    const token   = localStorage.getItem('token');
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    // Cargar diseños al montar el componente
    useEffect(() => {
        fetchDisenios();
    }, []);

    // Función para cargar todos los diseños
    async function fetchDisenios() {
        try {
            const res = await axios.get('http://localhost:3000/api/disenios', {
                headers: { authorization: token }
            });
            setDisenios(res.data);
        } catch (err) {
            console.error('Error al cargar diseños', err);
        } finally {
            setLoading(false);
        }
    }

    // Abrir modal de cotización
    function abrirCotizacion(disenio) {
        setDisenioSeleccionado(disenio);
        setCotizacion({ montoEstimado: '', notasAdmin: '' });
        setError('');
    }

    // Cerrar modal de cotización
    function cerrarCotizacion() {
        setDisenioSeleccionado(null);
        setCotizacion({ montoEstimado: '', notasAdmin: '' });
    }

    // Enviar cotización
    async function handleCotizar(e) {
        e.preventDefault();
        setError('');

        if (!cotizacion.montoEstimado) {
            return setError('Por favor ingresa el monto estimado');
        }

        try {
            // Crear cotización en la base de datos
            await axios.post(
                'http://localhost:3000/api/cotizaciones/create',
                {
                    disenoId:      disenioSeleccionado._id,
                    adminId:       usuario.id,
                    montoEstimado: cotizacion.montoEstimado,
                    notasAdmin:    cotizacion.notasAdmin
                },
                { headers: { authorization: token } }
            );

            // Actualizar el estado del diseño a 'cotizado'
            await axios.put(
                `http://localhost:3000/api/disenios/update/${disenioSeleccionado._id}`,
                {
                    estado:     'cotizado',
                    cotizacion: cotizacion.montoEstimado
                },
                { headers: { authorization: token } }
            );

            // Actualizar la lista localmente
            setDisenios(prev => prev.map(d =>
                d._id === disenioSeleccionado._id
                    ? { ...d, estado: 'cotizado', cotizacion: cotizacion.montoEstimado }
                    : d
            ));

            setMensaje('Cotización enviada correctamente');
            setTimeout(() => setMensaje(''), 3000);
            cerrarCotizacion();

        } catch (err) {
            setError('Error al enviar la cotización');
        }
    }

    // Filtrar diseños según el estado seleccionado
    const diseniosFiltrados = filtro === 'todos'
        ? disenios
        : disenios.filter(d => d.estado === filtro);

    return (
        <div className="admin-layout">

            {/* ── SIDEBAR ── */}
            <aside className="admin-sidebar">
                <div className="sidebar-logo">
                    <span>💅 Angel Nails</span>
                    <small>Panel Admin</small>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/admin" className="sidebar-link">📊 Dashboard</Link>
                    <Link to="/admin/reservas" className="sidebar-link">📅 Reservas</Link>
                    <Link to="/admin/disenios" className="sidebar-link activo">🎨 Diseños</Link>
                    <Link to="/admin/servicios" className="sidebar-link">💅 Servicios</Link>
                    <Link to="/admin/sucursales" className="sidebar-link">🏪 Sucursales</Link>
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
                    <h1>Gestión de Diseños</h1>
                    <span>Total: {disenios.length} diseños</span>
                </div>

                <div style={{ padding: '28px 32px' }}>

                    {/* Mensaje de éxito */}
                    {mensaje && <div className="admin-exito">{mensaje}</div>}

                    {/* Filtros por estado */}
                    <div className="reservas-filtros">
                        {['todos', 'pendiente', 'cotizado', 'confirmado'].map((estado) => (
                            <button
                                key={estado}
                                className={`filtro-estado-btn ${filtro === estado ? 'filtro-estado-activo' : ''}`}
                                onClick={() => setFiltro(estado)}
                            >
                                {estado.charAt(0).toUpperCase() + estado.slice(1)}
                                <span className="filtro-count">
                                    {estado === 'todos'
                                        ? disenios.length
                                        : disenios.filter(d => d.estado === estado).length}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Grid de diseños */}
                    {loading ? (
                        <p className="tabla-loading">Cargando diseños...</p>
                    ) : diseniosFiltrados.length === 0 ? (
                        <p className="tabla-vacia">No hay diseños {filtro !== 'todos' ? `con estado "${filtro}"` : ''}</p>
                    ) : (
                        <div className="disenios-grid">
                            {diseniosFiltrados.map((d) => (
                                <div key={d._id} className="disenio-card">

                                    {/* Imagen del diseño */}
                                    <div className="disenio-imagen">
                                        {d.imagenUrl ? (
                                            <img src={d.imagenUrl} alt="Diseño" />
                                        ) : (
                                            <div className="disenio-placeholder">🎨</div>
                                        )}
                                        {/* Badge de estado */}
                                        <span className={`estado-badge estado-${d.estado}`}>
                                            {d.estado}
                                        </span>
                                    </div>

                                    {/* Info del diseño */}
                                    <div className="disenio-info">

                                        {/* Cliente */}
                                        <p className="disenio-cliente">
                                            👤 {d.usuarioId?.nombre} {d.usuarioId?.apellido}
                                        </p>

                                        {/* Descripción */}
                                        <p className="disenio-descripcion">{d.descripcion}</p>

                                        {/* Fecha de envío */}
                                        <p className="disenio-fecha">
                                            📅 {new Date(d.fechaEnvio).toLocaleDateString('es-ES')}
                                        </p>

                                        {/* Cotización si ya existe */}
                                        {d.cotizacion > 0 && (
                                            <p className="disenio-monto">
                                                💰 Cotización: L. {d.cotizacion}
                                            </p>
                                        )}

                                        {/* Botón cotizar — solo si está pendiente */}
                                        {d.estado === 'pendiente' && (
                                            <button
                                                className="btn-admin-primary"
                                                style={{ width: '100%', marginTop: '10px' }}
                                                onClick={() => abrirCotizacion(d)}
                                            >
                                                💰 Generar Cotización
                                            </button>
                                        )}

                                        {/* Mensaje si ya fue cotizado */}
                                        {d.estado === 'cotizado' && (
                                            <div className="disenio-cotizado">
                                                ✓ Cotización enviada
                                            </div>
                                        )}

                                        {/* Mensaje si fue confirmado */}
                                        {d.estado === 'confirmado' && (
                                            <div className="disenio-confirmado">
                                                ✓ Servicio confirmado
                                            </div>
                                        )}

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </main>

            {/* ── MODAL DE COTIZACIÓN ── */}
            {disenioSeleccionado && (
                <div className="modal-overlay" onClick={cerrarCotizacion}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>

                        <h3>💰 Generar Cotización</h3>

                        {/* Imagen del diseño */}
                        {disenioSeleccionado.imagenUrl && (
                            <img
                                src={disenioSeleccionado.imagenUrl}
                                alt="Diseño"
                                className="modal-imagen"
                            />
                        )}

                        {/* Descripción */}
                        <p className="modal-descripcion">
                            {disenioSeleccionado.descripcion}
                        </p>

                        {/* Mensaje de error */}
                        {error && <div className="admin-error">{error}</div>}

                        {/* Formulario de cotización */}
                        <form onSubmit={handleCotizar}>

                            <div className="form-group">
                                <label>Monto Estimado (L.)</label>
                                <input
                                    type="number"
                                    placeholder="Ej: 350"
                                    value={cotizacion.montoEstimado}
                                    onChange={(e) => setCotizacion({ ...cotizacion, montoEstimado: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Notas para la clienta</label>
                                <textarea
                                    placeholder="Describe detalles del servicio..."
                                    value={cotizacion.notasAdmin}
                                    onChange={(e) => setCotizacion({ ...cotizacion, notasAdmin: e.target.value })}
                                    rows={3}
                                />
                            </div>

                            {/* Botones */}
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button type="submit" className="btn-admin-primary" style={{ flex: 1 }}>
                                    Enviar Cotización
                                </button>
                                <button
                                    type="button"
                                    className="btn-admin-secondary"
                                    onClick={cerrarCotizacion}
                                    style={{ flex: 1 }}
                                >
                                    Cancelar
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

export default AdminDisenios;
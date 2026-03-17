import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

function AdminSucursales() {

    // Estado para todas las sucursales
    const [sucursales, setSucursales] = useState([]);

    // Estado para el formulario
    const [form, setForm] = useState({
        nombre:          '',
        direccion:       '',
        telefono:        '',
        horarioApertura: '',
        horarioCierre:   '',
        activa:          true
    });

    // Estado para saber si estamos editando
    const [editandoId, setEditandoId] = useState(null);

    // Estado para mostrar/ocultar formulario
    const [mostrarForm, setMostrarForm] = useState(false);

    // Estado para carga y mensajes
    const [loading, setLoading] = useState(true);
    const [mensaje, setMensaje] = useState('');
    const [error,   setError]   = useState('');

    // Token del admin
    const token = localStorage.getItem('token');

    // Cargar sucursales al montar
    useEffect(() => {
        fetchSucursales();
    }, []);

    // Cargar todas las sucursales
    async function fetchSucursales() {
        try {
            const res = await axios.get('http://localhost:3000/api/sucursales');
            setSucursales(res.data);
        } catch (err) {
            console.error('Error al cargar sucursales', err);
        } finally {
            setLoading(false);
        }
    }

    // Manejar cambios en el formulario
    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    }

    // Limpiar formulario
    function limpiarForm() {
        setForm({
            nombre:          '',
            direccion:       '',
            telefono:        '',
            horarioApertura: '',
            horarioCierre:   '',
            activa:          true
        });
        setEditandoId(null);
        setError('');
    }

    // Abrir formulario para crear
    function abrirCrear() {
        limpiarForm();
        setMostrarForm(true);
    }

    // Abrir formulario para editar
    function abrirEditar(sucursal) {
        setForm({
            nombre:          sucursal.nombre,
            direccion:       sucursal.direccion,
            telefono:        sucursal.telefono,
            horarioApertura: sucursal.horarioApertura,
            horarioCierre:   sucursal.horarioCierre,
            activa:          sucursal.activa
        });
        setEditandoId(sucursal._id);
        setMostrarForm(true);
    }

    // Guardar sucursal — crear o actualizar
    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        try {
            if (editandoId) {
                // Actualizar sucursal existente
                await axios.put(
                    `http://localhost:3000/api/sucursales/update/${editandoId}`,
                    form,
                    { headers: { authorization: token } }
                );
                setMensaje('Sucursal actualizada correctamente');
            } else {
                // Crear nueva sucursal
                await axios.post(
                    'http://localhost:3000/api/sucursales/create',
                    form,
                    { headers: { authorization: token } }
                );
                setMensaje('Sucursal creada correctamente');
            }

            // Recargar sucursales y cerrar formulario
            fetchSucursales();
            limpiarForm();
            setMostrarForm(false);
            setTimeout(() => setMensaje(''), 3000);

        } catch (err) {
            setError('Error al guardar la sucursal');
        }
    }

    // Eliminar sucursal
    async function handleEliminar(id) {
        if (!window.confirm('¿Estás segura de eliminar esta sucursal?')) return;

        try {
            await axios.delete(
                `http://localhost:3000/api/sucursales/delete/${id}`,
                { headers: { authorization: token } }
            );

            // Eliminar de la lista local
            setSucursales(prev => prev.filter(s => s._id !== id));
            setMensaje('Sucursal eliminada correctamente');
            setTimeout(() => setMensaje(''), 3000);

        } catch (err) {
            setError('Error al eliminar la sucursal');
        }
    }

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
                    <Link to="/admin/disenios" className="sidebar-link">🎨 Diseños</Link>
                    <Link to="/admin/servicios" className="sidebar-link">💅 Servicios</Link>
                    <Link to="/admin/sucursales" className="sidebar-link activo">🏪 Sucursales</Link>
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
                    <h1>Gestión de Sucursales</h1>
                    <button className="btn-admin-primary" onClick={abrirCrear}>
                        + Nueva Sucursal
                    </button>
                </div>

                <div style={{ padding: '28px 32px' }}>

                    {/* Mensajes */}
                    {mensaje && <div className="admin-exito">{mensaje}</div>}
                    {error   && <div className="admin-error">{error}</div>}

                    {/* Formulario crear/editar */}
                    {mostrarForm && (
                        <div className="admin-form">
                            <h3>{editandoId ? '✏️ Editar Sucursal' : '+ Nueva Sucursal'}</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-grid">

                                    {/* Nombre */}
                                    <div className="form-group">
                                        <label>Nombre de la sucursal</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            placeholder="Ej: Sucursal Central"
                                            value={form.nombre}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Teléfono */}
                                    <div className="form-group">
                                        <label>Teléfono</label>
                                        <input
                                            type="text"
                                            name="telefono"
                                            placeholder="Ej: 88001234"
                                            value={form.telefono}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Horario apertura */}
                                    <div className="form-group">
                                        <label>Horario apertura</label>
                                        <input
                                            type="time"
                                            name="horarioApertura"
                                            value={form.horarioApertura}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    {/* Horario cierre */}
                                    <div className="form-group">
                                        <label>Horario cierre</label>
                                        <input
                                            type="time"
                                            name="horarioCierre"
                                            value={form.horarioCierre}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                </div>

                                {/* Dirección */}
                                <div className="form-group">
                                    <label>Dirección</label>
                                    <input
                                        type="text"
                                        name="direccion"
                                        placeholder="Ej: Calle Principal #123, San Pedro Sula"
                                        value={form.direccion}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Activa */}
                                <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                                    <input
                                        type="checkbox"
                                        name="activa"
                                        id="activa"
                                        checked={form.activa}
                                        onChange={handleChange}
                                        style={{ width: 'auto' }}
                                    />
                                    <label htmlFor="activa" style={{ marginBottom: 0 }}>Sucursal activa</label>
                                </div>

                                {/* Botones */}
                                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                                    <button type="submit" className="btn-admin-primary">
                                        {editandoId ? 'Actualizar' : 'Crear Sucursal'}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-admin-secondary"
                                        onClick={() => { setMostrarForm(false); limpiarForm(); }}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Tabla de sucursales */}
                    <div className="tabla-container">
                        <table className="admin-tabla">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Dirección</th>
                                    <th>Teléfono</th>
                                    <th>Horario</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="6" className="tabla-loading">Cargando...</td></tr>
                                ) : sucursales.length === 0 ? (
                                    <tr><td colSpan="6" className="tabla-vacia">No hay sucursales</td></tr>
                                ) : (
                                    sucursales.map((s) => (
                                        <tr key={s._id}>
                                            <td><strong>{s.nombre}</strong></td>
                                            <td>{s.direccion}</td>
                                            <td>{s.telefono}</td>
                                            <td>{s.horarioApertura} — {s.horarioCierre}</td>
                                            <td>
                                                <span className={`estado-badge ${s.activa ? 'estado-confirmada' : 'estado-cancelada'}`}>
                                                    {s.activa ? '✓ Abierta' : '✗ Cerrada'}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '6px' }}>
                                                    <button
                                                        className="btn-admin-secondary"
                                                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                                                        onClick={() => abrirEditar(s)}
                                                    >
                                                        ✏️ Editar
                                                    </button>
                                                    <button
                                                        className="btn-admin-danger"
                                                        onClick={() => handleEliminar(s._id)}
                                                    >
                                                        🗑 Eliminar
                                                    </button>
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

export default AdminSucursales;
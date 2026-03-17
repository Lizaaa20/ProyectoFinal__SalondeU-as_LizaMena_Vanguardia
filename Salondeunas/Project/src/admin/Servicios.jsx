import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';

function AdminServicios() {

    // Estado para todos los servicios
    const [servicios, setServicios] = useState([]);

    // Estado para el formulario
    const [form, setForm] = useState({
        nombreServicio: '',
        descripcion:    '',
        precioBase:     '',
        duracionMin:    '',
        categoria:      '',
        imagenUrl:      '',
        activo:         true
    });

    // Estado para saber si estamos editando
    const [editandoId, setEditandoId] = useState(null);

    // Estado para mostrar/ocultar formulario
    const [mostrarForm, setMostrarForm] = useState(false);

    // Estado para carga y mensajes
    const [loading, setLoading]   = useState(true);
    const [mensaje, setMensaje]   = useState('');
    const [error,   setError]     = useState('');

    // Token del admin
    const token = localStorage.getItem('token');

    // Cargar servicios al montar
    useEffect(() => {
        fetchServicios();
    }, []);

    // Cargar todos los servicios
    async function fetchServicios() {
        try {
            const res = await axios.get('http://localhost:3000/api/servicios');
            setServicios(res.data);
        } catch (err) {
            console.error('Error al cargar servicios', err);
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
            nombreServicio: '',
            descripcion:    '',
            precioBase:     '',
            duracionMin:    '',
            categoria:      '',
            imagenUrl:      '',
            activo:         true
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
    function abrirEditar(servicio) {
        setForm({
            nombreServicio: servicio.nombreServicio,
            descripcion:    servicio.descripcion,
            precioBase:     servicio.precioBase,
            duracionMin:    servicio.duracionMin,
            categoria:      servicio.categoria,
            imagenUrl:      servicio.imagenUrl || '',
            activo:         servicio.activo
        });
        setEditandoId(servicio._id);
        setMostrarForm(true);
    }

    // Guardar servicio — crear o actualizar
    async function handleSubmit(e) {
        e.preventDefault();
        setError('');

        try {
            if (editandoId) {
                // Actualizar servicio existente
                await axios.put(
                    `http://localhost:3000/api/servicios/update/${editandoId}`,
                    form,
                    { headers: { authorization: token } }
                );
                setMensaje('Servicio actualizado correctamente');
            } else {
                // Crear nuevo servicio
                await axios.post(
                    'http://localhost:3000/api/servicios/create',
                    form,
                    { headers: { authorization: token } }
                );
                setMensaje('Servicio creado correctamente');
            }

            // Recargar servicios y cerrar formulario
            fetchServicios();
            limpiarForm();
            setMostrarForm(false);
            setTimeout(() => setMensaje(''), 3000);

        } catch (err) {
            setError('Error al guardar el servicio');
        }
    }

    // Eliminar servicio
    async function handleEliminar(id) {
        if (!window.confirm('¿Estás segura de eliminar este servicio?')) return;

        try {
            await axios.delete(
                `http://localhost:3000/api/servicios/delete/${id}`,
                { headers: { authorization: token } }
            );

            // Eliminar de la lista local
            setServicios(prev => prev.filter(s => s._id !== id));
            setMensaje('Servicio eliminado correctamente');
            setTimeout(() => setMensaje(''), 3000);

        } catch (err) {
            setError('Error al eliminar el servicio');
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
                    <Link to="/admin/servicios" className="sidebar-link activo">💅 Servicios</Link>
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
                    <h1>Gestión de Servicios</h1>
                    <button className="btn-admin-primary" onClick={abrirCrear}>
                        + Nuevo Servicio
                    </button>
                </div>

                <div style={{ padding: '28px 32px' }}>

                    {/* Mensajes */}
                    {mensaje && <div className="admin-exito">{mensaje}</div>}
                    {error   && <div className="admin-error">{error}</div>}

                    {/* Formulario crear/editar */}
                    {mostrarForm && (
                        <div className="admin-form">
                            <h3>{editandoId ? '✏️ Editar Servicio' : '+ Nuevo Servicio'}</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Nombre del servicio</label>
                                        <input
                                            type="text"
                                            name="nombreServicio"
                                            placeholder="Ej: Manicure Clásico"
                                            value={form.nombreServicio}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Categoría</label>
                                        <select name="categoria" value={form.categoria} onChange={handleChange} required>
                                            <option value="">-- Selecciona --</option>
                                            <option value="Manicure">Manicure</option>
                                            <option value="Pedicure">Pedicure</option>
                                            <option value="NailArt">NailArt</option>
                                            <option value="Gel">Gel</option>
                                            <option value="Esmaltado">Esmaltado</option>
                                            <option value="Acrilico">Acrilico</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Precio base (L.)</label>
                                        <input
                                            type="number"
                                            name="precioBase"
                                            placeholder="Ej: 250"
                                            value={form.precioBase}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Duración (minutos)</label>
                                        <input
                                            type="number"
                                            name="duracionMin"
                                            placeholder="Ej: 60"
                                            value={form.duracionMin}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Descripción</label>
                                    <textarea
                                        name="descripcion"
                                        placeholder="Describe el servicio..."
                                        value={form.descripcion}
                                        onChange={handleChange}
                                        rows={3}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>URL de imagen (opcional)</label>
                                    <input
                                        type="text"
                                        name="imagenUrl"
                                        placeholder="https://..."
                                        value={form.imagenUrl}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                    <button type="submit" className="btn-admin-primary">
                                        {editandoId ? 'Actualizar' : 'Crear Servicio'}
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

                    {/* Tabla de servicios */}
                    <div className="tabla-container">
                        <table className="admin-tabla">
                            <thead>
                                <tr>
                                    <th>Servicio</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                    <th>Duración</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="6" className="tabla-loading">Cargando...</td></tr>
                                ) : servicios.length === 0 ? (
                                    <tr><td colSpan="6" className="tabla-vacia">No hay servicios</td></tr>
                                ) : (
                                    servicios.map((s) => (
                                        <tr key={s._id}>
                                            <td>
                                                <strong>{s.nombreServicio}</strong>
                                                <br />
                                                <small style={{ color: '#999' }}>{s.descripcion?.substring(0, 50)}...</small>
                                            </td>
                                            <td>
                                                <span className="estado-badge" style={{ background: '#fce4ec', color: '#c9396b' }}>
                                                    {s.categoria}
                                                </span>
                                            </td>
                                            <td><strong style={{ color: '#c9396b' }}>L. {s.precioBase}</strong></td>
                                            <td>{s.duracionMin} min</td>
                                            <td>
                                                <span className={`estado-badge ${s.activo ? 'estado-confirmada' : 'estado-cancelada'}`}>
                                                    {s.activo ? 'Activo' : 'Inactivo'}
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

export default AdminServicios;
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import axios from 'axios';
import 'react-calendar/dist/Calendar.css';
import './Reservas.css';

// Horarios disponibles — el admin los puede modificar aquí
const HORARIOS = [
    '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00',
    '16:00', '17:00', '18:00'
];

function Reservas() {

    // Obtener el servicio preseleccionado desde el catálogo
    const location  = useLocation();
    const navigate  = useNavigate();

    // Estado para los datos de la reserva
    const [fecha,      setFecha]      = useState(new Date());
    const [hora,       setHora]       = useState('');
    const [sucursalId, setSucursalId] = useState('');
    const [servicioId, setServicioId] = useState('');

    // Estado para las listas de datos
    const [sucursales, setSucursales] = useState([]);
    const [servicios,  setServicios]  = useState([]);

    // Estado para mensajes
    const [exito,   setExito]   = useState('');
    const [error,   setError]   = useState('');
    const [loading, setLoading] = useState(false);

    // Cargar sucursales y servicios al montar el componente
    useEffect(() => {
        // Verificar si el usuario está autenticado
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Si viene del catálogo con un servicio preseleccionado
        if (location.state?.servicio) {
            setServicioId(location.state.servicio._id);
        }

        // Cargar sucursales
        async function fetchData() {
            try {
                const [resSucursales, resServicios] = await Promise.all([
                    axios.get('http://localhost:3000/api/sucursales'),
                    axios.get('http://localhost:3000/api/servicios')
                ]);
                setSucursales(resSucursales.data);
                setServicios(resServicios.data);
            } catch (err) {
                setError('Error al cargar los datos');
            }
        }
        fetchData();
    }, []);

    // Deshabilitar fechas pasadas en el calendario
    function deshabilitarFechasPasadas({ date }) {
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
        return date < hoy;
    }

    // Manejar envío del formulario
    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setExito('');

        // Validar que todos los campos estén completos
        if (!hora)       return setError('Por favor selecciona una hora');
        if (!sucursalId) return setError('Por favor selecciona una sucursal');
        if (!servicioId) return setError('Por favor selecciona un servicio');

        setLoading(true);

        try {
            // Obtener datos del usuario del localStorage
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            const token   = localStorage.getItem('token');

            // Formatear la fecha seleccionada
            const fechaFormateada = fecha.toISOString().split('T')[0];

            // Petición POST para crear la reserva
            await axios.post(
                'http://localhost:3000/api/reservas/create',
                {
                    usuarioId:  usuario.id,
                    servicioId: servicioId,
                    sucursalId: sucursalId,
                    fechaCita:  fechaFormateada,
                    horaCita:   hora,
                    notas:      ''
                },
                {
                    // Enviar token en el header para autenticación
                    headers: { authorization: token }
                }
            );

            // Mostrar mensaje de éxito
            setExito('¡Reserva creada correctamente! Te esperamos 💅');
            setHora('');

        } catch (err) {
            setError('Error al crear la reserva. Intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="reservas-page">

            {/* ── HEADER ── */}
            <div className="reservas-header">
                <h1>Reservar Cita 📅</h1>
                <p>Selecciona tu fecha, hora y sucursal preferida</p>
            </div>

            {/* ── CONTENIDO ── */}
            <div className="reservas-contenido">

                {/* Columna izquierda — Calendario */}
                <div className="reservas-columna">
                    <h3>Selecciona una fecha</h3>

                    {/* Calendario */}
                    <Calendar
                        onChange={setFecha}
                        value={fecha}
                        tileDisabled={deshabilitarFechasPasadas}
                        locale="es-ES"
                        className="calendario-custom"
                    />

                    {/* Fecha seleccionada */}
                    <div className="fecha-seleccionada">
                        📅 {fecha.toLocaleDateString('es-ES', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </div>

                    {/* Horarios disponibles */}
                    <h3 className="horarios-titulo">Selecciona una hora</h3>
                    <div className="horarios-grid">
                        {HORARIOS.map((h) => (
                            <button
                                key={h}
                                className={`horario-btn ${hora === h ? 'horario-activo' : ''}`}
                                onClick={() => setHora(h)}
                                type="button"
                            >
                                {h}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Columna derecha — Formulario */}
                <div className="reservas-columna">
                    <h3>Detalles de tu cita</h3>

                    {/* Mensajes */}
                    {error && <div className="reservas-error">{error}</div>}
                    {exito && <div className="reservas-exito">{exito}</div>}

                    <form onSubmit={handleSubmit} className="reservas-form">

                        {/* Seleccionar servicio */}
                        <div className="form-group">
                            <label>Servicio</label>
                            <select
                                value={servicioId}
                                onChange={(e) => setServicioId(e.target.value)}
                                required
                            >
                                <option value="">-- Selecciona un servicio --</option>
                                {servicios.map((s) => (
                                    <option key={s._id} value={s._id}>
                                        {s.nombreServicio} — L. {s.precioBase}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Seleccionar sucursal */}
                        <div className="form-group">
                            <label>Sucursal</label>
                            <select
                                value={sucursalId}
                                onChange={(e) => setSucursalId(e.target.value)}
                                required
                            >
                                <option value="">-- Selecciona una sucursal --</option>
                                {sucursales.map((s) => (
                                    <option key={s._id} value={s._id}>
                                        {s.nombre} — {s.direccion}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Resumen de la reserva */}
                        <div className="reserva-resumen">
                            <h4>Resumen de tu cita</h4>
                            <p>📅 {fecha.toLocaleDateString('es-ES')}</p>
                            <p>🕐 {hora || 'Sin hora seleccionada'}</p>
                            <p>💅 {servicios.find(s => s._id === servicioId)?.nombreServicio || 'Sin servicio'}</p>
                            <p>🏪 {sucursales.find(s => s._id === sucursalId)?.nombre || 'Sin sucursal'}</p>
                        </div>

                        {/* Botón confirmar */}
                        <button
                            type="submit"
                            className="btn-confirmar"
                            disabled={loading}
                        >
                            {loading ? 'Creando reserva...' : '✓ Confirmar Reserva'}
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
}

export default Reservas;
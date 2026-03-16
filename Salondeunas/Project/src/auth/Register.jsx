import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

function Register() {

    // Estado para los campos del formulario
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        password: '',
        confirmarPassword: ''
    });

    // Estado para mostrar errores
    const [error, setError] = useState('');

    // Estado para mostrar éxito
    const [exito, setExito] = useState('');

    // Estado para mostrar carga
    const [loading, setLoading] = useState(false);

    // Hook para redirigir después del registro
    const navigate = useNavigate();

    // Manejar cambios en los campos
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // Manejar envío del formulario
    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setExito('');

        // Verificar que las contraseñas coincidan
        if (form.password !== form.confirmarPassword) {
            return setError('Las contraseñas no coinciden');
        }

        setLoading(true);

        try {
            // Petición POST al backend para registrar usuario
            await axios.post('http://localhost:3000/api/auth/register', {
                nombre:   form.nombre,
                apellido: form.apellido,
                correo:   form.correo,
                telefono: form.telefono,
                password: form.password
            });

            // Mostrar mensaje de éxito
            setExito('¡Cuenta creada correctamente! Redirigiendo...');

            // Redirigir al login después de 2 segundos
            setTimeout(() => navigate('/login'), 2000);

        } catch (err) {
            // Mostrar error si el correo ya existe
            setError(err.response?.data?.message || 'Error al registrarse');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">

            {/* Fondo decorativo */}
            <div className="auth-bg" />

            {/* Tarjeta del formulario */}
            <div className="auth-card auth-card-register">

                {/* Título */}
                <div className="auth-header">
                    <h2>Crear Cuenta </h2>
                    <p>Regístrate para reservar tu cita en línea</p>
                </div>

                {/* Mensaje de error */}
                {error && <div className="auth-error">{error}</div>}

                {/* Mensaje de éxito */}
                {exito && <div className="auth-exito">{exito}</div>}

                {/* Formulario de registro */}
                
                <form onSubmit={handleSubmit} autoComplete="off">

                    {/* Fila nombre y apellido */}
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Tu nombre"
                                value={form.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Apellido</label>
                            <input
                                type="text"
                                name="apellido"
                                placeholder="Tu apellido"
                                value={form.apellido}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Campo correo */}
                    <div className="form-group">
                        <label>Correo electrónico</label>
                        <input
                         type="email"
                         name="correo"
                         placeholder="ejemplo@correo.com"
                         value={form.correo}
                         onChange={handleChange}
                         autoComplete="new-password"
                          required
                        />
                    </div>

                    {/* Campo teléfono */}
                    <div className="form-group">
                        <label>Teléfono</label>
                        <input
                            type="text"
                            name="telefono"
                            placeholder="+00 0000 0000"
                            value={form.telefono}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />
                    </div>

                    {/* Campo contraseña */}
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Mínimo 6 caracteres"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Campo confirmar contraseña */}
                    <div className="form-group">
                        <label>Confirmar contraseña</label>
                        <input
                            type="password"
                            name="confirmarPassword"
                            placeholder="Repite tu contraseña"
                            value={form.confirmarPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Botón registrarse */}
                    <button type="submit" className="btn-auth" disabled={loading}>
                        {loading ? 'Creando cuenta...' : 'Registrarse'}
                    </button>

                </form>

                {/* Link al login */}
                <p className="auth-switch">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login">Inicia sesión aquí</Link>
                </p>

            </div>
        </div>
    );
}

export default Register;
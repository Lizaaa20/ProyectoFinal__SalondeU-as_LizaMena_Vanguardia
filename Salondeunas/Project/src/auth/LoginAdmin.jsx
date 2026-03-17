import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../../assets/page_logo.png';
import './Auth.css';

function LoginAdmin() {

    // Estado para los campos del formulario
    const [form, setForm] = useState({
        correo: '',
        password: ''
    });

    // Estado para mostrar errores
    const [error, setError] = useState('');

    // Estado para mostrar carga
    const [loading, setLoading] = useState(false);

    // Hook para redirigir después del login
    const navigate = useNavigate();

    // Manejar cambios en los campos
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // Manejar envío del formulario
    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Petición POST al backend para iniciar sesión como admin
            const res = await axios.post('http://localhost:3000/api/auth/login-admin', form);

            // Guardar el token en localStorage
            localStorage.setItem('token', res.data.token);

            // Guardar los datos del usuario en localStorage
            localStorage.setItem('usuario', JSON.stringify(res.data.usuario));

            // Redirigir al panel admin
            navigate('/admin');

        } catch (err) {
            // Mostrar mensaje de error si falla el login
            setError('Correo o contraseña incorrectos');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">

            {/* Fondo decorativo */}
            <div className="auth-bg auth-bg-admin" />

            {/* Tarjeta del formulario */}
            <div className="auth-card">

                {/* Logo centrado */}
                <div className="auth-header">
                    <img src={logo} alt="Angel Nails" className="auth-logo" />
                    <h2>Panel Administrador 🔧</h2>
                    <p>Acceso exclusivo para administradores</p>
                </div>

                {/* Mensaje de error */}
                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                {/* Formulario de login admin */}
                <form onSubmit={handleSubmit} autoComplete="off">

                    {/* Campo correo */}
                    <div className="form-group">
                        <label>Correo electrónico</label>
                        <input
                            type="email"
                            name="correo"
                            placeholder="admin@salon.com"
                            value={form.correo}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        />
                    </div>

                    {/* Campo contraseña */}
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Tu contraseña"
                            value={form.password}
                            onChange={handleChange}
                            autoComplete="off"
                            required
                        />
                    </div>

                    {/* Botón iniciar sesión */}
                    <button type="submit" className="btn-auth btn-auth-admin" disabled={loading}>
                        {loading ? 'Verificando...' : '🔧 Ingresar al Panel'}
                    </button>

                </form>

                {/* Link de regreso al login de clientas */}
                <p className="auth-switch">
                    ¿Eres clienta?{' '}
                    <Link to="/login">Inicia sesión aquí</Link>
                </p>

            </div>
        </div>
    );
}

export default LoginAdmin;
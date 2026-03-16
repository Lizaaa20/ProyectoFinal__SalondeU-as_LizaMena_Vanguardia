import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

function Login() {

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
            // Petición POST al backend para iniciar sesión
            const res = await axios.post('http://localhost:3000/api/auth/login', form);

            // Guardar el token en localStorage
            localStorage.setItem('token', res.data.token);

            // Guardar los datos del usuario en localStorage
            localStorage.setItem('usuario', JSON.stringify(res.data.usuario));

            // Redirigir según el rol del usuario
            if (res.data.usuario.rol === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }

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
            <div className="auth-bg" />

            {/* Tarjeta del formulario */}
            <div className="auth-card">

               <Link to="/" className="navbar-logo">
               <img src="/src/assets/page_logo.png" alt="Angel Nails" className="navbar-logo-img" /></Link>


                {/* Logo / título */}
                <div className="auth-header">
                    <h2>Bienvenida a Angel Nails</h2>
                    <p>Inicia sesión para reservar tu cita</p>
                </div>

                {/* Mensaje de error */}
                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                {/* Formulario de login */}
                <form onSubmit={handleSubmit}>

                    {/* Campo correo */}
                    <div className="form-group">
                        <label>Correo electrónico</label>
                        <input
                            type="email"
                            name="correo"
                            placeholder="ejemplo@correo.com"
                            value={form.correo}
                            onChange={handleChange}
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
                            required
                        />
                    </div>

                    {/* Botón iniciar sesión */}
                    <button type="submit" className="btn-auth" disabled={loading}>
                        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                    </button>

                </form>

                {/* Link a registro */}
                <p className="auth-switch">
                    ¿No tienes cuenta?{' '}
                    <Link to="/register">Regístrate aquí</Link>
                </p>

            </div>
        </div>
    );
}

export default Login;
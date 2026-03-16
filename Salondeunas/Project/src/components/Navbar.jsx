import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {

    // Estado para mostrar/ocultar el menú del perfil
    const [menuAbierto, setMenuAbierto] = useState(false);

    // Obtener el usuario guardado en localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    // Hook para redirigir
    const navigate = useNavigate();

    // Cerrar sesión
    function cerrarSesion() {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setMenuAbierto(false);
        navigate('/login');
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">

                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <img src="/src/assets/page_logo.png" alt="Angel Nails" className="navbar-logo-img" />
                </Link>

                {/* Links */}
                <ul className="navbar-links">
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/servicios">Servicios</Link></li>
                    <li><Link to="/sucursales">Sucursales</Link></li>
                    <li><Link to="/quienes-somos">Quiénes somos</Link></li>
                </ul>

                {/* Si hay usuario muestra su nombre, si no muestra botón login */}
                {usuario ? (
                    <div className="navbar-perfil">
                        {/* Clic para abrir/cerrar el menú */}
                        <span
                            className="perfil-nombre"
                            onClick={() => setMenuAbierto(!menuAbierto)}
                        >
                            👤 {usuario.nombre}
                        </span>

                        {/* Menú desplegable — se muestra solo si menuAbierto es true */}
                        {menuAbierto && (
                            <div className="perfil-menu">
                                <Link to="/perfil" onClick={() => setMenuAbierto(false)}>Mi perfil</Link>
                                <Link to="/mis-reservas" onClick={() => setMenuAbierto(false)}>Mis reservas</Link>
                                {usuario.rol === 'admin' && (
                                    <Link to="/admin" onClick={() => setMenuAbierto(false)}>Panel Admin</Link>
                                )}
                                <button onClick={cerrarSesion}>Cerrar sesión</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login" className="navbar-login">
                        Iniciar sesión
                    </Link>
                )}

            </div>
        </nav>
    );
}

export default Navbar;
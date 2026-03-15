import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        // Barra de navegación principal
        <nav className="navbar">
            <div className="navbar-container">

                {/* Logo del salón */}
                <Link to="/" className="navbar-logo">
                    ✦ Salón de Uñas
                </Link>

                {/* Links de navegación */}
                <ul className="navbar-links">
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/servicios">Servicios</Link></li>
                    <li><Link to="/sucursales">Sucursales</Link></li>
                    <li><Link to="/quienes-somos">Quiénes somos</Link></li>
                </ul>

                {/* Botón iniciar sesión */}
                <Link to="/login" className="navbar-login">
                    Iniciar sesión
                </Link>

            </div>
        </nav>
    );
}

export default Navbar;
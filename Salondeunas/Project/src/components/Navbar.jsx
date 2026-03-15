import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        // Barra de navegación principal
        <nav className="navbar">
            <div className="navbar-container">

               <Link to="/" className="navbar-logo">
               <img src="/src/assets/page_logo.png" alt="Angel Nails" className="navbar-logo-img" /></Link>

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
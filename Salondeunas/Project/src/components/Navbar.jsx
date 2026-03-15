import { Link } from 'react-router-dom';

function Navbar() {
    return (
        // Barra de navegación principal con fondo oscuro
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">

                {/* Logo / nombre del salón */}
                <Link className="navbar-brand fw-bold" to="/">
                     Salón de Uñas
                </Link>

                {/* Botón para colapsar el menú en móviles */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Links del menú */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">

                        {/* Link a inicio */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>

                        {/* Link al catálogo de servicios */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/servicios">Servicios</Link>
                        </li>

                        {/* Link a sucursales */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/sucursales">Sucursales</Link>
                        </li>

                        {/* Link a quiénes somos */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/quienes-somos">Quiénes Somos</Link>
                        </li>

                    </ul>

                    {/* Botones de login y register */}
                    <div className="d-flex gap-2">
                        <Link className="btn btn-outline-light btn-sm" to="/login">
                            Iniciar Sesión
                        </Link>
                        <Link className="btn btn-danger btn-sm" to="/register">
                            Registrarse
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    );
}

export default Navbar;
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            {/* Sección hero — banner principal */}
            <div className="bg-dark text-white text-center py-5">
                <div className="container py-4">

                    {/* Título principal */}
                    <h1 className="display-4 fw-bold">💅Bienvenida al Salón de Uñas</h1>

                    {/* Descripción */}
                    <p className="lead mt-3">
                        Diseños personalizados, reservas en línea y la mejor atención para ti.
                    </p>

                    {/* Botones de acción */}
                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <Link to="/servicios" className="btn btn-danger btn-lg">
                            Ver Servicios
                        </Link>
                        <Link to="/register" className="btn btn-outline-light btn-lg">
                            Reservar Cita
                        </Link>
                    </div>

                </div>
            </div>

            {/* Sección de tarjetas de características */}
            <div className="container py-5">
                <h2 className="text-center fw-bold mb-4">¿Qué ofrecemos?</h2>
                <div className="row g-4">

                    {/* Tarjeta 1 — Catálogo */}
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm text-center p-3">
                            <div className="card-body">
                                <div className="fs-1 mb-3">💅</div>
                                <h5 className="card-title fw-bold">Catálogo de Servicios</h5>
                                <p className="card-text text-muted">
                                    Explora nuestros servicios de manicure, pedicure, acrílico y nail art con precios y descripciones detalladas.
                                </p>
                                <Link to="/servicios" className="btn btn-outline-danger btn-sm mt-2">
                                    Ver Catálogo
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta 2 — Diseños personalizados */}
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm text-center p-3">
                            <div className="card-body">
                                <div className="fs-1 mb-3">🎨</div>
                                <h5 className="card-title fw-bold">Diseños Personalizados</h5>
                                <p className="card-text text-muted">
                                    Envía la imagen del diseño que deseas y recibe una cotización personalizada de nuestro equipo.
                                </p>
                                <Link to="/register" className="btn btn-outline-danger btn-sm mt-2">
                                    Enviar Diseño
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Tarjeta 3 — Reservas en línea */}
                    <div className="col-md-4">
                        <div className="card h-100 shadow-sm text-center p-3">
                            <div className="card-body">
                                <div className="fs-1 mb-3">📅</div>
                                <h5 className="card-title fw-bold">Reservas en Línea</h5>
                                <p className="card-text text-muted">
                                    Selecciona tu fecha, hora y sucursal preferida desde la comodidad de tu casa.
                                </p>
                                <Link to="/register" className="btn btn-outline-danger btn-sm mt-2">
                                    Reservar Ahora
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Sección de sucursales */}
            <div className="bg-light py-5">
                <div className="container text-center">
                    <h2 className="fw-bold mb-3">Nuestras Sucursales</h2>
                    <p className="text-muted mb-4">
                        Encuéntranos en diferentes puntos de la ciudad para brindarte el mejor servicio.
                    </p>
                    <Link to="/sucursales" className="btn btn-dark">
                        Ver Sucursales
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-dark text-white text-center py-3">
                <p className="mb-0">© 2025 Salón de Uñas — Todos los derechos reservados</p>
            </footer>

        </div>
    );
}

export default Home;
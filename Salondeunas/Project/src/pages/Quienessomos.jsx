import './QuienesSomos.css';

// Importar imágenes del equipo
import directora from '../assets/Directora.png';
import equipo1   from '../assets/equipo1.png';
import equipo2   from '../assets/equipo2.png';
import equipo3   from '../assets/pnequipo1.png';

// Datos del equipo
const equipo = [
    {
        id: 1,
        nombre: 'Samantha Alberto',
        cargo: 'Directora & Fundadora',
        descripcion: 'Apasionada por el arte de las uñas con más de 10 años de experiencia en el sector de la belleza.',
        imagen: directora
    },
    {
        id: 2,
        nombre: 'Ana García',
        cargo: 'Especialista en Nail Art',
        descripcion: 'Experta en diseños artísticos y técnicas avanzadas de decoración de uñas.',
        imagen: equipo1
    },
    {
        id: 3,
        nombre: 'Sofía Martínez',
        cargo: 'Técnica en Acrílicos',
        descripcion: 'Especializada en extensiones de uñas acrílicas y tratamientos de cuidado.',
        imagen: equipo2
    },
    {
        id: 4,
        nombre: 'Lucía Gómez',
        cargo: 'Especialista en Pedicure',
        descripcion: 'Dedicada al cuidado y embellecimiento de pies con técnicas profesionales.',
        imagen: equipo3
    },
];

// Valores del salón
const valores = [
    { titulo: 'Excelencia', descripcion: 'Brindamos el mejor servicio con técnicas de alta calidad en cada cita.' },
    { titulo: 'Pasión', descripcion: 'Amamos lo que hacemos y eso se refleja en cada diseño que creamos.' },
    { titulo: 'Creatividad', descripcion: 'Innovamos constantemente para ofrecerte diseños únicos y personalizados.' },
    { titulo: 'Confianza', descripcion: 'Construimos relaciones duraderas con nuestras clientas basadas en la honestidad.' },
    { titulo: 'Cuidado', descripcion: 'Utilizamos productos de alta calidad que cuidan la salud de tus uñas.' },
    { titulo: 'Profesionalismo', descripcion: 'Nuestro equipo está certificado y en constante capacitación.' },
];

function QuienesSomos() {
    return (
        <div className="quienes-page">

            {/* ── HEADER ── */}
            <div className="quienes-header">
                <h1>Quiénes Somos 💅</h1>
                <p>Conoce el equipo detrás de Angel Nails</p>
            </div>

            {/* ── MISIÓN Y VISIÓN ── */}
            <section className="mision-vision">
                <div className="mv-card">
                    <div className="mv-icono">🎯</div>
                    <h3>Nuestra Misión</h3>
                    <p>
                        Brindar a nuestras clientas una experiencia única de belleza y bienestar,
                        ofreciendo servicios de manicure y pedicure de alta calidad con productos
                        premium y técnicas innovadoras que realcen su belleza natural.
                    </p>
                </div>
                <div className="mv-card">
                    <div className="mv-icono">🌟</div>
                    <h3>Nuestra Visión</h3>
                    <p>
                        Ser el salón de uñas líder en Honduras, reconocido por la excelencia
                        en nuestros servicios, la creatividad de nuestros diseños y el trato
                        personalizado que ofrecemos a cada una de nuestras clientas.
                    </p>
                </div>
            </section>

            {/* ── VALORES ── */}
            <section className="valores-seccion">
                <h2>Nuestros Valores</h2>
                <div className="valores-grid">
                    {valores.map((v, i) => (
                        <div key={i} className="valor-card">
                            <div className="valor-icono">{v.icono}</div>
                            <h4>{v.titulo}</h4>
                            <p>{v.descripcion}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── EQUIPO ── */}
            <section className="equipo-seccion">
                <h2>Nuestro Equipo</h2>
                <p className="equipo-subtitulo">Profesionales apasionadas por el arte de las uñas</p>
                <div className="equipo-grid">
                    {equipo.map((miembro) => (
                        <div key={miembro.id} className="miembro-card">

                            {/* Foto del miembro */}
                            <div className="miembro-foto">
                                <img src={miembro.imagen} alt={miembro.nombre} />
                            </div>

                            {/* Info del miembro */}
                            <div className="miembro-info">
                                <h4>{miembro.nombre}</h4>
                                <span className="miembro-cargo">{miembro.cargo}</span>
                                <p>{miembro.descripcion}</p>
                            </div>

                        </div>
                    ))}
                </div>
            </section>

            {/* ── FOOTER CTA ── */}
            <section className="quienes-cta">
                <h2>¿Lista para lucir unas manos perfectas?</h2>
                <p>Reserva tu cita ahora y déjate mimar por nuestro equipo</p>
                <a href="/reservas" className="btn-cta">Reservar Cita</a>
            </section>

        </div>
    );
}

export default QuienesSomos;
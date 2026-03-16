import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Importar las imágenes del slider
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';
import slide4 from '../assets/slide3.jpg';

// Luego úsalas en el array
const sliderImagenes = [
    { id: 1, src: slide1, alt: 'Slide 1' },
    { id: 2, src: slide2, alt: 'Slide 2' },
    { id: 3, src: slide3, alt: 'Slide 3' },
     {id: 4, src: slide4, alt: 'Slide 4' },
];

// ── Imágenes de la galería
const galeriaFotos = [
    { id: 1, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLEABV4IfJoiUusZMLPiL3KclKqmhYOyea_g&s', alt: 'Diseño 1' },
    { id: 2, src: 'https://cosmetologas.com/wp-content/uploads/2025/08/french_nails_disenos_03_0825.jpg', alt: 'Diseño 2' },
    { id: 3, src: 'https://www.luzdeltajo.net/wp-content/uploads/sites/28/2023/08/los-disenos-de-unas-perladas-verano.jpg', alt: 'Diseño 3' },
    { id: 4, src: 'https://i.blogs.es/4c3da1/468804807_601443412337903_7695306359644392685_n/650_1200.jpeg', alt: 'Diseño 4' },
    { id: 5, src: 'https://www.elespectador.com/resizer/sQktk2Chg7UncufeBlCkCU0pCRM=/arc-anglerfish-arc2-prod-elespectador/public/QQAY5GPZBFG45CSYKRE7HIA2TQ.jpg', alt: 'Diseño 5' },
    { id: 6, src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6gL2z_XAWU3UAS29I_34myK4V6wmjA1Rl7Q&s', alt: 'Diseño 6' },
    { id: 7, src: 'https://i.pinimg.com/236x/35/2a/b9/352ab9cd451e5e62b1e8806ace62c5dc.jpg', alt: 'Diseño 7' },
    { id: 8, src: 'https://ae01.alicdn.com/kf/S4a6aca4f0c8d4874bb2c84141df7df2co.jpg', alt: 'Diseño 8' },
];

// ── Reseñas de clientas
const resenas = [
    {
        id: 1,
        texto: '"Excelente servicio, me encantó cómo dejaron mis uñas. El ambiente es súper relajante y las chicas son muy profesionales."',
        nombre: 'Camila Rodríguez',
        tipo: 'Clienta Frecuente',
        avatar: 'https://gabelfotografos.com/wp-content/uploads/2025/08/Irina-37-683x1024.webp'
    },
    {
        id: 2,
        texto: '"La mejor experiencia que he tenido en un salón. Los diseños que hacen son verdaderas obras de arte. 100% recomendado."',
        nombre: 'Sofía Martínez',
        tipo: 'Primera Visita',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5CNUDRX6rd4mwAnX0ubIGndUFceDBNdf6vg&s'
    },
    {
        id: 3,
        texto: '"Me encanta la atención al detalle que tienen. Los productos son de alta calidad y mi esmalte dura muchísimo tiempo intacto."',
        nombre: 'Lucía Gómez',
        tipo: 'Clienta VIP',
        avatar: 'https://i.pinimg.com/474x/2b/37/26/2b3726066b0b3455ac0ac67895a54b2c.jpg'
    },
];

function Home() {

    // Estado para controlar qué slide está activo
    const [slideActivo, setSlideActivo] = useState(0);

    // Estado para el formulario de contacto
    const [form, setForm] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        mensaje: ''
    });

    // Cambia el slide automáticamente cada 4 segundos
    useEffect(() => {
        const intervalo = setInterval(() => {
            setSlideActivo((prev) => (prev + 1) % sliderImagenes.length);
        }, 4000);
        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(intervalo);
    }, []);

    // Manejar cambios en los campos del formulario
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // Manejar envío del formulario
    function handleSubmit(e) {
        e.preventDefault();
        alert('¡Mensaje enviado correctamente!');
        setForm({ nombre: '', correo: '', telefono: '', mensaje: '' });
    }

    return (
        <div className="home">

            {/* ── SLIDER AUTOMÁTICO ── */}
            <section className="slider">

                {/* Renderiza cada imagen del slider */}
                {sliderImagenes.map((img, index) => (
                    <div
                        key={img.id}
                        className={`slide ${index === slideActivo ? 'activo' : ''}`}
                    >
                        <img src={img.src} alt={img.alt} />
                    </div>
                ))}

                {/* Botón ir al slide anterior */}
                <button
                    className="slider-btn slider-btn-izq"
                    onClick={() => setSlideActivo((prev) => (prev - 1 + sliderImagenes.length) % sliderImagenes.length)}
                >
                    ‹
                </button>

                {/* Botón ir al slide siguiente */}
                <button
                    className="slider-btn slider-btn-der"
                    onClick={() => setSlideActivo((prev) => (prev + 1) % sliderImagenes.length)}
                >
                    ›
                </button>

                {/* Puntos indicadores */}
                <div className="slider-puntos">
                    {sliderImagenes.map((_, index) => (
                        <span
                            key={index}
                            className={`punto ${index === slideActivo ? 'punto-activo' : ''}`}
                            onClick={() => setSlideActivo(index)}
                        />
                    ))}
                </div>

            </section>

            {/* ── HERO ── */}
            <section className="hero">
                <div className="hero-bg" />
                <div className="hero-card">
                    <h1>Pide tu cita ahora</h1>
                    <p>Descubre el arte de lucir unas manos perfectas. Reserva tu espacio y déjate mimar por nuestros expertos.</p>
                    <Link to="/reservas" className="btn-reservar">Reservar</Link>
                </div>
            </section>

            {/* ── GALERÍA ── */}
            <section className="galeria">
                <h2>Nuestra Galería</h2>
                <div className="galeria-grid">
                    {galeriaFotos.map((foto) => (
                        <div key={foto.id} className="galeria-item">
                            <img src={foto.src} alt={foto.alt} />
                            <div className="galeria-overlay">
                                <span>Ver diseño</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── RESEÑAS ── */}
            <section className="resenas">
                <h2>Reseñas de Nuestras Clientas</h2>
                <div className="resenas-grid">
                    {resenas.map((r) => (
                        <div key={r.id} className="resena-card">
                            <div className="estrellas">☆ ☆ ☆ ☆ ☆</div>
                            <p>{r.texto}</p>
                            <div className="resena-autor">
                                <img src={r.avatar} alt={r.nombre} />
                                <div>
                                    <strong>{r.nombre}</strong>
                                    <span>{r.tipo}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── CONTACTO ── */}
            <section className="contacto">
                <h2>Contáctanos</h2>
                <form className="contacto-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre completo</label>
                        <input type="text" name="nombre" placeholder="Tu nombre" value={form.nombre} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Correo electrónico</label>
                        <input type="email" name="correo" placeholder="ejemplo@correo.com" value={form.correo} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Teléfono</label>
                        <input type="text" name="telefono" placeholder="+00 0000 0000" value={form.telefono} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Mensaje</label>
                        <textarea name="mensaje" placeholder="¿En qué podemos ayudarte?" value={form.mensaje} onChange={handleChange} rows={4} required />
                    </div>
                    <button type="submit" className="btn-enviar">Enviar Mensaje</button>
                </form>
            </section>

            {/* ── FOOTER ── */}
            <footer className="footer">
                <p>@2025 by salon de uñas. Hecho por Valentina Mena</p>
            </footer>

        </div>
    );
}

export default Home;
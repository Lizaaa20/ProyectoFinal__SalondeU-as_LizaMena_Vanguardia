const Usuario = require('../Models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'salon_secret_key';

// Register - Registrar nueva clienta
async function register(req, res) {
    try {
        // Verificar si el correo ya existe
        const existe = await Usuario.findOne({ correo: req.body.correo });
        if (existe) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // Encriptar la contraseña
        const passwordHash = await bcrypt.hash(req.body.password, 10);

        const usuario = new Usuario({
            nombre:   req.body.nombre,
            apellido: req.body.apellido,
            correo:   req.body.correo,
            telefono: req.body.telefono,
            password: passwordHash,
            rol:      'cliente'
        });

        const data = await usuario.save();
        res.status(201).json({ message: 'Usuario registrado correctamente', data });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Login - Iniciar sesión
async function login(req, res) {
    try {
        // Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo: req.body.correo });
        if (!usuario) {
            return res.status(404).json({ message: 'Correo o contraseña incorrectos' });
        }

        // Verificar la contraseña
        const passwordValido = await bcrypt.compare(req.body.password, usuario.password);
        if (!passwordValido) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }

        // Generar el token JWT
        const token = jwt.sign(
            { id: usuario._id, rol: usuario.rol },
            SECRET_KEY,
            { expiresIn: '8h' }
        );

        res.status(200).json({
            message: 'Login exitoso',
            token,
            usuario: {
                id:       usuario._id,
                nombre:   usuario.nombre,
                apellido: usuario.apellido,
                correo:   usuario.correo,
                rol:      usuario.rol
            }
        });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Register - Registrar admin
async function registerAdmin(req, res) {
    try {
        const existe = await Usuario.findOne({ correo: req.body.correo });
        if (existe) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        const passwordHash = await bcrypt.hash(req.body.password, 10);

        const usuario = new Usuario({
            nombre:   req.body.nombre,
            apellido: req.body.apellido,
            correo:   req.body.correo,
            telefono: req.body.telefono,
            password: passwordHash,
            rol:      'admin'        
        });

        const data = await usuario.save();
        res.status(201).json({ message: 'Admin registrado correctamente', data });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

// Login - Admin
async function loginAdmin(req, res) {
    try {
        const usuario = await Usuario.findOne({ correo: req.body.correo, rol: 'admin' }); 
        if (!usuario) {
            return res.status(404).json({ message: 'Correo o contraseña incorrectos' });
        }

        const passwordValido = await bcrypt.compare(req.body.password, usuario.password);
        if (!passwordValido) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }

        const token = jwt.sign(
            { id: usuario._id, rol: usuario.rol },
            SECRET_KEY,
            { expiresIn: '8h' }
        );

        res.status(200).json({
            message: 'Login admin exitoso',
            token,
            usuario: {
                id:       usuario._id,
                nombre:   usuario.nombre,
                apellido: usuario.apellido,
                correo:   usuario.correo,
                rol:      usuario.rol
            }
        });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

module.exports = {
    register,
    login,
    registerAdmin,
    loginAdmin
}
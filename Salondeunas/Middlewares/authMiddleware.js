const jwt = require('jsonwebtoken');   //Importar el módulo jsonwebtoken para verificar tokens JWT

// Clave secreta usada para firmar y verificar los tokens JWT
const SECRET_KEY = 'salon_secret_key';

// Middleware para verificar que el usuario esté autenticado
function verificarToken(req, res, next) {

    // Obtener el token del header 'authorization' de la petición
    const token = req.headers['authorization'];

    // Si no se envió ningún token, denegar el acceso
    if (!token) {
        // Responder con error 401 (no autorizado)
        return res.status(401).json({ message: 'Acceso denegado, token requerido' });
    }

    try {
        // Verificar que el token sea válido usando la clave secreta
        const decoded = jwt.verify(token, SECRET_KEY);

        // Guardar los datos del usuario decodificados en la petición
        req.usuario = decoded;

        // Pasar al siguiente middleware o controlador
        next();

    } catch (err) {
        // Si el token es inválido o expiró, denegar el acceso
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
}

// Middleware para verificar que el usuario tenga rol de administrador
function soloAdmin(req, res, next) {

    // Verificar si el rol del usuario decodificado es 'admin'
    if (req.usuario.rol !== 'admin') {

        // Si no es admin, denegar el acceso con error 403 (prohibido)
        return res.status(403).json({ message: 'Acceso denegado, se requiere rol admin' });
    }

    // Si es admin, pasar al siguiente middleware o controlador
    next();
}

// Exportar los middlewares para usarlos en los routers
module.exports = {
    verificarToken,
    soloAdmin
}
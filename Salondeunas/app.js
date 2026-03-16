const express = require('express');
const app = express();
const cors = require('cors');


require('./database'); 

// Habilitar CORS para permitir peticiones desde React
app.use(cors());
app.use(express.json());

app.use(express.json()); 

//login
app.use('/api/auth', require('./routers/auth'));

//servicios
app.use('/api/servicios', require('./routers/servicios'));

//sucursales
app.use('/api/sucursales', require('./routers/sucursales'));

//reservas
app.use('/api/reservas', require('./routers/reservas'));

//diseños
app.use('/api/disenos', require('./routers/disenos'));


//cotizaciones
app.use('/api/cotizaciones', require('./routers/cotizaciones'));

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
const mongoose = require('mongoose');
 const url = "mongodb+srv://dbliza:dbLizamena0214@cluster0.d22n6ot.mongodb.net/Salon?appName=Cluster0";
 mongoose.connect(url);
 const db = mongoose.connection;
 db.on('Error ', console.error.bind(console, 'Error al conectar MongoDB'));
 db.once('open', function callback(){
    console.log('Se ha conectado a la base de datos');

 })

 module.export = db;
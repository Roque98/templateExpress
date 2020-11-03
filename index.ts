import express, { urlencoded } from 'express';
import config from './config';
import routes from './api/network/routes';

// Instancia servidor
const app = express();


// BodyParser
app.use(express.json());
app.use(urlencoded({extended:true}));

// Rutas
app.use(routes);

// Iniciar servidor
app.listen(config.api.port, () => {
    console.log('Escuchando en el puerto ', config.api.port);
    
})
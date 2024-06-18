const e = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router/productos.router');
const config = require('./config');

const app = e();

app.set('port', config.port);

// Middlewares
app.use(e.json())
app.use(cors());
app.use(morgan('dev'));

// Router
app.get('/', (req, res) => {
    res.send('<h3>Examen Backend - ITS - San Martin Lautaro</h3>')
});
app.use('/api/productos', router);

module.exports = app;

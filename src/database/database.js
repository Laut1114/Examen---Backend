const { Sequelize } = require('sequelize');
const config = require('../config.js')

// Conexión a Base de Datos
const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    dialect: 'mysql'
});

module.exports = sequelize;

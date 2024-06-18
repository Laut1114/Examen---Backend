const { DataTypes } = require('sequelize');
const sequelize = require('../database/database')

// Modelo Producto
const Producto = sequelize.define('productos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER
    },
    categoria: {
        type: DataTypes.STRING
    }
});

module.exports = Producto;

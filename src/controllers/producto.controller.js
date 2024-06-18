const { request, response } = require('express');
const { Op } = require('sequelize');
const sequelize = require('../database/database');
const Producto = require('../models/producto.model');

// -> POST PRODUCTOS
const nuevoProducto = async (req = request, res = response) => {
    const { nombre, precio, cantidad, categoria } = req.body;

    try {
        // Conexión a la bd
        await sequelize.authenticate();     
        
        // sync Modelo Producto
        await sequelize.sync();

        // Creación de un nuevo producto
        const producto = await Producto.create({
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,
            categoria: categoria
        });

        return res.status(200).json({
            ok: true,
            msg: `Producto ${producto.nombre} agregado`
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    } 
}
// --------------------------------------------------------------------------------------

// -> GET PRODUCTOS
const getProductos = async (req = request, res = response) => {
    try {
        await sequelize.authenticate();        
        await sequelize.sync();

        // SELECT * FROM productos
        const productos = await Producto.findAll();

        return res.status(200).json({
            ok: true,
            productos
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
}

const getProductoID = async (req = request, res = response) => {
    const id = req.params.id;

    try {
        await sequelize.authenticate();
        await sequelize.sync();

        // SELECT * FROM productos WHERE id = id
        const producto = await Producto.findByPk(id);

        if (producto != null) {
            return res.status(200).json({
                ok: true,
                producto
            });
        } else {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró el producto'
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
}

const getOrdProductos = async (req = request, res = response) => {
    const { order, direcction } = req.query;

    try {
        await sequelize.authenticate();
        await sequelize.sync();

        const productos = await Producto.findAll({
            order: [[order, direcction]]
        });

        return res.status(200).json({
            ok: true,
            productos
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
}

const getfiltProductos = async (req = request, res = response) => {
    const { filterCol, op, condition } = req.query;
    
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        
        // SELECT * FROM productos WHERE productos.filterCol(precio) op(>, <, >=, <=, =) 'condition'(1000) 
        const productos = await Producto.findAll({
            where: sequelize.literal(`productos.${filterCol} ${op} '${condition}'`)
        });

        return res.status(200).json({
            ok: true,
            productos
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
}
// --------------------------------------------------------------------------------------

// -> PUT PRODUCTOS
const updateProducto = async (req = request, res = response) => {
    const id = req.params.id;
    const { nombre, precio, cantidad, categoria } = req.body;

    try {
        await sequelize.authenticate();
        await sequelize.sync();

        const producto = await Producto.update(
            {
                nombre: nombre,
                precio: precio,
                cantidad: cantidad,
                categoria: categoria
            },
            {
                where: { id: id }
            }
        );

        return res.status(200).json({
            ok: true,
            producto
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
}
// --------------------------------------------------------------------------------------

// -> DELETE PRODUCTOS
const deleteProducto = async (req = request, res = response) => {
    const id = req.params.id;

    try {
        await sequelize.authenticate();
        await sequelize.sync();

        await Producto.destroy({
            where: { id: id }
        });

        return res.status(200).json({
            ok: true,
            msg: 'Se elimino el producto'
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error.message
        });
    }
}

module.exports = {
    nuevoProducto,
    getProductos,
    getProductoID,
    getOrdProductos,
    getfiltProductos,
    updateProducto,
    deleteProducto
};

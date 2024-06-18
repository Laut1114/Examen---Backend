const { nuevoProducto, getProductos, getProductoID, updateProducto, deleteProducto, getOrdProductos, getfiltProductos } = require('../controllers/producto.controller');
const router  = require('express').Router();

router.post('/new', nuevoProducto);

router.get('/', getProductos);

router.get('/:id', getProductoID);

router.put('/update/:id', updateProducto);

router.delete('/delete/:id', deleteProducto);

// Endpoints Adicionales:
router.get('/ordenados/ord', getOrdProductos);

router.get('/filtrados/filt', getfiltProductos);

module.exports = router;

const router = require('express').Router();
const {
  crearProducto,
  obtenerProducto,
  obtenerProductos,
  modificarProducto,
  eliminarProducto
} = require('../controllers/productos')
var auth = require('./auth');

router.get('/:id', auth.opcional, obtenerProducto)
router.get('/', auth.opcional, obtenerProductos)
router.post('/', auth.requerido, crearProducto)
router.put('/:id',auth.requerido, modificarProducto)
router.delete('/:id',auth.requerido, eliminarProducto)

module.exports = router;
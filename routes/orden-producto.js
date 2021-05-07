const router = require('express').Router();
const {
  crearOrdenProducto,
  obtenerOrdenProducto,
  obtenerOrdenesProducto,
  modificarOrdenProducto,
  eliminarOrdenProducto
} = require('../controllers/orden-producto')
var auth = require('./auth');

router.get('/:id', auth.opcional, obtenerOrdenProducto)
router.get('/', auth.opcional, obtenerOrdenesProducto)
router.post('/', auth.requerido, crearOrdenProducto)
router.put('/:id',auth.requerido, modificarOrdenProducto)
router.delete('/:id',auth.requerido, eliminarOrdenProducto)

module.exports = router;
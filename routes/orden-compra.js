const router = require('express').Router();
const {
  crearOrdenCompra,
  obtenerOrdenCompra,
  obtenerOrdenesCompra,
  modificarOrdenCompra,
  eliminarOrdenCompra
} = require('../controllers/orden-compra')
var auth = require('./auth');

router.get('/:id', auth.opcional, obtenerOrdenCompra)
router.get('/', auth.opcional, obtenerOrdenesCompra)
router.post('/', auth.requerido, crearOrdenCompra)
router.put('/:id',auth.requerido, modificarOrdenCompra)
router.delete('/:id',auth.requerido, eliminarOrdenCompra)

module.exports = router;
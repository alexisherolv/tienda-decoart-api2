const router = require('express').Router();
const {
  obtenerCupon,
  obtenerCupones,
  crearCupon,
  modificarCupon,
  eliminarCupon
} = require('../controllers/cupones')
var auth = require('./auth');

router.get('/:id', auth.requerido, obtenerCupon)
router.get('/', auth.requerido, obtenerCupones)
router.post('/', auth.requerido, crearCupon)
router.put('/:id',auth.requerido, modificarCupon)
router.delete('/:id',auth.requerido, eliminarCupon)

module.exports = router;
const router = require('express').Router();
const {
  obtenerCategoria,
  obtenerCategorias,
  crearCategoria,
  modificarCategoria,
  eliminarCategoria
} = require('../controllers/categorias')
var auth = require('./auth');

router.get('/:id', auth.requerido, obtenerCategoria)
router.get('/', auth.requerido, obtenerCategorias)
router.post('/', auth.requerido, crearCategoria)
router.put('/:id',auth.requerido, modificarCategoria)
router.delete('/:id',auth.requerido, eliminarCategoria)

module.exports = router;
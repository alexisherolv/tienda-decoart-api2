var router = require('express').Router();

router.get('/', (req, res)=>{
  res.send('welcome to tienda DECOART api');
});

router.use('/usuarios', require('./usuarios'));
router.use('/productos', require('./productos'));
router.use('/categorias', require('./categorias'));
router.use('/cupones', require('./cupones'));
router.use('/orden-compra', require('./orden-compra'));
router.use('/orden-producto', require('./orden-producto'));

module.exports = router;
const mongoose = require('mongoose')
const Producto = mongoose.model('Producto')

function crearProducto(req, res, next) {
  var producto = new Producto(req.body)
  producto.save().then(producto => {
    res.status(201).send(producto)
  }).catch(next)
}

//obtener un producto en especifico
function obtenerProducto(req, res, next) {                              
    Producto.findById(req.params.id, (err, product) => {
      if (!product || err) {
        return res.sendStatus(401)
      }
      return res.json(product.publicData());
    }).catch(next);
}

//Obtener todos los productos de una categoria en especifica
/*function obtenerProductos(req, res, next) {                             
  Producto.find({categoria: req.params.id}, (err, products) => {
    if (!products || err) {
      return res.sendStatus(401)
    }
    //obtenemos todos los productos y los guardamos en un arreglo de objetos
    var productsMap = {};
    products.forEach(function(product) {
      productsMap[product._id] = product;
    });
    res.send(productsMap); 
  }).catch(next);
}*/

//Obtener todos los productos
function obtenerProductos(req, res, next) {                             
    Producto.find({}, (err, products) => {
      if (!products || err) {
        return res.sendStatus(401)
      }
      //obtenemos todos los productos y los guardamos en un arreglo de objetos
      var productsMap = {};
      products.forEach(function(product) {
        productsMap[product._id] = product;
      });
      res.send(productsMap); 
    }).catch(next);
}

function modificarProducto(req, res) {
    console.log(req.params.id)
    if (!req.params.id || !req.body) return res.status(400).send({ message: 'Parametros incorrectos' });
    Producto.findByIdAndUpdate(req.params.id, req.body, async (err, lineUpdated) => {
        console.log("req.params.id", req.params.id)
        console.log("lineUpdated", lineUpdated)
        console.log("req.body", req.body)
        return res.status(200).send({ data: lineUpdated });
    });
}

function eliminarProducto(req, res) {
    //Borrar un producto con el usuario loggeado
    Producto.findOneAndDelete({ _id: req.params.id }).then(r => {         //Buscando y eliminando productos en MongoDB.
      res.status(200).send(`Producto ${req.params.id} eliminado: ${r}`);
    })
}

module.exports = {
  crearProducto,
  obtenerProducto,
  obtenerProductos,
  modificarProducto,
  eliminarProducto,
}
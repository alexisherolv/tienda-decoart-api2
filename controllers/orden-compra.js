const mongoose = require('mongoose')
const OrdenCompra = mongoose.model('OrdenCompra')

function crearOrdenCompra(req, res, next) {
  var orden = new OrdenCompra(req.body)
  orden.save().then(orden => {
    res.status(201).send(orden)
  }).catch(next)
}

//obtener una orden de compra en especifico
function obtenerOrdenCompra(req, res, next) {                              
    OrdenCompra.findById(req.params.id, (err, orden) => {
      if (!orden || err) {
        return res.sendStatus(401)
      }
      return res.json(orden.publicData());
    }).catch(next);
}

//Obtener todas las ordenes de compra
function obtenerOrdenesCompra(req, res, next) {                             
    OrdenCompra.find({}, (err, ordenes) => {
      if (!ordenes || err) {
        return res.sendStatus(401)
      }
      //obtenemos todas las categorias y los guardamos en un arreglo de objetos
      var ordenesMap = {};
      ordenes.forEach(function(orden) {
        ordenesMap[orden._id] = orden;
      });
      res.send(ordenesMap); 
    }).catch(next);
}

function modificarOrdenCompra(req, res) {
    console.log(req.params.id)
    if (!req.params.id || !req.body) return res.status(400).send({ message: 'Parametros incorrectos' });
    OrdenCompra.findByIdAndUpdate(req.params.id, req.body, async (err, lineUpdated) => {
        console.log("req.params.id", req.params.id)
        console.log("lineUpdated", lineUpdated)
        console.log("req.body", req.body)
        return res.status(200).send({ data: lineUpdated });
    });
}

function eliminarOrdenCompra(req, res) {
    //Borrar un producto con el usuario loggeado
    OrdenCompra.findOneAndDelete({ _id: req.params.id }).then(r => {         //Buscando y eliminando ordenes de compra en MongoDB.
      res.status(200).send(`Orden de compra ${req.params.id} eliminado: ${r}`);
    })
}

module.exports = {
  crearOrdenCompra,
  obtenerOrdenCompra,
  obtenerOrdenesCompra,
  modificarOrdenCompra,
  eliminarOrdenCompra,
}
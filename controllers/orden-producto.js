const mongoose = require('mongoose')
const OrdenProducto = mongoose.model('OrdenProducto')

function crearOrdenProducto(req, res, next) {
  var ordenP = new OrdenProducto(req.body)
  ordenP.save().then(ordenP => {
    res.status(201).send(ordenP)
  }).catch(next)
}

//obtener una orden de compra en especifico
function obtenerOrdenProducto(req, res, next) {                              
    OrdenProducto.findById(req.params.id, (err, ordenP) => {
      if (!ordenP || err) {
        return res.sendStatus(401)
      }
      return res.json(ordenP.publicData());
    }).catch(next);
}

//Obtener todas las ordenes de producto
function obtenerOrdenesProducto(req, res, next) {                             
    OrdenProducto.find({}, (err, ordenes) => {
        if (!ordenes || err) {
          return res.sendStatus(401)
        }
        //obtenemos todas las categorias y los guardamos en un arreglo de objetos
        var ordenPMap = {};
        ordenes.forEach(function(orden) {
          ordenPMap[orden._id] = orden;
        });
        res.send(ordenPMap); 
      }).catch(next);
}

function modificarOrdenProducto(req, res) {
    console.log(req.params.id)
    if (!req.params.id || !req.body) return res.status(400).send({ message: 'Parametros incorrectos' });
    OrdenProducto.findByIdAndUpdate(req.params.id, req.body, async (err, lineUpdated) => {
        console.log("req.params.id", req.params.id)
        console.log("lineUpdated", lineUpdated)
        console.log("req.body", req.body)
        return res.status(200).send({ data: lineUpdated });
    });
}

function eliminarOrdenProducto(req, res) {
    //Borrar un producto con el usuario loggeado
    OrdenProducto.findOneAndDelete({ _id: req.params.id }).then(r => {         //Buscando y eliminando ordenes de compra en MongoDB.
      res.status(200).send(`Orden de producto ${req.params.id} eliminado: ${r}`);
    })
}

module.exports = {
  crearOrdenProducto,
  obtenerOrdenProducto,
  obtenerOrdenesProducto,
  modificarOrdenProducto,
  eliminarOrdenProducto,
}
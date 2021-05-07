const mongoose = require('mongoose')
const Cupon = mongoose.model('Cupon')

function crearCupon(req, res, next) {
  var cupon = new Cupon(req.body)
  cupon.save().then(cupon => {
    res.status(201).send(cupon)
  }).catch(next)
}

//obtener un cupon en especifico
function obtenerCupon(req, res, next) {                              
    Cupon.findById(req.params.id, (err, cupon) => {
      if (!cupon || err) {
        return res.sendStatus(401)
      }
      return res.json(cupon.publicData());
    }).catch(next);
}

//Obtener todos los cupones
function obtenerCupones(req, res, next) {                             
    Cupon.find({}, (err, cupons) => {
      if (!cupons || err) {
        return res.sendStatus(401)
      }
      //obtenemos todos los cupones y los guardamos en un arreglo de objetos
      var cuponesMap = {};
      cupons.forEach(function(cupon) {
        cuponesMap[cupon._id] = cupon;
      });
      res.send(cuponesMap); 
    }).catch(next);
}

//modificar un cupon en especifico
function modificarCupon(req, res) {
    console.log(req.params.id)
    if (!req.params.id || !req.body) return res.status(400).send({ message: 'Parametros incorrectos' });
    Cupon.findByIdAndUpdate(req.params.id, req.body, async (err, lineUpdated) => {
        console.log("req.params.id", req.params.id)
        console.log("lineUpdated", lineUpdated)
        console.log("req.body", req.body)
        return res.status(200).send({ data: lineUpdated });
    });
}

function eliminarCupon(req, res) {
    //Borrar un cupon con el usuario loggeado
    Cupon.findOneAndDelete({ _id: req.params.id }).then(r => {         //Buscando y eliminando productos en MongoDB.
      res.status(200).send(`Cupon ${req.params.id} eliminado: ${r}`);
    })
}

module.exports = {
  crearCupon,
  obtenerCupon,
  obtenerCupones,
  modificarCupon,
  eliminarCupon,
}
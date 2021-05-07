const mongoose = require('mongoose')
const Categoria = mongoose.model('Categoria')

function crearCategoria(req, res, next) {
  var categoria = new Categoria(req.body)
  categoria.save().then(categoria => {
    res.status(201).send(categoria)
  }).catch(next)
}

//obtener una categoria en especifico
function obtenerCategoria(req, res, next) {                              
    Categoria.findById(req.params.id, (err, category) => {
      if (!category || err) {
        return res.sendStatus(401)
      }
      return res.json(category.publicData());
    }).catch(next);
}

//Obtener todas las categorias
function obtenerCategorias(req, res, next) {                             
    Categoria.find({}, (err, categories) => {
      if (!categories || err) {
        return res.sendStatus(401)
      }
      //obtenemos todas las categorias y los guardamos en un arreglo de objetos
      var categoriesMap = {};
      categories.forEach(function(category) {
        categoriesMap[category._id] = category;
      });
      res.send(categoriesMap); 
    }).catch(next);
}

function modificarCategoria(req, res) {
    console.log(req.params.id)
    if (!req.params.id || !req.body) return res.status(400).send({ message: 'Parametros incorrectos' });
    Categoria.findByIdAndUpdate(req.params.id, req.body, async (err, lineUpdated) => {
        console.log("req.params.id", req.params.id)
        console.log("lineUpdated", lineUpdated)
        console.log("req.body", req.body)
        return res.status(200).send({ data: lineUpdated });
    });
}

function eliminarCategoria(req, res) {
    //Borrar un producto con el usuario loggeado
    Categoria.findOneAndDelete({ _id: req.params.id }).then(r => {         //Buscando y eliminando productos en MongoDB.
      res.status(200).send(`Categoria ${req.params.id} eliminado: ${r}`);
    })
}

module.exports = {
  crearCategoria,
  obtenerCategoria,
  obtenerCategorias,
  modificarCategoria,
  eliminarCategoria,
}
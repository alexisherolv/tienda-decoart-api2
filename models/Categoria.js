const mongoose = require("mongoose");

var CategoriaSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
  },
  { collection: "categoria", timestamps: true }
);

  CategoriaSchema.methods.publicData = function(){
  return {
     id: this.id,
     nombre: this.nombre,
     fechaCreacion: this.fechaCreacion
    };
  };
  
mongoose.model('Categoria', CategoriaSchema)
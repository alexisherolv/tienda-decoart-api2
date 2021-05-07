const mongoose = require("mongoose");

var ProductoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    sku: { type: String, required: true },
    descripcion: { type: String, required: true },
    fotos: [String],
    precio: { type: Number, required: true },
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria'}, // contacto con la persona que anuncia al animalito
    tipoProducto: { type: String, enum: ["simple", "variable"] },
    peso: { type: Number, required: true },
    noExistencias: { type: Number, required: true },
    comentarios: [String],
    calificacion: { type: Number, min: 0, max: 5},
    largo: { type: Number, required: true },
    ancho: { type: Number, required: true },
    alto: { type: Number, required: true },
  },
  { collection: "productos", timestamps: true }
);

  ProductoSchema.methods.publicData = function(){
  return {
     id: this.id,
     nombre: this.nombre,
     sku: this.sku,
     descripcion: this.descripcion,
     precio: this.precio,
     fotos: this.fotos,
     noExistencias: this.noExistencias,
     comentarios: this.comentarios,
     calificacion: this.calificacion,
     largo: this.largo,
     ancho: this.ancho,
     alto: this.alto,
     fechaCreacion: this.fechaCreacion
    };
  };
  
mongoose.model('Producto', ProductoSchema)
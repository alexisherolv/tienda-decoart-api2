const mongoose = require("mongoose");

var CuponSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    fechaCaducidad: { type: String, required: true },
    limiteUso: { type: Number, required: true },
    tipoCupon: { type: String, enum: ["descuento en porcentaje", "descuento fijo en carrito"] },
  },
  { collection: "cupones", timestamps: true }
);

  CuponSchema.methods.publicData = function(){
  return {
     id: this.id,
     nombre: this.nombre,
     descripcion: this.descripcion,
     fechaCaducidad: this.fechaCaducidad,
     limiteUso: this.limiteUso,
     tipoCupon: this.tipoCupon,
     fechaCreacion: this.fechaCreacion
    };
  };
  
mongoose.model('Cupon', CuponSchema)
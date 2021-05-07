const mongoose = require("mongoose");

var OrdenCompraSchema = new mongoose.Schema(
  {
    idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
    ordenProducto: [{type: mongoose.Schema.Types.ObjectId, ref: 'OrdenProducto'}],
    cupones: [{type: mongoose.Schema.Types.ObjectId, ref: 'Cupon'}],
    total: { type: Number, required: true },
    formaPago: { type: String, enum: ["PayPal", "Tarjeta de credito / debito, Oxxo, Transferencia Interbancaria"] },
    estado: { type: String, enum: ["pendiente", "aprobada", "cancelada", "completada"] },
  },
  { collection: "orden-compra", timestamps: true }
);

  OrdenCompraSchema.methods.publicData = function(){
  return {
     idUsuario: this.idUsuario,
     ordenProducto: this.ordenProducto,
     cupones: this.cupones,
     total: this.total,
     precio: this.precio,
     formaPago: this.formaPago,
     estado: this.estado,
    };
  };
  
mongoose.model('OrdenCompra', OrdenCompraSchema)
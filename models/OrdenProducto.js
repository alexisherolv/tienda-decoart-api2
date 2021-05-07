const mongoose = require("mongoose");

var OrdenProductoSchema = new mongoose.Schema(
  {
    idProducto: {type: mongoose.Schema.Types.ObjectId, ref: 'Producto'},
    cantidad: { type: Number, required: true },
  },
  { collection: "orden-producto", timestamps: true }
);

  OrdenProductoSchema.methods.publicData = function(){
  return {
     idProducto: this.idProducto,
     cantidad: this.cantidad
    };
  };
  
mongoose.model('OrdenProducto', OrdenProductoSchema)
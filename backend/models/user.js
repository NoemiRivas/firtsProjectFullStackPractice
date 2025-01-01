const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema(
  {
    // para la cracion del usuario
    firstName: {
      type: String,
      required: true,
      
    },
    secondName: {
      type: String,
      required: true,
      
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    ///implementacion de la informacion adicional del carrito
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"]
    },
    cart: {
      type: Array,
      default: [],
    },
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: "Direccion" }],

  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("User", UserSchema);

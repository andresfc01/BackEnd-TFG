const { Schema, model } = require("mongoose");

const EjercicioSchema = new Schema(
  {
    grupoMuscular: {
      ref: "grupoMuscular",
      type: Schema.Types.ObjectId,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    descrip: {
      type: String,
      required: true,
    },
    image: {
      mimeType: String,
      filename: String,
      imagePath: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Ejercicio", EjercicioSchema);
const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
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
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
    image: {
      mimeType: String,
      filename: String,
      imagePath: String,
    },

    objetivoFisico: {
      type: String,
      enum: ["Perdida grasa", "Mantenimiento", "Ganancia de peso"],
      required: true,
    },
    pesoObjetivo: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.encryptPassword = async (password) => {
  //cuantas veces se ejecuta el cifrado
  const salt = await bcrypt.genSalt(10);
  //cifro la contraseña
  return await bcrypt.hash(password, salt);
};

UserSchema.statics.comparePassword = async (password, recievedPassword) => {
  //compara las contras y devuelve bill
  return await bcrypt.compare(password, recievedPassword);
};

module.exports = model("User", UserSchema);

let mongoose = require("mongoose");

let cancionSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    artista: { type: String, required: true },
    url: { type: String, required: true },
    votos: { type: Number, default: 0 },
    comentarios: [
      {
        nombre: { type: String, required: true },
        comentario: { type: String, required: true },
        fecha_comentario: { type: Date, default: Date.now },
      },
    ],
  },
  { collection: "canciones" }
);

let Cancion = mongoose.model("Cancion", cancionSchema);

module.exports = Cancion;

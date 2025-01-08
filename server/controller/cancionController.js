let Cancion = require("../models/cancion");

exports.agregarCancion = async (req, res) => {
  let cancion = new Cancion({
    nombre: req.body.nombre,
    artista: req.body.artista,
    url: req.body.url,
    votos: 0,
  });

  try {
    let nuevaCancion = await cancion.save();
    res.status(201).json(nuevaCancion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.listarCanciones = async (req, res) => {
  try {
    let canciones = await Cancion.find();
    res.json(canciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.eliminarCancion = async (req, res) => {
  try {
    await Cancion.findByIdAndDelete(req.params.id);
    res.json({ message: "Canción eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.meGusta = async (req, res) => {
  try {
    let cancion = await Cancion.findById(req.params.id);
    cancion.votos += 1;
    await cancion.save();
    res.json({ votos: cancion.votos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.noMeGusta = async (req, res) => {
  try {
    let cancion = await Cancion.findById(req.params.id);
    cancion.votos -= 1;
    await cancion.save();
    res.json({ votos: cancion.votos });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancionAleatoria = async (req, res) => {
  try {
    let canciones = await Cancion.find();
    let cancionAleatoria =
      canciones[Math.floor(Math.random() * canciones.length)];
    res.json(cancionAleatoria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

let express = require("express");
let router = express.Router();
let cancionController = require("../controller/cancionController");

router.post("/", cancionController.agregarCancion);
router.get("/", cancionController.listarCanciones);
router.delete("/:id", cancionController.eliminarCancion);

router.patch("/:id/meGusta", cancionController.meGusta);
router.patch("/:id/noMeGusta", cancionController.noMeGusta);

router.get("/cancionAleatoria", cancionController.cancionAleatoria);

module.exports = router;

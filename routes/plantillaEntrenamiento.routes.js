const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleWares/authJwt");
const multer = require("../libs/multer");
const PlantillaEntrenamientoCtrl = require("../controllers/plantillaEntrenamiento.controller");

router
  /**
   * POST /singup, code 200 - 400 USERNAME EN USOS / 401 EMAIL EN USO
   */
  //subo la imagen con multer antes de nda
  .post(
    "/",
    [verifyToken, multer.single("image")],
    PlantillaEntrenamientoCtrl.create
  )
  /**
   * GET /api/grupoMuscular, code 200
   */
  .get("/", PlantillaEntrenamientoCtrl.getAll)
  /**
   * GET /api/grupoMuscular/id , code 200
   */
  .get("/:id", PlantillaEntrenamientoCtrl.getById)
  /**
   * GET /api/grupoMuscular/userId , code 200
   */
  .get("/user/:userId", PlantillaEntrenamientoCtrl.getByUser)
  /**
   * PUT /api/grupoMuscular/id , code 200
   * comprueba que este logueado y admin
   */
  .put(
    "/:id",
    [verifyToken],
    PlantillaEntrenamientoCtrl.update
  )
  /**
   * DELTE /api/grupoMuscular/id , code 200
   */
  .delete("/:id", [verifyToken], PlantillaEntrenamientoCtrl.remove);

module.exports = router;

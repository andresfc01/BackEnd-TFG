const express = require("express");
const router = express.Router();
const {verifyToken, isAdmin} = require("../middleWares/authJwt");
const multer = require('../libs/multer')
const GrupoMuscularCtrl = require('../controllers/grupoMuscular.controller')

router
 /**
   * POST /singup, code 200 - 400 USERNAME EN USOS / 401 EMAIL EN USO
   */
  //subo la imagen con multer antes de nda
  .post("/", [verifyToken, isAdmin, multer.single('image')], GrupoMuscularCtrl.create)
  /**
   * GET /api/grupoMuscular, code 200
   */
  .get("/", GrupoMuscularCtrl.getAll)
  /**
   * GET /api/grupoMuscular/id , code 200
   */
  .get("/:id", GrupoMuscularCtrl.getById)
  /**
   * PUT /api/grupoMuscular/id , code 200
   * comprueba que este logueado y admin
   */
  .put("/:id", [verifyToken, isAdmin], GrupoMuscularCtrl.update)
  /**
   * DELTE /api/grupoMuscular/id , code 200
   */
  .delete("/:id", [verifyToken, isAdmin], GrupoMuscularCtrl.remove);

module.exports = router;

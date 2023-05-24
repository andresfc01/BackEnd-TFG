const express = require("express");
const router = express.Router();
const LogroController = require("../controllers/logro.controller");
const { verifyToken, isAdmin } = require("../middleWares/authJwt");
const multer = require("../libs/multer");

router
  /**
   * GET /api/Logro, code 200
   */
  .get("/", LogroController.getAll)
  /**
   * GET /api/Logro/id , code 200
   */
  .get("/:id", LogroController.getById)
  /**
   * POST /api/Logro , code 200
   * comprueba que este logueado
   */
  .post(
    "/",
    [verifyToken, isAdmin, multer.single("image")],
    LogroController.create
  )
  /**
   * PUT /api/Logro/id , code 200
   * comprueba que este logueado y admin
   */
  .put("/:id", [verifyToken, isAdmin], LogroController.update)
  /**
   * DELTE /api/Logro/id , code 200
   */
  .delete("/:id", [verifyToken, isAdmin], LogroController.remove);

module.exports = router;

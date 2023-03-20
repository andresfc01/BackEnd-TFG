const express = require("express");
const router = express.Router();
const {verifyToken, isAdmin} = require("../middleWares/authJwt");
const multer = require('../libs/multer')
const UserCtrl = require('../controllers/user.controller')

router
  /**
   * POST /singup, code 200 - 400 USERNAME EN USOS / 401 EMAIL EN USO
   */
  //subo la imagen con multer antes de nda
  .post("/", [verifyToken, isAdmin, multer.single('image')], UserCtrl.create)


module.exports = router;

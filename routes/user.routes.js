const express = require("express");
const router = express.Router();
const auth = require('../middleWares/authJwt')

router
  /**
   * POST /singup, code 200 - 400 USERNAME EN USOS / 401 EMAIL EN USO
   */
  .post("/signup", AuthCtrl.signUp)
  /**
   * POST /singin , code 200
   */
  .post("/signin", AuthCtrl.signIn)

module.exports = router;

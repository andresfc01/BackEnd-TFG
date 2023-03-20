const express = require("express");
const router = express.Router();
const AuthCtrl = require('../controllers/auth.controller')
const verifySignUp = require('../middleWares/verifySignup')

router
  /**
   * POST /singup, code 200 - 400 USERNAME EN USOS / 401 EMAIL EN USO
   */
  .post("/signup", verifySignUp, AuthCtrl.signUp)
  /**
   * POST /singin , ode 200 - 401 INVALID PASSWORD / 400 EMAIL NO ENCONTRADO
   */
  .post("/signin", AuthCtrl.signIn)

module.exports = router;

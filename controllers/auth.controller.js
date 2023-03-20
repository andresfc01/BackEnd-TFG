var User = require("../models/User.model");
var jwt = require("jsonwebtoken");
var config = require("../config");
const RoleModel = require("../models/Role.model");

const signUp = async (req, res, next) => {
  try {
    const { username, email, password, roles, objetivoFisico, pesoObjetivo } =
      req.body;

    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password),
      objetivoFisico,
      pesoObjetivo,
    });

    //asgino los roles
    if (roles) {
      //busco los roles con el nombre (de entre el array de roles)
      const foundedRoles = await RoleModel.find({ name: { $in: roles } });
      //devulvo array con el id de los roles y los asigno
      newUser.roles = foundedRoles.map((roles) => roles._id);
    } else {
      const rol = await RoleModel.findOne({ name: "user" });
      let id = rol._id;
      newUser.roles = [id];
    }

    if (req.file) {
      //creo el obj imagen y lo asigno al user
      const newImage = {
        mimeType: req.file.mimetype,
        filename: req.file.filename,
        imagePath: req.file.path,
      };
      newUser.image = newImage;
    }

    const savedUser = await newUser.save();
    //guardo el token y lo devuelvo
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: 86400,
    });
    res.json({ token });
  } catch (error) {
    res.status(401).json(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    //busco user por mail
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    //si no lo ecuentro error
    if (!userFound) res.status(400).json({ message: "User not found" });

    //compruebo si coincide la contraseña
    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    //si no error
    if (!matchPassword)
      return res.status(401).json({ token: null, message: "invalid pasword" });

    //devulevo el token
    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 86400,
    });

    res.json({ token });
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = { signIn, signUp };
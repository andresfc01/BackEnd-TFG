var User = require("../models/User.model");
const RoleModel = require("../models/Role.model");

/**
 * Get todos
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAll = async (req, res, next) => {
  try {
    let users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Get todas las users de un user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAllUser = async (req, res, next) => {
  //encuentra las users de un alumno solo
  try {
    var ObjectId = require("mongoose").Types.ObjectId;
    let users = await User.find({ user: new ObjectId(req.params.user) });
    res.status(200).json(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Consigo una user por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getById = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Creo una user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const create = async (req, res, next) => {
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
  
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Actualizo una user por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const update = async (req, res, next) => {
  try {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Borro una user por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const remove = async (req, res, next) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = { getAll, getAllUser, getById, create, update, remove };

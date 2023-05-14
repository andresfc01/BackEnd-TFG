var PlantillaEntrenamiento = require("../models/PlantillaEntrenamiento.model");
var Ejercicio = require("../models/Ejercicio.model");
var User = require("../models/User.model");

/**
 * Get todos
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAll = async (req, res, next) => {
  try {
    let plantillaEntrenamientoes = await PlantillaEntrenamiento.find();
    res.status(200).json(plantillaEntrenamientoes);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Consigo una plantillaEntrenamiento por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getById = async (req, res, next) => {
  try {
    let plantillaEntrenamiento = await PlantillaEntrenamiento.findById(
      req.params.id
    )
      .populate("user") // Popula la propiedad 'user' con el objeto completo del usuario
      .populate({
        path: "series",
        populate: {
          path: "ejercicio",
          model: "Ejercicio", // Reemplaza 'Ejercicio' con el nombre de tu modelo de ejercicio
        },
      }) // Popula la propiedad 'ejercicio' con el objeto completo del ejercicio
      .exec();
    res.status(200).json(plantillaEntrenamiento);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Consigo una plantillaEntrenamiento por user
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getByUser = async (req, res, next) => {
  try {
    let plantillaEntrenamiento = await PlantillaEntrenamiento.find({
      user: req.params.userId,
    })
      .populate("user") // Popula la propiedad 'user' con el objeto completo del usuario
      .populate({
        path: "series",
        populate: {
          path: "ejercicio",
          model: "Ejercicio", // Reemplaza 'Ejercicio' con el nombre de tu modelo de ejercicio
        },
      }) // Popula la propiedad 'ejercicio' con el objeto completo del ejercicio
      .exec();

    res.status(200).json(plantillaEntrenamiento);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Creo una plantillaEntrenamiento
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const create = async (req, res, next) => {
  try {
    const plantilla = req.body;
    plantilla.series = JSON.parse(plantilla.series);
    plantilla.diasSemana = JSON.parse(plantilla.diasSemana);
    const newPlantillaEntrenamiento = new PlantillaEntrenamiento(plantilla);

    if (req.file) {
      //creo el obj imagen y lo asigno al plantillaEntrenamiento
      const newImage = {
        mimeType: req.file.mimetype,
        filename: req.file.filename,
        imagePath: req.file.path,
      };
      newPlantillaEntrenamiento.image = newImage;
    }

    const savedPlantillaEntrenamiento = await newPlantillaEntrenamiento.save();
    //guardo el token y lo devuelvo

    res.status(201).json(savedPlantillaEntrenamiento);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Actualizo una plantillaEntrenamiento por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const update = async (req, res, next) => {
  //compruebo si esta editando su propio perfil, si no no puede
  if (req.params.id == req.body._id) {
    const plantilla = req.body;
    
    try {
      let plantillaEntrenamiento =
        await PlantillaEntrenamiento.findByIdAndUpdate(
          req.params.id,
          plantilla,
          {
            new: true,
          }
        )
          .populate("user") // Popula la propiedad 'user' con el objeto completo del usuario
          .populate({
            path: "series",
            populate: {
              path: "ejercicio",
              model: "Ejercicio", // Reemplaza 'Ejercicio' con el nombre de tu modelo de ejercicio
            },
          });
      res.status(200).json(plantillaEntrenamiento);
    } catch (error) {
      res.status(401).json(error);
    }
  } else {
    res
      .status(402)
      .json("Unauthorized, you can edit only your plantillaEntrenamiento");
  }
};

/**
 * Borro una plantillaEntrenamiento por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const remove = async (req, res, next) => {
  try {
    await PlantillaEntrenamiento.findByIdAndRemove(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = { getAll, getById, create, update, remove, getByUser };

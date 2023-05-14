var Logro = require("../models/Logro.model");

/**
 * Get todos
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAll = async (req, res, next) => {
  try {
    let Logros = await Logro.find();
    res.status(200).json(Logros);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Consigo una Logro por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getById = async (req, res, next) => {
  try {
    let Logro = await Logro.findById(req.params.id);
    res.status(200).json(Logro);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Creo una Logro
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const create = async (req, res, next) => {
  try {
    let Logro = await Logro.create(req.body);
    res.status(201).json(Logro);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Actualizo una Logro por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const update = async (req, res, next) => {
  try {
    let Logro = await Logro.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(Logro);
  } catch (error) {
    res.status(401).json(error);
  }
};

/**
 * Borro una Logro por id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const remove = async (req, res, next) => {
  try {
    await Logro.findByIdAndRemove(req.params.id);
    res.status(204).json();
  } catch (error) {
    res.status(401).json(error);
  }
};

module.exports = { getAll, getById, create, update, remove };

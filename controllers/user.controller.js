var Medida = require("../models/Medida.model");

const getAll = async (req, res, next) => {
  let medidas = await Medida.find();
  res.status(200).json(medidas);
};

const getById = async (req, res, next) => {
  let medida = await Medida.findById(req.params.id);
  res.status(200).json(medida);
};

const create = async (req, res, next) => {
  let medida = await Medida.create(req.body);
  res.status(201).json(medida);
};

const update = async (req, res, next) => {
  let medida = await Medida.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(medida);
};

const remove = async (req, res, next) => {
  await Medida.findByIdAndRemove(req.params.id);
  res.status(204);
};

module.exports = { getAll, getById, create, update, remove };
    
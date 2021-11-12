import CVModel from "../../models/cv.js";

export const getCVs = async (req, res) => {
  try {
    const Cvs = await CVModel.find();
    res.status(200).json(Cvs);
  } catch (error) {
    res.error(404).json({ message: error.message });
  }
};

export const createCV = (req, res) => {
  res.status(200);
};

export const updateCV = (req, res) => {
  res.status(200);
};

export const deleteCV = (req, res) => {
  res.status(200);
};

export const deleteAnyCV = (req, res) => {
  res.status(200);
};
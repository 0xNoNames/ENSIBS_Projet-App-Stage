import { Router } from "express";
import { getCVs, createCV, updateCV, deleteCV, deleteMultipleCVs } from "../../controllers/api/cvtheque.js";
import auth from "../../middleware/auth.js";
import authAdmin from "../../middleware/authAdmin.js";

const router = Router();

/**
 * @route   GET /api/cvs
 * @desc    Récupérer tous les CVs
 * @access  Private
 */
router.get("/", auth, getCVs);

/**
 * @route   POST /api/cvs
 * @desc    Créer un CV
 * @access  Private
 */
router.post("/", auth, createCV);

/**
 * @route   PUT /api/cvs
 * @desc    Mettre à jour un CV
 * @access  Private
 */
router.put("/", auth, updateCV);

/**
 * @route   DELETE /api/cvs
 * @desc    Supprimer son CV
 * @access  Private
 */
router.delete("/supprimer", auth, deleteCV);

/**
 * @route   DELETE /api/cvs/:id
 * @desc    Supprimer son CV
 * @access  Administrateur
 */
router.delete('/:id', authAdmin, deleteMultipleCVs);

export default router;
